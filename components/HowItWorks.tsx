import { STEPS } from "@/data/homepage";

/**
 * The only numbered section on the page, because this is the only content that is
 * genuinely a sequence. Everywhere else the markers were decoration.
 *
 * A horizontal track on desktop with the numbers sitting on a rule, so the four steps read
 * as a progression rather than as four more cards. On mobile it stacks and the rule becomes
 * the left edge of each step.
 */
const HowItWorks = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <h2 className="t-h2 max-w-[20ch] text-foreground">
        From the first call to going live.
      </h2>

      <ol className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="reveal border-l-2 border-primary/25 pl-5 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-6"
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <span
              className="font-anek block text-[2rem] leading-none text-primary"
              style={{ fontVariationSettings: '"wght" 700, "wdth" 82', fontVariantNumeric: "tabular-nums" }}
            >
              {i + 1}
            </span>
            <h3 className="t-h3 mt-3 text-foreground">{step.title}</h3>
            <p className="t-body mt-2 text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
