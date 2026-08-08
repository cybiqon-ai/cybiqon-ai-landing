import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, slugifyTag } from "@/lib/blog";
import {
  extractCitations,
  extractFAQ,
  extractHeadings,
  getRelatedLabPosts,
  isoDate,
  istDate,
  istHuman,
  postReadouts,
  readingMinutes,
  splitTags,
} from "@/lib/lab";
import ReadoutRail from "@/components/lab/ReadoutRail";
import LabTOC from "@/components/lab/LabTOC";
import LabCTA from "@/components/lab/LabCTA";
import ShareRow from "@/components/lab/ShareRow";
import SubscribeForm from "@/components/lab/SubscribeForm";
import ViewBeacon from "@/components/lab/ViewBeacon";

export const runtime = "edge";

const siteUrl = "https://cybiqon.in";

// The author is a real named person, not "Cybiqon Team". /lab was built partly to
// close the E-E-A-T gap seo.md flags, and a byline nobody can look up closes nothing.
const AUTHOR = {
  name: "Prajjwal Pathak",
  url: `${siteUrl}/lab/about`,
};

// Below this, a contents rail is furniture rather than navigation.
const MIN_HEADINGS_FOR_TOC = 4;

// How many "read next" entries to offer. Three is the most a reader will weigh; past
// that it stops being a recommendation and starts being an index they already have.
const RELATED_COUNT = 3;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug("lab", slug);
  // The page 404s below, but a 404 that inherits `index: true` from the root layout is
  // still an invitation. Deleted posts and D1 outages both land here.
  if (!post) return { title: "Post not found", robots: { index: false, follow: false } };

  /**
   * Two titles, two jobs. `title` is written to be read and is the h1, the OG card and
   * the RSS item; `seo_title` is written to be searched and goes here. "Nobody escaped.
   * The sandbox had a door." is the right headline for a reader and a string nobody
   * types into Google, and picking one of those to sacrifice was the wrong trade.
   *
   * The social title stays poetic on purpose: a share is seen by someone who already
   * chose to look, and search-shaped titles read as content marketing in a feed.
   */
  const searchTitle = post.seo_title || post.title;

  return {
    title: searchTitle,
    description: post.excerpt || "",
    keywords: post.tags || undefined,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: {
      canonical: `/lab/${post.slug}`,
      // The same prose as markdown, for anything that would rather not parse 134 KB of
      // HTML to reach 21 K characters of text. Generated at build time by
      // scripts/build-agent-markdown.mjs — read its header before changing this path.
      types: { "text/markdown": `${siteUrl}/md/lab/${post.slug}.md` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "",
      url: `${siteUrl}/lab/${post.slug}`,
      publishedTime: isoDate(post.created_at),
      modifiedTime: post.updated_at ? isoDate(post.updated_at) : undefined,
      authors: [AUTHOR.name],
      images: post.image_url ? [{ url: post.image_url, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: post.image_url ? [post.image_url] : undefined,
    },
  };
}

export default async function LabPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug("lab", slug);

  // notFound() throws to signal, so it stays outside getPostBySlug's catch — a D1
  // outage and a deleted post both land here, which is the honest outcome for both.
  if (!post) notFound();

  // H1 -> H2 for the same reason /blog does it: the page already has an h1, and a
  // second one from the body would make the outline ambiguous. Done before heading
  // extraction so a demoted H1 shows up in the contents rail.
  const demoted = post.content
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");
  const { html, headings } = extractHeadings(demoted);

  const readouts = postReadouts(post);
  const tags = splitTags(post.tags);
  const showTOC = headings.length >= MIN_HEADINGS_FOR_TOC;

  const faq = extractFAQ(html);
  const citations = extractCitations(html);
  const related = await getRelatedLabPosts(post.slug, tags, RELATED_COUNT);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    // The searchable string is the headline; the printed one is kept beside it rather
    // than discarded, so the two never disagree about what this page is called.
    headline: post.seo_title || post.title,
    alternativeHeadline: post.seo_title ? post.title : undefined,
    description: post.excerpt,
    url: `${siteUrl}/lab/${post.slug}`,
    image: post.image_url || `${siteUrl}/lab-og.png`,
    datePublished: isoDate(post.created_at),
    // Omitted rather than defaulted to datePublished. dateModified is a claim that the
    // post now says something different, and a post published once has not been edited —
    // see migrations/0007_lab_seo.sql.
    dateModified: post.updated_at ? isoDate(post.updated_at) : undefined,
    wordCount: readouts.find((r) => r.label === "words")?.value.replace(/\D/g, ""),
    timeRequired: `PT${readingMinutes(post.content)}M`,
    keywords: post.tags || undefined,
    // What the post is about, as entities rather than as a keyword string. Both fields
    // are read; `about` is the subject, `mentions` is what a retrieval engine matches on.
    about: tags.length ? tags.map((name) => ({ "@type": "Thing", name })) : undefined,
    articleSection: tags[0],
    inLanguage: "en",
    // The post's own reading list. /lab's argument is that claims should be checkable,
    // and 20-odd cited documents are the strongest evidence of that on the page — until
    // this was added they existed only as anchors in the body, invisible to anything
    // reading the structured data.
    citation: citations.length ? citations : undefined,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    publisher: {
      "@type": "Organization",
      name: "Cybiqon AI Solutions",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    isPartOf: { "@type": "Blog", "@id": `${siteUrl}/lab`, name: "Cybiqon Lab" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/lab/${post.slug}` },
  };

  /**
   * The post's own FAQ section, read back out of the rendered body.
   *
   * Emitted only when the post has one — an empty FAQPage is a schema error, and a
   * fabricated question is worse than a missing block. See lib/lab.ts:extractFAQ for why
   * this is derived rather than stored, and lab/posts/README.md for the convention.
   */
  const faqSchema = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Lab", item: `${siteUrl}/lab` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/lab/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Renders nothing; POSTs one view per browser session. Placed here rather than
          in the layout so it only fires on a post, never on the index or /lab/about. */}
      <ViewBeacon slug={post.slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <article>
          <header className="pt-12 pb-8 md:pt-20 md:pb-12">
            <Link
              href="/lab"
              className="lab-readout text-muted-foreground hover:text-signal transition-colors"
            >
              ← Lab
            </Link>

            <div className="lab-measure max-w-[760px] mt-6">
              <h1 className="lab-display text-[34px] md:text-[46px] text-foreground">
                {post.title}
              </h1>
            </div>

            <p className="lab-readout text-muted-foreground mt-5">
              <Link href="/lab/about" className="text-foreground hover:text-signal transition-colors">
                {AUTHOR.name}
              </Link>
              <span aria-hidden="true" className="text-border mx-2">
                ·
              </span>
              <time dateTime={isoDate(post.created_at)}>{istHuman(post.created_at)}</time>
              <span aria-hidden="true" className="text-border mx-2">
                ·
              </span>
              {readingMinutes(post.content)} min
            </p>
          </header>

          {/* Rail · body · contents. The body column is fixed at its comfortable
              measure rather than fluid, so the reading line never stretches when the
              contents rail is absent on a short post. */}
          <div
            className={`grid gap-8 lg:gap-12 ${
              showTOC
                ? "lg:grid-cols-[130px_minmax(0,680px)_180px]"
                : "lg:grid-cols-[130px_minmax(0,680px)]"
            }`}
          >
            <ReadoutRail
              readouts={readouts}
              date={{ display: istDate(post.created_at), iso: isoDate(post.created_at) }}
              stacked
              className="hidden lg:block self-start sticky top-8"
            />
            <ReadoutRail
              readouts={readouts}
              date={{ display: istDate(post.created_at), iso: isoDate(post.created_at) }}
              className="lg:hidden border-y border-border py-3"
            />

            <div className="min-w-0">
              <div
                className="lab-prose"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Tags were text until now, which made a post a dead end: the only way
                  out was the browser's back button. They point at /lab?tag= rather than
                  a /lab/tag/<t> route because a React edge route costs ~440 KiB against
                  a 3 MiB Worker ceiling, and the index already reads searchParams. */}
              {tags.length > 0 && (
                <p className="lab-readout text-muted-foreground mt-12 pt-5 border-t border-border flex flex-wrap gap-x-3 gap-y-1">
                  {tags.map((tag, i) => (
                    <span key={tag}>
                      {i > 0 && (
                        <span aria-hidden="true" className="text-border mr-3">
                          ·
                        </span>
                      )}
                      <Link
                        href={`/lab?tag=${slugifyTag(tag)}`}
                        className="hover:text-signal transition-colors"
                      >
                        {tag}
                      </Link>
                    </span>
                  ))}
                </p>
              )}

              <ShareRow slug={post.slug} title={post.title} />

              {/* Read next, then subscribe, then hire us — cheapest ask first. Someone
                  who has just finished 3,000 words is likeliest to read another, and a
                  post that ends in a booking link and nothing else spends that. */}
              {related.length > 0 && (
                <section className="mt-12 pt-6 border-t border-border">
                  <h2 className="lab-readout text-muted-foreground">Read next</h2>
                  <ul className="mt-4 space-y-4">
                    {related.map((next) => (
                      <li key={next.id}>
                        <Link href={`/lab/${next.slug}`} className="group block">
                          <span className="lab-display text-[19px] text-foreground group-hover:text-signal transition-colors">
                            {next.title}
                          </span>
                          {next.excerpt && (
                            <span className="font-prose text-[15px] leading-[26px] text-muted-foreground block mt-1">
                              {next.excerpt}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Subscribe before the hire-us CTA: a reader who just finished is far
                  likelier to give an email than to book a call, and putting the larger
                  ask first spends the goodwill on the less likely outcome. */}
              <SubscribeForm source="post" />

              <LabCTA />
            </div>

            {showTOC && (
              <div className="hidden lg:block self-start sticky top-8">
                <LabTOC headings={headings} />
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
