import { CalendarBlank, Check, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { TIDYCAL } from "@/data/homepage";

/**
 * The comp's closing CTA: navy field, pill badge, two buttons, a row of reassurances.
 *
 * The comp's badge read "Limited Monthly Onboarding Slots", which is scarcity marketing
 * against a slot counter (data/launch5.ts) that holds a real zero. The badge here states
 * the actual commitment instead.
 */
const REASSURANCES = [
  "No credit card needed",
  "No pushy sales pitch",
  "You talk to the founders",
  "A quote within 24 hours",
];

const Contact = () => (
  <section id="contact" className="relative overflow-hidden bg-primary py-16 text-primary-foreground lg:py-24">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
    />

    <div className="relative mx-auto max-w-[1240px] px-4 text-center sm:px-6 lg:px-8">
      <p className="t-label-sm inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        Free, and there is nothing to sign
      </p>

      <h2 className="t-display mx-auto mt-5 max-w-[20ch] text-white">
        Ready to get your business online?
      </h2>

      <p className="t-body-lg mx-auto mt-4 max-w-[58ch] text-white/70">
        Thirty minutes on a call and you leave with an exact quote and a timeline — or with
        the honest answer that we are not the right fit for what you need.
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={TIDYCAL}
          target="_blank"
          rel="noopener noreferrer"
          data-track="book_call"
          data-track-label="footer_cta"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-[0_4px_14px_rgba(0,216,144,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(0,216,144,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:w-auto"
        >
          <CalendarBlank weight="bold" aria-hidden className="h-4 w-4" />
          Book a free 30-min call
        </a>
        <a
          href="https://wa.me/919250711473"
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-track-label="footer_cta"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/25 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:w-auto"
        >
          <WhatsappLogo weight="fill" aria-hidden className="h-4.5 w-4.5" />
          WhatsApp +91 92507 11473
        </a>
      </div>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {REASSURANCES.map((item) => (
          <li key={item} className="t-body-sm flex items-center gap-1.5 text-white/70">
            <Check weight="bold" aria-hidden className="h-3.5 w-3.5 text-secondary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
