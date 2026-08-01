import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import {
  extractHeadings,
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug("lab", slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt || "",
    keywords: post.tags || undefined,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: { canonical: `/lab/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "",
      url: `${siteUrl}/lab/${post.slug}`,
      publishedTime: isoDate(post.created_at),
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image_url || `${siteUrl}/lab-og.png`,
    datePublished: isoDate(post.created_at),
    wordCount: readouts.find((r) => r.label === "words")?.value.replace(/\D/g, ""),
    timeRequired: `PT${readingMinutes(post.content)}M`,
    keywords: post.tags || undefined,
    inLanguage: "en",
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    publisher: {
      "@type": "Organization",
      name: "Cybiqon AI Solutions",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/lab/${post.slug}` },
  };

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

              {tags.length > 0 && (
                <p className="lab-readout text-muted-foreground mt-12 pt-5 border-t border-border">
                  {tags.join(" · ")}
                </p>
              )}

              <ShareRow slug={post.slug} title={post.title} />

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
