import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Calculator from "./Calculator";
import { AMC_BAND, CHECKED_ON, DEFAULT_ASSUMPTIONS, SOURCES, formatInr } from "@/data/websiteCost";
import { SERVICES } from "@/data/services";
import { TIDYCAL } from "@/data/homepage";

/**
 * /tools/website-cost-calculator — the site's first free tool (22 Sep 2026).
 *
 * Why it exists: the site had nothing another site would link to on its own merits, and
 * "website cost calculator india" is a phrase Google autocompletes for Indian searchers
 * (checked with tools/social-media-manager/demand_check.py before building). It turns the
 * argument of /blog/website-cost-for-small-business-india — the quote is year one, and the
 * bill that matters is every year after — into something a reader can run on their own
 * quotes.
 *
 * Everything explanatory is server-rendered here so crawlers and AI agents read it
 * without executing the calculator. The figures all come from data/websiteCost.ts.
 */

const siteUrl = "https://cybiqon.in";
const path = "/tools/website-cost-calculator";
const website = SERVICES.find((s) => s.slug === "custom-websites")!;
const a = DEFAULT_ASSUMPTIONS;

const title = "Website Cost Calculator India: Build Price + 3-Year Running Cost";
const description =
  "Free website cost calculator for India. Enter your quotes and see what a WordPress, page-builder, custom-coded or Shopify site costs over 1, 3 or 5 years, with hosting renewals, domain, licences and maintenance. Every figure sourced.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: `${siteUrl}${path}`,
    type: "website",
  },
};

const FAQS = [
  {
    q: "How much does a website cost in India per year after it is built?",
    a: `For a site on shared hosting, at least the hosting renewal and the domain: ${formatInr(a.hostingPerMonth)} a month on Hostinger's Premium plan and ${formatInr(a.domainPerYear)} a year for a .in domain, before GST. Add any plugin licences billed in dollars and, if you want one, a maintenance contract, which typically runs ${formatInr(AMC_BAND.business.low)}–${formatInr(AMC_BAND.business.high)} a year for a business site. A Shopify store pays its plan every year instead.`,
  },
  {
    q: "Why is the cheapest website quote not always the cheapest website?",
    a: "Because a quote prices the first year and the site is paid for every year. Promotional hosting renews at three to four times the advertised rate, page-builder and caching licences start billing in dollars from year two, and a maintenance contract is rarely in the first number. Put your quotes into the calculator and compare the total, not the build price.",
  },
  {
    q: "Does the calculator include GST?",
    a: "Not by default. Hostinger lists its prices without GST, and most development quotes are given “plus GST”. Tick “Add 18% GST” to apply it to every figure.",
  },
  {
    q: "Why is there no Wix option?",
    a: `Wix's own pricing page showed us US-dollar prices from India on ${CHECKED_ON}, and the rupee prices in third-party guides disagree with each other. We will not publish a figure we cannot source. Use “Add another option” with the price your Wix checkout shows.`,
  },
  {
    q: "Why does year one not include hosting or maintenance for WordPress and custom sites?",
    a: "Because that is how these quotes are usually priced: promotional hosting and a ₹1 domain inside the build price, plugin licences on the developer's own account, and some support for the first months. Counting them again would overstate year one. Everything recurring starts in year two.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Website cost calculator for India",
    url: `${siteUrl}${path}`,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@type": "Organization", name: "Cybiqon AI Solutions", url: siteUrl },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Website cost calculator", item: `${siteUrl}${path}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const HOW = [
  {
    t: "Year one is the build price",
    b: "For WordPress and custom sites, the quote usually covers the first year's promotional hosting, a ₹1 domain, and licences on the developer's account.",
  },
  {
    t: "From year two, hosting renews at full price",
    b: `${formatInr(a.hostingPerMonth)} a month on Hostinger India's Premium plan, which is advertised at ₹149 on a 48-month term. Change the plan and the maths is the same.`,
  },
  {
    t: "Licences bill in dollars",
    b: `The page-builder option carries Elementor Pro ($59/yr) and WP Rocket ($59.95/yr), converted at ₹${a.usdInr} per US$.`,
  },
  {
    t: "Maintenance is a choice",
    b: `The typical band is ${formatInr(AMC_BAND.business.low)}–${formatInr(AMC_BAND.business.high)} a year for a business site and ${formatInr(AMC_BAND.store.low)}–${formatInr(AMC_BAND.store.high)} for a store. The same band applies to every self-hosted option, so it never tilts the comparison.`,
  },
  {
    t: "Shopify pays as it goes",
    b: `${formatInr(a.shopifyBasicPerMonth)} a month on Basic, billed yearly, plus ${a.shopifyFeePct}% of every sale, because Shopify Payments is not available in India. Your payment gateway's own fee is left out: it is the same whichever way the store is built.`,
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface pb-10 pt-32 lg:pb-14 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <p className="t-eyebrow text-accent-ink">Free tool</p>
          <h1 className="t-h1 mt-2.5 max-w-[22ch] text-primary">Website cost calculator for India</h1>
          <p className="t-body-lg mt-5 max-w-[62ch] text-muted-foreground">
            A website quote is the price of year one. This adds what each kind of site costs to
            keep running — hosting at its renewal price, the domain, licences billed in dollars,
            maintenance — and shows the total over one, three or five years. Put your own quotes
            in. Every default is sourced at the bottom of the page.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-surface pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Calculator />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <p className="t-eyebrow text-accent-ink">How it is worked out</p>
          <h2 className="t-h2 mt-2.5 max-w-[26ch] text-primary">Five assumptions, all of them visible</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HOW.map((h, i) => (
              <li key={h.t} className="rounded-2xl border border-border/60 bg-surface p-6">
                <p className="t-label-sm tabular-nums text-accent-ink">0{i + 1}</p>
                <h3 className="t-h3 mt-2 text-primary">{h.t}</h3>
                <p className="t-body-sm mt-2 text-muted-foreground">{h.b}</p>
              </li>
            ))}
          </ol>
          <p className="t-body mt-8 max-w-[70ch] text-muted-foreground">
            The reasoning behind the example quotes, and eight questions to put to every vendor,
            are in{" "}
            <Link href="/blog/website-cost-for-small-business-india" className="text-accent-ink underline-offset-2 hover:underline">
              what a website really costs in India
            </Link>
            . If you are choosing between WordPress and a hand-written site, read{" "}
            <Link href="/blog/wordpress-vs-custom-website-india" className="text-accent-ink underline-offset-2 hover:underline">
              WordPress vs custom website: the honest 3-year cost
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Where we stand */}
      <section className="bg-surface-low py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-surface-lowest p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[62ch]">
              <p className="t-eyebrow text-accent-ink">Where we stand</p>
              <h2 className="t-h3 mt-2 text-primary">
                We build custom websites, which is why we are not in the table
              </h2>
              <p className="t-body-sm mt-2 text-muted-foreground">
                A hand-coded site from Cybiqon starts at {website.price} one-time, goes live in{" "}
                {website.timeline}, and includes the first year of hosting. After that, hosting and
                domain run roughly ₹4,000–6,000 a year, paid straight to the provider. You get the
                code, the domain and every login. Add it as your own option to compare.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-surface-high px-5 text-[15px] font-semibold text-primary transition-colors hover:bg-surface-container"
              >
                See every price
                <ArrowRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
              </Link>
              <a
                href={TIDYCAL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="book_call"
                data-track-label="cost_calculator"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_12px_rgba(0,216,144,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(0,216,144,0.38)]"
              >
                Go through your quotes with us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
          <div>
            <p className="t-eyebrow text-accent-ink">Questions</p>
            <h2 className="t-h2 mt-2.5 text-primary">About the numbers</h2>
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

      {/* Sources */}
      <section id="sources" className="scroll-mt-24 bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <p className="t-eyebrow text-accent-ink">Sources</p>
          <h2 className="t-h2 mt-2.5 text-primary">Every figure, and where it came from</h2>
          <p className="t-body mt-3 max-w-[70ch] text-muted-foreground">
            Read on {CHECKED_ON} from an Indian connection. Prices change; if one here is out of
            date, tell us at{" "}
            <a href="mailto:support@cybiqon.in" className="text-accent-ink hover:underline">
              support@cybiqon.in
            </a>{" "}
            and we will correct it.
          </p>
          <ul className="mt-8 divide-y divide-border/60 border-y border-border/60">
            {Object.values(SOURCES).map((src) => (
              <li key={src.url} className="grid gap-1 py-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-8">
                <a
                  href={src.url}
                  {...(src.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="t-body-sm font-semibold text-primary hover:text-accent-ink hover:underline"
                >
                  {src.publisher} — {src.label}
                </a>
                <p className="t-body-sm text-muted-foreground">{src.note}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl bg-surface-low p-5">
            <p className="t-label-sm text-muted-foreground">Citing this calculator</p>
            <p className="t-body-sm mt-1.5 text-primary">
              Cybiqon AI Solutions, “Website cost calculator for India”, cybiqon.in{path}, figures
              checked {CHECKED_ON}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
