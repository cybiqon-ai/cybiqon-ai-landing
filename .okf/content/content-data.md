---
type: Reference
title: Content data
description: A data/ directory now exists and covers products, legal copy and the Launch-5 offer — but every marketing page's content is still a const array welded into the component that renders it.
tags: [content, data, refactor, portfolio]
timestamp: 2026-08-01T00:00:00Z
---

# Overview

`data/` exists as of 26 Jul 2026 and covers the new surfaces. **Every older marketing
page is still a `const` array declared inside the component that renders it.**

## In `data/`

| File | Feeds |
|---|---|
| `data/products.ts` | `/products`, category pages, all three product pages — types, `CATEGORIES`, `PRODUCTS`, `getProduct`, `productsIn`, `activeCategories` |
| `data/legal/{llmbytes,meflow,vitaloop}.ts` | privacy and terms, as a `Block` discriminated union (prose / checklist / deflist / table / contact) rather than MDX or raw HTML |
| `data/launch5.ts` | `/free-website` — the trade, fit lists, sequence, FAQs, slot counts |

`data/**` **must** stay in the Tailwind content globs (it is) or any class name stored
there is purged silently in production while looking fine in dev.

## Still inline

| Content | Location |
|---|---|
| `portfolioItems` (5) | `app/our-works/page.tsx:32` |
| `categories` | `app/our-works/page.tsx:110` |
| `services` (price tiers) | `app/pricing/page.tsx:57` |
| `faqs` | `app/pricing/page.tsx:151` |
| `productSchema` | `app/pricing/page.tsx:42` |
| `featuredCaseStudy` | `app/case-studies/page.tsx:35` |
| `faqCategories` | `app/faq/page.tsx:17` |
| `howItWorksSteps` | `app/page.tsx:22` |
| service/stat/industry lists | `components/{Services,Stats,WhyChooseUs,ProblemsWeSolve,IndustryShowcase,HeroSocialProof}.tsx` |

# What it costs

Content and presentation are welded together, so:

- The portfolio **cannot be reused** — not in a proposal, not in a case-study
  page, not in an email
- Updating a price means editing a client component
- Nothing can be validated, counted or queried

# What's next

```
data/works.ts    → app/our-works + /case-studies   (after Launch-5 clients exist)
```

Deliberately sequenced **after** the free-website clients exist. Extracting five unnamed
demo projects into a data file just relocates the problem — the page's real deficiency is
that it has no real clients to show, and the Launch-5 programme is the thing that fixes
that.

# Honesty flags

**`features/` was deleted on 1 Aug 2026** — 4 files, imported by nothing. Two of them
(`LiveActivityTicker`, `SocialProofBar`) contained **invented social proof**, as did
`components/HeroSocialProof.tsx`, deleted with them. Dead code that fabricates customer
activity is one accidental import away from being live, which is why it went rather than
staying as a documented hazard.

The reasoning is preserved as a comment in `components/Hero.tsx` where someone would most
plausibly rebuild it: the component rendered "{N} MSME owners got their free audit this
week" beside a pulsing "Live" badge and five invented names, with N starting at 47 and
randomly incrementing every 15 seconds. `audit_leads` held 2 rows.

⚠️ **`components/HeroDashboardMockup.tsx` is still live and still shows invented figures**
(1,247 visitors, +147%, 12 orders today, 73% repeat customers). It reads as an
illustrative product mockup rather than a claim about Cybiqon's own results, which is why
it was left — but it is the same class of thing and worth a deliberate decision.

**`components/Testimonials.tsx`** deliberately holds **one real testimonial**
(LeadzGalaxy / Amit Menon) after placeholders were removed, with a comment saying
so. Keep it that way — the whole point of the Launch-5 programme is to earn more
real ones.

**`data/launch5.ts` sets `SLOTS_TAKEN = 0`, and it is a real zero.** The homepage
carried a fabricated live counter (`useLiveCount(47)` against 2 actual leads) for
months before it was removed on 26 Jul. Seeding this number would rebuild exactly what
was just torn out. The file carries the same warning at the constant.

**`components/Hero.tsx`** has three free-audit prompts hidden behind `{false && …}`
rather than deleted, each with an inline reason. Hidden, not gone — the founder asked for
them out of the homepage, not out of the codebase.

# Assets

`public/portfolio/*.webp` (15) · `public/logo.png` · `public/founder1.jpg`,
`founder2.jpg`. `scripts/shoot-home.mjs` is a Playwright screenshot helper.

# See also

- [Routes](/site/routes.md) — the routes these data files feed
- [Lead capture](/content/lead-capture.md) — `data/launch5.ts` and the form it backs
- [Design system](/site/design-system.md) — why `data/` must be in the Tailwind globs
- [SEO](/site/seo.md) — the client-component problem these arrays sit inside
