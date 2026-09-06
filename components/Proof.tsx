import Link from "next/link";
import { ArrowUpRight, Quotes } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";
import { PRODUCTS } from "@/data/products";
import { CLIENT_PROJECTS } from "@/data/clients";

/**
 * The comp's "proven outcomes" band, rebuilt out of things that can be checked.
 *
 * The comp filled this with per-industry figures — +310% retail, 40+ leads a month,
 * 60% automated, sub-15-second replies — and a testimonial card carrying five stars, a
 * "Verified Client Partner" badge, "Pune & Mumbai", "3.2x Qualified Inquiries" and a
 * headshot. None of it holds. The headshot in particular is the generated image sitting in
 * the same Stitch project under the title "…trustworthy business consultant avatar".
 *
 * What replaces it: the Economic Times scan, the storefront actually built for a client,
 * the shipped apps, and the one real testimonial with the words the client actually said.
 * See .okf/content/content-data.md for what may and may not be shown here.
 */
const shipped = PRODUCTS.filter((p) => p.icon);
const snackly = CLIENT_PROJECTS.find((c) => c.slug === "snackly");

const Proof = () => (
  <section className="bg-surface py-16 lg:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="What we can show you"
        title="We are early, and this is the evidence"
        lede="No invented numbers. Everything below links to something you can open and check."
      />

      <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[420px_minmax(0,1fr)]">
        {/* The press scan */}
        <figure className="rounded-2xl border border-border/60 bg-surface-lowest p-5 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]">
          <img
            src="/img/et-clipping.webp"
            width={840}
            height={1048}
            alt='Clipping from The Economic Times, Hyderabad edition, 15 August 2026, page 4 — the headline "Vernacular AI gives India&apos;s entrepreneurs a voice" and the paragraph quoting Prajjwal Pathak of Cybiqon AI.'
            className="w-full rounded-lg border border-border/60"
          />
          <figcaption className="t-body-sm mt-4 text-muted-foreground">
            The Economic Times, Hyderabad, 15 August 2026.{" "}
            <Link
              href="/press"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              See the full page
            </Link>
          </figcaption>
        </figure>

        <div className="flex flex-col gap-5">
          {/* Client web work */}
          <div className="rounded-2xl border border-border/60 bg-surface-lowest p-5 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]">
            <h3 className="t-h3 text-primary">A storefront we built, live today</h3>
            <p className="t-body-sm mt-2 text-muted-foreground">
              {snackly ? snackly.summary : ""}
            </p>
            <a href="https://snacklyfoods.in" target="_blank" rel="noopener noreferrer" className="group mt-4 block">
              <img
                src="/img/snackly-home.webp"
                width={900}
                height={537}
                alt="The Snackly storefront at snacklyfoods.in — promotional bar, navigation, and the hero band showing the client's own product packaging."
                className="w-full rounded-lg border border-border/60 transition-shadow group-hover:shadow-[0_10px_30px_-12px_rgba(0,48,79,0.35)]"
              />
            </a>
            <p className="t-body-sm mt-3 text-muted-foreground">
              Next.js on Cloudflare Workers, a Hono API over D1 and R2, a custom admin panel
              behind Cloudflare Access, and 179 tests that run against a real database.{" "}
              <a
                href="https://snacklyfoods.in"
                target="_blank"
                rel="noopener noreferrer"
                data-track="client_site_click"
                data-track-label="snackly"
                className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                snacklyfoods.in
              </a>
            </p>
          </div>

          {/* Shipped products */}
          <div className="rounded-2xl border border-border/60 bg-surface-lowest p-5 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]">
            <h3 className="t-h3 text-primary">Apps and games we have shipped</h3>
            <p className="t-body-sm mt-2 text-muted-foreground">
              Our own, built end to end. Four are live on the Play Store, the rest are in
              testing.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-5">
              {shipped.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex w-[76px] flex-col items-center gap-2 text-center"
                  >
                    <img
                      src={product.icon as string}
                      width={128}
                      height={128}
                      alt=""
                      className="h-12 w-12 rounded-xl border border-border/60 transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    <span className="t-label-sm leading-tight text-muted-foreground transition-colors group-hover:text-primary">
                      {product.name.split(":")[0]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The one real testimonial */}
      <figure className="mt-5 rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] lg:p-8">
        <Quotes weight="fill" aria-hidden className="h-7 w-7 text-accent-soft" />
        <blockquote className="t-body-lg mt-3 max-w-[62ch] text-foreground">
          &ldquo;This platform completely transformed our lead generation process. What used
          to take our team hours of manual work now happens automatically in minutes.
          We&rsquo;ve been able to 10x our business because we can now focus on closing deals
          instead of collecting data.&rdquo;
        </blockquote>
        <figcaption className="t-body-sm mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
          <span className="font-semibold text-primary">Amit Menon</span>
          <span>— founder, LeadzGalaxy.com</span>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            Read the case study
            <ArrowUpRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default Proof;
