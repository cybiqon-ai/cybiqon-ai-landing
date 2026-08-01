"use client";

import { usePathname } from "next/navigation";

/**
 * Decides which chrome and which theme a route gets.
 *
 * Two scopes live here:
 *
 * "Ledger" (/free-website, /products/*) — inherits every colour from :root and
 * overrides only the radius. An earlier version re-coloured these pages and they read
 * as a different company next to the rest of the site. See the .theme-ledger comment
 * in app/globals.css. It still wraps Navbar + main + Footer rather than just the page,
 * so the squared radius reaches the chrome and the seam isn't visible at the header.
 *
 * "Bare" (/lab) — renders the page with NO marketing chrome at all: no Navbar, no
 * Footer, no WhatsApp widget. app/lab/layout.tsx supplies its own header and footer.
 *
 * Why /lab gets a full palette where Ledger could not: the Ledger failure was not
 * "colour is forbidden", it was recolouring a page that still sat inside shared chrome,
 * so the temperature flipped mid-header on the walk from /pricing to /products. /lab
 * shares no chrome with the marketing site, so there is no seam to notice. The MSME
 * navbar would also be actively wrong there — /lab's reader is not shopping for a
 * ₹9,999 website, and the WhatsApp widget is aimed at someone who is.
 *
 * Why a pathname wrapper and not a route group: group layouts NEST inside
 * `app/layout.tsx` rather than replacing it, so swapping chrome that way would mean
 * moving all 14 existing page directories into a sibling group and stranding
 * `app/not-found.tsx`. This is one component for the same outcome.
 *
 * Server children passed through a client component stay server-rendered — that holds
 * for the `navbar`/`footer` props too, so nothing in the existing tree becomes
 * client-side because of this.
 *
 * Known cost, measured rather than assumed: because this component decides on the
 * client, Next serialises the `navbar` and `footer` props into every /lab page's RSC
 * payload even though /lab never renders them. That is ~9 KB of the ~40 KB payload,
 * but ~2 KB gzipped on the wire, because the markup is repetitive and compresses well.
 * Removing it would mean either middleware setting a pathname header for the root
 * layout to read, or the route group that was rejected above — a new moving part in a
 * build that has broken on next-on-pages before, to save two kilobytes. Not worth it.
 * Revisit if the marketing footer grows substantially.
 *
 * Note the toasters are deliberately left OUTSIDE this wrapper in the layout: sonner
 * and radix-toast portal into document.body, so they escape any scope anyway. A toast
 * fired from the apply form will use the default theme. That is acceptable for
 * something transient, but it is a known seam, not an oversight.
 */
const LEDGER_ROUTES = ["/free-website", "/products"];
const BARE_ROUTES = ["/lab"];

function matches(pathname: string, routes: string[]): boolean {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default function ThemeScope({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  // No wrapper div either: app/lab/layout.tsx owns the full-height surface, and an
  // unthemed div between <body> and it would show the marketing background at the
  // edges on short pages.
  if (matches(pathname, BARE_ROUTES)) return <>{children}</>;

  const isLedger = matches(pathname, LEDGER_ROUTES);

  return (
    <div className={isLedger ? "theme-ledger bg-background text-foreground" : undefined}>
      {navbar}
      {children}
      {footer}
    </div>
  );
}
