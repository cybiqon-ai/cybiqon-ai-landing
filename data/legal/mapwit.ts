import type { LegalDoc } from "../products";

/**
 * MapWit's Chrome Web Store policy documents.
 *
 * Written from the extension's source as of v1.0.0 (products/extensions/gmaps-extractor),
 * not from the Android template the other products share. Three things make it different,
 * and each one is a place a copied policy would have been wrong:
 *
 *   1. Data leaves the browser in two ways the user triggers — website fetches during
 *      enrichment, and review excerpts sent to OpenRouter. The product page used to say
 *      "nothing leaves the machine"; that was never true once enrichment existed.
 *   2. The user's own OpenRouter API key is stored locally and sent to one host.
 *   3. What MapWit handles is information *about businesses*, some of which (a sole
 *      proprietor's phone or email) is personal data about someone who is not the user.
 *
 * The Chrome Web Store "Privacy practices" answers live in the extension repo at
 * store/listing.md and must change together with this file.
 */

const UPDATED = "12 September 2026";
const PRODUCT = "MapWit (Chrome extension)";

export const mapwitPrivacy: LegalDoc = {
  updated: UPDATED,
  blocks: [
    {
      kind: "prose",
      heading: "About this policy",
      body: [
        [
          "This Privacy Policy applies to ",
          { b: "MapWit" },
          ", a Chrome extension published by Cybiqon AI Solutions LLP (“we,” “us,” or “our”). MapWit reads the Google Maps business listings you browse, finds public contact details and website signals for those businesses, scores them, and lets you export the result.",
        ],
        [
          { b: "MapWit has no server, no account and no analytics." },
          " We do not receive your leads, your settings, your API key or anything about how you use the extension. There is no MapWit database for any of it to be in.",
        ],
        [
          "Some data does leave your browser — to business websites and, if you use AI features, to OpenRouter. Each case is set out below.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Data stored only in your browser",
      intro: [
        "MapWit keeps the following in Chrome's extension storage on your computer. It is ",
        { b: "never sent to us" },
        ":",
      ],
      items: [
        {
          term: "Leads",
          def: [
            "For each business you capture: name, category, address, phone number, website, rating, review count, opening hours, the search it came from, up to 15 review excerpts from its Maps page, contact emails and social links found on its website, and the scores MapWit calculates.",
          ],
        },
        {
          term: "AI results",
          def: [
            "The one-line review insight for each business you analyse, a cache of model responses so the same request is not paid for twice, and a log of token counts per request.",
          ],
        },
        {
          term: "Your OpenRouter API key and settings",
          def: [
            "The key you paste into Settings and the model you choose. The key is stored as-is in extension storage, like any extension setting — anyone with access to your Chrome profile could read it, so use a key with a spending limit.",
          ],
        },
      ],
      note: [
        "Clear all in the side panel deletes leads, AI results and the token log. Clearing the key field in Settings deletes the key. Removing the extension deletes everything.",
      ],
    },
    {
      kind: "deflist",
      heading: "What leaves your browser, and when",
      items: [
        {
          term: "Google Maps",
          def: [
            "MapWit reads the Maps results and business pages you open in your own tab. When you use Scrape more or Deep scan it scrolls that list and opens listings for you, exactly as you would by hand. It sends nothing to Google beyond what your browser already sends when you use Maps.",
          ],
        },
        {
          term: "Business websites — only after you allow it",
          def: [
            "Enrichment needs website access, which Chrome asks you to allow the first time you click Enrich. After that, for each lead with a website, MapWit requests up to six public pages (home, contact and about) to look for a contact email, social links and quality signals. No cookies are sent. As with any visit, the website sees your IP address and browser. Addresses on private networks (your router, localhost and similar) are refused. You can revoke website access at any time in MapWit Settings or at chrome://extensions.",
          ],
        },
        {
          term: "OpenRouter — only when you use AI features",
          def: [
            "When you click Analyse reviews, MapWit sends the business's name, category, rating, review count and up to 8 review excerpts to ",
            { link: "OpenRouter", href: "https://openrouter.ai" },
            ", together with your API key and the model you chose. OpenRouter passes the request to that model's provider. By default that is Google: the default model is ~google/gemini-flash-latest, OpenRouter's name for whichever Gemini Flash model is newest. Opening Settings also fetches OpenRouter's public list of models, with no key, and the Test button sends a one-word request with your key.",
          ],
        },
      ],
      note: [
        "Requests to OpenRouter are governed by the ",
        { link: "OpenRouter Privacy Policy", href: "https://openrouter.ai/privacy" },
        " and by the policy of the model provider you select. We are not a party to them and do not see them.",
      ],
    },
    {
      kind: "table",
      heading: "Permissions MapWit asks for",
      columns: ["Permission", "Why"],
      rows: [
        [["storage, unlimitedStorage"], ["Keeps your leads and settings in the browser. Unlimited storage lets large lead lists fit without silently failing past Chrome's 10 MB default."]],
        [["sidePanel"], ["Shows MapWit in Chrome's side panel next to Maps."]],
        [["scripting"], ["Re-attaches MapWit to a Maps tab that was already open when the extension was installed or updated."]],
        [["Google Maps sites"], ["Reads the listings you browse on google.com/maps and google.co.in/maps."]],
        [["openrouter.ai"], ["Sends AI requests, only when you use AI features."]],
        [["Website access (optional)"], ["Fetches business websites during enrichment. Requested only when you first click Enrich, and revocable."]],
      ],
    },
    {
      kind: "prose",
      heading: "Information about businesses and the people behind them",
      body: [
        [
          "MapWit collects information businesses have published on Google Maps and on their own websites. For a sole proprietor or a small firm, a listed phone number or email address can identify a person. That information is stored only on your computer, and ",
          { b: "what you do with it is your responsibility" },
          " — including complying with India's Digital Personal Data Protection Act 2023, and with anti-spam and data protection laws wherever you or the business are located, before contacting anyone you find with MapWit.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "What we do not do",
      intro: [{ b: "We do not sell, rent, or trade data to anyone." }, " MapWit does not:"],
      items: [
        ["Send your leads, settings or API key to us or to any server of ours"],
        ["Include analytics, crash reporting, advertising or tracking code"],
        ["Read pages other than Google Maps, or business websites during enrichment"],
        ["Collect your browsing history, location, contacts or files"],
        ["Use any data for creditworthiness, lending or any purpose other than MapWit's single purpose"],
      ],
      note: [
        "MapWit's use of information complies with the ",
        {
          link: "Chrome Web Store User Data Policy",
          href: "https://developer.chrome.com/docs/webstore/program-policies/user-data-faq",
        },
        ", including the Limited Use requirements.",
      ],
    },
    {
      kind: "prose",
      heading: "Children",
      body: [
        [
          "MapWit is a business tool and is not directed to children under 18. We do not knowingly collect personal information from children, and the extension collects nothing about its user at all.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Security and retention",
      body: [
        [
          "We retain nothing, because we receive nothing. Data in the browser stays until you clear it or remove the extension. Requests to OpenRouter and to business websites use HTTPS where the site supports it.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes to this policy",
      body: [
        [
          "Changes will be posted on this page with a new “Last updated” date. If a change affects what data leaves your browser — a new service, analytics, or a server of our own — this policy will be updated before that version is published to the Chrome Web Store, not after.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about this policy?",
      intro: ["If you have any questions about this Privacy Policy or how MapWit handles data, please contact us:"],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: PRODUCT,
    },
  ],
};

export const mapwitTerms: LegalDoc = {
  updated: UPDATED,
  blocks: [
    {
      kind: "prose",
      heading: "Agreement to terms",
      body: [
        [
          "These Terms of Service (“Terms”) govern your use of ",
          { b: "MapWit" },
          ", a Chrome extension published by Cybiqon AI Solutions LLP (“we,” “us,” or “our”). By installing or using MapWit, you agree to these Terms. If you do not agree, please do not use the extension.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Licence",
      body: [
        [
          "We grant you a limited, non-exclusive, non-transferable, revocable licence to install and use MapWit, including for your own business, subject to these Terms. MapWit is currently free.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Third-party services",
      items: [
        {
          term: "Not affiliated with Google",
          def: [
            "MapWit is an independent tool. It is not made, endorsed or supported by Google. Google Maps is a trademark of Google LLC.",
          ],
        },
        {
          term: "Your OpenRouter account",
          def: [
            "AI features use your own OpenRouter API key. Any charges for those requests are between you and OpenRouter, and are governed by their terms. We never receive your key or your usage.",
          ],
        },
      ],
    },
    {
      kind: "checklist",
      heading: "Your responsibilities",
      intro: ["You agree that you will:"],
      items: [
        ["Comply with the terms of the websites you use MapWit on, including Google Maps"],
        [
          "Comply with the laws that apply to contacting businesses and handling their information, including India's Digital Personal Data Protection Act 2023 and anti-spam laws wherever you or the recipient are located",
        ],
        ["Not use MapWit to send unsolicited bulk messages, or to harass, deceive or defraud anyone"],
        ["Not attempt to reverse-engineer, resell or repackage MapWit"],
      ],
    },
    {
      kind: "deflist",
      heading: "Disclaimers & liability",
      items: [
        {
          term: "Provided “as is”",
          def: [
            "MapWit is provided “as is” and “as available” without warranties of any kind. Google Maps and business websites change without notice, so capture and enrichment may stop working, miss information, or return information that is out of date or wrong. Check anything that matters before relying on it.",
          ],
        },
        {
          term: "Your data",
          def: [
            "Leads are stored only in your browser. We cannot recover them if they are lost, and we are not liable for lost leads however that loss occurs. Export anything you need to keep.",
          ],
        },
        {
          term: "Limitation of liability",
          def: [
            "To the maximum extent permitted by law, Cybiqon AI Solutions LLP will not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, MapWit. Where liability cannot be excluded, it is limited to the amount you have paid us for MapWit in the preceding twelve months.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      heading: "Changes and termination",
      body: [
        [
          "We may change, suspend or discontinue MapWit or any feature of it at any time. If a paid plan is ever introduced, it will be clearly marked before any charge. You may stop using MapWit at any time by removing it from Chrome.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Governing law",
      body: [
        [
          "These Terms are governed by the laws of India, and any disputes are subject to the jurisdiction of the courts in India.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes to these terms",
      body: [
        [
          "We may update these Terms from time to time. Changes will be posted on this page with a new “Last updated” date. Continued use of MapWit after changes constitutes acceptance.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about these terms?",
      intro: ["If you have any questions about these Terms of Service or about MapWit, please contact us:"],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: PRODUCT,
    },
  ],
};
