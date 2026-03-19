"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  tags: string | null;
  created_at: string;
}

interface BlogTagFilterProps {
  posts: BlogPost[];
}

const BlogTagFilter = ({ posts }: BlogTagFilterProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(
      posts
        .flatMap((p) => (p.tags ? p.tags.split(",").map((t) => t.trim()) : []))
        .filter(Boolean)
    )
  );

  const filteredPosts = selectedTag
    ? posts.filter((p) =>
        p.tags?.split(",").map((t) => t.trim()).includes(selectedTag)
      )
    : posts;

  return (
    <>
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
          {filteredPosts.length === 0 ? (
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
    </>
  );
};

export default BlogTagFilter;
