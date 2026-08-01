import Link from "next/link";
import ReadoutRail from "./ReadoutRail";
import { istDate, isoDate, postReadouts, splitTags } from "@/lib/lab";
import type { FullBlogPost } from "@/lib/blog";

/**
 * One entry on the /lab index.
 *
 * A ruled row rather than a card, and that is not a style preference: /blog already
 * renders a three-column card grid with 16:10 thumbnails, and repeating it here would
 * make the two sections look like the same publication filtered two ways. It also
 * suits the content — these are long essays whose useful preview is a measurement and
 * a sentence, not an image.
 */
export default function LabRow({ post }: { post: FullBlogPost }) {
  const readouts = postReadouts(post);
  const tags = splitTags(post.tags).slice(0, 3);

  return (
    <article className="lab-row group border-b border-border">
      <Link
        href={`/lab/${post.slug}`}
        className="block py-7 md:py-8 transition-colors hover:bg-card focus-visible:outline-none focus-visible:bg-card focus-visible:ring-1 focus-visible:ring-ring rounded-[3px]"
      >
        <div className="px-4 md:px-5 grid gap-3 md:gap-8 md:grid-cols-[150px_1fr]">
          {/* Stacked on desktop, one strip on mobile — the same figures either way. */}
          <ReadoutRail
            readouts={readouts}
            date={{ display: istDate(post.created_at), iso: isoDate(post.created_at) }}
            stacked
            className="hidden md:block"
          />
          <ReadoutRail
            readouts={readouts}
            date={{ display: istDate(post.created_at), iso: isoDate(post.created_at) }}
            className="md:hidden"
          />

          <div className="lab-measure min-w-0">
            <h2 className="lab-display text-[26px] md:text-[30px] text-foreground group-hover:text-signal transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="font-prose text-[16px] leading-[26px] text-muted-foreground mt-2.5 max-w-[62ch]">
                {post.excerpt}
              </p>
            )}
            {tags.length > 0 && (
              <p className="lab-readout text-muted-foreground mt-3">
                {tags.join(" · ")}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
