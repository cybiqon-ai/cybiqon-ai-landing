/**
 * The service pages.
 *
 * Why these exist: the homepage was rewritten around custom software and AI agents, which
 * reads better and sells better, but it moved the page away from the explicit keyword
 * coverage the old homepage had — "website development", "android app development", "bulk
 * scraping", "chrome extensions", "WhatsApp automation" were each a literal heading. A
 * homepage should not try to rank for nine terms; these pages carry them instead, and the
 * homepage links down into them.
 *
 * SEVEN, not nine. "AI Automation", "Business Automation" and "AI Agent Development" are
 * one search intent with three names, and three near-identical pages would compete with
 * each other and read as thin — which this repo already refuses to ship (a category with
 * nothing in it 404s rather than become a thin page). They are one page with the
 * alternatives named in its copy and metadata.
 *
 * Every price here is one-time and must agree with app/pricing/PricingClient.tsx and the
 * Offer values in its Product JSON-LD. A price that disagrees with its own structured data
 * is worse than a wrong price.
 */

export type ServiceSection = {
  heading: string;
  body: string;
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  /** Nav and card label. */
  name: string;
  /** The search term this page is for. Used in the h1 and the title. */
  headline: string;
  /** One line, used on the hub card and as the meta description opener. */
  tagline: string;
  /** One-time, from. Null where it is genuinely scoped per project. */
  price: string | null;
  /** Sits under the price on the card. */
  priceNote: string;
  /** The lede under the h1. */
  intro: string;
  /** What the buyer actually receives. */
  deliverables: string[];
  /** Longer prose, two or three sections. */
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  /** Slugs of the two or three most closely related services. */
  related: string[];
  /** Extra terms for the keywords tag. */
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "custom-websites",
    name: "Custom websites",
    headline: "Custom website development for Indian businesses",
    tagline: "Hand-coded, mobile-first sites that load fast and rank.",
    price: "₹9,999",
    priceNote: "Live in 2–3 weeks",
    intro:
      "A website written for your business rather than a theme with your logo dropped into it. Mobile-first, fast on a mid-range phone, indexed by Google, and yours completely on the day it ships.",
    deliverables: [
      "A design built around what your business actually sells, not a template layout",
      "Mobile-first pages that stay fast on a mid-range Android phone and a 4G connection",
      "Contact forms and WhatsApp click-to-chat wired to where you already read messages",
      "On-page SEO, structured data and a sitemap, so search engines can read the site",
      "Google Analytics set up and explained on handover, so you can see what happens",
      "One year of fast hosting included, then roughly ₹4,000–6,000 a year paid direct",
      "100% of the source code, the repository, the domain and the server credentials",
    ],
    sections: [
      {
        heading: "Why hand-coded rather than a page builder",
        body: "A builder ships every feature it has ever had to every site it makes, and the weight arrives on your customer's phone. A site written for one business ships only what that business needs, which is most of the difference between a page that loads in a second and one that loads in six. It also means nothing is locked behind a subscription: there is no plan to keep paying to keep the site online.",
      },
      {
        heading: "Built for how Indian customers actually arrive",
        body: "Most of your visitors will land from a Google search on a phone, on a connection that is not fibre. That decides the work — small pages, real image sizing, no blocking scripts, and a WhatsApp button that is where a thumb already is. It is a less glamorous checklist than a homepage animation, and it is what makes the difference to enquiries.",
      },
    ],
    faqs: [
      {
        q: "How long does a website take?",
        a: "Two to three weeks for a standard business site, from the first call to going live. Larger builds with custom functionality are scoped on the call and quoted before anything starts.",
      },
      {
        q: "Do I really own the code?",
        a: "Yes, all of it — repository, server keys, DNS and domain, transferred on handover. There is no lock-in and no clause that keeps anything with us if you leave.",
      },
      {
        q: "What does hosting cost?",
        a: "The first year is included. After that, hosting and domain run roughly ₹4,000–6,000 a year and you pay the provider directly, so we never mark it up.",
      },
    ],
    related: ["admin-panels", "ai-agents", "whatsapp-automation"],
    keywords: [
      "custom website development India",
      "website development for MSMEs",
      "hand coded website India",
      "mobile first website development",
      "SEO optimized website India",
    ],
  },
  {
    slug: "ai-agents",
    name: "AI agents & automation",
    headline: "AI agent development and business automation",
    tagline: "Agents that read, decide and act on your own data.",
    price: "₹19,999",
    priceNote: "Scoped on the first call",
    intro:
      "Not a chatbot bolted onto a website. An agent built around one business's own data and rules — reading an order, checking stock, updating a record, drafting the reply, and stopping where you want a human to look.",
    deliverables: [
      "An agent scoped to one job it can do reliably, rather than a general assistant",
      "Connected to what you already use — email, WhatsApp, Sheets, your database",
      "Rules you can state in plain language, and that we can show you working",
      "A human approval step wherever getting it wrong would cost you money",
      "A log of what it did, so you can check its work rather than trust it",
      "Handover with the code, the prompts and the credentials",
    ],
    sections: [
      {
        heading: "What an agent is good for, and what it isn't",
        body: "Agents are worth building where the work is repetitive, high-volume and follows rules a person could write down — order intake, quote drafting, lead qualification, first-line support, moving data between two systems that do not talk. They are a poor choice where judgement matters and errors are expensive. We will tell you which one you have on the call, including when the answer is that you do not need one.",
      },
      {
        heading: "AI automation and business automation are the same job",
        body: "The terms get used interchangeably and the work underneath is one thing: find the repetitive part, make it happen without a person, and put a check where it matters. Whether that ends up as an LLM agent, a scheduled script or a WhatsApp bot is an implementation detail decided by the problem, not by what sounds impressive.",
      },
    ],
    faqs: [
      {
        q: "Will it make things up?",
        a: "That is what the approval step is for. Anything that costs money or goes to a customer can be held for a human to release, and every action is logged so you can audit what it did rather than take it on trust.",
      },
      {
        q: "Does it work in Hindi?",
        a: "Yes — Hindi, Hinglish and English. Customers write how they write, and the agent answers in the language it was written to.",
      },
      {
        q: "What does it run on?",
        a: "Your own data and your own rules, on infrastructure you control. We hand over the code and the prompts, so nothing about it is a black box you have to keep renting.",
      },
    ],
    related: ["whatsapp-automation", "admin-panels", "web-scraping"],
    keywords: [
      "AI agent development India",
      "AI automation for business",
      "business automation India",
      "custom AI agents",
      "workflow automation India",
    ],
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp automation",
    headline: "WhatsApp automation for Indian businesses",
    tagline: "Answer customers day and night, in the language they write in.",
    price: "₹19,999",
    priceNote: "Part of AI automation",
    intro:
      "WhatsApp is where Indian customers already are, and answering it by hand is where hours go. An assistant that handles the questions you answer twenty times a week, captures the details you need, and hands you the ones worth a real reply.",
    deliverables: [
      "Automatic replies to the questions that repeat — price, stock, delivery, timing",
      "Hindi, Hinglish and English, matched to how the customer wrote",
      "Lead details captured into a sheet or CRM you already read",
      "Catalogues, brochures and price lists sent on request",
      "Handover to a human the moment the conversation needs one",
      "Set up on the official WhatsApp Business platform, not an unofficial workaround",
    ],
    sections: [
      {
        heading: "Where the hours actually go",
        body: "The load is rarely complicated questions. It is the same five, dozens of times a day, arriving at ten at night and on Sundays. Automating those does not remove you from the conversation — it means you arrive at the ones that need you, with the details already collected.",
      },
      {
        heading: "Why the official platform matters",
        body: "Unofficial automation gets numbers banned, usually at the worst moment. We build on the official WhatsApp Business platform so the number you have given customers for years stays the number that works.",
      },
    ],
    faqs: [
      {
        q: "Will my number get banned?",
        a: "Not on the official platform, which is what we build on. Unofficial libraries that drive the normal app are what get numbers blocked, and we do not use them.",
      },
      {
        q: "Can it take orders?",
        a: "It can collect everything an order needs and write it where you will see it. Whether it confirms the order itself or holds it for you is your call, and most businesses start with the second.",
      },
    ],
    related: ["ai-agents", "custom-websites", "admin-panels"],
    keywords: [
      "WhatsApp automation India",
      "WhatsApp bot for business",
      "WhatsApp Business API India",
      "WhatsApp chatbot MSME",
    ],
  },
  {
    slug: "android-apps",
    name: "Android apps",
    headline: "Android app development for Indian businesses",
    tagline: "Play Store–ready apps, built and shipped by people who have shipped.",
    price: "₹29,999",
    priceNote: "Scoped per build",
    intro:
      "Customer apps, ordering apps and internal tools for staff in the field. We have six of our own on the Play Store, which means the release process, the policies and the review queue are familiar rather than a first attempt on your budget.",
    deliverables: [
      "A build ready for the Play Store, including the listing assets it demands",
      "The privacy policy and data-safety declarations Google requires",
      "A backend sized to the job rather than to a diagram",
      "Offline behaviour that makes sense for patchy connections",
      "Post-launch support through the first releases",
      "Source code, signing keys and the Play Console entry, all yours",
    ],
    sections: [
      {
        heading: "We ship our own, so the process is not theoretical",
        body: "LLMBytes, MeFlow, Lumina, Orbitone and others are ours, on the Play Store, under our own name — same standard, no client to blame. That is the honest reason to trust the timeline: the store's requirements, its review turnaround and the things that get a release rejected are things we have already been through at our own cost.",
      },
      {
        heading: "Most businesses need less app than they think",
        body: "A great deal of what gets described as needing an app is a website that works well on a phone, and it costs a fraction as much. We will say so on the call. Where an app genuinely earns itself is offline use, hardware access, staff tools and anything a customer opens repeatedly.",
      },
    ],
    faqs: [
      {
        q: "iOS as well?",
        a: "Android first, because that is where the customers of most Indian small businesses are. Say so on the call if iOS matters and we will scope it honestly rather than promise both by default.",
      },
      {
        q: "Who owns the Play Console listing?",
        a: "You do. It is published under your account where possible, and transferred to you where it is not, along with the signing keys.",
      },
    ],
    related: ["admin-panels", "custom-websites", "ai-agents"],
    keywords: [
      "android app development India",
      "custom android app for business",
      "Play Store app development India",
      "business app development MSME",
    ],
  },
  {
    slug: "admin-panels",
    name: "Admin panels & internal tools",
    headline: "Custom admin panels and internal software",
    tagline: "The system your business already runs on, built properly.",
    price: "₹29,999",
    priceNote: "Scoped per build",
    intro:
      "Dealer portals, order desks, inventory, staff tools — the software a business runs on once a spreadsheet stops coping. Built around how the work already happens rather than around how a product decided it should.",
    deliverables: [
      "A panel shaped to your process, not a generic CRM you have to bend to",
      "Roles and permissions, so people see what they should and no more",
      "Import from the spreadsheets you already keep, rather than starting empty",
      "Reports that answer the questions you actually ask each month",
      "Hosted on infrastructure sized for the load, with the running cost stated",
      "Documented handover — code, database, credentials and how to change it",
    ],
    sections: [
      {
        heading: "The spreadsheet is not the problem",
        body: "A sheet that has grown for six years is usually an accurate description of the business, and it is the best possible starting document. The problem is that only one person can safely touch it, nothing is validated, and every report is rebuilt by hand. That is what a panel fixes, and it is why we read your sheet before writing anything.",
      },
      {
        heading: "Built to be handed over",
        body: "Snackly's admin panel covers all nine sections its owner asked for and sits behind Cloudflare Access, with the API tested against a real database rather than a mock. That is the standard: something a different developer could pick up, because if we are the only people who can maintain it, you do not really own it.",
      },
    ],
    faqs: [
      {
        q: "Can it replace our spreadsheets?",
        a: "Usually, and it should import them rather than ask anyone to retype years of records. What we do not do is force a process change you did not ask for.",
      },
      {
        q: "What does it cost to run?",
        a: "We state the monthly running cost before building, and we choose infrastructure to keep it small. Snackly's runs inside Cloudflare's free tier, so the business carries no hosting bill at all.",
      },
    ],
    related: ["ai-agents", "android-apps", "custom-websites"],
    keywords: [
      "custom admin panel development",
      "internal software development India",
      "dealer portal development",
      "inventory management software India",
      "custom CRM India",
    ],
  },
  {
    slug: "chrome-extensions",
    name: "Chrome extensions",
    headline: "Chrome extension development",
    tagline: "Browser tools that remove the copying and pasting.",
    price: "₹6,999",
    priceNote: "One-time",
    intro:
      "A small tool that lives in the browser where your team already works — filling portals, pulling data off a page, building quotes without switching tabs twice a minute.",
    deliverables: [
      "Auto-fill for the portals your team retypes the same details into",
      "Data extraction from pages your work depends on, into CSV or a sheet",
      "Packaged for your team, or published to the Chrome Web Store if you prefer",
      "Permissions kept to the minimum the tool needs to do its job",
      "Source code and the store listing, yours",
    ],
    sections: [
      {
        heading: "Small tools, disproportionate returns",
        body: "An extension is the cheapest thing on this page and often the one that saves the most hours, because it removes a task somebody does forty times a day rather than one they do monthly. The work is usually a week, and the payback is usually obvious inside a month.",
      },
    ],
    faqs: [
      {
        q: "Does it have to be on the Chrome Web Store?",
        a: "No. Internal tools can be installed directly across your team, which avoids review entirely. We publish where you want reach and keep it private where you do not.",
      },
    ],
    related: ["web-scraping", "admin-panels", "ai-agents"],
    keywords: [
      "chrome extension development India",
      "custom browser extension",
      "GST portal automation",
      "browser automation tool India",
    ],
  },
  {
    slug: "web-scraping",
    name: "Web scraping & data",
    headline: "Web scraping and data extraction",
    tagline: "Competitor prices, supplier catalogues and leads, as clean data.",
    price: "₹11,999",
    priceNote: "Per pipeline",
    intro:
      "Directories, marketplaces and competitor sites turned into a spreadsheet you can act on the same day — and, where it is worth it, a pipeline that refreshes itself instead of being a one-off export.",
    deliverables: [
      "Extraction from JustDial, IndiaMART and the sources your market lives on",
      "Competitor price tracking, on a schedule, with the changes flagged",
      "Clean Excel, CSV or an API endpoint — deduplicated and validated",
      "Re-runnable pipelines rather than a single dump that ages out",
      "Rate limiting and retry handling, so a run does not fail silently",
    ],
    sections: [
      {
        heading: "The value is in the cleaning, not the fetching",
        body: "Pulling a page is the easy part. What makes data usable is resolving the same company appearing three ways, removing the duplicates that resolution creates, and validating what is left — which is exactly the pipeline work we do on a live B2B lead-enrichment product.",
      },
      {
        heading: "What we will not do",
        body: "We do not scrape sites whose terms forbid it, we do not touch personal data that has no business being collected, and we will say when a source is not worth the fragility. A pipeline that breaks the first time a site changes its markup is not a saving.",
      },
    ],
    faqs: [
      {
        q: "Is this legal?",
        a: "Public data, collected in line with a site's terms and at a rate that does not burden it, is ordinary practice. We check the terms of each source before quoting and decline the ones that forbid it.",
      },
      {
        q: "Can it run on a schedule?",
        a: "Yes. A one-off export is cheaper, but for price tracking a scheduled pipeline is usually what you actually want, and we will say which fits.",
      },
    ],
    related: ["ai-agents", "chrome-extensions", "admin-panels"],
    keywords: [
      "web scraping services India",
      "bulk data extraction India",
      "JustDial IndiaMART scraping",
      "competitor price tracking India",
      "lead generation data India",
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
