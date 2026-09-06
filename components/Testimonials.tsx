import Link from "next/link";

/**
 * ONE real, verifiable testimonial (LeadzGalaxy / Amit Menon — see /case-studies).
 * Placeholder testimonials were removed; add new ones here only with real attribution
 * (name + business + permission, ideally a photo or link).
 *
 * "What one client said", not "What Our Clients Say": there is one, and a plural heading
 * over a single quote is the small lie that makes a reader start checking the others. No
 * star rating either — nobody left one, so drawing five gold stars was rendering a score
 * that does not exist.
 *
 * On ink, at h2 scale. A quote this good deserves to be the second-loudest thing on the
 * page after the price.
 */
const Testimonials = () => (
  <section className="bg-ink py-20 text-ink-foreground lg:py-28">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <figure className="max-w-[34ch] lg:max-w-[30ch] xl:max-w-[34ch]">
        <blockquote className="t-h2 text-white">
          &ldquo;We&rsquo;ve been able to 10x our business because we can now focus on
          closing deals instead of collecting data.&rdquo;
        </blockquote>

        <figcaption className="t-body mt-8 text-white/62">
          <span className="font-medium text-white">Amit Menon</span>, founder of
          LeadzGalaxy.com.{" "}
          <Link
            href="/case-studies"
            className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
          >
            Read the case study
          </Link>
          .
        </figcaption>
      </figure>
    </div>
  </section>
);

export default Testimonials;
