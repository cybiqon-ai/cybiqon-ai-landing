import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";
const FEED_LIMIT = 50;
const AUTHOR = "Prajjwal Pathak";

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
};

// Same contract as app/rss.xml/route.ts: one raw `&` in an author-written title makes
// the whole feed unparseable for every reader, so escaping is not optional.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * /lab's feed, separate from /blog's on purpose.
 *
 * The MSME feed publishes daily; this one publishes when something is written. Merging
 * them would bury a hand-written essay under thirty automated posts a month for anyone
 * subscribed to /lab, and hand a reader of /blog a 3,000-word piece on D1 query
 * scoping they did not ask for.
 */
export async function GET(): Promise<Response> {
  let posts: Post[] = [];
  try {
    const { env } = getRequestContext();
    const { results } = await env.DB.prepare(
      `SELECT slug, title, excerpt, image_url, created_at
       FROM blog_posts WHERE section = 'lab' AND published = 1
       ORDER BY created_at DESC LIMIT ?`
    )
      .bind(FEED_LIMIT)
      .all();
    posts = results as Post[];
  } catch {
    // An empty but valid feed rather than a 500, so subscribed readers don't drop it.
  }

  const items = posts
    .map((p) => {
      const url = `${siteUrl}/lab/${p.slug}`;
      // SQLite's datetime('now') is UTC with no marker; without the Z this parses as
      // local time and every pubDate lands 5.5 hours out.
      const stored = p.created_at.includes("T")
        ? p.created_at
        : p.created_at.replace(" ", "T");
      const pub = new Date(/[Z+]/.test(stored) ? stored : `${stored}Z`).toUTCString();
      const enclosure = p.image_url
        ? `\n      <enclosure url="${esc(p.image_url)}" type="image/png" />`
        : "";
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <dc:creator>${esc(AUTHOR)}</dc:creator>
      <description>${esc(p.excerpt ?? "")}</description>${enclosure}
    </item>`;
    })
    .join("\n");

  const lastBuild = posts.length
    ? new Date(
        /[Z+]/.test(posts[0].created_at)
          ? posts[0].created_at
          : `${posts[0].created_at.replace(" ", "T")}Z`
      ).toUTCString()
    : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Cybiqon Lab</title>
    <link>${siteUrl}/lab</link>
    <description>Engineering notes from Cybiqon: what we are building, what broke, and what the numbers said.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${siteUrl}/lab/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800",
    },
  });
}
