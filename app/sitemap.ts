import type { MetadataRoute } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";

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
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/free-audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { env } = getRequestContext();
    const { results } = await env.DB.prepare(
      "SELECT slug, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC"
    ).all();

    blogPages = (results as { slug: string; created_at: string }[]).map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // If DB is unavailable, return only static pages
  }

  return [...staticPages, ...blogPages];
}
