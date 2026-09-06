/**
 * Homepage content.
 *
 * content-data.md records that every marketing page's content is "a const array welded
 * into the component that renders it", and lists the homepage arrays by name. This is
 * that extraction for the sections the redesign touches.
 *
 * No Tailwind class names in here. data/** is in the Tailwind content globs so a class
 * stored here would survive the purge, but data/products.ts holds the line deliberately —
 * presentation belongs to the component, and a class in a data file is a class nobody
 * grep-finds when they restyle.
 */

/** The booking link. Repeated in Hero, Contact and Navbar, so it lives once. */
export const TIDYCAL = "https://tidycal.com/itspyguru/cybiqon-30-minute-meeting";

export type Problem = {
  pain: string;
  solution: string;
};

/**
 * The fourth pair used to promise "Real-time dashboard with actual numbers", which was
 * written to justify the fake analytics panel that sat in the hero until 6 Sep 2026.
 * There is no dashboard product — /pricing lists websites, apps, automation, scraping and
 * extensions. What the ₹9,999 tier actually includes is "Google Analytics setup", so that
 * is what it now says.
 */
export const PROBLEMS: Problem[] = [
  {
    pain: "Losing customers to competitors who show up on Google",
    solution: "A site that gets found, live in 2–3 weeks",
  },
  {
    pain: "Three hours a day answering the same WhatsApp questions",
    solution: "AI answers them 24/7, in Hindi or English",
  },
  {
    pain: "Quoted ₹50,000+ for a basic brochure website",
    solution: "The same thing, properly built, from ₹9,999",
  },
  {
    pain: "No idea whether any of your marketing is working",
    solution: "Google Analytics set up and explained on handover",
  },
];

export type Service = {
  title: string;
  description: string;
  /** One-time, from. Verified against app/pricing/PricingClient.tsx. */
  price: string;
};

export const SERVICES: Service[] = [
  {
    title: "Website development",
    description:
      "Mobile-first sites built for Indian shoppers — responsive, WhatsApp-connected, and indexed by Google. Delivered in 2–3 weeks.",
    price: "₹9,999",
  },
  {
    title: "Android app development",
    description:
      "Inventory, customer ordering, field-staff tracking. Play Store–ready builds with post-launch support.",
    price: "₹29,999",
  },
  {
    title: "AI automation",
    description:
      "WhatsApp bots, customer support and follow-ups that run without you. Lead capture into a sheet you already read.",
    price: "₹19,999",
  },
  {
    title: "Chrome extensions",
    description:
      "Browser tools for a sales team — auto-fill GST portals, build quotes faster, pull data off a page as you work.",
    price: "₹14,999",
  },
  {
    title: "Bulk scraping",
    description:
      "Competitor prices, supplier catalogues and leads out of JustDial and IndiaMART, delivered as Excel you can use the same day.",
    price: "₹11,999",
  },
];

export type Step = {
  title: string;
  description: string;
};

export const STEPS: Step[] = [
  {
    title: "Book a free call",
    description: "Thirty minutes. Tell us the business and what it needs to do online.",
  },
  {
    title: "We plan and build",
    description: "You see it at every stage. No month of silence ending in a surprise.",
  },
  {
    title: "Review and launch",
    description: "Test the whole thing on a staging site, then go live when you're happy.",
  },
  {
    title: "Ongoing support",
    description: "Updates, fixes and advice. Maintenance from ₹2,999/month if you want it.",
  },
];

export type Differentiator = {
  /** The short form. A real figure where there is one, a word where there isn't. */
  value: string;
  title: string;
  description: string;
};

/**
 * These six replace three sections that said the same things to each other.
 *
 * Before this, "you own the code" appeared in the hero, in TrustBar, in WhyChooseUs and
 * again in the Stats band — four times on one page. "24-hour response" appeared twice.
 * Meanwhile TrustBar's "Founded by MSMEs, for MSMEs" and WhyChooseUs's "AI-Powered
 * Automation" were, respectively, unfalsifiable and a restatement of a service already
 * listed above with a price on it.
 *
 * Every claim below is a promise the company can keep on its own, which is the only kind
 * available while the client count is what it is. None of them is a count of customers.
 */
export const DIFFERENTIATORS: Differentiator[] = [
  {
    value: "Two",
    title: "You get the founders",
    description:
      "You work with Muskan and Prajjwal directly — not an intern, not an account manager. The people on the call are the people building it.",
  },
  {
    value: "100%",
    title: "You own everything",
    description:
      "Code, files, credentials, domain. No vendor lock-in and nothing held hostage. You can walk away and take the whole thing with you.",
  },
  {
    value: "₹0",
    title: "Hidden fees",
    description:
      "Every price is published on this page and on /pricing. One-time, not a retainer. Hosting and domain are paid directly to the provider, so we never mark them up.",
  },
  {
    value: "24 hr",
    title: "Answered on WhatsApp",
    description:
      "Reach us where you already are. Quick questions, status updates, feedback — answered within a day, in Hindi or English.",
  },
  {
    value: "2–3 wk",
    title: "Built to be found",
    description:
      "Fast, mobile-first and SEO-ready, because most of your customers will arrive from a phone and a Google search. Analytics set up before handover.",
  },
  {
    value: "Full",
    title: "Refund if we miss",
    description:
      "Free revisions while we build. If we cannot deliver what we promised, you get your money back — that is the whole guarantee, in one sentence.",
  },
];
