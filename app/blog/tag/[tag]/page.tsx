import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogList from "@/components/blog/BlogList";
import { findTagBySlug, getPagedPosts, getTagIndex, parsePage } from "@/lib/blog";

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";

interface PageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = await findTagBySlug(slug);
  if (!tag) return { title: "Tag not found" };

  const page = parsePage((await searchParams).page);
  const suffix = page > 1 ? ` — Page ${page}` : "";

  return {
    title: `${tag.name} — Articles for Indian Businesses${suffix}`,
    description: `Every Cybiqon article on ${tag.name} — ${tag.count} practical guides for Indian small and medium businesses.`,
    alternates: {
      canonical: page > 1 ? `/blog/tag/${tag.slug}?page=${page}` : `/blog/tag/${tag.slug}`,
    },
    openGraph: {
      title: `${tag.name} — Articles for Indian Businesses | Cybiqon`,
      description: `Every Cybiqon article on ${tag.name} — ${tag.count} practical guides for Indian small and medium businesses.`,
      url: `${siteUrl}/blog/tag/${tag.slug}`,
      type: "website",
    },
  };
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { tag: slug } = await params;
  const tag = await findTagBySlug(slug);
  // A tag that dropped below the archive threshold 404s rather than serving an empty
  // page — a thin archive is worse than no archive.
  if (!tag) notFound();

  const page = parsePage((await searchParams).page);
  const [{ posts, totalPages }, tags] = await Promise.all([
    getPagedPosts(page, tag.name),
    getTagIndex(),
  ]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: tag.name,
        item: `${siteUrl}/blog/tag/${tag.slug}`,
      },
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
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4 hover:border-primary/40 transition-colors"
            >
              ← All articles
            </Link>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              Articles on <span className="text-primary">{tag.name}</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              {tag.count} {tag.count === 1 ? "article" : "articles"} on {tag.name} for
              Indian small and medium businesses.
            </p>
          </div>
        </div>
      </section>

      <BlogList
        posts={posts}
        tags={tags}
        activeTag={tag.slug}
        currentPage={page}
        totalPages={totalPages}
        basePath={`/blog/tag/${tag.slug}`}
        emptyMessage={`No posts found for "${tag.name}".`}
      />
    </div>
  );
}
