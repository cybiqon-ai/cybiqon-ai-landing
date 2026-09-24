/**
 * The app catalogue — one record per thing Cybiqon has shipped or is shipping.
 *
 * This file holds STRUCTURE and CONTENT only. No Tailwind class names: they would be
 * purged unless `./data/**` stays in the content globs (it is, deliberately — but a data
 * file is the wrong place for styling regardless).
 *
 * Legal copy lives in `data/legal/*.ts` as structured blocks rather than JSX or markdown.
 * Reasons, in order: (1) it renders identically for all three apps from one route,
 * (2) no `dangerouslySetInnerHTML`, so there is no injection surface in legally-material
 * copy, (3) MDX would mean a new toolchain on a Cloudflare Pages build for three documents.
 */

export type Inline =
  | string
  | { b: string }
  | { link: string; href: string };

export type Block =
  | { kind: "prose"; heading?: string; body: Inline[][] }
  // `items` is a list of items, each of which is a run of inline nodes — hence Inline[][].
  | { kind: "checklist"; heading?: string; intro?: Inline[]; items: Inline[][]; note?: Inline[] }
  | { kind: "deflist"; heading?: string; intro?: Inline[]; items: { term: string; def: Inline[] }[]; note?: Inline[] }
  | { kind: "table"; heading?: string; intro?: Inline[]; columns: string[]; rows: Inline[][][] }
  | { kind: "contact"; heading?: string; intro?: Inline[]; email: string; phone: string; app: string };

export interface LegalDoc {
  /** Human-readable, shown verbatim. Changing it is a legal act, not a formatting one. */
  updated: string;
  blocks: Block[];
}

export type ProductStatus = "live" | "testing" | "building";

export type Category = "app" | "game" | "extension" | "tool";

/**
 * Category pages live at /products/<category slug>, but PRODUCT pages stay flat at
 * /products/<slug>. That split is deliberate: a category is a view, and a view should
 * never own an item's URL. llmbytes' privacy page is a live Play Store policy URL, and
 * it should move exactly once — not again the day something gets recategorised.
 */
export const CATEGORIES: { key: Category; slug: string; label: string; blurb: string }[] = [
  {
    key: "app",
    slug: "apps",
    label: "Android apps",
    blurb: "Published on Google Play, or on the way there.",
  },
  // Games were filed under "app" until three of them existed, at which point the category
  // stopped describing anything: a CKD tracker and a one-thumb arcade game share a store
  // and nothing else. They are split because a reader scanning for one is never scanning
  // for the other — not because the build differs.
  {
    key: "game",
    slug: "games",
    label: "Android games",
    blurb: "Built engine-first, and every level measured before it ships.",
  },
  {
    key: "extension",
    slug: "extensions",
    label: "Chrome extensions",
    blurb: "Small tools that live in the browser you already use all day.",
  },
  { key: "tool", slug: "tools", label: "Tools", blurb: "Everything else we've built and kept." },
];

/** Reserved by the category pages — no product may use one of these as its slug. */
export const RESERVED_SLUGS = new Set(CATEGORIES.map((c) => c.slug));

export interface Product {
  slug: string;
  category: Category;
  /** Display name, cased as the store lists it. */
  name: string;
  /** One line. Shown in the catalogue row — keep it under ~40 chars. */
  tagline: string;
  /** Two or three sentences. Shown on the app page. */
  summary: string;
  /** The store's own identifier — a Play package name, or a Chrome Web Store extension ID. */
  packageId: string;
  status: ProductStatus;
  /**
   * The public store listing, or null until there is one. Which store is implied by the
   * category — see `STORE`. Was `playUrl` until MapWit went live on the Chrome Web Store
   * on 14 Sep 2026, the first listing that was not on Play.
   */
  storeUrl: string | null;
  /**
   * 128x128 WebP in public/img/, or null where no icon has been drawn.
   *
   * Added 6 Sep 2026. Until then this catalogue of seven products carried no visual
   * representation of any of them anywhere on the site — the homepage could only ever
   * describe them in prose. These are the real launcher icons, copied out of each
   * product's own repo and downsized; nothing here is generated art.
   */
  icon?: string | null;
  /**
   * Phone screenshots in public/img/shots/, 360px wide WebP.
   *
   * Only where real captures exist. MeFlow's only capture holds the founder's actual
   * personal finance data and VitaLoop has none at all, so both are absent rather than
   * padded — a gallery with a placeholder in it is worse than no gallery.
   */
  shots?: string[];
  platform: string;
  /** Short, concrete, no marketing verbs. 4–8 items. */
  features: { title: string; description: string }[];
  /** Why it exists. The part a template would leave out. */
  why: string;
  /**
   * Absent until there is a listing to attach one to. A store requires a published
   * policy and an unlisted product has nowhere to publish it, so the routes, the
   * on-page links and the sitemap entries are all conditional on these existing —
   * inventing legally-material copy to fill a type is worse than leaving it out.
   */
  privacy?: LegalDoc;
  terms?: LegalDoc;
}

import { llmbytesPrivacy, llmbytesTerms } from "./legal/llmbytes";
import { luminaPrivacy, luminaTerms } from "./legal/lumina";
import { orbitonePrivacy, orbitoneTerms } from "./legal/orbitone";
import { chitrayatraPrivacy, chitrayatraTerms } from "./legal/chitrayatra";
import { meflowPrivacy, meflowTerms } from "./legal/meflow";
import { vitaloopPrivacy, vitaloopTerms } from "./legal/vitaloop";
import { mapwitPrivacy, mapwitTerms } from "./legal/mapwit";
import { pageArcadePrivacy, pageArcadeTerms } from "./legal/page-arcade";

export const PRODUCTS: Product[] = [
  {
    slug: "llmbytes",
    icon: "/img/icon-llmbytes.webp",
    shots: ["/img/shots/llmbytes-1.webp", "/img/shots/llmbytes-2.webp", "/img/shots/llmbytes-3.webp"],
    category: "app",
    name: "LLMBytes",
    tagline: "AI news, written fresh every day",
    summary:
      "A dark-mode AI news reader. A pipeline watches the channels where AI news actually breaks, researches each story, and writes it up — so you get a daily digest and a short-form feed instead of a timeline. Everything is cached, so it reads fine underground.",
    packageId: "com.cybiqon.llmbytes",
    status: "live",
    storeUrl: "https://play.google.com/store/apps/details?id=com.cybiqon.llmbytes",
    platform: "Android",
    why:
      "AI news breaks on Telegram and X hours before it reaches a publication, and then arrives as a firehose. LLMBytes exists to do the reading for you: one digest a day, written from the source rather than rewritten from someone else's rewrite.",
    features: [
      {
        title: "A daily digest",
        description:
          "Today's Bytes — short items you can read in a couple of minutes, plus one longer piece if the day earned it.",
      },
      {
        title: "Written, not aggregated",
        description:
          "Each story is researched and written rather than scraped, with the original sources linked so you can check the claim.",
      },
      {
        title: "Browse by category",
        description: "Models, research, robotics, policy, industry, ethics, computing and startups.",
      },
      {
        title: "Reads offline",
        description:
          "Articles are cached on your device, so the feed works on the metro or anywhere else the signal doesn't.",
      },
      {
        title: "Bookmarks and search",
        description: "Save anything worth returning to, and search everything you've read.",
      },
      {
        title: "No account needed",
        description:
          "No sign-in, no email, no profile. Install it and read — there is nothing to delete later.",
      },
    ],
    privacy: llmbytesPrivacy,
    terms: llmbytesTerms,
  },
  {
    slug: "meflow",
    icon: "/img/icon-meflow.webp",
    category: "app",
    name: "MeFlow",
    tagline: "Money, habits and notes in one place",
    summary:
      "An all-in-one personal organiser. Track expenses across multiple accounts, manage tasks and goals, build habits, keep a journal with mood tracking, and write notes — without juggling five separate apps.",
    packageId: "com.cybiqon.meflow",
    status: "live",
    storeUrl: "https://play.google.com/store/apps/details?id=com.cybiqon.meflow",
    platform: "Android",
    why:
      "Most people end up with an expense tracker, a to-do list, a habit tracker, a journal and a notes app — five apps that never talk to each other. MeFlow is the argument that one calm app beats five good ones.",
    features: [
      {
        title: "Expenses and budgets",
        description:
          "Multiple accounts, categories, recurring entries and budgets, with charts that show where the month actually went.",
      },
      {
        title: "Tasks, goals and habits",
        description:
          "To-dos, quarterly goals with milestones, daily routines and streaks — in the same place as everything else.",
      },
      {
        title: "Journal with mood tracking",
        description:
          "Write an entry, tag how the day felt, and see the pattern over weeks rather than guessing at it.",
      },
      {
        title: "Notes and sticky notes",
        description: "Folders, tags and quick capture for the things that do not fit anywhere else.",
      },
      {
        title: "Borrow, lend and wishlist",
        description:
          "Track what you have lent out and what you are saving for, so neither lives only in your head.",
      },
      {
        title: "Private by default",
        description:
          "PIN and biometric app lock, data stored in your own account in the Delhi region, never sold.",
      },
    ],
    privacy: meflowPrivacy,
    terms: meflowTerms,
  },
  {
    slug: "vitaloop",
    icon: "/img/icon-vitaloop.webp",
    category: "app",
    name: "VitaLoop",
    tagline: "Kidney health, built for Indian food",
    summary:
      "A chronic-kidney-disease tracker for Indian patients, including those on dialysis or living with a transplant. Every food is scored red, amber or green for your CKD stage on sodium, potassium and phosphorus — using Indian food data, not a Western database.",
    packageId: "com.vitaloop.app",
    status: "testing",
    storeUrl: null,
    platform: "Android",
    why:
      "Every kidney-diet app runs on the USDA food database, which is close to useless for dal, roti and sabzi. None of them warn about salt substitutes — marketed as the healthy choice, and dangerous for this group because they are potassium chloride. VitaLoop exists for those two gaps.",
    features: [
      {
        title: "Renal-aware food logging",
        description:
          "Search an Indian food database or scan a barcode. Each food is scored for your stage on sodium, potassium and phosphorus.",
      },
      {
        title: "Salt-substitute warnings",
        description:
          "Low-sodium salt is potassium chloride. For a kidney that cannot clear potassium, that is a cardiac risk — so the app says so.",
      },
      {
        title: "Hidden phosphorus additives",
        description:
          "Additive phosphorus absorbs far more readily than natural phosphorus and is often not itemised on labels. Flagged where we can detect it.",
      },
      {
        title: "Fluid tracking",
        description: "A daily fluid cap set from your stage, with what is left shown at a glance.",
      },
      {
        title: "Medications and refills",
        description: "Reminders, tablet counts and low-stock alerts, so a refill never arrives late.",
      },
      {
        title: "Dialysis, labs and symptoms",
        description:
          "Sessions, lab results, weight, symptoms and sleep in one timeline you can show a nephrologist.",
      },
    ],
    privacy: vitaloopPrivacy,
    terms: vitaloopTerms,
  },
  {
    slug: "lumina",
    icon: "/img/icon-lumina.webp",
    shots: ["/img/shots/lumina-1.webp", "/img/shots/lumina-2.webp", "/img/shots/lumina-3.webp"],
    category: "game",
    name: "Lumina: The Lightkeeper's Path",
    tagline: "A cosy sliding-block puzzle",
    summary:
      "Slide crystal blocks aside so a glowing Light Key can reach its lantern, and relight a fading world one puzzle at a time. 300 hand-verified levels across ten worlds, a new puzzle every day, and no timers, lives or fail states \u2014 you cannot lose, only not have finished yet.",
    packageId: "com.cybiqon.lumina",
    status: "live",
    storeUrl: "https://play.google.com/store/apps/details?id=com.cybiqon.lumina",
    platform: "Android",
    why:
      "Most puzzle games on Play are built to interrupt you \u2014 energy meters, countdowns, an ad between every level. Lumina is the opposite argument: every level is solvable at your own pace, every one is proven solvable by the solver that generated it, and the reward for playing is watching a world light back up.",
    features: [
      {
        title: "300 levels, every one verified",
        description:
          "Each level is generated and then re-solved by a breadth-first solver, so the three-star target is the true shortest solution \u2014 never a guess that cannot be met.",
      },
      {
        title: "Ten worlds, ten ideas",
        description:
          "Crystal, sand that crumbles once moved, ice that cannot stop short, rime frozen until the Key thaws it, and mirrors that bend the Key's light to the lantern \u2014 each world introducing one more.",
      },
      {
        title: "A new puzzle every day",
        description:
          "One daily puzzle with its own streak and rewards, drawn from a pool separate from the campaign so it never spoils a level you have not reached.",
      },
      {
        title: "It teaches you the rules",
        description:
          "Each world opens with a small board that solves itself, showing what the new piece does rather than describing it.",
      },
      {
        title: "No fail states",
        description:
          "No lives, no energy, no countdown. Undo anything, reset anything, and take as long as you like \u2014 stars are a target, not a pass mark.",
      },
      {
        title: "Plays offline",
        description:
          "Every level ships inside the app. No account, no sign-in, and nothing to sync.",
      },
    ],
    privacy: luminaPrivacy,
    terms: luminaTerms,
  },
  {
    slug: "orbitone",
    icon: "/img/icon-orbitone.webp",
    shots: ["/img/shots/orbitone-1.webp", "/img/shots/orbitone-2.webp", "/img/shots/orbitone-3.webp"],
    category: "game",
    name: "Orbitone",
    tagline: "Eight arcade games, one thumb",
    summary:
      "A dot travels round a loop and a tap reverses it \u2014 and then, a hundred levels in, the game changes, and keeps changing seven more times. Eight different verbs across 500 levels, every one of them generated from its number and then played thousands of times by a bot before it ships.",
    packageId: "com.cybiqon.orbitone",
    status: "live",
    storeUrl: "https://play.google.com/store/apps/details?id=com.cybiqon.orbitone",
    platform: "Android",
    why:
      "Endless runners get harder; they do not get different. Orbitone's answer is to change the verb rather than the speed \u2014 eight games sharing one thumb, one shape language and one melody, so that reaching level 300 means having learned six things rather than having got faster at one.",
    features: [
      {
        title: "Eight verbs, not eight skins",
        description:
          "Orbit, Ascent, Corridor, Lattice, Lane, Radial, Drag and Rhythm. Each has its own rule, its own input and its own way to lose.",
      },
      {
        title: "Every level is played before it ships",
        description:
          "No hand-placed levels and no difficulty guesswork. Each of the 500 is generated from its number, then played thousands of times by bots built on a human model \u2014 reaction delay, an unsteady thumb, dropped inputs \u2014 and re-tuned until it sits where the curve says it should.",
      },
      {
        title: "Twelve shapes, and five ways to bend them",
        description:
          "The loop becomes an ellipse, a star, a gear, a wave, a rose. Then it turns while you are on it, breathes, drifts, and finally morphs into something else underneath you.",
      },
      {
        title: "It notices when you are stuck",
        description:
          "Die enough times on one level and the game quietly offers a shorter version of it. Take it or leave it \u2014 an eased clear cannot earn three stars.",
      },
      {
        title: "One thumb, portrait, no buttons",
        description:
          "Nothing needs two hands and nothing needs a fast one. Every verb asks when, not how fast.",
      },
      {
        title: "Plays offline",
        description:
          "No account, no sign-in, nothing to sync. Every level is generated on the device, and nothing you do is uploaded anywhere.",
      },
    ],
    privacy: orbitonePrivacy,
    terms: orbitoneTerms,
  },
  {
    // Was "curvved" until 17 Sep 2026: the game was rebuilt as stained glass and
    // renamed, with a new package. /products/curvved/* redirects here
    // (next.config.mjs), because its privacy URL had been registered with Play.
    slug: "chitrayatra",
    icon: "/img/icon-chitrayatra.webp",
    shots: [
      "/img/shots/chitrayatra-1.webp",
      "/img/shots/chitrayatra-2.webp",
      "/img/shots/chitrayatra-3.webp",
    ],
    category: "game",
    name: "ChitraYatra",
    tagline: "A journey of pictures, in glass",
    summary:
      "A calm puzzle of stained glass. Each window is a drawing from an Indian art tradition \u2014 a kolam, a jaali, a Madhubani fish pair \u2014 cut into hexagonal panes; turn, trade or carry them home until the lead lines meet and each closed shape lights. Choose windows state by state from a map of India, or shelf by shelf from the gallery. No timer, no score, no ads.",
    packageId: "com.cybiqon.chitrayatra",
    status: "building",
    storeUrl: null,
    platform: "Android",
    why:
      "The first version, Curvved, was a lattice of curves whose solved board only approximated its drawing. The owner said twice that the two did not match, so the mechanic was rebuilt until the solved board is the drawing itself: the panes are cut from the picture, and a finished window is the art, not a grid that resembles it. Everything else followed from treating each window as something worth keeping.",
    features: [
      {
        title: "A window for every state",
        description:
          "A map of India opens each state and union territory's own art: kolam from Tamil Nadu, pookalam from Kerala, mandana from Rajasthan, Phulkari from Punjab and more \u2014 145 windows free.",
      },
      {
        title: "Four ways to play every window",
        description:
          "Turn panes in place, carry them home from a tray, trade two at a time, or turn whole flowers of seven. Each is taught once, by a hand, the first time.",
      },
      {
        title: "Difficulty that builds",
        description:
          "After the first window, five gentle ones open with only some panes out of place, so a new player is never dropped into a full scramble.",
      },
      {
        title: "Artisan: scenes of India",
        description:
          "A second game of painted scenes \u2014 Hampi at dusk, the tea hills of Munnar \u2014 cut into pieces that join as they meet. 54, 77 or 126 pieces.",
      },
      {
        title: "The board alone",
        description:
          "While you play, the controls step aside and the window is all there is; a tap brings them back, and a finished window brings everything back.",
      },
      {
        title: "Every window proven before it ships",
        description:
          "The game's own solver checks that each window has exactly one arrangement, so finishing it means you made the picture.",
      },
      {
        title: "No ads, no account",
        description:
          "Every window and scene is free. Optional purchases add Solve it for me, finishes and moving backgrounds, and packs of new windows \u2014 nothing free is ever moved behind one.",
      },
    ],
    privacy: chitrayatraPrivacy,
    terms: chitrayatraTerms,
  },
  {
    slug: "mapwit",
    icon: "/img/icon-mapwit.webp",
    category: "extension",
    name: "MapWit",
    tagline: "Google Maps leads, scored in the browser",
    summary:
      "A Chrome side panel that reads Google Maps results as you scroll, finds each business\u2019s contact email, grades the website it has or notices it has none, scores the lead and exports the lot to a spreadsheet. There is no server and no account: leads stay in your browser, and the only requests it makes are to the businesses\u2019 own websites and, if you ask for review analysis, to the AI model you choose.",
    packageId: "pdpjbbgabmnoncnlkalmffgahpdihllc",
    status: "live",
    // The ID-only form: the store redirects it to whatever slug the current listing name
    // produces, so renaming the listing cannot break this link.
    storeUrl: "https://chromewebstore.google.com/detail/pdpjbbgabmnoncnlkalmffgahpdihllc",
    platform: "Chrome, Manifest V3",
    why:
      "A bought lead list is rows somebody else has already sold twice. The businesses actually worth calling are the ones already visible on Maps with no website or a bad one, and the only way to know which those are is to look at each one. MapWit does the looking \u2014 it reads the listings you are scrolling past anyway, checks whether a site exists and whether it is any good, and puts the ones worth a call at the top.",
    features: [
      {
        title: "It reads what you scroll",
        description:
          "Leads fill the side panel live as you scroll a Maps search, and Load more auto-scrolls the feed for you, up to 500 listings.",
      },
      {
        title: "Enrichment, not just names",
        description:
          "For every lead with a site it finds contact emails, grades the site and detects social presence \u2014 the columns that decide whether a business is worth a call, rather than the ones that were easy to collect.",
      },
      {
        title: "No website only",
        description:
          "The one filter a web studio actually needs. Narrow five hundred listings to the businesses with nothing to lose, then search by name or category for the ones you already know how to serve.",
      },
      {
        title: "Duplicates merge themselves",
        description:
          "Listings sharing a Google place ID or a phone number are merged on sight, with the first non-empty value winning, so a second pass over the same area adds rows instead of repeating them.",
      },
      {
        title: "Exports to Excel or CSV",
        description:
          "Every enrichment column comes with it, so the file opens in whatever you already use to work a list — a spreadsheet, a CRM import, Google Sheets — rather than in this extension.",
      },
      {
        title: "Reads the reviews, and says who answers them",
        description:
          "Deep scan keeps the reviews Maps shows first, with their stars and whether the business replied. Ask for analysis and the model you choose names the recurring complaints — the sort of gap a pitch can open with.",
      },
      {
        title: "No backend, and it remembers",
        description:
          "There is no server and no sign-in. Leads persist in the browser\u2019s own storage between sessions, so closing the tab does not cost you the morning\u2019s work.",
      },
    ],
    privacy: mapwitPrivacy,
    terms: mapwitTerms,
  },
  {
    slug: "page-arcade",
    icon: "/img/icon-page-arcade.webp",
    category: "extension",
    name: "Page Arcade",
    tagline: "The page you're reading is the level",
    summary:
      "Click the icon on any web page and it freezes into a game level: eight arcade games played with that page\u2019s own words, gaps and pictures. Snake threads the empty space, the words fall as invaders, every word becomes a brick, and when you leave, the page is exactly as it was.",
    packageId: "inefhhclfkojgjjncaajopdhbabjkfbf",
    status: "live",
    // ID-only form, like MapWit: the store redirects it to whatever slug the listing name
    // currently produces, so renaming the listing cannot break this link.
    storeUrl: "https://chromewebstore.google.com/detail/inefhhclfkojgjjncaajopdhbabjkfbf",
    platform: "Chrome, Manifest V3",
    why:
      "Browser games that use the page you are on go back at least to the Kick Ass bookmarklet, and most do the same thing: fly over the page and shoot it. Page Arcade asks what else a page could be. Its whitespace is a maze, its headings are bosses, its images are steel. Each game reads the actual layout, so no two pages play the same, and a long Wikipedia article is a different level from a news homepage.",
    features: [
      {
        title: "Eight games, one page",
        description:
          "Snake, Word Blaster, Type Storm, Brickout, Whack-a-Word, Page Roller, Gravity Crumble and Page Chomp, all built from the same frozen screenshot.",
      },
      {
        title: "The layout is the level",
        description:
          "The empty space is found pixel by pixel, so Snake and Page Chomp use the page\u2019s real gaps as corridors and never die on a wall you cannot see.",
      },
      {
        title: "Tall levels",
        description:
          "Snake, Page Chomp and Page Roller can stitch several screens of a long page into one level, with a camera that follows you down it.",
      },
      {
        title: "Nothing on the page changes",
        description:
          "It plays on a picture of the page. Press Esc and the page, and your scroll position, are exactly as they were.",
      },
      {
        title: "Progress, skins and a share card",
        description:
          "XP, achievements and unlockable skins, plus a picture of the wrecked page to copy or save when a game ends.",
      },
      {
        title: "God mode, for exploring",
        description:
          "Type iddqd on the game menu and nothing can kill you in any game until you leave: Snake slides through text, ghosts pass through you, bombs and dropped balls cost nothing. Type it again to turn it off. Scores from god-mode runs never reach the leaderboards.",
      },
      {
        title: "Online only if you ask",
        description:
          "No site access until you click. Site leaderboards and share links are optional and off by default, and scores send the site\u2019s hostname, never the page address.",
      },
    ],
    privacy: pageArcadePrivacy,
    terms: pageArcadeTerms,
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const productsIn = (category: Category) => PRODUCTS.filter((p) => p.category === category);

/** Categories that actually have something in them — an empty category page is a thin page. */
export const activeCategories = () => CATEGORIES.filter((c) => productsIn(c.key).length > 0);

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  testing: "In closed testing",
  building: "In development",
};

/**
 * Where each category publishes. `live` used to read "On Google Play" unconditionally,
 * which was true of every live product until MapWit, and would have labelled a Chrome
 * extension as a Play app on the day it launched.
 */
export const STORE: Record<Category, { name: string; idLabel: string } | null> = {
  app: { name: "Google Play", idLabel: "Package" },
  game: { name: "Google Play", idLabel: "Package" },
  extension: { name: "Chrome Web Store", idLabel: "Extension ID" },
  tool: null,
};

/** "On Google Play" / "On Chrome Web Store" when live in a store, else the plain status. */
export const statusLabel = (p: Product) => {
  const store = STORE[p.category];
  return p.status === "live" && store ? `On ${store.name}` : STATUS_LABEL[p.status];
};
