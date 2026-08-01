import type { Readout } from "@/lib/lab";

/**
 * The measurement rail. /lab's signature element.
 *
 * Every value on it is either derived from the post's body at render time or a figure
 * the author measured — see lib/lab.ts. Nothing is padded to make the rail look fuller,
 * which is why the row count varies between posts: a post that cited nothing shows no
 * sources row rather than "0", because "0 sources" is a claim and an absent row is not.
 *
 * Two layouts, one data set. `stacked` is the sticky column on a post; the inline form
 * is a single strip used on index rows and on narrow viewports where a 150px column
 * would leave the title 40 characters wide.
 */
export default function ReadoutRail({
  readouts,
  date,
  stacked = false,
  className = "",
}: {
  readouts: Readout[];
  /** Rendered first and never omitted — every entry has one. */
  date: { display: string; iso: string };
  stacked?: boolean;
  className?: string;
}) {
  if (stacked) {
    return (
      <dl className={`lab-readout ${className}`}>
        <div className="flex items-baseline justify-between gap-3 border-b border-border pb-1.5 mb-1.5">
          <dt className="text-muted-foreground">date</dt>
          <dd className="lab-readout-value">
            <time dateTime={date.iso}>{date.display}</time>
          </dd>
        </div>
        {readouts.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-3 border-b border-border pb-1.5 mb-1.5"
          >
            <dt className="text-muted-foreground">{r.label}</dt>
            <dd className="lab-readout-value">{r.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={`lab-readout flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <dt className="sr-only">date</dt>
      <dd className="lab-readout-value">
        <time dateTime={date.iso}>{date.display}</time>
      </dd>
      {readouts.map((r) => (
        <div key={r.label} className="flex items-baseline gap-1.5">
          {/* The separator is decorative; it must not be read out between every pair. */}
          <span aria-hidden="true" className="text-border">
            ·
          </span>
          <dt className="sr-only">{r.label}</dt>
          <dd className="text-muted-foreground">
            <span className="lab-readout-value">{r.value}</span>
            {!/\s/.test(r.value) && <> {r.label}</>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
