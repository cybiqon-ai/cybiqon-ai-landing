---
type: Domain
title: SEO
description: Structured data, sitemap, RSS and per-page metadata are all in place as of 25 Jul 2026; the blog is indexed and the remaining gap is ranking, not discovery.
tags: [seo, metadata, json-ld, sitemap, search-console, rss]
timestamp: 2026-07-25T17:22:45Z
---

# Overview

**The blog is indexed.** `site:cybiqon.in` returns blog URLs; posts carry unique
titles, descriptions, `index, follow`, canonicals and Article JSON-LD, and all 76
are in `sitemap.xml`. Discovery was never the problem — an earlier version of this
concept implied otherwise and was wrong.

For four months the *commercial* pages were the problem: seven of them shipped the
identical `<title>` as the homepage. **Fixed 25 Jul 2026.**

What remains is **ranking**, which is a content and authority problem rather than a
technical one — the site targets head terms held by entrenched competitors.

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

# The gap that cost money — FIXED 25 Jul 2026

Until 25 Jul, seven pages were `"use client"` and exported no `metadata` at all:

```
/pricing   /our-works   /case-studies   /contact   /about   /process   /faq
```

**All seven shipped the identical `<title>` as the homepage** — "Affordable Web
Development & AI Automation for Indian MSMEs | Cybiqon AI Solutions" — with no
description, no canonical and no OpenGraph. Google saw seven near-duplicate pages
where the site's entire commercial intent lives.

**Fixed** by splitting each into a server `page.tsx` exporting metadata plus a
co-located client component:

```
app/pricing/page.tsx          server — title, description, keywords, canonical, OG
app/pricing/PricingClient.tsx the original "use client" body, unchanged
```

All seven now prerender statically with distinct titles under 75 rendered
characters. One trap worth remembering: the root layout sets
`template: "%s | Cybiqon AI Solutions"`, so a page title ending in the brand gets
it **twice** — page titles must omit it, while `openGraph.title` (not templated)
should include it.

# Crawl paths — rebuilt 25 Jul 2026

`/blog` used to render **9 post links out of 76** with pagination in `useState` and
no paginated URLs, leaving **46 posts with no internal link anywhere on the site** —
sitemap-only, which is what Google files under *"Discovered — currently not
indexed"*.

Now: `/blog?page=1..9` server-rendered with real hrefs (verified live, 76/76 posts
reachable), 21 `/blog/tag/<slug>` archives, and a sitemap listing all 120 URLs —
76 posts, 21 tags, 8 paginated indexes, 15 static.

# Still missing

| Gap | Consequence |
|---|---|
| **No OG image generation** | every page shares `/logo.png`; only blog posts get a real image |
| `sitemap.ts` `lastModified` | uses `new Date()` for every static page — everything always claims to have changed today, a weak and noisy signal |
| **No author / E-E-A-T page** | posts credit "Cybiqon Team" with no link |

# Nothing needs "submitting"

The blog pipeline used to POST every new URL to the **Google Indexing API**, and
that broke on ~10 Jul when the OAuth client-secret file went missing.

**That was never doing anything.** The Indexing API only accepts pages carrying
`JobPosting` or `BroadcastEvent` structured data — it ignores blog posts, and using
it for general content breaches the API terms. The call has been removed from the
pipeline; the outage was protective.

Manually pasting URLs into Search Console's **URL Inspection → Request Indexing**
also isn't the answer at this scale: it's rate-limited to roughly 10–12/day and it
only asks for a recrawl — Google still decides independently whether to index.
Discovery is the sitemap's job, and the sitemap is correct.

What the missing credential still costs is **Search Console query data** —
impressions, average position, CTR. That is a measurement loss, not an indexing
one, and it is the one thing worth restoring: it shows which queries the site
ranks 8th–20th for, where a small improvement actually converts.

# Measurement

**GA4 only** (`G-JBTXQ3BF5C`), inline in `app/layout.tsx` via `next/script`.

**Zero events fire.** Audit-form submissions and WhatsApp clicks are untracked, so
no conversion on this site is currently measurable. No GTM, no Plausible, no
Clarity, no Meta pixel.

# See also

- [Routes](/site/routes.md) — which pages are client components
- [Blog](/content/blog.md) — what is being published daily
- [Lead capture](/content/lead-capture.md) — the conversion that isn't tracked
