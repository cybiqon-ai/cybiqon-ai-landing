"use client";

import { usePathname } from "next/navigation";

/**
 * Applies the "Ledger" paper theme to the routes that use it.
 *
 * Wraps Navbar + main + Footer in the root layout, so the chrome re-themes along
 * with the page. Without this the navbar's indigo wordmark and amber CTA would sit
 * over an ochre-and-paper page and read as a bug rather than a decision.
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
const PAPER_ROUTES = ["/free-website", "/apps"];

export default function ThemeScope({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isPaper = PAPER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <div className={isPaper ? "theme-paper bg-background text-foreground" : undefined}>
      {children}
    </div>
  );
}
