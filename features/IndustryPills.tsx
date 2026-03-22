"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Industry {
  id: string;
  label: string;
  emoji: string;
  caseStudySlug?: string; // Optional: link to a filtered case studies page
}

// ─── Data ────────────────────────────────────────────────────────────────────
const INDUSTRIES: Industry[] = [
  { id: "manufacturing", label: "Manufacturing",     emoji: "🏭", caseStudySlug: "manufacturing" },
  { id: "retail",        label: "Retail & Kirana",   emoji: "🛒", caseStudySlug: "retail" },
  { id: "restaurant",    label: "Restaurant / Hotel",emoji: "🍽️", caseStudySlug: "restaurant" },
  { id: "auto",          label: "Auto & Services",   emoji: "🔧", caseStudySlug: "auto" },
  { id: "pharma",        label: "Pharma / Clinic",   emoji: "💊", caseStudySlug: "pharma" },
  { id: "wholesale",     label: "Wholesale / B2B",   emoji: "📦", caseStudySlug: "wholesale" },
  { id: "construction",  label: "Construction",      emoji: "🏗️", caseStudySlug: "construction" },
  { id: "it",            label: "IT / Freelancer",   emoji: "💻", caseStudySlug: "it" },
];

// ─── Component ───────────────────────────────────────────────────────────────
interface IndustryPillsProps {
  /** Called when user selects a category — use to filter case studies etc. */
  onSelect?: (industry: Industry) => void;
  /** Initially selected id */
  defaultSelected?: string;
}

export default function IndustryPills({
  onSelect,
  defaultSelected = "manufacturing",
}: IndustryPillsProps) {
  const [selected, setSelected] = useState<string>(defaultSelected);

  function handleClick(industry: Industry) {
    setSelected(industry.id);
    onSelect?.(industry);
  }

  return (
    <div className="space-y-3">
      {/* Label */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        We work with businesses like yours
      </p>

      {/* Pills grid */}
      <div className="flex flex-wrap gap-2">
        {INDUSTRIES.map((ind) => {
          const isActive = selected === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => handleClick(ind)}
              className={`
                inline-flex items-center gap-2 rounded-full border px-4 py-2
                text-sm font-medium transition-all duration-200
                active:scale-95
                ${
                  isActive
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-sm"
                    : "border-gray-200 bg-white text-gray-500 hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700"
                }
              `}
            >
              <span className="text-base leading-none">{ind.emoji}</span>
              {ind.label}
              {isActive && (
                <span className="ml-0.5 text-emerald-500">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic sub-copy based on selection */}
      <SelectedIndustryCopy id={selected} />
    </div>
  );
}

// ─── Sub-copy per industry ───────────────────────────────────────────────────
const COPY: Record<string, string> = {
  manufacturing: "We build catalogues, B2B portals, and inquiry automation for factories and units.",
  retail:        "WhatsApp order automation, Google Maps presence, and digital menus for shops & kirana stores.",
  restaurant:    "Online menu, table booking, Google reviews automation — guests find you faster.",
  auto:          "Service reminders, appointment booking, and local SEO for garages and dealerships.",
  pharma:        "Compliant websites, appointment systems, and WhatsApp follow-ups for clinics & pharma.",
  wholesale:     "B2B catalogues, pricing portals, and inquiry management for distributors.",
  construction:  "Project portfolios, lead capture forms, and Google Ads for builders & contractors.",
  it:            "Portfolio sites, client portals, and automated onboarding for freelancers & agencies.",
};

function SelectedIndustryCopy({ id }: { id: string }) {
  const text = COPY[id];
  if (!text) return null;
  return (
    <p
      key={id}
      className="animate-fadeIn text-sm text-gray-500 leading-relaxed"
    >
      {text}{" "}
      <a
        href={`/case-studies?industry=${id}`}
        className="font-medium text-emerald-600 underline-offset-2 hover:underline"
      >
        See examples →
      </a>
    </p>
  );
}

/*
 * SETUP
 * ─────
 * 1. Drop this file into /components/IndustryPills.tsx
 * 2. Basic usage (standalone):
 *
 *    import IndustryPills from "@/components/IndustryPills";
 *    <IndustryPills />
 *
 * 3. To filter case studies when a pill is clicked:
 *
 *    <IndustryPills onSelect={(ind) => router.push(`/case-studies?industry=${ind.id}`)} />
 *
 * 4. Add this to tailwind.config.ts > theme.extend.animation if you want the
 *    fade-in on the copy:
 *
 *    animation: { fadeIn: "fadeIn 0.25s ease" }
 *    keyframes: { fadeIn: { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "translateY(0)" } } }
 */
