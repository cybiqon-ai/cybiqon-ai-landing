import { ArrowRight, Check, X } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/ledger/SectionHeading";
import { PROBLEMS } from "@/data/homepage";

/**
 * Pain on the left, what we do about it on the right, on a rule.
 *
 * The previous version rendered each pair as two rounded cards either side of a
 * hand-drawn CSS arrow. The rule does the same job — it is the same visual grammar as
 * /products, and it drops eight bordered boxes and four arrow constructions from the page.
 */
const ProblemsWeSolve = () => (
  <section className="py-16 md:py-24">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl">
        <SectionHeading
          label="Why people call us"
          title="Four problems, over and over"
          lede="Sound familiar? These are the ones that come up on almost every first call."
        />
      </div>

      <ul className="mt-12 max-w-5xl border-t border-rule-strong/25">
        {PROBLEMS.map((item, i) => (
          <li
            key={item.pain}
            className="reveal grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-border py-6 md:grid-cols-[3rem_1fr_1.5rem_1fr]"
            style={{ transitionDelay: `${i * 0.06}s` }}
          >
            <span className="ledger-num hidden text-[13px] font-semibold tracking-[0.1em] md:block">
              {String(i + 1).padStart(2, "0")}
            </span>

            <p className="flex items-baseline gap-2.5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              <X
                weight="bold"
                aria-hidden
                className="relative top-[3px] h-3.5 w-3.5 shrink-0 text-destructive"
              />
              {item.pain}
            </p>

            <ArrowRight
              weight="bold"
              aria-hidden
              className="hidden h-4 w-4 shrink-0 self-center text-border md:block"
            />

            <p className="flex items-baseline gap-2.5 text-[15px] font-medium leading-relaxed text-foreground md:text-base">
              <Check
                weight="bold"
                aria-hidden
                className="relative top-[3px] h-3.5 w-3.5 shrink-0 text-secondary"
              />
              {item.solution}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ProblemsWeSolve;
