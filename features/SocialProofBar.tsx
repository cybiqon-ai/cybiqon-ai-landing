"use client";

import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Owner {
  initials: string;
  color: string; // Tailwind bg class
  name: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const OWNERS: Owner[] = [
  { initials: "RS", color: "bg-emerald-500", name: "Ramesh S." },
  { initials: "PK", color: "bg-blue-500",    name: "Priya K." },
  { initials: "VM", color: "bg-orange-500",  name: "Vijay M." },
  { initials: "AJ", color: "bg-violet-500",  name: "Anjali J." },
  { initials: "SK", color: "bg-amber-500",   name: "Suresh K." },
];

// Simulates a live-updating count (replace with real analytics API if available)
function useLiveCount(base: number) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      // Randomly increment by 0 or 1 every ~15s to feel live
      setCount((c) => c + (Math.random() > 0.6 ? 1 : 0));
    }, 15_000);
    return () => clearInterval(id);
  }, []);
  return count;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SocialProofBar() {
  const auditCount = useLiveCount(47);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in after a short delay so it feels like live data loading
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
        rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {/* Left — avatars + text */}
      <div className="flex items-center gap-3">
        {/* Stacked avatars */}
        <div className="flex items-center">
          {OWNERS.map((o, i) => (
            <div
              key={i}
              title={o.name}
              className={`
                relative flex h-8 w-8 items-center justify-center rounded-full
                text-[11px] font-bold text-white ring-2 ring-white
                ${o.color}
                ${i > 0 ? "-ml-2" : ""}
              `}
            >
              {o.initials}
            </div>
          ))}
        </div>

        {/* Copy */}
        <p className="text-sm text-gray-500 leading-snug">
          <span className="font-semibold text-gray-800">
            {auditCount} MSME owners
          </span>{" "}
          got their free website audit this week
        </p>
      </div>

      {/* Right — live pill + CTA */}
      <div className="flex items-center gap-3 sm:shrink-0">
        {/* Live badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>

        {/* CTA */}
        <a
          href="#audit"
          className="
            rounded-full bg-emerald-600 px-4 py-1.5
            text-[13px] font-semibold text-white
            transition hover:bg-emerald-700 active:scale-95
          "
        >
          Get yours free →
        </a>
      </div>
    </div>
  );
}

/*
 * SETUP
 * ─────
 * 1. Drop this file into /components/SocialProofBar.tsx
 * 2. Import and place inside your Hero section, below your headline or above CTAs:
 *
 *    import SocialProofBar from "@/components/SocialProofBar";
 *    <SocialProofBar />
 *
 * 3. Replace the useLiveCount base number (47) with your real audit count from
 *    your CRM or analytics if available.
 *
 * 4. Update OWNERS with real client initials/colours for authenticity.
 */
