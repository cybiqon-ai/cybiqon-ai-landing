---
type: Reference
title: Content data
description: There is no data directory — every content list is a const array inside the component that renders it, which is why the portfolio can't be reused anywhere.
tags: [content, data, refactor, portfolio]
timestamp: 2026-07-25T00:00:00Z
---

# Overview

**The repo has no `data/` directory.** Every list of content — services, pricing
tiers, FAQs, portfolio items, case studies — is a `const` array declared inside
the component that renders it.

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

# The queued fix

The `/apps` hub introduces the first `data/apps.ts`, establishing the pattern:

```
data/apps.ts     → app/apps/page.tsx + app/apps/[slug]/…
data/works.ts    → app/our-works + /case-studies   (after Launch-5 clients exist)
```

`data/works.ts` is deliberately sequenced **after** the free-website clients
exist. Extracting five unnamed demo projects into a data file just relocates the
problem — the page's real deficiency is that it has no real clients to show.

# Honesty flags

**`features/`** holds opt-in experimental components. `features/README.md` marks
them as such, and two — `LiveActivityTicker` and `SocialProofBar` — contain
**invented social proof**. Check before reusing anything from that directory.

**`components/Testimonials.tsx`** deliberately holds **one real testimonial**
(LeadzGalaxy / Amit Menon) after placeholders were removed, with a comment saying
so. Keep it that way — the whole point of the Launch-5 programme is to earn more
real ones.

# Assets

`public/portfolio/*.webp` (15) · `public/logo.png` · `public/founder1.jpg`,
`founder2.jpg`. `scripts/shoot-home.mjs` is a Playwright screenshot helper.

# See also

- [Routes](/site/routes.md) — where the `/apps` data file lands
- [SEO](/site/seo.md) — the client-component problem these arrays sit inside
