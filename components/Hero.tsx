import Link from "next/link";
import { ArrowRight, CalendarBlank, Code, Lock, Lightning } from "@phosphor-icons/react/dist/ssr";
import { TIDYCAL } from "@/data/homepage";
import AgentDemo from "./AgentDemo";

/**
 * Built to the Stitch comp — projects/7623040016974616845, "Cybiqon AI Homepage Redesign".
 *
 * A server component with no entrance animation on the h1: it is the LCP element and it
 * paints on the first frame. An earlier attempt at this redesign animated it with
 * framer-motion, which server-rendered it at opacity:0 and left the headline waiting on
 * hydration — the wrong trade on the mobile networks this page sells into.
 *
 * The ambient blurred fields behind the content are the comp's own device and are most of
 * where the section gets its depth. They are pointer-events-none and purely decorative.
 */
const MICRO = [
  { icon: Code, text: "Written for you, not assembled from a template" },
  { icon: Lightning, text: "Websites live in 2–3 weeks" },
  { icon: Lock, text: "100% code and domain ownership" },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-surface pb-16 pt-32 lg:pb-24 lg:pt-40">
    {/* Ambient backdrops */}
    <div
      aria-hidden
      className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[hsl(var(--surface-high))] opacity-70 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-accent-softer opacity-60 blur-3xl"
    />

    <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="t-label-sm text-primary">Custom software and AI for Indian businesses</span>
        </p>

        <h1 className="t-display mt-5 text-primary">
          Custom software and{" "}
          <span className="text-accent-ink">AI agents</span> for Indian businesses
        </h1>

        <p className="t-body-lg mt-5 max-w-[54ch] text-muted-foreground">
          Agents that do real work, admin panels, storefronts and automation — written for
          your business rather than assembled from a template, and you own every line of
          the code.
        </p>

        {/* Prices in the hero rather than four sections down. The entry price is what
            makes a small business willing to have the conversation at all, and burying it
            below the comparison made the page read as "enquire for pricing". */}
        <p className="t-label mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-primary">
          <span>
            Websites from <span className="font-bold text-accent-ink">₹9,999</span>
          </span>
          <span aria-hidden className="text-border">·</span>
          <span>
            AI automation from <span className="font-bold text-accent-ink">₹19,999</span>
          </span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={TIDYCAL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="book_call"
            data-track-label="hero"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_12px_rgba(0,216,144,0.25)] transition-all hover:shadow-[0_6px_18px_rgba(0,216,144,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <CalendarBlank weight="bold" aria-hidden className="h-4 w-4" />
            Book a free 30-min call
          </a>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-6 text-[15px] font-medium text-primary transition-colors hover:bg-surface-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            See what we build
            <ArrowRight weight="bold" aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {MICRO.map((item) => (
            <li key={item.text} className="flex items-center gap-2 text-muted-foreground">
              <item.icon weight="fill" aria-hidden className="h-4 w-4 shrink-0 text-accent-ink" />
              <span className="t-body-sm">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <AgentDemo />
    </div>
  </section>
);

export default Hero;
