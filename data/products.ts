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

export type Category = "app" | "extension" | "tool";

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
  packageId: string;
  status: ProductStatus;
  /** Null until the listing is public. */
  playUrl: string | null;
  platform: string;
  /** Short, concrete, no marketing verbs. 4–8 items. */
  features: { title: string; description: string }[];
  /** Why it exists. The part a template would leave out. */
  why: string;
  privacy: LegalDoc;
  terms: LegalDoc;
}

import { llmbytesPrivacy, llmbytesTerms } from "./legal/llmbytes";
import { luminaPrivacy, luminaTerms } from "./legal/lumina";
import { orbitonePrivacy, orbitoneTerms } from "./legal/orbitone";
import { meflowPrivacy, meflowTerms } from "./legal/meflow";
import { vitaloopPrivacy, vitaloopTerms } from "./legal/vitaloop";

export const PRODUCTS: Product[] = [
  {
    slug: "llmbytes",
    category: "app",
    name: "LLMBytes",
    tagline: "AI news, written fresh every day",
    summary:
      "A dark-mode AI news reader. A pipeline watches the channels where AI news actually breaks, researches each story, and writes it up — so you get a daily digest and a short-form feed instead of a timeline. Everything is cached, so it reads fine underground.",
    packageId: "com.cybiqon.llmbytes",
    status: "live",
    playUrl: "https://play.google.com/store/apps/details?id=com.cybiqon.llmbytes",
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
    category: "app",
    name: "MeFlow",
    tagline: "Money, habits and notes in one place",
    summary:
      "An all-in-one personal organiser. Track expenses across multiple accounts, manage tasks and goals, build habits, keep a journal with mood tracking, and write notes — without juggling five separate apps.",
    packageId: "com.cybiqon.meflow",
    status: "live",
    playUrl: "https://play.google.com/store/apps/details?id=com.cybiqon.meflow",
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
    category: "app",
    name: "VitaLoop",
    tagline: "Kidney health, built for Indian food",
    summary:
      "A chronic-kidney-disease tracker for Indian patients, including those on dialysis or living with a transplant. Every food is scored red, amber or green for your CKD stage on sodium, potassium and phosphorus — using Indian food data, not a Western database.",
    packageId: "com.vitaloop.app",
    status: "testing",
    playUrl: null,
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
    category: "app",
    name: "Lumina: The Lightkeeper's Path",
    tagline: "A cosy sliding-block puzzle",
    summary:
      "Slide crystal blocks aside so a glowing Light Key can reach its lantern, and relight a fading world one puzzle at a time. 150 hand-verified levels across five worlds, a new puzzle every day, and no timers, lives or fail states \u2014 you cannot lose, only not have finished yet.",
    packageId: "com.cybiqon.lumina",
    status: "building",
    playUrl: null,
    platform: "Android",
    why:
      "Most puzzle games on Play are built to interrupt you \u2014 energy meters, countdowns, an ad between every level. Lumina is the opposite argument: every level is solvable at your own pace, every one is proven solvable by the solver that generated it, and the reward for playing is watching a world light back up.",
    features: [
      {
        title: "150 levels, every one verified",
        description:
          "Each level is generated and then re-solved by a breadth-first solver, so the three-star target is the true shortest solution \u2014 never a guess that cannot be met.",
      },
      {
        title: "Five worlds, five ideas",
        description:
          "Crystal, sand that crumbles once moved, ice that cannot stop short, rime frozen until the Key thaws it, and mirrors that bend the Key's light to the lantern.",
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
    category: "app",
    name: "Orbitone",
    tagline: "Eight arcade games, one thumb",
    summary:
      "A dot travels round a loop and a tap reverses it \u2014 and then, a hundred levels in, the game changes, and keeps changing seven more times. Eight different verbs across 500 levels, every one of them generated from its number and then played thousands of times by a bot before it ships.",
    packageId: "com.cybiqon.orbitone",
    status: "building",
    playUrl: null,
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
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const productsIn = (category: Category) => PRODUCTS.filter((p) => p.category === category);

/** Categories that actually have something in them — an empty category page is a thin page. */
export const activeCategories = () => CATEGORIES.filter((c) => productsIn(c.key).length > 0);

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "On Google Play",
  testing: "In closed testing",
  building: "In development",
};
