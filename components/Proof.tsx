import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CLIENT_PROJECTS } from "@/data/clients";

/**
 * The evidence, shown rather than described.
 *
 * The previous version of this section was three columns of prose with a link reading
 * "Read the clipping". The clipping is the strongest asset this company has — a national
 * newspaper naming the founder — and it was rendered as eight words of underlined text.
 * It is a picture now.
 *
 * Everything here depicts something that genuinely exists. What is deliberately absent: a
 * client count, a projects-delivered total, a logo wall, a "trusted by N MSMEs" line. There
 * are no paying website clients yet and data/launch5.ts keeps SLOTS_TAKEN at a real zero;
 * three components that invented social proof were deleted on 1 Aug 2026 and this is the
 * section where they would grow back. See .okf/content/content-data.md.
 *
 * Explicitly NOT used, though they exist on disk: the Kataria site images and the Snackly
 * product photography, both Imagen-generated and flagged as such in their own repos, and
 * every social card carrying a photograph of a person who is not a customer.
 *
 * The clipping is shown at ~420px because data/press.ts documents that as its correct
 * size: legible from 300px, and "reads as a graphic shouting" if given more width.
 */
const shipped = PRODUCTS.filter((p) => p.icon);
const snackly = CLIENT_PROJECTS.find((c) => c.slug === "snackly");

const Proof = () => (
  <section className="bg-background pb-20 lg:pb-28">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <h2 className="t-h2 max-w-[22ch] text-foreground">
        We are early. Here is everything we can actually show you.
      </h2>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[420px_1fr] lg:gap-20">
        {/* The clipping, at the width press.ts says it wants */}
        <figure className="reveal">
          <img
            src="/img/et-clipping.webp"
            width={840}
            height={1048}
            alt='Clipping from The Economic Times, Hyderabad edition, 15 August 2026, page 4, showing the headline "Vernacular AI gives India&apos;s entrepreneurs a voice" and the paragraph quoting Prajjwal Pathak of Cybiqon AI.'
            className="w-full rounded-[4px] border border-border shadow-[0_1px_2px_rgba(19,28,70,0.06),0_12px_28px_-12px_rgba(19,28,70,0.25)]"
          />
          <figcaption className="t-body mt-4 text-muted-foreground">
            The Economic Times, Hyderabad, 15 August 2026.{" "}
            <Link
              href="/press"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              The full page
            </Link>
            .
          </figcaption>
        </figure>

        <div>
          {/* Client web work — the only visual evidence of it that exists */}
          <div className="reveal">
            <h3 className="t-h3 text-foreground">A storefront we designed and built</h3>
            <p className="t-body mt-2 max-w-[54ch] text-muted-foreground">
              {snackly ? snackly.summary : ""}
            </p>
            <figure className="mt-5">
              <img
                src="/img/snackly-home.webp"
                width={900}
                height={647}
                alt="The Snackly storefront home page as designed and built by Cybiqon — navigation, hero band, and the trust row beneath it."
                className="w-full rounded-[4px] border border-border"
              />
              {/* The layout, type and build are ours. The photograph inside it is not a
                  photograph of anything — clients-work/snackly/README.md records these as
                  Imagen development placeholders, with real photography still owed to the
                  client. Saying so is cheaper than having a visitor assume it is a real
                  product shot and find out otherwise. */}
              <figcaption className="mt-3 text-[15px] text-muted-foreground">
                Design and build are ours; the product photography is placeholder art
                standing in until the client&rsquo;s own shots arrive.
              </figcaption>
            </figure>
          </div>

        </div>
      </div>

      {/* Shipped products — real launcher icons, real Play listings.
          Full width beneath both columns: as the tail of the right-hand column it left a
          tall void under the clipping, which is shorter than the storefront beside it. */}
      <div className="reveal mt-16">
        <h3 className="t-h3 text-foreground">Apps and games we have shipped</h3>
        <p className="t-body mt-2 max-w-[54ch] text-muted-foreground">
          Our own, built end to end. Four are live on the Play Store; the rest are in
          testing.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-6">
          {shipped.map((product) => (
        <li key={product.slug}>
          <Link
            href={`/products/${product.slug}`}
            className="group flex w-[92px] flex-col items-center gap-2.5 text-center"
          >
            <img
          src={product.icon as string}
          width={128}
          height={128}
          alt=""
          className="h-14 w-14 rounded-[12px] border border-border transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            <span className="text-[13px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
          {product.name.split(":")[0]}
            </span>
          </Link>
        </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Proof;
