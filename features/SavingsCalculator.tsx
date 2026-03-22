"use client";

import { useState, useMemo } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

// ─── Slider ──────────────────────────────────────────────────────────────────
interface SliderProps {
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}

function Slider({ label, hint, min, max, step, value, onChange, format }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="ml-2 text-xs text-gray-400">{hint}</span>
        </div>
        <span className="text-sm font-semibold text-gray-800 tabular-nums">
          {format(value)}
        </span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-gray-100">
        {/* Filled track */}
        <div
          className="absolute h-1.5 rounded-full bg-emerald-400 transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            absolute inset-0 h-full w-full cursor-pointer opacity-0
            [&::-webkit-slider-thumb]:opacity-100
          "
          style={{ zIndex: 1 }}
        />
        {/* Thumb */}
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-emerald-500 bg-white shadow-sm transition-all"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SavingsCalculator() {
  const [hours, setHours]   = useState(20);   // manual task hours / month
  const [rate, setRate]     = useState(150);  // staff cost per hour (₹)
  const [leads, setLeads]   = useState(10);   // missed leads / month
  const [avgDeal, setAvgDeal] = useState(5000); // avg deal value (₹)

  const results = useMemo(() => {
    const laborSaving  = Math.round(hours * rate * 0.65);     // 65% of manual hours automatable
    const leadRevenue  = Math.round(leads * avgDeal * 0.15);  // ~15% close rate assumption
    const total        = laborSaving + leadRevenue;
    const annual       = total * 12;
    return { laborSaving, leadRevenue, total, annual };
  }, [hours, rate, leads, avgDeal]);

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="text-base font-semibold text-gray-800">
          What's your business losing every month?
        </h3>
        <p className="mt-0.5 text-sm text-gray-400">
          Drag the sliders — see your estimated monthly savings with Cybiqon
        </p>
      </div>

      {/* Sliders */}
      <div className="space-y-5 px-6 py-5">
        <Slider
          label="Manual task hours"
          hint="per month"
          min={2} max={120} step={1}
          value={hours}
          onChange={setHours}
          format={(v) => `${v} hrs`}
        />
        <Slider
          label="Staff cost"
          hint="per hour"
          min={50} max={600} step={10}
          value={rate}
          onChange={setRate}
          format={(v) => `₹${v}`}
        />
        <Slider
          label="Missed leads"
          hint="per month"
          min={0} max={80} step={1}
          value={leads}
          onChange={setLeads}
          format={(v) => `${v} leads`}
        />
        <Slider
          label="Average deal value"
          hint="per customer"
          min={500} max={50000} step={500}
          value={avgDeal}
          onChange={setAvgDeal}
          format={(v) => formatINR(v)}
        />
      </div>

      {/* Results */}
      <div className="border-t border-gray-100 bg-emerald-50 px-6 py-5">
        {/* Breakdown */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/70 px-4 py-3">
            <p className="text-xs text-emerald-700/70 font-medium">Labour savings</p>
            <p className="mt-0.5 text-lg font-bold text-emerald-800 tabular-nums">
              {formatINR(results.laborSaving)}
              <span className="ml-1 text-xs font-normal text-emerald-600">/mo</span>
            </p>
          </div>
          <div className="rounded-xl bg-white/70 px-4 py-3">
            <p className="text-xs text-emerald-700/70 font-medium">Revenue from leads</p>
            <p className="mt-0.5 text-lg font-bold text-emerald-800 tabular-nums">
              {formatINR(results.leadRevenue)}
              <span className="ml-1 text-xs font-normal text-emerald-600">/mo</span>
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-600 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-emerald-100">You could save or earn back</p>
            <p className="text-xs text-emerald-200 mt-0.5">
              That's {formatINR(results.annual)} per year
            </p>
          </div>
          <p className="text-3xl font-bold text-white tabular-nums">
            {formatINR(results.total)}
            <span className="ml-1 text-sm font-normal text-emerald-200">/mo</span>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-3 text-[11px] text-emerald-700/60 text-center">
          Estimates only. Actual results vary based on your business type and processes.
        </p>
      </div>

      {/* CTA */}
      <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-white">
        <p className="text-sm text-gray-500">
          Ready to stop leaving money on the table?
        </p>
        <a
          href="/contact"
          className="
            inline-flex items-center gap-2 rounded-full bg-emerald-600
            px-5 py-2.5 text-sm font-semibold text-white
            transition hover:bg-emerald-700 active:scale-95 whitespace-nowrap
          "
        >
          Book a free 30-min call →
        </a>
      </div>
    </div>
  );
}

/*
 * SETUP
 * ─────
 * 1. Drop this file into /components/SavingsCalculator.tsx
 * 2. Usage:
 *
 *    import SavingsCalculator from "@/components/SavingsCalculator";
 *    <SavingsCalculator />
 *
 * 3. Tweak the calculation multipliers in useMemo() to match your real-world
 *    averages — the defaults are conservative estimates.
 *
 * 4. Update the /contact CTA href to your actual booking link
 *    (e.g. a Calendly embed link).
 */
