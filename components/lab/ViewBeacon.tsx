"use client";

import { useEffect } from "react";

/**
 * Records one view for this post, once per browser session.
 *
 * Renders nothing. Deliberately fire-and-forget: the response is ignored, failures are
 * swallowed, and nothing about the page depends on it. A view counter that can break a
 * page is worse than no view counter.
 *
 * `keepalive` so the request survives the reader clicking away immediately — that
 * reader still read the headline, and it is the shortest visits that are most likely to
 * be lost otherwise.
 *
 * The sessionStorage guard stops a refresh or a back-navigation from counting twice.
 * It is per tab-session, so a genuine return visit tomorrow counts again — which is the
 * behaviour "views" should have.
 */
export default function ViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `lab-seen:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode: no dedupe available. Counting is better than not counting.
    }

    fetch("/api/lab/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}
