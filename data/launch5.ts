/**
 * The Launch-5 offer, as data.
 *
 * Five free websites traded for four proof assets each. The full reasoning lives in the
 * company knowledge bundle at cybiqon-hq `.okf/company/launch-5-offer.md` — this file is
 * only the copy the page renders, kept separate so the page component stays layout.
 */

/** WhatsApp is the channel this offer actually runs on. Email is the fallback. */
export const WHATSAPP_NUMBER = "919250711473";
export const WHATSAPP_DISPLAY = "+91 92507 11473";

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const TOTAL_SLOTS = 5;

/**
 * Slots taken, as a build-time constant.
 *
 * NOT a D1 query, and the reasoning is worth keeping. A live count would force
 * `runtime = "edge"` on the page, add a round-trip to every view, and tie TTFB to D1 —
 * to display a number that changes five times in the entire life of the offer. Worse,
 * the fail-soft path would render "0 slots left" on a database blip and kill the exact
 * conversion the page exists for.
 *
 * If this ever does become a query it must return `null` on failure and the caller must
 * omit the line entirely rather than print a zero, and it must count `status =
 * 'accepted'` — an application is not a slot.
 *
 * Keep this honest. The homepage carried a fabricated live counter for months; a real
 * zero is worth more than an invented four.
 */
export const SLOTS_TAKEN = 0;
export const SLOTS_LEFT = TOTAL_SLOTS - SLOTS_TAKEN;

/** The two halves of the trade. Rendered side by side — the exchange IS the hero. */
export const YOU_RECEIVE = [
  "A 4–5 page website — home, services, work, about, contact",
  "Live in 7 days, on your own domain",
  "WhatsApp button, Google Maps and Google Business set up, not just linked",
  "Built to be found: fast, mobile-first, proper search markup",
  "Hosting configured and running before handover",
];

export const YOU_GIVE = [
  "A 60-second video saying what you got and whether it worked",
  "A Google review of Cybiqon",
  "Permission to use your business name and logo",
  "Your before/after numbers, for a written case study",
];

/** Qualifying in and out. Saying who this is not for is what makes the rest credible. */
export const GOOD_FIT = [
  "You run a real business with real customers",
  "You have no website, or one you would rather not send anyone",
  "You can spare 30 minutes for questions, photos and details",
  "You are willing to be on camera for one minute at the end",
];

export const BAD_FIT = [
  "You need an online store, bookings or payments — that is paid work, see /pricing",
  "You need it live this week",
  "You would rather not leave a review or appear in a case study",
];

/** What happens after the form. Numbered because it genuinely is a sequence. */
export const STEPS = [
  { label: "You apply", detail: "The form below. Five minutes, no obligation." },
  { label: "I reply on WhatsApp", detail: "Within 24 hours, either way. A no is still an answer." },
  { label: "A 20-minute call", detail: "What the business does, who it sells to, what the site has to achieve." },
  { label: "We put the trade in writing", detail: "Both halves, agreed before any work starts. No surprises at handover." },
  { label: "I build it", detail: "Seven days. You see it before it goes live." },
  { label: "Handover", detail: "You get the site and the logins. I get the four things above." },
];

export const FAQS = [
  {
    q: "What is the catch?",
    a: "There isn't a hidden one — the catch is printed above. I am a new company with no public client work, and no amount of marketing fixes that. Five real businesses with real results are worth more to me than five small invoices. After the fifth, this closes.",
  },
  {
    q: "Do I really pay nothing?",
    a: "Nothing to me. You will need your own domain, which is roughly ₹700–1,000 a year paid directly to the registrar, and you keep ownership of it. I will not put a domain in my name.",
  },
  {
    q: "What happens after the site is live?",
    a: "It is yours. If you want me to keep it updated, hosted and adding content, that is ₹2,000–5,000 a month — offered once, at handover, and a no costs you nothing. If you would rather take the files and go elsewhere, you can.",
  },
  {
    q: "Why should I trust someone with no clients yet?",
    // Kept exact on purpose: two products are live and one is in testing (see
    // data/products.ts). "Three published products" was the first draft and it was
    // wrong. On a page whose entire argument is that the terms are honest, a rounded-up
    // number is the most expensive kind of mistake.
    a: "Reasonable question. Look at what is already built and running: two apps published on the Play Store, a third in testing, and this site — all at /products. Then look at the deal itself. You are risking a domain fee and an hour of your time.",
  },
];
