"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const POSTS_PER_PAGE = 9;
const MAX_VISIBLE_TAGS = 8;

const BlogTagFilter = ({ posts }: BlogTagFilterProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allTags = Array.from(
    new Set(
      posts
        .flatMap((p) => (p.tags ? p.tags.split(",").map((t) => t.trim()) : []))
        .filter((t) => t && !/["\[\]{}()]/.test(t))
    )
  ).slice(0, MAX_VISIBLE_TAGS);

  const filteredPosts = selectedTag
    ? posts.filter((p) =>
        p.tags?.split(",").map((t) => t.trim()).includes(selectedTag)
      )
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <section className="pb-6">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTagChange(null)}
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  !selectedTag
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag === selectedTag ? null : tag)}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                    selectedTag === tag
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
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
      <section className="pb-14 md:pb-18">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">
                {selectedTag
                  ? `No posts found for "${selectedTag}".`
                  : "No blog posts yet. Check back soon."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedPosts.map((post, index) => (
                  <BlogCard key={post.id} {...post} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                        currentPage === page
                          ? "bg-primary text-white shadow-sm"
                          : "border border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] text-muted-foreground ml-2">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogTagFilter;
