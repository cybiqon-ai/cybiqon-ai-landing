---
type: Architecture
title: Design system
description: A stock shadcn site, one scoped structural theme, one scoped full-palette theme, and the marketing pages now on the structural language too — plus the record of why the first may not recolour and the second may.
tags: [design, tailwind, shadcn, theming, css-variables]
timestamp: 2026-09-08T00:00:00Z
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
Primary  #00304f navy      Ink     #111c2d
Accent   #00D890 green     Tick    #00875a
Surfaces #ffffff  #f9f9ff  #f0f3ff  #e7eeff  #dee8ff  #cfdaf2
```

## The accent is the logo's, not the comp's — 8 Sep 2026

The comp's vermilion `#fd651e` was replaced. It was never a brand colour, and that was
checkable: `public/logo.png` samples as a **blue → cyan → green** gradient — `#0C60E4`,
`#00B4D8`, `#00D890` — with no orange in the mark, and the pre-redesign palette on `main`
commented its own gradient *"Blue to Green"*.

It was also **failing contrast**: white on `#fd651e` is **2.98:1**, under AA's 4.5:1. Every
primary button on the site had an accessibility defect independent of the brand question.

**Three accent tokens, because one colour cannot do every job.** Measured on the shipped CSS:

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--accent` | `#00D890` | filled backgrounds, navy text on it | **7.44** |
| `--accent-ink` | `#00784f` | the accent as TEXT on white or `--surface` | **5.38** / 5.13 |
| `--accent-dark` | `#00D890` | labels inside navy sections | **7.44** |
| `--secondary` | `#00875a` | ticks, "included" | **4.67** |

**Pick by ground, not by habit.** White → `ink`, navy → `dark`, a filled button → `accent`.
Using `--accent` as text on white ships **1.87:1**, which is why 39 `text-accent` call sites
moved to `text-accent-ink`.

`--secondary` deepened from `#2fc88e` so a tick does not read as a small button now that the
CTA is green too. **In-page WhatsApp buttons are outlines** for the same reason — a filled
WhatsApp green beside a green CTA made two different actions look like one. The floating
widget keeps official `#25D366`, alone in the corner, where it reads as an affordance.

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
chat mockup framed it as a WhatsApp-bot shop. Every version carries a caption saying it is
an illustration — a mockup on a homepage reads as a real customer otherwise.

### The card runs a loop — 8 Sep 2026

`components/AgentDemo.tsx` plays one complete job on an **18-second cycle**: a WhatsApp
enquiry arrives, the agent reads it, checks the business's own records, prepares a quote,
the day's numbers move, and a human is asked before anything is sent. The full timeline
lives in `app/globals.css` under *"The hero agent card's loop"*. Four things about it are
decisions rather than details:

- **It is CSS on a server component.** No client JS, so it runs before the bundle does and
  survives the bundle never arriving. `RevealObserver` does the one thing CSS cannot —
  toggles `[data-paused]` on `[data-hero-loop]` so an 18-second animation stops costing
  compositor frames once the visitor has scrolled past it.
- **Twelve keyframe blocks, and they may not be collapsed into one.** The obvious
  simplification — one shared `@keyframes` plus per-element `animation-delay` — shifts each
  beat's *clear* as much as its reveal, so the card empties from the top while the bottom is
  still filling and the next cycle overlaps the last. Staggered starts with a common end
  cannot be expressed in one keyframe set. The block is also **outside `@layer utilities`**
  on purpose: Tailwind tree-shakes that layer, and the `[data-paused]` rule carries no class
  for it to match on.
- **Unreached beats are dimmed to `.35`, not hidden.** The first build hid them and the card
  spent ten of its eighteen seconds as a tall white void. Dimmed, it is always full and you
  watch it light up. The trade is that a pending row sits near 2:1 against white while it
  waits — a transient loading affordance, not the resting state: every row reaches full
  contrast inside the cycle and holds it for 4.5s, and the reduced-motion path never dims
  anything.
- **Nothing in the card is interactive.** `Approve` is a `<span>`, so the homepage's tab
  order runs CTA → "See what we build" and never stops on a dead control inside an
  illustration. The numbers in the strip are **deltas of the order shown two rows above** —
  never business totals. `HeroDashboardMockup` was deleted from this page for showing
  "1,247 visitors, +147%", figures that claimed nothing in particular; that line stays
  deleted.

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
opacity 0. The hero loop follows the same rule from the other direction: its keyframes only
hide and reveal, never supply the resting appearance, so `animation: none` lands on the
completed card with every beat lit. Anything added to that loop has to keep that property.

# Migration complete — 7 Sep 2026

**All fourteen marketing pages are on the design system.** `/` · `/about` · `/services` +7 ·
`/products` +3 categories · `/pricing` · `/process` · `/contact` · `/faq` · `/case-studies` ·
`/free-audit` · `/free-website` · `/press` · `/privacy` · `/terms`.

**No marketing page is a client component any more**, and `hooks/useScrollReveal.ts` is
deleted — its six call sites were the only thing making those pages `"use client"`. Anything
wanting a scroll reveal uses the `.reveal` class, which `RevealObserver` already drives from
one shared IntersectionObserver and which respects `prefers-reduced-motion`; the hook never
did.

## Ledger, at the end of it

**Ledger survives only on the seven product detail pages and twelve legal pages.** It has
left `LEDGER_ROUTES` except for the `/products` prefix, and `LEDGER_EXCEPTIONS` carves the
index and category pages back out — so the theme is now scoped *by exception*, which is not
obvious from the constant names and is why `ThemeScope.tsx` explains it.

The line that decided each case is worth keeping: **a catalogue or a sales page behind the
new chrome reads as a seam; a spec document does not.** `/products` and `/free-website` came
off for that reason, product detail and legal pages stayed for the same one.

## Two defects the migration surfaced

**`/faq` shipped 3 of 16 answers.** It filtered by category in React state, so only the
active category reached the DOM while the `FAQPage` schema declared all sixteen. Google
requires FAQ markup to match visible content. Native `<details>` renders all sixteen, needs
no JavaScript, and the schema is generated from the same array.

**`/case-studies` carried three fabricated projects** — unnamed, unattributed, with figures
like "20+ monthly inquiries" and "2x lead conversion" against zero paying website clients.
Deleted, exactly as `/our-works` was on 29 Aug. Two real studies remain.

# Not done yet

Nothing on the marketing side. The remaining work is /blog and /lab, which have their own
languages on purpose. They inherit the new palette
through the tokens but not the type scale or the card language, so `/pricing` and `/about`
currently read as part-way between. `/` is the reference; the comp is the source. Do not
leave the site half-migrated across a merge.

`hooks/useScrollReveal.ts` is **deleted** — all six consumers migrated.

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
