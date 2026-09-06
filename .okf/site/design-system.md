---
type: Architecture
title: Design system
description: A stock shadcn site, one scoped structural theme, one scoped full-palette theme, and the marketing pages now on the structural language too — plus the record of why the first may not recolour and the second may.
tags: [design, tailwind, shadcn, theming, css-variables]
timestamp: 2026-09-06T21:00:00Z
---

# Overview

The site is **stock shadcn/ui on the slate base colour** (`components.json`), with two
scoped variants: **Ledger** (structure only) on `/free-website` and `/products/*`, and
**Lab** (a full palette) on `/lab`. Why one may recolour and the other may not is the
most useful thing in this document.

Everything is themed through the CSS-variable indirection shadcn already uses —
`hsl(var(--primary))` and friends, defined in `app/globals.css`.

# Ledger

```css
.theme-ledger {
  --radius: 0px;
  --ochre: 221 83% 53%;        /* = --primary */
  --rule-strong: 215 25% 27%;  /* = --foreground */
}
```

That is the whole theme. **It changes structure, not colour.** Squared corners, hairline
rules, ruled rows instead of card grids, index numbers with `tabular-nums`, and small
uppercase labels at `tracking-[0.14em]`.

`--ochre` and `--rule-strong` are the only genuinely new Tailwind keys
(`tailwind.config.ts`), and both currently alias existing brand values. The names are
vestigial — see below.

## Why it is structural only

The first version was a full palette: warm paper background, ochre accent, ink text. It
shipped, and the founder's response to the deployed page was *"its color doesnt match
our site, looks odd."*

Measured against the rest of the site, that version shifted the foreground hue by 170°
and the primary by 164°. Two pages read as a different company sitting behind the same
navbar. The mistake was spending the "sharp break" budget on **palette** when the thing
that actually felt generic was **structure** — pill badges above every h1, gradient icon
tiles, an identical hero block on all 14 interior pages.

Structure carries the distinctiveness; colour carries the brand. Keep them separate.

`--ochre` kept its name so the diff that neutralised it stays legible. Renaming it to
`--accent` would erase the record of a decision worth remembering.

## How it is applied

`components/ThemeScope.tsx` — a client component reading `usePathname()`, wrapping
Navbar + main + Footer in the root layout so the squared radius reaches the chrome and
there is no visible seam at the header.

**Not a route group.** Group layouts nest *inside* `app/layout.tsx` rather than replacing
it, so swapping chrome that way would mean relocating all 14 existing page directories
and stranding `app/not-found.tsx`. The pathname wrapper is one line for the same result.

Server children passed through a client component stay server-rendered — nothing in the
existing tree became client-side because of this.

**Known seam:** sonner and radix-toast portal into `document.body`, so they escape the
scope and render in the default theme. Acceptable for something transient, but it is a
seam, not an oversight. `components/free-website/ApplyForm.tsx` sidesteps it by replacing
itself with its confirmation rather than firing a toast.

# Traps

**Parallel Tailwind colour keys do not theme shadcn.** `components/ui/button.tsx`
hardcodes `bg-primary`. Adding a `paper` colour key would leave an indigo button sitting
on a themed page. Redefine the existing CSS variables inside a scope class instead — the
`hsl(var(--x))` indirection is the mechanism, not an obstacle.

**`data/` must be in the Tailwind content globs.** It is now
(`"./data/**/*.{ts,tsx}"`); without it any class name stored in a data file is purged
silently in production and looks fine in dev.

**`font-heading` is referenced but never defined** in `Navbar.tsx` and `Footer.tsx`. It
resolves to nothing. Naming any new display family `heading` would silently restyle the
wordmark on every page.

# Lab — the exception, and why it is one

`/lab` (1 Aug 2026) **does** recolour: a dark blue-graphite ground, amber readouts, a
serif reading face. That is not a reversal of the decision above; it is the same
diagnosis applied properly.

Ledger failed because those pages were recoloured **while still sitting behind the
marketing Navbar and Footer**. Walking `/pricing` → `/products`, the temperature flipped
mid-header. The lesson was not "colour is forbidden" — it was "do not recolour half a
page". `/lab` renders no marketing chrome at all (`components/ThemeScope.tsx` drops
Navbar, Footer and the WhatsApp widget; `app/lab/layout.tsx` brings its own), so there
is no seam for a reader to notice.

Two ties keep it a sibling rather than a stranger:

* `--signal` is the brand's existing `--accent` (Amber 500, `38 92% 50%`), promoted from
  decoration to the one colour that means "this is a measurement".
* `--primary` is the brand indigo `221 83% 53%`, lifted in lightness to clear contrast
  on a dark ground.

Mechanically it follows the same rule as Ledger: **redefine the existing shadcn
variables inside a scope class**, so `bg-background` and `text-foreground` keep working
and mean the right thing. `--signal` is the only genuinely new token, and therefore the
only new key in `tailwind.config.ts`.

Light mode is `.theme-lab.lab-noon`, applied **server-side from a cookie**. It was first
built as the usual pre-paint script setting a class on `<html>`; that fails here and
fails silently, because `app/layout.tsx` renders `<html className={geist.variable}>` and
React reconciles the class away during hydration. Recorded in [Lab](/content/lab.md).

`font-display`, `font-prose` and `font-readout` are new `fontFamily` keys, scoped to
`/lab` by where the CSS variables are defined. **Not** `font-heading` — see the trap
above. `mono` was deliberately left alone because `app/process/ProcessClient.tsx` uses
`font-mono` and redefining the key would change a page unrelated to this work.

# The homepage — 6 Sep 2026

**`/` is built to a Stitch comp, and that is where to start before touching it:**
**`projects/7623040016974616845` — "Cybiqon AI Homepage Redesign".** A full desktop comp,
3246 × 12570, with downloadable source HTML. The repo already worked this way for client
projects (`clients-work/snackly/design/stitch/v2/`, `kataria-international/stitch/`); the
marketing site now does too.

## Two rejected attempts, and why

Worth keeping, because both failure modes are easy to repeat.

**v1, Ledger on the homepage.** Hairline rules, ruled rows, uppercase labels, index
numbers, on all seven sections. Rejected as *"no hierarchy, nothing, just a collection of
texts"* — and measurably so: **266 text spans in the 13–16px band**, a ~2× type range across
a whole page. Ledger is an *index* language built for `/products`, where a catalogue of
ruled rows is the honest form. A marketing homepage is not a catalogue. Every existing
visual element was deleted and nothing replaced them.

**v2, Anek Latin + indigo/marigold.** A real type scale (13 → 132px) and full-bleed colour
fields. Better, and still rejected — *"around 5% good"*. It was a well-typeset document,
not a designed site: no cards, no elevation, no product imagery above the fold, nothing
that reads as craft to a buyer.

**The common cause was process, not taste.** Both were designed in my head and typed
straight into code, with no visual reference and no review before building. The comp
existed the whole time.

## The system, from the comp's own HTML

Read out of the comp, not eyeballed from a screenshot.

```
Fonts    Plus Jakarta Sans 600/700/800   headings   (--font-jakarta)
         Inter             400–700       body       (--font-inter)
Primary  #00304f navy      Accent  #fd651e vermilion
Green    #2fc88e           Ink     #111c2d
Surfaces #ffffff  #f9f9ff  #f0f3ff  #e7eeff  #dee8ff  #cfdaf2
```

**The surface ladder is the load-bearing part.** Sections alternate down it, and that
alternation is where the page gets its depth. Both rejected versions were flat
white-on-white and were rejected for exactly that. `bg-surface`, `bg-surface-lowest`,
`bg-surface-low` etc. are Tailwind keys; the type scale is `.t-display` / `.t-h1` / `.t-h2`
/ `.t-h3` / `.t-body*` / `.t-label*` / `.t-eyebrow` in `app/globals.css`, all carrying the
comp's exact sizes, line-heights, tracking and weights.

Section order: announcement strip → hero (agent card) → credentials → agency comparison →
service cards → four-step process → why-us → evidence → navy CTA → footer.

**The hero card is an AI agent working a task, not the comp's WhatsApp chat.** Changed
6 Sep 2026 with the positioning: the company sells custom software and AI agents, and a
chat mockup framed it as a WhatsApp-bot shop. Both versions carry a caption saying they are
illustrations — a mockup on a homepage reads as a real customer otherwise.

**The uppercase eyebrow is back, deliberately.** v1 used it above every heading and it was
a tell. Here it is the comp's own device, it marks section starts on a long sales page, and
it is the only uppercase on the page.

**The announcement strip lives inside `Navbar.tsx`, not above it in the layout.** The nav is
`fixed`, so anything rendered above it in normal flow ends up underneath it.

## What the comp claims that the site may not

The comp is a design reference, **not a content reference**. It carries a full set of
invented proof, and the substitutions are recorded in
[content data](/content/content-data.md). In short: no "100+ businesses across 18 cities",
no ISO 9001, no per-industry percentages, no five-star rating, no founder headshot, and the
prices are `/pricing`'s one-time figures rather than the comp's — which included a
₹4,999/month bot that would have contradicted the Product JSON-LD on `/pricing`.

The DPIIT Startup India recognition and the LLP incorporation **are** real (certificates in
`ops/Downloads/`) and carry that row instead.

## The Worker budget, measured

Only the 12 edge routes count toward the 3 MiB ceiling. Every marketing page is prerendered
static and costs it nothing — homepage components appear **zero** times in `blog.func.js`.

**The root layout is a 5× multiplier.** `Navbar`, `Footer`, `WhatsAppWidget`, `ThemeScope`,
`RevealObserver` and `TrackedEvents` compile into all five ~433 KiB functions, and `sonner`
— a client library sitting there — appears **121 times** in `blog.func.js`. Client library
code does land in the server bundle. The second font family cost ~9 KB for this reason.

**framer-motion was added under that rule and removed.** The ceiling was never the
objection: in the hero it server-rendered the `h1` at `opacity:0`, leaving the LCP element
waiting on hydration. If you reach for it again, that is the trap.

**Phosphor** is the marketing icon set — per-icon or `dist/ssr`, never the barrel. lucide
stays in `/blog`, `/lab` and parts of the chrome so a second icon library never enters the
5× zone. Material Symbols, which the comp loads, is deliberately not added.

**`prefers-reduced-motion` covers the marketing pages.** `.reveal` must be forced to its
*visible* state rather than merely losing its transition — `RevealObserver` adds `.visible`
on intersection, so killing the transition alone strands anything above the fold at
opacity 0.

# Not done yet

The other 13 marketing pages still use the original look. They inherit the new palette
through the tokens but not the type scale or the card language, so `/pricing` and `/about`
currently read as part-way between. `/` is the reference; the comp is the source. Do not
leave the site half-migrated across a merge.

`hooks/useScrollReveal.ts` should go with that migration. Its 25 call sites are the only
reason `/about`, `/pricing`, `/process`, `/contact`, `/faq` and `/case-studies` are
`"use client"`; replacing it with `.reveal` makes all six server components.

`.display` is kept as an alias so the unmigrated pages do not lose their headings mid-way.
Remove it when they are all on `.t-*`.

The comp's founder avatar and its "Talk to Founders directly" tooltip are not built. The
only headshot available carries an AI-generation watermark, and the same Stitch project
holds a generated "trustworthy business consultant avatar".

# See also

- [Routes](/site/routes.md) — which routes opt into which theme
- [Lab](/content/lab.md) — the section the Lab theme exists for
- [Stack & deployment](/site/stack.md) — Tailwind and shadcn versions
- [Content data](/content/content-data.md) — the `data/` directory this theme renders
