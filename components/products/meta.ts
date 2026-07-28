import type { Metadata } from "next";
import { CATEGORIES, getProduct, productsIn } from "@/data/products";

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
  const n = productsIn(cat.key).length;
  return {
    title: `${cat.label} We've Built`,
    description: `${cat.blurb} ${n} ${n === 1 ? "product" : "products"} built and shipped by Cybiqon AI Solutions.`,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

export function productMetadata(slug: string): Metadata {
  const app = getProduct(slug);
  if (!app) return { title: "App not found" };
  return {
    title: `${app.name} — ${app.tagline}`,
    description: app.summary,
    alternates: { canonical: `/products/${app.slug}` },
    openGraph: {
      title: `${app.name} — ${app.tagline} | Cybiqon`,
      description: app.summary,
      url: `${siteUrl}/products/${app.slug}`,
      type: "website",
    },
  };
}

export function legalMetadata(slug: string, kind: "privacy" | "terms"): Metadata {
  const app = getProduct(slug);
  if (!app) return { title: "Not found" };
  const label = kind === "privacy" ? "Privacy Policy" : "Terms of Service";
  const noun = kind === "privacy" ? "privacy policy" : "terms of service";
  return {
    title: `${label} — ${app.name}`,
    description: `The ${noun} for ${app.name} (${app.packageId}), an Android app by Cybiqon AI Solutions.`,
    alternates: { canonical: `/products/${app.slug}/${kind}` },
  };
}
