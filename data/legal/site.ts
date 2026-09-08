import type { LegalDoc } from "@/data/products";

/**
 * The site's own privacy policy and terms, as structured blocks.
 *
 * They were prose welded into JSX in app/privacy/page.tsx and app/terms/page.tsx. Moving
 * them onto the same `Block` union the product legal pages use means they render through
 * components/products/LegalDoc.tsx, which has no `dangerouslySetInnerHTML` anywhere —
 * a property worth more on legally-material copy than anywhere else on the site.
 *
 * ── What was corrected on 7 Sep 2026 ──────────────────────────────────────────────
 *
 * Both documents said "Last updated: January 2025". The LLP was incorporated on
 * 5 March 2026, so both claimed to predate the company by fourteen months.
 *
 * The privacy policy described third-party processors as "trusted third-party services
 * (hosting, email, analytics)" without naming any. They are nameable and are named now:
 * Cloudflare, Resend, Google Analytics and TidyCal.
 *
 * It also did not disclose that **every form on this site stores the submitter's IP
 * address** — app/api/audit, app/api/apply and app/api/subscribe all write one to D1. An
 * IP is personal data under the DPDP Act, and a policy that lists what it collects has to
 * list that.
 *
 * ⚠️ FOR THE FOUNDER — two things here are decisions, not facts, and neither has been
 * reviewed by a lawyer:
 *
 *   1. Jurisdiction is stated as "courts in India", which is what the previous version
 *      said. Contracts normally name a city. Uttar Pradesh is where the LLP is based;
 *      whether that is the right forum is a legal question.
 *   2. The DPDP Act 2023 expects a named grievance contact. support@cybiqon.in is given
 *      as the contact, which is true and reachable, but no individual is appointed as
 *      Grievance Officer. That is a decision to take deliberately.
 */

const UPDATED = "7 September 2026";

export const SITE_PRIVACY: LegalDoc = {
  updated: UPDATED,
  blocks: [
    {
      kind: "prose",
      body: [
        [
          "This policy explains what ",
          { b: "Cybiqon AI Solutions LLP" },
          " (LLPIN ACV-9817, incorporated 5 March 2026 in India) collects when you use ",
          { link: "cybiqon.in", href: "https://cybiqon.in" },
          ", why, and what you can ask us to do about it. It covers this website. Our published apps each carry their own policy, linked from their product page.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "What you give us",
      intro: [
        "Only through a form you fill in yourself. There are three, and none of them is required to read the site:",
      ],
      items: [
        ["The free website audit — your name, email, phone number and the address of the site you want reviewed."],
        ["The Launch-5 application — your name, email and phone number."],
        ["The lab newsletter — your email address, confirmed by a double opt-in, so a subscription cannot be created by someone else typing your address."],
      ],
      note: [
        "Anything you write to us on WhatsApp, by email or on a call is held the same way: to answer you, and for as long as that takes.",
      ],
    },
    {
      kind: "checklist",
      heading: "What is recorded automatically",
      items: [
        [{ b: "Your IP address" }, " is stored with every form submission, as a basic guard against automated abuse."],
        ["Google Analytics records pages viewed, approximate location, device and browser, and which of our buttons were clicked."],
        ["Cloudflare, which serves this site, keeps standard request logs."],
      ],
      note: [
        "You can opt out of Google Analytics with ",
        { link: "Google's browser add-on", href: "https://tools.google.com/dlpage/gaoptout" },
        ". Nothing on this site requires you to accept tracking to read it.",
      ],
    },
    {
      kind: "deflist",
      heading: "Who processes it",
      intro: ["These are every third party your data reaches, and what each one does:"],
      items: [
        { term: "Cloudflare", def: ["Hosting, and the database and object storage behind the forms. Data sits on Cloudflare infrastructure."] },
        { term: "Resend", def: ["Sends the transactional emails — your audit report, an application acknowledgement, a newsletter confirmation."] },
        { term: "Google Analytics", def: ["Website measurement. Configured for the site as a whole, not to build a profile of you."] },
        { term: "TidyCal", def: ["Runs the booking calendar. If you book a call, you give your details to TidyCal directly under their policy."] },
      ],
      note: [
        { b: "We do not sell, rent or trade your information." },
        " We share it only with the processors above, when the law requires it, or if the business is ever transferred — in which case you would be told.",
      ],
    },
    {
      kind: "checklist",
      heading: "What you can ask for",
      intro: ["Write to support@cybiqon.in and we will act on any of these:"],
      items: [
        ["A copy of what we hold about you."],
        ["A correction, if something is wrong."],
        ["Deletion, unless we are required to keep it."],
        ["An end to marketing email. Every newsletter carries a one-click unsubscribe, and using it is enough."],
      ],
      note: [
        "These rights are what the Digital Personal Data Protection Act 2023 provides for in India. We answer within 30 days.",
      ],
    },
    {
      kind: "prose",
      heading: "How long it is kept",
      body: [
        [
          "Form submissions are kept while we might still act on them and are deleted when they are stale. Newsletter subscriptions last until you unsubscribe. Analytics follows Google's own retention. Ask us to delete something sooner and we will.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Children",
      body: [
        [
          "This site is for businesses and is not directed at anyone under 18. We do not knowingly collect data from children. If you believe we have, write to us and it will be removed.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes",
      body: [
        [
          "If this policy changes, the date at the top changes with it. Material changes will be announced on the site rather than made quietly.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions or complaints",
      intro: [
        "Write to us about anything in this policy, including a complaint about how your data has been handled.",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "Cybiqon AI Solutions LLP",
    },
  ],
};

export const SITE_TERMS: LegalDoc = {
  updated: UPDATED,
  blocks: [
    {
      kind: "prose",
      body: [
        [
          "These terms cover work done by ",
          { b: "Cybiqon AI Solutions LLP" },
          " (LLPIN ACV-9817) and your use of ",
          { link: "cybiqon.in", href: "https://cybiqon.in" },
          ". Using the site means accepting them. A signed proposal for a specific project overrides anything here that it contradicts.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "What we do",
      intro: ["Seven services, each with its scope and price published on its own page:"],
      items: [
        ["Custom website development, from ₹9,999"],
        ["AI agents and business automation, from ₹19,999"],
        ["WhatsApp automation, from ₹19,999"],
        ["Android app development, from ₹29,999"],
        ["Custom admin panels and internal software, from ₹29,999"],
        ["Chrome extension development, from ₹6,999"],
        ["Web scraping and data extraction, from ₹11,999"],
      ],
      note: [
        "Prices are one-time and are starting points for a standard scope. Anything larger is quoted before work begins. See ",
        { link: "pricing", href: "/pricing" },
        " for what each includes.",
      ],
    },
    {
      kind: "deflist",
      heading: "Payment",
      items: [
        { term: "Standard projects", def: ["50% before work starts, 50% on delivery, for anything over ₹20,000."] },
        { term: "Hosting and domain", def: ["Not included and never marked up. Roughly ₹4,000–6,000 a year for a website, paid by you to the provider, in your name."] },
        { term: "Maintenance", def: ["Optional, ₹2,999 a month. Declining it does not affect anything you already own."] },
        { term: "Taxes", def: ["GST is charged where applicable and shown on the invoice."] },
      ],
    },
    {
      kind: "checklist",
      heading: "What you own",
      intro: ["On final payment, and without anything held back:"],
      items: [
        ["The complete source code."],
        ["The repository, the server credentials and the DNS records."],
        ["Your domain, registered in your name."],
        ["Any store listing we published on your behalf."],
        ["Everything you gave us — content, logos, images — which was always yours."],
      ],
      note: [
        { b: "There is no vendor lock-in and nothing is retained as leverage." },
        " We keep the right to describe the work and to show it as a portfolio piece, unless you ask us in writing not to.",
      ],
    },
    {
      kind: "checklist",
      heading: "What we need from you",
      intro: ["A project runs to time only if these arrive:"],
      items: [
        ["Content, brand assets and access to anything we have to connect to."],
        ["Decisions and approvals within a reasonable time. This is the single largest cause of a build slipping."],
        ["The right to use whatever you give us. You confirm you own it or are licensed to use it."],
      ],
    },
    {
      kind: "deflist",
      heading: "Revisions, delays and ending the work",
      items: [
        { term: "Revisions", def: ["Included while we build, within the agreed scope. New requirements are quoted separately rather than absorbed silently."] },
        { term: "Delays", def: ["Timelines assume your feedback arrives. If a project stalls on your side for more than 30 days we may pause it and reschedule."] },
        { term: "Ending it", def: ["Either side can stop. You pay for work completed; work completed is not refundable. If we cannot deliver what we promised, you get your money back."] },
      ],
    },
    {
      kind: "prose",
      heading: "What we do not promise",
      body: [
        [
          "We build to a professional standard and test on real devices, but no one can guarantee a search ranking, a traffic figure or a revenue outcome — and anyone who does is guessing. Third-party services we integrate are outside our control. Our liability for any claim is limited to what you paid us for the work it concerns.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Governing law",
      body: [
        [
          "These terms are governed by the laws of India. If something goes wrong, talk to us first — most things are resolved on a call. Failing that, disputes are subject to the jurisdiction of courts in India.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions",
      intro: ["Ask before you sign rather than after. We would rather answer."],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "Cybiqon AI Solutions LLP",
    },
  ],
};
