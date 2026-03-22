import type { Metadata } from "next";
import BlogTagFilter from "@/components/blog/BlogTagFilter";
import { getDB } from "@/lib/db";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blog | AI, Automation & MSME Growth Insights",
  description: "Practical insights on AI automation, no-code tools, and digital growth strategies for Indian MSMEs. Updated daily.",
  keywords: "AI blog India, MSME automation tips, no-code tools India, small business growth strategies, AI tools for MSMEs, WhatsApp automation, digital transformation India",
  alternates: { canonical: "/blog" },
};

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  tags: string | null;
  created_at: string;
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    const db = getDB();
    const { results } = await db.prepare(
      "SELECT id, slug, title, excerpt, image_url, tags, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT 30"
    ).all();
    posts = results as unknown as BlogPost[];
  } catch (error) {
    // Will show empty state
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://cybiqon.in/blog" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              Insights & ideas
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              The Cybiqon <span className="text-primary">blog</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              Daily insights on AI, automation, and how technology is transforming small businesses in India.
            </p>
          </div>
        </div>
      </section>

      <BlogTagFilter posts={posts} />
    </div>
  );
}
