import type { LegalDoc } from "../products";

/**
 * Page Arcade's Chrome Web Store policy documents.
 *
 * Written from the extension's source as of v1.0.0 (products/extensions/page-arcade),
 * and every retention claim below is enforced by code there, not just promised:
 *
 *   1. Share images expire after 30 days — an R2 lifecycle rule on page-arcade-shares.
 *   2. The hashed-IP share rate entries are deleted after 24 hours — SHARE_LOG_KEEP_MS in
 *      worker/src/shares.ts.
 *   3. Used score tokens are deleted after an hour — TOKEN_KEEP_MS in worker/src/store.ts.
 *   4. No per-request log — `invocation_logs: false` in worker/wrangler.jsonc.
 *
 * Unlike MapWit, Page Arcade has a server of ours (api.cybiqon.in), but only the two
 * opt-in features talk to it. The Chrome Web Store "Privacy practices" answers live in the
 * extension repo at store/listing.md and must change together with this file.
 */

const UPDATED = "18 September 2026";
const PRODUCT = "Page Arcade (Chrome extension)";

export const pageArcadePrivacy: LegalDoc = {
  updated: UPDATED,
  blocks: [
    {
      kind: "prose",
      heading: "About this policy",
      body: [
        [
          "This Privacy Policy applies to ",
          { b: "Page Arcade" },
          ", a Chrome extension published by Cybiqon AI Solutions LLP (“we,” “us,” or “our”). Page Arcade turns the web page you are reading into a game level: its words, empty space and pictures become the thing you play with.",
        ],
        [
          { b: "Page Arcade does nothing on a page until you click its icon" },
          " (or press its shortcut) on that tab. The picture of the page stays on your computer unless you ask for a share link and confirm the upload. Scores are posted to the public leaderboards only if you turn that on. There are no ads, no analytics and no tracking across websites.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "What happens when you play",
      body: [
        [
          "When you click the icon, Chrome lets the extension take a screenshot of the visible part of that one tab and read where the words, images and other elements on it are. That is how the page becomes a level. The screenshot and everything read from the page are kept in memory, used only to run the game, and discarded when you leave (press Esc or close the tab).",
        ],
        [
          "If you resize the window, scroll on the menu, or turn on tall levels, the extension takes further screenshots of the same tab for the same purpose, and scrolls the page back to where it was when you leave. It never changes the page's content, and it cannot see pages you have not clicked it on.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "Data stored only in your browser",
      intro: [
        "Page Arcade keeps the following in Chrome's extension storage on your computer. It is ",
        { b: "never sent to us" },
        ":",
      ],
      items: [
        {
          term: "Settings",
          def: ["Sound, volume, screen shake, reduced motion, tall levels, whether posting scores is on, and your nickname."],
        },
        {
          term: "Scores and progress",
          def: [
            "Your best score and stars for each game on each site, identified by the site's hostname (for example en.wikipedia.org); experience points, achievements, equipped skins and totals; and the hostnames of up to 500 sites you have played on.",
          ],
        },
        {
          term: "A random player ID",
          def: ["Created the first time it is needed. It is not linked to your name, email or Google account."],
        },
      ],
      note: ["Removing the extension deletes all of it."],
    },
    {
      kind: "table",
      heading: "Sent to our server, only if you choose",
      intro: [
        "Our server is api.cybiqon.in, which runs on Cloudflare. Only two optional features use it, and the default for both is off.",
      ],
      columns: ["Feature", "When", "What is sent", "How long it is kept"],
      rows: [
        [
          [{ b: "Site leaderboards" }],
          ["Only after you turn on “Post scores to site boards” in Settings and choose a nickname."],
          [
            "The site's hostname (never the page address), the game, your score and how long the game took, your nickname, and your random player ID.",
          ],
          [
            "Kept so the weekly and all-time boards work. Your nickname and score are public on that site's board. Ask us to delete them at any time.",
          ],
        ],
        [
          [{ b: "Share links" }],
          ["Only when you press Get link on a result card and then confirm Upload."],
          [
            "The share picture you are shown before uploading — ",
            { b: "which includes the page as it looked when you played" },
            " — plus the game, the result title, score, stars and the site's hostname.",
          ],
          [
            "Public to anyone who has the link, not listed in search engines, and deleted automatically after 30 days.",
          ],
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Please don't share private pages",
      body: [
        [
          "A share picture shows the page you played on. Do not create share links on pages that show private information, such as email, chats or account pages. The extension warns you about this before every upload.",
        ],
      ],
    },
    {
      kind: "deflist",
      heading: "What the server keeps to stop abuse",
      items: [
        {
          term: "Share link limits",
          def: [
            "To limit how many share links one connection can create, the server stores a one-way, keyed hash of your IP address — not the address itself — for up to 24 hours.",
          ],
        },
        {
          term: "Leaderboard tokens",
          def: [
            "Each game gets a short-lived signed token so the same game cannot be posted twice. Used tokens are kept for up to one hour.",
          ],
        },
        {
          term: "Logs",
          def: ["The server keeps error logs (the request path and the error) only, not a log of every request."],
        },
      ],
      note: [
        "The server runs on Cloudflare Workers, D1 and R2, which process requests on our behalf. Like any web host, Cloudflare necessarily sees connection details such as your IP address while handling a request. See the ",
        { link: "Cloudflare Privacy Policy", href: "https://www.cloudflare.com/privacypolicy/" },
        ".",
      ],
    },
    {
      kind: "table",
      heading: "Permissions Page Arcade asks for",
      columns: ["Permission", "Why"],
      rows: [
        [["activeTab"], ["Takes the screenshot of the tab you clicked the icon on, and nothing else. Access ends when that tab navigates away."]],
        [["scripting"], ["Starts the game in that tab, in response to your click only."]],
        [["storage"], ["Keeps your settings, scores and progress in the browser."]],
        [["api.cybiqon.in"], ["Posts scores and uploads share links, only when you use those features."]],
      ],
    },
    {
      kind: "checklist",
      heading: "What we do not do",
      intro: [{ b: "We do not sell, rent, or trade data to anyone." }, " Page Arcade does not:"],
      items: [
        ["Collect your browsing history, the addresses of pages you play on, or their content — except inside a share picture you chose to upload"],
        ["Include analytics, crash reporting, advertising or tracking code"],
        ["Run code downloaded from the internet"],
        ["Use any data for creditworthiness, lending or any purpose unrelated to the game features above"],
      ],
      note: [
        "Page Arcade's use of information complies with the ",
        {
          link: "Chrome Web Store User Data Policy",
          href: "https://developer.chrome.com/docs/webstore/program-policies/user-data-faq",
        },
        ", including the Limited Use requirements.",
      ],
    },
    {
      kind: "prose",
      heading: "Your choices and deleting data",
      body: [
        [
          "Leave posting scores off (the default), or turn it off in Settings at any time; scores already posted stay on the boards until deleted. Don't use share links, or let them expire after 30 days.",
        ],
        [
          "To delete posted scores or a share link sooner, email support@cybiqon.in with your nickname and the site, or with the share link. We will delete them within 30 days.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Children",
      body: [
        [
          "Page Arcade is not directed at children under 13, and we do not knowingly collect personal information from them. Nicknames should not contain real names.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Changes to this policy",
      body: [
        [
          "Changes will be posted on this page with a new “Last updated” date. If a change affects what data leaves your browser, this policy will be updated before that version is published to the Chrome Web Store, not after.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about this policy?",
      intro: ["If you have any questions about this Privacy Policy or how Page Arcade handles data, please contact us:"],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: PRODUCT,
    },
  ],
};

export const pageArcadeTerms: LegalDoc = {
  updated: UPDATED,
  blocks: [
    {
      kind: "prose",
      heading: "Agreement to terms",
      body: [
        [
          "These Terms of Service (“Terms”) govern your use of ",
          { b: "Page Arcade" },
          ", a Chrome extension published by Cybiqon AI Solutions LLP (“we,” “us,” or “our”), and of its leaderboards and share links. By installing or using Page Arcade, you agree to these Terms. If you do not agree, please do not use the extension.",
        ],
      ],
    },
    {
      kind: "prose",
      heading: "Licence",
      body: [
        [
          "We grant you a limited, non-exclusive, non-transferable, revocable licence to install and use Page Arcade for your own entertainment, subject to these Terms. Page Arcade is currently free.",
        ],
      ],
    },
    {
      kind: "checklist",
      heading: "Your responsibilities",
      intro: ["You agree that you will:"],
      items: [
        ["Not choose a nickname that is offensive, impersonates someone, or contains a real person's name or contact details"],
        [
          "Only create share links for pages you are entitled to share, and never for pages showing private information about you or anyone else",
        ],
        ["Not post scores you did not earn by playing, or automate, flood or otherwise interfere with the leaderboards or share links"],
        ["Not attempt to reverse-engineer, resell or repackage Page Arcade"],
      ],
    },
    {
      kind: "deflist",
      heading: "Leaderboards and share links",
      items: [
        {
          term: "Public by design",
          def: [
            "Nicknames and scores you post appear on that site's public board. A share link is public to anyone who has it until it expires after 30 days.",
          ],
        },
        {
          term: "Moderation",
          def: [
            "We may remove any score, nickname or share link, and block its use, at our discretion — for example if it breaks these Terms or someone reports it. Report a problem to support@cybiqon.in.",
          ],
        },
        {
          term: "Not affiliated with the sites you play on",
          def: [
            "Page Arcade plays on pictures of other people's web pages. It is not made, endorsed or supported by those websites, and their content and trademarks belong to their owners.",
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
            "Page Arcade is provided “as is” and “as available” without warranties of any kind. Web pages vary without limit, so some will make poor or unplayable levels, and the leaderboards and share links may be unavailable, reset or discontinued.",
          ],
        },
        {
          term: "Your progress",
          def: [
            "Scores, progress and settings are stored only in your browser. We cannot recover them if they are lost.",
          ],
        },
        {
          term: "Limitation of liability",
          def: [
            "To the maximum extent permitted by law, Cybiqon AI Solutions LLP will not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, Page Arcade. Where liability cannot be excluded, it is limited to the amount you have paid us for Page Arcade in the preceding twelve months.",
          ],
        },
      ],
    },
    {
      kind: "prose",
      heading: "Changes and termination",
      body: [
        [
          "We may change, suspend or discontinue Page Arcade or any feature of it at any time. If a paid plan is ever introduced, it will be clearly marked before any charge. You may stop using Page Arcade at any time by removing it from Chrome.",
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
          "We may update these Terms from time to time. Changes will be posted on this page with a new “Last updated” date. Continued use of Page Arcade after changes constitutes acceptance.",
        ],
      ],
    },
    {
      kind: "contact",
      heading: "Questions about these terms?",
      intro: ["If you have any questions about these Terms of Service or about Page Arcade, please contact us:"],
      email: "support@cybiqon.in",
      phone: "+91 92507 11473",
      app: PRODUCT,
    },
  ],
};
