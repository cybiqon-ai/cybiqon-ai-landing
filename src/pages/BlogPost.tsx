import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TagPill from "@/components/blog/TagPill";
import BlogCTA from "@/components/blog/BlogCTA";

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 sm:pt-32 section-padding">
          <div className="content-container max-w-4xl mx-auto animate-pulse space-y-6">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="aspect-[16/9] bg-muted rounded-2xl" />
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" style={{ width: `${85 + Math.random() * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 sm:pt-32 section-padding">
          <div className="content-container text-center py-16">
            <h1 className="text-4xl font-bold font-heading mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
    author: {
      "@type": "Organization",
      name: "Cybiqon AI Solutions",
      url: "https://cybiqon.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Cybiqon AI Solutions",
      logo: { "@type": "ImageObject", url: "https://cybiqon.in/logo.png" },
    },
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
      <SEO
        title={post.title}
        description={post.excerpt || ""}
        canonical={`/blog/${post.slug}`}
        type="article"
        image={post.image_url || undefined}
        keywords={post.tags || undefined}
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      <Navbar />

      <article className="pt-24 sm:pt-32 section-padding">
        <div className="content-container max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={date.toISOString()}>
                {format(date, "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {tagList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tagList.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}

          {/* Hero Image */}
          {post.image_url && (
            <div className="rounded-2xl overflow-hidden mb-10 border border-border">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-primary
              prose-img:rounded-xl prose-img:border prose-img:border-border
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <BlogCTA />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
