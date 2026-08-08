/**
 * Emit the agent-readable copies of /lab: one markdown file per post, plus llms-full.txt.
 *
 * Why this exists. An agent that wants the sandbox post currently downloads ~134 KB of
 * HTML to reach ~21 K characters of prose. The markdown it actually wants already exists
 * in this repo at lab/posts/<slug>.md — it is the source D1's rendered HTML is generated
 * from. This copies it somewhere an agent can fetch.
 *
 * Why files rather than content negotiation. Real `Accept: text/markdown` branching needs
 * a route handler, ~100 KiB gzipped against a Worker budget with ~182 KiB left. Static
 * assets cost zero Worker bytes. That is the whole argument.
 *
 * ⚠️ Why /md/lab/<slug>.md and not /lab/<slug>.md. The `<url>.md` convention would be
 * better, and it does not work here: `/lab/<slug>.md` matches the `/lab/[slug]` edge
 * route, which looks up a post whose slug ends in ".md", finds nothing and 404s. Verified
 * by probe, not assumed. Do not "fix" the paths to the nicer shape without re-testing.
 *
 * Runs from `npm run build`, so these cannot drift from the posts — a generated file that
 * is regenerated only when someone remembers is the stale-document failure mode /lab has
 * a whole post about.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = join(root, "lab", "posts");
const MD_DIR = join(root, "public", "md", "lab");
const FULL_TXT = join(root, "public", "llms-full.txt");

const SITE = "https://cybiqon.in";
const AUTHOR = "Prajjwal Pathak";

/**
 * Enough YAML for this frontmatter and no more.
 *
 * The fields are `key: value` scalars plus two list shapes (`- item` for tags, and
 * `- label:`/`  value:` pairs for readouts). Pulling in a YAML parser to read five keys
 * would be the larger mistake. Anything unrecognised is skipped rather than guessed at —
 * this only needs title, seo_title, excerpt, date and tags.
 */
function parseFrontmatter(raw) {
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

const strip = (s) => s.trim().replace(/^["']|["']$/g, "");

/**
 * One post as markdown an agent can use directly.
 *
 * The header is rewritten rather than passed through: the source frontmatter carries
 * authoring notes and a `readouts` block that mean nothing outside the publisher, while
 * the canonical URL — the single most useful field for anything planning to cite this —
 * is not in there at all.
 */
function renderPost(slug, meta, body) {
  const url = `${SITE}/lab/${slug}`;
  const lines = [
    "---",
    `title: ${JSON.stringify(meta.title)}`,
    ...(meta.seo_title ? [`search_title: ${JSON.stringify(meta.seo_title)}`] : []),
    `description: ${JSON.stringify(meta.excerpt ?? "")}`,
    `author: ${JSON.stringify(AUTHOR)}`,
    `published: ${meta.date ?? ""}`,
    `canonical: ${url}`,
    ...(meta.tags.length ? [`tags: [${meta.tags.join(", ")}]`] : []),
    "---",
    "",
    `# ${meta.title}`,
    "",
    `*By ${AUTHOR} · ${meta.date ?? ""} · [${url}](${url})*`,
  ];
  // Blank line between the byline and the body, or the first paragraph joins the byline
  // and markdown renders them as one line.
  return `${lines.join("\n")}\n\n${body.trim()}\n`;
}

const posts = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md") && f !== "README.md")
  .map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(readFileSync(join(POSTS_DIR, file), "utf8"));
    if (!meta.title) throw new Error(`${file}: frontmatter has no title`);
    return { slug, meta, body, markdown: renderPost(slug, meta, body) };
  })
  // Newest first, matching /lab and the feed.
  .sort((a, b) => String(b.meta.date ?? "").localeCompare(String(a.meta.date ?? "")));

if (posts.length === 0) throw new Error("no posts found — refusing to write empty output");

// Rebuilt wholesale so a renamed or deleted post cannot leave an orphan behind.
rmSync(MD_DIR, { recursive: true, force: true });
mkdirSync(MD_DIR, { recursive: true });
for (const post of posts) {
  writeFileSync(join(MD_DIR, `${post.slug}.md`), post.markdown);
}

const full = [
  "# Cybiqon Lab — full text",
  "",
  "Hand-written engineering notes from Cybiqon AI Solutions, complete, in publication",
  "order (newest first). Canonical HTML for each post is linked in its header.",
  "",
  `Source: ${SITE}/lab · Feed: ${SITE}/lab/rss.xml · Index: ${SITE}/llms.txt`,
  "",
  posts.map((p) => `- [${p.meta.title}](${SITE}/lab/${p.slug})`).join("\n"),
  "",
  posts.map((p) => `---\n\n${p.markdown}`).join("\n"),
].join("\n");

writeFileSync(FULL_TXT, full);

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
console.log(`agent markdown: ${posts.length} posts -> public/md/lab/`);
for (const p of posts) {
  console.log(`  ${p.meta.date}  ${kb(Buffer.byteLength(p.markdown))}\t${p.slug}`);
}
console.log(`  llms-full.txt ${kb(Buffer.byteLength(full))}`);
