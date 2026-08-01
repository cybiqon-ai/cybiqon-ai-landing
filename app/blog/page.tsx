import type { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import { getPagedPosts, getTagIndex, parsePage } from "@/lib/blog";

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";

interface PageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  const suffix = page > 1 ? ` — Page ${page}` : "";

  return {
    title: `Blog | AI, Automation & MSME Growth Insights${suffix}`,
    description:
      "Practical insights on AI automation, no-code tools, and digital growth strategies for Indian MSMEs. Updated daily.",
    keywords:
      "AI blog India, MSME automation tips, no-code tools India, small business growth strategies, AI tools for MSMEs, WhatsApp automation, digital transformation India",
    // Each page gets its own canonical. Pointing page 2+ back at /blog would tell Google
    // those URLs are duplicates and undo the crawl paths this pagination exists to create.
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : "/blog" },
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const page = parsePage((await searchParams).page);
  const [{ posts, totalPages }, tags] = await Promise.all([
    getPagedPosts("msme", page),
    getTagIndex("msme"),
  ]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              Insights &amp; ideas
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              The Cybiqon <span className="text-primary">blog</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              Daily insights on AI, automation, and how technology is transforming small
              businesses in India.
            </p>
          </div>
        </div>
      </section>

      <BlogList
        posts={posts}
        tags={tags}
        currentPage={page}
        totalPages={totalPages}
        basePath="/blog"
      />
    </div>
  );
}
