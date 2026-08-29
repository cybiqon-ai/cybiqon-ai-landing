/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },

  /**
   * /apps/* moved to /products/* when the catalogue grew past Android apps.
   *
   * These redirects are NOT optional cleanup. https://cybiqon.in/apps/llmbytes/privacy is
   * the privacy-policy URL registered with Google Play for a published app (see
   * ai-news-app/PLAY_DATA_SAFETY.md) and it returns 200 on production today. Without a
   * redirect, moving the page breaks a live store listing.
   *
   * Permanent (308) because the move is permanent, which also passes ranking signals to
   * the new URLs rather than stranding them.
   *
   * Still update Play Console to the new URL. A redirect keeps the link working; it does
   * not make the console stop pointing at a path we no longer serve directly.
   */
  async redirects() {
    return [
      /**
       * /our-works was removed on 29 Aug 2026. It showed five sample builds that were
       * never client work, and one of them — the Chrome extension — no longer exists.
       * Real products and real engagements now live at /products, so the page was
       * deleted rather than corrected.
       *
       * It was the highest-priority static URL in the sitemap (0.85) and had been live
       * since launch, so it redirects rather than 404s: whatever ranking it had passes
       * to the page that replaced it, and any inbound link still lands somewhere.
       */
      { source: "/our-works", destination: "/products", permanent: true },
      { source: "/apps", destination: "/products", permanent: true },
      { source: "/apps/:slug", destination: "/products/:slug", permanent: true },
      {
        source: "/apps/:slug/:doc(privacy|terms)",
        destination: "/products/:slug/:doc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
