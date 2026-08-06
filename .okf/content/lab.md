---
type: Domain
title: Lab
description: The second blog at /lab — hand-written engineering notes sharing a D1 table with the automated MSME blog, separated by a section column, its own chrome, and the only palette departure on the site.
tags: [lab, blog, d1, content, design, edge, seo, aeo]
timestamp: 2026-08-06T00:00:00Z
---

# Overview

`/lab` is the company's **second** blog: hand-written engineering notes about what is
being built, what broke, and what the numbers said. `/blog` is the automated MSME SEO
channel — see [Blog](blog.md). They share one D1 table and nothing else.

Created 1 Aug 2026. **Three posts**: two migrated from `itspyguru.github.io` on day one,
and `nobody-escaped-the-sandbox-had-a-door` written here and committed 6 Aug 2026 (commit
`cc37929`, whose subject line belongs to a different change — the commit touches only that
post).

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

Migration `0007_lab_seo.sql` adds the two columns the SEO/AEO pass needed (6 Aug 2026):

```sql
ALTER TABLE blog_posts ADD COLUMN seo_title  TEXT;      -- NULL = same as title
ALTER TABLE blog_posts ADD COLUMN updated_at DATETIME;  -- NULL = never edited
```

Both are `/lab`-only in practice and both are **nullable with a meaningful NULL**.
`seo_title` NULL means "the searchable title and the printed title are the same", which is
what every MSME row means and what a lab post means until someone writes a second title.
`updated_at` NULL means "never edited since publication", which is why `dateModified` is
*omitted* from the JSON-LD rather than defaulted to `datePublished` — see
[Discoverability](#discoverability) below.

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
| `/lab` | ledger index, paginated, opens on the lab's own readout. `?tag=<slug>` filters it |
| `/lab/[slug]` | `WHERE slug = ? AND section = 'lab' AND published = 1` |
| `/lab/about` | author page — Person JSON-LD, closes the E-E-A-T gap in [SEO](/site/seo.md) |
| `/lab/rss.xml` | separate feed; `/rss.xml` stays MSME-only |

`/lab` is linked from the **footer only**. `components/Navbar.tsx` is already at the link
count that fits its breakpoint without wrapping — `/process` was dropped for the same
reason — and the footer renders on every page, so the crawl path exists regardless.

**There is no `/lab/tag/[tag]` route and there should not be.** A React edge route costs
~440 KiB against a ceiling with under 200 KiB of room, so tag filtering is a `?tag=` query
on the index, which already reads `searchParams`. Those views are `noindex, follow` and
canonicalise to `/lab`: three posts sliced five ways is the thin-content pattern
`MIN_POSTS_PER_TAG` keeps off `/blog`, and the right answer is to leave the crawl path and
decline the index, not to hide the link. `findLabTag` deliberately does **not** reuse
`getTagIndex` — a three-post floor applied to a three-post section filters out every tag.

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
`--no-touch` republishes without moving `updated_at`: a typo fix is not a revision, and
spending `dateModified` on a fixed apostrophe teaches crawlers to ignore it.

**The frontmatter contract and the body conventions are documented in
`lab/posts/README.md`.** Two things there are load-bearing rather than stylistic:

* `## TL;DR` early and `## FAQ` before `## Sources`. The site reads the FAQ section back
  out of the rendered HTML and emits `FAQPage` JSON-LD from it — nothing is stored, for
  the same reason the rail derives its figures. The publisher prints a warning when either
  block is missing.
* ⚠️ **Sources must be `## Sources`, not `###`.** `extractFAQ` ends the FAQ section at the
  next `h2`; as a subsection, Sources is read as a question with twenty links for an
  answer. This was verified by test, not by inspection.

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

# Views and sharing

Added 1 Aug 2026. Migration `0005` puts a `views` column on `blog_posts` — a column
rather than a `post_views` table because the detail page and index already `SELECT *`,
so the count arrives in a query that was happening anyway.

**Counted from the browser, not from the render.** `components/lab/ViewBeacon.tsx` POSTs
to `/api/lab/view` once per browser session. Incrementing during the page render would
have been free of a route, but a render is a GET: it would count every crawler, every
RSS fetcher and every Next `<Link>` prefetch. The rail says "views" and should mean
people. `keepalive` is set so a reader who clicks away immediately still counts.

The endpoint carries `AND section = 'lab'` for the usual reason — without it, a public
write path into the automated MSME blog's rows. Unknown slugs return 204 and match
nothing; there is nothing useful to tell a caller probing for valid slugs.

Views render **last** on the rail and are **omitted at zero**: everything above them is a
property of the writing, this one is a property of its audience, and "0 views" is a claim
where an absent row is not.

`components/lab/ShareRow.tsx` is styled as readouts rather than brand-coloured social
chips — those are the one element that would make the page look like every other blog.
Native `navigator.share` appears only where supported (detected in an effect, not during
render, or SSR breaks). The link preview comes from the OG card generated at publish
time; nothing at share time creates it.

⚠️ **This cost ~100 KiB of Worker headroom** — one edge route handler. See the size trap
below for the current figure.

# Discoverability

Added 6 Aug 2026, after `analysis.md` scored the sandbox post 9.5 on writing and **6.5 on
SEO** — and after a pasted link failed to load in ChatGPT.

**The rendering was never the problem.** `/lab/[slug]` is an edge server component that
puts the whole body in the first response: 118 KB of HTML, ~21.5 K visible characters,
137 ms TTFB, correct canonical, OG, and `BlogPosting` + `BreadcrumbList` JSON-LD.

⚠️ **Why ChatGPT would not read it is still unknown, and two confident answers have
already been wrong.** It is not SSR (above). It is not the Cloudflare WAF either — the AI
Crawl Control crawlers table shows `ChatGPT-User` at **132 allowed / 8 unsuccessful**,
which is not a blocked bot, and this bundle asserted the opposite for a few hours on
6 Aug 2026. It is not robots.txt: `ChatGPT-User` does not consult it. Note also that
`curl -A ChatGPT-User` returns 200 and proves nothing, because Cloudflare never believes
the spoof. Full account, including the two threads still worth pulling, in
[SEO](/site/seo.md#ai-crawlers).

The work below was worth doing regardless — it is what makes a page citable once an
engine reaches it — but **do not describe it as having fixed the ChatGPT problem.**

What the code does carry:

| Signal | Where |
|---|---|
| `FAQPage` JSON-LD | derived from the post's own `## FAQ` section by `extractFAQ` |
| `citation` | every distinct external URL the post links to, via `extractCitations` |
| `about` / `articleSection` | tags as `Thing` entities rather than a keyword string |
| `alternativeHeadline` | the printed title, kept beside the searchable `seo_title` |
| `dateModified` | from `updated_at`, **omitted when NULL** |
| `blogPost` | `/lab`'s `Blog` node now lists its entries |
| Related posts | `getRelatedLabPosts`, ranked by shared tags then recency |
| `content:encoded` | `/lab/rss.xml` carries full article text; `/rss.xml` stays excerpt-only |
| `llms.txt` | `public/llms.txt` — a **static asset**, so it costs no Worker bytes |
| Markdown copies | `/md/lab/<slug>.md` and `/llms-full.txt`, generated at build time |

# Agent-readable markdown

Added 6 Aug 2026. Every lab post is also served as clean markdown at
**`/md/lab/<slug>.md`**, with all three concatenated at **`/llms-full.txt`**. Generated by
`scripts/build-agent-markdown.mjs`, wired into `npm run build` so they cannot drift from
`lab/posts/` — a generated file refreshed only when someone remembers is precisely the
stale-document failure mode [we-built-a-wiki-our-ai-agents-ignored-it] is about.

Worth it because the markdown is **19% of the HTML**: 28 KB against 151 KB for the sandbox
post, same prose, structure intact. Discovery is via `alternates.types` in
`generateMetadata` (a `<link rel="alternate" type="text/markdown">` in the head), plus
`llms.txt` and the sitemap.

⚠️ **Three findings here were established by probe, not by reasoning. Do not undo them.**

* **The paths are `/md/lab/<slug>.md`, not the nicer `/lab/<slug>.md`.** The latter matches
  the `/lab/[slug]` edge route, which looks up a post whose slug ends in `.md` and 404s.
* **`public/_headers` only affects static assets.** A rule matching a Pages Function route
  is silently ignored — a `Link:` header on `/lab/*` never appeared on the response, while
  the `/md/lab/*` `Content-Type` rules applied. Cloudflare's "Link Headers" diagnostic
  asks for exactly the thing this file cannot do for a page route.
* **`@cloudflare/next-on-pages` preserves `public/_headers`**, appending its immutable
  block between `START/END AUTOGENERATED` markers. Custom rules above them survive.

Also worth knowing when testing: `wrangler pages dev` serves from an asset manifest
compiled at build time, so a file dropped into `.vercel/output/static` after boot returns
404. Rebuild rather than debugging a phantom routing problem.

**Cost: 190 Worker bytes** (one `alternates` line) and 160 KB of static assets, which the
Worker ceiling does not count. This was Cloudflare's "Markdown Negotiation" diagnostic;
true `Accept:` negotiation would need a route handler at ~100 KiB of a ~182 KiB budget,
which is why it is files instead.

Two judgements worth keeping:

*`dateModified` is omitted rather than defaulted.* Emitting `datePublished` for a post
that was never edited is a false claim, and this is the section whose premise is that
published numbers are real.

*`llms.txt` is not a traffic lever.* Measured studies — Ahrefs across 137 K domains —
find ~97% of `llms.txt` files receive zero requests, and AI crawlers fetch HTML directly.
It is here because a static file costs nothing, not because it is expected to move a
number. Do not report it as an SEO win.

# Design

`/lab` renders **no marketing chrome at all**: `components/ThemeScope.tsx` suppresses
Navbar, Footer and the WhatsApp widget, and `app/lab/layout.tsx` supplies its own header
and footer. That is what earns it the palette departure Ledger was denied — see
[Design system](/site/design-system.md).

Three faces, loaded in the lab layout so the other 14 pages do not preload them: Archivo
(display, driven on its `wdth` axis by container queries), Source Serif 4 (prose, weight
420 on dark because serif hairlines thin out), DM Mono (readouts and code).

# Traps

**The theme must be a data attribute, not a class, and must not come from the server.**
Two wrong turns, both instructive:

*A class on `<html>` set by a pre-paint script* fails silently. `app/layout.tsx` renders
`<html className={geist.variable}>`, so React owns that prop and hydration reconciles the
class away. Renders dark, toggle appears not to persist, nothing errors.

*The class rendered server-side from a cookie* is correct but makes the whole `/lab`
segment dynamic — which turned `/lab/about` into a third edge function and **broke the
deploy** on Worker size (below).

`data-lab-theme` on `<html>` works because React does not reconcile attributes it never
rendered, and it keeps the segment static-capable.

**The Worker has a 3 MiB gzipped ceiling and /lab spends most of the remaining room.**
Cloudflare's free plan caps the Pages Function bundle at 3 MiB gzipped, and it is enforced
**at upload, not at build** — `npx @cloudflare/next-on-pages` reports success and the
deploy then fails with *"Your Worker exceeded the size limit of 3 MiB"*. Adding `/lab`
first pushed it to 3.36 MiB.

Every React route compiled for the edge costs **~440 KiB gzipped** and every route
*handler* about **100 KiB**, so the budget is roughly six pages.

**Current state, measured 6 Aug 2026 after the discoverability pass: 2 959 426 bytes —
2.82 MiB, 182 KiB of headroom.** That whole pass cost about 3 KiB, because it added no
routes: schema, extraction and related posts all landed inside existing ones, and
`llms.txt` is a static asset. Two earlier figures in this bundle disagreed — `~90 KiB`
here and `174 KiB` in `log.md` — because this file was never re-synced after `/api/blog`
was retired. **182 KiB is the number; the other two are dead.** It is still not enough for
another React route. Two things bought the headroom back, and both must stay:

* `/lab/about` prerenders as static. It has no dynamic data, so it only costs an edge
  function if the layout forces the segment dynamic. **Keep `cookies()`, `headers()` and
  `searchParams` out of `app/lab/layout.tsx`.**
* `TooltipProvider` and the radix `<Toaster />` are gone from the root layout. Neither
  was used anywhere — no `<Tooltip>` outside `components/ui`, no `useToast()` call — and
  a dead provider in the root layout is paid for by every edge route. Sonner stays;
  `components/AuditForm.tsx` genuinely calls it.

**Before adding another edge route, measure.** Gzip every `.js` under
`.vercel/output/static/_worker.js/` and total it.

The obvious next ~200 KiB, if it is ever needed: `/api/blog` and `/api/blog/[slug]`.
Nothing on this site consumes them — they exist as a public read API. Removing them is a
breaking change for any outside caller, so it is a decision, not a cleanup.

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
- [SEO](/site/seo.md) — the author page, OG generation, and the AI-crawler posture
