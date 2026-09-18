import type { LegalDoc } from "../products";

/**
 * ChitraYatra's Play Store policy documents.
 *
 * ChitraYatra is the game that replaced Curvved on 17 Sep 2026 — a different
 * game under a new name and package (`com.cybiqon.chitrayatra`). Curvved's
 * pages described the retired lattice game, its unlock and its tip jar, and
 * said nothing left the device but a Google Play purchase. That stopped being
 * true on 14 Sep 2026, when purchases moved to RevenueCat, which receives the
 * purchase history and an anonymous app user ID. So this pair is written fresh
 * from what the app ships with today, and `/products/curvved/*` redirects here.
 *
 * Still the *thin* shape — no ad SDK, no analytics SDK, no account, no server
 * of our own — so it reads like llmbytes, meflow and vitaloop, not like lumina
 * and orbitone. The one processor is RevenueCat, acting for us.
 *
 * `products/curvved/PLAY_DATA_SAFETY.md` carries the matching console answers.
 * The two have to be changed together or not at all.
 */

export const chitrayatraPrivacy: LegalDoc = {
  updated: "18 September 2026",
  blocks: [
    {
      kind: "prose",
      heading: "About this policy",
      body: [
        [
          "This Privacy Policy applies to ",
          { b: "ChitraYatra" },
          " (package com.cybiqon.chitrayatra), a puzzle game of stained-glass windows published by Cybiqon AI Solutions (“we,” “us,” or “our”). It explains what information the game handles, why, and the choices available to you.",
        ],
        [
          { b: "ChitraYatra has no account, no sign-in, and no server of our own." },
          " We do not ask for your name, email address, or phone number, and there is nothing to log in to.",
        ],
        [
          { b: "It carries no advertising and no analytics." },
          " There is no ad network in the app, no analytics SDK, and nothing that reports how you play. The only information that leaves your device concerns purchases, and only so that what you bought works and can be restored.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Data stored only on your device",
      intro: [
        "Everything the game knows about your play stays on your phone and is ",
        { b: "never sent to us" },
        ":",
      ],
      items: [
        {
          term: "Progress",
          def: [
            "Which windows and scenes you have finished and on which day, and the exact state of every one you left half-made, in each way of playing it.",
          ],
        },
        {
          term: "Settings and choices",
          def: [
            "Sound, music, haptics and appearance; the backgrounds and finishes you chose; which first-time hints you have already seen; and the counts the game uses to decide when it may ask for a rating (see below).",
          ],
        },
        {
          term: "What you have bought",
          def: [
            "Cached so the game opens with your purchases in place even with no network. The store is the authority and is re-checked at launch.",
          ],
        },
      ],
      note: [
        "This is kept in the app's own local storage. Uninstalling ChitraYatra, clearing its storage, or using Settings → Reset progress permanently deletes it. There is no cloud save. Android's own Auto Backup may copy it to your personal Google Drive, which is your account and not ours; we have no access to it.",
      ],
    },
    {
      kind: "table",
      heading: "Data that leaves your device",
      intro: [
        "Only for purchases, and only through ",
        { b: "RevenueCat" },
        ", the service we use to validate, record and restore them. RevenueCat acts on our behalf; it is not given this data to use for its own purposes, and we do not sell or share it with anyone else.",
      ],
      columns: ["What", "Why", "When"],
      rows: [
        [
          [{ b: "Purchase history" }],
          ["Which of the game's products you bought, when, and the store's receipt for it — so the purchase is validated, delivered, and restored on a new phone."],
          ["Only if you buy something"],
        ],
        [
          [{ b: "An anonymous app user ID" }],
          ["A random identifier RevenueCat creates for this installation, so your purchases can be matched to you. It is not your name, your email, your Google account, or your device's advertising ID."],
          ["When the game starts its store"],
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Purchases",
      intro: [
        "Every window and every scene in the game is free. Optional purchases add to it: ChitraYatra Plus, finishes for the glass and frame, and packs of new windows.",
      ],
      items: [
        {
          term: "Google Play handles the payment",
          def: [
            "The transaction happens inside Google Play. We never see your card number, billing address or any payment detail.",
          ],
        },
        {
          term: "RevenueCat keeps the record",
          def: [
            "It receives the purchase history and the anonymous ID above, over an encrypted connection (HTTPS). Its handling is governed by the ",
            { link: "RevenueCat Privacy Policy", href: "https://www.revenuecat.com/privacy" },
            ".",
          ],
        },
        {
          term: "Why the app has internet permission",
          def: [
            "Only for purchases: the INTERNET permission comes with Google Play's billing and RevenueCat's library. The game's own code makes no network requests.",
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
      kind: "checklist",
      heading: "What we do not collect",
      intro: [
        { b: "We do not sell, rent, or trade data to anyone." },
        " ChitraYatra does not collect:",
      ],
      items: [
        ["Your name, email address, or phone number"],
        ["Account credentials — there is no sign-in"],
        ["Location of any kind, precise or approximate"],
        ["Your device's advertising ID — there is no advertising in the game"],
        ["Contacts, photos, files, messages, or your microphone or camera"],
        ["Analytics of any kind: which windows you play, how long, or how you play them"],
      ],
      note: [
        "The game requests no runtime permissions at all, so it will never show you a permission dialog.",
      ],
    },
    {
      kind: "prose",
      heading: "Pictures you keep",
      body: [
        [
          "When you choose “Keep a picture” of a finished window or scene, the image is made on your phone and handed to Android's own share sheet. Where it goes next is your choice — your gallery, a message, anywhere. We receive nothing.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "The rating prompt",
      body: [
        [
          "Very occasionally, as you leave a window you have just finished, the game may ask Google Play to show its own rating card. The request contains nothing about you, whether anything appears is Google's decision, and we are never told whether you left a review or what it said.",
        ],
        [
          "It is limited on purpose: not before you have come back to the game a few times and finished several windows, and never more than once in ninety days. There is no “rate this app” button anywhere in the game.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Deleting your data",
      body: [
        [
          "Everything on your device goes when you uninstall the game or use Settings → Reset progress. To have the purchase record deleted from RevenueCat, email us at the address below; we will delete it. That does not take away what you bought: Google Play still holds your receipt, and Settings → Restore purchases brings your purchases back (which creates a new record).",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Children's privacy",
      body: [
        [
          "ChitraYatra is a general-audience puzzle game for ages 13 and over. It is not directed to children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided information to us, contact us at the address below.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Retention and security",
      body: [
        [
          "On-device data lives until you clear it. The purchase record is kept by RevenueCat for as long as it is needed to deliver and restore your purchases, or until you ask us to delete it. All of it travels over encrypted connections.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes to this policy",
      body: [
        [
          "We may update this Privacy Policy from time to time. Changes will be posted on this page with a new “Last updated” date. If a change affects what data leaves your device — adding analytics, an ad network or a cloud save — the policy will be updated before that version reaches the store, not after.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about this policy?",
      intro: [
        "If you have any questions about this Privacy Policy or how ChitraYatra handles data, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "ChitraYatra (com.cybiqon.chitrayatra)",
    },
  ],
};

export const chitrayatraTerms: LegalDoc = {
  updated: "18 September 2026",
  blocks: [
    {
      kind: "prose",
      heading: "Agreement to terms",
      body: [
        [
          "These Terms of Service (“Terms”) govern your use of ",
          { b: "ChitraYatra" },
          " (package com.cybiqon.chitrayatra), a puzzle game published by Cybiqon AI Solutions (“we,” “us,” or “our”). By downloading, installing, or playing ChitraYatra, you agree to these Terms.",
        ],
        ["If you do not agree with any part of these Terms, please do not use the game."],
      ],
    },
    {
      kind: "prose",
      heading: "Licence to use the game",
      body: [
        [
          "We grant you a personal, limited, non-exclusive, non-transferable, revocable licence to install and play ChitraYatra for your own personal, non-commercial use, subject to these Terms.",
        ],
        [
          "Every window and every scene in the game is free and will stay free. Nothing is timed, rented, or taken away once you have it.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Purchases and refunds",
      intro: [
        "ChitraYatra offers optional one-time purchases: ",
        { b: "ChitraYatra Plus" },
        " (“Solve it for me” and six backgrounds), ",
        { b: "finishes" },
        " for the lead, glass and frame, singly or as a set, and ",
        { b: "window packs" },
        " of new windows. There are no subscriptions.",
      ],
      items: [
        {
          term: "Sold through Google Play",
          def: [
            "All purchases are processed by Google Play under Google's own terms, and recorded by RevenueCat so they can be restored. We do not see your payment details.",
          ],
        },
        {
          term: "Packs are new windows only",
          def: [
            "Nothing that was free is ever moved into a paid pack.",
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
            "Purchases follow your Google account. The game re-checks them at launch, and Settings → Restore purchases asks straight away. You will not be charged twice.",
          ],
        },
      ],
    },
    {
      kind: "checklist",
      heading: "What this game will never do",
      intro: [
        "These are commitments, not a description of the current version. They are in the Terms because that is where a promise belongs:",
      ],
      items: [
        ["No advertising of any kind — not banners, not interstitials, not rewarded video"],
        ["No paid hints. Hints are free and unlimited, and there is no fail state"],
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
          "There is no cloud save. Clearing the app's storage, uninstalling the game, or using Settings → Reset progress permanently deletes your progress, and we cannot restore it. Your purchases are not affected — they follow your Google account, not your save.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "Acceptable use",
      intro: ["You agree that you will not:"],
      items: [
        ["Copy, modify, reverse-engineer, decompile, or attempt to extract the source code of the game"],
        ["Modify saved data or use automation tools to manipulate progress or purchases"],
        ["Attempt to obtain paid content by any means other than paying for it"],
        ["Redistribute, resell, or repackage the game or its windows, scenes, music or artwork"],
        ["Use the game for any unlawful purpose or in violation of any applicable law"],
      ],
      note: [
        "Pictures you keep of windows and scenes you finished are yours to share anywhere. That is what “Keep a picture” is for, and the line above does not restrict it.",
      ],
    },
    {
      kind: "deflist",
      heading: "Intellectual property",
      items: [
        {
          term: "Our rights",
          def: [
            "The ChitraYatra game, its name, windows, scenes, music and sound, and original presentation are owned by Cybiqon AI Solutions and protected by applicable laws. These Terms do not transfer any ownership to you.",
          ],
        },
        {
          term: "How the art is made",
          def: [
            "Most windows are drawn by the game's own code in the visual grammar of an Indian art tradition; each says what it is inspired by, and that it is not an example of it. Some windows were drafted with AI assistance, the Artisan scenes are AI-generated paintings made from our prompts, and the music was generated with AI from our prompts. Each says so in the game.",
          ],
        },
        {
          term: "Third-party material",
          def: [
            "The map of India's state boundaries is from the DataMeet India community (CC BY 4.0), and the bundled typefaces are under the SIL Open Font License. Each is credited in the game's open-source licences page.",
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
            "Because progress is stored only on your device, we cannot recover it if it is lost, and we are not liable for lost progress however that loss occurs.",
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
          "We may add, change, suspend, or discontinue features of the game at any time. If we introduce a further paid feature, it will be clearly marked before any charge, and the commitments listed above will still hold.",
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
        "If you have any questions about these Terms of Service or about ChitraYatra, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "ChitraYatra (com.cybiqon.chitrayatra)",
    },
  ],
};
