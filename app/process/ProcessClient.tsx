import Link from "next/link";
import {
  CalendarBlank,
  ChatCircleText,
  Check,
  Clock,
  Code,
  Headphones,
  Lightbulb,
  Palette,
  Rocket,
  FileText,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { TIDYCAL } from "@/data/homepage";

/**
 * /process, on the marketing design system.
 *
 * A server component now — it was "use client" for useScrollReveal and a window.open,
 * both gone.
 *
 * The five steps here are the detailed version of the four on the homepage, which is
 * deliberate: the homepage summarises, this page is where someone goes to find out what
 * actually happens in week two. The timings agree — Day 1 to Day 16–21 is the 2–3 weeks
 * quoted everywhere else — and they must stay agreeing.
 */
const STEPS = [
  {
    icon: ChatCircleText,
    title: "Discovery call",
    duration: "30–45 minutes",
    description:
      "A free consultation to understand the business, the goal and the constraints. No sales pressure — including the part where we say if we are not the right fit.",
    happens: [
      "What the business sells, and who buys it",
      "What the site or system has to actually do",
      "Examples you like, and what you dislike about your current one",
      "Straight answers on process, pricing and timeline",
    ],
    outcome: "A clear scope and a fixed quote, before anything starts.",
  },
  {
    icon: Lightbulb,
    title: "Planning and design",
    duration: "3–5 days",
    description:
      "Structure first, then the design. You see it and approve it before a line of production code is written, so nothing is a surprise at the end.",
    happens: [
      "Sitemap and page structure agreed",
      "Design mockups for the pages that matter",
      "Copy and content requirements listed for you",
      "Your changes, until it is right",
    ],
    outcome: "A design you have signed off, and a build plan.",
  },
  {
    icon: Code,
    title: "Development",
    duration: "1–2 weeks",
    description:
      "We build it, and you see progress as it happens rather than at the end. Written for your business — not a theme with the colours changed.",
    happens: [
      "Built to the approved design, mobile-first",
      "Regular progress updates on WhatsApp",
      "Forms, integrations and automation wired up",
      "On-page SEO and structured data in as we go",
    ],
    outcome: "A working build on a staging URL you can open.",
  },
  {
    icon: Rocket,
    title: "Testing and launch",
    duration: "2–3 days",
    description:
      "Everything is tested on real devices before it goes live, because most of your customers will arrive on a mid-range phone rather than a laptop.",
    happens: [
      "Desktop, tablet and mobile, on real screens",
      "Every form, link and feature checked",
      "Speed and Core Web Vitals measured",
      "Analytics and Search Console set up",
      "Your final approval, then go live",
    ],
    outcome: "Live, indexed, and handed over with every credential.",
  },
  {
    icon: Headphones,
    title: "Support and growth",
    duration: "Ongoing",
    description:
      "We do not disappear at launch. Support through the first releases is included; maintenance after that is ₹2,999 a month and entirely optional.",
    happens: [
      "Bugs fixed, questions answered on WhatsApp",
      "Help with minor content updates",
      "Guidance on growing traffic",
      "New features whenever you want them",
    ],
    outcome: "Someone to call who already knows your system.",
  },
];

const TIMELINE = [
  { milestone: "Discovery call", days: "Day 1" },
  { milestone: "Design approved", days: "Day 4–6" },
  { milestone: "Development complete", days: "Day 14–18" },
  { milestone: "Live", days: "Day 16–21" },
];

const PROVIDE = [
  {
    icon: FileText,
    title: "Your content",
    description:
      "Business details, service descriptions, team bios. We send an exact list so nobody has to guess what is still outstanding.",
  },
  {
    icon: Palette,
    title: "Brand assets",
    description:
      "Logo, colours, photographs and any preferences. If you do not have them, say so — that is a normal starting point, not a problem.",
  },
  {
    icon: CalendarBlank,
    title: "Timely feedback",
    description:
      "Quick answers and approvals. This is the single thing that decides whether a build lands in two weeks or four.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    { "@type": "ListItem", position: 2, name: "Process", item: "https://cybiqon.in/process" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Cybiqon builds a website or custom system",
  description: "The five steps from first call to launch, and what happens in each.",
  totalTime: "P21D",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.description,
  })),
};

const Process = () => (
  <div className="min-h-screen bg-background">
    {[breadcrumbSchema, howToSchema].map((schema, i) => (
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
        <p className="t-eyebrow text-accent-ink">How we work</p>
        <h1 className="t-h1 mt-2.5 max-w-[20ch] text-primary">
          What actually happens, week by week
        </h1>
        <p className="t-body-lg mt-5 max-w-[58ch] text-muted-foreground">
          Five steps from the first call to a live site, with the timings we hold ourselves
          to. No month of silence ending in a surprise.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={TIDYCAL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="book_call"
            data-track-label="process_hero"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_12px_rgba(0,216,144,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(0,216,144,0.38)]"
          >
            <CalendarBlank weight="bold" aria-hidden className="h-4 w-4" />
            Start with step one
          </a>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-7 text-[15px] font-medium text-primary transition-colors hover:bg-surface-low"
          >
            See all prices
          </Link>
        </div>
      </div>
    </section>

    {/* Timeline strip */}
    <section className="border-y border-border/60 bg-surface-lowest py-10">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((t, i) => (
            <li key={t.milestone} className="border-l-2 border-accent/30 pl-4">
              <p className="t-label-sm text-accent-ink">{t.days}</p>
              <p className="t-h3 mt-1 text-primary">{t.milestone}</p>
              {i === TIMELINE.length - 1 && (
                <p className="t-label-sm mt-1 text-muted-foreground">
                  Two to three weeks, end to end
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* The steps */}
    <section className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="The five steps"
          title="From first call to live"
        />
        <ol className="mt-12 space-y-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-6 rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12 lg:p-8"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-high text-primary">
                    <step.icon weight="fill" aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="t-label-sm tabular-nums text-muted-foreground">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="t-h3 mt-4 text-primary">{step.title}</h3>
                <p className="t-label-sm mt-1.5 inline-flex items-center gap-1.5 text-accent-ink">
                  <Clock weight="fill" aria-hidden className="h-3.5 w-3.5" />
                  {step.duration}
                </p>
                <p className="t-body-sm mt-3 text-muted-foreground">{step.description}</p>
              </div>

              <div>
                <ul className="space-y-2.5">
                  {step.happens.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <Check
                        weight="bold"
                        aria-hidden
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary"
                      />
                      <span className="t-body-sm text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="t-body-sm mt-5 rounded-lg bg-surface-low px-4 py-3 text-muted-foreground">
                  <span className="font-semibold text-primary">You end up with </span>
                  {step.outcome}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* What you provide */}
    <section className="bg-surface-low py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Your side"
          title="Three things we need from you"
          lede="Short list, and we send the detail rather than leaving you to guess."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PROVIDE.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-high text-primary">
                <p.icon weight="fill" aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="t-h3 mt-4 text-primary">{p.title}</h3>
              <p className="t-body-sm mt-2 text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="t-h2 max-w-[20ch] text-white">Step one is a free call</h2>
          <p className="t-body-lg mt-3 max-w-[52ch] text-white/70">
            Thirty minutes. You leave with a fixed quote and a date, or the honest answer
            that we are not the right fit.
          </p>
        </div>
        <a
          href={TIDYCAL}
          target="_blank"
          rel="noopener noreferrer"
          data-track="book_call"
          data-track-label="process_cta"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(0,216,144,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(0,216,144,0.5)]"
        >
          Book a free 30-min call
        </a>
      </div>
    </section>
  </div>
);

export default Process;
