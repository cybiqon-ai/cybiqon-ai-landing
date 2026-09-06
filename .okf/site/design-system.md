---
type: Architecture
title: Design system
description: A stock shadcn site, one scoped structural theme, one scoped full-palette theme, and the marketing pages now on the structural language too — plus the record of why the first may not recolour and the second may.
tags: [design, tailwind, shadcn, theming, css-variables]
timestamp: 2026-09-06T12:00:00Z
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

`/` was rebuilt twice on `redesign/homepage-ledger`. **The first attempt is the useful
part of this record.**

## What failed, and why it is worth keeping

The first version extended the Ledger language to the homepage: hairline rules, ruled rows,
squared corners, uppercase labels, index numbers. It was rejected on sight — *"no hierarchy,
nothing, just looks a collection of texts."*

That was measurably true. The rendered page carried **266 text spans in the 13–16px band**
(120 × `text-[15px]`, 58 × `text-sm`, 48 × `text-base`, 40 × `text-[13px]`) against a
handful of larger sizes: a **~2× type range across a whole page**.

Two distinct mistakes:

1. **Ledger is an *index* language.** It was designed for `/products`, where the content is
   a catalogue and a ruled row is the honest form for it. A marketing homepage is not a
   catalogue, and applying the same form to all seven sections made every section
   interchangeable.
2. **Every existing visual element was deleted and nothing replaced them.** The dashboard
   mockup, the icon chips, the coloured cards and the stat band all went — correctly, in
   the case of the fabricated ones — but the page was left with no visual texture at all.

Measured against the `frontend-design` skill afterwards, that page hit **four of the five
clichés it names**: broadsheet hairline rules at zero radius; a tracked-out uppercase
eyebrow above every heading; `→` appended to every link; and `01/02/03` markers on content
that was not a sequence. It read as generated, which is the opposite of the intent.

## What the rebuild is

**Type — Anek Latin, one family.** Ek Type, Mumbai. Variable on two axes, `wght` 100–800 and
`wdth` 75–125, and **the width axis is the hierarchy device**: `wdth` 78 at poster scale for
the price, 86–92 for headings, 100 for reading. That is why there is no second display face.
Chosen for the brief rather than reached for — Anek covers nine Indian scripts, so the day
this site ships the Hindi its own copy promises customers, Anek Devanagari is the sibling
rather than a fresh pairing exercise.

Loaded in `app/layout.tsx` with `axes: ["wdth"]` and **no `weight` key** — passing both
throws at build. The scale lives in `app/globals.css` as `.t-display` / `.t-h1` / `.t-h2` /
`.t-h3` / `.t-body`, each setting `font-variation-settings` rather than `font-weight`,
because `wdth` has to be named alongside `wght` or it snaps back to 100.

**13px → 132px, a ~10× range.** On the finished page: 66 `.t-body`, 40 `.t-h3`, 16 `.t-h2`,
2 `.t-h1`, 2 `.t-display`.

Archivo is off the marketing pages. `/lab` keeps its own Archivo and renders no shared
chrome, so there is no seam.

**Colour — and this reverses the rule below.** Deep indigo `--ink` `#131C46` with marigold
`--accent` `#F5A524`, replacing Tailwind blue-600 and amber-500. `--primary` is now
`#2B3CB0`.

The earlier entry said *structure carries the distinctiveness, colour carries the brand*.
That was the right diagnosis of the **Ledger v1** failure and the wrong general rule. The
homepage's problem was not too much colour, it was that colour only ever appeared as a tint
on 15px text, so the page had no rhythm. What changed is **usage**: colour is now a
full-bleed field, and the sections alternate white → ink → white → pale → white → ink →
marigold.

The hue choice is defended on the brief, not on taste: indigo reads as trust for a money
decision and is India's own historic dye, marigold is the yellow of Indian commercial
signage, and both already appear in the one piece of third-party material the page carries —
the Economic Times clipping's headline blue and its tricolour swoosh.

**The seam rule below still holds and is why the chrome moved in the same pass.** The
Navbar and Footer were already written against the semantic tokens, so they followed the
palette for free; only the wordmark needed touching.

**Layout.** Seven sections, seven different archetypes. The boldness is spent in one place —
the price, at `.t-display`. Numbers appear only on the process, which is the only content
that is genuinely a sequence.

**Imagery, for the first time.** `public/img/`, 12 WebP files, 220 KB, hand-sized because
`next.config.mjs` installs a passthrough loader and Next's optimisation is off. The ET
clipping at 420px (the width `data/press.ts` documents), the Snackly storefront comp, and
seven real launcher icons. `data/products.ts` gained an optional `icon` field — it described
seven products and could not show any of them. See
[content data](/content/content-data.md) for what may and may not be shown.

`components/ledger/` is **deleted**. It encoded the failed language and would pull the next
person back into it.

## The motion budget, measured

The Worker holds **only the 12 edge routes**. Every marketing page is prerendered static and
costs it nothing — homepage components appear **zero** times in `blog.func.js`.

**The root layout is a 5× multiplier.** `Navbar`, `Footer`, `WhatsAppWidget`, `ThemeScope`,
`RevealObserver` and `TrackedEvents` are compiled into all five ~433 KiB functions, and
`sonner` — a client library sitting there — appears **121 times** inside `blog.func.js`.
Client library code does land in the server bundle. A library in a page body is free; the
same library in shared chrome is paid five times.

**framer-motion was added under that rule and then removed.** The ceiling was never the
objection. In the hero it server-rendered the `h1` at `opacity:0`, leaving the LCP element
waiting on hydration — the wrong trade on the networks this page sells into. Below the fold,
`.reveal` plus the one shared `RevealObserver` already does staggered entrances at zero
client JS. **If you reach for it again, the 5× rule is what makes it affordable and the LCP
trap is what makes the hero the wrong place for it.**

`.enter` exists because `animate-fade-in` cannot be delayed: the Tailwind animation declares
no `fill-mode`, so a delayed element paints visible and then snaps to opacity 0.

**Phosphor** (`@phosphor-icons/react`) is the marketing icon set — per-icon or `dist/ssr`,
never the barrel. lucide stays in the chrome and on `/blog` and `/lab` so a second icon
library never enters the 5× zone.

**`prefers-reduced-motion` now covers the marketing pages.** It previously matched only
`.lab-prose` and `.lab-row`. `.reveal` must be forced to its *visible* state rather than
merely losing its transition — `RevealObserver` adds `.visible` on intersection, so killing
the transition alone strands anything above the fold at opacity 0.

# Not done yet

The other 13 marketing pages still use the original look, and `/` is now the reference.
They inherited the new palette through the tokens but not the type scale or the layout
language. Do not leave the site half-migrated across a merge.

`hooks/useScrollReveal.ts` should go with that migration. Its 25 call sites are the only
reason `/about`, `/pricing`, `/process`, `/contact`, `/faq` and `/case-studies` are
`"use client"`; replacing it with `.reveal` makes all six server components.

`.display` is kept as an alias so the unmigrated pages do not lose their headings mid-way.
Remove it when they are all on `.t-*`.

# See also

- [Routes](/site/routes.md) — which routes opt into which theme
- [Lab](/content/lab.md) — the section the Lab theme exists for
- [Stack & deployment](/site/stack.md) — Tailwind and shadcn versions
- [Content data](/content/content-data.md) — the `data/` directory this theme renders
