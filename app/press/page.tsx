import type { Metadata } from "next";
import Link from "next/link";

import { MENTIONS, PRESS_KIT } from "@/data/press";

// No `runtime = "edge"`, no D1, no searchParams/cookies/headers: this prerenders as
// static. That is a size decision, not a style one — every React route compiled for the
// edge costs ~440 KiB gzipped in the Worker, and `.okf/site/seo.md` F7 measured only
// ~182 KiB of headroom against Cloudflare's 3 MiB ceiling, which is enforced at upload
// rather than at build. A dynamic /press would deploy fine locally and fail on push.

const siteUrl = "https://cybiqon.in";

/**
 * The press page.
 *
 * Built as a press *kit*, not a mentions list. With one clipping a list looks thin,
 * while a kit is complete: it answers who to contact and what he can speak to, which is
 * what a journalist arrives wanting. The hero is the quote at display size rather than
 * a logo wall — a logo wall with one logo is the canonical sad pattern, and `data/press.ts`
 * has no `logo` field precisely so nobody builds one later.
 *
 * The clipping caption naming the absence of an online version is the most valuable
 * sentence here: it converts a missing URL from a weakness into a checkable statement.
 */
export const metadata: Metadata = {
  // Brand omitted — the layout template appends "| Cybiqon AI Solutions".
  title: "Press",
  description:
    "Cybiqon AI Solutions in the press. Co-founder Prajjwal Pathak quoted in The Economic Times on why regional-language software matters to Indian MSMEs. Print only; no online version exists.",
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

const READOUT =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-primary tabular-nums";

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

      <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <h1 className="sr-only">Press</h1>

        {/* One datum styled as an instrument reading, rather than one item stranded in
            an empty grid. */}
        <p className={READOUT}>
          Press
          <span className="mx-2 text-border">·</span>
          {mention.publication}
          {v.medium === "print" && (
            <>
              <span className="mx-2 text-border">·</span>
              {v.edition} print edition
              <span className="mx-2 text-border">·</span>
              {formatDate(v.publishedOn)}
              <span className="mx-2 text-border">·</span>
              {v.page}
            </>
          )}
        </p>

        <blockquote className="mt-8">
          <p className="text-2xl md:text-4xl font-bold leading-[1.18] tracking-tight text-foreground">
            &ldquo;{mention.quote}&rdquo;
          </p>
          <cite className="mt-6 block not-italic text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {mention.attribution.name}
            </span>
            , {mention.attribution.role} &mdash; quoted by {mention.journalist} in{" "}
            {mention.publication}, {formatDate(v.publishedOn)}
          </cite>
        </blockquote>

        <p className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {mention.context}
        </p>

        <figure className="mt-12">
          {/* Plain <img>, not next/image: next.config.mjs installs a passthrough custom
              loader, so next/image buys no optimisation here and would add a client
              runtime chunk to a page whose whole point is being static and cheap. The
              rest of the site (Navbar, Footer) uses <img> for the same reason.
              width/height are the intrinsic pixels, so the space is reserved and the
              clipping cannot shift the page as it loads. */}
          {v.medium === "print" && (
            <>
              <img
                src={v.clippingUrl}
                alt={v.clippingAlt}
                width={v.clippingWidth}
                height={v.clippingHeight}
                loading="lazy"
                decoding="async"
                className="w-full max-w-2xl mx-auto rounded-lg border border-border shadow-sm"
              />
              <figcaption className="mt-4 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
                Photographed from the print edition. There is no online version of this
                piece. {mention.publication}, {v.edition} &mdash; {mention.journalist},{" "}
                {formatDate(v.publishedOn)}, {v.page}. Reproduced in part for reference;
                copyright remains with {mention.publisher}.
              </figcaption>
            </>
          )}
        </figure>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className={READOUT}>For journalists</h2>

          <dl className="mt-8 divide-y divide-border">
            <div className="grid gap-2 py-5 md:grid-cols-[200px_1fr]">
              <dt className="text-sm font-semibold text-foreground">Who to contact</dt>
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

            <div className="grid gap-2 py-5 md:grid-cols-[200px_1fr]">
              <dt className="text-sm font-semibold text-foreground">Short bio</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">
                {PRESS_KIT.founderBio}
              </dd>
            </div>

            <div className="grid gap-2 py-5 md:grid-cols-[200px_1fr]">
              <dt className="text-sm font-semibold text-foreground">Can speak to</dt>
              <dd className="text-sm text-muted-foreground">
                <ul className="space-y-1.5">
                  {PRESS_KIT.speaksTo.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="grid gap-2 py-5 md:grid-cols-[200px_1fr]">
              <dt className="text-sm font-semibold text-foreground">More</dt>
              <dd className="text-sm text-muted-foreground">
                <Link href={PRESS_KIT.authorPage} className="text-primary hover:underline">
                  Who writes the Lab
                </Link>
                <span className="mx-2 text-border">·</span>
                <Link href="/about" className="text-primary hover:underline">
                  About Cybiqon
                </Link>
                <span className="mx-2 text-border">·</span>
                <a href="/logo.png" className="text-primary hover:underline">
                  Logo
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
