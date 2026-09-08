import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarBlank, Check } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES } from "@/data/services";
import { TIDYCAL } from "@/data/homepage";

const siteUrl = "https://cybiqon.in";

/**
 * The services hub — the page for the primary term, "custom software development for
 * Indian businesses", with the seven service pages hanging off it.
 *
 * This exists because the homepage rewrite traded explicit keyword coverage for better
 * copy. The old homepage had "Website Development", "Android App Development", "Bulk
 * Scraping" and "Chrome Extensions" as literal headings; the new one talks about custom
 * software and AI agents, which reads better and ranks for less. A homepage should not
 * chase nine terms — these pages carry them, and the homepage links down.
 */
export const metadata: Metadata = {
  title: "Custom Software Development for Indian Businesses",
  description:
    "Custom software, AI agents, websites, Android apps, admin panels, WhatsApp automation and Chrome extensions — built for one business. From ₹6,999.",
  keywords:
    "custom software development India, software development company India, AI agent development, custom website development India, android app development India, admin panel development, WhatsApp automation India, chrome extension development, web scraping services India, business automation India",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Custom Software Development for Indian Businesses | Cybiqon AI Solutions",
    description:
      "Custom software, AI agents, websites, apps and automation for Indian businesses. Every price published.",
    url: `${siteUrl}/services`,
    type: "website",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Custom software development for Indian businesses — Cybiqon AI Solutions",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cybiqon services",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.headline,
      description: s.tagline,
      url: `${siteUrl}/services/${s.slug}`,
      provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
      areaServed: { "@type": "Country", name: "India" },
    },
  })),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {[breadcrumbSchema, itemListSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="relative overflow-hidden bg-surface pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <p className="t-eyebrow text-accent-ink">Services</p>
          <h1 className="t-h1 mt-2.5 max-w-[20ch] text-primary">
            Custom software development for Indian businesses
          </h1>
          <p className="t-body-lg mt-5 max-w-[62ch] text-muted-foreground">
            Seven things we build, each written for one business rather than configured from
            a theme. Every price is on the page — one-time, not a retainer, and the code is
            yours on handover.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={TIDYCAL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="book_call"
              data-track-label="services_hub"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_12px_rgba(0,216,144,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(0,216,144,0.38)]"
            >
              <CalendarBlank weight="bold" aria-hidden className="h-4 w-4" />
              Book a free 30-min call
            </a>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-7 text-[15px] font-medium text-primary transition-colors hover:bg-surface-low"
            >
              See what we have shipped
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_28px_-12px_rgba(0,48,79,0.3)]"
                >
                  <h2 className="t-h3 text-primary">{s.name}</h2>
                  <p className="t-body-sm mt-2 flex-1 text-muted-foreground">{s.tagline}</p>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      {s.price ? (
                        <>
                          <p className="t-label-sm text-muted-foreground">From</p>
                          <p className="t-h3 text-accent-ink">{s.price}</p>
                        </>
                      ) : (
                        <p className="t-label text-primary">Scoped per project</p>
                      )}
                    </div>
                    <ArrowRight
                      weight="bold"
                      aria-hidden
                      className="mb-1 h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="How we work"
            title="The same three rules on every project"
          />
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                t: "The price is published",
                b: "Every figure on this site is one-time and stated before you talk to us. Hosting is paid directly to the provider, so it is never marked up.",
              },
              {
                t: "You own the result",
                b: "Code, repository, server keys, DNS and store listings transfer on handover. Nothing is retained as leverage to keep you.",
              },
              {
                t: "You talk to the builders",
                b: "Two founders, no account managers, no offshore hand-off. The people on the call are the people writing the code.",
              },
            ].map((r) => (
              <li key={r.t} className="rounded-2xl border border-border/60 bg-surface-lowest p-6">
                <Check weight="bold" aria-hidden className="h-5 w-5 text-secondary" />
                <h3 className="t-h3 mt-3 text-primary">{r.t}</h3>
                <p className="t-body-sm mt-2 text-muted-foreground">{r.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
