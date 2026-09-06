import Link from "next/link";
import { SERVICES } from "@/data/homepage";

/**
 * The ink field — the first hard change of ground on the page.
 *
 * The website is not one of five equal cards. It is what most visitors came for and the
 * only service with a two-week promise attached, so it gets a block of its own at roughly
 * twice the weight, and the other four sit under it as a quieter rank. Equal cards would
 * flatten a real difference in what this business actually sells.
 *
 * Prices in marigold: the accent means "this is the number", and it appears nowhere else
 * in this section.
 */
const [lead, ...rest] = SERVICES;

const Services = () => (
  <section className="bg-ink py-20 text-ink-foreground lg:py-28">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <h2 className="t-h2 max-w-[20ch] text-white">
        Five things we build, every price on the page.
      </h2>

      {/* Lead service */}
      <div className="mt-14 grid gap-8 border-b border-white/12 pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <h3 className="t-h2 text-white">{lead.title}</h3>
          <p className="t-body mt-4 max-w-[52ch] text-white/62">{lead.description}</p>
        </div>
        <p
          className="font-anek text-[3.5rem] leading-none text-accent lg:text-[4.5rem]"
          style={{ fontVariationSettings: '"wght" 800, "wdth" 82', fontVariantNumeric: "tabular-nums" }}
        >
          {lead.price}
        </p>
      </div>

      {/* The other four, quieter */}
      <div className="mt-12 grid gap-x-16 gap-y-11 sm:grid-cols-2">
        {rest.map((service) => (
          <div key={service.title}>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="t-h3 text-white">{service.title}</h3>
              <p
                className="font-anek text-[1.6rem] leading-none text-accent"
                style={{ fontVariationSettings: '"wght" 700, "wdth" 88', fontVariantNumeric: "tabular-nums" }}
              >
                {service.price}
              </p>
            </div>
            <p className="t-body mt-3 text-white/58">{service.description}</p>
          </div>
        ))}
      </div>

      <p className="t-body mt-14 text-white/62">
        Every price is one-time, not a retainer.{" "}
        <Link
          href="/pricing"
          className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
        >
          See what each one includes
        </Link>
        .
      </p>
    </div>
  </section>
);

export default Services;
