---
type: Reference
title: Routes
description: Every route the site serves — two blogs on one table, which routes are server vs client, the chrome-suppression scope for /lab, and the redirect that keeps a published Play Store policy URL alive.
tags: [routes, app-router, nextjs, redirects]
timestamp: 2026-08-19T00:00:00Z
---

# Marketing pages

| Route | File | Rendering |
|---|---|---|
| `/` | `app/page.tsx` | server — metadata + Service/Breadcrumb JSON-LD |
| `/about` | `app/about/page.tsx` → `AboutClient.tsx` | server + metadata |
| `/our-works` | `app/our-works/page.tsx` → `OurWorksClient.tsx` | server + metadata |
| `/press` | `app/press/page.tsx` → `data/press.ts` | **static** — prerendered, no edge (size; see seo.md F7) |
| `/pricing` | `app/pricing/page.tsx` → `PricingClient.tsx` | server + metadata |
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
/products                     index, grouped by category
/products/apps                category page
/products/<slug>              llmbytes · meflow · vitaloop · lumina
/products/<slug>/privacy      ← llmbytes' and lumina's are live Play policy URLs
/products/<slug>/terms
```

Everything is driven by `data/products.ts`; the routes are thin shims that look up a
slug and render `components/products/ProductDetail.tsx` or `LegalPage.tsx`. Adding the
Chrome extension is one data entry plus its shims, and `/products/extensions` appears
automatically — category pages only render for categories that have something in them.

**Category pages are views; product URLs stay flat.** A category never owns an item's
URL, so recategorising something later cannot break its links. That matters because one
of these URLs is registered with Google Play.

## Why there is no `[slug]` route

Next 16 emits a Node ISR fallback for a dynamic segment **even with
`dynamicParams = false`**, and `next-on-pages` classifies that fallback as an invalid
function and **fails the build**. `runtime = "edge"` would suppress it but is mutually
exclusive with `generateStaticParams`. Concrete per-product route files are the way out.
This cost a failed Cloudflare build on PR #33 — do not "simplify" it back.

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
