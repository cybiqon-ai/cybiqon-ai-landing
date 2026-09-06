import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/ledger/SectionHeading";

/**
 * The closing CTA.
 *
 * A server component now — it was "use client" only for a window.open on the book-a-call
 * button, which is a real anchor here as it is in the hero.
 *
 * Three contact tiles become three ruled rows. The tiles were circular icon chips that
 * scaled on hover, which is a lot of apparatus around an email address and a phone number.
 */

const TIDYCAL = "https://tidycal.com/itspyguru/cybiqon-30-minute-meeting";

const CHANNELS = [
  {
    label: "Email",
    value: "support@cybiqon.in",
    href: "mailto:support@cybiqon.in",
    external: false,
  },
  {
    label: "WhatsApp or call",
    value: "+91 92507 11473",
    href: "https://wa.me/919250711473",
    external: true,
  },
  {
    label: "Everything else",
    value: "Contact page",
    href: "/contact",
    external: false,
  },
];

const Contact = () => (
  <section id="contact" className="py-16 md:py-24">
    <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
      <div className="max-w-3xl">
        <SectionHeading
          label="Next step"
          title="Book a free call"
          lede="Thirty minutes, no commitment. You leave with an exact quote and a timeline — or with the honest answer that we are not the right fit."
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={TIDYCAL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center justify-center gap-2 bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Book a free call
            <ArrowRight
              weight="bold"
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
          <p className="text-[15px] text-muted-foreground">
            Or reach us directly — we answer within 24 hours.
          </p>
        </div>

        {/* Free-website-audit tile — hidden with the other free-audit prompts, not
            deleted. /free-audit still exists and is linked from the footer and sitemap. */}

        {/* A list rather than a <dl>: an anchor is not a valid direct child of <dl>,
            and the label/value pairing is presentational here rather than a real
            term/definition relationship. */}
        <ul className="mt-10 border-t border-rule-strong/25">
          {CHANNELS.map((channel) => {
            const inner = (
              <>
                <span className="ledger-label">{channel.label}</span>
                <span className="text-[15px] font-medium text-foreground transition-colors group-hover:text-primary md:text-base">
                  {channel.value}
                </span>
              </>
            );

            const className =
              "group flex flex-col gap-1 border-b border-border py-4 md:flex-row md:items-baseline md:justify-between";

            return (
              <li key={channel.label}>
                {channel.external ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={channel.href} className={className}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

export default Contact;
