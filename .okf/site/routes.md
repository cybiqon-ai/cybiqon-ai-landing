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
| `/about` | `app/about/page.tsx` → `AboutClient.tsx` | server + metadata |
| `/our-works` | `app/our-works/page.tsx` → `OurWorksClient.tsx` | server + metadata |
| `/pricing` | `app/pricing/page.tsx` → `PricingClient.tsx` | server + metadata |
| `/process` | `app/process/page.tsx` → `ProcessClient.tsx` | server + metadata |
| `/case-studies` | `app/case-studies/page.tsx` → `CaseStudiesClient.tsx` | server + metadata |
| `/faq` | `app/faq/page.tsx` → `FaqClient.tsx` | server + metadata, FAQPage JSON-LD |
| `/contact` | `app/contact/page.tsx` → `ContactClient.tsx` | server + metadata |
| `/free-audit` | `app/free-audit/page.tsx` | server + metadata |
| `/privacy`, `/terms` | | server |

All seven now have a server `page.tsx` exporting unique metadata plus a co-located
`XClient.tsx` — fixed 25 Jul 2026, see [SEO](/site/seo.md).

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

**404 today:** `/apps` · `/apps/llmbytes`

`/rss.xml` shipped 25 Jul 2026 — `app/rss.xml/route.ts`, edge runtime, 50 most
recent posts from D1, listed in the sitemap and in the layout's `alternates.types`.

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

`app/rss.xml/route.ts` — edge, reuses the `sitemap.ts` D1 query shape. XML-escapes
titles and excerpts, and degrades to an empty-but-valid feed on a D1 outage rather
than a 500, so subscribers don't drop the feed.

# Layout

`app/layout.tsx` wraps everything in Navbar / Footer / WhatsAppWidget /
RevealObserver / Toaster / Sonner / TooltipProvider, and carries the GA4 snippet.

# See also

- [SEO](/site/seo.md) — the metadata gap on the client pages
- [Lead capture](/content/lead-capture.md) — the one write path
