---
type: Reference
title: Content data
description: A data/ directory now exists and covers products, legal copy and the Launch-5 offer — but every marketing page's content is still a const array welded into the component that renders it.
tags: [content, data, refactor, portfolio]
timestamp: 2026-09-06T18:00:00Z
---

# Overview

`data/` exists as of 26 Jul 2026 and covers the new surfaces. **Every older marketing
page is still a `const` array declared inside the component that renders it.**

## In `data/`

| File | Feeds |
|---|---|
| `data/products.ts` | `/products`, the three category pages and all seven product pages — types, `CATEGORIES`, `PRODUCTS`, `getProduct`, `productsIn`, `activeCategories` |
| `data/clients.ts` | the client-work section of `/products` — `ClientProject`, `CLIENT_PROJECTS`. Separate from products on purpose: an engagement has a client and a delivery state where a product has a package id and a policy, and `unnamed` carries *why* a client is not named so the page can say so rather than quietly omit it |
| `data/legal/{llmbytes,meflow,vitaloop}.ts` | privacy and terms, as a `Block` discriminated union (prose / checklist / deflist / table / contact) rather than MDX or raw HTML |
| `data/launch5.ts` | `/free-website` — the trade, fit lists, sequence, FAQs, slot counts |
| `data/homepage.ts` | `/` — `PROBLEMS`, `SERVICES` (all five with prices), `STEPS`, `DIFFERENTIATORS`. Added 6 Sep 2026 with the homepage redesign. |

`data/**` **must** stay in the Tailwind content globs (it is) or any class name stored
there is purged silently in production while looking fine in dev.

## Still inline

| Content | Location |
|---|---|
| `services` (price tiers) | `app/pricing/page.tsx:57` |
| `faqs` | `app/pricing/page.tsx:151` |
| `productSchema` | `app/pricing/page.tsx:42` |
| `featuredCaseStudy` | `app/case-studies/page.tsx:35` |
| `faqCategories` | `app/faq/page.tsx:17` |
| ~~`howItWorksSteps`~~ | **Extracted 6 Sep 2026** → `data/homepage.ts` |
| ~~service/problem/differentiator lists~~ | **Extracted 6 Sep 2026** → `data/homepage.ts`. `Stats`, `TrustBar` and `IndustryShowcase` no longer exist. |

# What it costs

Content and presentation are welded together, so:

- The portfolio **cannot be reused** — not in a proposal, not in a case-study
  page, not in an email
- Updating a price means editing a client component
- Nothing can be validated, counted or queried

# What's next

**`data/works.ts` is cancelled.** It was sequenced after the Launch-5 clients existed,
on the reasoning that extracting five unnamed demo projects into a data file just
relocates the problem — the page's real deficiency was that it had no real clients to
show. That reasoning held, and the conclusion it actually implied was to delete the page:
`/our-works` was removed on 29 Aug 2026 and redirects to `/products`, which carries real
products and, in `data/clients.ts`, real engagements. See [Routes](/site/routes.md).

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

✅ **`components/HeroDashboardMockup.tsx` was deleted on 6 Sep 2026.** It showed 1,247
visitors, +147%, 12 orders today and 73% repeat customers — none of them real. The
deliberate decision this file asked for was taken: the distinction between "an illustrative
product mockup" and "a claim about our own results" is thinner than it needs to be on the
homepage of a company selling trust to small business owners.

What replaces it is `components/HeroSpecLedger.tsx`, whose every line is checkable against
`/pricing`. `AnimatedBackground.tsx` went at the same time. Both were deleted rather than
left unimported, for the reason `features/` was deleted.

`components/IndustryShowcase.tsx` went too — it rotated six industry names on a 2s
`setInterval` asserting things like "Retail Shops — 3x more inquiries", which was not
attached to a retail shop anyone could name. `components/Proof.tsx` replaces it and
**derives its counts** (`PRODUCTS.filter(status === "live").length`,
`CLIENT_PROJECTS.length`) rather than hard-coding them, so they cannot drift into being
false. The `Testimonials` heading was "What Our Clients Say" over one quote, and rendered
five gold stars against a rating nobody left; both are gone.

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

# The homepage comp is a design reference, not a content one

`/` is built to a Stitch comp (`projects/7623040016974616845`, see
[design system](/site/design-system.md)). **The comp carries a full set of invented proof.**
Anyone rebuilding a section from it will find these in the source and must not ship them:

| The comp says | Ship | Why |
|---|---|---|
| "Trusted by 100+ Indian businesses across 18 cities" | nothing | 0 paying website clients |
| "100+ Projects Delivered on Time" · "3.2× Avg Inbound Growth" | **Startup India (DPIIT)** · **Registered LLP** | Both certificates are real files in `ops/Downloads/` |
| "ISO 9001 Process Quality" | **The Economic Times, Aug 2026** | No ISO certificate exists anywhere in the tree. This one is not a style question — it is a certification claim |
| Industry band: +310% · 40+ leads/mo · 60% Auto · <15s reply | the evidence block | None of it is attached to a client |
| Testimonial: 5 stars, "Verified Client Partner", "Pune & Mumbai", "3.2x Qualified Inquiries", headshot | the real quote, attribution only | Nobody left a rating. The headshot is the generated image in the same Stitch project, titled "…trustworthy business consultant avatar" |
| "Limited Monthly Onboarding Slots" | "Free, and there is nothing to sign" | Scarcity marketing against `SLOTS_TAKEN = 0` |
| ₹4,999/mo bot · ₹24,999 web app · ₹14,999 lead gen | `/pricing`'s one-time figures | The comp's set would contradict the Product JSON-LD `/pricing` emits |
| © 2025 | © 2026 | — |

The hero's WhatsApp mockup is built **as a product demonstration** and carries a caption
saying so. A chat bubble on a homepage reads as a real customer otherwise.

# Imagery — new, 6 Sep 2026

`public/img/` exists: **12 WebP files, 220 KB**, the first product imagery this site has
ever carried. `data/products.ts` gained an optional `icon` field; it described seven
products and had no way to show any of them.

Hand-sized before they enter the repo — `next.config.mjs` installs a passthrough loader, so
Next's optimisation is off and whatever ships is what loads.

**What may be shown**, because it depicts something that exists: the ET clipping (at 420px,
the width `data/press.ts` documents), the Snackly storefront comp, and the seven real
launcher icons copied from each product's own repo.

⚠️ **What may not, and will be reached for next.** All 44 Kataria site images are Imagen —
`clients-work/kataria-international/PLACEHOLDER-IMAGERY.md` says so in its first line.
Snackly's `web/public/media/*` product photography is Imagen placeholder, with real shots
still owed to the client. Every `tools/social-media-manager/images/*` card with a person in
it is Imagen, and those people are not customers or staff. `components/Proof.tsx` names all
three in its header.

The Snackly comp is the edge case and is handled rather than avoided: the layout, type and
build are genuinely ours, but the food photograph inside it is placeholder art, so the
caption on the page says exactly that. Cheaper than a visitor assuming it is a real product
shot.

# Assets

`public/portfolio/*.webp` (15) · `public/logo.png` · `public/founder1.jpg`,
`founder2.jpg`. `scripts/shoot-home.mjs` is a Playwright screenshot helper.

# See also

- [Routes](/site/routes.md) — the routes these data files feed
- [Lead capture](/content/lead-capture.md) — `data/launch5.ts` and the form it backs
- [Design system](/site/design-system.md) — why `data/` must be in the Tailwind globs
- [SEO](/site/seo.md) — the client-component problem these arrays sit inside
