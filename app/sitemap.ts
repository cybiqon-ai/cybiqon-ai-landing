import type { MetadataRoute } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { POSTS_PER_PAGE, getTagIndex } from "@/lib/blog";
import { PRODUCTS, activeCategories } from "@/data/products";

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/our-works`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/process`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/case-studies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/rss.xml`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    // /lab — hand-written, so weekly at most. Its own feed and author page.
    { url: `${siteUrl}/lab`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/lab/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/lab/rss.xml`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.3 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/free-audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/free-website`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Category pages, only for categories that actually have products.
    ...activeCategories().map((c) => ({
      url: `${siteUrl}/products/${c.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6,
    })),
    // Driven by data/products.ts — adding a product adds its three URLs automatically.
    ...PRODUCTS.flatMap((p) => [
      { url: `${siteUrl}/products/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
      { url: `${siteUrl}/products/${p.slug}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${siteUrl}/products/${p.slug}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    ]),
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  let indexPages: MetadataRoute.Sitemap = [];
  let tagPages: MetadataRoute.Sitemap = [];
  let labPages: MetadataRoute.Sitemap = [];

  try {
    const { env } = getRequestContext();
    const { results } = await env.DB.prepare(
      "SELECT slug, created_at FROM blog_posts WHERE section = 'msme' AND published = 1 ORDER BY created_at DESC"
    ).all();

    const posts = results as { slug: string; created_at: string }[];
    const newest = posts.length ? new Date(posts[0].created_at) : new Date();

    blogPages = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    // Paginated index pages. /blog itself is already in staticPages, so start at 2.
    // These are listed so the crawler has the full set of index URLs up front rather
    // than having to walk rel="next" one hop at a time.
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    for (let p = 2; p <= totalPages; p++) {
      indexPages.push({
        url: `${siteUrl}/blog?page=${p}`,
        lastModified: newest,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      });
    }

    const tags = await getTagIndex("msme");
    tagPages = tags.map((tag) => ({
      url: `${siteUrl}/blog/tag/${tag.slug}`,
      lastModified: newest,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // /lab posts. Separate query rather than one pass over both sections, because the
    // two produce different URL prefixes and different change frequencies — and a
    // single unscoped SELECT here is exactly how a lab post ends up advertised at
    // /blog/<slug>, which 404s.
    const labResults = await env.DB.prepare(
      "SELECT slug, created_at FROM blog_posts WHERE section = 'lab' AND published = 1 ORDER BY created_at DESC"
    ).all();

    labPages = (labResults.results as { slug: string; created_at: string }[]).map(
      (post) => ({
        url: `${siteUrl}/lab/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    );
  } catch {
    // If DB is unavailable, return only static pages
  }

  return [...staticPages, ...blogPages, ...labPages, ...tagPages, ...indexPages];
}
