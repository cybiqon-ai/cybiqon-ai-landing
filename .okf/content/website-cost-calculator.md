---
type: Domain
title: Website cost calculator
description: /tools/website-cost-calculator — the site's first free tool. Visitors enter website quotes and get the 1-, 3- or 5-year cost of each kind of site, with every default sourced and dated in one data file.
tags: [tools, calculator, pricing, seo, linkable-asset, content]
timestamp: 2026-09-22T00:00:00Z
---

# Overview

Added **22 Sep 2026**. The site had nothing another site would link to on its own merits:
no tool, no calculator, no downloadable data. This is the first. It turns the argument of
`/blog/website-cost-for-small-business-india` — *the quote is year one; the bill that
matters is every year after* — into something a reader runs on their own quotes.

The target query was checked before building, not after:
`website cost calculator india`, `website development cost calculator` and
`website cost estimator` all appear in Google autocomplete for Indian searchers.

# Files

| File | Holds |
|---|---|
| `data/websiteCost.ts` | every figure, its source, `CHECKED_ON`, and the arithmetic (`calculate`, `costOf`). Pure — no React. |
| `app/tools/website-cost-calculator/page.tsx` | server-rendered explanation, FAQ, sources, citation line; `WebApplication`, `BreadcrumbList` and `FAQPage` JSON-LD |
| `app/tools/website-cost-calculator/Calculator.tsx` | the client island: controls, chart, table (cards below `md`) |

**To update a price, edit `data/websiteCost.ts` and bump `CHECKED_ON`.** The page, chart,
table and FAQ all read from it.

# The model

- **Year 1 is the build price** for self-hosted options (WordPress theme, WordPress with a
  page builder, custom-coded, WooCommerce, custom store). Quotes usually include
  promotional hosting, a ₹1 domain and licences on the developer's account.
- **From year 2:** hosting at renewal price (Hostinger Premium ₹449/mo), `.in` renewal
  (₹899), dollar licences for the page-builder option (Elementor Pro $59 + WP Rocket
  $59.95 at ₹95.82/US$), and the chosen maintenance band.
- **Maintenance:** none, or the low or high end of the typical band (₹24k–60k business,
  ₹84k–1.8L store). The same band applies to every self-hosted option so it cannot tilt
  the comparison.
- **Shopify Basic** is paid from year 1: ₹1,499/mo billed yearly plus 2% of online sales
  (third-party gateway). Gateway fees are excluded everywhere — they are the same whichever
  way a store is built.
- **GST** is off by default (Hostinger lists prices without GST) and toggles 18% onto every
  figure.
- State lives in the URL, so a filled-in comparison is a shareable link.

The arithmetic was checked with assertions (GST, maintenance levels, Shopify fee,
overrides, the visitor's own row) before any UI was written.

# Deliberate omissions

- **No Wix row.** Wix's plans page served US-dollar prices to an Indian connection on
  22 Sep 2026 and third-party rupee figures disagree (₹199–1,599 vs ₹250–900 a month).
  The visitor's own-option row covers it. The website-cost blog post still quotes
  "about ₹4,788 a year" for Wix Core; that figure is unverified.
- **No Cybiqon row.** A seller's product in a "neutral" table makes the table an advert.
  Our price sits in a separate, labelled box.
- **With the default inputs, the custom-coded option is the most expensive** over three
  years. That is what the sourced numbers say, and it is left that way.

# Corrections this surfaced

Two statements in `/blog/website-cost-for-small-business-india` are now known to be wrong
or unverified: Hostinger's page **does** state "Prices are listed without GST" (the post
says it does not say), and the Wix Core rupee figure above.

# Chart

Horizontal bars, build price vs everything else, one bar per option. Colours `#1f6fb0`
and `#0f9e6c` are in-band steps of the brand blue and green, validated with the dataviz
palette script (lightness, chroma, colour-blind separation, ≥3:1 on white). The raw
brand navy and `#00D890` fail those checks. The chart is `aria-hidden`; the table is the
accessible view.
