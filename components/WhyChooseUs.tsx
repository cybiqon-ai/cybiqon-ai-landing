import SectionHeading from "@/components/ledger/SectionHeading";
import { DIFFERENTIATORS } from "@/data/homepage";

/**
 * One section where there were three.
 *
 * TrustBar, WhyChooseUs and Stats each asserted a set of guarantees, and they overlapped
 * heavily: "you own the code" was on this page four times counting the hero, and
 * "24-hour response" twice. Repetition reads as padding, not emphasis. The distinct
 * claims are consolidated here and the other two sections are deleted.
 *
 * The figures are typographic rather than a full-width band of white-on-primary — the
 * blue Stats strip was the single largest block of colour on the page and it was carrying
 * four claims already made above it.
 */
const WhyChooseUs = () => (
  <section className="border-y border-border bg-muted/40 py-16 md:py-24">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl">
        <SectionHeading
          label="Why Cybiqon"
          title="What you are actually buying"
          lede="Six promises we can keep on our own, without needing you to take anything on faith."
        />
      </div>

      <div className="mt-12 grid gap-x-12 border-t border-rule-strong/25 md:grid-cols-2 lg:grid-cols-3">
        {DIFFERENTIATORS.map((item, i) => (
          <div
            key={item.title}
            className="reveal border-b border-border py-7"
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <p className="display text-3xl tabular-nums text-foreground md:text-4xl">
              {item.value}
            </p>
            <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
