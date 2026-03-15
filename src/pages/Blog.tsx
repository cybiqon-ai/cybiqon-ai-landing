import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BlogCard from "@/components/blog/BlogCard";
import TagPill from "@/components/blog/TagPill";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  tags: string | null;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError("Unable to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      posts
        .flatMap((p) => (p.tags ? p.tags.split(",").map((t) => t.trim()) : []))
        .filter(Boolean)
    )
  );

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter((p) =>
        p.tags?.split(",").map((t) => t.trim()).includes(selectedTag)
      )
    : posts;

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
      <SEO
        title="Blog | AI, Automation & MSME Growth Insights"
        description="Practical insights on AI automation, no-code tools, and digital growth strategies for Indian MSMEs. Updated daily."
        canonical="/blog"
        keywords="AI blog, MSME automation, no-code India, business growth, AI tools"
        structuredData={breadcrumbSchema}
      />
      <Navbar />

      {/* Hero */}
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

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <section className="pb-8">
          <div className="content-container">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  !selectedTag
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    selectedTag === tag
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="section-padding pt-0">
        <div className="content-container">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse">
                  <div className="aspect-[16/9] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-full" />
                    <div className="h-5 bg-muted rounded w-4/5" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                {selectedTag
                  ? `No posts found for "${selectedTag}".`
                  : "No blog posts yet. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
