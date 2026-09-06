import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/**
 * ONE real, verifiable testimonial (LeadzGalaxy / Amit Menon — see /case-studies).
 * Placeholder testimonials were removed; add new ones here only with real attribution
 * (name + business + permission, ideally a photo or link).
 *
 * The heading says "one client" rather than "What Our Clients Say", because there is one
 * and a plural heading over a single quote is the small lie that makes a reader start
 * checking the others. The five gold stars are gone for the same reason: nobody left a
 * rating, so the stars were a rendering of a review score that does not exist.
 */
const Testimonials = () => (
  <section className="border-y border-border bg-muted/40 py-16 md:py-24">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <figure className="reveal max-w-3xl">
        <p className="ledger-label">What one client said</p>

        <blockquote className="display mt-6 text-[1.5rem] leading-[1.35] text-foreground md:text-[2rem]">
          &ldquo;This platform completely transformed our lead generation process. What
          used to take our team hours of manual work now happens automatically in minutes.
          We&rsquo;ve been able to 10x our business because we can now focus on closing
          deals instead of collecting data.&rdquo;
        </blockquote>

        <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-rule-strong/25 pt-5">
          <div>
            <p className="text-[15px] font-semibold text-foreground">Amit Menon</p>
            <p className="text-[15px] text-muted-foreground">Founder, LeadzGalaxy.com</p>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Read the case study
            <ArrowRight
              weight="bold"
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default Testimonials;
