"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated click listener for the whole site, so GA4 finally records something.
 *
 * .okf/site/seo.md: "Zero events fire on the marketing site" — GA4 (G-JBTXQ3BF5C) has
 * been installed for months, but the audit form, the Launch-5 apply, the WhatsApp widget
 * and every book-a-call button were untracked. Nothing on this site was measurable, which
 * means no redesign could be judged and no A/B test could be run.
 *
 * Delegation rather than onClick handlers, deliberately. Putting an onClick on each CTA
 * would turn Hero, Contact and their equivalents on the other 13 pages back into client
 * components — the redesign just finished making them server components. One listener on
 * the document keeps every section server-rendered and costs about a kilobyte.
 *
 * Mark a control with data-track (and optionally data-track-label):
 *
 *   <a href={TIDYCAL} data-track="book_call" data-track-label="hero">
 *
 * This lives in the root layout, which is a 5x Worker cost multiplier — it is compiled
 * into all five ~433 KiB edge functions. That is affordable at this size and would not be
 * for anything larger; see the note in .okf/site/design-system.md before adding to it.
 *
 * The gtag call goes through lib/analytics.ts, which already exists for /lab and whose
 * header says it is "deliberately generic so the audit form, the Launch-5 apply and the
 * WhatsApp widget can adopt it without another helper". This is that adoption. It
 * no-ops when gtag is absent — an ad blocker, a local build, a bot — because analytics
 * must never be able to break a click.
 */

export default function TrackedEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.("[data-track]");
      if (!el) return;

      const action = el.getAttribute("data-track");
      if (!action) return;

      track(action, {
        event_category: "engagement",
        event_label: el.getAttribute("data-track-label") ?? undefined,
        transport_type: "beacon",
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
