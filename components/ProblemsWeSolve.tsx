import { PROBLEMS } from "@/data/homepage";

/**
 * Worry on the left, answer on the right, separated by space rather than by a rule.
 *
 * No numbers here: four problems are a set, not a sequence, and numbering a set is one of
 * the tells that made the previous version of this page read as generated. No icons
 * either — a tick and a cross beside every line was decoration on top of a contrast the
 * typography already makes.
 *
 * The worry is set at h3 and dark; the answer is body weight. That inversion is deliberate:
 * the visitor is scanning for their own problem, so the problem is the thing that has to
 * catch the eye.
 */
const ProblemsWeSolve = () => (
  <section className="bg-background py-20 lg:py-28">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <h2 className="t-h2 max-w-[18ch] text-foreground">
        Four things we hear on almost every first call.
      </h2>

      {/* Two columns of stacked pairs, not two columns nested inside two columns — that
          produced four narrow measures and nothing could be scanned. */}
      <div className="mt-14 grid gap-x-20 gap-y-12 lg:mt-20 lg:grid-cols-2 lg:gap-y-14">
        {PROBLEMS.map((item, i) => (
          <div key={item.pain} className="reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
            <h3 className="t-h3 max-w-[26ch] text-foreground">{item.pain}</h3>
            <p className="t-body mt-2.5 max-w-[46ch] text-muted-foreground">{item.solution}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemsWeSolve;
