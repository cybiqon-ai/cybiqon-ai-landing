"use client";

import { usePathname } from "next/navigation";

/**
 * Applies the "Ledger" structural theme to the routes that use it.
 *
 * The theme now inherits every colour from :root and overrides only the radius —
 * an earlier version re-coloured these pages and they read as a different company
 * next to the rest of the site. See the .theme-ledger comment in app/globals.css.
 *
 * Still wraps Navbar + main + Footer rather than just the page, so the squared
 * radius reaches the chrome too and the seam isn't visible at the header.
 *
 * Why a pathname wrapper and not a route group: group layouts NEST inside
 * `app/layout.tsx` rather than replacing it, so swapping chrome that way would mean
 * moving all 14 existing page directories into a sibling group and stranding
 * `app/not-found.tsx`. This is one line for the same outcome.
 *
 * Server children passed through a client component stay server-rendered — nothing
 * in the existing tree becomes client-side because of this.
 *
 * Note the toasters are deliberately left OUTSIDE this wrapper in the layout: sonner
 * and radix-toast portal into document.body, so they escape any scope anyway. A
 * toast fired from the apply form will use the default theme. That is acceptable for
 * something transient, but it is a known seam, not an oversight.
 */
const LEDGER_ROUTES = ["/free-website", "/apps"];

export default function ThemeScope({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isLedger = LEDGER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <div className={isLedger ? "theme-ledger bg-background text-foreground" : undefined}>
      {children}
    </div>
  );
}
