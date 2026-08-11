/**
 * Enough YAML for lab/posts/ frontmatter and no more.
 *
 * The fields are `key: value` scalars plus two list shapes (`- item` for tags, and
 * `- label:`/`  value:` pairs for readouts). Pulling in a YAML parser to read five keys
 * would be the larger mistake. Anything unrecognised is skipped rather than guessed at.
 *
 * Lives here rather than inside a build script because two scripts now read the same
 * frontmatter — build-agent-markdown.mjs and build-llms-txt.mjs. Two parsers that drift
 * apart would mean the markdown copies and llms.txt disagreeing about what a post is
 * called, which is exactly the failure mode both of them exist to prevent.
 */

export const strip = (s) => s.trim().replace(/^["']|["']$/g, "");

export function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n/.exec(raw);
  if (!match) throw new Error("no frontmatter");

  const meta = { tags: [] };
  let listKey = null;

  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const item = /^\s*-\s+(.*)$/.exec(line);
    if (item) {
      if (listKey === "tags" && !item[1].includes(":")) meta.tags.push(strip(item[1]));
      continue;
    }

    const kv = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    const [, key, value] = kv;
    listKey = value.trim() === "" ? key : null;
    if (value.trim() !== "") meta[key] = strip(value);
  }

  return { meta, body: raw.slice(match[0].length) };
}

/**
 * Every post that is actually live, newest first.
 *
 * Two exclusions, and the second one was a leak.
 *
 * `draft: true` — a draft is not on the site, so it must not appear in the markdown
 * copies or in llms.txt. The publisher (`publish_lab.py`) reads the same field.
 *
 * **A future `date` means the post has not been published yet.** These generators read
 * the filesystem, but a post only reaches `/lab/<slug>` when `publish_lab.py` writes it
 * to D1 — and a post written today for Friday sits in git for days before that happens.
 * Cloudflare rebuilds on *any* push, so without this filter the next unrelated push
 * serves the full text of an embargoed article at `/md/lab/<slug>.md` and in
 * `llms-full.txt`, while `llms.txt` advertises a `/lab/<slug>` that still 404s.
 *
 * That is not hypothetical: it happened on 11 Aug 2026 to a post dated the 12th.
 *
 * Dates are ISO `YYYY-MM-DD`, so a string compare is correct and needs no parsing. A
 * post dated today is included — publication day is not the future.
 */
export function readPosts(readdirSync, readFileSync, join, postsDir, today = new Date().toISOString().slice(0, 10)) {
  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { meta, body } = parseFrontmatter(readFileSync(join(postsDir, file), "utf8"));
      if (!meta.title) throw new Error(`${file}: frontmatter has no title`);
      return { slug, meta, body };
    })
    .filter((p) => String(p.meta.draft ?? "").toLowerCase() !== "true")
    .filter((p) => {
      const date = String(p.meta.date ?? "").slice(0, 10);
      if (!date) return true; // undated posts are legacy; leave them alone
      const scheduled = date > today;
      if (scheduled) {
        console.log(`  skip  ${p.slug} — dated ${date}, not published yet`);
      }
      return !scheduled;
    })
    // Newest first, matching /lab and the feed.
    .sort((a, b) => String(b.meta.date ?? "").localeCompare(String(a.meta.date ?? "")));
}
