import type { LegalDoc } from "../products";

/**
 * Migrated from the hand-written app/apps/llmbytes/{privacy,terms}/page.tsx.
 *
 * These are LIVE Play Store policy URLs — PLAY_DATA_SAFETY.md points Google at
 * https://cybiqon.in/apps/llmbytes/privacy. The wording below is carried across word for
 * word. Nothing was reworded, softened, added or dropped; the migration was verified by
 * diffing the rendered text of the old pages against the new ones, not the source.
 *
 * The one deliberate change: the old page rendered "AI &amp; tech news articles" through
 * `dangerouslySetInnerHTML`, purely because the entity had been written into a JS string.
 * Here it is a literal ampersand. Same output, no HTML injection path in legal copy.
 *
 * ── Amended 6 Aug 2026, for ads ──────────────────────────────────────────────
 * The "word for word" claim above describes the July migration and no longer covers the
 * whole document. The privacy policy has since been changed substantively:
 *
 *   - Added an "Advertising" section (Google AdMob, Advertising ID, the opt-out).
 *   - Added AdMob to third-party services, called out as *sharing* rather than
 *     processing-on-our-behalf.
 *   - Deleted the claim "llmbytes does not show third-party ads", which the AdMob
 *     integration in `ai-news-app/flutter_app` makes false.
 *
 * Keep this in step with `ai-news-app/PLAY_DATA_SAFETY.md`. Google's review reads the
 * hosted policy against the Data safety form, and a disagreement between them is a
 * rejection.
 *
 * NOTE ON `updated`: it must not predate the day this actually goes live. If this sits
 * unmerged past 6 Aug 2026, bump it when it lands.
 */

export const llmbytesPrivacy: LegalDoc = {
  updated: "6 August 2026",
  blocks: [
    {
      kind: "prose",
      heading: "About this policy",
      body: [
        [
          "This Privacy Policy applies to the ",
          { b: "llmbytes" },
          " mobile application (package com.cybiqon.llmbytes), an AI & tech news reader published by Cybiqon AI Solutions (“we,” “us,” or “our”). It explains what information the app handles, why, and the choices available to you.",
        ],
        [
          { b: "llmbytes does not require an account or sign-in." },
          " We do not ask for your name, email address, or phone number to use the app.",
        ],
      ],
    },
    // The original had an H2 "Information the app collects" with two H3 subsections
    // beneath it. That hierarchy is preserved rather than flattened — a heading is part
    // of the document, and the point of this migration is that nothing changes but the
    // renderer.
    {
      kind: "checklist",
      heading: "Information the app collects — usage & analytics data",
      intro: [
        "We use Google Analytics for Firebase to understand how the app is used. This may include:",
      ],
      items: [
        ["In-app events (e.g. screens viewed, articles opened)"],
        ["Device model, operating system and app version"],
        ["Approximate (coarse) region derived from IP address"],
        ["A randomly generated app-instance identifier"],
      ],
      note: [
        "This data is used only in aggregate to improve the app. It is not used to identify you personally.",
      ],
    },
    {
      kind: "checklist",
      heading: "Information the app collects — push notification token",
      intro: [
        "If you allow notifications, the app registers a device push token via Firebase Cloud Messaging so we can send you breaking AI-news alerts.",
      ],
      items: [
        ["The token is stored in our secure Firebase database"],
        ["It identifies your device, not you personally"],
        ["Used solely to deliver news notifications"],
      ],
      note: [
        "You can turn notifications off at any time in your device settings; no token is stored unless you grant permission.",
      ],
    },
    {
      kind: "deflist",
      heading: "Data stored only on your device",
      intro: [
        "The following stays on your device and is ",
        { b: "never sent to us or any third party" },
        ":",
      ],
      items: [
        { term: "Bookmarks (saved bytes)", def: ["The articles you save for later."] },
        {
          term: "Reading history & streaks",
          def: ["Which articles you have read and your reading stats."],
        },
        { term: "Preferences", def: ["Your chosen theme and app settings."] },
      ],
      note: [
        "Uninstalling the app or clearing its storage permanently removes this on-device data.",
      ],
    },
    {
      kind: "checklist",
      heading: "Advertising",
      intro: [
        "llmbytes displays ads supplied by ",
        { b: "Google AdMob" },
        ", which keep the app free. To serve them, the AdMob SDK reads your device's ",
        { b: "Advertising ID" },
        " — a resettable identifier that is not your name and is not linked to any account, since llmbytes has no accounts. AdMob may use it to:",
      ],
      items: [
        ["Select which ads to show and limit how often you see the same one"],
        ["Measure ad performance and detect invalid activity"],
        ["Personalise ads, where you have allowed that"],
      ],
      note: [
        "If you are in the EEA or the UK, llmbytes asks for your consent before any ad is requested, using Google's consent form. You can change that choice at any time from ",
        { b: "Settings → Ad Privacy" },
        " inside the app. Everywhere else, Android lets you reset the Advertising ID, or delete it entirely, under Settings → Privacy → Ads — with it deleted, apps receive no identifier and ads become non-personalised. Google's use of this data is governed by the ",
        { link: "Google Privacy Policy", href: "https://policies.google.com/privacy" },
        " and its ",
        {
          link: "Advertising policies",
          href: "https://policies.google.com/technologies/partner-sites",
        },
        ".",
      ],
    },
    {
      kind: "checklist",
      heading: "What we do not collect",
      intro: [
        { b: "We do NOT sell, rent, or trade any data to third parties." },
        " The app does not collect:",
      ],
      items: [
        ["Your name, email address, or phone number"],
        ["Account credentials (there is no sign-in)"],
        ["Precise / GPS location"],
        ["Contacts, photos, files, or messages"],
      ],
    },
    {
      kind: "deflist",
      heading: "How we use information",
      items: [
        { term: "Deliver the app", def: ["Fetch and display AI & tech news articles."] },
        {
          term: "Send notifications",
          def: ["Alert you to breaking AI news, only if you opt in."],
        },
        {
          term: "Improve the app",
          def: ["Analyse aggregate usage to fix issues and improve features."],
        },
      ],
    },
    {
      kind: "deflist",
      heading: "Third-party services",
      intro: [
        "llmbytes relies on Google Firebase to operate. These services process limited data on our behalf:",
      ],
      items: [
        {
          term: "Firebase (Analytics, Cloud Messaging, Firestore, Cloud Storage)",
          def: ["Delivers content, notifications and usage analytics."],
        },
        {
          term: "Google AdMob",
          def: [
            "Serves the ads that keep llmbytes free. Unlike the Firebase services above, which process data on our instruction, AdMob also uses this data for its own ad serving and measurement — so we treat it as data shared with a third party rather than data merely processed for us.",
          ],
        },
      ],
      note: [
        "Google’s handling of this data is governed by the ",
        { link: "Google Privacy Policy", href: "https://policies.google.com/privacy" },
        ". Articles may link to external news sources; those websites have their own privacy policies.",
      ],
    },
    {
      kind: "prose",
      heading: "Data retention",
      body: [
        [
          "Push tokens are kept while notifications are enabled and removed when you disable them or uninstall the app. Analytics data is retained according to Google Firebase’s default retention settings, and advertising data according to Google AdMob’s.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Your choices",
      body: [
        [
          "Turn notifications on or off in your device settings, and clear all on-device data by clearing the app’s storage or uninstalling it. No personal account exists to delete.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Children’s privacy",
      body: [
        [
          "llmbytes is a general-audience news app and is not directed to children under 13. We do not knowingly collect personal information from children.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Data security",
      body: [
        [
          "Data in transit is protected with HTTPS/TLS encryption and stored on Google’s secure infrastructure. No method of transmission is 100% secure, but we work to protect your data.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes to this policy",
      body: [
        [
          "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last updated” date. Significant changes may also be communicated in the app.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about this policy?",
      intro: [
        "If you have any questions about this Privacy Policy or the llmbytes app’s data practices, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "llmbytes (com.cybiqon.llmbytes)",
    },
  ],
};

export const llmbytesTerms: LegalDoc = {
  updated: "12 July 2026",
  blocks: [
    {
      kind: "prose",
      heading: "Agreement to terms",
      body: [
        [
          "These Terms of Service (“Terms”) govern your use of the ",
          { b: "llmbytes" },
          " mobile application (package com.cybiqon.llmbytes), an AI & tech news reader published by Cybiqon AI Solutions (“we,” “us,” or “our”). By downloading, installing, or using llmbytes, you agree to these Terms.",
        ],
        ["If you do not agree with any part of these Terms, please do not use the app."],
      ],
    },
    {
      kind: "prose",
      heading: "Licence to use the app",
      body: [
        [
          "We grant you a personal, limited, non-exclusive, non-transferable, revocable licence to install and use llmbytes for your own personal, non-commercial use, subject to these Terms.",
        ],
        ["llmbytes is currently free to use and does not require an account or sign-in."],
      ],
    },
    {
      kind: "checklist",
      heading: "Acceptable use",
      intro: ["You agree that you will not:"],
      items: [
        ["Copy, modify, reverse-engineer, decompile, or attempt to extract the source code of the app"],
        ["Scrape, harvest, or bulk-download content, or resell or redistribute it commercially"],
        ["Interfere with, disrupt, or overload the app or its backend services"],
        ["Use the app for any unlawful purpose or in violation of any applicable law"],
        ["Attempt to gain unauthorised access to our systems or other users' data"],
      ],
    },
    {
      kind: "deflist",
      heading: "Content & accuracy",
      items: [
        {
          term: "AI-assisted summaries",
          def: [
            "llmbytes presents news about AI and technology, and some summaries are generated or assisted by artificial intelligence. While we aim for accuracy, AI-generated content may contain errors, omissions, or outdated information. Always verify important details against the original sources linked in each article.",
          ],
        },
        {
          term: "Not professional advice",
          def: [
            "Content in llmbytes is provided for general information only and does not constitute financial, investment, legal, or professional advice. You are solely responsible for how you act on it.",
          ],
        },
        {
          term: "Third-party sources",
          def: [
            "Articles reference and link to third-party news sources. We do not own that underlying content and are not responsible for it. Those sources are governed by their own terms and policies.",
          ],
        },
      ],
    },
    {
      kind: "deflist",
      heading: "Intellectual property",
      items: [
        {
          term: "Our rights",
          def: [
            "The llmbytes app, its name, logo, design, and original editorial presentation are owned by Cybiqon AI Solutions and protected by applicable laws. These Terms do not transfer any ownership to you.",
          ],
        },
        {
          term: "Third-party rights",
          def: [
            "Trademarks, headlines, and article content referenced in the app belong to their respective owners and are used for informational and news-reporting purposes.",
          ],
        },
      ],
    },
    {
      kind: "deflist",
      heading: "Disclaimers & liability",
      items: [
        {
          term: "Provided “as is”",
          def: [
            "The app is provided “as is” and “as available” without warranties of any kind, express or implied. We do not guarantee that the app will be uninterrupted, error-free, or that content will always be accurate or available.",
          ],
        },
        {
          term: "Limitation of liability",
          def: [
            "To the maximum extent permitted by law, Cybiqon AI Solutions will not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the app.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      heading: "Notifications",
      body: [
        [
          "If you opt in, the app may send push notifications about breaking AI news. You can turn these off at any time from your device settings.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Availability & changes",
      body: [
        [
          "We may add, change, suspend, or discontinue features of the app at any time. We may also introduce paid features in the future, which would be clearly indicated before any charge.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Termination",
      body: [
        [
          "You may stop using the app at any time by uninstalling it. We may suspend or terminate your access if you breach these Terms or misuse the app.",
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
          "We may update these Terms from time to time. Changes will be posted on this page with a new “Last updated” date. Continued use of the app after changes constitutes acceptance.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about these terms?",
      intro: [
        "If you have any questions about these Terms of Service or the llmbytes app, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "llmbytes (com.cybiqon.llmbytes)",
    },
  ],
};
