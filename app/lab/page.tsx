import type { Metadata } from "next";
import Link from "next/link";
import { parsePage } from "@/lib/blog";
import { findLabTag, getLabIndex, isoDate, istDate, istStamp } from "@/lib/lab";
import LabRow from "@/components/lab/LabRow";
import SubscribeForm from "@/components/lab/SubscribeForm";

/**
 * Outcomes of the double opt-in flow, which /api/subscribe redirects back to here.
 *
 * They live on /lab rather than on dedicated confirm/unsubscribe pages because a page
 * route costs ~420 KiB in a 3 MiB Worker and a redirect costs nothing. It also lands
 * the reader somewhere useful — the posts — rather than on a dead-end thank-you page.
 */
const NOTICES: Record<string, string> = {
  subscribed: "You're on the list. New posts will arrive by email.",
  unsubscribed: "You've been removed. No more emails.",
  already: "That link has already been used — you're on the list.",
  invalid: "That confirmation link doesn't look right. Try subscribing again.",
  error: "Something went wrong handling that link. Try again in a moment.",
};

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";

interface PageProps {
  searchParams: Promise<{
    page?: string | string[];
    /** A tag slug — the filtered view a post's own tags link to. */
    tag?: string | string[];
    /** Set by the redirects out of /api/subscribe — see NOTICES below. */
    subscribed?: string;
    unsubscribed?: string;
    subscribe?: string;
  }>;
}

/** `?tag=` arrives as a slug and may arrive twice; only the first is meaningful. */
function parseTag(raw: string | string[] | undefined): string | undefined {
  const value = (Array.isArray(raw) ? raw[0] : raw)?.trim();
  return value || undefined;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parsePage(params.page);
  const tagSlug = parseTag(params.tag);
  const tag = tagSlug ? await findLabTag(tagSlug) : null;
  const suffix = page > 1 ? ` — Page ${page}` : "";

  return {
    title: tag ? `Lab — ${tag}` : `Lab — engineering notes${suffix}`,
    description:
      "Engineering notes from Cybiqon: what we are building, what broke, and what the numbers said. AI, code, infrastructure and the products behind them.",
    /**
     * A tag view is a filter over the index, not a page of its own. It earns a crawl
     * path between related posts and nothing more, so it canonicalises to /lab and is
     * noindex,follow: three posts sliced five ways is the thin-content pattern that
     * MIN_POSTS_PER_TAG exists to keep off /blog, and the answer here is not to index it
     * rather than to hide the link.
     */
    robots: tagSlug ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: tagSlug ? "/lab" : page > 1 ? `/lab?page=${page}` : "/lab",
    },
    openGraph: {
      type: "website",
      title: "Cybiqon Lab — engineering notes",
      description:
        "What we are building, what broke, and what the numbers said.",
      url: `${siteUrl}/lab`,
      images: [{ url: `${siteUrl}/lab-og.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      // Repeated from the root layout — Next replaces this object rather than merging.
      site: "@CybiqonAI",
      creator: "@CybiqonAI",
      title: "Cybiqon Lab — engineering notes",
      description: "What we are building, what broke, and what the numbers said.",
      images: [`${siteUrl}/lab-og.png`],
    },
  };
}

export default async function LabIndex({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);

  const noticeKey = params.subscribed
    ? "subscribed"
    : params.unsubscribed
      ? "unsubscribed"
      : params.subscribe;
  const notice = noticeKey ? NOTICES[noticeKey] : undefined;

  const tagSlug = parseTag(params.tag);
  const tag = tagSlug ? await findLabTag(tagSlug) : null;
  // An unknown slug filters on a tag no post carries, which is the honest outcome: an
  // empty list beats silently showing the unfiltered index under a filtered heading.
  const { posts, total, totalPages, since, last } = await getLabIndex(
    page,
    tagSlug ? (tag ?? tagSlug) : undefined
  );

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Cybiqon Lab",
    description: "Engineering notes from Cybiqon.",
    url: `${siteUrl}/lab`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Cybiqon AI Solutions",
      url: siteUrl,
    },
    // The entries themselves. Built from the rows this page already loaded, so the list
    // costs no extra query — without it the Blog node described a publication with
    // nothing in it.
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.seo_title || post.title,
      description: post.excerpt,
      url: `${siteUrl}/lab/${post.slug}`,
      datePublished: isoDate(post.created_at),
      author: { "@type": "Person", name: "Prajjwal Pathak", url: `${siteUrl}/lab/about` },
    })),
  };

  const pageHref = (n: number) => {
    const query = new URLSearchParams();
    if (tagSlug) query.set("tag", tagSlug);
    if (n > 1) query.set("page", String(n));
    const qs = query.toString();
    return qs ? `/lab?${qs}` : "/lab";
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <section className="pt-16 pb-10 md:pt-24 md:pb-14">
          {notice && (
            <p className="lab-readout text-signal border border-border rounded-[3px] px-3 py-2 mb-8 inline-block">
              {notice}
            </p>
          )}

          <div className="lab-measure max-w-[640px]">
            <h1 className="lab-display text-[40px] md:text-[54px] text-foreground">
              Notes from the workshop
            </h1>
            <p className="font-prose text-[19px] leading-[32px] text-muted-foreground mt-5">
              What we are building, what broke, and what the numbers said. Written by
              hand, published when there is something worth saying — not on a schedule.
            </p>
          </div>

          {/* A filtered view has to say so. Same reasoning as the readout below: a page
              showing three of nine entries under the heading "Notes from the workshop"
              is stating something untrue by omission. */}
          {tagSlug && (
            <p className="lab-readout text-muted-foreground mt-8 flex flex-wrap gap-x-3 gap-y-1">
              <span>
                tagged <span className="lab-readout-value">{tag ?? tagSlug}</span>
              </span>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <Link href="/lab" className="hover:text-signal transition-colors">
                show all
              </Link>
            </p>
          )}

          {/* The lab's own readout. Three posts is what it says when there are three
              posts: the section's entire argument is that published numbers should be
              real, and it would be a strange place to start by rounding one up. */}
          {!tagSlug && total > 0 && (
            <p className="lab-readout text-muted-foreground mt-8 flex flex-wrap gap-x-3 gap-y-1">
              <span>
                entries <span className="lab-readout-value">{total}</span>
              </span>
              {since && (
                <>
                  <span aria-hidden="true" className="text-border">
                    ·
                  </span>
                  <span>
                    since <span className="lab-readout-value">{istDate(since)}</span>
                  </span>
                </>
              )}
              {last && (
                <>
                  <span aria-hidden="true" className="text-border">
                    ·
                  </span>
                  <span>
                    last <span className="lab-readout-value">{istStamp(last)}</span>
                  </span>
                </>
              )}
            </p>
          )}
        </section>

        <section className="pb-16">
          {posts.length === 0 ? (
            // Also what a D1 outage looks like — getLabIndex degrades to empty rather
            // than throwing, matching every other read path in this app.
            <p className="font-prose text-[17px] text-muted-foreground border-t border-border pt-8">
              {tagSlug ? (
                <>
                  Nothing tagged &ldquo;{tag ?? tagSlug}&rdquo;.{" "}
                  <Link href="/lab" className="hover:text-signal transition-colors">
                    Show all entries
                  </Link>
                  .
                </>
              ) : (
                "Nothing published here yet."
              )}
            </p>
          ) : (
            <>
              <div className="border-t border-border">
                {posts.map((post) => (
                  <LabRow key={post.id} post={post} />
                ))}
              </div>

              <SubscribeForm source="index" />

              {totalPages > 1 && (
                <nav
                  className="lab-readout flex items-center gap-4 mt-8"
                  aria-label="Lab pagination"
                >
                  {page > 1 && (
                    <Link
                      href={pageHref(page - 1)}
                      rel="prev"
                      className="text-muted-foreground hover:text-signal transition-colors"
                    >
                      ← newer
                    </Link>
                  )}
                  <span className="text-muted-foreground">
                    page <span className="lab-readout-value">{page}</span> of{" "}
                    <span className="lab-readout-value">{totalPages}</span>
                  </span>
                  {page < totalPages && (
                    <Link
                      href={pageHref(page + 1)}
                      rel="next"
                      className="text-muted-foreground hover:text-signal transition-colors"
                    >
                      older →
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}
