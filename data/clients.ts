/**
 * Client engagements — work done for somebody else.
 *
 * Separate from `data/products.ts` on purpose. A product has a store listing, a package
 * id and a published privacy policy; an engagement has a client, a scope and a delivery
 * state, and forcing one shape onto the other would mean inventing fields for both.
 *
 * Two rules this file exists to keep honest:
 *
 * 1. `status` is what is true today, not what was promised. The company's recorded
 *    failure mode is starting things, so a build that is finished but undeployed says
 *    so rather than rounding up to "live".
 * 2. A client is named only where we have the right to name them. `unnamed` carries the
 *    reason, and it is rendered — a portfolio entry that quietly omits who it was for is
 *    less trustworthy than one that says why it cannot.
 */

import type { ProductStatus } from "./products";

export interface ClientProject {
  slug: string;
  /** Display name, or a description of the work where the client is not named. */
  name: string;
  /** One line. Shown in the index row — keep it under ~45 chars. */
  tagline: string;
  /** Two or three sentences. */
  summary: string;
  status: ProductStatus;
  /** Null when there is nothing public to link, which is the normal case for client work. */
  url: string | null;
  /** Concrete deliverables. No marketing verbs. */
  work: string[];
  /** Present when the client is not named, and says why. Rendered, not just documented. */
  unnamed?: string;
}

export const CLIENT_PROJECTS: ClientProject[] = [
  {
    slug: "lead-enrichment-platform",
    name: "A B2B lead-enrichment platform",
    tagline: "Live, and the client is not ours to name",
    summary:
      "Ongoing engineering on a business-to-business lead-enrichment product: the pipeline that takes a raw company or contact record, resolves it against several sources, removes the duplicates that resolution creates, and hands back something a sales team can work. It is in production and under active development.",
    status: "live",
    url: null,
    work: [
      "Enrichment pipeline work — resolving a record against multiple sources and reconciling what they disagree about",
      "Deduplication, including the in-flight case where two enrichments of the same record are running at once",
      "Backend services in Python, and the test coverage that lets the above be changed safely",
    ],
    unnamed:
      "The client's repositories are private and the product is theirs to announce, so the work is described and they are not named. If you want a reference, ask and we will ask them.",
  },
  {
    slug: "snackly",
    name: "Snackly",
    tagline: "D2C dry fruits store, with its own admin panel",
    summary:
      "An Indian direct-to-consumer dry fruits, nuts and seeds store — storefront and a custom admin panel, built to run entirely inside Cloudflare's free tier so the business carries no hosting bill. Designed against the client's own nine-section requirements document.",
    status: "building",
    url: null,
    work: [
      "Storefront — Next.js static export served by Cloudflare Workers, 39 pages",
      "Custom admin panel covering all nine sections the client asked for, behind Cloudflare Access",
      "Hono API on Workers with D1 and R2, and 179 tests that run against a real database rather than a mock",
      "A costed scope response, a design system, and an audit of the two reference sites' actual CSS rather than a guess at it",
    ],
  },
];
