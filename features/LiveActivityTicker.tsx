"use client";

import { useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { city: "Surat", business: "Ramesh Textiles", action: "got a new website today" },
  { city: "Pune", business: "Krishna Auto Parts", action: "received 3 WhatsApp leads this hour" },
  { city: "Jaipur", business: "Mehta Sweets", action: "Google ranking improved by 18 spots" },
  { city: "Lucknow", business: "Shree Traders", action: "automation saved 4 hrs/day" },
  { city: "Nagpur", business: "Vijay Pharma", action: "website went live in 5 days" },
  { city: "Ahmedabad", business: "Patel Hardware", action: "2× more leads in 30 days" },
  { city: "Indore", business: "Gupta Electronics", action: "started getting Google Ads leads" },
  { city: "Coimbatore", business: "Sri Textiles", action: "WhatsApp chatbot now handles inquiries" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function LiveActivityTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless infinite scroll
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full overflow-hidden border-y border-gray-100 bg-gray-50/60 py-2.5">
      {/* Live pill */}
      <div className="flex items-center">
        <div className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-4 py-0.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
            Live
          </span>
        </div>

        {/* Scrolling track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max animate-ticker gap-0"
            style={{ animationDuration: "28s" }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border-r border-gray-200 px-5 text-sm text-gray-500 whitespace-nowrap"
              >
                <span className="font-semibold text-gray-700">{item.business}</span>
                <span className="text-gray-400">·</span>
                <span>{item.city}</span>
                <span className="text-gray-400">—</span>
                <span>{item.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind animation — add to tailwind.config.ts if not present */}
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 28s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/*
 * SETUP
 * ─────
 * 1. Drop this file into /components/LiveActivityTicker.tsx
 * 2. Import and place just below your <Navbar /> in your hero section layout:
 *
 *    import LiveActivityTicker from "@/components/LiveActivityTicker";
 *    <LiveActivityTicker />
 *
 * 3. To customise items, edit the TICKER_ITEMS array above.
 */
