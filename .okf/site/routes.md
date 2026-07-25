---
type: Reference
title: Routes
description: Every route the site serves, which are server vs client components, and the ones that 404 today despite being linked from structured data.
tags: [routes, app-router, nextjs, 404]
timestamp: 2026-07-25T00:00:00Z
---

# Marketing pages

| Route | File | Rendering |
|---|---|---|
| `/` | `app/page.tsx` | server — metadata + Service/Breadcrumb JSON-LD |
| `/about` | `app/about/page.tsx` | **client** |
| `/our-works` | `app/our-works/page.tsx` | **client** |
| `/pricing` | `app/pricing/page.tsx` | **client** |
| `/process` | `app/process/page.tsx` | **client** |
| `/case-studies` | `app/case-studies/page.tsx` | **client** |
| `/faq` | `app/faq/page.tsx` | **client** — FAQPage JSON-LD |
| `/contact` | `app/contact/page.tsx` | **client** |
| `/free-audit` | `app/free-audit/page.tsx` | server + metadata |
| `/privacy`, `/terms` | | server |

The seven `"use client"` pages **export no metadata at all** — see
[SEO](/site/seo.md). That is the single highest-value fix on the site.

# Blog

| Route | Notes |
|---|---|
| `/blog` | server, `runtime="edge"`, D1 query, 30 most recent |
| `/blog/[slug]` | server, `runtime="edge"`, live D1 query per render |

# Apps

```
app/apps/llmbytes/privacy/page.tsx     ✅ 200
app/apps/llmbytes/terms/page.tsx       ✅ 200
```

That is the **entire** contents of `app/apps/`. There is no `app/apps/page.tsx`,
no `[slug]` route, and no `app/apps/llmbytes/page.tsx`.

**404 today:** `/apps` · `/apps/llmbytes` · `/rss.xml`

Both existing pages emit BreadcrumbList JSON-LD pointing at
`https://cybiqon.in/apps/llmbytes` — **a URL that does not exist**. Structured
data asserting a 404 is worse than omitting it.

Both pages are hand-written JSX (326 and 264 lines) with the legal copy inline.
The queued fix replaces them with `data/apps.ts` + `app/apps/page.tsx` +
`app/apps/[slug]/{page,privacy,terms}` covering llmbytes, meflow and vitaloop.

That also unblocks **VitaLoop's Play Store submission**, which currently points at
`vitaloop.app/privacy` — a domain that resolves to nothing.

# API

All `runtime="edge"`:

| Route | Purpose |
|---|---|
| `GET /api/blog` | list posts |
| `GET /api/blog/[slug]` | one post |
| `POST /api/audit` | the only write — see [lead capture](/content/lead-capture.md) |

# Generated

`app/sitemap.ts` (edge — 14 static URLs + D1 blog URLs, try/catch falls back to
static-only) · `app/robots.ts` · `app/not-found.tsx`

**No `app/rss.xml/route.ts`** — confirmed 404. The D1 query in `sitemap.ts` is
directly reusable for it.

# Layout

`app/layout.tsx` wraps everything in Navbar / Footer / WhatsAppWidget /
RevealObserver / Toaster / Sonner / TooltipProvider, and carries the GA4 snippet.

# See also

- [SEO](/site/seo.md) — the metadata gap on the client pages
- [Lead capture](/content/lead-capture.md) — the one write path
