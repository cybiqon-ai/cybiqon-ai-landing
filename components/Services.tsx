import Link from "next/link";
import { Check, Receipt } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES, TIDYCAL } from "@/data/homepage";

/**
 * The comp's service cards, with a ribbon on the one people actually come for.
 *
 * Every price is one-time and checked against app/pricing/PricingClient.tsx. The comp
 * carried a different set — a ₹4,999/month WhatsApp bot, a ₹24,999 web app, ₹14,999 lead
 * gen — which would have put the homepage in contradiction with /pricing and with the
 * Product JSON-LD that page emits. /pricing is authoritative.
 */
const Services = () => (
  <section id="solutions" className="bg-surface-lowest py-16 lg:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          align="left"
          eyebrow="Clear unit pricing"
          title="Services priced for Indian MSMEs"
          lede="One-time prices, no recurring percentage cuts. Pick what the business needs now."
        />
        <p className="t-label-sm inline-flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-surface-low px-3.5 py-2 text-muted-foreground">
          <Receipt weight="fill" aria-hidden className="h-4 w-4 text-primary" />
          GST invoice available
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className={`relative flex flex-col rounded-2xl border bg-surface-lowest p-6 ${
              service.popular
                ? "border-accent/50 shadow-[0_10px_34px_-14px_rgba(253,101,30,0.45)]"
                : "border-border/60 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
            }`}
          >
            {service.popular && (
              <span className="t-label-sm absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-accent-foreground">
                Most popular
              </span>
            )}

            <h3 className="t-h3 text-primary">{service.title}</h3>
            <p className="t-body-sm mt-2 text-muted-foreground">{service.description}</p>

            <div className="mt-5 rounded-xl bg-surface-low px-4 py-3.5">
              <p className="t-label-sm text-muted-foreground">One-time, from</p>
              <p className="t-h2 mt-0.5 text-accent">{service.price}</p>
              {service.note && (
                <p className="t-label-sm mt-0.5 text-primary">{service.note}</p>
              )}
            </div>

            <ul className="mt-5 flex-1 space-y-2.5">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check
                    weight="bold"
                    aria-hidden
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary"
                  />
                  <span className="t-body-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={TIDYCAL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="book_call"
              data-track-label={`service_${service.title.split(" ")[0].toLowerCase()}`}
              className={`mt-6 inline-flex h-11 items-center justify-center rounded-lg px-5 text-[15px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                service.popular
                  ? "bg-accent text-accent-foreground shadow-[0_4px_12px_rgba(253,101,30,0.25)] hover:shadow-[0_6px_18px_rgba(253,101,30,0.38)] focus-visible:ring-accent"
                  : "bg-surface-high text-primary hover:bg-surface-container focus-visible:ring-ring"
              }`}
            >
              {service.popular ? `Get started at ${service.price}` : "Talk it through"}
            </a>
          </div>
        ))}
      </div>

      <p className="t-body mt-8 text-center text-muted-foreground">
        Hosting and domain are separate, roughly ₹4,000–6,000 a year paid straight to the
        provider.{" "}
        <Link
          href="/pricing"
          className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
        >
          See what each package includes
        </Link>
      </p>
    </div>
  </section>
);

export default Services;
