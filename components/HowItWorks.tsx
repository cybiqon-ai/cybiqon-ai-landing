import { Clock, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { STEPS } from "@/data/homepage";

/**
 * The comp's four numbered process cards, each with a timing chip.
 *
 * Numbering earns its place here — this is the only genuinely sequential content on the
 * page. An earlier version of this redesign numbered the problems, the services and the
 * guarantees too, none of which are sequences.
 *
 * The timings add up to the 2-3 weeks the hero promises. If that promise changes, these
 * change with it.
 */
const HowItWorks = () => (
  <section className="bg-surface py-16 lg:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Frictionless process"
        title="From the first call to a live website, in four steps"
        lede="No jargon and no endless review cycles. A short sprint run by the people writing the code."
      />

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const last = i === STEPS.length - 1;
          return (
            <li
              key={step.title}
              className="flex flex-col rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
            >
              <span
                className={`t-label-sm flex h-9 w-9 items-center justify-center rounded-full tabular-nums ${
                  last ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h3 mt-4 text-primary">{step.title}</h3>
              <p className="t-body-sm mt-2 flex-1 text-muted-foreground">{step.description}</p>
              <p
                className={`t-label-sm mt-5 inline-flex items-center gap-1.5 ${
                  last ? "text-secondary-foreground" : "text-accent"
                }`}
              >
                {last ? (
                  <RocketLaunch weight="fill" aria-hidden className="h-3.5 w-3.5" />
                ) : (
                  <Clock weight="fill" aria-hidden className="h-3.5 w-3.5" />
                )}
                {step.when}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
