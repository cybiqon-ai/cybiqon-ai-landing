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

export type AppStatus = "live" | "testing" | "building";

export interface AppRecord {
  slug: string;
  /** Display name, cased as the store lists it. */
  name: string;
  /** One line. Shown in the catalogue row — keep it under ~40 chars. */
  tagline: string;
  /** Two or three sentences. Shown on the app page. */
  summary: string;
  packageId: string;
  status: AppStatus;
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
import { meflowPrivacy, meflowTerms } from "./legal/meflow";
import { vitaloopPrivacy, vitaloopTerms } from "./legal/vitaloop";

export const APPS: AppRecord[] = [
  {
    slug: "llmbytes",
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
];

export const getApp = (slug: string) => APPS.find((a) => a.slug === slug);

export const STATUS_LABEL: Record<AppStatus, string> = {
  live: "On Google Play",
  testing: "In closed testing",
  building: "In development",
};
