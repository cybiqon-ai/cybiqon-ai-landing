"use client";

import { useEffect, useState } from "react";

/**
 * Dusk / noon. The only client component in /lab.
 *
 * The theme is rendered on the server from the `lab-theme` cookie (app/lab/layout.tsx),
 * so this only has to do two things when clicked: write the cookie so the next request
 * renders correctly, and flip the class immediately so the current page responds
 * without a round trip.
 *
 * It deliberately does NOT touch document.documentElement. React owns <html>'s
 * className via the root layout, and hydration resets anything added there — that was
 * the first implementation and it failed silently.
 *
 * Initial state is read from the DOM in an effect rather than during render: the server
 * already decided, and reading it during render would either mismatch hydration or
 * require prop-drilling the theme through a server layout for no gain.
 */
const COOKIE = "lab-theme";
const ONE_YEAR = 60 * 60 * 24 * 365;

function themeRoot(): HTMLElement | null {
  return document.querySelector(".theme-lab");
}

export default function ThemeToggle() {
  const [noon, setNoon] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setNoon(!!themeRoot()?.classList.contains("lab-noon"));
    setReady(true);
  }, []);

  function toggle() {
    const next = !noon;
    setNoon(next);
    themeRoot()?.classList.toggle("lab-noon", next);
    // Lax rather than Strict: a reader following a link to a post from elsewhere
    // should still land in the theme they picked. SameSite is set explicitly because
    // browsers differ on the default.
    document.cookie = `${COOKIE}=${next ? "noon" : "dusk"}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
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
