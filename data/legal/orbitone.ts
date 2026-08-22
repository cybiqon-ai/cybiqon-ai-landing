import type { LegalDoc } from "../products";

/**
 * Orbitone's Play Store policy documents.
 *
 * Written from what the app ACTUALLY ships with. Orbitone serves Google AdMob and sells
 * one non-consumable, so it is the same shape as Lumina's pair and NOT the shape of
 * llmbytes, meflow and vitaloop, which all declare "no third-party ads". Shipping an ad
 * SDK behind a privacy policy copied from an ad-free app is the single most common way a
 * small publisher earns a policy strike.
 *
 * **One thing here is Orbitone's own and is not in Lumina's copy: the game keeps play
 * telemetry.** `lib/services/analytics.dart` records every attempt, clear, death and
 * wall, because the entire 500-level difficulty curve is fitted by bots and the only way
 * to know whether those bots are lying is to compare them against what a person actually
 * did. It is on-device only — no network dependency at all — and it is disclosed below in
 * its own section rather than folded into "progress", because a policy that says "we
 * store your progress" while the app is recording how many times you died on level 176
 * is technically true and practically misleading.
 *
 * `products/orbitone/PLAY_DATA_SAFETY.md` carries the matching console answers, including
 * why the Analytics checkbox stays unticked while that file exists. The two have to be
 * changed together or not at all.
 */

export const orbitonePrivacy: LegalDoc = {
  updated: "22 August 2026",
  blocks: [
    {
      kind: "prose",
      heading: "About this policy",
      body: [
        [
          "This Privacy Policy applies to ",
          { b: "Orbitone" },
          " (package com.cybiqon.orbitone), an arcade game published by Cybiqon AI Solutions (“we,” “us,” or “our”). It explains what information the game handles, why, and the choices available to you.",
        ],
        [
          { b: "Orbitone has no account, no sign-in, and no server of its own." },
          " We do not ask for your name, email address, or phone number, and there is nothing to log in to. We hold no database of players.",
        ],
        [
          "The game does, however, show ads supplied by Google AdMob, and those ads involve data leaving your device. That is described in full below rather than buried.",
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
          def: ["Which levels you have finished, the stars you earned on each, and how far down the map you have reached."],
        },
        {
          term: "Stars and palettes",
          def: [
            "Your star balance and which colour palettes you have spent them on. Palettes are the only thing stars buy.",
          ],
        },
        {
          term: "Settings",
          def: ["Your sound and haptics preferences."],
        },
        {
          term: "Whether you have bought Remove Ads",
          def: [
            "Cached locally so the game does not have to ask Google every time it starts. See “Purchases” below.",
          ],
        },
      ],
      note: [
        "This is kept in the app's own local storage. Uninstalling Orbitone, or clearing its storage, permanently deletes all of it — including progress you cannot get back. There is no cloud save.",
      ],
    },
    {
      kind: "prose",
      heading: "Play telemetry — recorded on your device, and never sent anywhere",
      body: [
        [
          "Orbitone records how its levels actually play: attempts on a level, clears, deaths, and where a run ended. ",
          { b: "None of it leaves your phone." },
          " There is no analytics SDK in the app and no network request that carries it.",
        ],
        [
          "It exists because every difficulty number in Orbitone is produced by software playing the game rather than by a person — five hundred levels is more than anyone can hand-check. Those estimates have been wrong before, and the only way to catch it is to compare them against what really happened on a real phone.",
        ],
        [
          "In practice this is read off a development device by hand. ",
          { b: "If a future version ever uploads it, this policy will be updated before that version ships" },
          ", and the Play Data Safety declaration will change with it.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "Advertising — what Google AdMob receives",
      intro: [
        { b: "Orbitone shows ads served by Google AdMob, and this is data shared with a third party." },
        " To select and measure ads, Google may collect and process:",
      ],
      items: [
        [
          "Your device's ",
          { b: "advertising ID" },
          " (a resettable identifier, not your name)",
        ],
        ["Device model, operating system version, and language"],
        ["Approximate (coarse) location derived from your IP address — never GPS"],
        ["Whether an ad was shown, viewed to the end, or clicked"],
      ],
      note: [
        "We do not receive any of this. We see only aggregate earnings figures in our AdMob dashboard. Google's handling of ad data is governed by the ",
        { link: "Google Privacy Policy", href: "https://policies.google.com/privacy" },
        " and the ",
        {
          link: "Google Advertising Policies",
          href: "https://policies.google.com/technologies/partner-sites",
        },
        ".",
      ],
    },
    {
      kind: "deflist",
      heading: "Where ads appear",
      intro: [
        "Ad placement in Orbitone is deliberately limited, and none of it interrupts a run:",
      ],
      items: [
        {
          term: "Rewarded video — always your choice",
          def: [
            "Offered after you die, in exchange for continuing the run, or for taking a single step back to before the mistake. Nothing is shown unless you tap to accept it, and declining costs you nothing but the reward.",
          ],
        },
        {
          term: "Interstitial — between levels only",
          def: [
            "Shown occasionally on finishing a level, never during play. The first one is held back until you are ten levels in, and after that they appear no more often than every fourth level you complete.",
          ],
        },
      ],
      note: [
        "Buying Remove Ads switches interstitials off permanently. Rewarded video stays available, because it is opt-in and it is how a continue is earned for free.",
      ],
    },
    {
      kind: "checklist",
      heading: "Your choices about advertising",
      intro: ["Android gives you direct control over ad personalisation, independently of us:"],
      items: [
        [
          "Reset your advertising ID: ",
          { b: "Settings → Privacy → Ads → Reset advertising ID" },
          " (the exact path varies by manufacturer)",
        ],
        [
          "Turn off personalised ads with ",
          { b: "Delete advertising ID" },
          " or ",
          { b: "Opt out of Ads Personalisation" },
          " — the game keeps working, and you will still see ads, but they will be less relevant",
        ],
        ["Buy Remove Ads to switch off interstitial advertising in the game entirely"],
      ],
    },
    {
      kind: "deflist",
      heading: "Purchases",
      intro: [
        "Orbitone offers one optional purchase: ",
        { b: "Remove Ads" },
        ", a one-time payment.",
      ],
      items: [
        {
          term: "Google Play handles the payment",
          def: [
            "The transaction happens inside Google Play. We never see your card number, billing address, or any payment detail — we receive only a confirmation that the purchase succeeded.",
          ],
        },
        {
          term: "The entitlement is stored on your device",
          def: [
            "Your purchase is also restorable from your Google account, so reinstalling the game or moving to a new phone does not lose it. Use “Restore purchases” in Settings.",
          ],
        },
      ],
      note: [
        "Google's handling of payment data is governed by the ",
        { link: "Google Payments Privacy Notice", href: "https://payments.google.com/legaldocument?family=0.privacynotice" },
        ".",
      ],
    },
    {
      kind: "checklist",
      heading: "What we do not collect",
      intro: [
        { b: "We do not sell, rent, or trade data to anyone." },
        " Orbitone does not collect:",
      ],
      items: [
        ["Your name, email address, or phone number"],
        ["Account credentials — there is no sign-in"],
        ["Precise or GPS location"],
        ["Contacts, photos, files, messages, or your microphone or camera"],
        ["Any content you create, because the game has none to create"],
      ],
      note: [
        "The game requests no runtime permissions at all, so it will never show you a permission dialog.",
      ],
    },
    {
      kind: "prose",
      heading: "Children's privacy",
      body: [
        [
          "Orbitone is a general-audience arcade game. It is not directed to children under 13, ad requests are not tagged for child-directed treatment, and we do not knowingly collect personal information from children.",
        ],
        [
          "If you believe a child has provided information to us, contact us at the address below and we will act on it. In practice there is nothing for us to hold: the game keeps no personal data and has no account system.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Data retention and security",
      body: [
        [
          "We retain nothing, because we receive nothing. On-device data lives until you clear the app's storage or uninstall it. Data exchanged with Google for ads and purchases is protected in transit with HTTPS/TLS and retained under Google's own policies.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes to this policy",
      body: [
        [
          "We may update this Privacy Policy from time to time. Changes will be posted on this page with a new “Last updated” date. If a change materially affects what data leaves your device — uploading the play telemetry, adding an analytics SDK, or a new ad network — the policy will be updated before that version reaches the store, not after.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about this policy?",
      intro: [
        "If you have any questions about this Privacy Policy or how Orbitone handles data, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "Orbitone (com.cybiqon.orbitone)",
    },
  ],
};

export const orbitoneTerms: LegalDoc = {
  updated: "22 August 2026",
  blocks: [
    {
      kind: "prose",
      heading: "Agreement to terms",
      body: [
        [
          "These Terms of Service (“Terms”) govern your use of ",
          { b: "Orbitone" },
          " (package com.cybiqon.orbitone), an arcade game published by Cybiqon AI Solutions (“we,” “us,” or “our”). By downloading, installing, or playing Orbitone, you agree to these Terms.",
        ],
        ["If you do not agree with any part of these Terms, please do not use the game."],
      ],
    },
    {
      kind: "prose",
      heading: "Licence to use the game",
      body: [
        [
          "We grant you a personal, limited, non-exclusive, non-transferable, revocable licence to install and play Orbitone for your own personal, non-commercial use, subject to these Terms.",
        ],
        [
          "Orbitone is free to download and play in full. Every one of its levels is reachable without paying. Purchases are optional conveniences, not gates.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Stars and in-game items",
      intro: [
        "Orbitone awards ",
        { b: "stars" },
        " for finishing levels well, and stars buy alternative colour palettes.",
      ],
      items: [
        {
          term: "No cash value",
          def: [
            "Stars and unlocked palettes are a licence to use a feature within the game. They are not property, not currency, cannot be exchanged for money, and cannot be transferred, sold, or moved to another account or device.",
          ],
        },
        {
          term: "Earned, never sold",
          def: [
            "Stars are earned by playing and cannot be bought. The only purchase in the game is Remove Ads, and it buys no advantage of any kind.",
          ],
        },
        {
          term: "Balances live on your device",
          def: [
            "There is no cloud save. Clearing the app's storage or uninstalling the game permanently deletes your progress, stars, and palettes, and we cannot restore them.",
          ],
        },
      ],
    },
    {
      kind: "deflist",
      heading: "Purchases and refunds",
      intro: [
        "Orbitone offers one optional purchase: ",
        { b: "Remove Ads" },
        ", a one-time non-consumable payment that switches off interstitial advertising.",
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
            "Remove Ads is tied to your Google account. Use “Restore purchases” in Settings after a reinstall or on a new device. You will not be charged twice.",
          ],
        },
        {
          term: "Rewarded video is unaffected",
          def: [
            "Buying Remove Ads does not take away opt-in rewarded video, because that is how a continue or a step back is earned without paying.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      heading: "Advertising",
      body: [
        [
          "Orbitone is supported by ads served through Google AdMob. Rewarded video is always opt-in, and interstitials appear only between levels — never during a run. What data this involves is set out in our ",
          { link: "Privacy Policy", href: "/products/orbitone/privacy" },
          ".",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "Acceptable use",
      intro: ["You agree that you will not:"],
      items: [
        ["Copy, modify, reverse-engineer, decompile, or attempt to extract the source code of the game"],
        ["Modify saved data, use automation tools, or otherwise manipulate progress, stars, or unlocks"],
        ["Attempt to obtain paid features, or to defeat advertising, by any means other than paying for them"],
        ["Redistribute, resell, or repackage the game or its artwork, level data, audio, or fonts"],
        ["Use the game for any unlawful purpose or in violation of any applicable law"],
      ],
    },
    {
      kind: "deflist",
      heading: "Intellectual property",
      items: [
        {
          term: "Our rights",
          def: [
            "The Orbitone game, its name, logo, artwork, level design, music and sound, and original presentation are owned by Cybiqon AI Solutions and protected by applicable laws. These Terms do not transfer any ownership to you.",
          ],
        },
        {
          term: "Typefaces",
          def: [
            "Orbitone bundles no fonts. It is set in whatever system typeface your device provides, which on Android is normally Roboto.",
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
            "The game is provided “as is” and “as available” without warranties of any kind, express or implied. We do not guarantee that it will be uninterrupted or error-free, or that ads or purchases will always be available.",
          ],
        },
        {
          term: "Loss of progress",
          def: [
            "Because progress is stored only on your device, we cannot recover it if it is lost, and we are not liable for lost progress, stars, or palettes however that loss occurs.",
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
          "We may add, change, suspend, or discontinue features of the game at any time, including levels, rewards, and the difficulty of what is already there — Orbitone's levels are generated from a difficulty curve, and that curve is revised as we learn how the game actually plays. If we introduce any further paid feature, it will be clearly marked before any charge.",
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
        "If you have any questions about these Terms of Service or about Orbitone, please contact us:",
      ],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "Orbitone (com.cybiqon.orbitone)",
    },
  ],
};
