/**
 * Emit public/llms.txt — the curated index an agent reads to navigate this site.
 *
 * Why this exists. llms.txt used to be the one agent-facing file on cybiqon.in that
 * nothing generated and nothing checked. Its siblings — llms-full.txt and md/lab/*.md —
 * are emitted on every build and gitignored; llms.txt was hand-written, git-tracked, and
 * demonstrably stale: the fourth lab post had to be appended by hand four days after
 * publication, and /blog was never represented at all. This closes that.
 *
 * What is worth being honest about. llms.txt is NOT a traffic lever. Measured studies
 * find the overwhelming majority of these files are never requested, AI crawlers fetch
 * HTML directly, and no major model provider has committed to reading it. As of 2026 it
 * is a community convention, not a standard — Google has said outright it does not
 * support it. This is justified on cost: a static asset is zero Worker bytes, it is the
 * file a human or agent pointed at the site will actually open, and a wrong one is worse
 * than none. Do not report it as an SEO win. See .okf/content/lab.md.
 *
 * The split. lab/posts/ frontmatter drives the Lab section, so it can never lag
 * publication again. Everything else is hand-written in data/llms.config.json, because a
 * one-line description of what /pricing is for is a judgement, not a derivation.
 *
 * ⚠️ /blog is deliberately represented by its index and feed rather than post by post.
 * The specification wants a curated entry point rather than a sitemap clone, ~91
 * agent-written MSME posts would drown the four hand-written lab posts that are the
 * actual signal, and enumerating them would need a D1 query — which needs a Cloudflare
 * token, which cannot live in this public repo. It also makes the push-time check
 * sufficient: the nightly cron publishes blog posts with no git push at all, so any
 * per-post blog content here would go stale between deploys with nothing to catch it.
 *
 * Run `--check` to validate without writing. That mode is what the pre-push hook calls;
 * its most useful check is route coverage, which fires when a new page ships and forces
 * someone to decide whether an agent should be told about it.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { readPosts } from "./lib/frontmatter.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = join(root, "lab", "posts");
const APP_DIR = join(root, "app");
const PUBLIC_DIR = join(root, "public");
const CONFIG = join(root, "data", "llms.config.json");
const OUT = join(PUBLIC_DIR, "llms.txt");

const CHECK_ONLY = process.argv.includes("--check");

// Published guidance settles around 20–60 links and comfortably under 50 KB. These are
// warnings rather than errors because a good reason to exceed them is imaginable; the
// hard ceiling exists so a runaway generator cannot ship a megabyte.
const SOFT_MAX_BYTES = 50 * 1024;
const HARD_MAX_BYTES = 100 * 1024;

const config = JSON.parse(readFileSync(CONFIG, "utf8"));
const SITE = config.site;

const problems = [];
const warnings = [];

/** Absolute URL for a site-relative path. `/` has no trailing segment to append. */
const abs = (url) => (url.startsWith("http") ? url : url === "/" ? SITE : `${SITE}${url}`);

const entryLine = ({ title, url, note }) =>
  `- [${title}](${abs(url)})${note ? `: ${note}` : ""}`;

/* ── the Lab section, generated ──────────────────────────────────────────────────── */

const posts = readPosts(readdirSync, readFileSync, join, POSTS_DIR);
if (posts.length === 0) throw new Error("no posts found — refusing to write empty output");

for (const p of posts) {
  if (!p.meta.excerpt) {
    // The excerpt is this file's whole description of the post. Falling back to the title
    // would produce a line that looks fine and says nothing.
    problems.push(`lab/posts/${p.slug}.md: no excerpt — llms.txt would list it undescribed`);
  }
}

const labSection = {
  heading: config.lab.heading,
  entries: [
    config.lab.index,
    ...posts.map((p) => ({
      title: p.meta.title,
      url: `/lab/${p.slug}`,
      note: `${p.meta.excerpt ?? ""} Markdown: ${SITE}/md/lab/${p.slug}.md`,
    })),
    ...(config.lab.after ?? []),
  ],
};

/* ── render ──────────────────────────────────────────────────────────────────────── */

const renderSection = (s) =>
  [
    `## ${s.heading}`,
    "",
    ...(s.note ? [s.note, ""] : []),
    ...(s.entries?.length ? [s.entries.map(entryLine).join("\n"), ""] : []),
  ].join("\n");

const sections = [labSection, ...config.sections];

const out = [
  `# ${config.title}`,
  "",
  config.summary.map((l) => `> ${l}`).join("\n"),
  "",
  ...config.prose.flatMap((p) => [p, ""]),
  ...sections.map(renderSection),
  // The specification gives this heading a defined meaning — skippable when context is
  // tight — so it must be last, and must be spelled exactly "Optional".
  ...(config.optional
    ? [renderSection({ heading: "Optional", ...config.optional })]
    : []),
].join("\n");

/* ── checks ──────────────────────────────────────────────────────────────────────── */

/** Every route the app actually serves, derived from the filesystem. */
function appRoutes(dir = APP_DIR) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      // (group) and _private segments are Next conventions that do not create URLs.
      if (name.startsWith("(") || name.startsWith("_") || name === "api") continue;
      out.push(...appRoutes(full));
    } else if (name === "page.tsx" || name === "page.jsx") {
      const rel = relative(APP_DIR, dir).split("/").filter(Boolean).join("/");
      out.push(`/${rel}`);
    }
  }
  return out;
}

const listedUrls = [
  ...sections.flatMap((s) => (s.entries ?? []).map((e) => e.url)),
  ...(config.optional?.entries ?? []).map((e) => e.url),
];
const listed = new Set(listedUrls);

// 1. Dead links — every listed path resolves to something the site actually serves.
//    Generated assets may legitimately be absent on a clean checkout, so those warn.
const routes = new Set(appRoutes());

/** A `/lab/[slug]` route serves `/lab/anything`. Match those too, or every post looks dead. */
const dynamicMatchers = [...routes]
  .filter((r) => r.includes("["))
  .map((r) => new RegExp(`^${r.replace(/\[[^\]]+\]/g, "[^/]+")}$`));

/** sitemap.ts / robots.ts are Next metadata conventions, not page.tsx or route.ts. */
const servedByApp = (url) => {
  const rel = url.replace(/^\//, "");
  if (existsSync(join(APP_DIR, rel, "route.ts"))) return true;
  const stem = rel.replace(/\.(xml|txt)$/, "");
  return ["ts", "tsx", "js"].some((ext) => existsSync(join(APP_DIR, `${stem}.${ext}`)));
};

const GENERATED = new Set(["/llms-full.txt", "/llms.txt"]);
for (const url of listedUrls) {
  if (url.startsWith("http")) continue;
  if (routes.has(url)) continue;
  if (dynamicMatchers.some((re) => re.test(url))) continue;
  if (existsSync(join(PUBLIC_DIR, url.replace(/^\//, "")))) continue;
  if (servedByApp(url)) continue;
  if (GENERATED.has(url)) {
    warnings.push(`${url} not on disk — generated at build time, so this is expected pre-build`);
    continue;
  }
  problems.push(`${url} is listed in llms.txt but is not a route or a file in public/`);
}

// 2. Route coverage — the check that earns its keep. A page cannot ship without someone
//    deciding whether an agent should be told about it.
const excluded = config.excludeRoutes ?? {};
for (const route of routes) {
  if (listed.has(route) || route in excluded) continue;
  problems.push(
    `${route} is a live route but is not in data/llms.config.json — list it, or add it to excludeRoutes with a reason`,
  );
}

// 3. Spec conformance of what we are about to write.
const lines = out.split("\n");
const h1s = lines.filter((l) => /^# /.test(l));
if (h1s.length !== 1) problems.push(`llms.txt must have exactly one H1, found ${h1s.length}`);
if (!lines.some((l) => l.startsWith("> "))) problems.push("llms.txt has no blockquote summary");

const h2s = lines.filter((l) => /^## /.test(l));
if (config.optional && h2s[h2s.length - 1] !== "## Optional") {
  problems.push("`## Optional` must be the last H2 — the spec gives it a defined meaning");
}
if (h2s.length < 4 || h2s.length > 8) {
  warnings.push(`${h2s.length} H2 sections; published guidance suggests 4–8`);
}
for (const [i, l] of lines.entries()) {
  if (l.startsWith("- ") && !/^- \[[^\]]+\]\(https?:\/\/[^)]+\)(: .+)?$/.test(l)) {
    problems.push(`line ${i + 1}: not a valid llms.txt entry — expected "- [Title](url): note"`);
  }
}

// 4. Size.
const bytes = Buffer.byteLength(out);
if (bytes > HARD_MAX_BYTES) problems.push(`llms.txt is ${(bytes / 1024).toFixed(1)} KB — over the 100 KB ceiling`);
else if (bytes > SOFT_MAX_BYTES) warnings.push(`llms.txt is ${(bytes / 1024).toFixed(1)} KB — guidance suggests under 50 KB`);

/* ── report ──────────────────────────────────────────────────────────────────────── */

for (const w of warnings) console.warn(`  warn   ${w}`);
for (const p of problems) console.error(`  ERROR  ${p}`);

if (problems.length) {
  console.error(
    `\nllms.txt: ${problems.length} problem(s), ${warnings.length} warning(s) — not written.`,
  );
  process.exit(1);
}

// A count, not a status: "ok" has meant "did nothing" here before.
const summary =
  `llms.txt: ${posts.length} lab posts · ${sections.length + (config.optional ? 1 : 0)} sections · ` +
  `${listedUrls.length} links · ${routes.size} routes covered · ${(bytes / 1024).toFixed(1)} KB`;

if (CHECK_ONLY) {
  console.log(`${summary} — checked, not written`);
} else {
  writeFileSync(OUT, `${out.replace(/\n{3,}/g, "\n\n").trimEnd()}\n`);
  console.log(summary);
}
