/**
 * GA4 custom events.
 *
 * Until now the site fired exactly one gtag call — the `config` in app/layout.tsx —
 * so pageviews were measured and nothing else was. No conversion on this site could
 * be attributed to the page that produced it.
 *
 * This is the smallest thing that fixes that for /lab. It is deliberately generic so
 * the audit form, the Launch-5 apply and the WhatsApp widget can adopt it without
 * another helper; wiring those is separate work and not done here.
 *
 * No-ops when gtag is absent (an ad blocker, a local build, a bot). Analytics must
 * never be able to break a click — the button's real job happens either way.
 */
type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: GtagParams) => void;
  }
}

export function track(event: string, params?: GtagParams): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
  } catch {
    // Swallowed on purpose. See above.
  }
}
