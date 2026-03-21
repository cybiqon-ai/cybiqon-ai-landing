import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
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

  const tagList = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const date = new Date(post.created_at);
  const readingTime = estimateReadingTime(post.content);

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

      <article className="pt-24 sm:pt-32 section-padding">
        <div className="content-container max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading mb-6 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={date.toISOString()}>{format(date, "MMMM d, yyyy")}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {tagList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tagList.map((tag) => (<TagPill key={tag} tag={tag} />))}
            </div>
          )}

          {post.image_url && (
            <div className="rounded-2xl overflow-hidden mb-10 border border-border">
              <img src={post.image_url} alt={post.title} className="w-full h-auto object-cover" loading="eager" />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-primary prose-img:rounded-xl prose-img:border prose-img:border-border prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <BlogCTA />
        </div>
      </article>
    </div>
  );
}
