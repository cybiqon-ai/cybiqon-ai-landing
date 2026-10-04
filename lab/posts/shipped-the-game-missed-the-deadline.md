---
title: "We built the game in six days. The store review took fifteen."
# The searchable title. Only <title>, the meta description and BlogPosting.headline use
# it — the h1, the OG card and the RSS item keep the title above.
seo_title: "How We Shipped ChitraYatra: AI Art, Music and Play Review"
# Front-loaded: the first ~155 characters carry the whole finding, because Google cuts
# the description there and the excerpt doubles as the index dek.
excerpt: "We built ChitraYatra in six days — 25 windows to 169, five ways to play, 72 AI-generated scenes and four generated scores — and then Google Play's review took 15 days and we missed RevenueCat Shipaton by three. This is how the whole game was made, including the rule we broke on day two."
date: 2026-10-04
tags:
  - Games
  - Shipaton
  - Flutter
  - RevenueCat
  - Generative AI
  - Indian Art
# First-party figures: git history and pubspec for the builds, assets/glass/levels.json
# for the windows, assets/artisan/scenes.json for the scenes, SHIPATON.md for the dates.
# Word count, reading time and source count are derived at render time.
readouts:
  - label: windows
    value: "25 → 169"
  - label: builds
    value: "15 → 37"
  - label: artisan scenes
    value: "72"
  - label: play review
    value: "15 days"
  - label: missed by
    value: "3 days"
---
Three weeks ago we published [the first post in this series](/lab/kolam-rangoli-mandala-indian-art-puzzle-game), about the Indian art traditions we had chosen for a puzzle game, and ended it with a promise: "The RevenueCat integration, the release and what the judges need from us are later posts in this series."

This is that post, and it is the last one in the series, because there is no entry to write about. The game is live on Google Play. It is called **ChitraYatra** now — *a journey of pictures* — and it was never submitted to RevenueCat Shipaton 2026. Google's production review of the first public release finished on **3 October**. The Devpost deadline was **30 September, 11:45 pm PDT** ([Shipaton rules](https://revenuecat-shipaton-2026.devpost.com/rules)). We were three days late to a contest we had been building for, and not one of those three days was spent on the game.

The game itself was finished early. Between 13 and 19 September it went from 25 windows on a prototype branch to **169 windows in 18 collections**, five ways to play, 72 painted scenes, four pieces of music and a complete store catalogue, across **23 build bumps**. The build that went for review went up on 18 September, twelve days before the deadline.

So this is a making-of rather than an engineering post: how a one-person studio built a whole game in six days, where the art and the music actually came from, and what a store review costs when you treat it as paperwork instead of a dependency. It also has to correct the first post in public, because the rule that post was proudest of was relaxed the day after it was published.

## TL;DR

- **The game shipped: 169 windows in 18 collections, five ways to play, 72 Artisan scenes, four generated scores and seven yatras**, built between 13 and 19 September across 23 build bumps, from a 25-window prototype. Five of those builds went to Google Play.
- **A store review is a dependency, not paperwork.** Our own planning document said there was "no publishing gate to plan around" because an earlier app "was reviewed in a day". Build 34 went to production review on 18 September and cleared on **3 October — 15 days**, three days past the deadline. Count back two weeks, not two days.
- **We broke our own rule 24 hours after publishing it.** The first post said we would not prompt an image model to imitate a living tradition. On 14 September that rule was relaxed: **23 windows were drafted with AI assistance** and **72 Artisan scenes are AI-generated**, every one disclosed in the game, in the credits and on the store listing. The eight most figurative traditions were then drawn by our own code instead, on the Stories shelf.
- **The art cost about $13.35 and the music was generated too.** 72 scenes came to roughly twenty cents and two minutes each; the four scores were generated from our own prompts, then looped and mastered by a Python script that treats the loop as a circle so no filter clicks at the seam.
- **The listing is already out of date.** It says 145 windows, four modes and 24 scenes. The game ships 169, five and 72, because the description was written on 15 September and the game kept growing for four more days.

## What actually shipped

ChitraYatra is a calm puzzle of stained glass. A drawing is cut into hexagonal panes; you turn, trade or carry panes home until the lead lines meet, and each closed shape lights in its own colour. The first post covered that mechanic and the traditions behind it. What it could not cover is how much game got built around it in the week after it was written.

| | 13 September | 19 September |
|---|---|---|
| Windows | 25 | **169** |
| Collections | 5 | **18** |
| Ways to play | 1 | **5** |
| Artisan scenes | 0 | **72** |
| Music | a synthesised drone | **4 scores** |
| States and union territories on the map | 0 | **36** |
| Journeys (yatras) | 0 | **7** |

<figure>
<svg viewBox="0 0 640 210" role="img" aria-label="A step chart of the number of windows in the game between 13 and 19 September 2026. It starts at 25 on the morning of 13 September, jumps to 139 the same day, and then rises in smaller steps through 137, 145 and 153 to 169 windows in 18 collections on 19 September." style="width:100%;height:auto">
<g stroke="currentColor" opacity="0.3" stroke-width="1">
<line x1="56" y1="178.0" x2="616" y2="178.0"/>
<line x1="56" y1="136.3" x2="616" y2="136.3"/>
<line x1="56" y1="94.7" x2="616" y2="94.7"/>
<line x1="56" y1="53.0" x2="616" y2="53.0"/>
</g>
<text x="48" y="182.0" text-anchor="end" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">0</text>
<text x="48" y="140.3" text-anchor="end" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">50</text>
<text x="48" y="98.7" text-anchor="end" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">100</text>
<text x="48" y="57.0" text-anchor="end" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">150</text>
<path d="M70 157.2 L150 157.2 L150 62.2 L235 62.2 L235 63.8 L320 63.8 L320 57.2 L445 57.2 L445 50.5 L600 50.5 L600 37.2 L616 37.2" fill="none" stroke="currentColor" stroke-width="2.5"/>
<circle cx="70" cy="157.2" r="3.5" fill="currentColor"/>
<circle cx="150" cy="62.2" r="3.5" fill="currentColor"/>
<circle cx="235" cy="63.8" r="3.5" fill="currentColor"/>
<circle cx="320" cy="57.2" r="3.5" fill="currentColor"/>
<circle cx="445" cy="50.5" r="3.5" fill="currentColor"/>
<circle cx="600" cy="37.2" r="3.5" fill="currentColor"/>
<text x="70" y="175.2" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">25 · 13 Sep, the prototype</text>
<text x="144" y="52.2" font-family="ui-monospace, monospace" font-size="11" fill="currentColor">139</text>
<text x="612" y="27.2" text-anchor="end" font-family="ui-monospace, monospace" font-size="11" fill="currentColor">169 windows, 18 collections</text>
<text x="70" y="196" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">13 Sep</text>
<text x="235" y="196" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">14 Sep</text>
<text x="320" y="196" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">15 Sep</text>
<text x="445" y="196" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">17 Sep</text>
<text x="600" y="196" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">19 Sep</text>
</svg>
<figcaption>Windows in the game, 13 to 19 September. Almost the whole jump is one day: the day the map of India arrived and every state needed its own art. The dip is two AI-drafted windows being thrown away.</figcaption>
</figure>

The shape of the game is a map. Every state and union territory opens its own art — kolam from Tamil Nadu, pookalam from Kerala, mandana from Rajasthan, phulkari from Punjab, the woven puan of Mizoram — and a test fails if two states share one. The boundaries are [DataMeet's India maps](https://github.com/datameet/maps) under CC BY 4.0, checked against the Survey of India's political map. Around that sit a gallery of shelves, seven **yatras** (journeys that stamp a passport once every window on the route is lit), a festival almanac that opens the game on a festival's own window, and **Artisan**, a second game entirely: a painted scene of a place, cut into hexagons, that you drag back together.

There are five ways to play a window, and the fifth arrived on the last day: **Line**, where one pane starts lit and light spreads along the lead, so only glass the light has reached can be turned. 168 of the 169 windows qualify for it. The exception is the tutorial, which says so on screen.

## Six days

The pace is the story, so here it is as a table. Every row is a day's commits in the game's repository.

| Day | What happened |
|---|---|
| **13 Sep** | The old mechanic is deleted — engine, painters, gallery, editor, 73 figures. The map of India lands and every state needs art, so the count goes 25 → 139 in a day. A title screen replaces the menu. |
| **14 Sep** | Four ways to play, in the owner's order. Windows are cut ahead of time because cutting 139 at launch took about 12 seconds. The billing library is swapped for RevenueCat. Four generated scores replace the drone. Artisan is invented. |
| **15 Sep** | Artisan ships with 24 scenes. A three-phase polish pass — trust, then feel and flow, then comfort — finds most of the bugs in this post. |
| **17 Sep** | Night windows, settings inside a window, the first paid window pack, and the rename: Curvved becomes ChitraYatra. The backdrops start moving. |
| **18 Sep** | A new upload key, tablet screenshots, **build 33 to internal testing, build 34 to production review**. Then offerings, Patron, yatras and the almanac. |
| **19 Sep** | Two agent worktrees in parallel: Monsoon (a window pack) and Stories (eight traditions drawn by code). Then Line mode, five more scene packs, and build 37. 3,347 tests pass. |

Then nothing. The repository has no commits between 19 September and today, because everything after the 19th was waiting.

Two things in that table are worth pulling out, because they are the reason six days was possible at all.

**The engine never imports Flutter.** That is the same rule that kept [a previous game's level generator](/lab/puzzle-generator-random-walk-doesnt-work) testable, and it means every window can be cut, solved and checked in bulk from the command line before anyone plays it. 169 windows are not 169 decisions; they are one validator run.

**Two agents worked in separate git worktrees on the 19th**, one on Monsoon and one on Stories. Both finished, and both wrote in their own notes that the game now had 161 windows — each had counted correctly from the same 153-window base, and neither knew about the other. The merge made it 169. The documents still say 161, which is a fair summary of how the week went.

## Drawing a country in code

The quickest way to describe the art pipeline is that **most of this game is drawn by Python scripts that emit SVG**, and the SVG is imported as lead lines and coloured facets. Kolams come from a mirror-curve generator; rangoli and mandalas from a ring generator; jaali screens from Hankin's [polygons-in-contact construction](https://cs.uwaterloo.ca/~csk/publications/Papers/kaplan_2005.pdf); mehndi, alpana, mandana and pietra dura from a motif library of butas, vines, lotuses and fish.

The piece that unlocked the paid packs is a class called `Scene`. A window used to be a figure on paper. A pack had to be richer than that, so a scene is built in layers — sky at the back, water, then figures in front — and then flattened:

> Flattening is what makes layers possible at all: the importer leads every facet's edges, so a sky facet drawn under a kite would lead straight through the kite. `Scene.faces` splits every edge where it meets another, drops the stretches hidden inside a figure in front, and walks the faces that remain, each coloured by the topmost layer under its middle.

It also reports what the cut will punish: faces thinner than about half a tile, and points where five or more pieces meet. The result is windows with 29–59 lit regions where the free shelves have 13–28 — denser glass, which is what a player can see they paid for.

<figure>
<svg viewBox="14 4 72 92" role="img" aria-label="A stained-glass window of rain on a lotus pond, drawn by the game's own code: slanting rain lines across the sky, a lotus flower in the centre, lily pads on the water, with every closed shape shaded as a separate pane of glass." style="width:100%;max-width:340px;height:auto;display:block;margin:0 auto">
<path d="M38.1 46.7L41 46.5L41.1 46.6L38.1 46.7Z" fill="currentColor" fill-opacity="0.14"/>
<path d="M35.9 50.2L31.6 50.8L34.3 48.9L35.9 50.2Z" fill="currentColor" fill-opacity="0.28"/>
<path d="M65.4 77.2L65.6 80.4L61.7 77.3L65.4 77.2Z" fill="currentColor" fill-opacity="0.33"/>
<path d="M64 49.7L67.1 47.1L58.2 46.5L58.3 46.2L67.8 45.9L67.4 49.6L66.1 49.5L64 49.7Z" fill="currentColor" fill-opacity="0.28"/>
<path d="M47.5 57.8L49.6 58.4L52 57.7L52.3 62.3L52.4 63.2L47.6 63.2L47.6 62.5L47.5 57.8Z" fill="currentColor" fill-opacity="0.33"/>
<path d="M73.4 45.8L72.9 50.8L72.8 51.5L67.2 50.9L67.4 49.6L67.8 45.9L68 43.8L73.6 44.2L73.4 45.8Z" fill="currentColor" fill-opacity="0.29"/>
<path d="M70.4 36.4L71.2 37.2L71.9 36.4L74 36.5L73.6 44.2L68 43.8L68.4 36.3L70.4 36.4Z" fill="currentColor" fill-opacity="0.29"/>
<path d="M39.7 52.8L38.9 52.8L35.9 50.2L34.3 48.9L32.1 47.1L37.5 46.7L38.1 46.7L41.1 46.6L45.2 49.6L44.8 50L44 52.8L39.7 52.8Z" fill="currentColor" fill-opacity="0.14"/>
<path d="M54 49.6L52.4 48L51.3 47.6L52.9 42.7L60.4 37.9L58.3 46.2L58.2 46.5L54 49.6Z" fill="currentColor" fill-opacity="0.21"/>
<path d="M60.4 62.1L52.3 62.3L52 57.7L52.4 57.6L54.4 55.6L55.2 52.8L60.3 52.8L60.7 52.5L66.4 56.4L55.4 55L55.3 57.4L56.6 59.7L59 61.6L60.4 62.1Z" fill="currentColor" fill-opacity="0.28"/>
<path d="M45.2 49.6L41.1 46.6L41 46.5L38.8 37.9L46.3 42.7L47.9 47.6L46.8 48L45.2 49.6Z" fill="currentColor" fill-opacity="0.21"/>
<path d="M54 49.6L58.2 46.5L67.1 47.1L64 49.7L60.7 52.5L60.3 52.8L55.2 52.8L54.4 50L54 49.6Z" fill="currentColor" fill-opacity="0.14"/>
<path d="M51.3 47.6L49.6 47.2L47.9 47.6L46.3 42.7L49.6 34.4L52.9 42.7L51.3 47.6Z" fill="currentColor" fill-opacity="0.14"/>
<path d="M47.6 63.2L52.4 63.2L52.6 76L47.4 76L47.6 63.2Z" fill="currentColor" fill-opacity="0.33"/>
<path d="M73.6 61.7L76.1 59.9L77.4 57.6L77.4 55.1L76 52.8L73.4 51L72.9 50.8L73.4 45.8L80 45.6L80 61.6L73.6 61.7Z" fill="currentColor" fill-opacity="0.28"/>
<path d="M73.4 45.8L73.6 44.2L74 36.5L71.9 36.4L77.1 30.9L80 30.8L80 45.6L73.4 45.8Z" fill="currentColor" fill-opacity="0.25"/>
<path d="M54 49.6L54.4 50L55.2 52.8L54.4 55.6L52.4 57.6L52 57.7L49.6 58.4L47.5 57.8L46.8 57.6L44.8 55.6L44 52.8L44.8 50L45.2 49.6L46.8 48L47.9 47.6L49.6 47.2L51.3 47.6L52.4 48L54 49.6Z" fill="currentColor" fill-opacity="0.12"/>
<path d="M65.6 31.2L65.2 30.8L68.9 23.9L71.2 19.6L77.2 30.8L77.1 30.9L71.9 36.4L71.2 37.2L70.4 36.4L65.6 31.2Z" fill="currentColor" fill-opacity="0.21"/>
<path d="M25.4 47.1L26.1 46.6L28.8 45.6L31.8 45.3L34.9 45.7L37.5 46.7L32.1 47.1L34.3 48.9L31.6 50.8L35.9 50.2L38.9 52.8L39.7 52.8L39.3 53.4L37.4 54.9L34.8 55.9L31.7 56.3L28.7 55.9L26 55L24 53.5L22.9 51.7L22.9 49.8L24 48L25.4 47.1Z" fill="currentColor" fill-opacity="0.19"/>
<path d="M72.8 10L80 10L80 30.8L77.1 30.9L77.2 30.8L71.2 19.6L68.9 23.9L72.8 10Z" fill="currentColor" fill-opacity="0.19"/>
<path d="M60.7 52.5L64 49.7L66.1 49.5L67.4 49.6L67.2 50.9L72.8 51.5L72.9 50.8L73.4 51L76 52.8L77.4 55.1L77.4 57.6L76.1 59.9L73.6 61.7L70.1 62.9L66.3 63.3L62.4 62.9L60.4 62.1L59 61.6L56.6 59.7L55.3 57.4L55.4 55L66.4 56.4L60.7 52.5Z" fill="currentColor" fill-opacity="0.22"/>
<path d="M55.6 77.4L56.1 76.7L58.7 74.9L61.7 77.3L65.6 80.4L65.4 77.2L65.2 73.5L69.1 73.8L72.6 75L75.2 76.8L75.3 76.9L76.6 79.1L76.7 81.5L75.3 83.8L72.8 85.7L69.4 86.9L65.6 87.3L61.7 86.9L58.3 85.7L55.8 83.8L54.5 81.5L54.6 79L55.6 77.4Z" fill="currentColor" fill-opacity="0.28"/>
<path d="M25.4 47.1L24 48L22.9 49.8L22.9 51.7L24 53.5L26 55L28.7 55.9L31.7 56.3L34.8 55.9L37.4 54.9L39.3 53.4L39.7 52.8L44 52.8L44.8 55.6L46.8 57.6L47.5 57.8L47.6 62.5L20 63.2L20 47.2L25.4 47.1Z" fill="currentColor" fill-opacity="0.28"/>
<path d="M45.4 77.7L43.9 79.4L40.5 81.2L36.3 82.2L31.8 82.2L27.6 81.3L24.2 79.5L23.1 78.3L21.9 77L21.2 74.3L22.1 71.6L24.4 69.2L27.9 67.4L32.2 66.5L36.7 66.6L34 74.4L43.5 69.1L45.9 71.5L46.8 74.2L46.1 77L45.4 77.7Z" fill="currentColor" fill-opacity="0.24"/>
<path d="M37.6 10L31.4 32.1L20 32.4L20 10L37.6 10Z" fill="currentColor" fill-opacity="0.19"/>
<path d="M49.1 31.6L55.2 10L72.8 10L68.9 23.9L65.2 30.8L65.6 31.2L49.1 31.6Z" fill="currentColor" fill-opacity="0.16"/>
<path d="M37.6 10L55.2 10L49.1 31.6L31.4 32.1L37.6 10Z" fill="currentColor" fill-opacity="0.14"/>
<path d="M75.3 76.9L80 76.8L80 90L20 90L20 78.4L23.1 78.3L24.2 79.5L27.6 81.3L31.8 82.2L36.3 82.2L40.5 81.2L43.9 79.4L45.4 77.7L55.6 77.4L54.6 79L54.5 81.5L55.8 83.8L58.3 85.7L61.7 86.9L65.6 87.3L69.4 86.9L72.8 85.7L75.3 83.8L76.7 81.5L76.6 79.1L75.3 76.9Z" fill="currentColor" fill-opacity="0.33"/>
<path d="M25.4 47.1L20 47.2L20 32.4L31.4 32.1L49.1 31.6L65.6 31.2L70.4 36.4L68.4 36.3L68 43.8L67.8 45.9L58.3 46.2L60.4 37.9L52.9 42.7L49.6 34.4L46.3 42.7L38.8 37.9L41 46.5L38.1 46.7L37.5 46.7L34.9 45.7L31.8 45.3L28.8 45.6L26.1 46.6L25.4 47.1Z" fill="currentColor" fill-opacity="0.25"/>
<path d="M65.4 77.2L61.7 77.3L58.7 74.9L56.1 76.7L55.6 77.4L45.4 77.7L46.1 77L46.8 74.2L45.9 71.5L43.5 69.1L34 74.4L36.7 66.6L32.2 66.5L27.9 67.4L24.4 69.2L22.1 71.6L21.2 74.3L21.9 77L23.1 78.3L20 78.4L20 63.2L47.6 62.5L47.6 63.2L47.4 76L52.6 76L52.4 63.2L52.3 62.3L60.4 62.1L62.4 62.9L66.3 63.3L70.1 62.9L73.6 61.7L80 61.6L80 76.8L75.3 76.9L75.2 76.8L72.6 75L69.1 73.8L65.2 73.5L65.4 77.2Z" fill="currentColor" fill-opacity="0.31"/>
<path d="M54 49.6L54.7 49.1L55.3 48.6L56 48.2L56.6 47.7L57.3 47.2L57.9 46.8L58.6 46.5L59.4 46.6L60.2 46.6L60.9 46.7L61.7 46.8L62.5 46.8L63.2 46.9L64 46.9L64.8 47L65.6 47L66.3 47.1L67.1 47.1L66.5 47.6L66 48.1L65.4 48.5L64.8 49L64.2 49.5L63.7 50L63.1 50.5L62.5 51L61.9 51.5L61.3 52L60.7 52.5L60.3 52.8L59.5 52.8L58.7 52.8L57.9 52.8L57.1 52.8L56.4 52.8L55.6 52.8L55.1 52.5L54.9 51.8L54.7 51L54.5 50.4L54.2 49.8" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M55.2 52.8L54.7 54.5L54.5 55.2L54.2 55.9L53.7 56.4L53.2 56.9L52.7 57.4L52 57.7L51.3 57.9L50.6 58.1L50 58.3L49.2 58.3L48.5 58.1L47.8 57.9L47.1 57.7L46.5 57.4L46 56.9L45.5 56.4L45 55.9L44.7 55.2L44.5 54.5L44.3 53.9L44.1 53.1L44.1 52.5L44.3 51.8L44.5 51L44.7 50.4L45 49.8L45.4 49.3L46 48.8L46.5 48.2L47.2 47.9L47.9 47.6L48.6 47.5L49.3 47.3L49.9 47.3L50.6 47.5L51.3 47.6L52 47.9L52.7 48.2L53.2 48.8" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M51.3 47.6L51.7 46.2L52 45.5L52.2 44.8L52.4 44.1L52.7 43.4L52.9 42.7L53.5 42.2L54.2 41.8L54.9 41.4L55.5 41L56.2 40.6L56.8 40.2L57.5 39.8L58.1 39.4L58.8 39L59.4 38.5L60.1 38.1L60.3 38.3L60.1 39L59.9 39.8L59.8 40.5L59.6 41.3L59.4 42L59.2 42.8L59 43.5L58.8 44.3L58.6 45L58.2 46.5" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M25.4 47.1L25.8 46.7L26.4 46.5L27.1 46.2L27.8 46L28.4 45.8L29.2 45.6L29.9 45.5L30.7 45.5L31.5 45.4L32.2 45.4L33 45.5L33.7 45.6L34.5 45.7L35.2 45.9L35.8 46.1L36.5 46.4L37.1 46.6L37.1 46.8L36.3 46.8L35.6 46.9L34.8 46.9L34 47L33.2 47L32.5 47.1L32.4 47.4L32.9 47.8L33.5 48.3L34 48.7L34 49.1L33.4 49.6L32.8 50L32.2 50.4L31.6 50.8L32.4 50.7L33.1 50.6L33.9 50.5L34.7 50.4L35.5 50.3L36.2 50.5L36.8 51L37.4 51.5L38 52L38.6 52.5L39.3 52.8L39.5 53.1L39.1 53.6L38.5 54L38 54.5L37.4 54.9L36.7 55.1L36.1 55.4L35.4 55.6L34.8 55.9L34 56L33.2 56.1L32.5 56.2L31.7 56.3L30.9 56.2L30.2 56.1L29.4 56L28.7 55.9L28 55.7L27.3 55.5L26.6 55.2L26 55L25.4 54.6L24.8 54.1L24.3 53.7L23.8 53.2L23.4 52.6L23.1 52L22.9 51.3L22.9 50.6L22.9 49.8L23.3 49.2L23.7 48.6L24 48L24.6 47.6L25.1 47.2" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M39.7 52.8L41.2 52.8L42 52.8L42.8 52.8" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M47.8 57.9L47.5 59.4L47.5 60.1L47.5 60.9L47.6 61.7L47.6 62.5L46.8 62.5L46 62.5L45.2 62.5L44.4 62.5L43.6 62.6L42.8 62.6L42 62.6L41.2 62.6L40.4 62.6L39.6 62.7L38.8 62.7L38 62.7L37.2 62.7L36.4 62.8L35.6 62.8L34.8 62.8L34 62.8L33.2 62.9L32.4 62.9L31.6 62.9L30.8 62.9L30 62.9L29.2 63L28.4 63L27.6 63L26.8 63L26 63L25.2 63.1L24.4 63.1L23.6 63.1L22.8 63.1L22 63.1L21.2 63.2L20.4 63.2L20 62.8L20 62L20 61.2L20 60.4L20 59.6L20 58.8L20 58L20 57.2L20 56.4L20 55.6L20 54.8L20 54L20 53.2L20 52.4L20 51.6L20 50.8L20 50L20 49.2L20 48.4L20 47.6L20.4 47.2L21.1 47.2L21.9 47.1L22.7 47.1L24 48" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M20 47.2L20 45.6L20 44.9L20 44.1L20 43.3L20 42.5L20 41.8L20 41L20 40.2L20 39.4L20 38.6L20 37.9L20 37.1L20 36.3L20 35.5L20 34.7L20 34L20 33.2L20 32.4L20.8 32.4L21.6 32.4L22.4 32.3L23.1 32.3L23.9 32.3L24.7 32.3L25.5 32.3L26.3 32.2L27.1 32.2L27.9 32.2L28.7 32.2L29.4 32.1L30.2 32.1L31 32.1L31.8 32.1L32.6 32.1L33.4 32L34.2 32L35 32L35.8 32L36.5 32L37.3 31.9L38.1 31.9L38.9 31.9L39.7 31.9L40.5 31.9L41.3 31.8L42 31.8L42.8 31.8L43.6 31.8L44.4 31.8L45.2 31.7L46 31.7L46.8 31.7L47.6 31.7L48.4 31.6L49.1 31.6L49.9 31.6L50.7 31.6L51.5 31.6L52.3 31.5L53 31.5L53.8 31.5L54.6 31.5L55.4 31.4L56.2 31.4L57 31.4L57.7 31.4L58.5 31.4L59.3 31.4L60.1 31.3L60.9 31.3L61.6 31.3L62.4 31.3L63.2 31.2L64 31.2L64.8 31.2L65.6 31.2L66.1 31.8L66.6 32.3L67.2 32.9L67.7 33.5L68.3 34.1L68.8 34.6L69.3 35.2L69.9 35.8L70.4 36.4L69.8 36.3L69.1 36.3L68.4 36.3L68.4 37L68.3 37.8L68.3 38.6L68.2 39.4L68.2 40.2L68.2 41L68.1 41.8L68.1 42.6L68 43.4L68 44.1L67.9 44.9L67.8 45.6L67.4 45.9L66.6 46L65.6 47" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M52.9 42.7L52.3 41.2L52 40.5L51.8 39.8L51.5 39.1L51.2 38.4L50.9 37.6L50.6 36.9L50.3 36.2L50 35.5L49.7 34.8L49.5 34.8L49.2 35.5L48.9 36.2L48.6 36.9L48.3 37.6L48 38.4L47.7 39.1L47.5 39.8L47.2 40.5L46.9 41.2L46.6 41.9L46.3 42.7L45.6 42.2L45 41.8L44.3 41.4L43.7 41L43 40.6L42.4 40.2L41.7 39.8L41.1 39.4L40.4 39L39.8 38.5L39.1 38.1L38.9 38.3L39.1 39L39.2 39.8L39.4 40.5L39.6 41.3L39.8 42L40 42.8L40.2 43.5L40.4 44.3L40.6 45L40.8 45.8L41 46.5L40.2 46.6L39.5 46.6L38.8 46.7" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M55.6 77.4L55.9 77L56.4 76.5L57.1 76.1L57.7 75.6L58.4 75.2L59 75.2L59.6 75.6L60.2 76.1L60.8 76.6L61.4 77L62 77.5L62.6 78L63.2 78.5L63.8 79L64.4 79.4L65 79.9L65.6 80.4L65.6 79.7L65.5 79L65.5 78.2L65.4 77.5L65.4 76.8L65.3 76.1L65.3 75.3L65.3 74.6L65.2 73.8L65.6 73.5L66.4 73.6L67.2 73.6L67.9 73.7L68.7 73.8L69.5 73.9L70.1 74.2L70.8 74.4L71.5 74.6L72.2 74.8L72.9 75.2L73.5 75.7L74.2 76.1L74.8 76.6L75.3 76.9L75.6 77.5L76 78.2L76.4 78.8L76.6 79.4L76.6 80.1L76.6 80.8L76.7 81.5L76.3 82.2L75.9 82.8L75.5 83.5L75 84.1L74.4 84.5L73.8 85L73.2 85.5L72.5 85.8L71.8 86.1L71.1 86.3L70.5 86.5L69.8 86.8L69 87L68.3 87L67.5 87.1L66.7 87.2L66 87.3L65.2 87.3L64.4 87.2L63.6 87.1L62.8 87L62.1 86.9L61.3 86.8L60.7 86.5L60 86.3L59.3 86L58.6 85.8L58 85.4L57.4 85L56.7 84.5L56.1 84L55.6 83.4L55.3 82.8L54.9 82.1L54.5 81.5L54.6 80.8L54.6 80.1L54.6 79.4L54.8 78.7L55.2 78.1L55.6 77.4" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M75.6 77.5L77.2 76.9L78 76.8L78.8 76.8L79.6 76.8L80 77.2L80 78L80 78.7L80 79.5L80 80.3L80 81.1L80 81.8L80 82.6L80 83.4L80 84.2L80 85L80 85.7L80 86.5L80 87.3L80 88.1L80 88.8L80 89.6L79.6 90L78.8 90L78 90L77.2 90L76.4 90L75.6 90L74.8 90L74 90L73.2 90L72.4 90L71.6 90L70.8 90L70 90L69.2 90L68.4 90L67.6 90L66.8 90L66 90L65.2 90L64.4 90L63.6 90L62.8 90L62 90L61.2 90L60.4 90L59.6 90L58.8 90L58 90L57.2 90L56.4 90L55.6 90L54.8 90L54 90L53.2 90L52.4 90L51.6 90L50.8 90L50 90L49.2 90L48.4 90L47.6 90L46.8 90L46 90L45.2 90L44.4 90L43.6 90L42.8 90L42 90L41.2 90L40.4 90L39.6 90L38.8 90L38 90L37.2 90L36.4 90L35.6 90L34.8 90L34 90L33.2 90L32.4 90L31.6 90L30.8 90L30 90L29.2 90L28.4 90L27.6 90L26.8 90L26 90L25.2 90L24.4 90L23.6 90L22.8 90L22 90L21.2 90L20.4 90L20 89.6L20 88.8L20 88L20 87.2L20 86.4L20 85.6L20 84.8L20 84L20 83.2L20 82.4L20 81.6L20 80.8L20 80L20 79.2L20 78.4L20.8 78.4L21.6 78.4L22.3 78.3L23.1 78.3L23.6 78.9L24.2 79.5L24.9 79.8L25.5 80.2L26.2 80.6L26.9 80.9L27.6 81.3L28.4 81.5L29.1 81.6L29.9 81.8L30.7 82L31.4 82.1L32.2 82.2L33 82.2L33.7 82.2L34.5 82.2L35.2 82.2L36 82.2L36.7 82.1L37.5 81.9L38.2 81.8L39 81.6L39.8 81.4L40.5 81.2L41.2 80.9L41.9 80.5L42.6 80.1L43.3 79.8L43.9 79.4L44.4 78.8L44.9 78.3L45.4 77.7L46.2 77.7L47 77.7L47.8 77.7L48.6 77.6L49.4 77.6L50.1 77.6L50.9 77.6L51.7 77.5L52.5 77.5L53.3 77.5L54 77.5" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M65.1 48.8L66.4 49.5L67 49.5L67.3 49.9L67.2 50.6L67.6 50.9L68.4 51L69.2 51.1L70 51.2L70.8 51.3L71.6 51.4L72.4 51.5L72.8 51.1L73.2 50.9L73.8 51.2L74.4 51.7L75 52.1L75.7 52.6L76.2 53.2L76.6 53.8L77 54.5L77.4 55.1L77.4 55.8L77.4 56.5L77.4 57.2L77.2 57.9L76.9 58.6L76.5 59.2L76.1 59.9L75.5 60.3L74.8 60.8L74.2 61.3L73.6 61.7L72.9 62L72.2 62.2L71.5 62.5L70.8 62.7L70.1 62.9L69.4 63L68.6 63.1L67.8 63.2L67 63.3L66.3 63.3L65.5 63.2L64.7 63.2L63.9 63.1L63.2 63L62.4 62.9L61.7 62.6L61 62.4L60.4 62.1L59.7 61.9L59 61.6L58.4 61.1L57.8 60.7L57.2 60.2L56.6 59.7L56.2 59.1L55.9 58.4L55.5 57.7L55.3 57L55.4 56.4" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M54.6 54.9L56.2 55.1L57 55.2L57.8 55.3L58.6 55.4L59.4 55.5L60.1 55.6L60.9 55.7L61.7 55.8L62.5 55.9L63.3 56L64 56.1L64.8 56.2L65.6 56.3L66.4 56.4L65.8 56L65.1 55.5L64.5 55.1L63.9 54.6L63.2 54.2L62.6 53.8L62 53.3L61 52.2" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M58.7 61.4L57.3 62.2L56.5 62.2L55.8 62.2L55 62.3L54.2 62.3L53.5 62.3L52.7 62.3L52.3 62L52.3 61.2L52.2 60.4L52.2 59.7L52.1 58.9" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M65.4 77.2L63.9 77.2L62.6 78" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M46.2 77.7L46.4 75.9L46.5 75.2L46.7 74.5L46.7 73.9L46.5 73.2L46.2 72.5L46 71.8L45.6 71.2L45.1 70.7L44.6 70.1L44 69.6L43.5 69.1L42.8 69.5L42.2 69.8L41.5 70.2L40.8 70.6L40.1 71L39.4 71.4L38.8 71.7L38.1 72.1L37.4 72.5L36.7 72.9L36 73.3L35.4 73.6L34.7 74L34 74.4L34.2 73.7L34.5 72.9L34.8 72.2L35 71.4L35.3 70.7L35.5 70L35.8 69.2L36 68.5L36.3 67.8L36.5 67L36.3 66.6L35.5 66.6L34.8 66.6L34 66.6L33.3 66.6L32.5 66.5L31.8 66.6L31 66.8L30.2 66.9L29.4 67.1L28.7 67.3L27.9 67.4L27.2 67.8L26.5 68.1L25.8 68.5L25.1 68.8L24.4 69.2L23.9 69.7L23.4 70.2L22.8 70.8L22.3 71.3L21.9 71.9L21.7 72.6L21.5 73.3L21.3 74L21.3 74.6L21.5 75.3L21.7 76L21.9 76.7L22.3 78.3" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M20 78.4L20 76.8L20 76.1L20 75.3L20 74.5L20 73.7L20 72.9L20 72.2L20 71.4L20 70.6L20 69.8L20 69L20 68.3L20 67.5L20 66.7L20 65.9L20 65.2L20 64.4" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M47.6 62.5L47.6 64L47.6 64.8L47.6 65.6L47.5 66.4L47.5 67.2L47.5 68L47.5 68.8L47.5 69.6L47.5 70.4L47.5 71.2L47.5 72L47.5 72.8L47.4 73.6L47.4 74.4L47.4 75.2L47.4 76L48.1 76L48.9 76L49.6 76L50.4 76L51.1 76L51.9 76L52.6 76L52.6 75.2L52.6 74.4L52.6 73.7L52.5 72.9L52.5 72.1L52.5 71.3L52.5 70.5L52.5 69.8L52.5 69L52.5 68.2L52.5 67.4L52.5 66.7L52.4 65.9L52.4 65.1L52.4 64.3L52.4 63.5" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M74.8 60.8L76.2 61.7L77 61.7L77.7 61.6L78.5 61.6L79.2 61.6L80 61.6L80 62.4L80 63.2L80 64L80 64.8L80 65.6L80 66.4L80 67.2L80 68L80 68.8L80 69.6L80 70.4L80 71.2L80 72L80 72.8L80 73.6L80 74.4L80 75.2L80 76.8" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M41 46.5L42.4 47.5L43 48L43.6 48.5L44.2 48.9" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M72.9 50.8L73 49.3L73.1 48.5L73.2 47.7L73.3 46.9L73.4 46.2L73.8 45.8L74.6 45.8L75.4 45.7L76.1 45.7L76.9 45.7L77.7 45.7L78.5 45.6L79.2 45.6L80 45.6L80 46.4L80 47.2L80 48L80 48.8L80 49.6L80 50.4L80 51.2L80 52L80 52.8L80 53.6L80 54.4L80 55.2L80 56L80 56.8L80 57.6L80 58.4L80 59.2L80 60L80 61.6" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M20 32.4L20 30.8L20 30L20 29.2L20 28.4L20 27.6L20 26.8L20 26L20 25.2L20 24.4L20 23.6L20 22.8L20 22L20 21.2L20 20.4L20 19.6L20 18.8L20 18L20 17.2L20 16.4L20 15.6L20 14.8L20 14L20 13.2L20 12.4L20 11.6L20 10.8L20 10L20.8 10L21.6 10L22.4 10L23.2 10L24 10L24.8 10L25.6 10L26.4 10L27.2 10L28 10L28.8 10L29.6 10L30.4 10L31.2 10L32 10L32.8 10L33.6 10L34.4 10L35.2 10L36 10L36.8 10L37.6 10L37.4 10.8L37.2 11.5L37 12.3L36.8 13.1L36.5 13.8L36.3 14.6L36.1 15.3L35.9 16.1L35.7 16.9L35.5 17.6L35.3 18.4L35 19.1L34.8 19.9L34.6 20.7L34.4 21.4L34.2 22.2L34 23L33.8 23.7L33.5 24.5L33.3 25.2L33.1 26L32.9 26.8L32.7 27.5L32.5 28.3L32.3 29.1L32.1 29.8L31.9 30.6L31.8 32.1" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M37.6 10L39.2 10L40 10L40.8 10L41.6 10L42.4 10L43.2 10L44 10L44.8 10L45.6 10L46.4 10L47.2 10L48 10L48.8 10L49.6 10L50.4 10L51.2 10L52 10L52.8 10L53.6 10L54.4 10L55.2 10L55 10.8L54.8 11.5L54.6 12.3L54.4 13L54.1 13.8L53.9 14.6L53.7 15.3L53.5 16.1L53.3 16.8L53.1 17.6L52.9 18.3L52.6 19.1L52.4 19.9L52.2 20.6L52 21.4L51.8 22.1L51.6 22.9L51.4 23.6L51.2 24.4L51 25.2L50.7 25.9L50.5 26.7L50.3 27.4L50.1 28.2L49.9 29L49.7 29.7L49.5 30.5" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M65.6 31.2L65.9 29.4L66.3 28.7L66.7 28L67.1 27.3L67.4 26.6L67.8 25.9L68.2 25.2L68.5 24.6L68.9 23.9L69.3 23.2L69.6 22.6L70 21.9L70.3 21.2L70.7 20.6L71 19.9L71.4 19.9L71.8 20.6L72.1 21.4L72.5 22.1L72.9 22.8L73.3 23.4L73.6 24.1L74 24.9L74.4 25.6L74.8 26.2L75.1 26.9L75.5 27.6L75.9 28.4L76.3 29.1L76.6 29.8L77 30.4L77.1 30.9L76.6 31.4L76.1 32L75.6 32.5L75 33.1L74.5 33.7L74 34.2L73.5 34.8L73 35.3L72.4 35.9L71.9 36.4L71.4 37L70.4 36.4" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M72.4 35.9L74 36.5L74 37.3L73.9 38.1L73.9 38.8L73.8 39.6L73.8 40.4L73.8 41.1L73.7 41.9L73.7 42.7L73.6 43.5L73.6 44.2L72.8 44.2L72.1 44.1L71.4 44L70.6 44L69.9 43.9L69.1 43.9" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M52.4 63.5L50.9 63.2L50.2 63.2L49.5 63.2L48.7 63.2" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M47.9 47.6L47.5 46.2L47.2 45.5L47 44.8L46.8 44.1L46.3 42.7" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M55.2 10L56.8 10L57.6 10L58.4 10L59.2 10L60 10L60.8 10L61.6 10L62.4 10L63.2 10L64 10L64.8 10L65.6 10L66.4 10L67.2 10L68 10L68.8 10L69.6 10L70.4 10L71.2 10L72 10L72.8 10L72.6 10.8L72.4 11.5L72.2 12.3L71.9 13.1L71.7 13.8L71.5 14.6L71.3 15.4L71.1 16.2L70.9 16.9L70.6 17.7L70.4 18.5L71.2 19.6" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M77.2 30.8L78.9 30.8L79.6 30.8L80 31.2L80 32L80 32.8L80 33.5L80 34.3L80 35.1L80 35.9L80 36.6L80 37.4L80 38.2L80 39L80 39.8L80 40.5L80 41.3L80 42.1L80 42.9L80 43.6L80 44.4" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M72.8 10L74.3 10L75.1 10L75.8 10L76.6 10L77.3 10L78.1 10L78.9 10L79.6 10L80 10.4L80 11.2L80 12L80 12.8L80 13.6L80 14.4L80 15.2L80 16L80 16.8L80 17.6L80 18.4L80 19.2L80 20L80 20.8L80 21.6L80 22.4L80 23.2L80 24L80 24.8L80 25.6L80 26.4L80 27.2L80 28L80 28.8L80 29.6" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
<figcaption>Rain on the Lotus Pond, from the Monsoon pack, emitted by the game's own drawing tool. Shading stands in for the glass colours. The rain is lead with no glass of its own — long slanting lines, spaced so the glass between them stays a pane and never a sliver.</figcaption>
</figure>

When the drawing could not be done by code, it was done by hand in code anyway. The Andaman and Nicobar Islands were meant to come from an AI draft; the dugong came out looking like a shark and the hornbill was unreadable, so that state's windows were plotted by hand instead.

## The rule we broke on day two

The first post was published on 13 September. Its clearest promise was this:

> **Gond, Madhubani and Warli wait for commissioned artists.** … We will not generate these styles, and we will not prompt an image model to imitate them.

On 14 September that rule was relaxed, and it was relaxed twice in one day.

The first change was the owner's argument, and it is correct: **an art style is not property.** Copyright protects particular artworks, not a style — that is the idea–expression line — and a Geographical Indication protects a *name* on goods, not a manner of drawing. So "commission-only" had been a brand choice rather than a legal requirement. The policy now allows **original compositions drawn by our own code** in a tradition's visual grammar, labelled *"inspired by X, Region"* and never presented as the thing itself. That is defensible, and it is what most of the map is.

The second change is the one that contradicts the post. Later the same day, the figurative traditions — Madhubani, Gond, Kalamkari, Warli, Sohrai-Khovar, Rogan, Kalighat's secular subjects — were **drafted in Google Stitch**, an AI design tool, as vector panels that our importer turns into windows. **23 windows in the game carry an AI-assisted provenance.** The policy document still contains, a few lines above that decision, a bullet saying AI image models are "still out, whatever the law allows" for exactly these traditions. Both rules are in the same file. Nobody reconciled them, and the second one shipped.

Here is what was actually done about it, which is not nothing:

- **Every AI-assisted window says so.** Its lore card reads "Inspired by X · design AI-assisted", the prompt is kept verbatim in the level's data with its date, and a row goes into the credits file. A test fails the build if an AI-assisted window lacks its prompt, its date or its "inspired by" line. Google Play itself asks only for a [self-declaration of AI-generated store-listing assets](https://support.google.com/googleplay/android-developer/answer/17262077); everything above is inside the game, where no policy required it.
- **The prompts forbid the sacred.** No deities, no religious symbols or ritual squares, no text, original compositions only.
- **Weak drafts were thrown away rather than shipped.** Of the first eleven, three were redone and one twice. In the second round, 15 of 17 shipped. The two that did not are the most useful detail in this post: **Twin Blossoms** was dropped because its centre — a blue flame on a yellow pedestal — reads as a butter lamp, a Buddhist ritual object, in a Buddhist community's tradition; and **Covered Pot** was dropped because the black pot, cut into white slivers, read as cracked.
- **The eight most figurative traditions were then drawn by our own code anyway.** On 19 September a shelf called **Stories** added a free window each for Madhubani, Sohrai, Kalamkari, Rogan, Gond, Warli, Pattachitra and Kalighat — not AI-assisted, drawn in a Python tool, each lore card crediting the community and saying the window is inspired by the tradition rather than an example of it. A test bars ten words from their names and lore: Jagannath, Durga, Krishna, Ganesha, Shiva, Lakshmi, Kali, puja, kohbar, chauk.

And here is what did not change, because it never depended on the law: **no deity, no ritual diagram, no yantra, no Warli marriage chauk, no swastik, no script, and no images of the Andaman and Nicobar peoples.** Those are still refused outright.

The risk is written down in the repository in one sentence, and it is worth quoting exactly as it stands:

> The risk, stated plainly: artists broadly object to AI imitation of their work, and tribal art drawn by AI is the kind of thing that draws criticism. … Disclosure and the commissioning plan are the answer, not concealment.

I think that is the right answer and I am not certain of it. Commissioned packs are still the stated goal, with the artist's name on every window, and no artist has been commissioned yet. The honest status is that the first post described a standard we then did not hold, and the version of it we did hold — original compositions, disclosed, with the sacred refused — is a weaker standard that we can at least show our work for.

## Artisan: 72 scenes for about $13

Artisan is the second game inside the game. A painted scene of an Indian place — Hampi at dusk, the tea hills of Munnar, Varanasi's ghats — is cut into whole hexagons and you drag them home; pieces that belong together fuse and move as one, which is a [union-find](https://en.wikipedia.org/wiki/Disjoint-set_data_structure) over the board after every move. You can choose 54, 77 or 126 pieces.

Those scenes are AI-generated images, and that is the decision the art policy carved out explicitly: **landscapes and monuments seen from outside only**, never a tradition's grammar, never a living artist's style. Every scene says "AI-generated scene" when it is finished, on the About page and in the credits, and its prompt and date stay in the data.

They share one hand because they share one sentence. Every prompt is built from a fixed style string:

> A luminous stained-glass painting, tall portrait 3:4, filling the frame edge to edge. Bold flat shapes of glowing colour separated by thin dark lead lines… No text or lettering, no signatures, no borders or frames, no people's faces, no deities, idols or religious icons, no temple interiors. An original artwork, not a copy of any photograph or existing painting. Subject: {subject}, {light}.

The economics are the part worth reporting. The first five scenes were made by hand in ChatGPT; the next nineteen were generated through an API for **$3.73**, back in about ten minutes, and none needed redoing. Hill Stations added eight for **$1.57**. Five more packs added forty for **$8.05**, one redo included. That is **72 scenes for roughly $13.35** — about twenty cents and two minutes each — against a quote from a human illustrator that would have ended the feature before it started. The art budget was not the constraint; the checking was.

Because every scene *is* checked, by eye, for text, faces, idols and wrong landmarks. Konark was regenerated because the first image was a wooden cart rather than the temple. The Temples pack prompts say "no carved figures" and show every sacred place from outside only.

Three production bugs from Artisan are worth keeping, because none of them was in the generator:

- **White seams down every vertical edge.** Pieces are cut 2.5% large so that neighbours overlap, but the texture atlas cell was sized to the plain hexagon, so each piece lost its overlap. The test for it is a flat red scene: any white in it is a gap.
- **The hint drew underneath the pieces.** The board in Artisan is always completely covered, so the hint outline was never once visible. The owner's verdict was "the hint does nothing in artisan". Anything meant to be seen is drawn over the pieces now.
- **The finish had nothing left to finish.** The completion animation was the seams melting — but a scene is assembled seam by seam, so by the last move almost every seam had already melted. "No animation or any sense of achievement," as the playtest put it. The light now plays over whatever state the board ended in.

## The music was generated too, and then it was engineered

The game had four layers of synthesised drone, written in Python, that faded up as a window filled. On 14 September they were replaced by four instrumentals generated with Google's [Lyria](https://deepmind.google/models/lyria/) from the owner's own prompts — one for each quarter of the country. Lyria's output carries an inaudible [SynthID](https://deepmind.google/technologies/synthid/) watermark, and the original renders keep their [C2PA Content Credentials](https://c2pa.org/); our own Opus encode drops those credentials, so the originals are kept beside the shipped files for provenance. The Morning Kolam (south) is veena, bamboo flute and tanpura; Drawing at First Light (west) is sarangi and kamaicha-inspired strings.

Generating them took an afternoon. Making them usable took a Python mastering script, and that script is the most genuinely technical thing in this post.

A game loop has to be seamless, and each render was a ~174-second piece with a quiet opening and a long fade-out. You cannot simply cut it:

> **The loop is an overlap, not a cut.** The piece's own fade-out is laid over its own opening… so both voices are continuous across the seam by construction — the ending simply rings on as the piece begins again, the way a musician would join it.

<figure>
<svg viewBox="0 0 540 212" role="img" aria-label="Two diagrams. Above, the original render: a quiet opening, a long body, and a fade-out beginning at the point marked N minus O. Below, the loop: the piece is cut at N minus O and its fade-out is added on top of its own opening, so the seam has both voices sounding and is continuous." style="width:100%;height:auto">
<text x="0" y="14" font-family="ui-monospace, monospace" font-size="11" fill="currentColor">the render, ~174 s: a quiet opening and a long fade-out</text>
<path d="M0 70 L18 30 L450 30 L520 70 Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.2"/>
<line x1="450" y1="22" x2="450" y2="78" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
<text x="455" y="34" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">N − O</text>
<text x="0" y="118" font-family="ui-monospace, monospace" font-size="11" fill="currentColor">the loop: the fade-out is added over the opening</text>
<path d="M0 174 L18 134 L450 134 L450 174 Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.2"/>
<path d="M0 174 L18 134 L70 134 L0 174 Z" fill="currentColor" fill-opacity="0.18"/>
<path d="M0 174 L70 134" stroke="currentColor" stroke-width="1.2" fill="none" stroke-dasharray="4 3"/>
<path d="M470 100 C500 100 500 126 470 126" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>
<text x="80" y="150" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">x[N−O:] added here</text>
<line x1="450" y1="126" x2="450" y2="182" stroke="currentColor" stroke-width="2"/>
<text x="446" y="196" text-anchor="end" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">the seam: both voices continuous by construction</text>
</svg>
<figcaption>Why the music does not click. The tail is not discarded and it is not crossfaded at playback; it is added onto the head once, offline, so that the first sample of the loop already contains the last.</figcaption>
</figure>

That alone is not enough, because everything you do afterwards can put the click back:

> **Every later stage treats the loop as a circle**, because a filter, a compressor or a resampler run over the file from one end to the other starts from a different state than it ends in, and that difference is a click at the seam.

So the EQ and the reverb are applied as a single FFT over the whole loop — circular convolution, so the reverb tail of the last bar wraps onto the first — and the compressor and the resampler are run over the loop padded with its own ends, which are cut away afterwards. The reverb itself is synthesised in numpy: decorrelated stereo noise in four bands, each with its own decay so low frequencies ring longest, 20 ms of pre-delay, mixed quietly because the renders are already reverberant and this is glue rather than a hall. Loudness is **one linear gain** to −18 LUFS with the true peak held under −1 dBTP, because a dynamic normaliser would ride the gain and break the loop. The −1 dBTP ceiling and the gated measurement come from [EBU R 128](https://tech.ebu.ch/publications/r128); the −18 target does not. R 128 normalises broadcast programmes to −23 LUFS, and −18 is our own choice for a phone speaker under a layer of chimes.

The four loops ship as [Opus](https://opus-codec.org/) at 64 kbps, about 1.5 MB each. The script refuses to write a file that fails its own checks: the decoded length must equal the written length, the step across the seam must be no worse than an ordinary sample step, and the spectral change at the seam must be no larger than at 400 random joins elsewhere in the piece. Those seam numbers are in the repository for all four scores.

Two details I like more than I should:

**The music is the progress bar.** There is no progress bar. The score plays only while a window is being made — the title, the map and the gallery are silent — and it sits behind a low-pass filter that opens from 1.4 kHz to 16 kHz on a log scale as the window fills, swelling as it goes, always under the chimes. You hear yourself getting closer. The first build ran it too loud and the playtest said so.

**The chimes are retuned by playing them faster.** The eight chime samples are C pentatonic, and the mastering script also detects each score's best-fitting pentatonic key, so the chimes are pitch-shifted into the current score's key by changing playback speed — no new audio files for four regions. The fit is only 0.70–0.78, so an Indian mode with a komal note will sometimes rub against a chime, which is recorded as a known compromise rather than a solved problem.

One open item, stated as the repository states it: **the seams have not yet been confirmed on a phone.** They pass every measurement on this machine.

## Packs, journeys and a calendar

The content that is sold is new content. Two window packs, six Artisan scene packs, and a set of cosmetic finishes for the lead and the glass. **Nothing that was already free was ever moved into a pack** — a checking tool refuses to import a scene into a pack if that scene is free in the committed data — and a scene you have already started playing never locks, whatever you own.

The free structure around it is deliberately unmeasured. Progress is shown as things made rather than percentages: a ring per shelf, a passport stamp per yatra, a cabinet of keepsakes that are earned and never bought. There are no counts on the gallery screen and a test asserts that none appear. The one-move Hint is free and unlimited and "Show me how" plays its first three steps free, so a stuck player is never charged to get unstuck.

The festival almanac is the piece I would defend hardest to a product manager. On Sankranti, Margazhi, Holi, Onam, Diwali, the Pushkar Fair and the Hornbill Festival, the game opens on that festival's window with a line of story. It is a calendar that knows what is being celebrated — not an event, nothing timed, nothing missed if you do not play. The dates are a hardcoded table for 2026–2028 checked against published panchangs, with a note in the code to extend it before 2029, because there is no lunar arithmetic anywhere in this game and there should not be.

## RevenueCat, offerings and Patron

This is the part the first post promised, so here is the structure, without the prices.

The billing library was swapped for RevenueCat on 14 September, four days before the first upload. The app does not hold a hardcoded list of things to sell: **the shelf is fetched from RevenueCat's current offering**, and a purchase goes through that offering's package, so a price experiment can attribute it. That is the documented way to use the product: an offering is "the selection of products that are 'offered' to a user on your paywall", and RevenueCat [strongly recommends](https://www.revenuecat.com/docs/offerings/overview) referencing the current offering rather than a hardcoded identifier, so the shelf can change without an app update. Offering metadata can carry the words shown on the upgrade sheet — but any metadata string containing a currency symbol is dropped before it is displayed, because a price written by hand is a price that will eventually be wrong in some country.

The rule the whole store client exists to enforce came from a previous game of ours that shipped a "Remove Ads" button for a product that did not exist in the console, where it does nothing, forever, with no error anywhere:

> **No button is drawn for a product the store did not return.**

So an unresolved product is null, every call site draws nothing when it is null, buying an unresolved id is a no-op, and there are tests for all three. The same code path covers a sideloaded build, an emulator, a device with no Play Store, a country the game is not sold in and a network outage: no purchase UI, whole game.

There is also a **Patron** product that covers everything including packs that do not exist yet, and it is shown *only* to a player who owns nothing paid — someone who already bought a pack goes on buying item by item, because a bundle priced for everything would charge them twice for what they have.

The least glamorous and most useful piece: **the store catalogue is a JSON file and a script.** It declares every product, entitlement and offering across both the Play console and RevenueCat, and the script prints what would change before it changes anything. Its dry runs read like a build log — "36 already right, 65 changes to make", then after applying, "96 right, 0 to change", then "85 already right, 8 changes, all of them Monsoon", and finally **"159 items right, 0 changes"**. Setting up nineteen products by hand across two dashboards, twice, is exactly the task that produces the SKU typo the rule above exists to catch.

## The fifteen days

Here is the sentence from our own planning document, written before any of this:

> There is no publishing gate to plan around. Confirmed from this account's own history: four apps published, the 12-tester / 14-day closed-testing requirement does not apply, and Orbitone was reviewed in a day. **The build is the critical path and the store is about a day behind it.**

Every clause of that is true except the last one, and the last one is the only one that mattered.

Build 33 went to internal testing on 18 September. Build 34 went to **production** review the same day. Those are not the same queue. Google's own documentation says that [app updates on internal test tracks "are not subject to reviews"](https://support.google.com/googleplay/android-developer/answer/9859654) and that a build published to an internal track reaches testers ["within minutes"](https://support.google.com/googleplay/android-developer/answer/9845334) — which is exactly the experience that taught us the store was a day behind the build. The first *public* release is a different animal, and ours sat in review until **3 October**.

<figure>
<svg viewBox="0 0 680 180" role="img" aria-label="A timeline from 13 September to early October 2026. A solid bar covers 13 to 19 September, labelled as six days of building, builds 15 to 37. A dashed bar runs from 18 September to 3 October, labelled as build 34 in Google Play production review, 15 days. A heavy vertical line at 30 September marks the Devpost deadline, and the review bar crosses it and ends three days later at a marker labelled live." style="width:100%;height:auto">
<line x1="40.0" y1="150" x2="640.0" y2="150" stroke="currentColor" stroke-width="1" opacity="0.4"/>
<line x1="40.0" y1="146" x2="40.0" y2="154" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="40.0" y="168" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">13 Sep</text>
<line x1="176.4" y1="146" x2="176.4" y2="154" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="176.4" y="168" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">18 Sep</text>
<line x1="503.6" y1="146" x2="503.6" y2="154" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="503.6" y="168" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">30 Sep</text>
<line x1="585.5" y1="146" x2="585.5" y2="154" stroke="currentColor" stroke-width="1" opacity="0.6"/>
<text x="585.5" y="168" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">3 Oct</text>
<rect x="40.0" y="40" width="163.6" height="22" rx="3" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.2"/>
<text x="46.0" y="55" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">built: builds 15 → 37</text>
<text x="40.0" y="30" font-family="ui-monospace, monospace" font-size="11" fill="currentColor">six days</text>
<rect x="176.4" y="80" width="409.1" height="22" rx="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 3"/>
<text x="182.4" y="95" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">build 34 in Google Play production review — 15 days</text>
<line x1="503.6" y1="24" x2="503.6" y2="150" stroke="currentColor" stroke-width="2"/>
<text x="497.6" y="20" text-anchor="end" font-family="ui-monospace, monospace" font-size="11" fill="currentColor">Devpost closes</text>
<circle cx="585.5" cy="91" r="4.5" fill="currentColor"/>
<text x="593.5" y="95" font-family="ui-monospace, monospace" font-size="11" fill="currentColor">live</text>
<path d="M507.6 128 L581.5 128" stroke="currentColor" stroke-width="1.2"/>
<text x="544.5" y="123" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="currentColor" opacity="0.75">3 days</text>
</svg>
<figcaption>The whole story in one picture. The game was finished twelve days before the deadline. The review was not, and nothing in the review was ours to speed up.</figcaption>
</figure>

Google does not publish a median review time or a service level. What it publishes is a ceiling and a warning: processing "can take a few hours or up to seven days (or longer in exceptional cases)", and the same page recommends "a buffer period of at least a week between submitting your app and going live". Fifteen days is our own measured outcome, not a number Google quotes, and it is well outside the range the ceiling implies.

Nothing dramatic happened in those fifteen days. There was no rejection, no policy strike, no appeal: the app was simply in review, and there is no way to buy a faster one. The deadline required a live store URL inside the submission window, so when the review cleared, the window had closed.

The worst part is that the contest rules said so. Reading them again afterwards: "Software applications … must be **fully published** … by the submission deadline. Note: The App Review process can take multiple days or more. We recommend submitting to the store early to get through the review process and make updates as you add more to your app." That is the exact failure, printed in advance, in the rules we had read for everything else.

The repository records the conclusion in one line:

> **A store review is a dependency with a tail of its own — count back two weeks, not two days, from any deadline that needs an app to be live.**

What that would have meant in practice: the 18 September upload should have been a 15 September upload, and the "finished" version would have been the build from that day — 145 windows instead of 169, and no yatras, no almanac, no Patron, no Stories, no Monsoon and no Line mode. Everything added after the 17th was an update, and updates were never the problem. The entry needed version one to be *public*, not good.

The honest second conclusion is that nothing about the contest changed what got built. The deadline was never allowed to decide the game — the first post said that in September and it held — and the launch kit that was assembled for the judges (the screenshots, the shot list, the description, the store catalogue) is now just the game's launch kit.

## What the listing still says

One more paragraph, because a post like this does not get to stop at the flattering parts.

The live store listing, which I checked while writing this, says the game has **145 windows** and **four modes**, and that Artisan has **24 scenes**. It ships 169 windows, five modes and 72 scenes. The description was written on 15 September — and it even carries a note to itself saying "before submitting: update the window and scene counts if they have changed" — then the game grew for four more days and nobody read the note. The Hindi description says the same wrong numbers.

The repository is worse. `CLAUDE.md`, the README and the knowledge bundle's own index all still read "**Pre-release; nothing has shipped**", two weeks after it shipped. The note recording that the Shipaton entry was never made is not even committed. A tree whose first ground rule is "if you build it, it gets a knowledge-bundle entry the same day" went quiet on the day the waiting started, which is exactly when the record is least interesting to write and most useful to have.

Neither is hard to fix, and both are on the list. They are here because the gap between what a project knows and what its own files say is the cheapest kind of debt to acquire and the easiest to forget you are carrying.

## Verdict

The game is good, and six days is a real number: 169 windows, five ways to play, a map of 36 states and union territories, 72 scenes, four scores and 3,347 passing tests, built by one person with agents working in parallel worktrees, from a prototype that had 25 windows and one mechanic.

The three things I would carry to the next launch are smaller than that.

**A store review is a dependency, and the only one you cannot pay to accelerate.** We budgeted a day because an earlier app took a day, and the first public release of a new app is a different animal from an update to an old one. Two weeks, every time.

**A policy that contradicts itself ships the permissive half.** The art-sourcing document held both "no AI image models for these traditions" and "figurative traditions are drafted in Stitch" on the same day, in the same file. The one that got implemented was the one that let the map be finished. If a rule matters, the moment it is relaxed is the moment to delete the old sentence rather than leave it as decoration.

**Generated assets move the bottleneck, they do not remove it.** The music took an afternoon to generate and a day to master; the scenes cost $13.35 to make and every one still had to be looked at by a person who knows what Konark looks like. What generation bought was not cheap art. It was a game with four scores and 72 painted scenes existing at all, at a scale where a one-person studio would otherwise have shipped neither.

---

*All figures here are first-party: the window and scene counts from the game's own data files, the builds from the version history, the image-generation costs from the runs recorded in the repository, and the review dates from the launch file written on 3 October. The store-listing counts were read from the live Google Play page on 4 October 2026. The window in this post is emitted by the game's own drawing tool; the diagrams are drawn by hand. Nothing here is legal advice, and the view that a style cannot be owned is our reading, not a lawyer's.*

## FAQ

### How long does Google Play review take for a new app?

Google does not publish an average. Its documentation says processing "can take a few hours or up to seven days (or longer in exceptional cases)" and recommends a buffer of at least a week between submitting and going live. ChitraYatra's first production release went for review on 18 September 2026 and cleared on 3 October 2026 — fifteen days — on an account that had already published four apps, one of which was reviewed in a single day. Budget two weeks.

### Is internal testing reviewed as slowly as a production release?

No, and conflating the two is how we missed a deadline. Google's documentation says updates on an internal test track are not subject to review and reach testers within minutes, which makes the store feel like it is a day behind your build. A first public production release is reviewed properly: ours took fifteen days while the internal track had been live throughout.

### Can you use AI-generated art in a game on Google Play?

Yes, and ChitraYatra does: its 72 Artisan scenes are AI-generated images and 23 of its windows were drafted with AI assistance. What matters is what you generate and what you tell people. We keep every prompt and date with the asset, say "AI-generated scene" on the scene itself, disclose it on the About page, in the credits file and in the store description, and refuse deities, ritual diagrams, script and any living artist's style.

### Is it acceptable to imitate Indian folk art like Madhubani or Warli with AI?

Legally, a style is not owned — copyright protects particular artworks, not a manner of drawing, and a Geographical Indication protects a name on goods. Ethically it is contested, and artists broadly object to AI imitation of their work. ChitraYatra's answer is partial: original compositions labelled "inspired by", the sacred refused outright, the eight most figurative traditions redrawn by our own code rather than generated, full disclosure, and commissioned artists still the stated goal.

### How do you make a music loop that does not click?

Do not cut the file — overlap it. Lay the piece's own fade-out over its own opening so the first sample of the loop already contains the last, and then treat the loop as a circle for everything that follows: apply EQ and reverb as one circular convolution, and pad the compressor and resampler with the loop's own ends. A filter run from one end of a file to the other starts in a different state than it ends in, and that difference is the click.

### What is ChitraYatra?

ChitraYatra is a puzzle game for Android, free to download with optional purchases, in which stained-glass windows drawn from Indian art traditions are cut into hexagonal panes that you turn, trade or carry home until the lead lines meet and the glass lights. It has 169 windows across 18 collections, a map with one art for every state and union territory, five ways to play, and a second mode called Artisan that assembles painted scenes of Indian places.

### What was RevenueCat Shipaton 2026?

Shipaton 2026 was RevenueCat's app-building competition on Devpost. It required an app's first public release to land on the App Store, Google Play or the Galaxy Store inside the submission period, to be fully published by the deadline, and to use the RevenueCat SDK to power at least one purchase. Submissions closed on 30 September 2026 at 11:45 pm PDT. ChitraYatra met every requirement except being published in time, because its Play review cleared on 3 October.

### How much does it cost to generate 72 images for a game?

ChitraYatra's 72 Artisan scenes cost about $13.35 in total through an image API — roughly twenty cents and about two minutes each at 1152 × 1536. The generation is the cheap part: every scene still had to be reviewed by a human for text, faces, idols and misidentified landmarks, and one was regenerated because the model drew a wooden cart instead of the temple at Konark.

## Sources

- [ChitraYatra on Google Play](https://play.google.com/store/apps/details?id=com.cybiqon.chitrayatra) — the live listing, read 4 October 2026
- [RevenueCat Shipaton 2026 — official rules](https://revenuecat-shipaton-2026.devpost.com/rules) — Devpost
- [Announcing Shipaton 2026](https://www.revenuecat.com/blog/company/announcing-shipaton-2026) — RevenueCat, July 2026
- [Control when app changes are reviewed and published](https://support.google.com/googleplay/android-developer/answer/9859654) — Play Console Help
- [Publish your app](https://support.google.com/googleplay/android-developer/answer/9859751) — Play Console Help
- [Set up an open, closed, or internal test](https://support.google.com/googleplay/android-developer/answer/9845334) — Play Console Help
- [Declaring AI-generated content in Play Console](https://support.google.com/googleplay/android-developer/answer/17262077) — Play Console Help
- [Understanding Google Play's AI-Generated Content policy](https://support.google.com/googleplay/android-developer/answer/14094294) — Play Console Help
- [Offerings](https://www.revenuecat.com/docs/offerings/overview) — RevenueCat documentation
- [Experiments](https://www.revenuecat.com/docs/tools/experiments-v1) — RevenueCat documentation
- [Lyria](https://deepmind.google/models/lyria/) — Google DeepMind
- [SynthID](https://deepmind.google/technologies/synthid/) — Google DeepMind
- [C2PA — Content Credentials](https://c2pa.org/) — Coalition for Content Provenance and Authenticity
- [Opus codec](https://opus-codec.org/) — Xiph.Org / IETF RFC 6716
- [EBU R 128: Loudness normalisation and permitted maximum level of audio signals](https://tech.ebu.ch/publications/r128) — European Broadcasting Union, V5, November 2023
- [Islamic Star Patterns from Polygons in Contact](https://cs.uwaterloo.ca/~csk/publications/Papers/kaplan_2005.pdf) — Craig S. Kaplan, Graphics Interface 2005, on E. H. Hankin's 1925 method
- [Disjoint-set data structure](https://en.wikipedia.org/wiki/Disjoint-set_data_structure) — Wikipedia
- [DataMeet India maps](https://github.com/datameet/maps) — India boundary data, CC BY 4.0
- [Ten Indian art traditions made the mood board. Two made the game.](/lab/kolam-rangoli-mandala-indian-art-puzzle-game) — the first post in this series
