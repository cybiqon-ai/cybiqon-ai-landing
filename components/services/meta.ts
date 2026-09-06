import type { Metadata } from "next";
import { getService } from "@/data/services";

const siteUrl = "https://cybiqon.in";

/**
 * Metadata builder for the seven service routes.
 *
 * The root layout applies the title template "%s | Cybiqon AI Solutions", so a title
 * ending in the brand gets it twice — page titles omit it while openGraph.title, which is
 * not templated, includes it. That trap is recorded in .okf/site/seo.md and has bitten
 * this repo before.
 *
 * These pages have no OG card of their own yet and inherit the site default. Next does not
 * deep-merge openGraph, so `images` has to be restated here or it is silently dropped —
 * which is exactly how eight marketing pages ended up with no og:image at all.
 */
export function serviceMetadata(slug: string): Metadata {
  const s = getService(slug);
  if (!s) return {};

  const description = `${s.tagline} ${s.intro}`.slice(0, 185);

  return {
    title: s.headline,
    description,
    keywords: s.keywords.join(", "),
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${s.headline} | Cybiqon AI Solutions`,
      description,
      url: `${siteUrl}/services/${slug}`,
      type: "website",
      images: [
        {
          url: "/og/home.png",
          width: 1200,
          height: 630,
          alt: `${s.headline} — Cybiqon AI Solutions`,
        },
      ],
    },
  };
}
