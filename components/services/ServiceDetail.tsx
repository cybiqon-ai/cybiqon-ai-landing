import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarBlank, Check } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@/data/services";
import { TIDYCAL } from "@/data/homepage";

const siteUrl = "https://cybiqon.in";

/**
 * Shared body for the seven service pages.
 *
 * One component rather than seven near-identical files, for the same reason
 * components/products/ProductDetail.tsx is one: the routes are thin shims because Next 16
 * emits a Node ISR fallback for a dynamic segment even with dynamicParams = false, and
 * next-on-pages rejects that fallback and fails the build. Concrete route files are the
 * way out. See .okf/site/routes.md — do not "simplify" this into /services/[slug].
 */
export default function ServiceDetail({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter(Boolean) as typeof SERVICES;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${siteUrl}/services/${service.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.headline,
    description: service.intro,
    provider: {
      "@type": "Organization",
      name: "Cybiqon AI Solutions",
      url: siteUrl,
    },
    areaServed: { "@type": "Country", name: "India" },
    url: `${siteUrl}/services/${service.slug}`,
    ...(service.price
      ? {
          offers: {
            "@type": "Offer",
            price: service.price.replace(/[^0-9]/g, ""),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      {[breadcrumbSchema, serviceSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="t-label-sm mb-7 inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft weight="bold" aria-hidden className="h-3.5 w-3.5" />
            All services
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h1 className="t-h1 max-w-[20ch] text-primary">{service.headline}</h1>
              <p className="t-body-lg mt-5 max-w-[58ch] text-muted-foreground">
                {service.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={TIDYCAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="book_call"
                  data-track-label={`service_${service.slug}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_12px_rgba(253,101,30,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(253,101,30,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <CalendarBlank weight="bold" aria-hidden className="h-4 w-4" />
                  Book a free 30-min call
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-7 text-[15px] font-medium text-primary transition-colors hover:bg-surface-low"
                >
                  See all prices
                </Link>
              </div>
            </div>

            {service.price && (
              <div className="rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] lg:self-start">
                <p className="t-label-sm text-muted-foreground">One-time, from</p>
                <p className="t-display mt-1 text-accent" style={{ fontSize: "3rem", lineHeight: 1.05 }}>
                  {service.price}
                </p>
                <p className="t-label mt-1 text-primary">{service.priceNote}</p>
                <p className="t-body-sm mt-4 border-t border-border/60 pt-4 text-muted-foreground">
                  Not a retainer and not a percentage. Hosting, where it applies, is paid
                  directly to the provider so we never mark it up.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
          <div>
            <p className="t-eyebrow text-accent">What you get</p>
            <h2 className="t-h2 mt-2.5 text-primary">Included</h2>
          </div>
          <ul className="space-y-3.5">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3">
                <Check weight="bold" aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-secondary" />
                <span className="t-body text-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prose */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {service.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="t-h3 text-primary">{sec.heading}</h2>
                <p className="t-body mt-3 text-muted-foreground">{sec.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-low py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
          <div>
            <p className="t-eyebrow text-accent">Questions</p>
            <h2 className="t-h2 mt-2.5 text-primary">Asked on most calls</h2>
          </div>
          <dl className="space-y-6">
            {service.faqs.map((f) => (
              <div key={f.q} className="border-b border-border/60 pb-6 last:border-0 last:pb-0">
                <dt className="t-h3 text-primary">{f.q}</dt>
                <dd className="t-body mt-2 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related + CTA */}
      <section className="bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <h2 className="t-h2 max-w-[22ch] text-white">
            Tell us what the business needs to do
          </h2>
          <p className="t-body-lg mt-3 max-w-[54ch] text-white/70">
            Thirty minutes, no commitment. You leave with a quote and a timeline, or with the
            honest answer that we are not the right fit.
          </p>
          <a
            href={TIDYCAL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="book_call"
            data-track-label={`service_${service.slug}_cta`}
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(253,101,30,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(253,101,30,0.5)]"
          >
            Book a free call
          </a>

          <div className="mt-12 border-t border-white/15 pt-8">
            <p className="t-label-sm text-white/60">Related services</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="t-label inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2.5 text-white transition-colors hover:bg-white/10"
                  >
                    {r.name}
                    <ArrowRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
