import SectionHeading from "@/components/ledger/SectionHeading";
import { STEPS } from "@/data/homepage";

/**
 * Extracted out of app/page.tsx, where it was an inline `howItWorksSteps` array plus
 * forty lines of JSX — one of the arrays content-data.md lists as welded into its
 * renderer.
 *
 * Four numbered rows. The step number is the whole visual device, so the icon chips and
 * the little primary-coloured badge that used to sit on each one are gone: they were
 * decoration on top of a number that already said "1".
 */
const HowItWorks = () => (
  <section className="py-16 md:py-24">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl">
        <SectionHeading
          label="How it works"
          title="First call to launch"
          lede="No account managers, no handoffs. You talk to the people building it."
        />
      </div>

      <ol className="mt-12 grid gap-x-12 border-t border-rule-strong/25 md:grid-cols-2">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="reveal grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 border-b border-border py-6"
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <span className="ledger-num text-[13px] font-semibold tracking-[0.1em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
