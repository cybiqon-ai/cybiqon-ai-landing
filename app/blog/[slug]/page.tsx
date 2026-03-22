import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import TagPill from "@/components/blog/TagPill";
import BlogCTA from "@/components/blog/BlogCTA";
import { getDB } from "@/lib/db";

export const runtime = "edge";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  topic: string | null;
  angle: string | null;
  tags: string | null;
  published: boolean;
  created_at: string;
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const db = getDB();
    const post = await db.prepare(
      "SELECT title, excerpt, image_url, tags, slug FROM blog_posts WHERE slug = ? AND published = 1"
    ).bind(slug).first<Post>();

    if (!post) return { title: "Post Not Found" };

    return {
      title: post.title,
      description: post.excerpt || "",
      keywords: post.tags || undefined,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        type: "article",
        title: post.title,
        description: post.excerpt || "",
        images: post.image_url ? [{ url: post.image_url }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || "",
        images: post.image_url ? [post.image_url] : undefined,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const db = getDB();
  const post = await db.prepare(
    "SELECT * FROM blog_posts WHERE slug = ? AND published = 1"
  ).bind(slug).first<Post>();

  if (!post) notFound();

  const tagList = post.tags
    ? post.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t && !/["\[\]{}()]/.test(t))
    : [];
  const date = new Date(post.created_at);
  const readingTime = estimateReadingTime(post.content);
  const sanitizedContent = post.content
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image_url || "https://cybiqon.in/logo.png",
    datePublished: date.toISOString(),
    author: { "@type": "Organization", name: "Cybiqon AI Solutions", url: "https://cybiqon.in" },
    publisher: { "@type": "Organization", name: "Cybiqon AI Solutions", logo: { "@type": "ImageObject", url: "https://cybiqon.in/logo.png" } },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://cybiqon.in/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://cybiqon.in/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="pt-24 pb-8 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to blog
          </Link>

          {/* Topic pill */}
          {post.topic && (
            <p className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-4">
              {post.topic}
            </p>
          )}

          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-3 h-3 text-primary" />
              </div>
              <span className="font-medium text-foreground">Cybiqon Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={date.toISOString()}>{format(date, "MMM d, yyyy")}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {tagList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-8">
              {tagList.slice(0, 6).map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}

          {/* Featured image */}
          {post.image_url && (
            <div className="rounded-xl overflow-hidden mb-10 border border-border">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Article content */}
          <div
            className="prose prose-sm md:prose-base max-w-none prose-headings:font-extrabold prose-h2:text-lg prose-h2:md:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-sm prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-ul:text-sm prose-ol:text-muted-foreground prose-ol:text-sm prose-li:marker:text-primary prose-img:rounded-xl prose-img:border prose-img:border-border prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-blockquote:text-sm"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* CTA */}
          <BlogCTA />
        </div>
      </article>
    </div>
  );
}
