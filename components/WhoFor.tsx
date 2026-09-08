import { AUDIENCES } from "@/data/homepage";

/**
 * Self-identification. A visitor should be able to find their own business in one line
 * and stop wondering whether this is aimed at them.
 *
 * These are the kinds of business the work is built for, not a list of clients — the
 * distinction matters and the heading carries it.
 */
const WhoFor = () => (
  <section className="bg-surface py-16 lg:py-20">
    <div className="mx-auto grid max-w-[1240px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-8">
      <div>
        <p className="t-eyebrow text-accent-ink">Who this is for</p>
        <h2 className="t-h2 mt-2.5 text-primary">
          Businesses that have outgrown spreadsheets
        </h2>
      </div>
      <div>
        <p className="t-body-lg text-muted-foreground">
          If the work already happens — on paper, in WhatsApp, in a sheet somebody guards —
          it can usually be built properly. These are the shapes of business we build for.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {AUDIENCES.map((a) => (
            <li
              key={a}
              className="t-label-sm rounded-full border border-border/70 bg-surface-lowest px-3.5 py-2 text-primary"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WhoFor;
