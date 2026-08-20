import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper } from "lucide-react";

import { MENTIONS, PRESS_KIT } from "@/data/press";

// No `runtime = "edge"`, no D1, no searchParams/cookies/headers: this prerenders as
// static. That is a size decision, not a style one — every React route compiled for the
// edge costs ~440 KiB gzipped in the Worker, and `.okf/site/seo.md` F7 measured only
// ~169 KiB of headroom against Cloudflare's 3 MiB ceiling, which is enforced at upload
// rather than at build. A dynamic /press would deploy fine locally and fail on push.

const siteUrl = "https://cybiqon.in";

/**
 * The press page.
 *
 * Built as a press *kit*, not a mentions list. With one clipping a list looks thin,
 * while a kit is complete: it answers who to contact and what he can speak to, which is
 * what a journalist arrives wanting. `data/press.ts` has no `logo` field precisely so
 * nobody builds a one-logo wall here later.
 *
 * **Rebuilt 20 Aug 2026.** The first version set the full 66-word quote at
 * `text-2xl md:text-4xl` — nine lines of display type at desktop, nineteen on a phone —
 * hid the h1 with `sr-only`, and used a container (`max-w-4xl`) that appears nowhere
 * else on the site. It also started at `py-16`, which put the first line under the 73px
 * fixed navbar on mobile. This version follows the marketing conventions in
 * `.okf/site/design-system.md` instead of inventing its own: pill eyebrow, the house
 * h1 string, `max-w-5xl` container, `bg-muted/30` section tint.
 *
 * The type scale now has a middle. The article's own headline carries it — previously it
 * existed only inside the JSON-LD, which meant the most legible line available to this
 * page was invisible on it.
 */
export const metadata: Metadata = {
  // Brand omitted — the layout template appends "| Cybiqon AI Solutions".
  title: "Press",
  // Kept under 155 so Google does not truncate it. The long version lived here until
  // the 19 Aug SEO pass measured it at 187.
  description:
    "Cybiqon AI Solutions in the press. Co-founder Prajjwal Pathak, quoted in The Economic Times on regional-language software for Indian MSMEs.",
  alternates: { canonical: "/press" },
  openGraph: {
    type: "website",
    // NOT templated, so the brand belongs here.
    title: "Press | Cybiqon AI Solutions",
    description:
      "Quoted in The Economic Times, Hyderabad print edition, on vernacular AI for Indian MSMEs.",
    url: `${siteUrl}/press`,
    images: [
      {
        url: `${siteUrl}/press-og.png`,
        width: 1200,
        height: 630,
        alt: "Cybiqon AI quoted in The Economic Times on vernacular AI for Indian MSMEs",
      },
    ],
  },
  // Next REPLACES the twitter object rather than merging it, so `site` and `creator`
  // must be repeated or this page silently credits nobody. See the same comment in
  // app/lab/[slug]/page.tsx (bug F9, fixed 12 Aug 2026).
  twitter: {
    card: "summary_large_image",
    site: "@CybiqonAI",
    creator: "@CybiqonAI",
    title: "Press | Cybiqon AI Solutions",
    description:
      "Quoted in The Economic Times, Hyderabad print edition, on vernacular AI for Indian MSMEs.",
    images: [`${siteUrl}/press-og.png`],
  },
};

/** The house container. 69 uses across the marketing pages. */
const CONTAINER = "mx-auto max-w-5xl px-6 md:px-10 lg:px-16";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function PressPage() {
  const mention = MENTIONS[0];
  const v = mention.verification;

  // Built as an array rather than inline JSX: the previous version interleaved text
  // nodes with <span> separators, and JSX strips the newline whitespace between them,
  // so it rendered "Press·The Economic Times" with no space characters at all.
  const provenance = [
    mention.publication,
    ...(v.medium === "print"
      ? [`${v.edition} print edition`, formatDate(v.publishedOn), v.page]
      : [formatDate(v.publishedOn)]),
  ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Press", item: `${siteUrl}/press` },
    ],
  };

  // A print-only mention can legitimately carry structured data: schema.org has
  // first-class `printEdition` / `printPage` properties for exactly this case. What is
  // NOT legitimate is inventing a `url` or an `image` for an article we do not host, so
  // neither key appears. The quote is visibly on this page, which is what keeps the
  // markup inside Google's "represents the main content" policy.
  const quotation = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/press`,
    name: "Press",
    mainEntity: {
      "@type": "Quotation",
      text: mention.quote,
      spokenByCharacter: {
        "@type": "Person",
        name: mention.attribution.name,
        url: `${siteUrl}${PRESS_KIT.authorPage}`,
      },
      isPartOf: {
        "@type": "NewsArticle",
        headline: mention.headline,
        datePublished: v.publishedOn,
        author: { "@type": "Person", name: mention.journalist },
        ...(v.medium === "print"
          ? { printEdition: v.edition, printPage: v.page }
          : { url: v.url }),
        publisher: {
          "@type": "Organization",
          name: mention.publication,
          parentOrganization: { "@type": "Organization", name: mention.publisher },
        },
      },
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quotation) }}
      />

      {/* pt-24 md:pt-28 is the site-wide clearance for the 73px fixed navbar. */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className={CONTAINER}>
          <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
            <Newspaper className="w-3 h-3" />
            In the press
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
            Cybiqon in the <span className="text-primary">press</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
            One mention so far. It is in print only, so the clipping is the record — the
            full page is here too, for anyone who wants to check it.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-muted/30">
        {/* One left edge for everything in this section, images included. The previous
            version mixed flush-left text with a centred figure 96px to its right. */}
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground tabular-nums">
              {provenance.map((part, i) => (
                <span key={part}>
                  {i > 0 && <span className="mx-2 text-border">·</span>}
                  {i === 1 && v.medium === "print" ? (
                    <time dateTime={v.publishedOn}>{part}</time>
                  ) : (
                    part
                  )}
                </span>
              ))}
            </p>

            {/* The journalist's headline, not ours — labelled as such. This is also the
                page's only intermediate type size; without it the scale jumps 11px to
                display with nothing between. */}
            <h2 className="mt-4 text-xl md:text-2xl font-extrabold tracking-tight">
              {mention.headline}
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {mention.subject} &mdash; reported by {mention.journalist}
            </p>

            <figure className="mt-8">
              {/* Display size is reserved for the one sentence that survives being
                  lifted out. data/press.ts asserts it is a verbatim substring. */}
              <blockquote className="border-l-2 border-primary pl-4 md:pl-5">
                <p className="text-xl md:text-2xl font-semibold leading-snug tracking-tight text-foreground">
                  &ldquo;{mention.pullQuote}&rdquo;
                </p>
              </blockquote>

              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                The full quote, as printed: &ldquo;{mention.quote}&rdquo;
              </p>

              <figcaption className="mt-5">
                <p className="font-bold text-sm text-foreground">
                  {mention.attribution.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mention.attribution.role}
                </p>
              </figcaption>
            </figure>

            <p className="mt-8 text-sm md:text-base text-muted-foreground leading-relaxed">
              {mention.context}
            </p>
          </div>

          {v.medium === "print" && (
            <div className="max-w-3xl mt-10 space-y-10">
              {/* Plain <img>, not next/image: next.config.mjs installs a passthrough
                  custom loader, so next/image buys no optimisation here and would add a
                  client runtime chunk to a page whose whole point is being static and
                  cheap. width/height are intrinsic, so the space is reserved and neither
                  image can shift the page as it loads.

                  bg-white on the frame is deliberate: the newsprint is pure white and so
                  is the page, so without an explicit surface the clipping dissolves into
                  the background with only a hairline border holding it. */}
              <figure>
                <img
                  src={v.clippingUrl}
                  alt={v.clippingAlt}
                  width={v.clippingWidth}
                  height={v.clippingHeight}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[420px] rounded-xl border border-border bg-white"
                />
                <figcaption className="mt-3 max-w-[420px] text-xs text-muted-foreground leading-relaxed">
                  The passage as printed. There is no online version of this piece, so
                  this is the only copy there is.
                </figcaption>
              </figure>

              {/* Wide, because it has to be. Its body copy is ~0.0074 of displayed
                  width — unreadable at any width a layout can offer — so this is
                  provenance, not reading matter, and the caption says so rather than
                  pretending otherwise. */}
              <figure>
                <img
                  src={v.fullPageUrl}
                  alt={v.fullPageAlt}
                  width={v.fullPageWidth}
                  height={v.fullPageHeight}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl border border-border bg-white"
                />
                <figcaption className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {/* Composed in JS, not interpolated mid-sentence: JSX dropped the
                      space after this expression and shipped "page 4as it ran". */}
                  {`The upper portion of ${v.page.toLowerCase()} as it ran`} &mdash; an
                  Independence Day Special. The body text is not meant to be readable at
                  this size; it is here to show where the quote sat. Copyright remains
                  with {mention.publisher}.
                </figcaption>
              </figure>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-14">
        <div className={CONTAINER}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            For journalists
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Everything here is checkable. Nothing on this page is anything a reader
            cannot verify.
          </p>

          <dl className="max-w-3xl divide-y divide-border border-t border-border">
            <div className="grid gap-1 py-5 md:grid-cols-[140px_1fr] md:gap-x-6">
              <dt className="text-sm font-semibold text-foreground">Contact</dt>
              <dd className="text-sm text-muted-foreground">
                {PRESS_KIT.founder} &mdash; {PRESS_KIT.founderRole}
                <br />
                <a
                  href={`mailto:${PRESS_KIT.email}`}
                  className="text-primary hover:underline"
                >
                  {PRESS_KIT.email}
                </a>
              </dd>
            </div>

            <div className="grid gap-1 py-5 md:grid-cols-[140px_1fr] md:gap-x-6">
              <dt className="text-sm font-semibold text-foreground">Short bio</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                {PRESS_KIT.founderBio}
              </dd>
            </div>

            <div className="grid gap-1 py-5 md:grid-cols-[140px_1fr] md:gap-x-6">
              <dt className="text-sm font-semibold text-foreground">Can speak to</dt>
              {/* Real markers. Tailwind preflight strips list-style, so the previous
                  unmarked, unpunctuated version read as a paragraph that had lost its
                  line breaks — and on mobile as one undifferentiated grey block. */}
              <dd>
                <ul className="list-disc pl-5 marker:text-primary space-y-2 text-sm text-muted-foreground leading-relaxed max-w-prose">
                  {PRESS_KIT.speaksTo.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="grid gap-1 py-5 md:grid-cols-[140px_1fr] md:gap-x-6">
              <dt className="text-sm font-semibold text-foreground">Assets</dt>
              <dd className="text-sm text-muted-foreground">
                <ul className="space-y-1.5">
                  <li>
                    <a
                      href="/logo.png"
                      download
                      className="text-primary hover:underline"
                    >
                      Logo
                    </a>{" "}
                    &mdash; PNG, 1200&times;630
                  </li>
                  <li>
                    <a
                      href={v.medium === "print" ? v.clippingUrl : "/press"}
                      download
                      className="text-primary hover:underline"
                    >
                      Clipping
                    </a>{" "}
                    &mdash; JPEG. Credit {mention.publication}, {mention.journalist}.
                  </li>
                  <li>
                    <Link
                      href={PRESS_KIT.authorPage}
                      className="text-primary hover:underline"
                    >
                      Author page
                    </Link>{" "}
                    &mdash; background and what this is held to
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
