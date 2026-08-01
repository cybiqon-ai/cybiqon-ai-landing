import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";
const FEED_LIMIT = 50;

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
};

// RSS is XML, and post titles/excerpts are author-written prose that will eventually
// contain an ampersand or a quote. Escaping is not optional here — one raw `&` makes
// the whole feed unparseable for every reader.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  let posts: Post[] = [];
  try {
    const { env } = getRequestContext();
    // MSME only — /lab has its own feed at /lab/rss.xml. Mixing them would push a
    // daily MSME cadence into a feed subscribed to for engineering writing, and vice
    // versa.
    const { results } = await env.DB.prepare(
      `SELECT slug, title, excerpt, image_url, created_at
       FROM blog_posts WHERE section = 'msme' AND published = 1
       ORDER BY created_at DESC LIMIT ?`
    )
      .bind(FEED_LIMIT)
      .all();
    posts = results as Post[];
  } catch {
    // Same contract as sitemap.ts: a D1 outage yields an empty but valid feed rather
    // than a 500, so subscribed readers don't drop the feed entirely.
  }

  const items = posts
    .map((p) => {
      const url = `${siteUrl}/blog/${p.slug}`;
      const pub = new Date(p.created_at).toUTCString();
      const enclosure = p.image_url
        ? `\n      <enclosure url="${esc(p.image_url)}" type="image/jpeg" />`
        : "";
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <description>${esc(p.excerpt ?? "")}</description>${enclosure}
    </item>`;
    })
    .join("\n");

  const lastBuild = posts.length
    ? new Date(posts[0].created_at).toUTCString()
    : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cybiqon Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Practical writing on websites, apps and AI automation for Indian MSMEs.</description>
    <language>en-IN</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
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
