import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Check,
  Database,
  Lightning,
  X,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { CLIENT_PROJECTS } from "@/data/clients";
import { TIDYCAL } from "@/data/homepage";

/**
 * /case-studies, on the design system — and shorter than it was.
 *
 * Three "other projects" are deleted. They were unnamed and unattributed and carried
 * specific figures: "20+ monthly inquiries, top 10 Google rankings for 3 keywords",
 * "15+ client inquiries in the first month", "2x lead conversion, 35% lower bounce rate".
 * The company has no paying website clients. content-data.md had already flagged them as
 * "the same class of thing as the deleted /our-works page and worth treating with
 * suspicion", and /our-works was deleted on 29 Aug for exactly this.
 *
 * What is left is what is real: the LeadzGalaxy build, which has a named client and a
 * testimonial in his own words, and Snackly, which is live at snacklyfoods.in. Two real
 * case studies is a shorter page and a more credible one.
 *
 * ⚠️ Open contradiction: data/clients.ts describes the lead-enrichment engagement as
 * "not ours to name", while this page names LeadzGalaxy and links to it — and the
 * homepage testimonial has carried the name publicly for months. One of the two is
 * wrong. The name is kept here because it is already public; the clients.ts entry needs
 * a decision.
 */
const LEADZ = {
  client: "LeadzGalaxy.com",
  industry: "B2B SaaS · lead generation",
  url: "https://leadzgalaxy.com",
  challenge:
    "The team was scraping LinkedIn profiles by hand, collecting lead details and enriching them with work emails and phone numbers one at a time. Five to ten minutes a lead, error-prone, and capped at twenty or thirty a day.",
  built: [
    "A Next.js web application, fast enough to use all day",
    "FastAPI backend sized for high-volume data processing",
    "MongoDB for flexible storage as the shape of a lead kept changing",
    "Redis and Redis Queue for job management",
    "Server-Sent Events, so progress is visible while a batch runs",
    "API integrations validating every email and phone number",
  ],
  stack: [
    { icon: Lightning, title: "Frontend", tech: "Next.js · Shadcn · Tailwind" },
    { icon: Database, title: "Backend", tech: "FastAPI · MongoDB · Redis" },
  ],
  before: [
    "5–10 minutes of manual work per lead",
    "Email finding and verification by hand",
    "Twenty to thirty leads a day, at most",
    "No visibility into a batch while it ran",
  ],
  after: [
    "Seconds per lead, unattended",
    "Validation through APIs rather than by eye",
    "500+ leads a day comfortably",
    "Live progress while the job runs",
  ],
  quote:
    "This platform completely transformed our lead generation process. What used to take our team hours of manual work now happens automatically in minutes. We've been able to 10x our business because we can now focus on closing deals instead of collecting data.",
  author: "Amit Menon",
  role: "Founder, LeadzGalaxy.com",
};

const snackly = CLIENT_PROJECTS.find((c) => c.slug === "snackly");

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Case studies",
      item: "https://cybiqon.in/case-studies",
    },
  ],
};

const CaseStudies = () => (
  <div className="min-h-screen bg-background">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />

    <section className="relative overflow-hidden bg-surface pb-14 pt-32 lg:pb-16 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <p className="t-eyebrow text-accent">Case studies</p>
        <h1 className="t-h1 mt-2.5 max-w-[20ch] text-primary">
          Two builds, described honestly
        </h1>
        <p className="t-body-lg mt-5 max-w-[58ch] text-muted-foreground">
          We are early, so there are two rather than twenty. Both are real, both are
          running, and you can open one of them right now.{" "}
          <Link
            href="/products"
            className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
          >
            Everything else we have shipped
          </Link>{" "}
          is on the products page.
        </p>
      </div>
    </section>

    {/* LeadzGalaxy */}
    <section className="bg-surface-lowest py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="t-label-sm text-accent">{LEADZ.industry}</p>
              <h2 className="t-h2 mt-1.5 text-primary">{LEADZ.client}</h2>
            </div>
            <a
              href={LEADZ.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track="client_site_click"
              data-track-label="leadzgalaxy"
              className="t-label inline-flex items-center gap-1.5 text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              leadzgalaxy.com
              <ArrowUpRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="t-h3 text-primary">The problem</h3>
              <p className="t-body mt-2 text-muted-foreground">{LEADZ.challenge}</p>

              <h3 className="t-h3 mt-8 text-primary">What we built</h3>
              <ul className="mt-3 space-y-2.5">
                {LEADZ.built.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <Check weight="bold" aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
                    <span className="t-body-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {LEADZ.stack.map((s) => (
                  <li key={s.title} className="rounded-xl bg-surface-low px-4 py-3">
                    <p className="t-label-sm flex items-center gap-1.5 text-primary">
                      <s.icon weight="fill" aria-hidden className="h-3.5 w-3.5" />
                      {s.title}
                    </p>
                    <p className="t-body-sm mt-0.5 text-muted-foreground">{s.tech}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="t-h3 text-primary">Before and after</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <ul className="space-y-2.5 rounded-xl bg-surface-container p-4">
                  {LEADZ.before.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <X weight="bold" aria-hidden className="mt-1 h-3 w-3 shrink-0 text-destructive" />
                      <span className="t-body-sm text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5 rounded-xl border border-border/60 bg-surface-lowest p-4">
                  {LEADZ.after.map((a) => (
                    <li key={a} className="flex gap-2.5">
                      <Check weight="bold" aria-hidden className="mt-1 h-3 w-3 shrink-0 text-secondary" />
                      <span className="t-body-sm text-foreground">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <figure className="mt-8 rounded-xl bg-surface-low p-5">
                <blockquote className="t-body text-foreground">
                  &ldquo;{LEADZ.quote}&rdquo;
                </blockquote>
                <figcaption className="t-body-sm mt-3 text-muted-foreground">
                  <span className="font-semibold text-primary">{LEADZ.author}</span> — {LEADZ.role}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Snackly */}
    {snackly && (
      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="t-label-sm text-accent">D2C ecommerce</p>
              <h2 className="t-h2 mt-1.5 text-primary">{snackly.name}</h2>
              <p className="t-body-lg mt-4 text-muted-foreground">{snackly.summary}</p>
              <ul className="mt-6 space-y-2.5">
                {snackly.work.map((w) => (
                  <li key={w} className="flex gap-2.5">
                    <Check weight="bold" aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
                    <span className="t-body-sm text-foreground">{w}</span>
                  </li>
                ))}
              </ul>
              {snackly.url && (
                <a
                  href={snackly.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="client_site_click"
                  data-track-label="snackly"
                  className="t-label mt-6 inline-flex items-center gap-1.5 text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                >
                  snacklyfoods.in
                  <ArrowUpRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <a href={snackly.url ?? "#"} target="_blank" rel="noopener noreferrer" className="group block">
              <img
                src="/img/case-snackly.webp"
                width={800}
                height={420}
                alt="The Snackly storefront at snacklyfoods.in."
                className="w-full rounded-2xl border border-border/60 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] transition-shadow group-hover:shadow-[0_12px_30px_-14px_rgba(0,48,79,0.32)]"
              />
            </a>
          </div>
        </div>
      </section>
    )}

    <section className="bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="t-h2 max-w-[22ch] text-white">Want yours described here next?</h2>
          <p className="t-body-lg mt-3 max-w-[52ch] text-white/70">
            Thirty minutes on a call and you leave with a fixed quote and a date.
          </p>
        </div>
        <a
          href={TIDYCAL}
          target="_blank"
          rel="noopener noreferrer"
          data-track="book_call"
          data-track-label="case_studies_cta"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(253,101,30,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(253,101,30,0.5)]"
        >
          <CalendarBlank weight="bold" aria-hidden className="h-4 w-4" />
          Book a free call
        </a>
      </div>
    </section>
  </div>
);

export default CaseStudies;
