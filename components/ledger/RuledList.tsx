import type { ReactNode } from "react";

/**
 * Ruled rows, not a card grid — the same form as components/products/ProductIndex.tsx,
 * generalised for the marketing pages.
 *
 * The homepage previously rendered five different card treatments (glass-card,
 * warm-card, success-card, card-surface and bespoke divs) which all resolve to the
 * identical style in globals.css, so the variety was notional. A rule costs no colour
 * and reads as a document rather than a template.
 */
export type RuledItem = {
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
};

export default function RuledList({
  items,
  numbered = true,
  startAt = 1,
}: {
  items: RuledItem[];
  numbered?: boolean;
  startAt?: number;
}) {
  const Wrapper = numbered ? "ol" : "ul";

  return (
    <Wrapper className="border-t border-rule-strong/25">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`grid items-baseline gap-x-4 gap-y-1.5 border-b border-border py-6 md:py-7 ${
            numbered
              ? "grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_16rem_1fr_auto]"
              : "grid-cols-1 md:grid-cols-[16rem_1fr_auto]"
          }`}
        >
          {numbered ? (
            <span className="ledger-num text-[13px] font-semibold tracking-[0.1em]">
              {String(startAt + i).padStart(2, "0")}
            </span>
          ) : null}

          <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {item.title}
          </h3>

          {item.description ? (
            <p
              className={`text-[15px] leading-relaxed text-muted-foreground ${
                numbered ? "col-start-2 md:col-start-3" : "md:col-start-2"
              }`}
            >
              {item.description}
            </p>
          ) : null}

          {item.meta ? (
            <div
              className={`text-[15px] font-semibold tabular-nums text-foreground md:justify-self-end ${
                numbered ? "col-start-2 md:col-start-4" : "md:col-start-3"
              }`}
            >
              {item.meta}
            </div>
          ) : null}
        </li>
      ))}
    </Wrapper>
  );
}
