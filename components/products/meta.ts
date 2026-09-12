import type { Metadata } from "next";
import { CATEGORIES, getProduct, productsIn, type Category } from "@/data/products";
import { clampDescription } from "@/lib/seo";

const siteUrl = "https://cybiqon.in";

/**
 * Metadata builders for the concrete /apps/<slug> routes.
 *
 * Why concrete routes rather than one `[slug]` route: Next 16 rejects
 * `export const runtime = "edge"` alongside `generateStaticParams`, and without edge
 * runtime it emits a Node ISR fallback that @cloudflare/next-on-pages refuses to build.
 * Choosing edge would have made these pages render per request — and these are the URLs
 * Google Play points at for two published apps. A static asset cannot 500; an edge
 * function can. So the routes are explicit four-line shims and every page is a static
 * asset. All content and rendering still lives in one place.
 */

export function categoryMetadata(categorySlug: string): Metadata {
  const cat = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!cat) return { title: "Not found" };
  const items = productsIn(cat.key);
  const n = items.length;
  const live = items.filter((p) => p.status === "live").length;
  const noun = n === 1 ? "product" : "products";

  // "built and shipped" was unconditional, which stopped being true the moment a
  // category existed with nothing live in it — /products/extensions would have told
  // Google that MapWit was shipped while the page said "In development".
  const claim =
    live === n
      ? `${n} ${noun} built and shipped by Cybiqon AI Solutions.`
      : live === 0
        ? `${n} ${noun} in development at Cybiqon AI Solutions.`
        : `${n} ${noun} by Cybiqon AI Solutions, ${live} of them live.`;

  return {
    // Title case for a <title>; `label` stays sentence case because it is also the
    // on-page heading, where "Android Apps" would look shouted.
    title: `${cat.label.replace(/\b\w/g, (c) => c.toUpperCase())} We've Built`,
    description: clampDescription(`${cat.blurb} ${claim}`),
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

/** " | Cybiqon" is appended by the root template, so the budget here is 50. */
function title(name: string, tagline: string): string {
  const full = `${name} — ${tagline}`;
  return full.length <= 50 ? full : `${name.split(":")[0]} — ${tagline}`;
}

export function productMetadata(slug: string): Metadata {
  const app = getProduct(slug);
  if (!app) return { title: "App not found" };
  return {
    // Full store name where it fits, short name where it does not. "Lumina: The
    // Lightkeeper's Path — <tagline>" came to 70 with the brand suffix, past the 60
    // Google renders; every other product fits, so this only trims the one that needs
    // it rather than dropping the store subtitle from all seven.
    title: title(app.name, app.tagline),
    description: clampDescription(app.summary),
    alternates: { canonical: `/products/${app.slug}` },
    openGraph: {
      title: `${app.name} — ${app.tagline} | Cybiqon`,
      description: clampDescription(app.summary),
      url: `${siteUrl}/products/${app.slug}`,
      type: "website",
    },
  };
}

// What the product is, for the legal pages' meta description. MapWit made "an Android
// app" wrong for the first time: the Chrome Web Store reviewer reads this page too.
const KIND_NOUN: Record<Category, string> = {
  app: "an Android app",
  game: "an Android game",
  extension: "a Chrome extension",
  tool: "a tool",
};

export function legalMetadata(slug: string, kind: "privacy" | "terms"): Metadata {
  const app = getProduct(slug);
  if (!app) return { title: "Not found" };
  const label = kind === "privacy" ? "Privacy Policy" : "Terms of Service";
  const noun = kind === "privacy" ? "privacy policy" : "terms of service";
  return {
    title: `${label} — ${app.name}`,
    description: `The ${noun} for ${app.name} (${app.packageId}), ${KIND_NOUN[app.category]} by Cybiqon AI Solutions.`,
    alternates: { canonical: `/products/${app.slug}/${kind}` },
  };
}
