import Link from "next/link";
import {
  ArrowRight,
  Certificate,
  ChatCircleText,
  Code,
  Handshake,
  Lightning,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { TIDYCAL } from "@/data/homepage";

/**
 * /about, rebuilt onto the marketing design system on 6 Sep 2026.
 *
 * A server component now. It was "use client" only for useScrollReveal and a window.open
 * on the CTA button — the hook is gone and the button is an anchor, so nothing here needs
 * to hydrate. The file keeps its name because app/about/page.tsx imports it and the
 * server/client split is the pattern the other twelve marketing pages still use.
 *
 * The founder photographs are pre-cropped to a matched square in public/img/ rather than
 * squeezed into shape with objectPosition. The two sources are a studio portrait and a
 * dusk phone snapshot at different aspect ratios; identical framing does not make them
 * one shoot, but it stops the pairing looking accidental.
 */

const FOUNDERS = [
  {
    name: "Muskan Singh",
    role: "Co-founder & CEO",
    img: "/img/founder-muskan.webp",
  },
  {
    name: "Prajjwal Pathak",
    role: "Co-founder & CTO",
    img: "/img/founder-prajjwal.webp",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    body: "Every price is published. No hidden retainers, no percentage cuts, and no surprise line items at handover.",
  },
  {
    icon: Code,
    title: "Ownership",
    body: "Code, repository, server keys and DNS are yours on day one. Nothing is held back as leverage.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    body: "You talk to the two people writing the code, not an account manager relaying messages to a queue.",
  },
  {
    icon: Lightning,
    title: "Craft",
    body: "Written for your business rather than assembled from a theme. The same standard we hold our own products to.",
  },
];

const DIFFERENT = [
  {
    title: "Built for MSMEs, not IT departments",
    body: "Pricing, process and communication are shaped around a busy owner who does not have a technical team to translate for them.",
  },
  {
    title: "Modern tools, plain language",
    body: "We use current tooling and explain what it does in words you can repeat to someone else. You should never have to take a claim on faith.",
  },
  {
    title: "We stay after launch",
    body: "Updates, fixes and advice once the thing is live. Maintenance is an option from ₹2,999 a month, not a condition of getting your code.",
  },
  {
    title: "Affordable is not cheap",
    body: "Secure, fast and mobile-first, because most of your customers arrive on a mid-range phone. We build what we would want for our own products.",
  },
];

const About = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://cybiqon.in/about" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
          <div>
            <p className="t-eyebrow text-accent">Two people, both on the call</p>
            <h1 className="t-h1 mt-2.5 max-w-[18ch] text-primary">
              A small studio that writes the code itself
            </h1>
            <p className="t-body-lg mt-5 max-w-[54ch] text-muted-foreground">
              Cybiqon builds custom software, AI agents and websites for Indian businesses.
              No account managers, no offshore hand-off, and no template with your logo
              dropped into it.
            </p>
            <a
              href={TIDYCAL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="book_call"
              data-track-label="about_hero"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_12px_rgba(253,101,30,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(253,101,30,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Talk to us
              <ArrowRight weight="bold" aria-hidden className="h-4 w-4" />
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-5">
            {FOUNDERS.map((f) => (
              <li
                key={f.name}
                className="overflow-hidden rounded-2xl border border-border/60 bg-surface-lowest shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
              >
                <img
                  src={f.img}
                  width={480}
                  height={480}
                  alt={`${f.name}, ${f.role} of Cybiqon AI Solutions`}
                  className="aspect-square w-full object-cover"
                />
                <div className="px-4 py-3.5">
                  <p className="t-label text-primary">{f.name}</p>
                  <p className="t-label-sm text-muted-foreground">{f.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Story */}
      <section className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Our story"
            title="How we started"
          />
          <div>
            <p className="t-body-lg text-muted-foreground">
              Big companies get current technology. Small ones are told it is too expensive
              or too complicated, and then sold a template at agency prices. We did not
              think that trade was real, so we started building the other version of it —
              modern websites, AI agents and internal tools, at prices a small business can
              actually agree to.
            </p>
            <p className="t-body-lg mt-5 rounded-xl border-l-4 border-accent bg-surface-low px-5 py-4 text-foreground">
              We are not a decades-old agency with hundreds of staff, and we would rather say
              so. It means every project gets the attention of the people who own the
              outcome, and nobody here is a ticket number.
            </p>
            <p className="t-body-sm mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Certificate weight="fill" aria-hidden className="h-4 w-4 text-primary" />
                Startup India, DPIIT recognised
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Certificate weight="fill" aria-hidden className="h-4 w-4 text-primary" />
                Registered LLP · D-U-N-S 772066074
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we stand for"
            title="Four things we will not trade away"
            lede="These decide the arguments. If something on this site contradicts one of them, the site is wrong."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-high text-primary">
                  <v.icon weight="fill" aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="t-h3 mt-4 text-primary">{v.title}</h3>
                <p className="t-body-sm mt-2 text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Different */}
      <section className="bg-surface-low py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="How we work"
            title="What that means in practice"
          />
          <div className="mt-12 grid gap-x-16 gap-y-8 lg:grid-cols-2">
            {DIFFERENT.map((item) => (
              <div key={item.title}>
                <h3 className="t-h3 text-primary">{item.title}</h3>
                <p className="t-body mt-2 max-w-[52ch] text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="t-h2 max-w-[20ch] text-white">
              Tell us what the business needs to do
            </h2>
            <p className="t-body-lg mt-3 max-w-[52ch] text-white/70">
              Thirty minutes, no commitment. You leave with a quote and a timeline, or with
              the honest answer that we are not the right fit.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={TIDYCAL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="book_call"
              data-track-label="about_cta"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(253,101,30,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(253,101,30,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Book a free call
            </a>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <ChatCircleText weight="fill" aria-hidden className="h-4 w-4" />
              See what we have shipped
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
