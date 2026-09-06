import SpecTable, { type Spec } from "@/components/ledger/SpecTable";

/**
 * The hero's right-hand column.
 *
 * This replaces HeroDashboardMockup, which rendered a fake analytics panel — 1,247
 * visitors, +147%, 12 orders today, 73% repeat customers. None of those numbers was
 * real. It was flagged in .okf/content/content-data.md as "the same class of thing" as
 * the invented social proof deleted on 1 Aug, kept only because it read as an
 * illustrative product mockup rather than a claim about Cybiqon's own results. On a
 * homepage selling trust to small business owners, that distinction is thinner than it
 * needs to be, and the panel was doing no work that this does not do better.
 *
 * Every line below is verifiable against /pricing:
 *   ₹9,999             services[0].salePrice
 *   ₹4,000–6,000/yr    faqs, "Are these one-time payments or recurring?"
 *   50% / 50%          faqs, "Do you offer payment plans?" (projects over ₹20,000)
 *
 * Publishing the price is the position. The competitors this page is measured against
 * either hide pricing behind a quote form or lead with a ₹999 loss-leader; a buyer who
 * can see the real number before booking a call is the differentiator we actually have.
 */
const SPECS: Spec[] = [
  { term: "Business website, from", value: "₹9,999" },
  { term: "Live in", value: "2–3 weeks" },
  { term: "Hosting & domain", value: "₹4,000–6,000", note: "/ yr, paid direct" },
  { term: "Payment", value: "50 / 50", note: "over ₹20,000" },
  { term: "Code ownership", value: "100%", note: "yours" },
  { term: "Hidden fees", value: "None" },
];

export default function HeroSpecLedger() {
  return (
    <div className="border border-border bg-card p-6 lg:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="ledger-label">What it costs</p>
        <p className="ledger-label">One-time</p>
      </div>

      <SpecTable specs={SPECS} className="mt-5" />

      <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
        The full price list is on{" "}
        <a
          href="/pricing"
          className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          pricing
        </a>
        . No quote form in the way.
      </p>
    </div>
  );
}
