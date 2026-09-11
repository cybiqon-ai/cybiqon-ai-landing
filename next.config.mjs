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
      /**
       * 33 /blog posts pruned on 11 Sep 2026, out of 113, after each was read and checked
       * against Search Console. They were duplicates of a stronger post, out of date, or
       * about something the company does not sell, and together drew a small share of the
       * blog's search traffic.
       *
       * The rows are unpublished in D1, not deleted (`published = 0`), so any of these can
       * come back by flipping the flag and dropping its line here.
       *
       * Every one redirects rather than 404s, to the surviving post on the same intent or
       * to the service page it was selling. That keeps the ranking they had, and it keeps
       * the posts that still link to them (the pipeline interlinks aggressively, up to 16
       * inbound links per post) from pointing at nothing.
       */
      { source: "/blog/ai-automation-saves-time-indian-smes", destination: "/blog/ai-automation-for-indian-msmes-2026", permanent: true },
      { source: "/blog/ondc-whatsapp-digital-storefront-msme-india", destination: "/blog/online-store-builder-for-small-business-india", permanent: true },
      { source: "/blog/booking-app-indian-service-business", destination: "/blog/ai-booking-automation-msme-no-shows", permanent: true },
      { source: "/blog/website-analytics-for-indian-msmes", destination: "/services/custom-websites", permanent: true },
      { source: "/blog/ai-onboarding-indian-msmes", destination: "/blog/internal-ai-knowledge-assistant-for-business", permanent: true },
      { source: "/blog/ai-gst-invoice-automation-msme", destination: "/blog/billing-software-for-small-business-india", permanent: true },
      { source: "/blog/online-review-management-ai-msme-india", destination: "/blog/why-your-competitor-shows-up-on-google-local-seo-msme", permanent: true },
      { source: "/blog/msme-repeat-customers-retention-system", destination: "/blog/loyalty-program-app-for-small-business-india", permanent: true },
      { source: "/blog/ai-automation-msme-financial-management", destination: "/blog/accounts-payable-automation-msme-vendor-payments-india", permanent: true },
      { source: "/blog/digital-supply-chain-msme-fy2026", destination: "/blog/indian-msmes-unified-digital-system", permanent: true },
      { source: "/blog/ai-powered-sales-pipeline-small-business", destination: "/blog/crm-software-for-small-business-india", permanent: true },
      { source: "/blog/website-24x7-salesperson-msme-lead-generation", destination: "/services/custom-websites", permanent: true },
      { source: "/blog/social-media-dm-automation-msme-crm", destination: "/blog/msme-lead-tracking-follow-up-automation", permanent: true },
      { source: "/blog/ai-social-media-automation-msme-india", destination: "/blog/msme-lead-tracking-follow-up-automation", permanent: true },
      { source: "/blog/why-indian-msmes-are-losing-repeat-customers-email-automation", destination: "/blog/loyalty-program-app-for-small-business-india", permanent: true },
      { source: "/blog/ai-personalization-d2c-india-conversions", destination: "/blog/whatsapp-abandoned-cart-recovery-indian-d2c", permanent: true },
      { source: "/blog/generic-ai-tools-fail-msmes-custom-automation", destination: "/blog/ai-automation-for-indian-msmes-2026", permanent: true },
      { source: "/blog/whatsapp-ai-chatbot-for-indian-msmes", destination: "/blog/whatsapp-automation-for-indian-msmes", permanent: true },
      { source: "/blog/progressive-web-apps-for-indian-msmes", destination: "/services/android-apps", permanent: true },
      { source: "/blog/website-speed-optimization-indian-msme-sales", destination: "/services/custom-websites", permanent: true },
      { source: "/blog/ai-hyperlocal-delivery-msmes-india", destination: "/services/android-apps", permanent: true },
      { source: "/blog/why-your-competitor-is-outranking-you-with-video", destination: "/blog/why-your-competitor-shows-up-on-google-local-seo-msme", permanent: true },
      { source: "/blog/upi-transaction-data-business-intelligence-msme", destination: "/blog/indian-msmes-unified-digital-system", permanent: true },
      { source: "/blog/quotation-automation-msme-close-more-deals", destination: "/blog/crm-software-for-small-business-india", permanent: true },
      { source: "/blog/protect-business-fake-websites-impersonation-india", destination: "/blog/stop-fake-domains-using-company-name-india", permanent: true },
      { source: "/blog/gst-2-automated-billing-einvoice-sync", destination: "/blog/billing-software-for-small-business-india", permanent: true },
      { source: "/blog/export-ready-website-for-indian-msmes", destination: "/blog/msme-global-digital-presence-export-ready", permanent: true },
      { source: "/blog/ai-resume-screening-small-business-india", destination: "/services/ai-agents", permanent: true },
      { source: "/blog/international-msme-day-2026-india", destination: "/blog/recover-delayed-payments-msmes-india", permanent: true },
      { source: "/blog/treds-invoice-discounting-msme-india", destination: "/blog/cpse-msme-treds-mandatory-payment-india", permanent: true },
      { source: "/blog/google-business-profile-optimization-india", destination: "/blog/why-your-competitor-shows-up-on-google-local-seo-msme", permanent: true },
      { source: "/blog/seo-services-for-small-business-india", destination: "/blog/website-cost-for-small-business-india", permanent: true },
      { source: "/blog/schema-markup-for-local-business-india", destination: "/blog/why-your-competitor-shows-up-on-google-local-seo-msme", permanent: true },
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
