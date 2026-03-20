import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import BlogTagFilter from "@/components/blog/BlogTagFilter";
import { getDB } from "@/lib/db";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blog | AI, Automation & MSME Growth Insights",
  description: "Practical insights on AI automation, no-code tools, and digital growth strategies for Indian MSMEs. Updated daily.",
  keywords: "AI blog, MSME automation, no-code India, business growth, AI tools",
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

      <section className="pt-24 sm:pt-32 pb-12 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 text-primary border-primary/20">
              Insights & Ideas
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              The Cybiqon <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Daily insights on AI, automation, and how technology is
              transforming small businesses in India.
            </p>
          </div>
        </div>
      </section>

      <BlogTagFilter posts={posts} />
    </div>
  );
}
