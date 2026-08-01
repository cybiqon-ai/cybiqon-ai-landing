"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/lab";

/**
 * Contents rail for a post, with the current section marked.
 *
 * Client-side only for the active-section highlight; the links themselves are plain
 * anchors and work with JavaScript off. Uses IntersectionObserver rather than a scroll
 * listener so it costs nothing while the reader is not moving between sections.
 *
 * Skipped entirely for short posts — see the caller. A contents list with three
 * entries is furniture.
 */
export default function LabTOC({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    // Top-weighted band: a heading counts as current once it reaches the upper third
    // of the viewport and stops counting when the next one gets there. Observing the
    // whole viewport instead makes every heading on a tall screen active at once.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -66% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="Contents" className="lab-readout">
      <p className="text-muted-foreground border-b border-border pb-1.5 mb-2.5">
        Contents
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={`block leading-[1.35] normal-case tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[3px] ${
                active === h.id
                  ? "text-signal"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
