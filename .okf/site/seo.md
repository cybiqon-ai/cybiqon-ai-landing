---
type: Domain
title: SEO
description: Structured data, sitemap, RSS and per-page metadata are all in place as of 25 Jul 2026; the blog is indexed and the remaining gap is ranking, not discovery.
tags: [seo, metadata, json-ld, sitemap, search-console, rss, aeo, ai-crawlers]
timestamp: 2026-08-10T00:00:00Z
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
| **No OG image generation for the 14 marketing pages** | ⚠️ worse than this row said — measured 10 Aug 2026, **9 of them emit no `og:image` tag at all**, they do not fall back to `/logo.png`. See F4 in the audit below. Narrowed 1 Aug 2026: `/lab` posts now get a real 1200×630 card each, rendered by `tools/social-media-manager/lab/og_card.py` at publish time and served from `media.cybiqon.in/lab/og/<slug>.png`. The same approach would work for the marketing pages and has not been done. |
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

**Zero events fire on the marketing site.** Audit-form submissions and WhatsApp clicks
are untracked, so no *lead* conversion is currently measurable. No GTM, no Plausible, no
Clarity, no Meta pixel.

`/lab` is the exception and has been since 1 Aug 2026 — this concept said "zero events
fire" flatly until 6 Aug, which was wrong. `lib/analytics.ts` no-ops when `gtag` is
absent, and every call site is under `/lab`: `lab_cta_click` (`{method: call | email |
linkedin}`), `lab_subscribe` (`{source}`) and `lab_share` (`{method, slug}`). Adopting the
same helper on the audit form, the Launch-5 apply and the WhatsApp widget is still the
open work.

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
| `/`, `/free-audit`, `/privacy`, `/terms`, `/blog`, `/lab` | `/about`, `/pricing`, `/process`, `/case-studies`, `/our-works`, `/faq`, `/contact`, `/free-website`, `/products` |

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
