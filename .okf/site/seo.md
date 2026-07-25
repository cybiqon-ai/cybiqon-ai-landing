---
type: Domain
title: SEO
description: Strong structured data and a working sitemap, undermined by seven commercial pages that export no metadata at all because they are client components.
tags: [seo, metadata, json-ld, sitemap, search-console]
timestamp: 2026-07-25T00:00:00Z
---

# Overview

The site publishes a blog post **every single day**. Its seven highest
commercial-intent pages are **invisible to search**. Both things have been true
for months.

# What works

**`app/layout.tsx`** — `metadataBase`, title template `%s | Cybiqon AI Solutions`,
default description, robots/googleBot directives, OpenGraph (website, `en_IN`,
`/logo.png` 1200×630), Twitter `summary_large_image` `@CybiqonAI`, `theme-color`,
and hreflang alternates (en-IN / en / x-default).

**JSON-LD** is genuinely well covered:

| Schema | Where |
|---|---|
| Organization + ProfessionalService | layout |
| Service ItemList + Breadcrumb | `/` |
| FAQPage | `/faq` |
| LocalBusiness + Breadcrumb | `/contact` |
| Article + Breadcrumb | `/blog/[slug]` |
| Product | `/pricing` |
| Breadcrumb | blog index, about, free-audit, case-studies, apps pages |

**`app/sitemap.ts`** — edge runtime, 14 hardcoded static URLs plus every published
blog slug from D1, wrapped in try/catch so a D1 failure degrades to static-only
rather than serving nothing. **`app/robots.ts`** — allows `/`, disallows `/api/`
and `/_next/`, declares the sitemap.

# The gap that costs money

**Seven pages are `"use client"`, so they export no `metadata` object at all:**

```
/pricing   /our-works   /case-studies   /contact   /about   /process   /faq
```

No unique `<title>`, no description, no `alternates.canonical`, no OpenGraph.
They inherit only the root defaults, so Google sees seven pages with effectively
the same title and no canonical signal.

These are the pages someone lands on when they are ready to buy.

**The fix is mechanical and identical for each:** rename the existing file to a
co-located client child, and add a thin *server* `page.tsx` that exports metadata
and renders it.

```
app/pricing/page.tsx          → server wrapper, exports metadata
app/pricing/PricingClient.tsx → the existing "use client" body, unchanged
```

Order by commercial intent: **pricing → our-works → contact**, then the rest.

# Also missing

| Gap | Consequence |
|---|---|
| **No Search Console verification** | no `verification` key in metadata |
| **No RSS feed** | `/rss.xml` 404s |
| **No tag routes** | tag filtering is client-side only, so tags have zero indexable URLs despite being stored on every post |
| **No OG image generation** | every page shares `/logo.png`; only blog posts get a real image |
| `sitemap.ts` `lastModified` | uses `new Date()` for every static page — everything always claims to have changed today, a weak and noisy signal |
| **No author / E-E-A-T page** | posts credit "Cybiqon Team" with no link |

# Indexing is not being submitted

Separate from this repo but directly downstream: the blog pipeline submits new
URLs to the **Google Indexing API**, and that has been failing since ~10 Jul
because the OAuth client-secret file went missing. Three weeks of daily posts,
none submitted.

Publishing daily into a site whose commercial pages have no metadata, while not
submitting anything for indexing, is close to the worst possible allocation of a
content engine.

# Measurement

**GA4 only** (`G-JBTXQ3BF5C`), inline in `app/layout.tsx` via `next/script`.

**Zero events fire.** Audit-form submissions and WhatsApp clicks are untracked, so
no conversion on this site is currently measurable. No GTM, no Plausible, no
Clarity, no Meta pixel.

# See also

- [Routes](/site/routes.md) — which pages are client components
- [Blog](/content/blog.md) — what is being published daily
- [Lead capture](/content/lead-capture.md) — the conversion that isn't tracked
