import { getDB } from "./db";
import { POSTS_PER_PAGE, slugifyTag, type BlogPost, type FullBlogPost } from "./blog";

/**
 * The measurement rail — /lab's signature, and the reason it exists.
 *
 * CLAUDE.md ground rule 3: "a cron that can fail silently must report a count, not a
 * status." /lab applies the same standard to its own writing. Every figure on the rail
 * is either derived from the post's own body at render time, or a number the author
 * measured and recorded. Nothing here is decorative and nothing is invented — if a
 * value cannot be computed, the row is omitted rather than filled with a placeholder.
 */

export interface Readout {
  label: string;
  value: string;
}

/** A `<h2>`/`<h3>` in the body, for the contents rail. */
export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** One question and its answer, lifted from the post's own FAQ section. */
export interface FAQEntry {
  question: string;
  answer: string;
}

const WORDS_PER_MINUTE = 200;

function stripTags(html: string): string {
  // Drop code blocks before counting: a 60-line snippet is not 60 lines of reading,
  // and counting it inflates both the word count and the reading estimate.
  return html
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
    .replace(/<[^>]*>/g, " ");
}

export function countWords(html: string): number {
  return stripTags(html).split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(html: string): number {
  return Math.max(1, Math.ceil(countWords(html) / WORDS_PER_MINUTE));
}

/**
 * Distinct external sites the post links to.
 *
 * Counted by hostname rather than by anchor so a post citing the same paper four times
 * reports one source, not four. Internal links are excluded — linking to our own blog
 * is not a citation.
 */
export function countSources(html: string): number {
  const hosts = new Set<string>();
  const hrefs = html.matchAll(/<a[^>]+href=["'](https?:\/\/[^"']+)["']/gi);
  for (const [, url] of hrefs) {
    try {
      const host = new URL(url).hostname.replace(/^www\./, "");
      if (host !== "cybiqon.in") hosts.add(host);
    } catch {
      // A malformed href is not a source.
    }
  }
  return hosts.size;
}

/**
 * The distinct external URLs a post links to, in the order it links to them.
 *
 * Deduped by full URL rather than by hostname, which is the one place this deliberately
 * differs from countSources: the rail answers "how many independent sources?", and four
 * links to the same paper is one source. `citation` answers "which documents?", and four
 * different Reuters articles are four documents.
 *
 * Capped because the cap is the only bound — the sandbox post cites 23 sources and a
 * future one could cite 200, and JSON-LD is inlined into every response.
 */
const MAX_CITATIONS = 40;

export function extractCitations(html: string): string[] {
  const urls: string[] = [];
  const seen = new Set<string>();
  for (const [, raw] of html.matchAll(/<a[^>]+href=["'](https?:\/\/[^"']+)["']/gi)) {
    // An href is attribute text, so `?a=1&b=2` is stored as `&amp;`. Left encoded, the
    // citation URL would 404 for anyone who followed it out of the JSON-LD.
    const url = decodeEntities(raw);
    try {
      if (new URL(url).hostname.replace(/^www\./, "") === "cybiqon.in") continue;
    } catch {
      continue; // a malformed href is not a citation
    }
    if (seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
    if (urls.length >= MAX_CITATIONS) break;
  }
  return urls;
}

/**
 * The post's FAQ section, as question/answer pairs for FAQPage schema.
 *
 * Read out of the body rather than stored in a column, for the same reason the rail is
 * derived: two copies of the same answer drift, and the one nobody reads is the one that
 * goes wrong. The convention the publisher warns about is `## FAQ` with each question as
 * an `###` — see lab/posts/README.md.
 *
 * Regex over trusted publish-time HTML, the same trust boundary as extractHeadings. The
 * section ends at the next `<h2>`, which is why Sources is an `##` and not a `###`: as a
 * subsection it would be read as a question with 23 links for an answer.
 *
 * Answers are flattened to text. Google accepts a little HTML inside acceptedAnswer, but
 * an answer carrying its own heading ids and anchor markup is a validation risk for no
 * gain — nothing renders this string, it is only ever read.
 */
export function extractFAQ(html: string): FAQEntry[] {
  const section = /<h2[^>]*>\s*FAQs?\s*<\/h2>([\s\S]*?)(?=<h2[\s>]|$)/i.exec(html);
  if (!section) return [];

  const entries: FAQEntry[] = [];
  const blocks = section[1].matchAll(
    /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[\s>]|$)/gi
  );
  for (const [, rawQuestion, rawAnswer] of blocks) {
    const question = htmlToText(rawQuestion);
    const answer = htmlToText(rawAnswer);
    if (question && answer) entries.push({ question, answer });
  }
  return entries;
}

/**
 * Markup to a single line of readable text, entities decoded.
 *
 * Decoding is not cosmetic. Everything this feeds ends up inside a
 * `<script type="application/ld+json">`, and an HTML parser does not decode entities
 * inside a script element — so `&rsquo;` left alone reaches Google as those seven
 * literal characters in the middle of a question. The publisher's `smarty` extension
 * emits curly quotes and dashes as named entities on every post, so this is the common
 * case rather than an edge one.
 */
function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<(pre|script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]*>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** What python-markdown with `extra` + `smarty` actually emits, plus the core five. */
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  mdash: "—",
  ndash: "–",
  hellip: "…",
};

/**
 * One pass, deliberately: `&amp;lt;` must become `&lt;` and stop there. Decoding
 * repeatedly until stable would turn text that merely mentions an entity into markup.
 * An entity this does not know is left exactly as it was found.
 */
function decodeEntities(text: string): string {
  return text.replace(/&(#[0-9]+|#x[0-9a-f]+|[a-z]+);/gi, (whole, body: string) => {
    if (body[0] !== "#") return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
    const code =
      body[1] === "x" || body[1] === "X"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
    if (!Number.isInteger(code) || code <= 0 || code > 0x10ffff) return whole;
    try {
      return String.fromCodePoint(code);
    } catch {
      return whole; // lone surrogate
    }
  });
}

/** Custom readouts stored on the row. Bad JSON yields none rather than throwing. */
export function parseReadouts(raw: string | null): Readout[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (r): r is Readout =>
          !!r && typeof r.label === "string" && typeof r.value === "string"
      )
      .map((r) => ({ label: r.label.trim(), value: r.value.trim() }))
      .filter((r) => r.label && r.value)
      .slice(0, 6);
  } catch {
    return [];
  }
}

/**
 * Derived figures first, then what the post measured about the world, then how it has
 * been received.
 *
 * Views come last because they are a different kind of number: everything above is a
 * property of the writing, and this one is a property of its audience. It is omitted
 * at zero for the same reason the sources row is — "0 views" is a claim, an absent row
 * is not, and a counter that has not started is not evidence of anything.
 */
export function postReadouts(post: FullBlogPost): Readout[] {
  const sources = countSources(post.content);
  const views = Number(post.views) || 0;
  return [
    { label: "words", value: formatCount(countWords(post.content)) },
    { label: "read", value: `${readingMinutes(post.content)} min` },
    ...(sources > 0 ? [{ label: "sources", value: String(sources) }] : []),
    ...parseReadouts(post.readouts),
    ...(views > 0 ? [{ label: "views", value: formatCount(views) }] : []),
  ];
}

/**
 * Thin-space thousands separators — 2 670, not 2,670.
 *
 * A comma inside a figure sitting in a comma-separated readout strip reads as a
 * delimiter. U+2009 keeps the digits grouped without adding a second meaning to a
 * character already in use.
 */
export function formatCount(n: number): string {
  return n.toLocaleString("en-US").replace(/,/g, " ");
}

/**
 * Pull `<h2>`/`<h3>` out of the stored HTML and give each a stable id.
 *
 * Done with a regex rather than a parser because the body is server-rendered HTML we
 * generated ourselves at publish time (python-markdown output), not arbitrary input —
 * the same trust boundary that makes dangerouslySetInnerHTML acceptable here at all.
 * If that ever stops being true, this is one of the two places that has to change.
 *
 * Ids are also assigned here rather than at publish time so they cannot drift out of
 * sync with the anchors the contents rail links to: same pass, same slugify, or the
 * links silently point at nothing.
 */
export function extractHeadings(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();

  const withIds = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, lvl: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]*>/g, "").trim();
      if (!text) return match;

      const base = slugifyHeading(text);
      // Two sections legitimately called "Sources" must not both answer to #sources.
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const id = n === 0 ? base : `${base}-${n + 1}`;

      headings.push({ id, text, level: Number(lvl) as 2 | 3 });

      // Respect an id the publisher already set.
      if (/\sid=/i.test(attrs)) return match;
      return `<h${lvl}${attrs} id="${id}">${inner}</h${lvl}>`;
    }
  );

  return { html: withIds, headings };
}

export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/&[a-z]+;/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section"
  );
}

/**
 * Dates render in IST, always, with the zone named.
 *
 * The company is in India and its own docs timestamp everything in IST; a reader
 * seeing "31 Jul" should not have to guess whose midnight that was. created_at is
 * stored by SQLite's datetime('now'), which is UTC without a marker, so the "Z" is
 * appended explicitly — parsing it as local time would shift every date by 5.5 hours
 * and silently show the wrong day for anything published after 18:30 IST.
 */
const IST = "Asia/Kolkata";

function toDate(createdAt: string): Date {
  const iso = createdAt.includes("T") ? createdAt : createdAt.replace(" ", "T");
  return new Date(/[Z+]/.test(iso) ? iso : `${iso}Z`);
}

/** "2026-07-31" */
export function istDate(createdAt: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(toDate(createdAt));
  return parts;
}

/** "31 Jul 2026" */
export function istHuman(createdAt: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(toDate(createdAt));
}

/** "31 Jul 14:20 IST" */
export function istStamp(createdAt: string): string {
  const d = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(toDate(createdAt));
  // en-GB renders this as "31 Jul, 05:30". The comma is correct English and wrong for
  // a readout, where the whole line is already comma-free and space-delimited.
  return `${d.replace(", ", " ")} IST`;
}

/** ISO-8601 for <time datetime> and JSON-LD. */
export function isoDate(createdAt: string): string {
  return toDate(createdAt).toISOString();
}

/**
 * One page of lab entries, newest first, plus the figures for the header strip.
 *
 * Selects `content`, which getPagedPosts deliberately does not. The index rail shows a
 * word count and a reading time per row, and those are derived rather than stored — so
 * the body has to be here. That trade is fine at /lab's scale and would not be at
 * /blog's: 9 lab bodies is a few hundred KB inside the Worker and never reaches the
 * client, whereas widening the shared query would put 76 MSME bodies on the same path
 * for a rail those cards do not render.
 *
 * `total` and `since` are the header readout. `since` is the FIRST post's date, so the
 * strip states when the lab actually started publishing rather than an aspiration.
 */
export async function getLabIndex(
  page: number,
  tag?: string
): Promise<{
  posts: FullBlogPost[];
  total: number;
  totalPages: number;
  since: string | null;
  last: string | null;
}> {
  const empty = { posts: [], total: 0, totalPages: 0, since: null, last: null };
  try {
    const db = getDB();
    const offset = (page - 1) * POSTS_PER_PAGE;

    // Same comma-wrapping trick as getPagedPosts: tags are a string, not a relation, so
    // an unanchored LIKE for "AI" would also match "AI automation".
    const where = tag
      ? `section = 'lab' AND published = 1
         AND (',' || REPLACE(tags, ', ', ',') || ',') LIKE ?`
      : "section = 'lab' AND published = 1";
    const params: unknown[] = tag ? [`%,${tag},%`] : [];

    // The bounds row stays unfiltered on purpose. "since" and "last" describe when the
    // lab started and last published, which is a fact about the lab — a tag view that
    // reported its own first post as the lab's start date would state something false.
    const bounds = await db
      .prepare(
        `SELECT COUNT(*) AS n, MIN(created_at) AS first_at, MAX(created_at) AS last_at
         FROM blog_posts WHERE section = 'lab' AND published = 1`
      )
      .first<{ n: number; first_at: string | null; last_at: string | null }>();

    // Unfiltered, the bounds row already carries the count — no second query for it.
    const total = tag
      ? (
          await db
            .prepare(`SELECT COUNT(*) AS n FROM blog_posts WHERE ${where}`)
            .bind(...params)
            .first<{ n: number }>()
        )?.n ?? 0
      : bounds?.n ?? 0;

    const { results } = await db
      .prepare(
        `SELECT * FROM blog_posts WHERE ${where}
         ORDER BY created_at DESC LIMIT ? OFFSET ?`
      )
      .bind(...params, POSTS_PER_PAGE, offset)
      .all();

    return {
      posts: results as unknown as FullBlogPost[],
      total,
      totalPages: Math.ceil(total / POSTS_PER_PAGE),
      since: bounds?.first_at ?? null,
      last: bounds?.last_at ?? null,
    };
  } catch {
    return empty;
  }
}

export function splitTags(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t && !/["[\]{}()]/.test(t));
}

/**
 * What to read next: shared tags first, then recency.
 *
 * Ranked in JS rather than SQL because tags are a comma-separated string and scoring
 * overlap in SQLite would mean one LIKE per tag per row. At /lab's scale the whole
 * section fits in one bounded query, so the sort is free — and RELATED_SCAN is a
 * ceiling, not a page size, so it does not have to move when the lab grows.
 *
 * `content` is excluded here. Unlike getLabIndex, a read-next row shows no rail, so
 * pulling every body to render three titles would be the widening that function's own
 * docblock argues against.
 */
const RELATED_SCAN = 40;

export async function getRelatedLabPosts(
  slug: string,
  tags: string[],
  limit: number
): Promise<BlogPost[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare(
        `SELECT id, slug, title, excerpt, image_url, tags, created_at
         FROM blog_posts
         WHERE section = 'lab' AND published = 1 AND slug != ?
         ORDER BY created_at DESC LIMIT ?`
      )
      .bind(slug, RELATED_SCAN)
      .all();

    const wanted = new Set(tags.map((t) => t.toLowerCase()));
    return (results as unknown as BlogPost[])
      .map((post) => ({
        post,
        shared: splitTags(post.tags).filter((t) => wanted.has(t.toLowerCase())).length,
      }))
      // The query already ordered by date, and sort() is stable, so ties keep it.
      .sort((a, b) => b.shared - a.shared)
      .slice(0, limit)
      .map((r) => r.post);
  } catch {
    return [];
  }
}

/**
 * Resolve a `?tag=` slug back to the tag as it is written on the posts.
 *
 * /lab does not reuse getTagIndex: that one enforces MIN_POSTS_PER_TAG to keep 190 thin
 * archives out of /blog's index, and applying a three-post floor to a three-post section
 * would filter out every tag it has. These views are noindex and exist to give a reader
 * and a crawler a path between related posts, so no floor is the right answer here.
 */
export async function findLabTag(tagSlug: string): Promise<string | null> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare(
        `SELECT tags FROM blog_posts
         WHERE section = 'lab' AND published = 1 AND tags IS NOT NULL`
      )
      .all();

    for (const row of results as unknown as { tags: string | null }[]) {
      for (const tag of splitTags(row.tags)) {
        if (slugifyTag(tag) === tagSlug) return tag;
      }
    }
    return null;
  } catch {
    return null;
  }
}
