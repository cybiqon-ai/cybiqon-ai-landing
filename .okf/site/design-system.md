---
type: Architecture
title: Design system
description: A stock shadcn site, one scoped structural theme, and one scoped full-palette theme — plus the record of why the first may not recolour and the second may.
tags: [design, tailwind, shadcn, theming, css-variables]
timestamp: 2026-08-01T00:00:00Z
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

# Not done yet

**Archivo** was planned as the display face and deferred until the layout stopped moving,
on the condition that it land in a **scoped** component rather than the root layout —
otherwise all 14 pages preload a font they never use. It shipped on 1 Aug 2026 in `/lab`,
which is that scoped component. Loaded via `next/font/google` with `axes: ["wdth"]` and
**no** `weight` key; passing both throws at build time.

The **marketing** pages still have no display face. That part is genuinely not done, and
the original caution still applies to them: changing the typeface while the layout is
moving makes it impossible to tell which change broke the rhythm.

The other 14 pages still use the original look. Migrating them is page-by-page work that
has not started.

# See also

- [Routes](/site/routes.md) — which routes opt into which theme
- [Lab](/content/lab.md) — the section the Lab theme exists for
- [Stack & deployment](/site/stack.md) — Tailwind and shadcn versions
- [Content data](/content/content-data.md) — the `data/` directory this theme renders
