"use client";

import { useEffect, useState } from "react";

/**
 * Dusk / noon. The only client component in /lab.
 *
 * Writes `data-lab-theme` on <html> — the same attribute the pre-paint script in
 * app/lab/layout.tsx sets — plus localStorage so the choice survives a reload.
 *
 * A data attribute rather than a class, and on <html> rather than on the theme div,
 * because React owns `className` on both `<html>` (root layout) and the theme div
 * (lab layout) and reconciles changes to them away during hydration. It does not
 * reconcile attributes it never rendered.
 *
 * Initial state is read from the DOM in an effect rather than during render: the
 * attribute is set by a script that runs before React, so reading it during render
 * would mismatch hydration.
 */
const KEY = "lab-theme";

export default function ThemeToggle() {
  const [noon, setNoon] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setNoon(document.documentElement.dataset.labTheme === "noon");
    setReady(true);
  }, []);

  function toggle() {
    const next = !noon;
    setNoon(next);
    document.documentElement.dataset.labTheme = next ? "noon" : "dusk";
    try {
      localStorage.setItem(KEY, next ? "noon" : "dusk");
    } catch {
      // Private mode: the choice applies to this page view and is not remembered.
      // Still worth applying — a reader who cannot store a preference still gets one.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // Until the effect runs the active mode is unknown, so the accessible name stays
      // neutral rather than announcing a state that may be wrong.
      aria-label={ready ? (noon ? "Switch to dark" : "Switch to light") : "Switch theme"}
      className="lab-readout px-2 py-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[3px] transition-colors"
    >
      {ready && noon ? "noon" : "dusk"}
    </button>
  );
}
