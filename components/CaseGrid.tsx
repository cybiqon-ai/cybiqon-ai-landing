import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { CASES } from "@/data/homepage";

/**
 * The work, as pictures.
 *
 * This sits above the evidence block rather than replacing it: this grid is what we have
 * built, the block below is what a sceptic can verify — the newspaper scan, the stack
 * behind the client site, the shipped-app links. They answer different questions and
 * collapsing them lost the second one.
 */
const CaseGrid = () => (
  <section className="bg-surface-lowest py-16 lg:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Selected work"
        title="Things we have built and shipped"
        lede="Our own products and our clients', held to the same standard. Every one of these is live and you can open it."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {CASES.map((item) => {
          const inner = (
            <>
              <div className="overflow-hidden rounded-xl border border-border/60">
                <img
                  src={item.img}
                  width={800}
                  height={420}
                  alt={item.alt}
                  className="aspect-[800/420] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="t-h3 text-primary">{item.name}</h3>
                  <p className="t-body-sm mt-1 text-muted-foreground">{item.what}</p>
                </div>
                <span className="t-label-sm mt-1 flex shrink-0 items-center gap-1 rounded-full bg-secondary/15 px-2.5 py-1 text-tertiary-deep">
                  {item.status}
                </span>
              </div>
            </>
          );

          const cls =
            "group flex h-full flex-col rounded-2xl border border-border/60 bg-surface-lowest p-4 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-14px_rgba(0,48,79,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

          return (
            <li key={item.name}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="client_site_click"
                  data-track-label={item.name.toLowerCase().split(" ")[0]}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <Link href={item.href} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-center">
        <Link
          href="/products"
          className="t-label inline-flex items-center gap-1.5 text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
        >
          See all projects
          <ArrowRight weight="bold" aria-hidden className="h-4 w-4" />
        </Link>
      </p>
    </div>
  </section>
);

export default CaseGrid;
