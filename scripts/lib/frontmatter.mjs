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
 * Every publishable post in lab/posts/, newest first.
 *
 * `draft: true` is honoured here rather than at each call site: a draft is not on the
 * site, so it must not appear in the markdown copies or in llms.txt. The publisher
 * (`publish_lab.py`) reads the same field.
 */
export function readPosts(readdirSync, readFileSync, join, postsDir) {
  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { meta, body } = parseFrontmatter(readFileSync(join(postsDir, file), "utf8"));
      if (!meta.title) throw new Error(`${file}: frontmatter has no title`);
      return { slug, meta, body };
    })
    .filter((p) => String(p.meta.draft ?? "").toLowerCase() !== "true")
    // Newest first, matching /lab and the feed.
    .sort((a, b) => String(b.meta.date ?? "").localeCompare(String(a.meta.date ?? "")));
}
