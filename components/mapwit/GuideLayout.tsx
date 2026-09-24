import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { MAPWIT_STORE_URL, guideBySlug, guidePath, type MapwitGuide } from "@/data/mapwitGuides";

/**
 * The shell every MapWit guide renders inside.
 *
 * `/products/*` is Ledger-themed (see components/ThemeScope.tsx): squared corners,
 * hairline rules, small uppercase labels. That is the long-form document idiom already
 * used by the product pages, so a guide inherits it by sitting under /products and this
 * file only has to follow the same class vocabulary as components/products/ProductDetail.
 *
 * The store link carries `data-track` so the analytics that already watches CTAs elsewhere
 * on the site sees installs that came from a guide.
 */
export default function GuideLayout({
  guide,
  children,
}: {
  guide: MapwitGuide;
  children: React.ReactNode;
}) {
  const related = guide.related.map(guideBySlug).filter(Boolean) as MapwitGuide[];

  return (
    <article className="pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Link
          href="/products/mapwit"
          className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft weight="bold" aria-hidden className="h-3.5 w-3.5" />
          MapWit
        </Link>

        <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{guide.excerpt}</p>

        {/* A guide with no date is a guide a reader has to guess about, and the SEO audit
            flags it as missing freshness. Shown, not just in the schema. */}
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <time dateTime={guide.updated ?? guide.published}>
            {guide.updated ? "Updated " : ""}
            {new Date(`${guide.updated ?? guide.published}T00:00:00Z`).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </p>

        <div className="guide-prose mt-10">{children}</div>

        {/* The tool this guide is about. One link, at the end, after the answer. */}
        <aside className="mt-14 border-y border-border py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ochre">
            The tool used here
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">MapWit</strong> is a free Chrome
            side panel that reads a Google Maps search, scores each business and exports the
            list. No account, no server: the leads stay in your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
            <a
              href={MAPWIT_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="mapwit_install"
              data-track-label={`guide_${guide.slug}`}
              className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-ochre"
            >
              Get it on the Chrome Web Store
              <ArrowUpRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/lab/mapwit-chrome-extension-google-maps-leads"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              How it was built, and what broke
            </Link>
          </div>
        </aside>

        {related.length > 0 && (
          <nav className="mt-10">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Read next
            </h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={guidePath(r.slug)} className="block py-3.5 group">
                    <span className="text-[15px] font-semibold text-foreground group-hover:text-ochre">
                      {r.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                      {r.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
