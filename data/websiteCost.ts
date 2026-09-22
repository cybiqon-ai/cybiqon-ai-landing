/**
 * The numbers behind /tools/website-cost-calculator, and the arithmetic that uses them.
 *
 * **Every default here has a source in SOURCES, read on CHECKED_ON.** The calculator is
 * the kind of page other sites quote, so a figure that cannot be traced is worse than no
 * figure. When a price changes, change it here, bump CHECKED_ON, and nothing else moves:
 * the page, the table, the chart and the FAQ all read from this file.
 *
 * Deliberately absent:
 *
 * - **Wix.** Wix's own plans page served US-dollar prices to an Indian connection on
 *   22 Sep 2026, and the rupee figures in third-party guides disagree with each other
 *   (₹199–1,599, ₹250–900 a month). No row until there is a first-party rupee price.
 *   The "your own option" row lets anyone add it with the price their checkout shows.
 * - **Cybiqon.** We sell custom websites, so a Cybiqon row in a "neutral" comparison
 *   would make the whole table an advert. The page shows our price separately.
 * - **Payment gateway fees.** Razorpay and friends charge the same whichever way the
 *   store is built, so they change no comparison. Shopify's own extra percentage on a
 *   third-party gateway does, and is included.
 *
 * Pure module — no React, no DOM — so the arithmetic can be checked on its own.
 */

export const CHECKED_ON = "22 September 2026";

export type SiteType = "business" | "store";
export type Maintenance = "none" | "low" | "high";
export type Years = 1 | 3 | 5;

export type SourceId =
  | "hostinger"
  | "hostingerDomain"
  | "shopify"
  | "wpRocket"
  | "elementor"
  | "amc"
  | "fx"
  | "quotes";

export const SOURCES: Record<SourceId, { label: string; publisher: string; url: string; note: string }> = {
  hostinger: {
    label: "Web hosting plans",
    publisher: "Hostinger India",
    url: "https://www.hostinger.com/in/web-hosting",
    note: "Premium renews at ₹449/month (Single ₹289, Cloud Startup ₹1,599). The promotional rates need 48 months paid upfront. “Prices are listed without GST.”",
  },
  hostingerDomain: {
    label: "Domain name prices",
    publisher: "Hostinger India",
    url: "https://www.hostinger.com/in/domain-name-search",
    note: ".in is ₹1 for the first year, then ₹899 a year.",
  },
  shopify: {
    label: "Pricing",
    publisher: "Shopify India",
    url: "https://www.shopify.com/in/pricing",
    note: "Basic is ₹1,499/month billed yearly. On a third-party payment provider, which every Indian store uses, Shopify adds 2% of each sale on Basic.",
  },
  wpRocket: {
    label: "Pricing",
    publisher: "WP Rocket",
    url: "https://wp-rocket.me/pricing/",
    note: "Single site, $59.95 a year at list price. A first-year discount was running when checked; the list price is what a renewal costs.",
  },
  elementor: {
    label: "Elementor pricing",
    publisher: "CostBench (updated 21 Jul 2026)",
    url: "https://costbench.com/software/no-code/elementor/",
    note: "Elementor Pro Essential, one site, $59 a year. Elementor's own page loads its prices in a way we could not read, so this is a second-hand figure.",
  },
  amc: {
    label: "Website AMC packages in India (2026)",
    publisher: "Redpulse Software",
    url: "https://redpulsesoftware.in/blog/website-amc-packages-india-2026",
    note: "Typical annual maintenance: ₹24,000–60,000 for a business site with a CMS, ₹84,000–1,80,000+ for e-commerce. Redpulse sells AMCs, so read these as market-indicative.",
  },
  fx: {
    label: "USD to INR reference rate",
    publisher: "European Central Bank, via Frankfurter",
    url: "https://api.frankfurter.dev/v1/latest?from=USD&to=INR",
    note: "₹95.82 per US dollar on 21 Sep 2026. Licences billed in dollars move with it.",
  },
  quotes: {
    label: "Website cost for small business in India: 3 quotes, decoded",
    publisher: "Cybiqon",
    url: "/blog/website-cost-for-small-business-india",
    note: "Where the example quotes come from: ₹12,000 from a freelancer, ₹45,000 from a local agency, ₹1,50,000 for a custom build.",
  },
};

export type Assumptions = {
  hostingPerMonth: number;
  domainPerYear: number;
  usdInr: number;
  shopifyBasicPerMonth: number;
  shopifyFeePct: number;
  gstPct: number;
};

export const DEFAULT_ASSUMPTIONS: Assumptions = {
  hostingPerMonth: 449,
  domainPerYear: 899,
  usdInr: 95.82,
  shopifyBasicPerMonth: 1499,
  shopifyFeePct: 2,
  gstPct: 18,
};

/** Annual maintenance contract, by site type: the low and high end of the typical band. */
export const AMC_BAND: Record<SiteType, { low: number; high: number }> = {
  business: { low: 24000, high: 60000 },
  store: { low: 84000, high: 180000 },
};

const ELEMENTOR_USD = 59;
const WP_ROCKET_USD = 59.95;

type Kind = "selfHosted" | "shopify" | "own";

export type OptionDef = {
  id: string;
  label: string;
  blurb: string;
  kind: Kind;
  defaultBuild: number;
  /** Dollar-billed licences that start renewing in year 2. */
  licencesUsd: number;
  /** What happens to the site if you stop paying anyone. */
  ifYouStop: string;
  sources: SourceId[];
};

const THEME_STOP =
  "Keeps running while the hosting is paid. Make sure the hosting login and the domain are in your name.";

export const OPTIONS: Record<SiteType, OptionDef[]> = {
  business: [
    {
      id: "theme",
      label: "WordPress theme site",
      blurb: "A freelancer installs a bought theme and adds your content.",
      kind: "selfHosted",
      defaultBuild: 12000,
      licencesUsd: 0,
      ifYouStop: THEME_STOP,
      sources: ["quotes", "hostinger", "hostingerDomain", "amc"],
    },
    {
      id: "builder",
      label: "WordPress with a page builder",
      blurb: "An agency's “custom design”: a premium theme plus Elementor Pro and a caching plugin.",
      kind: "selfHosted",
      defaultBuild: 45000,
      licencesUsd: ELEMENTOR_USD + WP_ROCKET_USD,
      ifYouStop:
        "Keeps running, but the page builder stops updating when its licence lapses. Ask whose account the licences are in.",
      sources: ["quotes", "hostinger", "hostingerDomain", "elementor", "wpRocket", "fx", "amc"],
    },
    {
      id: "custom",
      label: "Custom-coded site",
      blurb: "Written from scratch for your business, with no theme or builder licences.",
      kind: "selfHosted",
      defaultBuild: 150000,
      licencesUsd: 0,
      ifYouStop:
        "Keeps running while the hosting is paid. You own it only if the contract hands over the code.",
      sources: ["quotes", "hostinger", "hostingerDomain", "amc"],
    },
  ],
  store: [
    {
      id: "woo",
      label: "WooCommerce store",
      blurb: "WordPress with the WooCommerce plugin, set up by a freelancer or small agency.",
      kind: "selfHosted",
      defaultBuild: 40000,
      licencesUsd: 0,
      ifYouStop: THEME_STOP,
      sources: ["hostinger", "hostingerDomain", "amc"],
    },
    {
      id: "shopify",
      label: "Shopify, Basic plan",
      blurb: "You, or someone you pay, set up a store on Shopify. Enter setup fees as the build price.",
      kind: "shopify",
      defaultBuild: 0,
      licencesUsd: 0,
      ifYouStop: "The store goes offline, and it cannot be moved to other hosting.",
      sources: ["shopify", "hostingerDomain"],
    },
    {
      id: "customStore",
      label: "Custom-coded store",
      blurb: "Written from scratch, with checkout, catalogue and admin built for your business.",
      kind: "selfHosted",
      defaultBuild: 150000,
      licencesUsd: 0,
      ifYouStop:
        "Keeps running while the hosting is paid. You own it only if the contract hands over the code.",
      sources: ["hostinger", "hostingerDomain", "amc"],
    },
  ],
};

export const OWN_OPTION_ID = "own";

export type Inputs = {
  siteType: SiteType;
  years: Years;
  maintenance: Maintenance;
  addGst: boolean;
  /** Store only: expected online sales a month, for Shopify's percentage. */
  monthlySales: number;
  /** Build price per option id; missing means the option's default. */
  builds: Record<string, number>;
  /** The "your own option" row, if the visitor added one. */
  own: { label: string; build: number; perYear: number } | null;
  assumptions: Assumptions;
};

export type Line = { label: string; amount: number };

export type Result = {
  id: string;
  label: string;
  ifYouStop: string;
  build: number;
  yearOne: number;
  /** What a typical year after the first costs. Equal to yearOne for a one-year view. */
  laterYear: number;
  total: number;
  /** Everything except the build price, over the whole period. */
  running: number;
  /** One year's recurring lines, as they apply from year 2. */
  laterLines: Line[];
};

const round = (n: number) => Math.round(n);

/**
 * The cost of one option over `years`.
 *
 * Year 1 is the build price. For a self-hosted site that includes the first year's
 * hosting, domain and licences, because that is how the quotes in the source post are
 * priced: promotional hosting and a ₹1 domain inside the quote, and plugin licences on
 * the developer's own agency account. Maintenance also starts in year 2, on the same
 * reasoning — most quotes include some support for the first months — which keeps the
 * comparison conservative rather than inflating year 1.
 *
 * Shopify and the visitor's own option are subscriptions, so they are paid from year 1.
 */
export function costOf(def: OptionDef | "own", inputs: Inputs): Result {
  const a = inputs.assumptions;
  const gst = inputs.addGst ? 1 + a.gstPct / 100 : 1;
  const years = inputs.years;

  if (def === "own") {
    const own = inputs.own!;
    const build = own.build * gst;
    const perYear = own.perYear * gst;
    const laterLines = perYear ? [{ label: "Every-year cost", amount: round(perYear) }] : [];
    return finish({
      id: OWN_OPTION_ID,
      label: own.label.trim() || "Your own option",
      ifYouStop: "Depends on the option. Ask what stops working if a payment is missed.",
      build,
      yearOne: build + perYear,
      laterYear: perYear,
      laterLines,
      years,
    });
  }

  const build = (inputs.builds[def.id] ?? def.defaultBuild) * gst;

  if (def.kind === "shopify") {
    const plan = a.shopifyBasicPerMonth * 12 * gst;
    // Shopify's percentage is a fee on sales, charged per transaction; GST applies to it
    // like any other service Shopify bills.
    const fee = (inputs.monthlySales * 12 * a.shopifyFeePct) / 100 * gst;
    const domain = a.domainPerYear * gst;
    const laterLines: Line[] = [
      { label: "Shopify Basic plan", amount: round(plan) },
      { label: `Shopify's ${a.shopifyFeePct}% on online sales`, amount: round(fee) },
      { label: ".in domain renewal", amount: round(domain) },
    ];
    return finish({
      id: def.id,
      label: def.label,
      ifYouStop: def.ifYouStop,
      build,
      yearOne: build + plan + fee,
      laterYear: plan + fee + domain,
      laterLines,
      years,
    });
  }

  const hosting = a.hostingPerMonth * 12 * gst;
  const domain = a.domainPerYear * gst;
  const licences = def.licencesUsd * a.usdInr * gst;
  const amc =
    inputs.maintenance === "none" ? 0 : AMC_BAND[inputs.siteType][inputs.maintenance] * gst;

  const laterLines: Line[] = [
    { label: "Hosting at renewal price", amount: round(hosting) },
    { label: ".in domain renewal", amount: round(domain) },
  ];
  if (licences) laterLines.push({ label: "Plugin licences, billed in US$", amount: round(licences) });
  if (amc) laterLines.push({ label: "Maintenance contract", amount: round(amc) });

  return finish({
    id: def.id,
    label: def.label,
    ifYouStop: def.ifYouStop,
    build,
    yearOne: build,
    laterYear: hosting + domain + licences + amc,
    laterLines,
    years,
  });
}

function finish(r: Omit<Result, "total" | "running"> & { years: Years }): Result {
  const { years, ...rest } = r;
  const total = rest.yearOne + rest.laterYear * (years - 1);
  return {
    ...rest,
    build: round(rest.build),
    yearOne: round(rest.yearOne),
    laterYear: round(years === 1 ? rest.yearOne : rest.laterYear),
    total: round(total),
    running: round(total - rest.build),
  };
}

export function calculate(inputs: Inputs): Result[] {
  const results = OPTIONS[inputs.siteType].map((def) => costOf(def, inputs));
  if (inputs.own) results.push(costOf("own", inputs));
  return results;
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹1,50,000 — Indian digit grouping, no decimals. */
export const formatInr = (n: number) => `₹${inr.format(Math.round(n))}`;
