import Link from "next/link";
import {
  ArrowRight,
  Check,
  Receipt,
  ShieldCheck,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES } from "@/data/services";
import { TIDYCAL } from "@/data/homepage";

const siteUrl = "https://cybiqon.in";

/**
 * /pricing, rebuilt onto the marketing design system.
 *
 * A server component now — it was "use client" for useScrollReveal and two window.open
 * handlers, all of which are gone.
 *
 * **Every figure on this page comes from data/services.ts.** Prices previously lived in
 * three places: here, data/services.ts and data/homepage.ts. Changing the Chrome extension
 * price to ₹6,999 took three edits and could have taken two, with the third silently
 * disagreeing — which is exactly how a site ends up quoting two prices for one service.
 * The Product JSON-LD below is generated from the same array, so the structured data
 * cannot drift from the page either.
 *
 * The "typically charge" anchors are context, not a discount claim: they say what this
 * work usually costs, which is the question a buyer is actually asking.
 */
const FAQS = [
  {
    q: "Are these one-time payments or recurring?",
    a: "One-time. No monthly charge and no percentage of anything. Hosting and domain are separate — roughly ₹4,000–6,000 a year for a website — and you pay the provider directly so we never mark it up.",
  },
  {
    q: "How long do projects take?",
    a: "Websites 2–3 weeks, apps and admin panels 4–6, automation 1–3, Chrome extensions 1–2, and scraping 3–7 days. Anything larger is scoped on the call and quoted before work starts.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Every project includes support through the first releases. Ongoing maintenance is ₹2,999 a month for updates, fixes and priority response — an option, never a condition of getting your code.",
  },
  {
    q: "Can I ask for something not listed?",
    a: "Yes. These are starting prices for standard scopes. Bring the actual requirement to the call and you will get a fixed quote for it rather than a rate card.",
  },
  {
    q: "Do you offer payment plans?",
    a: "For anything over ₹20,000, 50% upfront and 50% on delivery. Say so on the call if that still does not work and we will discuss it.",
  },
];

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Free revisions while we build",
    body: "We work until it is right. If we cannot deliver what we promised, you get your money back — that is the whole guarantee, in one sentence.",
  },
  {
    icon: Receipt,
    title: "GST invoice, published prices",
    body: "Every figure on this page is what you pay. No discovery fee, no scope creep priced after the fact, and nothing added at handover.",
  },
  {
    icon: Wrench,
    title: "Maintenance is optional",
    body: "₹2,999 a month if you want updates and priority response. Decline it and you still keep the code, the credentials and the domain.",
  },
];

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cybiqon AI Solutions — custom software, AI agents and websites",
  description:
    "Custom software development for Indian businesses. One-time prices, published, with full source code ownership on handover.",
  brand: { "@type": "Brand", name: "Cybiqon AI Solutions" },
  offers: SERVICES.filter((s) => s.price).map((s) => ({
    "@type": "Offer",
    name: s.headline,
    price: s.price!.replace(/[^0-9]/g, ""),
    priceCurrency: "INR",
    description: s.tagline,
    url: `${siteUrl}/services/${s.slug}`,
    availability: "https://schema.org/InStock",
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${siteUrl}/pricing` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Pricing = () => (
  <div className="min-h-screen bg-background">
    {[breadcrumbSchema, productSchema, faqSchema].map((schema, i) => (
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
        <p className="t-eyebrow text-accent-ink">Pricing</p>
        <h1 className="t-h1 mt-2.5 max-w-[20ch] text-primary">
          Every price on one page
        </h1>
        <p className="t-body-lg mt-5 max-w-[58ch] text-muted-foreground">
          Agencies quote ₹50,000 to ₹2,50,000 for this work and rarely say so before a
          call. These are one-time prices for standard scopes, published, with the code
          handed to you at the end.
        </p>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
          {["Founder-led delivery", "100% code ownership", "No hidden fees", "GST invoice"].map(
            (item) => (
              <li key={item} className="flex items-center gap-2 text-muted-foreground">
                <Check weight="bold" aria-hidden className="h-4 w-4 shrink-0 text-secondary" />
                <span className="t-body-sm">{item}</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>

    {/* The grid */}
    <section className="bg-surface-lowest py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-surface-lowest p-6 ${
                  s.slug === "custom-websites"
                    ? "border-accent/50 shadow-[0_10px_34px_-14px_rgba(0,216,144,0.45)]"
                    : "border-border/60 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
                }`}
              >
                {s.slug === "custom-websites" && (
                  <span className="t-label-sm absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-accent-foreground">
                    Most popular
                  </span>
                )}

                <h2 className="t-h3 text-primary">{s.name}</h2>
                <p className="t-body-sm mt-2 text-muted-foreground">{s.tagline}</p>

                <div className="mt-5 rounded-xl bg-surface-low px-4 py-3.5">
                  <p className="t-h2 text-accent-ink">{s.price}</p>
                  <p className="t-label-sm mt-1 text-muted-foreground">
                    One-time · agencies typically charge {s.anchor}
                  </p>
                  <p className="t-label-sm mt-1 text-primary">{s.timeline}</p>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {s.deliverables.slice(0, 4).map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <Check
                        weight="bold"
                        aria-hidden
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary"
                      />
                      <span className="t-body-sm text-muted-foreground">{d}</span>
                    </li>
                  ))}
                </ul>

                <p className="t-body-sm mt-4 rounded-lg bg-surface-low px-4 py-3 text-muted-foreground">
                  <span className="font-semibold text-primary">Best for </span>
                  {s.bestFor}
                </p>

                <Link
                  href={`/services/${s.slug}`}
                  className={`mt-5 inline-flex h-11 items-center justify-center gap-1.5 rounded-lg px-5 text-[15px] font-semibold transition-all ${
                    s.slug === "custom-websites"
                      ? "bg-accent text-accent-foreground shadow-[0_4px_12px_rgba(0,216,144,0.25)] hover:shadow-[0_6px_18px_rgba(0,216,144,0.38)]"
                      : "bg-surface-high text-primary hover:bg-surface-container"
                  }`}
                >
                  What this involves
                  <ArrowRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </div>
            </li>
          ))}

          {/* Custom scope. Same card, no invented price. */}
          <li>
            <div className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-surface-low p-6">
              <h2 className="t-h3 text-primary">Something else</h2>
              <p className="t-body-sm mt-2 text-muted-foreground">
                Ecommerce, customer portals, integrations, or a problem that does not fit a
                row above.
              </p>
              <div className="mt-5 rounded-xl bg-surface-lowest px-4 py-3.5">
                <p className="t-h3 text-primary">Quoted on the call</p>
                <p className="t-label-sm mt-1 text-muted-foreground">
                  Fixed price before anything starts
                </p>
              </div>
              <p className="t-body-sm mt-5 flex-1 text-muted-foreground">
                We will not quote a number here we cannot stand behind. Bring the actual
                requirement and you get a fixed quote for it, or the honest answer that we
                are not the right fit.
              </p>
              <a
                href={TIDYCAL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="book_call"
                data-track-label="pricing_custom"
                className="mt-5 inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary-container"
              >
                Talk it through
                <ArrowRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
              </a>
            </div>
          </li>
        </ul>

        <p className="t-body mt-8 text-center text-muted-foreground">
          Hosting and domain are separate, roughly ₹4,000–6,000 a year, paid straight to the
          provider.
        </p>
      </div>
    </section>

    {/* Guarantees */}
    <section className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What the price includes"
          title="The part that is not a number"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {GUARANTEES.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-high text-primary">
                <g.icon weight="fill" aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="t-h3 mt-4 text-primary">{g.title}</h3>
              <p className="t-body-sm mt-2 text-muted-foreground">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="bg-surface-low py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
        <div>
          <p className="t-eyebrow text-accent-ink">Questions</p>
          <h2 className="t-h2 mt-2.5 text-primary">Asked on most calls</h2>
        </div>
        <dl className="space-y-6">
          {FAQS.map((f) => (
            <div key={f.q} className="border-b border-border/60 pb-6 last:border-0 last:pb-0">
              <dt className="t-h3 text-primary">{f.q}</dt>
              <dd className="t-body mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="t-h2 max-w-[20ch] text-white">Get an exact number</h2>
          <p className="t-body-lg mt-3 max-w-[52ch] text-white/70">
            Thirty minutes on a call and the quote is fixed before anything starts. No
            commitment, and no obligation to take it.
          </p>
        </div>
        <a
          href={TIDYCAL}
          target="_blank"
          rel="noopener noreferrer"
          data-track="book_call"
          data-track-label="pricing_cta"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(0,216,144,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(0,216,144,0.5)]"
        >
          Book a free 30-min call
        </a>
      </div>
    </section>
  </div>
);

export default Pricing;
