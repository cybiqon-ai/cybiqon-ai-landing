import type { Metadata } from "next";
import Link from "next/link";
import { parsePage } from "@/lib/blog";
import { getLabIndex, istDate, istStamp } from "@/lib/lab";
import LabRow from "@/components/lab/LabRow";

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";

interface PageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  const suffix = page > 1 ? ` — Page ${page}` : "";

  return {
    title: `Lab — engineering notes${suffix}`,
    description:
      "Engineering notes from Cybiqon: what we are building, what broke, and what the numbers said. AI, code, infrastructure and the products behind them.",
    alternates: { canonical: page > 1 ? `/lab?page=${page}` : "/lab" },
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
      title: "Cybiqon Lab — engineering notes",
      description: "What we are building, what broke, and what the numbers said.",
      images: [`${siteUrl}/lab-og.png`],
    },
  };
}

export default async function LabIndex({ searchParams }: PageProps) {
  const page = parsePage((await searchParams).page);
  const { posts, total, totalPages, since, last } = await getLabIndex(page);

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
  };

  const pageHref = (n: number) => (n <= 1 ? "/lab" : `/lab?page=${n}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <section className="pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="lab-measure max-w-[640px]">
            <h1 className="lab-display text-[40px] md:text-[54px] text-foreground">
              Notes from the workshop
            </h1>
            <p className="font-prose text-[19px] leading-[32px] text-muted-foreground mt-5">
              What we are building, what broke, and what the numbers said. Written by
              hand, published when there is something worth saying — not on a schedule.
            </p>
          </div>

          {/* The lab's own readout. Three posts is what it says when there are three
              posts: the section's entire argument is that published numbers should be
              real, and it would be a strange place to start by rounding one up. */}
          {total > 0 && (
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
              Nothing published here yet.
            </p>
          ) : (
            <>
              <div className="border-t border-border">
                {posts.map((post) => (
                  <LabRow key={post.id} post={post} />
                ))}
              </div>

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
