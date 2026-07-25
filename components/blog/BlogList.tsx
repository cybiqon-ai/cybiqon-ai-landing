import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "./BlogCard";
import type { BlogPost, TagInfo } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
  tags: TagInfo[];
  /** Slug of the active tag archive, or null on /blog */
  activeTag?: string | null;
  currentPage: number;
  totalPages: number;
  /** Base path for pagination links — "/blog" or "/blog/tag/<slug>" */
  basePath: string;
  emptyMessage?: string;
}

/**
 * Server component. Replaces the old client-side BlogTagFilter.
 *
 * The point of the rewrite is crawlability: tag pills and pagination are now real
 * <Link> hrefs rather than useState. Previously /blog rendered 9 links out of 76 posts
 * with no paginated URLs at all, so 46 posts had no internal link path anywhere on the
 * site and were discoverable only via sitemap.xml.
 */
export default function BlogList({
  posts,
  tags,
  activeTag = null,
  currentPage,
  totalPages,
  basePath,
  emptyMessage = "No blog posts yet. Check back soon.",
}: BlogListProps) {
  const pageHref = (page: number) => (page <= 1 ? basePath : `${basePath}?page=${page}`);

  const pill =
    "inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border";
  const pillOn = "bg-primary text-white border-primary shadow-sm";
  const pillOff =
    "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary";

  return (
    <>
      {tags.length > 0 && (
        <section className="pb-6">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
            <div className="flex flex-wrap gap-2">
              <Link href="/blog" className={`${pill} ${!activeTag ? pillOn : pillOff}`}>
                All
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className={`${pill} ${activeTag === tag.slug ? pillOn : pillOff}`}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-14 md:pb-18">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post, index) => (
                  <BlogCard key={post.id} {...post} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="flex items-center justify-center gap-2 mt-10"
                  aria-label="Blog pagination"
                >
                  {currentPage > 1 ? (
                    <Link
                      href={pageHref(currentPage - 1)}
                      rel="prev"
                      aria-label="Previous page"
                      className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center opacity-40">
                      <ChevronLeft className="w-4 h-4" />
                    </span>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
                    page === currentPage ? (
                      <span
                        key={page}
                        aria-current="page"
                        className="w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center bg-primary text-white shadow-sm"
                      >
                        {page}
                      </span>
                    ) : (
                      <Link
                        key={page}
                        href={pageHref(page)}
                        className="w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center border border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-200"
                      >
                        {page}
                      </Link>
                    )
                  )}

                  {currentPage < totalPages ? (
                    <Link
                      href={pageHref(currentPage + 1)}
                      rel="next"
                      aria-label="Next page"
                      className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center opacity-40">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}

                  <span className="text-[11px] text-muted-foreground ml-2">
                    Page {currentPage} of {totalPages}
                  </span>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
