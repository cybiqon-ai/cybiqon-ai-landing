"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Two global IntersectionObservers, mounted once in the root layout.
 *
 * The first drives scroll reveals. The second pauses the hero's 18-second agent loop
 * while it is off screen — the one thing that loop cannot do in CSS, and worth doing on
 * the mid-range Android this site sells into, where a composited animation keeps costing
 * frames long after the visitor has scrolled past it.
 *
 * Mounted once in the root layout, it watches every `.reveal` element and adds
 * `.visible` when it scrolls into view. This lets sections that only needed
 * client-side code for the reveal animation stay as server components.
 *
 * Re-scans on route change because the App Router swaps page DOM without
 * remounting the layout (so a fresh effect run is needed per navigation).
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.visible)")
    );
    if (elements.length === 0) return;

    // Respect reduced-motion: reveal everything immediately, no observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Pause the hero agent loop off screen. Separate effect because the reveal observer
  // above returns early on reduced-motion and when a page has nothing to reveal, and
  // this has to run on its own terms. Under reduced-motion there is nothing to pause:
  // globals.css has already stilled the loop at its completed state.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-loop]"));
    if (cards.length === 0) return;

    // No unobserve: unlike the reveal observer this one has to keep watching, because
    // it cares about leaving the viewport as much as entering it.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).toggleAttribute("data-paused", !entry.isIntersecting);
        }
      },
      { threshold: 0 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
