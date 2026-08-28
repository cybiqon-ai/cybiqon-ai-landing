import type { LegalDoc } from "../products";

/**
 * Curvved's Play Store policy documents.
 *
 * Written from what the app ACTUALLY ships with, which here is the *thin* shape:
 * **no ad SDK, no analytics SDK, no backend, no account.** So this pair reads
 * like llmbytes, meflow and vitaloop — "no third-party ads", No to sharing — and
 * NOT like lumina and orbitone, which serve AdMob and have to disclose the
 * advertising ID. Copying the wrong neighbour is how a small publisher earns a
 * policy strike; copying this one onto an app that later adds ads is the same
 * mistake in the other direction.
 *
 * Two things below are Curvved's own and are not in any sibling's copy:
 *
 * **INTERNET is in the manifest and the app never uses it.** It arrives from
 * `in_app_purchase` and `in_app_review`, both of which talk to Google Play. A
 * policy that said "the game makes no network requests" would be true of our
 * code and misleading about the binary, so the Purchases section says where the
 * permission comes from instead.
 *
 * **The tip jar buys nothing**, which is unusual enough that it is stated rather
 * than left for someone to discover after paying.
 *
 * `products/curvved/PLAY_DATA_SAFETY.md` carries the matching console answers.
 * The two have to be changed together or not at all.
 */

export const curvvedPrivacy: LegalDoc = {
  updated: "28 August 2026",
  blocks: [
    {
      kind: "prose",
      heading: "About this policy",
      body: [
        [
          "This Privacy Policy applies to ",
          { b: "Curvved" },
          " (package com.cybiqon.curvved), a puzzle game published by Cybiqon AI Solutions (“we,” “us,” or “our”). It explains what information the game handles, why, and the choices available to you.",
        ],
        [
          { b: "Curvved has no account, no sign-in, and no server of its own." },
          " We do not ask for your name, email address, or phone number, and there is nothing to log in to. We hold no database of players.",
        ],
        [
          { b: "It also carries no advertising and no analytics." },
          " There is no ad network in the app, no analytics SDK, and nothing that reports what you do to us or to anyone else. The only thing that ever leaves your device does so because you chose to buy something, and Google Play handles that.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Data stored only on your device",
      intro: [
        "Everything the game knows about you stays on your phone and is ",
        { b: "never sent to us" },
        ". We could not retrieve it if you asked us to:",
      ],
      items: [
        {
          term: "Progress",
          def: [
            "Which figures you have finished, and the exact state of every figure you left half-made — the game keeps all of them, not just the most recent, so nothing you started is lost by starting something else.",
          ],
        },
        {
          term: "Settings",
          def: [
            "Your paper/night, sound, haptics, higher-contrast and simple-effects preferences.",
          ],
        },
        {
          term: "Whether you have bought the unlock",
          def: [
            "Cached locally so the game opens with every pack available even with no network. Google Play is the authority and is re-checked at every launch. See “Purchases” below.",
          ],
        },
      ],
      note: [
        "This is kept in the app's own local storage. Uninstalling Curvved, or clearing its storage, permanently deletes all of it — including figures you cannot get back. There is no cloud save. Android's own Auto Backup may copy it to your personal Google Drive, which is your account and not ours; we have no access to it.",
      ],
    },
    {
      kind: "checklist",
      heading: "What we do not collect",
      intro: [
        { b: "We do not sell, rent, or trade data to anyone." },
        " Curvved does not collect:",
      ],
      items: [
        ["Your name, email address, or phone number"],
        ["Account credentials — there is no sign-in"],
        ["Location of any kind, precise or approximate"],
        ["Your device's advertising ID — there is no advertising in the game"],
        ["Contacts, photos, files, messages, or your microphone or camera"],
        [
          "Analytics of any kind: which figures you play, how long you play, how many times you tapped",
        ],
      ],
      note: [
        "The game requests no runtime permissions at all, so it will never show you a permission dialog.",
      ],
    },
    {
      kind: "deflist",
      heading: "Purchases",
      intro: [
        "Curvved is free through its first three packs — thirty-two figures. Two optional purchases exist beyond that:",
      ],
      items: [
        {
          term: "Unlock every figure",
          def: [
            "A one-time payment that opens the remaining packs. Every pack added after that arrives as a free update; we will not charge for the same game twice.",
          ],
        },
        {
          term: "A tip",
          def: [
            "Buys nothing. It unlocks no content, removes nothing, and changes no part of the game. It is there because some people ask for a way to say thank you, and for no other reason.",
          ],
        },
        {
          term: "Google Play handles the payment",
          def: [
            "The transaction happens inside Google Play. We never see your card number, billing address, or any payment detail — we receive only a confirmation that the purchase succeeded.",
          ],
        },
        {
          term: "Your purchase follows your Google account",
          def: [
            "Reinstalling the game or moving to a new phone does not lose it: the game asks Google Play at every launch, and Settings has a “Restore a purchase” option if you want to ask immediately.",
          ],
        },
        {
          term: "Why the app has internet permission",
          def: [
            "Curvved's own code makes no network requests — there is no server to call. The INTERNET permission in the app comes from Google's own billing and in-app-review libraries, which talk to the Google Play app on your device. We would rather say where it comes from than have you wonder.",
          ],
        },
      ],
      note: [
        "Google's handling of payment data is governed by the ",
        {
          link: "Google Payments Privacy Notice",
          href: "https://payments.google.com/legaldocument?family=0.privacynotice",
        },
        ".",
      ],
    },
    {
      kind: "prose",
      heading: "The rating prompt",
      body: [
        [
          "Very occasionally, after you have finished a figure, the game may ask Google Play to show its own rating sheet. That request contains nothing about you — it is a call to a Google library, and whether anything appears is Google's decision, not ours. We are never told whether you left a review or what it said.",
        ],
        [
          "It is heavily limited on purpose: never in your first sessions, never before you have made several figures, and never more than once in ninety days. There is deliberately no “rate this app” button anywhere in the game.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Children's privacy",
      body: [
        [
          "Curvved is a general-audience puzzle game. It is not directed to children under 13, and we do not knowingly collect personal information from children.",
        ],
        [
          "If you believe a child has provided information to us, contact us at the address below. In practice there is nothing for us to hold: the game keeps no personal data, has no account system, and transmits nothing.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Data retention and security",
      body: [
        [
          "We retain nothing, because we receive nothing. On-device data lives until you clear the app's storage, uninstall it, or use Settings → Reset progress. Data exchanged with Google for purchases is protected in transit with HTTPS/TLS and retained under Google's own policies.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes to this policy",
      body: [
        [
          "We may update this Privacy Policy from time to time. Changes will be posted on this page with a new “Last updated” date. If a change materially affects what data leaves your device — adding an analytics SDK, an ad network, or a cloud save — the policy will be updated before that version reaches the store, not after.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about this policy?",
      intro: [
        "If you have any questions about this Privacy Policy or how Curvved handles data, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "Curvved (com.cybiqon.curvved)",
    },
  ],
};

export const curvvedTerms: LegalDoc = {
  updated: "28 August 2026",
  blocks: [
    {
      kind: "prose",
      heading: "Agreement to terms",
      body: [
        [
          "These Terms of Service (“Terms”) govern your use of ",
          { b: "Curvved" },
          " (package com.cybiqon.curvved), a puzzle game published by Cybiqon AI Solutions (“we,” “us,” or “our”). By downloading, installing, or playing Curvved, you agree to these Terms.",
        ],
        ["If you do not agree with any part of these Terms, please do not use the game."],
      ],
    },
    {
      kind: "prose",
      heading: "Licence to use the game",
      body: [
        [
          "We grant you a personal, limited, non-exclusive, non-transferable, revocable licence to install and play Curvved for your own personal, non-commercial use, subject to these Terms.",
        ],
        [
          "The first three packs — thirty-two figures — are free and will stay free. Nothing in the game is timed, rented, or taken away once you have it.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Purchases and refunds",
      intro: [
        "Curvved offers two optional purchases and will never offer a third kind: ",
        { b: "Unlock every figure" },
        ", a one-time payment, and a ",
        { b: "tip" },
        ", which buys nothing at all.",
      ],
      items: [
        {
          term: "Sold through Google Play",
          def: [
            "All purchases are processed by Google Play under Google's own terms. We do not handle payments and do not see your payment details.",
          ],
        },
        {
          term: "Refunds",
          def: [
            "Refunds are governed by the Google Play refund policy. Contact us at the address below if a purchase did not deliver what it promised and we will help, but the refund itself is issued by Google, not by us.",
          ],
        },
        {
          term: "Restoring a purchase",
          def: [
            "The unlock is tied to your Google account. The game re-checks with Google Play at every launch, and Settings has “Restore a purchase” if you want to ask straight away. You will not be charged twice.",
          ],
        },
        {
          term: "The tip is not a purchase of anything",
          def: [
            "It unlocks no content and removes nothing. If you tipped expecting otherwise, write to us.",
          ],
        },
        {
          term: "Future packs are free",
          def: [
            "Additional figures released after the unlock are included in it. We will not sell the same game to the same person twice.",
          ],
        },
      ],
    },
    {
      kind: "checklist",
      heading: "What this game will never do",
      intro: [
        "These are commitments, not current-version descriptions. They are in the Terms because that is where a promise belongs:",
      ],
      items: [
        ["No advertising of any kind — not banners, not interstitials, not rewarded video"],
        ["No paid hints. There is no fail state, so there is nothing to sell relief from"],
        ["No streaks, no energy, no lives, no timers, and no limited-time content"],
        ["No push notifications"],
        ["Nothing you have made is ever taken away from you"],
      ],
    },
    {
      kind: "prose",
      heading: "Progress lives on your device",
      body: [
        [
          "There is no cloud save. Clearing the app's storage, uninstalling the game, or using Settings → Reset progress permanently deletes your figures, and we cannot restore them. Your purchase is not affected by any of those — it follows your Google account, not your save file.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "Acceptable use",
      intro: ["You agree that you will not:"],
      items: [
        [
          "Copy, modify, reverse-engineer, decompile, or attempt to extract the source code of the game",
        ],
        ["Modify saved data or use automation tools to manipulate progress or unlocks"],
        ["Attempt to obtain paid content by any means other than paying for it"],
        [
          "Redistribute, resell, or repackage the game or its level data, audio, or figure artwork",
        ],
        ["Use the game for any unlawful purpose or in violation of any applicable law"],
      ],
      note: [
        "Figures you finish can be exported as images and are yours to post anywhere. That is the point of the export, and it is not restricted by the line above.",
      ],
    },
    {
      kind: "deflist",
      heading: "Intellectual property",
      items: [
        {
          term: "Our rights",
          def: [
            "The Curvved game, its name, artwork, level design, music and sound, and original presentation are owned by Cybiqon AI Solutions and protected by applicable laws. These Terms do not transfer any ownership to you.",
          ],
        },
        {
          term: "Third-party artwork",
          def: [
            "Many figures are derived from open-source icon sets — principally Lucide (ISC) and Tabler (MIT) — and every one is credited by name, source and licence in the project's own CREDITS file.",
          ],
        },
        {
          term: "Typefaces",
          def: [
            "Curvved bundles no fonts. It is set in whatever system typeface your device provides, which on Android is normally Roboto.",
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
            "The game is provided “as is” and “as available” without warranties of any kind, express or implied. We do not guarantee that it will be uninterrupted or error-free, or that purchases will always be available.",
          ],
        },
        {
          term: "Loss of progress",
          def: [
            "Because progress is stored only on your device, we cannot recover it if it is lost, and we are not liable for lost figures however that loss occurs.",
          ],
        },
        {
          term: "Limitation of liability",
          def: [
            "To the maximum extent permitted by law, Cybiqon AI Solutions will not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the game. Where liability cannot be excluded, it is limited to the amount you have paid us for the game in the preceding twelve months.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      heading: "Availability & changes",
      body: [
        [
          "We may add, change, suspend, or discontinue features of the game at any time. New figures and packs are added as free updates. If we ever introduce a further paid feature, it will be clearly marked before any charge, and the commitments listed above will still hold.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Termination",
      body: [
        [
          "You may stop using the game at any time by uninstalling it. We may suspend or terminate your access if you breach these Terms. Purchases already made are not refunded on termination for breach.",
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
          "We may update these Terms from time to time. Changes will be posted on this page with a new “Last updated” date. Continued use of the game after changes constitutes acceptance.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about these terms?",
      intro: [
        "If you have any questions about these Terms of Service or about Curvved, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "Curvved (com.cybiqon.curvved)",
    },
  ],
};
