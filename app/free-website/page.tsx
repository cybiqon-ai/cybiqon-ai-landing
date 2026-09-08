import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import ApplyForm from "@/components/free-website/ApplyForm";
import {
  BAD_FIT,
  FAQS,
  GOOD_FIT,
  SLOTS_LEFT,
  SLOTS_TAKEN,
  STEPS,
  TOTAL_SLOTS,
  WHATSAPP_DISPLAY,
  YOU_GIVE,
  YOU_RECEIVE,
  whatsappHref,
} from "@/data/launch5";

export const metadata: Metadata = {
  title: "Free Website for 5 Indian Businesses — Launch 5",
  description:
    "Five Indian businesses get a complete 4–5 page website, free, in 7 days. The trade: a video testimonial, a Google review, your name. No contract.",
  keywords:
    "free website for small business India, free website design MSME, free business website offer, website for shop owners India",
  alternates: { canonical: "/free-website" },
  openGraph: {
    title: "Five businesses get a website. Free.",
    description:
      "I need portfolio work. You need to be findable. A complete website in 7 days, traded for a testimonial and a review.",
    url: "https://cybiqon.in/free-website",
    type: "website",
    images: [
      {
        url: "/og/free-website.png",
        width: 1200,
        height: 630,
        alt: "A complete website, free, in seven days — Cybiqon AI Solutions",
      },
    ],
  },
};

/**
 * The Trade — a two-column reckoning, ruled, no shadow.
 *
 * The offer's honest core is the exchange, so the exchange is the hero rather than a
 * headline about it. Numbering both halves lets a reader compare them line for line,
 * which is the whole argument: what you receive is longer than what you give.
 */
function TradePanel() {
  const column = (title: string, items: string[]) => (
    <div>
      <p className="t-eyebrow text-accent-ink">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-xl border border-border/60 bg-surface-lowest px-4 py-3.5"
          >
            <Check weight="bold" aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="t-body-sm text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      {column("You receive", YOU_RECEIVE)}
      {column("You give", YOU_GIVE)}
    </div>
  );
}

/**
 * Slots as five indexed tokens, struck through as they fill.
 *
 * SLOTS_TAKEN is a real number from data/launch5.ts, currently zero. It is tempting to
 * seed it — this site already carried a fabricated live counter once. An honest zero on
 * a brand-new offer costs nothing; an invented four is a lie a customer can catch.
 */
function SlotStrip() {
  return (
    <div className="flex items-center gap-2" aria-label={`${SLOTS_LEFT} of ${TOTAL_SLOTS} slots open`}>
      {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
        const taken = i < SLOTS_TAKEN;
        return (
          <span
            key={i}
            aria-hidden
            className={`rounded-full border px-2.5 py-1 text-[12px] font-semibold tabular-nums ${
              taken
                ? "border-border text-muted-foreground/50 line-through"
                : "border-accent/50 bg-accent-softer text-accent-ink"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        );
      })}
    </div>
  );
}

function FitList({ items, kind }: { items: string[]; kind: "good" | "bad" }) {
  const Icon = kind === "good" ? Check : X;
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Icon
            weight="bold"
            aria-hidden
            className={`mt-1 h-4 w-4 shrink-0 ${
              kind === "good" ? "text-secondary" : "text-muted-foreground"
            }`}
          />
          <span className="t-body-sm text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="t-eyebrow text-accent-ink">
      {children}
    </p>
  );
}

export default function FreeWebsitePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      { "@type": "ListItem", position: 2, name: "Free Website", item: "https://cybiqon.in/free-website" },
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

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero: the trade is the thesis ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface pt-32 lg:pt-40">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <SectionLabel>Launch 5</SectionLabel>
            <SlotStrip />
            <span className="t-eyebrow text-accent-ink">
              {SLOTS_LEFT} of {TOTAL_SLOTS} open
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Five businesses get a website. Free.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I need portfolio work. You need to be findable when someone searches for what
            you sell. That is the whole deal — no fee, no contract, nothing to cancel.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#apply"
              data-track="launch5_apply"
              data-track-label="free_website_hero"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_12px_rgba(0,216,144,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(0,216,144,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Apply for a slot
            </a>
            <a
              href={whatsappHref(
                "Hi — I saw the Launch 5 free website offer on cybiqon.in and I have a question."
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-label="free_website_hero"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-7 text-[15px] font-medium text-primary transition-colors hover:bg-surface-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── The trade ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="border-t-2 border-rule-strong/30 pt-8">
            <SectionLabel>The trade</SectionLabel>
            <p className="mb-10 mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Both halves are agreed in writing before any work starts. Nothing is
              requested after delivery that was not on this list.
            </p>
            <TradePanel />

            {/* The one real cost, stated next to the trade rather than buried in the
                FAQ. The outreach messages mention it, so a page that said only "free"
                here would read as a bait-and-switch the moment someone compared the
                two — and this offer's entire argument is that the terms are complete. */}
            <p className="mt-10 border-l-2 border-primary/40 pl-4 text-[15px] leading-relaxed text-foreground">
              <span className="font-semibold">The one thing you do pay for:</span> your own
              domain name — roughly ₹700–1,000 a year, paid directly to the registrar. It
              stays in your name, not mine. There is no other cost.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why free ──────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="border-t-2 border-rule-strong/30 pt-8">
            <SectionLabel>Why free</SectionLabel>
            <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-14">
              {/* "the code is public" was in the first draft. Only this site's repo is
                  public — the product repos are private. Corrected to something true. */}
              <p className="text-[17px] leading-relaxed text-foreground">
                Cybiqon started in March 2026. The work is real — there are{" "}
                <Link href="/products" className="text-primary underline underline-offset-4">
                  apps on the Play Store
                </Link>{" "}
                and this site is built the same way — but there is no client list yet, and
                no amount of marketing fixes that. What fixes it is five businesses willing
                to say, on camera, that this worked for them.
              </p>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                So the price is proof instead of money. You get the same{" "}
                <Link href="/pricing" className="text-primary underline underline-offset-4">
                  ₹9,999 website
                </Link>{" "}
                anyone else pays for. I get something I cannot buy. After the fifth, this
                closes and the price goes back to normal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fit ───────────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 border-t-2 border-rule-strong/30 pt-8 md:grid-cols-2 md:gap-14">
            <div>
              <SectionLabel>This is for you if</SectionLabel>
              <FitList items={GOOD_FIT} kind="good" />
            </div>
            <div>
              <SectionLabel>Not this time if</SectionLabel>
              <FitList items={BAD_FIT} kind="bad" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sequence ──────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="border-t-2 border-rule-strong/30 pt-8">
            <SectionLabel>What happens next</SectionLabel>
            <ol className="mt-6 border-t border-border">
              {STEPS.map((step, i) => (
                <li
                  key={step.label}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-border py-5 md:grid-cols-[3.5rem_14rem_1fr]"
                >
                  <span className="text-[13px] font-semibold tabular-nums tracking-[0.1em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[17px] font-semibold tracking-tight text-foreground">
                    {step.label}
                  </span>
                  <span className="col-start-2 text-[15px] leading-relaxed text-muted-foreground md:col-start-3">
                    {step.detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Questions ─────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="border-t-2 border-rule-strong/30 pt-8">
            <SectionLabel>Questions</SectionLabel>
            <dl className="mt-6 border-t border-border">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="grid gap-x-10 gap-y-2 border-b border-border py-6 md:grid-cols-[18rem_1fr]"
                >
                  <dt className="text-[17px] font-semibold tracking-tight text-foreground">
                    {faq.q}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Apply ─────────────────────────────────────────────────────────── */}
      <section id="apply" className="scroll-mt-24 pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="border-t-2 border-rule-strong/30 pt-8">
            <SectionLabel>Apply</SectionLabel>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              Five minutes now, an answer within a day.
            </h2>
            <p className="mb-10 mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Prefer to talk first? Message {WHATSAPP_DISPLAY} on{" "}
              <a
                href={whatsappHref(
                  "Hi — I saw the Launch 5 free website offer on cybiqon.in and I have a question."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                WhatsApp
              </a>
              . Same person answers either way.
            </p>
            <div className="max-w-3xl">
              <ApplyForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
