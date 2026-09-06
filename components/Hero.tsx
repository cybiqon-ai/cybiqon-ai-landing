import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import HeroSpecLedger from "./HeroSpecLedger";

/**
 * A server component, and deliberately animation-light.
 *
 * The h1 here is the LCP element. An earlier draft of this redesign used framer-motion
 * for the entrance, which server-renders the initial state — the h1 shipped in the static
 * HTML as `style="opacity:0;transform:translateY(18px)"` and stayed invisible until
 * hydration. On the mobile networks this page actually sells into, that is the LCP
 * element gated behind a JS bundle. The entrance is CSS instead: it runs immediately,
 * survives a failed or slow hydration, and costs no client JS at all.
 *
 * framer-motion is still used on this page — below the fold, where an element that starts
 * at opacity 0 is off-screen anyway and nothing is waiting on it. See the budget rule in
 * components/ledger/Stagger.tsx.
 *
 * The h1 carries no entrance class at all, so it paints on first frame. Everything
 * around it uses `.enter`, which is disabled under prefers-reduced-motion.
 */

const TIDYCAL = "https://tidycal.com/itspyguru/cybiqon-30-minute-meeting";

const GUARANTEES = [
  "Live in 2–3 weeks",
  "You own the code",
  "Founder-led, based in India",
];

const Hero = () => (
  <section className="relative overflow-hidden border-b border-border pb-16 pt-28 lg:pb-24 lg:pt-36">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left column — the argument */}
        <div>
          <p className="ledger-label enter">
            Websites &amp; AI automation for Indian MSMEs
          </p>

          <h1
            className="display mt-5 text-[2.5rem] leading-[1.04] text-foreground sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            Your business online in 2–3 weeks.
          </h1>

          <p
            className="enter mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]"
            style={{ animationDelay: "120ms" }}
          >
            Websites and WhatsApp automation built for Indian MSMEs — fast, affordable,
            and you own 100% of the code.
          </p>

          <ul
            className="enter mt-7 flex flex-wrap gap-x-6 gap-y-2.5"
            style={{ animationDelay: "180ms" }}
          >
            {GUARANTEES.map((text) => (
              <li key={text} className="flex items-center gap-2 text-[15px] text-foreground">
                <Check weight="bold" className="h-4 w-4 shrink-0 text-secondary" />
                {text}
              </li>
            ))}
          </ul>

          <div
            className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            {/* A real anchor rather than an onClick window.open: it keeps this component
                on the server, it is middle-clickable and keyboard-reachable, and a
                crawler can see where it goes. */}
            <a
              href={TIDYCAL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center justify-center gap-2 bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Book a free call
              <ArrowRight
                weight="bold"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center border border-border px-7 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              See prices
            </Link>
          </div>

          {/* Free-audit secondary CTA — hidden, not deleted.
              The hero leads with one action instead of two, so the free audit doesn't
              compete with the primary CTA. /free-audit itself still exists and is still
              linked from the footer and the sitemap; only this hero prompt is hidden.
              Restore by removing the wrapping block below. */}
          {false && (
            <div className="mt-5 text-sm text-muted-foreground">
              Not ready to talk? Get a{" "}
              <Link href="/free-audit" className="font-semibold text-primary underline underline-offset-4">
                free website audit
              </Link>{" "}
              — no strings attached.
            </div>
          )}
        </div>

        {/* Right column — what it costs.
            HeroSocialProof.tsx used to render below this and was DELETED on 1 Aug 2026,
            along with features/LiveActivityTicker and features/SocialProofBar. Keeping the
            reason where someone would rebuild it: it showed "{N} MSME owners got their
            free audit this week" beside a pulsing "Live" badge and five invented names
            (Ramesh S., Priya K., Vijay M., Anjali J., Suresh K.). The number came from
            useLiveCount(47) — it started at 47 and randomly incremented every 15 seconds.
            The real audit_leads table held 2 rows. That is a fabricated claim on the
            homepage of a company selling trust to small businesses. It should not come
            back without real numbers behind it.

            HeroDashboardMockup, which rendered here until 6 Sep 2026, was the same class
            of thing: 1,247 visitors, +147%, 12 orders, 73% repeat — none of them real.
            It is replaced by figures that are all checkable against /pricing. */}
        <div className="enter lg:pt-2" style={{ animationDelay: "300ms" }}>
          <HeroSpecLedger />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
