---
type: Reference
title: Routes
description: Every route the site serves — two blogs on one table, which routes are server vs client, the chrome-suppression scope for /lab, and the redirect that keeps a published Play Store policy URL alive.
tags: [routes, app-router, nextjs, redirects]
timestamp: 2026-09-22T00:00:00Z
---

# Marketing pages

| Route | File | Rendering |
|---|---|---|
| `/` | `app/page.tsx` | server — metadata + Service/Breadcrumb JSON-LD |
| `/about` | `app/about/page.tsx` → `AboutClient.tsx` | server + metadata |
| `/press` | `app/press/page.tsx` → `data/press.ts` | **static** — prerendered, no edge (size; see seo.md F7) |
| `/pricing` | `app/pricing/page.tsx` → `PricingClient.tsx` | server + metadata |
| `/tools/website-cost-calculator` | `app/tools/website-cost-calculator/page.tsx` → `Calculator.tsx` (client island) | server + metadata; static. See [Website cost calculator](/content/website-cost-calculator.md) |
| `/process` | `app/process/page.tsx` → `ProcessClient.tsx` | server + metadata |
| `/case-studies` | `app/case-studies/page.tsx` → `CaseStudiesClient.tsx` | server + metadata |
| `/faq` | `app/faq/page.tsx` → `FaqClient.tsx` | server + metadata, FAQPage JSON-LD |
| `/contact` | `app/contact/page.tsx` → `ContactClient.tsx` | server + metadata |
| `/free-audit` | `app/free-audit/page.tsx` | server + metadata |
| `/free-website` | `app/free-website/page.tsx` | server + metadata, Breadcrumb + FAQPage JSON-LD |
| `/privacy`, `/terms` | | server |

All seven now have a server `page.tsx` exporting unique metadata plus a co-located
`XClient.tsx` — fixed 25 Jul 2026, see [SEO](/site/seo.md).

# Blog

| Route | Notes |
|---|---|
| `/blog` | server, edge, **paginated via `?page=N`** (9/page, 9 pages) |
| `/blog?page=2..9` | same route; real `<Link>` hrefs, `rel=prev/next`, self-canonical |
| `/blog/[slug]` | server, edge, live D1 query per render |
| `/blog/tag/[tag]` | server, edge, **21 archives**, paginated, 404s on an unknown tag |

Every blog query is scoped to `section = 'msme'` as of 1 Aug 2026. Slugs are unique
table-wide, so an unscoped `/blog/[slug]` serves a `/lab` post in marketing chrome.

# Lab

The second blog, added 1 Aug 2026. No `generateStaticParams` — same constraint as
`/products` below. See [Lab](/content/lab.md).

| Route | Notes |
|---|---|
| `/lab` | server, edge, ruled index rather than a card grid, paginated |
| `/lab/[slug]` | server, edge, `section = 'lab'` |
| `/lab/about` | **static (prerendered)** — no edge runtime, deliberately |
| `/lab/rss.xml` | edge, lab-only feed; `/rss.xml` stays MSME-only |

⚠️ `/lab/about` is static for **size**, not style. The Worker has a 3 MiB gzipped ceiling
on the free plan, enforced at upload rather than at build, and each React route compiled
for the edge costs ~440 KiB. Keeping this one static is part of what fits the bundle.
Adding `cookies()`, `headers()` or `searchParams` to `app/lab/layout.tsx` would make the
whole segment dynamic and break the deploy.

These routes render **no marketing chrome**: `components/ThemeScope.tsx` drops Navbar,
Footer and the WhatsApp widget for `/lab*`, and `app/lab/layout.tsx` supplies its own.
Linked from the footer only — the Navbar is already at its breakpoint link count.

# Products

Shipped 26 Jul 2026, replacing the two hand-written llmbytes legal pages that were
the entire former contents of `app/apps/`.

```
/products                     index: apps · games · extensions · client work
/products/apps                category page — llmbytes · meflow · vitaloop
/products/games               category page — lumina · orbitone · chitrayatra
/products/extensions          category page — mapwit · page-arcade
/products/<slug>              flat, one per product
/products/<slug>/privacy      ← llmbytes' and lumina's are live Play policy URLs; chitrayatra's is in its Play draft; mapwit's and page-arcade's are Chrome Web Store ones
/products/<slug>/terms        ← only where the product has a listing
```

**`/products/curvved`, `/privacy` and `/terms` redirect (308) to `/products/chitrayatra`**
(`next.config.mjs`, 18 Sep 2026). Curvved was rebuilt as stained glass and renamed
ChitraYatra, with a new package; its privacy URL had been written into Play Console and
`PLAY_DATA_SAFETY.md`, so the old paths keep working.

Everything is driven by `data/products.ts`; the routes are thin shims that look up a
slug and render `components/products/ProductDetail.tsx` or `LegalPage.tsx`. Category
pages only render for categories that have something in them, so a category with no
products 404s rather than becoming a thin page.

**Legal routes are conditional as of 29 Aug 2026.** `Product.privacy` and `.terms` are
optional, because MapWit has no store listing and therefore nowhere to publish a policy —
and inventing legally-material copy to satisfy a required field is worse than omitting
it. `ProductDetail` hides the links and `app/sitemap.ts` skips the URLs when they are
absent; a sitemap naming a route that does not exist is a crawl error we authored.

**MapWit got its legal pages on 12 Sep 2026**, for Chrome Web Store submission — the store
wants the policy URL before the listing exists, which is the one case the rule above did
not anticipate. `data/legal/mapwit.ts` was written from the extension's source, not the
Android template: it names the two things that leave the browser (business-website fetches
and review excerpts to OpenRouter) and the user's own API key. `legalMetadata` now takes
its noun from the product category, because "an Android app" was about to be wrong on a
page a Web Store reviewer reads. Both routes are in llms.config.json's `excludeRoutes`,
like every other product's.

**MapWit went live on the Chrome Web Store on 14 Sep 2026** — the first listing not on
Google Play, which is what the catalogue's Play-shaped fields had never been tested
against. `Product.playUrl` is now **`storeUrl`**, and which store it points at is implied
by the category through `STORE` in `data/products.ts`. `STATUS_LABEL.live` is plain "Live";
the "On Google Play" / "On Chrome Web Store" wording comes from `statusLabel(product)`,
because the old unconditional "On Google Play" would have labelled an extension a Play app
on its launch day. `ProductDetail` emits `SoftwareApplication` / `BrowserApplication` /
`operatingSystem: "Chrome"` JSON-LD for an extension rather than `MobileApplication` on
Android, labels the ID row "Extension ID", and its CTA reads "Add to Chrome". MapWit's
`packageId` is the real extension ID (`pdpjbbgabmnoncnlkalmffgahpdihllc`), and its
`storeUrl` is the ID-only form, which the store redirects to the current name slug.

**Page Arcade was added on 18 Sep 2026**, before its Chrome Web Store submission, the same
way MapWit's legal pages were: the store wants the policy URL first. It is the second
extension. Its policy briefly lived on the product's own Worker (`api.cybiqon.in/privacy`);
the owner moved it here so every product's policy is on the company site. That URL now
301-redirects to `/products/page-arcade/privacy`. `data/legal/page-arcade.ts` was written
from the extension's source. Unlike MapWit, Page Arcade has a server of ours for two opt-in
features (site leaderboards and share links), so the policy has a table of what each sends
and how long it is kept. Every retention claim in it is enforced by code in the extension
repo, and the file header says where. `packageId` is the placeholder `page-arcade` until the
first upload assigns an extension ID. There are no `shots`, because `ProductDetail` sizes
them as 360×640 phone captures and the store screenshots are 1280×800.

**Client work is a section on `/products`, not a route.** `data/clients.ts` holds the
engagements and `components/products/ClientIndex.tsx` renders them as ruled rows that
carry their own summary, because there is no detail page behind them and there should
not be — a page per engagement, built from what we are allowed to say, is exactly the
thin page category pages already refuse to be. The nav and footer link `#client-work`.

**Category pages are views; product URLs stay flat.** A category never owns an item's
URL, so recategorising something later cannot break its links. That matters because one
of these URLs is registered with Google Play.

## Why there is no `[slug]` route

Next 16 emits a Node ISR fallback for a dynamic segment **even with
`dynamicParams = false`**, and `next-on-pages` classifies that fallback as an invalid
function and **fails the build**. `runtime = "edge"` would suppress it but is mutually
exclusive with `generateStaticParams`. Concrete per-product route files are the way out.
This cost a failed Cloudflare build on PR #33 — do not "simplify" it back.

## `/our-works` was removed, 29 Aug 2026

It showed five sample builds — Airflow, CoffeeHub, TorqueX, FreshCart,
LeadzGalaxy — presented as a portfolio. None was client work, and by August the
Chrome extension among them no longer existed, so the page was claiming a
portfolio the company did not have. It was deleted rather than corrected: real
products and real engagements now live on `/products`.

It redirects 308 to `/products`. It had been live since launch and carried the
highest `priority` of any static URL in the sitemap (0.85), so deleting it
outright would have stranded whatever ranking it held and 404'd every inbound
link. `data/works.ts`, sequenced in `content-data.md` as the fix for this page,
is cancelled by the same decision — the page's real deficiency was never that its
data lived inline.

## The /apps redirects

`next.config.mjs` carries **permanent 308s** for `/apps`, `/apps/:slug` and
`/apps/:slug/(privacy|terms)`. These are not tidy-up: `/apps/llmbytes/privacy` is the
privacy-policy URL registered with Google Play for a published app (see
`ai-news-app/PLAY_DATA_SAFETY.md`). Verify them in the **built**
`.vercel/output/config.json`, not just in dev.

VitaLoop's Play submission previously pointed at `vitaloop.app/privacy`, a domain that
resolves to nothing. It now has a real page — but the copy was **written from scratch**
and carries two flags for the founder, recorded in [log](/log.md).

# API

All `runtime="edge"`:

| Route | Purpose |
|---|---|
| `POST /api/audit` | free-audit form — see [lead capture](/content/lead-capture.md) |
| `POST /api/apply` | Launch-5 applications — same |
| `POST /api/subscribe` | /lab email list, double opt-in |
| `GET /api/subscribe?confirm=` / `?unsubscribe=` | activates or removes, then redirects to `/lab` |
| `POST /api/lab/view` | view-counter beacon |

**`GET /api/blog` and `GET /api/blog/[slug]` were removed on 1 Aug 2026.** They returned
posts as JSON, nothing on this site consumed them, and no caller was ever found in any
repo in the tree. They were traded for the ~200 KiB of Worker budget that
`/api/subscribe` needed — see the size trap in [Lab](/content/lab.md). If an outside
integration ever turns up depending on them, restoring one costs ~100 KiB and something
else has to go.

Confirm and unsubscribe are **GETs on the subscribe route**, not pages, for the same
reason: a page route is ~420 KiB, a redirect is free. They land the reader on `/lab`
with a `?subscribed=1`-style flag that the index renders as a one-line notice.

# Generated

`app/sitemap.ts` (edge — static URLs + every product URL from `data/products.ts` + D1
blog URLs, try/catch falls back to static-only) · `app/robots.ts` · `app/not-found.tsx`

`/rss.xml` shipped 25 Jul 2026 — `app/rss.xml/route.ts`, edge runtime, 50 most
recent posts from D1, listed in the sitemap and in the layout's `alternates.types`.

`app/rss.xml/route.ts` — edge, reuses the `sitemap.ts` D1 query shape. XML-escapes
titles and excerpts, and degrades to an empty-but-valid feed on a D1 outage rather
than a 500, so subscribers don't drop the feed.

# Layout

`app/layout.tsx` wraps everything in Navbar / Footer / WhatsAppWidget / RevealObserver /
Sonner, and carries the GA4 snippet.

`TooltipProvider` and the radix `<Toaster />` were removed on 1 Aug 2026 — nothing used
either (no `<Tooltip>` outside `components/ui`, no `useToast()` call), and every dead
provider in the root layout is paid for by all twelve edge routes in a 3 MiB Worker.
Sonner stays: `components/AuditForm.tsx` calls `toast.success` / `toast.error`.

# Layout theming

`components/ThemeScope.tsx` decides chrome and theme by pathname. Two scopes:

* **Ledger** (`/free-website`, `/products/*`) — `.theme-ledger` wrapping Navbar + main
  + Footer, so the squared radius reaches the chrome and there is no seam at the header.
* **Bare** (`/lab*`) — renders the page with **no** Navbar, Footer or WhatsApp widget.
  `app/lab/layout.tsx` supplies its own.

Navbar and Footer are passed as **props** rather than children precisely so the
component can decline to render them; they stay server components either way. See
[design system](/site/design-system.md) for what each theme changes.

# See also

- [SEO](/site/seo.md) — the metadata gap on the client pages
- [Lead capture](/content/lead-capture.md) — the two write paths
- [Design system](/site/design-system.md) — the Ledger theme these routes opt into
