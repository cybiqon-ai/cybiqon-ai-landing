import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/ledger/SectionHeading";
import { SERVICES } from "@/data/homepage";

/**
 * Ruled rows with the price on every one.
 *
 * Previously a five-card grid where only the first card carried a figure and the other
 * four said nothing about cost, cycling through warm-card / glass-card / success-card /
 * card-surface — four class names that resolve to the identical style in globals.css, so
 * the variety was notional.
 *
 * All five prices are one-time and verified against app/pricing/PricingClient.tsx.
 * Publishing them here rather than behind a click is the whole argument: the agencies
 * this page competes with put a quote form in the way.
 */
const Services = () => (
  <section className="border-y border-border bg-muted/40 py-16 md:py-24">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl">
        <SectionHeading
          label="What we build"
          title="Five things, priced up front"
          lede="One-time prices, not retainers. Hosting and domain are separate and paid directly to the provider — roughly ₹4,000–6,000 a year."
        />
      </div>

      <ol className="mt-12 border-t border-rule-strong/25">
        {SERVICES.map((service, i) => (
          <li
            key={service.title}
            className="reveal grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1.5 border-b border-border py-6 md:grid-cols-[3.5rem_16rem_1fr_auto] md:py-7"
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <span className="ledger-num text-[13px] font-semibold tracking-[0.1em]">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {service.title}
            </h3>

            <p className="col-start-2 text-[15px] leading-relaxed text-muted-foreground md:col-start-3">
              {service.description}
            </p>

            <p className="col-start-2 text-[15px] font-semibold tabular-nums text-foreground md:col-start-4 md:justify-self-end md:pl-8">
              <span className="ledger-label mr-2 md:hidden">From</span>
              {service.price}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-[15px] text-muted-foreground">
        Something else in mind?{" "}
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-1.5 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          See what's included at each price
          <ArrowRight
            weight="bold"
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </p>
    </div>
  </section>
);

export default Services;
