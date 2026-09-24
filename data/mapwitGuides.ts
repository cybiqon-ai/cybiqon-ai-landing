import { PRODUCTS } from "./products";

/**
 * The MapWit guides at /products/mapwit/guides/<slug>.
 *
 * Why they exist, and why they are not blog posts. `/blog` is written for Indian
 * businesses that have outgrown spreadsheets and every topic there has to lead to one of
 * the seven services; `/lab` is first-party engineering notes. A practical guide aimed at
 * whoever is prospecting on Google Maps, anywhere, fits neither — so it sits with the
 * product it is about. Static pages, like /tools/website-cost-calculator: a route handler
 * would cost ~100 KiB of a Worker with ~167 KiB left.
 *
 * **Each guide's target query passed `tools/social-media-manager/demand_check.py` before
 * it was written**, and the target is recorded here so the next person can re-check it
 * rather than trust it. The two targets an outside suggestion proposed —
 * "google maps lead generation chrome extension" and "google maps leads for web
 * designers" — are absent because neither returns itself in Google autocomplete, in India
 * or the US.
 *
 * Adding one: append below, write `app/products/mapwit/guides/<slug>/page.tsx`, then
 * register the route in `app/sitemap.ts` and `data/llms.config.json` or the build fails.
 */

export type MapwitGuide = {
  slug: string;
  /** The h1. Written to be read. */
  title: string;
  /** The <title>. Written to be searched. Same split as /lab. */
  seoTitle: string;
  excerpt: string;
  /** The query this page is for, as checked by demand_check.py. */
  target: string;
  /** ISO date, for the visible byline and the Article schema. */
  published: string;
  /** ISO date of the last substantive revision, or null if never revised. */
  updated: string | null;
  /** Other guides worth reading next; slugs from this file. */
  related: string[];
};

export const MAPWIT_STORE_URL = PRODUCTS.find((p) => p.slug === "mapwit")!.storeUrl!;

export const MAPWIT_GUIDES: MapwitGuide[] = [
  {
    slug: "find-businesses-without-websites",
    title: "How to find businesses without websites",
    seoTitle: "How to Find Businesses Without Websites, Free",
    excerpt:
      "A business on Google Maps with no website is the clearest sales signal on the map. Here is how to find them for free, how to check the ones that only look website-less, and what the list is actually worth once you have it.",
    target: "how to find businesses without websites for free",
    published: "2026-09-22",
    updated: "2026-09-24",
    related: ["google-maps-lead-generation"],
  },
  {
    slug: "google-maps-lead-generation",
    title: "Google Maps lead generation, honestly",
    seoTitle: "Google Maps Lead Generation: The Honest Guide",
    excerpt:
      "Every guide to Google Maps lead generation is published by someone selling a tool. This one compares all four ways of doing it, says what a Maps listing does not contain, and quotes the rules that decide what you may do with the result.",
    target: "google maps lead generation",
    published: "2026-09-24",
    updated: null,
    related: ["find-businesses-without-websites"],
  },
];

export const guideBySlug = (slug: string): MapwitGuide | undefined =>
  MAPWIT_GUIDES.find((g) => g.slug === slug);

export const guidePath = (slug: string): string => `/products/mapwit/guides/${slug}`;
