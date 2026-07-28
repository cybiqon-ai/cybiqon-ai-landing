import type { LegalDoc } from "../products";

/**
 * VitaLoop had NO privacy policy or terms — `ProfileModal.tsx` pointed at
 * https://vitaloop.app/privacy, a domain that resolves to nothing. That is a hard Play
 * Console blocker for a health app, which is why these exist.
 *
 * Written against what the code ACTUALLY does, verified in the VitaLoop repo:
 *   - @react-native-firebase/{auth,firestore,messaging,storage} — and nothing else
 *   - NO analytics, NO Crashlytics, NO Sentry, NO advertising SDK
 *   - services/aiChatService.ts is still fully mocked, so no health data reaches any
 *     model. That is a genuine, checkable claim and worth stating plainly.
 *   - Camera is used only by components/food/BarcodeScanner.tsx
 *
 * TWO THINGS THE FOUNDER MUST RESOLVE BEFORE THIS BACKS A PLAY SUBMISSION:
 *   1. `android.permission.RECORD_AUDIO` is declared in app.json but NOTHING in the
 *      codebase records audio. An unjustified microphone permission on a health app
 *      invites rejection. Remove it from app.json, or this policy has to describe it.
 *   2. The Firestore region is not declared anywhere in the repo, so no region claim is
 *      made below. MeFlow states asia-south2 (Delhi). Confirm VitaLoop's and add it —
 *      data residency is a question health-app users genuinely ask.
 *
 * This is a good-faith description of the software, not legal advice. Have it reviewed.
 */

export const vitaloopPrivacy: LegalDoc = {
  updated: "27 July 2026",
  blocks: [
    {
      kind: "prose",
      body: [
        [
          "This Privacy Policy explains how ",
          { b: "Cybiqon" },
          ' ("we", "us", "our") collects, uses and protects your information when you use the ',
          { b: "VitaLoop" },
          ' mobile application ("VitaLoop", the "App").',
        ],
        [
          "VitaLoop records information about your health. We treat that as the most sensitive category of data we hold, and the App is built to collect as little of it as possible while still being useful.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "Quick summary",
      items: [
        [
          "VitaLoop is a kidney-health tracker. It stores the health information you choose to enter.",
        ],
        [
          "Your data lives in ",
          { b: "your own private account" },
          " on Google Firebase. It is never sold, never shared with advertisers, and never used for marketing.",
        ],
        [
          "There is ",
          { b: "no analytics SDK, no crash-reporting SDK and no advertising SDK" },
          " in this app.",
        ],
        [
          "Your health data is ",
          { b: "not sent to any AI model" },
          ". The in-app assistant is rule-based and runs on your device.",
        ],
        ["You can delete any entry, or your entire account, from inside the App."],
      ],
    },
    {
      kind: "deflist",
      heading: "1. Information we collect",
      items: [
        {
          term: "Account information",
          def: [
            "Your email address and, if you choose to provide one, a display name. Authentication is handled by Google Firebase Authentication; if you sign up with a password we never see it in plain text.",
          ],
        },
        {
          term: "Health information you enter",
          def: [
            "Your CKD stage and relevant clinical values such as eGFR where you enter them. Food and fluid logs, medications and doses, tablet counts and refill dates, dialysis sessions, laboratory results, weight, symptoms and sleep check-ins. This is the substance of the App and it is entered by you.",
          ],
        },
        {
          term: "Device information",
          def: [
            "A push-notification token so reminders can reach your device, and basic device and app-version information needed to deliver the right build. We do not build an advertising profile.",
          ],
        },
      ],
      note: [
        { b: "What we do not collect." },
        " We do not collect your location. We do not read your contacts, photos, SMS or call logs. We do not use an advertising identifier. We do not run analytics or crash-reporting SDKs. We do not sell or rent your data to anyone, for any purpose.",
      ],
    },
    {
      kind: "checklist",
      heading: "2. How we use your information",
      items: [
        [
          "To show you your own logs, trends and nutrient totals — the core purpose of the App.",
        ],
        [
          "To score foods against thresholds for your CKD stage, and to warn you about salt substitutes and phosphorus additives.",
        ],
        ["To send the medication, refill and check-in reminders you have configured."],
        ["To keep your data in sync across your devices and available offline."],
        ["To respond to you if you contact support."],
      ],
      note: [
        "We do not use your health data for advertising, profiling, or research, and we do not use it to train any model.",
      ],
    },
    {
      kind: "prose",
      heading: "3. The in-app assistant does not see your data",
      body: [
        [
          "VitaLoop shows nutrient warnings and food scores using ",
          { b: "deterministic, rule-based logic that runs on your device" },
          " against published thresholds. It is not a language model, and no part of your health record is transmitted to any AI provider.",
        ],
        [
          "This is deliberate. A model that answers fluently but is occasionally wrong about potassium is not a safe thing to put between a kidney patient and their dinner. If that ever changes, this policy will be updated before the feature ships, and the change will be described plainly.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "4. How your data is stored and protected",
      items: [
        [
          "Your records are stored in ",
          { b: "Google Cloud Firestore" },
          ", within a private area of the database scoped to your account.",
        ],
        ["Authentication is handled by ", { b: "Google Firebase Authentication" }, "."],
        ["All data is transmitted over HTTPS/TLS."],
        [
          "Firestore security rules are written so that only you, as the authenticated owner, can read or write your records.",
        ],
        [
          "Some data is cached on your device so the App works without a connection. Clearing the App's storage or uninstalling removes that local copy.",
        ],
      ],
      note: [
        "No system is perfectly secure. If we become aware of a breach affecting your personal information, we will notify you and the relevant authorities as required by applicable law.",
      ],
    },
    {
      kind: "table",
      heading: "5. Third-party services",
      intro: [
        "VitaLoop uses a deliberately small set of services, all from Google. They process data on our behalf under their own privacy policies.",
      ],
      columns: ["Provider", "What it does", "Privacy policy"],
      rows: [
        [
          ["Google Firebase Authentication"],
          ["Sign-up, sign-in and password reset"],
          [{ link: "firebase.google.com/support/privacy", href: "https://firebase.google.com/support/privacy" }],
        ],
        [
          ["Google Cloud Firestore"],
          ["Stores your records and keeps them in sync"],
          [{ link: "cloud.google.com/terms/cloud-privacy-notice", href: "https://cloud.google.com/terms/cloud-privacy-notice" }],
        ],
        [
          ["Firebase Cloud Messaging"],
          ["Delivers push notifications to your device"],
          [{ link: "firebase.google.com/support/privacy", href: "https://firebase.google.com/support/privacy" }],
        ],
        [
          ["Firebase Storage"],
          ["Stores documents you choose to attach to your record"],
          [{ link: "firebase.google.com/support/privacy", href: "https://firebase.google.com/support/privacy" }],
        ],
        [
          ["Open Food Facts"],
          ["Looks up a scanned barcode. The barcode is sent; nothing about you is."],
          [{ link: "openfoodfacts.org/privacy", href: "https://world.openfoodfacts.org/privacy" }],
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "6. Permissions the App requests",
      items: [
        {
          term: "Camera",
          def: [
            "Used only to scan a product barcode when you tap Scan. Images are processed on your device to read the barcode and are neither stored nor uploaded.",
          ],
        },
        {
          term: "Notifications",
          def: ["To deliver the medication, refill and check-in reminders you set up."],
        },
        {
          term: "Schedule exact alarms",
          def: [
            "To fire medication reminders at the time you chose. Late is not useful for a dose schedule.",
          ],
        },
        {
          term: "Run at startup",
          def: ["To restore your reminder schedule after the device restarts."],
        },
      ],
      note: [
        "You can revoke any permission from your device settings. Revoking the camera permission disables barcode scanning only; you can still search and log foods by name.",
      ],
    },
    {
      kind: "deflist",
      heading: "7. Your rights",
      items: [
        { term: "Access", def: ["Every record the App holds about you is visible inside the App."] },
        { term: "Correction", def: ["Edit or delete any individual entry at any time."] },
        {
          term: "Deletion",
          def: [
            "Delete your account from inside the App. This removes your records from our active database.",
          ],
        },
        {
          term: "Withdraw consent",
          def: ["Sign out, disable notifications, or uninstall the App at any time."],
        },
        {
          term: "Other rights",
          def: [
            "Email ",
            { link: "support@cybiqon.in", href: "mailto:support@cybiqon.in" },
            " to exercise rights under laws such as India's DPDP Act, GDPR or UK GDPR. We respond to verified requests within 30 days.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      heading: "8. Data retention",
      body: [
        [
          "Your records are kept for as long as your account exists. When you delete your account, your health records are removed from our active database. Backups are rotated on a 30-day cycle and deleted data is removed from backups within that window.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "9. Children",
      body: [
        [
          "VitaLoop is intended for adults managing their own kidney health, or for a caregiver managing it on behalf of someone in their care. It is not directed at children under 13. If you believe a child has provided us with personal data, contact ",
          { link: "support@cybiqon.in", href: "mailto:support@cybiqon.in" },
          " and we will delete it.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "10. VitaLoop is not medical advice",
      body: [
        [
          "VitaLoop is a tracking and information tool. It does not diagnose, treat or prescribe, and it is ",
          { b: "not a substitute for your nephrologist, dietitian or any other clinician" },
          ".",
        ],
        [
          "Food scores and nutrient thresholds are general guidance derived from published sources. Your own targets may differ, and only your care team can set them. Never change a medication, a fluid limit or a diet on the basis of this App alone.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "11. Changes to this policy",
      body: [
        [
          'We may update this policy. When we do, the "Last updated" date above changes and, for material changes — particularly any change to what we collect or who processes it — we will notify you in the App before it takes effect.',
        ],
      ],
    },
    {
      kind: "contact",
      heading: "12. Contact us",
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "VitaLoop (com.vitaloop.app)",
    },
  ],
};

export const vitaloopTerms: LegalDoc = {
  updated: "27 July 2026",
  blocks: [
    {
      kind: "prose",
      body: [
        [
          "These Terms of Service govern your use of ",
          { b: "VitaLoop" },
          ", a mobile application owned and operated by ",
          { b: "Cybiqon" },
          ". By installing or using VitaLoop you agree to them. If you do not agree, please do not use the App.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "1. VitaLoop is not a medical device",
      body: [
        [
          "This is the most important term here. VitaLoop is a ",
          { b: "personal tracking and information tool" },
          ". It is not a medical device, it does not diagnose or treat any condition, and it does not replace professional medical care.",
        ],
        [
          "Food scores, nutrient thresholds and fluid limits shown in the App are general guidance based on published sources for the CKD stage you selected. Your clinician may set different targets, and theirs take precedence. ",
          { b: "Never start, stop or change a medication, fluid limit or diet based on this App alone." },
        ],
        [
          "If you are having a medical emergency, contact your local emergency service. Do not use this App for that.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "2. Accuracy of information",
      body: [
        [
          "Nutrient values come from public food-composition databases including IFCT, INDB, USDA and Open Food Facts, and from product labels. These sources contain errors, products get reformulated, and portion sizes vary. We make a genuine effort to keep the data accurate and we cannot guarantee that any individual value is correct.",
        ],
        [
          "Barcode results in particular come from a community-maintained database and should be sanity-checked against the label in your hand.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "3. Using the App",
      body: [
        [
          "VitaLoop is for your personal use, or for use by a caregiver on behalf of someone in their care. You are responsible for the accuracy of what you enter and for keeping your account credentials secure. You must be at least 13 years old, or the minimum age in your jurisdiction, to create an account.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "4. What you may not do",
      intro: ["You agree not to:"],
      items: [
        ["Use the App for any unlawful purpose."],
        ["Attempt to access another person's account or records."],
        ["Reverse-engineer, decompile or extract the source code of the App."],
        ["Interfere with or place undue load on our infrastructure."],
        [
          "Present output from this App as clinical advice to another person, or use it to make decisions on someone else's behalf without their knowledge.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "5. Your data",
      body: [
        [
          "The health records you enter remain yours. We claim no ownership. We store and sync them so the App can show them back to you, as described in the Privacy Policy. We do not sell them, and we do not use them to train models.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "6. Availability",
      body: [
        [
          "We may add, change or remove features, and the service may be unavailable during maintenance or for reasons outside our control. Because people rely on this App for medication reminders, you should not treat it as your only safeguard — keep a backup method for anything time-critical.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "7. Disclaimer and limitation of liability",
      body: [
        [
          "VitaLoop is provided ",
          { b: '"as is"' },
          " and ",
          { b: '"as available"' },
          ", without warranties of any kind, express or implied.",
        ],
        [
          "To the maximum extent permitted by law, Cybiqon is not liable for any indirect, incidental, special or consequential damages, or for any loss of data, arising from your use of the App. Nothing in these terms limits liability that cannot lawfully be limited.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "8. Termination",
      body: [
        [
          "You may delete your account at any time from inside the App. We may suspend an account that breaches these terms. On termination your data is handled as set out in the Privacy Policy.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "9. Changes",
      body: [
        [
          'We may revise these terms. The "Last updated" date above will change, and for material changes we will notify you in the App before they take effect.',
        ],
      ],
    },
    {
      kind: "contact",
      heading: "10. Contact",
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "VitaLoop (com.vitaloop.app)",
    },
  ],
};
