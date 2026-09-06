import Link from "next/link";
import { TIDYCAL } from "@/data/homepage";

/**
 * The hero, and the one place this page raises its voice.
 *
 * The boldness is spent on the price, deliberately and only here. Publishing the number is
 * this company's actual strategic position — the agencies it competes with put a quote form
 * in the way, and "what will this cost me" is the first thing an MSME owner wants to know
 * and the last thing they are usually told.
 *
 * A server component with no entrance animation on the h1: it is the LCP element and it
 * paints on the first frame. An earlier version of this redesign animated it with
 * framer-motion, which server-rendered it at opacity:0 and left the headline waiting on
 * hydration — the wrong trade on the mobile networks this page sells into.
 */
const Hero = () => (
  <section className="relative overflow-hidden bg-background pb-20 pt-32 lg:pb-28 lg:pt-40">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <h1 className="t-h1 max-w-[24ch] text-foreground">
        A website for your business, live in two to three weeks.
      </h1>

      <p className="t-body enter mt-7 max-w-[52ch] text-muted-foreground">
        Built for Indian MSMEs by two people you can actually reach. You own the
        code, the files and the credentials — walk away with all of it whenever you like.
      </p>

      {/* The price and the actions are pushed to opposite ends of the measure and share a
          baseline. Stacked on the left they leave half the page empty and the number reads
          as a caption; spanning the full width makes it a price tag with the call to
          action at the other end of it. */}
      <div className="enter mt-16 flex flex-col gap-10 border-t border-border pt-10 lg:mt-24 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <p className="t-body text-muted-foreground">Websites from</p>
          <p className="t-display mt-2 text-foreground">
            ₹9,999
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end lg:pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={TIDYCAL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="book_call"
              data-track-label="hero"
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-7 text-[15px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Book a free call
            </a>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border px-7 text-[15px] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              See all prices
            </Link>
          </div>
          <p className="max-w-[42ch] text-[15px] text-muted-foreground lg:text-right">
            One-time. Hosting is about ₹4,000–6,000 a year, paid straight to the provider.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
