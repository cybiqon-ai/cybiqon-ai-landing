"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AMC_BAND,
  DEFAULT_ASSUMPTIONS,
  OPTIONS,
  SOURCES,
  calculate,
  formatInr,
  type Inputs,
  type Maintenance,
  type Result,
  type SiteType,
  type Years,
} from "@/data/websiteCost";

/**
 * The interactive half of /tools/website-cost-calculator. Everything it knows comes from
 * data/websiteCost.ts; this file only holds state and draws it.
 *
 * State lives in the URL (replaceState, no navigation), so a filled-in comparison can be
 * sent to a partner or a vendor as a link. Read once on mount rather than through
 * useSearchParams, which would make the statically rendered page bail out to the client.
 *
 * Chart colours are in-band steps of the brand blue and green, checked with the dataviz
 * palette validator on 22 Sep 2026 (lightness, chroma, colour-blind separation, and ≥3:1
 * against white). The raw brand navy and #00D890 fail those checks, so they are not used.
 */
const BUILD_COLOUR = "#1f6fb0";
const RUNNING_COLOUR = "#0f9e6c";

const YEARS: Years[] = [1, 3, 5];

type State = {
  siteType: SiteType;
  years: Years;
  maintenance: Maintenance;
  addGst: boolean;
  monthlySales: number;
  builds: Record<string, number>;
  own: { label: string; build: number; perYear: number } | null;
};

const INITIAL: State = {
  siteType: "business",
  years: 3,
  maintenance: "low",
  addGst: false,
  monthlySales: 100000,
  builds: {},
  own: null,
};

const toNumber = (v: string) => {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

function readUrl(): State {
  const p = new URLSearchParams(window.location.search);
  const s: State = { ...INITIAL, builds: {} };
  if (p.get("type") === "store") s.siteType = "store";
  const y = Number(p.get("years"));
  if (y === 1 || y === 3 || y === 5) s.years = y;
  const m = p.get("amc");
  if (m === "none" || m === "low" || m === "high") s.maintenance = m;
  s.addGst = p.get("gst") === "1";
  if (p.has("sales")) s.monthlySales = toNumber(p.get("sales")!);
  for (const def of [...OPTIONS.business, ...OPTIONS.store]) {
    const q = p.get(`q_${def.id}`);
    if (q !== null) s.builds[def.id] = toNumber(q);
  }
  if (p.has("own")) {
    s.own = {
      label: p.get("own") ?? "",
      build: toNumber(p.get("own_build") ?? "0"),
      perYear: toNumber(p.get("own_year") ?? "0"),
    };
  }
  return s;
}

function writeUrl(s: State) {
  const p = new URLSearchParams();
  if (s.siteType !== INITIAL.siteType) p.set("type", s.siteType);
  if (s.years !== INITIAL.years) p.set("years", String(s.years));
  if (s.maintenance !== INITIAL.maintenance) p.set("amc", s.maintenance);
  if (s.addGst) p.set("gst", "1");
  if (s.siteType === "store" && s.monthlySales !== INITIAL.monthlySales)
    p.set("sales", String(s.monthlySales));
  for (const [id, v] of Object.entries(s.builds)) p.set(`q_${id}`, String(v));
  if (s.own) {
    p.set("own", s.own.label);
    p.set("own_build", String(s.own.build));
    p.set("own_year", String(s.own.perYear));
  }
  const qs = p.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

/* ------------------------------------------------------------------ controls */

function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="t-label-sm text-muted-foreground">{label}</legend>
      <div className="mt-2 inline-flex rounded-lg bg-surface-high p-1" role="radiogroup">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              value === o.value
                ? "bg-surface-lowest text-primary shadow-sm"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function MoneyInput({
  id,
  label,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-label-sm text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5 flex h-11 items-center rounded-lg border border-border bg-surface-lowest px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <span aria-hidden className="text-muted-foreground">
          ₹
        </span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value ? new Intl.NumberFormat("en-IN").format(value) : ""}
          placeholder="0"
          onChange={(e) => onChange(toNumber(e.target.value))}
          className="ml-1.5 w-full bg-transparent tabular-nums text-primary outline-none"
        />
      </div>
      {hint && <p className="t-label-sm mt-1 text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* --------------------------------------------------------------------- chart */

function Chart({ results, years }: { results: Result[]; years: Years }) {
  const [hover, setHover] = useState<{ id: string; part: "build" | "running" } | null>(null);
  const max = Math.max(1, ...results.map((r) => r.total));
  const period = years === 1 ? "the first year" : `${years} years`;

  return (
    <figure>
      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="t-body-sm font-semibold text-primary">Total over {period}</span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-sm" style={{ background: BUILD_COLOUR }} />
          <span className="t-label-sm text-muted-foreground">Build price</span>
        </span>
        {results.some((r) => r.running > 0) && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-sm" style={{ background: RUNNING_COLOUR }} />
            <span className="t-label-sm text-muted-foreground">Everything else, over {period}</span>
          </span>
        )}
      </figcaption>

      {/* The table below is the accessible view of the same numbers. */}
      <ul className="mt-5 space-y-4" aria-hidden>
        {results.map((r) => {
          const buildPct = (r.build / max) * 100;
          const runningPct = (r.running / max) * 100;
          const parts = [
            { part: "build" as const, pct: buildPct, value: r.build, colour: BUILD_COLOUR, name: "Build price" },
            { part: "running" as const, pct: runningPct, value: r.running, colour: RUNNING_COLOUR, name: "Everything else" },
          ].filter((p) => p.value > 0);
          return (
            <li key={r.id}>
              <p className="t-body-sm text-primary">{r.label}</p>
              <div className="mt-1.5 flex items-center">
                {/* 78% leaves room for the total at the end of the longest bar. */}
                <div className="relative flex h-5 w-[78%] items-center">
                  {parts.map((p, i) => (
                    <div
                      key={p.part}
                      onMouseEnter={() => setHover({ id: r.id, part: p.part })}
                      onMouseLeave={() => setHover(null)}
                      className="relative h-full"
                      style={{
                        width: `${p.pct}%`,
                        background: p.colour,
                        marginLeft: i > 0 ? 2 : 0,
                        borderRadius: i === parts.length - 1 ? "0 4px 4px 0" : 0,
                      }}
                    >
                      {hover?.id === r.id && hover.part === p.part && (
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
                          {p.name}: {formatInr(p.value)}
                        </span>
                      )}
                    </div>
                  ))}
                  <span className="ml-2.5 whitespace-nowrap text-sm font-semibold tabular-nums text-primary">
                    {formatInr(r.total)}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

/* ---------------------------------------------------------------- component */

export default function Calculator() {
  const [s, setS] = useState<State>(INITIAL);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setS(readUrl());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeUrl(s);
  }, [s, ready]);

  const inputs: Inputs = useMemo(
    () => ({ ...s, assumptions: DEFAULT_ASSUMPTIONS }),
    [s],
  );
  const results = useMemo(() => calculate(inputs), [inputs]);
  const options = OPTIONS[s.siteType];
  const band = AMC_BAND[s.siteType];
  const period = s.years === 1 ? "first year" : `${s.years} years`;

  const set = (patch: Partial<State>) => setS((prev) => ({ ...prev, ...patch }));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked: the address bar already holds the same link. */
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-surface-lowest shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]">
      {/* Controls */}
      <div className="grid gap-6 border-b border-border/60 p-5 sm:p-7 md:grid-cols-2 lg:grid-cols-4">
        <Segmented
          label="What are you building?"
          value={s.siteType}
          options={[
            { value: "business", label: "Business site" },
            { value: "store", label: "Online store" },
          ]}
          onChange={(v) => set({ siteType: v })}
        />
        <Segmented
          label="Compare over"
          value={s.years}
          options={YEARS.map((y) => ({ value: y, label: y === 1 ? "1 year" : `${y} years` }))}
          onChange={(v) => set({ years: v })}
        />
        <div>
          <label htmlFor="amc" className="t-label-sm text-muted-foreground">
            Maintenance contract
          </label>
          <select
            id="amc"
            value={s.maintenance}
            onChange={(e) => set({ maintenance: e.target.value as Maintenance })}
            className="mt-2 h-10 w-full rounded-lg border border-border bg-surface-lowest px-3 text-sm text-primary"
          >
            <option value="none">None</option>
            <option value="low">Typical, low end ({formatInr(band.low)}/yr)</option>
            <option value="high">Typical, high end ({formatInr(band.high)}/yr)</option>
          </select>
        </div>
        <div>
          <span className="t-label-sm text-muted-foreground">Tax</span>
          <label className="mt-2 flex h-10 cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={s.addGst}
              onChange={(e) => set({ addGst: e.target.checked })}
              className="h-4 w-4 accent-[#1f6fb0]"
            />
            <span className="t-body-sm text-primary">Add 18% GST to every figure</span>
          </label>
        </div>
      </div>

      {/* Quotes */}
      <div className="border-b border-border/60 p-5 sm:p-7">
        <h2 className="t-h3 text-primary">Your quotes</h2>
        <p className="t-body-sm mt-1 text-muted-foreground">
          The numbers filled in are examples. Replace them with what you have been quoted.
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {options.map((def) => (
            <div key={def.id} className="rounded-xl bg-surface-low p-4">
              <MoneyInput
                id={`q_${def.id}`}
                label={def.label}
                value={s.builds[def.id] ?? def.defaultBuild}
                onChange={(n) => set({ builds: { ...s.builds, [def.id]: n } })}
              />
              <p className="t-label-sm mt-2 text-muted-foreground">{def.blurb}</p>
            </div>
          ))}
        </div>

        {s.siteType === "store" && (
          <div className="mt-5 max-w-xs">
            <MoneyInput
              id="sales"
              label="Online sales a month"
              value={s.monthlySales}
              onChange={(n) => set({ monthlySales: n })}
              hint="Used only for Shopify's percentage on each sale."
            />
          </div>
        )}

        <div className="mt-5">
          {s.own ? (
            <div className="grid gap-4 rounded-xl border border-dashed border-border p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
              <div>
                <label htmlFor="own_label" className="t-label-sm text-muted-foreground">
                  Your own option
                </label>
                <input
                  id="own_label"
                  value={s.own.label}
                  placeholder="e.g. Wix Core, or a local agency"
                  onChange={(e) => set({ own: { ...s.own!, label: e.target.value } })}
                  className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-lowest px-3 text-primary"
                />
              </div>
              <MoneyInput
                id="own_build"
                label="Build or setup price"
                value={s.own.build}
                onChange={(n) => set({ own: { ...s.own!, build: n } })}
              />
              <MoneyInput
                id="own_year"
                label="Every-year cost, from year 1"
                value={s.own.perYear}
                onChange={(n) => set({ own: { ...s.own!, perYear: n } })}
              />
              <button
                type="button"
                onClick={() => set({ own: null })}
                className="h-11 rounded-lg px-3 text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => set({ own: { label: "", build: 0, perYear: 0 } })}
              className="text-sm font-semibold text-accent-ink hover:underline"
            >
              + Add another option (Wix, a subscription, another quote)
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="p-5 sm:p-7">
        <Chart results={results} years={s.years} />

        {/* Phones: one card per option. The table's total column sat off-screen at 390px. */}
        <ul className="mt-8 space-y-3 md:hidden">
          {results.map((r) => (
            <li key={r.id} className="rounded-xl bg-surface-low p-4">
              <p className="t-body-sm font-semibold text-primary">{r.label}</p>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="t-label-sm text-muted-foreground">Total, {period}</dt>
                <dd className="text-right text-sm font-semibold tabular-nums text-primary">{formatInr(r.total)}</dd>
                <dt className="t-label-sm text-muted-foreground">Year 1</dt>
                <dd className="t-body-sm text-right tabular-nums text-primary">{formatInr(r.yearOne)}</dd>
                {s.years > 1 && (
                  <>
                    <dt className="t-label-sm text-muted-foreground">Each year after</dt>
                    <dd className="t-body-sm text-right tabular-nums text-primary">{formatInr(r.laterYear)}</dd>
                  </>
                )}
              </dl>
              {s.years > 1 && r.laterLines.length > 0 && (
                <details className="mt-3">
                  <summary className="t-label-sm cursor-pointer text-accent-ink">What recurs each year</summary>
                  <ul className="mt-2 space-y-1">
                    {r.laterLines.map((l) => (
                      <li key={l.label} className="t-label-sm flex justify-between gap-4 text-muted-foreground">
                        <span>{l.label}</span>
                        <span className="tabular-nums">{formatInr(l.amount)}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              <p className="t-label-sm mt-3 text-muted-foreground">
                <span className="font-semibold text-primary">If you stop paying: </span>
                {r.ifYouStop}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 hidden md:block">
          <table className="w-full text-left">
            <caption className="sr-only">
              Cost of each option over the {period}, before GST unless GST is switched on
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="t-label-sm py-2.5 pr-4 text-muted-foreground">Option</th>
                <th scope="col" className="t-label-sm py-2.5 pr-4 text-right text-muted-foreground">Year 1</th>
                {s.years > 1 && (
                  <th scope="col" className="t-label-sm py-2.5 pr-4 text-right text-muted-foreground">
                    Each year after
                  </th>
                )}
                <th scope="col" className="t-label-sm py-2.5 pr-4 text-right text-muted-foreground">
                  Total, {period}
                </th>
                <th scope="col" className="t-label-sm py-2.5 text-muted-foreground">If you stop paying</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-b border-border/60 align-top last:border-0">
                  <th scope="row" className="py-3.5 pr-4">
                    <span className="t-body-sm font-semibold text-primary">{r.label}</span>
                    {s.years > 1 && r.laterLines.length > 0 && (
                      <details className="mt-1.5">
                        <summary className="t-label-sm cursor-pointer text-accent-ink">
                          What recurs each year
                        </summary>
                        <ul className="mt-2 space-y-1">
                          {r.laterLines.map((l) => (
                            <li key={l.label} className="t-label-sm flex justify-between gap-4 text-muted-foreground">
                              <span>{l.label}</span>
                              <span className="tabular-nums">{formatInr(l.amount)}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </th>
                  <td className="t-body-sm py-3.5 pr-4 text-right tabular-nums text-primary">
                    {formatInr(r.yearOne)}
                  </td>
                  {s.years > 1 && (
                    <td className="t-body-sm py-3.5 pr-4 text-right tabular-nums text-primary">
                      {formatInr(r.laterYear)}
                    </td>
                  )}
                  <td className="t-body-sm py-3.5 pr-4 text-right font-semibold tabular-nums text-primary">
                    {formatInr(r.total)}
                  </td>
                  <td className="t-label-sm max-w-[26ch] py-3.5 text-muted-foreground">{r.ifYouStop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="t-label-sm text-muted-foreground">
            {s.addGst ? "Including 18% GST." : "Before GST."} Figures checked{" "}
            {/* Sources are listed in full further down the page. */}
            against <a href="#sources" className="text-accent-ink hover:underline">{Object.keys(SOURCES).length} sources</a>.
          </p>
          <button
            type="button"
            onClick={copyLink}
            data-track="calculator_copy_link"
            className="inline-flex h-10 items-center rounded-lg bg-surface-high px-4 text-sm font-semibold text-primary transition-colors hover:bg-surface-container"
          >
            {copied ? "Link copied" : "Copy a link to this comparison"}
          </button>
        </div>
      </div>
    </div>
  );
}
