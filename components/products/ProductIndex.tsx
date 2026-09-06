import Link from "next/link";
import { ArrowUpRight, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { STATUS_LABEL, type Product } from "@/data/products";

/**
 * The product grid.
 *
 * This was ruled rows in the Ledger language — numbered, hairline-separated, and carrying
 * no imagery at all, on a page whose entire job is to show what has been built. Seven real
 * launcher icons were sitting in the repo unused. Cards now, matching the homepage.
 *
 * The `startAt` numbering is gone with the rows. A catalogue of seven is not a sequence,
 * and the number was the only thing distinguishing one entry from the next.
 */
const STATUS_STYLE: Record<string, string> = {
  live: "bg-secondary/15 text-tertiary-deep",
  testing: "bg-accent-softer text-[hsl(var(--accent))]",
  building: "bg-surface-high text-primary",
};

export default function ProductIndex({ products }: { products: Product[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug}>
          <Link
            href={`/products/${product.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_28px_-12px_rgba(0,48,79,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-4">
              {product.icon ? (
                <img
                  src={product.icon}
                  width={128}
                  height={128}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-xl border border-border/60"
                />
              ) : (
                <span className="h-12 w-12 shrink-0 rounded-xl border border-border/60 bg-surface-high" />
              )}
              <span
                className={`t-label-sm shrink-0 rounded-full px-2.5 py-1 ${
                  STATUS_STYLE[product.status] ?? STATUS_STYLE.building
                }`}
              >
                {STATUS_LABEL[product.status]}
              </span>
            </div>

            <h3 className="t-h3 mt-4 text-primary">{product.name}</h3>
            <p className="t-body-sm mt-1.5 flex-1 text-muted-foreground">{product.tagline}</p>

            <span className="t-label-sm mt-5 inline-flex items-center gap-1.5 text-primary">
              {product.playUrl ? (
                <>
                  <GooglePlayLogo weight="fill" aria-hidden className="h-3.5 w-3.5" />
                  On Google Play
                </>
              ) : (
                "Read more"
              )}
              <ArrowUpRight
                weight="bold"
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
