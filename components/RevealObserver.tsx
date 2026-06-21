"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Single global IntersectionObserver for scroll-reveal animations.
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

  return null;
}
