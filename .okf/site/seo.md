---
type: Domain
title: SEO
description: Structured data, sitemap, RSS and per-page metadata are all in place as of 25 Jul 2026; the blog is indexed and the remaining gap is ranking, not discovery.
tags: [seo, metadata, json-ld, sitemap, search-console, rss, aeo, ai-crawlers]
timestamp: 2026-09-08T00:00:00Z
---

# Overview

## React 19 preloads every server-rendered `<img>` — 8 Sep 2026

**Any `<img>` rendered on the server without `loading="lazy"` gets a
`<link rel="preload" as="image">` in `<head>`.** Not a Next config, not something
this repo asked for — it is React 19's renderer, and it applies to plain `<img>`
tags, which is what this site uses throughout (`next.config.mjs` installs a
passthrough loader).

On the homepage that meant **nine below-the-fold images preloaded at high
priority**: the 90 KB Economic Times scan, the 45 KB Snackly storefront shot and
seven product icons — 155 KB racing the LCP element and two font files on the
mid-range Android this page sells into. The footer logo was the only image on the
page *not* being preloaded, and the only one that already carried the attribute.

Fixed in `components/Proof.tsx`, which now documents it so a later edit does not
strip the attribute back off. After the fix the page emits **one** image preload,
`/logo.png` in the navbar, which is genuinely above the fold.

**Not yet audited:** the same pattern exists on other pages —
`components/products/ProductIndex.tsx`, `ProductDetail.tsx`, `blog/BlogCard.tsx`,
`app/press/page.tsx`, `app/about/AboutClient.tsx`,
`app/case-studies/CaseStudiesClient.tsx` and `app/blog/[slug]/page.tsx`. It is
deliberately *not* a blanket fix: on those pages some of those images are the LCP
element, and lazy-loading an LCP image makes things worse. Each page needs its own
look at what is above the fold.

`public/logo.png` is **118 KB** for something rendered at 32×32. It is the one
image that should preload, and it is the heaviest file on the page. Re-encoding it
is a separate change — it is referenced from the navbar, the footer and the
metadata.

## Titles and descriptions, measured across all 44 pages — 8 Sep 2026

An external audit flagged the homepage title at 69 and its description at 189. Measuring
the **built output for every route** rather than the one page found the same problem on
most of the site, plus two defects the audit could not see.

**The title suffix was the whole problem.** `%s | Cybiqon AI Solutions` put 23 characters
of brand on every templated page, which pushed nine of thirteen marketing titles past the
60 Google renders — and the part being cut was always the brand. Shortening it to
`| Cybiqon` bought every page 13 characters back and cost no keyword. **All 44 titles are
now under 60**, against 10 over before.

The homepage title drops the brand entirely (58 chars, all three keywords intact); Google
prints the site name above the title in the SERP regardless, which the audit's own preview
showed.

**The root `default` title and description were the pre-repositioning copy** — "Affordable
Web Development & AI Automation", "WhatsApp bots" — nine months after the company stopped
selling that. They are the fallback for any page that forgets its own, so they were the
one string that had to be right and were not.

**Seven service descriptions were being cut mid-word.** `components/services/meta.ts` did
`\`${tagline} ${intro}\`.slice(0, 185)`, so every one shipped at exactly 185 characters
ending "…checking stock, updat", "…and, where it is". A description cut mid-word reads as
broken, which is worse than one that is merely long. `lib/seo.ts` now holds
`clampDescription`, shared with `components/products/meta.ts`, which prefers the last full
sentence and falls back to a word boundary. **An em dash is not a sentence end** — the
first version of the helper treated it as one and shipped "…own data and rules —".

`app.summary` on the product pages is on-page copy as well as meta, so it is clamped for
the tag and never edited at source.

**Where it stands: 0 titles over 60, 0 descriptions over 160.** Sixteen are under 120, all
of them `products/*/privacy`, `products/*/terms` and the product category pages. Left
alone deliberately — nobody searches for a game's privacy policy, and padding thin legal
pages to hit a length target is writing for a checker.

## hreflang was configured and never emitted

`app/layout.tsx` carried `alternates.languages` with `en-IN`, `en` and `x-default`. It
reached **zero routes**: Next does not deep-merge `alternates`, so every page setting
`alternates: { canonical }` replaced the object whole — the same non-merge trap already
recorded here for `openGraph`. Removed rather than wired through thirteen pages: this is a
single-language site with no alternate versions, which is the case Google says not to use
hreflang for.

## The homepage h2s carried no query terms

Seven h2s, every one a benefit line — "Say goodbye to Indian agency headaches", "What we
build, priced up front", "Businesses that have outgrown spreadsheets". Not one contained a
term anyone types. This repo's own rule is that the h1 stays written to be read and query
terms go in the h2s; two now do — the services section says "Custom software, AI agents and
websites" and the audience section says "Custom software for businesses that have outgrown
spreadsheets". The other five are left as voice.

## Audit findings NOT acted on, and why — 8 Sep 2026

Two audits ran that day: the bundled `seo` skill against the live homepage, and an
external online tool. They overlap, and both are re-run periodically, so the standing
answers live here rather than being re-derived each time.

- **"7 images missing alt text" / "Add Alt Attributes to all images."** Not real. Every
  `<img>` has an `alt`. The seven counted are product icons with `alt=""` inside a link
  whose accessible name comes from the adjacent `<span>` carrying the product name — which
  is correct markup. An alt of "Lumina logo" beside the word "Lumina" double-announces.
  Both checkers count an empty alt as a missing one.
- **"Content may be thin (679 words)"** applies a blog-post threshold to a homepage, and
  **"no publish date"** applies an article rule to a page that is not one.
- **"Remove Inline Styles."** There is exactly one on the page, a `font-variation-settings`
  on a variable font. Not removable and not a cost.
- **"Install a Facebook Pixel."** A tracking pixel with DPDP consent and privacy-policy
  consequences, for ads the company is not running.
- **"Create and link an associated YouTube Channel."** There is no channel. Linking one
  that does not exist is worse than not linking.
- **"Not making use of Hreflang."** Correct at the time and now fixed by deletion — see
  the section above.
- **"Execute a Link Building Strategy."** Correct, and the highest-value item on either
  list — 2 backlinks from 1 referring domain — but no code change addresses it.

What passed and should stay passing: `a11y_seo_checker` scored **100 with zero issues**,
the canonical is self-referential, and all four JSON-LD blocks parse — the one a tool
labels "Unknown" is the `@graph` wrapper holding the five `Service` objects, which has no
top-level `@type` by design.

## www serves a duplicate of the site

`https://www.cybiqon.in/` returns **200**, not a redirect, canonicalised to the apex. The
canonical keeps it out of trouble, but a 301 from www to apex is the clean fix and it is a
**Cloudflare dashboard redirect rule**, not a code change. `http://cybiqon.in` correctly
does one hop to https.

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

(`/our-works` was removed on 29 Aug 2026 and redirects to `/products`. It is kept
in this list because the list is a record of what was broken then, not a route
table.)

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

# Service pages — added 7 Sep 2026

**`/services` plus seven children carry the commercial search terms.** The homepage was
rewritten around positioning — custom software and AI agents — which reads better and ranks
for less than the old page's literal "Website Development" / "Android App Development" /
"Bulk Scraping" / "Chrome Extensions" headings. Both can be true, but not on one page.

| Route | Term |
|---|---|
| `/services` | custom software development for Indian businesses (**primary**) |
| `/services/custom-websites` | website development |
| `/services/ai-agents` | AI agent development, AI automation, business automation |
| `/services/whatsapp-automation` | WhatsApp automation |
| `/services/android-apps` | Android app development |
| `/services/admin-panels` | custom admin panels, internal software |
| `/services/chrome-extensions` | Chrome extension development |
| `/services/web-scraping` | web scraping, data extraction |

**Seven, not the nine terms requested.** "AI Automation", "Business Automation" and "AI
Agent Development" are one intent with three names; three near-identical pages would
cannibalise each other and read as thin, which this site already refuses to ship elsewhere.
They are one page naming the alternatives in its copy, `keywords` and schema.

Each carries `Service` + `FAQPage` + `BreadcrumbList` on top of the layout's `Organization`
and `ProfessionalService` — five schema types per page. Routes are **concrete shims**, not
`/services/[slug]`, for the reason in [Routes](/site/routes.md): Next 16 emits a Node ISR
fallback for a dynamic segment even with `dynamicParams = false` and next-on-pages rejects
it.

**They cost nothing.** Eight new routes added **zero** Worker functions — all prerendered
static — and the bundle moved 3.4 KB, from the nav link. This is the practical proof of the
rule in [design system](/site/design-system.md): only the 12 edge routes count.

`data/llms.config.json` and `app/sitemap.ts` both need updating for any new route — the
pre-push hook runs `check:llms` and blocks on an unlisted one, which is how these were
caught. 49 routes covered now.

# Verifiable trust claims — 7 Sep 2026

Every credibility claim on the homepage now carries either a link to evidence or a
reference number someone can look up:

| Claim | Backed by |
|---|---|
| Startup India, DPIIT | **DIPP256002**, checkable on the Startup India portal |
| Registered LLP | **LLPIN ACV-9817**, checkable on the MCA portal. Incorporated 5 Mar 2026 |
| D-U-N-S | **772066074**, checkable through D&B |
| The Economic Times | links to `/press`, which shows the scanned page |
| Snackly | links to the live site at `snacklyfoods.in` |
| Testimonial | links to `/case-studies` |
| 100% code ownership | a promise, and positioned last so it does not read as a lookup |

Every claim in that row now carries a reference. The LLPIN closed the last gap on
7 Sep 2026 — its certificate is a scan, so the number was supplied by hand rather than
extracted.

⚠️ **The incorporation certificate also carries the LLP's PAN and TAN. Neither is on the
site and neither should be added.** They are tax identifiers rather than registry ones, a
PAN is used for identity verification in India, and this is the org's only public repo
where a push deploys production. Nothing a customer needs to verify about this company
requires either. The LLPIN, DIPP number and D-U-N-S are all public registry identifiers
and do the job.

# Still missing

| Gap | Consequence |
|---|---|
| ~~**No OG image generation for the 14 marketing pages**~~ | **Closed 6 Sep 2026.** Nine pages (`/`, `/about`, `/pricing`, `/process`, `/case-studies`, `/faq`, `/contact`, `/free-website`, `/products`) now emit a real 1200×630 card from `public/og/`, rendered by `tools/social-media-manager/lab/marketing_cards.py` — a new caller for `og_card.render_card` and its already-defined `MARKETING` theme, which had none. The site default previously pointed at `/logo.png`, **500×500 declared as 1200×630**. The cause of the eight empties is worth keeping: **Next does not deep-merge `openGraph`**, so a page defining title/description/url/type replaces the parent object and silently drops the inherited `images`. |
| ~~`sitemap.ts` `lastModified`~~ | **Closed 6 Aug 2026.** Static pages now use a `STATIC_LAST_MODIFIED` literal that is bumped by hand when a page actually changes; `/lab` posts use `updated_at ?? created_at`. `/blog` posts already used their real dates. |
| **No author / E-E-A-T page for `/blog`** | MSME posts still credit "Cybiqon Team" with no link. Closed for `/lab` on 1 Aug 2026: `/lab/about` is a real author page with `Person` JSON-LD, and lab posts carry a named byline linking to it. |
| **No FAQ, TL;DR or `citation` schema on `/blog`** | Built for `/lab` on 6 Aug 2026 and deliberately not ported: the MSME posts are agent-written and an auto-generated FAQ would be invented Q&A, which is the one thing `FAQPage` must not contain. |

# AI crawlers

Added 6 Aug 2026. **Cloudflare AI Crawl Control is enabled on this zone**, and it does two
separate things that are easy to confuse:

1. **Managed `robots.txt`** — prepended at the edge, ahead of whatever `app/robots.ts`
   returns. It carries `Content-Signal: search=yes,ai-train=no,use=reference` and
   `Disallow: /` for the training crawlers. Curl the live URL, never the source file, to
   see what a crawler gets.
2. **A WAF rule** that blocks *verified* AI bots by IP and signature.

**What is NOT the cause of a pasted link failing in ChatGPT — two hypotheses, both dead.**

*Not server-side rendering.* `/lab/[slug]` ships its full body in the first response —
118 KB of HTML, ~21.5 K visible characters, 137 ms TTFB, measured live.

*Not the WAF either, and this concept claimed otherwise for a few hours on 6 Aug 2026.*
The AI Crawl Control crawlers table settles it: **`ChatGPT-User` shows 132 allowed
requests against 8 unsuccessful.** That is not a blocked bot. The block was inferred from
the managed robots.txt being enabled and was never evidenced; read the crawlers table
before repeating it.

*Not robots.txt.* Per OpenAI's documentation a pasted link is fetched by `ChatGPT-User`,
which does not consult robots.txt.

⚠️ **The cause is currently unknown.** The two threads worth pulling are the 8 unsuccessful
`ChatGPT-User` requests, and `Claude-SearchBot` at **0 allowed / 15 unsuccessful** — the
only bot in the table with a consistent refusal pattern. Also note a spoofed user agent
proves nothing in either direction: `curl -A ChatGPT-User` returns 200 because Cloudflare
never believes the spoof.

# The robots.txt is advisory and is being ignored

> ⚠️ **Correction, 10 Aug 2026 — the managed block described below is NOT on the live
> site.** `curl https://cybiqon.in/robots.txt` returns *only* what `app/robots.ts` emits:
> the `*` group and the six-agent allow group. There is **no `Content-Signal` line and no
> `Disallow: /` for any training crawler**, checked as GPTBot, CCBot and a browser UA —
> the response is identical for all three. Either managed robots.txt was never enabled on
> this zone or it has since been turned off.
>
> This matters beyond bookkeeping: `public/llms.txt` cited that Content-Signal directive
> until 10 Aug, so the site was pointing agents at a machine-readable term that does not
> exist. That text is now corrected in `data/llms.config.json`.
>
> The rest of this section is retained because the *posture* it argues for is still right
> and still unimplemented. Read it as the plan, not as the current state.

The same table shows every crawler the managed block disallows fetching the site anyway:
**Amazonbot 62, ClaudeBot 42, GPTBot 39, CCBot 4** allowed requests, all against
`Disallow: /`. The managed file buys a reservation of rights under EU DSM Article 4 and
**zero enforcement**.

The posture that follows: **allow the bots that cite, block the bots that train — at the
WAF, where blocking actually happens.** Leave `OAI-SearchBot`, `ChatGPT-User`,
`PerplexityBot`, `Perplexity-User`, `Claude-User`, `Claude-SearchBot`, `DuckAssistBot`,
`MistralAI-User`, `Applebot` unblocked; toggle Block on `GPTBot`, `ClaudeBot`, `CCBot`,
`Amazonbot`, `Bytespider`, `Meta-ExternalAgent`, `FacebookBot`, `PetalBot`, `TikTok
Spider`, `Timpibot`, `ProRataInc`, `Novellum`, `Anchor Browser`. Never touch `Googlebot`,
`BingBot` or `Baidu`.

`Google-CloudVertexBot` is filed as an AI Crawler but grounds Vertex/Gemini *answers*
rather than training, so it belongs with the citers. `Google-Extended` has no toggle — it
is a robots.txt token, not a crawler.

`app/robots.ts` states the allow side explicitly so no parser has to infer it from a
wildcard group sitting under eight denials — but the enforcement lives in the dashboard,
not in this repo.

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

**The marketing site started firing events on 6 Sep 2026.** It had fired none since
install — the `config` call was the only `gtag` call outside `/lab`, so pageviews were
measured and nothing else, and no conversion could be attributed to the page that produced
it. `components/TrackedEvents.tsx` is one delegated click listener in the root layout: a
control opts in with `data-track` / `data-track-label`, which keeps every section a server
component instead of putting an `onClick` on each CTA. Live now: `book_call` (hero, navbar
desktop, navbar mobile, closing CTA) and `whatsapp_click` (floating widget, homepage
contact list). Cost 1,778 B across the five edge functions.

**Still untracked:** the free-audit form and the Launch-5 apply. No GTM, no Plausible, no
Clarity, no Meta pixel.

`/lab` is the exception and has been since 1 Aug 2026 — this concept said "zero events
fire" flatly until 6 Aug, which was wrong. `lib/analytics.ts` no-ops when `gtag` is
absent, and every call site is under `/lab`: `lab_cta_click` (`{method: call | email |
linkedin}`), `lab_subscribe` (`{source}`) and `lab_share` (`{method, slug}`). The WhatsApp
widget adopted the same helper on 6 Sep 2026; the audit form and the Launch-5 apply have
not.

### F9 — every article page dropped its Twitter handles · FIXED 12 Aug 2026

Found by the SEO skill on the eval post, then confirmed across the site. `app/layout.tsx`
sets `twitter.site` and `twitter.creator` to `@CybiqonAI`, but **Next replaces a metadata
object rather than merging it**. Every route that declared its own `twitter` block to set
a per-page title and image therefore silently dropped both handles.

Affected `/lab/[slug]`, `/lab`, and `/blog/[slug]` — so **all ~91 blog posts and all five
lab posts**, i.e. every page anyone would actually share. The marketing pages were fine
because they never override the block. Cards rendered correctly; they just credited
nobody, which is invisible unless you diff the tags against a page that works.

Fixed by repeating `site`/`creator` in all three blocks, each with a comment saying why
the duplication is deliberate. **Zero Worker bytes** — metadata, not a route.

# AEO audit — 10 Aug 2026

Run alongside the `llms.txt` automation pass. **Every finding below was checked against
the live site**, not read out of this bundle — and two of them contradict what this
bundle previously said, which is the main argument for doing it that way.

Ranked by value per unit of effort. Nothing here was fixed except F1, which had to be.

### F1 — `llms.txt` was citing a directive that does not exist · FIXED

It read *"It may not be used for model training — see the Content-Signal directive in
https://cybiqon.in/robots.txt."* There is no such directive (see the correction above).
It also claimed *"Article pages carry BlogPosting … FAQPage JSON-LD"* while listing
`/blog`, whose posts carry `Article` with **no** `BlogPosting`, `FAQPage` or `citation` —
verified on a live post. Both corrected in `data/llms.config.json`. **Cost: zero.**

### F2 — the training-crawler posture is entirely unimplemented

`app/robots.ts` allows six citing agents and says nothing about training crawlers,
because the managed block that was supposed to say it is absent. So GPTBot, ClaudeBot,
CCBot, Amazonbot, Bytespider and Meta-ExternalAgent are, right now, **allowed by the
site's own robots.txt** via the `*` group.

Decide deliberately rather than by accident. The posture already argued for in this
concept — allow the citers, block the trainers at the WAF — is still the right one, and
none of it exists. **Cost: zero code, dashboard only.** Highest value on this list.

### F3 — Search Console IS set up; one file is missing · CORRECTED 10 Aug 2026

This finding originally read "no Search Console". **That was wrong**, and the error was
mine for repeating the bundle instead of checking. Verified live on 10 Aug:

| | |
|---|---|
| Domain property | `sc-domain:cybiqon.in` — exists, per `tools/social-media-manager/gsc_api.py` |
| DNS verification | **two** `google-site-verification` TXT records on `cybiqon.in` |
| OAuth token | `~/.gsc-mcp/oauth-token.json` — has a `refresh_token`, scoped `webmasters` + `webmasters.readonly` + `indexing` |
| Query script | `gsc_api.py query <days> [rows]` — written, working |
| **Missing** | **the OAuth client-secret JSON**, for client id `480180415252-…apps.googleusercontent.com` |

An access token cannot be refreshed without `client_secret`, so `gsc_api.py` dies at
`access_token()` with `FileNotFoundError`. The cached access token expired
**10 Jul 2026** — the same day the secret went missing, which is why the two failures
have always looked like one.

**The fix is one download**, not a re-verification and not a new property: Google Cloud
console → APIs & Services → Credentials → that OAuth client → *Download JSON* → save to
the exact path in `gsc_api.py:SECRETS_FILE`. The `refresh_token` we already hold then
mints access tokens again. Nothing needs re-authorising unless the refresh token itself
was revoked, which the download will reveal immediately.

Everything downstream still holds: query data is a **measurement** loss, not an indexing
one. Discovery is the sitemap's job and the sitemap is correct.

### F4 — 8 of 15 top pages have **no** `og:image` at all

This concept previously said the marketing pages "share `/logo.png`". Measured 10 Aug,
they do not:

| Has an `og:image` | None at all |
|---|---|
| `/`, `/free-audit`, `/privacy`, `/terms`, `/blog`, `/lab` | `/about`, `/pricing`, `/process`, `/case-studies`, `/faq`, `/contact`, `/free-website`, `/products` |

`/pricing` — the page most likely to be shared into a WhatsApp group by a prospective
client — renders with no image anywhere. `/lab` posts get a real 1200×630 card from
`tools/social-media-manager/lab/og_card.py`; the same generator would cover these.
**Cost: static assets, zero Worker bytes.** Best effort-to-visibility ratio here.

### F5 — `/blog` is ~96% of the content and carries the weakest signals

91-odd posts, `Article` + `BreadcrumbList`, authorship as `Organization` "Cybiqon AI
Solutions" with no author page, and no `text/markdown` alternate. `/lab` has `Person`
authorship, a real author page, `citation`, `about`, and markdown copies.

**Do not "fix" this by porting `FAQPage` to `/blog`.** The existing omission is correct
and deliberate: the MSME posts are agent-written, and an auto-generated FAQ would be
invented Q&A, which is the one thing that schema must not contain. Authorship and E-E-A-T
are a separate question and are worth fixing.

### F6 — freshness is a hand-bumped literal

`STATIC_LAST_MODIFIED` currently stamps **40 of 165 sitemap URLs** with `2026-08-06`. It
is bumped by hand, which was the right call when it replaced a build timestamp, but it
degrades silently: the day someone forgets, those 40 pages start ageing. Published 2026
analyses put ~83% of AI citations on pages updated within twelve months. Worth a
recurring check rather than a code change.

### F7 — the 182 KiB Worker headroom rules out several obvious fixes

Recorded here because it silently kills recommendations before they are made. Every
React route costs ~440 KiB gzipped and every route handler ~100 KiB, against ~182 KiB
remaining. A `/blog` author page is a new route and does not fit today. Static assets and
JSON-LD inside existing routes are free; anything with its own URL is not.

### F8 — the Cloudflare AI Diagnostics score is not a target

5 of 21. Sixteen of the remaining items describe an API catalog, an auth flow, OAuth, a
2A/MCP server card and a commerce checkout — none of which this site has, because it is a
brochure site with two blogs. Recorded so the score is never chased for its own sake.

**What is deliberately absent from this list:** anything claiming `llms.txt` will improve
citations. It will not; see the note in [Lab](/content/lab.md). It is maintained because
it is now free to maintain.

# See also

- [Routes](/site/routes.md) — which pages are client components
- [Blog](/content/blog.md) — what is being published daily
- [Lead capture](/content/lead-capture.md) — the conversion that isn't tracked
