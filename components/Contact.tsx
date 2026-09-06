import Link from "next/link";
import { TIDYCAL } from "@/data/homepage";

/**
 * The closing CTA, on marigold — the only full field of the accent colour on the site, and
 * the last thing on the page before the footer.
 *
 * A server component; it was "use client" only for a window.open on a button that should
 * always have been an anchor. Three contact tiles with circular icon chips become three
 * plain links, because that was a lot of apparatus around an email address and a phone
 * number.
 */
const CHANNELS = [
  { label: "Email", value: "support@cybiqon.in", href: "mailto:support@cybiqon.in", external: false, track: null },
  { label: "WhatsApp or call", value: "+91 92507 11473", href: "https://wa.me/919250711473", external: true, track: "whatsapp_click" },
  { label: "Everything else", value: "Contact page", href: "/contact", external: false, track: null },
];

const Contact = () => (
  <section id="contact" className="bg-accent py-20 text-accent-foreground lg:py-28">
    <div className="mx-auto max-w-[82rem] px-6 md:px-10 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="t-h2 max-w-[16ch] text-ink">Book a free call.</h2>
          <p className="t-body mt-5 max-w-[46ch] text-ink/72">
            Thirty minutes, no commitment. You leave with an exact quote and a timeline — or
            with the honest answer that we are not the right fit for what you need.
          </p>
          <a
            href={TIDYCAL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="book_call"
            data-track-label="footer_cta"
            className="mt-9 inline-flex h-12 items-center justify-center rounded-md bg-ink px-8 text-[15px] font-semibold text-white transition-colors hover:bg-ink-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
          >
            Book a free call
          </a>
        </div>

        <ul className="lg:pt-2">
          {CHANNELS.map((channel) => {
            const inner = (
              <>
                <span className="t-body text-ink/70">{channel.label}</span>
                <span className="t-body font-medium text-ink">{channel.value}</span>
              </>
            );
            const cls =
              "flex flex-col gap-0.5 border-b border-ink/15 py-4 transition-colors hover:border-ink/40 md:flex-row md:items-baseline md:justify-between";
            return (
              <li key={channel.label}>
                {channel.external ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={channel.track ?? undefined}
                    data-track-label="homepage_contact"
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={channel.href} className={cls}>
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
