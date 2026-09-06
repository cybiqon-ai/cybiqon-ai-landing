import { Phone } from "@phosphor-icons/react/dist/ssr";

/**
 * The navy strip above the navbar, from the Stitch comp.
 *
 * The comp's version read "Special MSME Growth Package … live in 2 weeks". The offer that
 * actually exists is Launch-5 on /free-website — a complete site, free, in seven days, in
 * exchange for four written give-backs — so that is what this points at. Its slot counter
 * is a real zero (data/launch5.ts) and is deliberately not shown here.
 */
const AnnouncementBar = () => (
  <div className="bg-primary px-4 py-1.5 text-primary-foreground">
    <div className="mx-auto flex max-w-[1240px] items-center justify-center gap-2 text-center">
      <span className="inline-flex h-2 w-2 shrink-0 animate-pulse rounded-full bg-accent" />
      <p className="t-label-sm">
        <span className="hidden sm:inline">
          Websites from ₹9,999 with a 24/7 WhatsApp bot · you own 100% of the code ·{" "}
        </span>
        <a
          href="tel:+919250711473"
          data-track="phone_click"
          data-track-label="announcement"
          className="inline-flex items-center gap-1 font-bold underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
        >
          <Phone weight="fill" aria-hidden className="h-3 w-3" />
          +91 92507 11473
        </a>
      </p>
    </div>
  </div>
);

export default AnnouncementBar;
