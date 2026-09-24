---
type: Domain
title: MapWit guides
description: /products/mapwit/guides/* — practical pages for people prospecting on Google Maps, sitting with the product because they fit neither the India-gated blog nor the engineering lab. Each target query is checked with demand_check.py before the page is written.
tags: [mapwit, guides, seo, content, products, static]
timestamp: 2026-09-22T00:00:00Z
---

# Overview

Started **22 Sep 2026**, after an outside suggestion to build a six-article MapWit cluster.
Three of those pages survived checking; this is where they live.

**Why not `/blog` or `/lab`.** `/blog` is written for Indian businesses that have outgrown
spreadsheets, every topic must lead to one of the seven services, and `topic-finder.md`
rejects self-promotion — a MapWit cluster fights all three. `/lab` is first-party measured
engineering notes. A guide for whoever is prospecting on Maps, anywhere, belongs with the
product it is about.

# What was checked before writing

Run on 22 Sep 2026 with `tools/social-media-manager/demand_check.py` plus Google
autocomplete in both `gl=in` and `gl=us`:

- **Passed:** `how to find businesses without websites for free`,
  `find businesses without websites`, `how to generate leads from google maps`,
  `google maps lead generation`, `how to find web design clients`.
- **No demand, in either geography:** `google maps lead generation chrome extension` —
  which is the target the lab post's `seo_title` carries — and
  `google maps leads for web designers`. Both were dropped rather than written to.
- **The SERP is the constraint, not the demand.** Page one for the head terms is entirely
  rival tools' blogs (Apify, Outscraper, PhantomBuster, LeadsMap, B2BLeadFinder,
  Targetron). Against 2 backlinks from 1 referring domain, these pages are written for the
  long tail, for AI answer engines, and as something outreach can point at — not on an
  expectation of ranking for `google maps lead generation` this quarter.

# Shape

| File | Holds |
|---|---|
| `data/mapwitGuides.ts` | slug, title, `seoTitle`, excerpt, the checked target query, related slugs; `MAPWIT_STORE_URL` is read from `data/products.ts` so the store link has one source |
| `components/mapwit/GuideLayout.tsx` | the shell: back link, h1, body, the store CTA, related strip |
| `app/products/mapwit/guides/<slug>/page.tsx` | one directory per guide — content, `Article` + `BreadcrumbList` + `FAQPage` JSON-LD |
| `app/globals.css` | `.guide-prose`, body typography only; colour and rules come from the Ledger scope |

**Static, like `/tools/website-cost-calculator`** — a route handler would cost ~100 KiB of
a Worker with ~167 KiB left. Register each new guide in `app/sitemap.ts` **and**
`data/llms.config.json`, or `build-llms-txt.mjs --check` fails the build.

# Writing rules

- **Never "scrape" or "scraper" for MapWit.** The store copy says capture and qualify; the
  Load more button was renamed before submission. Naming the word as a category others use
  is allowed; applying it to MapWit is not. See [Lab](lab.md).
- **No install or user counts.** The listing's counters are not worth quoting yet.
- **No invented statistics.** The first guide deliberately refuses to quote a
  "% of businesses with no website" figure and tells the reader to measure their own,
  because no published number survived checking.
- **Every product claim traces** to `data/products.ts` or the lab post. Where the two
  disagree, the post wins: it says Google Maps shows **about 120 results per search**,
  while `data/products.ts` still says "up to 500 listings".
- **Do not repeat the lab post.** It already carries the seven-step workflow, the score
  table and the site-grade formula. A guide earns its place with ground the post has no
  room for.

# Conventions the SEO audit produced

Run against guide 1 on 22 Sep 2026, three findings were acted on rather than declined:

- **Every guide carries a visible date**, from `published`/`updated` in `data/mapwitGuides.ts`,
  rendered by `GuideLayout` and emitted as `datePublished`/`dateModified`. A guide with no
  date is one a reader has to guess about.
- **The target phrase belongs in the h2s, not the h1** — the repo's standing rule. Guide 1
  first shipped with none of its h2s containing "businesses without websites", and the
  audit duly read the page's subject as "google maps".
- **The audit's "thin content" finding was wrong, and acting on it was still right.** It
  reported guide 1 at 924 words because its word count read `<p>` tags only, ignoring the
  lists, table and FAQ that are most of these pages — a bug now fixed in
  `ops/scripts/seo-skill-patch.py` and recorded in the repo CLAUDE.md. The guide was never
  924 words. The two sections added in response (which trades are worth searching, and the
  businesses whose site is the problem rather than absent) were genuinely missing, so the
  expansion stands — but the number that prompted it was an artifact. Measure a page with
  the whole `<article>`, not the audit's figure, before believing it is thin.

Declined, as on every page here: the 155-character meta description limit (excerpts are
front-loaded by convention) and the FAQPage "restricted" warning (see the repo CLAUDE.md).

# Trap: JSX eats the space after an inline tag

`<strong>No email address.</strong> Never.` renders as **No email address.**Never. — JSX
trims the space between a closing inline tag and the text node after it, and neither the
build nor `tsc` says a word. It shipped in guide 1 and was found by reading the rendered
HTML, not the source. Write `</strong>{" "}` explicitly. To check a page:

```bash
curl -s <url> | grep -o -E '</(strong|em)>[A-Za-z“”"]'   # any output is a run-together
```

# Published

| Slug | Target | Its own ground |
|---|---|---|
| `find-businesses-without-websites` | `how to find businesses without websites for free` | that "no website" on Maps is often wrong — booking-platform-only listings, links back into Google, social-only — how to check, and the Maps-terms and DPDP limits on the list |
| `google-maps-lead-generation` | `google maps lead generation` | the hub. All four methods compared **including the three we do not sell** (by hand, the Places API, bought lists), what a Maps listing does not contain, and qualification as the work that matters |

Places API pricing is deliberately not quoted: Google changed the model in March 2025 and
the figures we could verify disagreed with each other, so the page links the pricing page.

Planned next: `find-web-design-clients`.
