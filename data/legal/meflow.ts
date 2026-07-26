import type { LegalDoc } from "../products";

/**
 * Migrated from MeFlow/hosting/privacy.html (436 lines) and
 * MeFlow/src/pages/TermsOfService.tsx, which were the live documents.
 *
 * The wording is carried across verbatim wherever it was already correct. Where it was
 * split across HTML tags mid-sentence, it has been rejoined — that is a formatting fix,
 * not a legal edit. Nothing has been added, removed or softened.
 */

export const meflowPrivacy: LegalDoc = {
  updated: "27 April 2026",
  blocks: [
    {
      kind: "prose",
      body: [
        [
          "This Privacy Policy explains how ",
          { b: "Cybiqon" },
          ' ("we", "us", "our") collects, uses, and protects your information when you use the ',
          { b: "MeFlow" },
          ' mobile application ("MeFlow", the "App"). MeFlow is owned and operated by Cybiqon.',
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "Quick summary",
      items: [
        [
          "MeFlow is a personal productivity app (expenses, tasks, habits, goals, journal, notes) developed by Cybiqon.",
        ],
        [
          "Your data is stored in your private account on Google Firebase and is ",
          { b: "not sold to anyone, ever" },
          ".",
        ],
        [
          "We collect the minimum needed to run the app: account info, the content you create, and basic technical/diagnostic data.",
        ],
        [
          "You can export, edit, and permanently delete your data at any time from inside the app, or by emailing us.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "1. Information we collect",
      items: [
        {
          term: "Account information",
          def: [
            "Email address and display name (or, for Google Sign-In, the email and name returned by Google). An encrypted password hash — only if you sign up with email and password, managed by Google Firebase Authentication; we never see your raw password. An optional profile photo URL.",
          ],
        },
        {
          term: "Content you create in the app",
          def: [
            "Expenses, income records, accounts, categories and budgets. Tasks, to-dos, goals, milestones, routines, habits and side quests. Notes, sticky notes, folders and tags. Journal entries and mood logs. Reminders, achievements, wishlist items and app preferences. This content is private to your account and is not visible to other users.",
          ],
        },
        {
          term: "Device and diagnostic information",
          def: [
            "Device type, OS version, app version and language, used to diagnose issues and target updates. Crash reports and non-fatal error logs via Firebase Crashlytics, when enabled. Anonymous usage events used in aggregate to improve the app. Approximate timestamps for sync.",
          ],
        },
      ],
      note: [
        { b: "What we do not collect." },
        " We do not collect your precise location. We do not access your contacts, photos, microphone, camera, SMS or call logs. We do not collect financial-account credentials — expenses you enter are typed by you, and we never connect to your bank. We do not use your content to train AI models. We do not sell or rent your personal data to third parties.",
      ],
    },
    {
      kind: "table",
      heading: "2. How we use your information",
      columns: ["Purpose", "What we use", "Legal basis"],
      rows: [
        [
          ["Provide the App's core features (sync, log in, store your entries)"],
          ["Account info, content you create"],
          ["Performance of contract"],
        ],
        [
          ["Send local and push notifications you have configured"],
          ["Reminder schedules you set"],
          ["Performance of contract"],
        ],
        [["Detect crashes and fix bugs"], ["Diagnostic data, crash logs"], ["Legitimate interest"]],
        [
          ["Understand which features are used so we can improve them"],
          ["Aggregated, anonymous usage events"],
          ["Legitimate interest"],
        ],
        [
          ["Prevent abuse, fraud and security incidents"],
          ["Authentication metadata"],
          ["Legitimate interest / legal obligation"],
        ],
        [
          ["Respond to your support requests"],
          ["Email, account ID, message you send us"],
          ["Legitimate interest"],
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "3. How your data is stored and protected",
      items: [
        [
          "Your content is stored in ",
          { b: "Google Cloud Firestore" },
          " in the ",
          { b: "asia-south2" },
          " region (Delhi, India).",
        ],
        ["Authentication is handled by ", { b: "Google Firebase Authentication" }, "."],
        ["All data is transmitted over HTTPS/TLS."],
        [
          "Firestore security rules ensure that only you, the authenticated owner, can read or write your data.",
        ],
        [
          "You can enable ",
          { b: "biometric app lock" },
          " (fingerprint or face) inside the app for an additional on-device layer of protection.",
        ],
      ],
      note: [
        "No system is perfectly secure. If we ever become aware of a data breach affecting your personal information, we will notify you and the relevant authorities as required by applicable law.",
      ],
    },
    {
      kind: "table",
      heading: "4. Third-party services we use",
      intro: [
        "MeFlow uses a small number of trusted third-party services, all provided by Google. These providers process limited data on our behalf and are bound by their own privacy policies.",
      ],
      columns: ["Provider", "What it does", "Privacy policy"],
      rows: [
        [
          ["Google Firebase Authentication"],
          ["Sign-up, sign-in, password reset"],
          [{ link: "firebase.google.com/support/privacy", href: "https://firebase.google.com/support/privacy" }],
        ],
        [
          ["Google Cloud Firestore"],
          ["Stores your account content and sync state"],
          [{ link: "cloud.google.com/terms/cloud-privacy-notice", href: "https://cloud.google.com/terms/cloud-privacy-notice" }],
        ],
        [
          ["Firebase Crashlytics (optional)"],
          ["Reports crashes so we can fix them"],
          [{ link: "firebase.google.com/support/privacy", href: "https://firebase.google.com/support/privacy" }],
        ],
        [
          ["Google Sign-In (optional)"],
          ["Lets you sign in with your Google account"],
          [{ link: "policies.google.com/privacy", href: "https://policies.google.com/privacy" }],
        ],
        [
          ["Google Play Services"],
          ["Push notifications and app delivery"],
          [{ link: "policies.google.com/privacy", href: "https://policies.google.com/privacy" }],
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "5. Data sharing and disclosure",
      intro: ["We do not sell your personal data. We share data only in these limited situations:"],
      items: [
        {
          term: "Service providers",
          def: ["Listed in section 4, strictly to operate the App."],
        },
        {
          term: "Legal requests",
          def: [
            "When we are legally required to comply with a valid court order, subpoena, or government request under applicable law.",
          ],
        },
        {
          term: "Business transfers",
          def: [
            "In the event Cybiqon is acquired or merged. You will be notified before your data is transferred and becomes subject to a different privacy policy.",
          ],
        },
        {
          term: "To protect rights and safety",
          def: ["Where necessary to investigate fraud, abuse, or threats to users."],
        },
      ],
    },
    {
      kind: "prose",
      heading: "6. International data transfers",
      body: [
        [
          "Your data is primarily stored in India (Google Cloud ",
          { b: "asia-south2" },
          "). Some of our service providers, such as Google, may process limited diagnostic data in other countries. Where such transfers happen, they rely on safeguards required by applicable law, such as Standard Contractual Clauses.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "7. Data retention",
      items: [
        ["Account and content data is kept as long as your account exists."],
        [
          "If you delete your account, all personal content is removed from our active databases immediately.",
        ],
        [
          "Backups are rotated on a ",
          { b: "30-day cycle" },
          "; deleted data is fully removed from backups within that window.",
        ],
        [
          "Firebase Authentication may retain hashed identifiers for up to ",
          { b: "30 days" },
          " after deletion to prevent abuse.",
        ],
        [
          "Anonymous, aggregated analytics, which cannot identify you, may be retained indefinitely.",
        ],
        [
          "Records we are legally required to retain (fraud investigation, tax, and similar) are kept only for the legally mandated period.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "8. Your rights and choices",
      intro: ["You have the following rights with respect to your personal data:"],
      items: [
        { term: "Access and export", def: ["View and export your data from inside the App."] },
        { term: "Correction", def: ["Edit any entry directly in the App."] },
        {
          term: "Deletion",
          def: ["Delete individual entries, or delete your entire account from inside the App."],
        },
        {
          term: "Withdraw consent",
          def: ["Sign out, disable notifications, or uninstall the App at any time."],
        },
        {
          term: "Object or restrict processing",
          def: [
            "Email ",
            { link: "support@cybiqon.in", href: "mailto:support@cybiqon.in" },
            " to exercise rights granted by laws such as GDPR, UK GDPR, India's DPDP Act, or applicable U.S. state privacy laws including CCPA and CPRA.",
          ],
        },
        {
          term: "Lodge a complaint",
          def: ["You may complain to your local data protection authority."],
        },
      ],
      note: ["We respond to verified requests within 30 days."],
    },
    {
      kind: "prose",
      heading: "9. Children's privacy",
      body: [
        [
          "MeFlow is not directed at children under 13, or the equivalent minimum age in your jurisdiction, and we do not knowingly collect personal data from them. If you believe a child has provided us with personal data, please contact us at ",
          { link: "support@cybiqon.in", href: "mailto:support@cybiqon.in" },
          " and we will delete it.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "10. Permissions used by the App",
      intro: ["MeFlow may request the following Android permissions:"],
      items: [
        { term: "Internet", def: ["To sync your data with Firebase."] },
        {
          term: "Notifications (POST_NOTIFICATIONS)",
          def: ["To deliver reminders you have configured."],
        },
        { term: "Schedule exact alarms", def: ["To fire reminders on time."] },
        { term: "Biometric / use fingerprint", def: ["To support the optional app lock."] },
        {
          term: "Receive boot completed",
          def: ["To restore reminder schedules after the device restarts."],
        },
      ],
      note: [
        "Each permission is used only for the feature described above. You can revoke any permission from your device's system settings.",
      ],
    },
    {
      kind: "prose",
      heading: "11. Changes to this policy",
      body: [
        [
          'We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page and, for material changes, notify you in the App or via email before the change takes effect.',
        ],
      ],
    },
    {
      kind: "contact",
      heading: "12. Contact us",
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "MeFlow (com.cybiqon.meflow)",
    },
  ],
};

export const meflowTerms: LegalDoc = {
  updated: "27 April 2026",
  blocks: [
    {
      kind: "prose",
      body: [
        [
          "These Terms of Service govern your use of ",
          { b: "MeFlow" },
          ", a mobile application owned and operated by ",
          { b: "Cybiqon" },
          ". By downloading, installing or using MeFlow, you agree to these terms. If you do not agree, please do not use the App.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "1. Using MeFlow",
      body: [
        [
          "MeFlow is provided for your personal, non-commercial use. You are responsible for the accuracy of the information you enter and for keeping your account credentials secure. You must be at least 13 years old, or the minimum age in your jurisdiction, to create an account.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "2. What you may not do",
      intro: ["You agree not to:"],
      items: [
        ["Use the App for any unlawful purpose, or in breach of any applicable regulation."],
        ["Attempt to gain unauthorised access to another user's account or to our systems."],
        ["Reverse-engineer, decompile or attempt to extract the source code of the App."],
        ["Interfere with, disrupt or place undue load on our infrastructure."],
        ["Resell, sublicense or redistribute the App or any part of it."],
      ],
    },
    {
      kind: "prose",
      heading: "3. Your content",
      body: [
        [
          "Everything you enter into MeFlow — your expenses, tasks, notes, journal entries and the rest — remains yours. We claim no ownership over it. You grant us only the limited permission needed to store, sync and display that content back to you across your devices.",
        ],
        [
          "You are responsible for maintaining your own copies of anything important. Export is available from inside the App.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "4. Availability and changes",
      body: [
        [
          "We may add, change or remove features, and we may suspend the service for maintenance. We will try to give notice of material changes, but the App is provided without any guarantee of uninterrupted availability.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "5. Disclaimer",
      body: [
        [
          "MeFlow is provided ",
          { b: '"as is"' },
          " and ",
          { b: '"as available"' },
          ", without warranties of any kind, whether express or implied. MeFlow is a personal organiser. It is not financial, tax, legal or medical advice, and it should not be relied on as such.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "6. Limitation of liability",
      body: [
        [
          "To the maximum extent permitted by law, Cybiqon is not liable for any indirect, incidental, special or consequential damages, or for any loss of data, profits or revenue, arising out of your use of the App.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "7. Termination",
      body: [
        [
          "You may stop using MeFlow and delete your account at any time from inside the App. We may suspend or terminate an account that breaches these terms. On termination, your data is handled as described in the Privacy Policy.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "8. Changes to these terms",
      body: [
        [
          'We may revise these terms. When we do, we will update the "Last updated" date above and, for material changes, notify you in the App before they take effect. Continuing to use MeFlow after a change means you accept the revised terms.',
        ],
      ],
    },
    {
      kind: "contact",
      heading: "9. Contact",
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: "MeFlow (com.cybiqon.meflow)",
    },
  ],
};
