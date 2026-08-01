---
type: Domain
title: Lab
description: The second blog at /lab — hand-written engineering notes sharing a D1 table with the automated MSME blog, separated by a section column, its own chrome, and the only palette departure on the site.
tags: [lab, blog, d1, content, design, edge]
timestamp: 2026-08-01T00:00:00Z
---

# Overview

`/lab` is the company's **second** blog: hand-written engineering notes about what is
being built, what broke, and what the numbers said. `/blog` is the automated MSME SEO
channel — see [Blog](blog.md). They share one D1 table and nothing else.

Created 1 Aug 2026. Two posts, both migrated from `itspyguru.github.io`.

**Why it lives here rather than on the personal portfolio.** Publishing on the portfolio
means editing a TypeScript array, running `vite build && node scripts/prerender.mjs`, and
committing ~20 regenerated files — a build per post. Here a post is a D1 row and is live
on write, with no deploy at all. `itspyguru.github.io` is also on the Public Suffix List,
so it accrues no domain authority and never will.

# The section column

Migration `0004_lab_section.sql`, applied to remote D1 on 1 Aug 2026 (81 rows took the
`'msme'` default):

```sql
ALTER TABLE blog_posts ADD COLUMN section  TEXT NOT NULL DEFAULT 'msme';
ALTER TABLE blog_posts ADD COLUMN readouts TEXT;   -- JSON [{label, value}]
CREATE INDEX idx_blog_section ON blog_posts(section, published, created_at DESC);
```

⚠️ **Slugs are unique across the whole table, not per section.** An unscoped read does
not merely return too many rows — it renders a lab post inside the marketing chrome at
`/blog/<slug>`. Every read of `blog_posts` must name its section. `getPagedPosts`,
`getTagIndex` and `getPostBySlug` in `lib/blog.ts` therefore take `section` as a
**required** argument with no default: a default would make the leak the quiet option.

Scoped in this pass: `lib/blog.ts`, `app/blog/[slug]`, `app/blog/tag/[tag]`,
`app/rss.xml`, `app/sitemap.ts`, `app/api/blog`, `app/api/blog/[slug]`.

**Two scopings live outside this repo and matter more.**

`ops/scripts/collect_metrics.py::blog_metrics()` is now `section = 'msme'` throughout.
Unscoped, publishing one lab post by hand would refresh `last_at` and silence the *"No
blog post in Nh — publish pipeline may be down"* warning in the 08:35 IST brief for
another 30 hours. `lab_posts` is reported separately and deliberately does **not** feed
the staleness check: `/lab` has no cadence to be late against.

`tools/social-media-manager` filters on `section = 'msme'` in `content-clusters.md`
(cluster membership) and `orchestrator.md` (the reciprocal-backlink `UPDATE blog_posts
SET content = ?`). Lab posts carry tags like `AI` and `Automation` that match several
pillars' keyword signals, so without those filters the nightly agent can pick a lab post
as a cluster sibling and rewrite hand-written prose to insert an MSME link.

# Routes

All `runtime = "edge"`, no `generateStaticParams` — see [Routes](/site/routes.md) for why
those two are mutually exclusive here.

| Route | Notes |
|---|---|
| `/lab` | ledger index, paginated, opens on the lab's own readout |
| `/lab/[slug]` | `WHERE slug = ? AND section = 'lab' AND published = 1` |
| `/lab/about` | author page — Person JSON-LD, closes the E-E-A-T gap in [SEO](/site/seo.md) |
| `/lab/rss.xml` | separate feed; `/rss.xml` stays MSME-only |

`/lab` is linked from the **footer only**. `components/Navbar.tsx` is already at the link
count that fits its breakpoint without wrapping — `/process` was dropped for the same
reason — and the footer renders on every page, so the crawl path exists regardless.

# Authoring

Source of truth is a markdown file in this repo at `lab/posts/<slug>.md`; D1 holds the
rendered HTML. The publisher is `tools/social-media-manager/lab/publish_lab.py` — it
lives in that repo because it needs Cloudflare credentials and **this repo is public**.

It is a separate script from `publish_blog.py` on purpose: that file is rewritten by the
nightly agent on every run and is permanently dirty in git, `nl2br` is on there and off
here (it would wreck a code block), and its Cloudflare token is hardcoded. Re-running the
publisher on the same slug updates the row and keeps its original `created_at`.

`--draft` forces `published = 0`, which is required when a row must exist before the
section-scoping code has deployed — until then the live site queries unscoped.

# The measurement rail

The signature element, and the reason the section exists in this shape. Every post shows
a rail of figures: date, word count, reading time, sources cited, plus whatever the post
measured about something else.

**Derived at render time, never stored.** `lib/lab.ts` computes word count (excluding
`<pre>` blocks), reading time and source count (distinct external hostnames, so a paper
cited four times counts once) from the body on every render. Only figures that *cannot*
be derived go in the `readouts` column. A stored count goes stale the first time a post
is edited, and a blog whose premise is publishing real numbers cannot afford a number
that used to be true.

`CLAUDE.md` ground rule 3 — *a cron that can fail silently must report a count, not a
status* — is where this comes from. The rail applies the same standard to the writing.

# Design

`/lab` renders **no marketing chrome at all**: `components/ThemeScope.tsx` suppresses
Navbar, Footer and the WhatsApp widget, and `app/lab/layout.tsx` supplies its own header
and footer. That is what earns it the palette departure Ledger was denied — see
[Design system](/site/design-system.md).

Three faces, loaded in the lab layout so the other 14 pages do not preload them: Archivo
(display, driven on its `wdth` axis by container queries), Source Serif 4 (prose, weight
420 on dark because serif hairlines thin out), DM Mono (readouts and code).

# Traps

**The theme cannot be set by a pre-paint script.** The obvious no-flash trick — inline
script putting a class on `<html>` — fails here and fails *silently*. `app/layout.tsx`
renders `<html className={geist.variable}>`, so React owns that attribute and hydration
reconciles the class away. The page renders dark, the toggle appears not to persist, and
nothing errors. The theme is read from the `lab-theme` cookie on the server instead.

**Share cards are generated at publish time, not at request time.** `og_card.py` renders
1200×630 PNGs with Pillow and uploads them to R2 at `lab/og/<slug>.png`. Runtime
generation would mean satori + WASM on the edge, and this build has broken on
next-on-pages before. The card's readout strip is the same rail the page shows.

**`CLOUDFLARE_R2_PUBLIC_URL` in the pipeline `.env` is stale** — it points at a
`pub-*.r2.dev` endpoint while every `image_url` in D1 is on `media.cybiqon.in`.
`publish_blog.py` sidesteps it by hardcoding the host; `publish_lab.py` does the same and
says why. Using the variable produces URLs that look right in the log and resolve to
nothing.

**Serialised chrome.** Because `ThemeScope` decides on the client, Next serialises the
Navbar/Footer props into every `/lab` RSC payload even though they never render — ~9 KB
raw, ~2 KB gzipped. Measured, and judged not worth middleware or a route-group move.

# See also

- [Blog](blog.md) — the MSME half of the same table
- [Design system](/site/design-system.md) — why this theme may recolour and Ledger may not
- [Routes](/site/routes.md) — the edge-runtime constraint
- [SEO](/site/seo.md) — the author page and OG generation
