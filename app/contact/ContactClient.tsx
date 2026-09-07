import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  ChatCircleText,
  Check,
  Clock,
  EnvelopeSimple,
  MapPin,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { TIDYCAL } from "@/data/homepage";

/**
 * /contact, on the marketing design system.
 *
 * A server component — it was "use client" for useScrollReveal and a window.open. Two of
 * that hook's six consumers left after this.
 *
 * The four channels are ordered by what actually gets a useful answer fastest, and the
 * call is marked as the one we recommend rather than all four being presented as equal.
 * A contact page that offers four equivalent doors makes the visitor do the choosing.
 */
const CHANNELS = [
  {
    icon: CalendarBlank,
    label: "Book a free call",
    detail: "Thirty minutes, no commitment",
    action: "Pick a time",
    href: TIDYCAL,
    external: true,
    track: "book_call",
    recommended: true,
  },
  {
    icon: WhatsappLogo,
    label: "WhatsApp",
    detail: "+91 92507 11473",
    action: "Start a chat",
    href: "https://wa.me/919250711473",
    external: true,
    track: "whatsapp_click",
  },
  {
    icon: EnvelopeSimple,
    label: "Email",
    detail: "support@cybiqon.in",
    action: "Send an email",
    href: "mailto:support@cybiqon.in",
    external: false,
    track: null,
  },
  {
    icon: TelegramLogo,
    label: "Telegram",
    detail: "@cybiqonai",
    action: "Message us",
    href: "https://t.me/cybiqonai",
    external: true,
    track: null,
  },
];

const WHY = [
  {
    icon: ChatCircleText,
    title: "Straight answers",
    body: "Ask anything about process, pricing or timeline. No sales pitch, and no discovery deck.",
  },
  {
    icon: Clock,
    title: "An exact quote",
    body: "You leave the call with a fixed price and a date, not a range that moves later.",
  },
  {
    icon: Check,
    title: "An honest fit check",
    body: "Not every project suits us. If yours does not, we will say so on the call rather than after your deposit.",
  },
  {
    icon: MapPin,
    title: "You talk to the founders",
    body: "Muskan and Prajjwal, directly. Nobody is going to route you to an account manager.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://cybiqon.in/contact" },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Cybiqon AI Solutions",
  description:
    "Custom software, AI agents and websites for Indian businesses. DPIIT-recognised, registered LLP.",
  url: "https://cybiqon.in",
  logo: "https://cybiqon.in/logo.png",
  image: "https://cybiqon.in/og/home.png",
  telephone: "+91-92507-11473",
  email: "support@cybiqon.in",
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  openingHours: "Mo-Sa 10:00-18:00",
  sameAs: [
    "https://www.linkedin.com/company/cybiqon-ai-solutions",
    "https://www.facebook.com/cybiqon.ai.solutions/",
    "https://www.instagram.com/cybiqon.ai",
    "https://t.me/cybiqonai",
  ],
};

const Contact = () => (
  <div className="min-h-screen bg-background">
    {[breadcrumbSchema, localBusinessSchema].map((schema, i) => (
      <script
        key={i}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ))}

    {/* Hero + channels */}
    <section className="relative overflow-hidden bg-surface pb-14 pt-32 lg:pb-20 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <p className="t-eyebrow text-accent">Contact</p>
        <h1 className="t-h1 mt-2.5 max-w-[18ch] text-primary">
          Tell us what the business needs
        </h1>
        <p className="t-body-lg mt-5 max-w-[56ch] text-muted-foreground">
          Four ways to reach us. The call is the one that gets you a real answer fastest,
          and it costs nothing.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c) => {
            const body = (
              <>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    c.recommended
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface-high text-primary"
                  }`}
                >
                  <c.icon weight="fill" aria-hidden className="h-5 w-5" />
                </span>
                <span className="t-h3 mt-4 block text-primary">{c.label}</span>
                <span className="t-body-sm mt-1 block flex-1 text-muted-foreground">
                  {c.detail}
                </span>
                <span className="t-label mt-4 inline-flex items-center gap-1.5 text-primary">
                  {c.action}
                  <ArrowRight
                    weight="bold"
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </>
            );
            const cls = `group relative flex h-full flex-col rounded-2xl border bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(0,48,79,0.3)] ${
              c.recommended ? "border-accent/50" : "border-border/60"
            }`;

            return (
              <li key={c.label}>
                {c.external ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={c.track ?? undefined}
                    data-track-label="contact_page"
                    className={cls}
                  >
                    {c.recommended && (
                      <span className="t-label-sm absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-accent-foreground">
                        Recommended
                      </span>
                    )}
                    {body}
                  </a>
                ) : (
                  <a href={c.href} className={cls}>
                    {body}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>

    {/* Why a call */}
    <section className="bg-surface-lowest py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Why book the call"
          title="Thirty minutes, and you know where you stand"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="flex gap-4 rounded-2xl border border-border/60 bg-surface-low p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-high text-primary">
                <w.icon weight="fill" aria-hidden className="h-5 w-5" />
              </span>
              <div>
                <h3 className="t-h3 text-primary">{w.title}</h3>
                <p className="t-body-sm mt-1.5 text-muted-foreground">{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Details */}
    <section className="bg-surface py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
        <div>
          <p className="t-eyebrow text-accent">Details</p>
          <h2 className="t-h2 mt-2.5 text-primary">The company</h2>
        </div>
        <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {[
            { k: "Registered as", v: "Cybiqon AI Solutions LLP" },
            { k: "LLPIN", v: "ACV-9817" },
            { k: "Recognised", v: "Startup India · DIPP256002" },
            { k: "D-U-N-S", v: "772066074" },
            { k: "Based in", v: "Uttar Pradesh, India" },
            { k: "Hours", v: "Monday to Saturday, 10:00–18:00 IST" },
          ].map((row) => (
            <div key={row.k}>
              <dt className="t-label-sm text-muted-foreground">{row.k}</dt>
              <dd className="t-body mt-0.5 text-foreground">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="t-h2 max-w-[20ch] text-white">Still deciding?</h2>
          <p className="t-body-lg mt-3 max-w-[52ch] text-white/70">
            Have a look at what we have built and what everything costs. Both are on the
            site, in full, without a form in the way.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(253,101,30,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(253,101,30,0.5)]"
          >
            See our work
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
          >
            See prices
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
