import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STATUS_LABEL, type Product } from "@/data/products";

/**
 * The Index — ruled rows, not a card grid.
 *
 * Numbering is justified here because this genuinely is a catalogue; the number is the
 * position in a list a reader is scanning, not decoration. Shared by /products and every
 * category page so a product looks identical wherever it appears.
 */
export default function ProductIndex({
  products,
  startAt = 1,
}: {
  products: Product[];
  startAt?: number;
}) {
  return (
    <ol className="border-t border-rule-strong/25">
      {products.map((product, i) => (
        <li key={product.slug}>
          <Link
            href={`/products/${product.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-border py-6 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted focus-visible:bg-muted focus-visible:outline-none md:grid-cols-[3.5rem_14rem_1fr_auto] md:py-7"
          >
            <span className="text-[13px] font-semibold tabular-nums tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-primary">
              {String(startAt + i).padStart(2, "0")}
            </span>

            <span className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {product.name}
            </span>

            <span className="col-start-2 row-start-2 text-[15px] leading-relaxed text-muted-foreground md:col-start-3 md:row-start-1">
              {product.tagline}
            </span>

            <span className="col-start-3 row-start-1 flex items-center gap-4 justify-self-end md:col-start-4">
              <span
                className={`hidden text-[11px] font-semibold uppercase tracking-[0.14em] sm:inline ${
                  product.status === "live" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {STATUS_LABEL[product.status]}
              </span>
              <ArrowRight
                strokeWidth={1.5}
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-foreground"
              />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
