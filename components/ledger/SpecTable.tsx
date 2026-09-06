/**
 * A specification ledger — numbered term/value rows with the values aligned in a column.
 *
 * This is the honest replacement for a hero illustration that asserts results. It shows
 * what a buyer actually gets and what it costs, which is the thing competitors hide and
 * therefore the thing worth leading with.
 *
 * Every row must be verifiable against /pricing. Do not put a figure here that the
 * company cannot stand behind — see the honesty flags in .okf/content/content-data.md.
 */
export type Spec = {
  term: string;
  value: string;
  note?: string;
};

export default function SpecTable({
  label,
  specs,
  className = "",
}: {
  label?: string;
  specs: Spec[];
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <p className="ledger-label mb-4">{label}</p> : null}
      <dl className="border-t border-rule-strong/25">
        {specs.map((spec, i) => (
          // Term and value share a row from sm up. Below that the value drops to its own
          // line, right-aligned under the term: at 390px "Hosting & domain" against
          // "₹4,000–6,000 / yr, paid direct" wraps both halves into a three-line tangle
          // if they are forced to share the width.
          <div
            key={spec.term}
            className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4 gap-y-0.5 border-b border-border py-3.5 sm:grid-cols-[2rem_1fr_auto]"
          >
            <dt className="ledger-num text-[13px] font-semibold tracking-[0.1em]">
              {String(i + 1).padStart(2, "0")}
            </dt>
            <dt className="text-[15px] text-muted-foreground">{spec.term}</dt>
            <dd className="col-start-2 text-left text-[15px] font-semibold tabular-nums text-foreground sm:col-start-3 sm:text-right">
              {spec.value}
              {spec.note ? (
                <span className="ml-2 font-normal text-muted-foreground">{spec.note}</span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
