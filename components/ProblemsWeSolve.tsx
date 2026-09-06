import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { PROBLEMS } from "@/data/homepage";

/**
 * The comp's two-column comparison: what agencies do on the left, what we do on the right.
 *
 * The left column sits on a tinted surface with a muted treatment and the right on white
 * cards with a shadow, so the eye lands on the answer rather than the complaint. That
 * asymmetry is the point of the section and is the comp's own composition.
 */
const ProblemsWeSolve = () => (
  <section className="bg-surface py-16 lg:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Honest comparison"
        title="Say goodbye to Indian agency headaches"
        lede="Most agencies treat a small business as a low-priority ticket with a recurring bill attached. Here is how we work instead."
      />

      <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-6">
        <div className="space-y-4">
          <p className="t-label flex items-center gap-2 text-muted-foreground">
            <XCircle weight="fill" aria-hidden className="h-4 w-4 text-destructive" />
            The typical agency
          </p>
          {PROBLEMS.map((item) => (
            <div
              key={item.pain}
              className="rounded-xl border border-border/60 bg-surface-container px-5 py-4"
            >
              <p className="t-body text-muted-foreground">{item.pain}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="t-label flex items-center gap-2 text-primary">
            <CheckCircle weight="fill" aria-hidden className="h-4 w-4 text-secondary" />
            The Cybiqon way
          </p>
          {PROBLEMS.map((item) => (
            <div
              key={item.solution}
              className="rounded-xl border border-border/50 bg-surface-lowest px-5 py-4 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.15)]"
            >
              <p className="t-body text-foreground">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProblemsWeSolve;
