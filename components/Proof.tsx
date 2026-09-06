import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/ledger/SectionHeading";
import { PRODUCTS } from "@/data/products";
import { CLIENT_PROJECTS } from "@/data/clients";
import { MENTIONS } from "@/data/press";

/**
 * The proof section, built only out of things a visitor can go and check.
 *
 * It replaces IndustryShowcase, which rotated six industry names on a 2s setInterval and
 * asserted nothing — "Retail Shops: 3x more inquiries" was not attached to a retail shop
 * anyone could name.
 *
 * What this deliberately does NOT contain: a client count, a projects-delivered figure, a
 * logo wall, or a "trusted by N MSMEs" line. The company has no paying clients yet and
 * data/launch5.ts keeps SLOTS_TAKEN at a real zero. Three components that invented social
 * proof were deleted on 1 Aug 2026 and this is exactly the section where they would grow
 * back. See .okf/content/content-data.md § "Honesty flags".
 *
 * Every number below is counted from the data file that owns it, so none of them can
 * drift into being a lie. If PRODUCTS shrinks, this shrinks.
 */

const liveProducts = PRODUCTS.filter((p) => p.status === "live").length;
const engagements = CLIENT_PROJECTS.length;

const pressMention = MENTIONS[0];
const v = pressMention.verification;

// The verification union forbids `edition` on an online mention, which is the point of
// the union — see the header of data/press.ts. Narrow rather than assert.
const pressDetail =
  v.medium === "print"
    ? `${v.edition} edition, ${v.page}, 15 August 2026`
    : "online";

const Proof = () => (
  <section className="py-16 md:py-24">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl">
        <SectionHeading
          label="Evidence"
          title="What we can show you"
          lede="We are early, and we would rather say so than pad this page. Everything here links to something you can open."
        />
      </div>

      <div className="mt-12 grid gap-x-12 border-t border-rule-strong/25 lg:grid-cols-3">
        {/* Press — one mention, described as one mention. */}
        <article className="reveal border-b border-border py-7">
          <p className="ledger-label">In the press</p>
          <p className="display mt-3 text-2xl text-foreground">
            The Economic Times
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            {pressMention.headline} — {pressDetail}, quoting Prajjwal on AI adoption
            among Indian MSMEs.
          </p>
          <Link
            href="/press"
            className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Read the clipping
            <ArrowRight
              weight="bold"
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </article>

        {/* Shipped work — counted, not claimed. */}
        <article className="reveal border-b border-border py-7" style={{ transitionDelay: "0.05s" }}>
          <p className="ledger-label">Shipped</p>
          <p className="display mt-3 text-2xl tabular-nums text-foreground">
            {liveProducts} products live, {engagements} client builds
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Our own apps, games and extensions — several on the Play Store — plus the
            client work we are allowed to describe. One client is unnamed because the
            repositories are theirs to announce, and the page says so.
          </p>
          <Link
            href="/products"
            className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            See the ledger
            <ArrowRight
              weight="bold"
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </article>

        {/* The people. The most checkable thing on the page. */}
        <article className="reveal border-b border-border py-7" style={{ transitionDelay: "0.1s" }}>
          <p className="ledger-label">Who builds it</p>
          <div className="mt-3 flex items-center gap-3">
            <Image
              src="/founder1.jpg"
              alt="Prajjwal Pathak, co-founder of Cybiqon AI Solutions"
              width={44}
              height={44}
              className="h-11 w-11 object-cover"
            />
            <Image
              src="/founder2.jpg"
              alt="Muskan, co-founder of Cybiqon AI Solutions"
              width={44}
              height={44}
              className="h-11 w-11 object-cover"
            />
            <p className="display text-2xl text-foreground">Muskan &amp; Prajjwal</p>
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Two people, both named, both on the call. We also write up how we build things
            — including the parts that went wrong — in the lab.
          </p>
          <Link
            href="/lab"
            className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Read the lab
            <ArrowRight
              weight="bold"
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </article>
      </div>
    </div>
  </section>
);

export default Proof;
