---
title: "Eight bots played all 500 levels. They were measuring the wrong game."
# The h1 states the finding. The searchable string is the method, because what
# somebody would actually type is the problem — generating levels and knowing
# how hard they are — rather than our particular way of getting it wrong.
seo_title: "Procedural Level Generation: Tuning 500 Levels With Playtest Bots"
excerpt: "We built eight bots to play a 500-level arcade game and measure how hard each level is. They played it 720 pixels wide. Phones are 412. Levels do not scale, so the shipped game was roughly twice as hard as the game being measured: 172 of 500 levels in band, not the 421 we were reporting."
date: 2026-08-29
tags:
  - Games
  - Procedural Generation
  - Testing
  - Flutter
  - Engineering
# Figures the body cannot derive. Word count, reading time and source count are
# computed at render so they cannot go stale.
readouts:
  - label: levels
    value: "500"
  - label: in band
    value: "419/500"
  - label: bot vs human
    value: "r +0.14"
  - label: verbs
    value: "8"
  - label: tests
    value: "894"
  - label: prototypes
    value: "10"
---

The store listing for [Orbitone](https://play.google.com/store/apps/details?id=com.cybiqon.orbitone) makes one claim that is not marketing: every one of its 500 levels was played before it shipped.

Not by me. One person cannot play 500 levels enough times to know how hard each one is, and there is no phone and no emulator on the machine the game was built on. So a level is a function of its number — `level(N) = recipe(curve(N), seed(N))` — and eight headless bots play every one of them a few hundred times through a model of a mediocre human: reaction latency, an unsteady thumb, dropped inputs, only so many things watched at once. The clear rate under that noise is what the entire content pipeline calls difficulty. A level that measures too easy or too brutal gets its intensity re-tuned, and failing that, re-dealt from a new seed.

That pipeline ran for three weeks and produced about 80,000 bot runs, eight generated tables of per-level corrections, and a difficulty curve every content decision was made against.

Every number it produced was measured at a screen width no phone has.

`buildLevel` takes the width to build at. Every tool in the repository — the verifier, all eight tuners, every render golden, the calibrator — used its default of **720**. The running game passed it the actual screen width, and a phone is 360 to 430 logical pixels across. That would be harmless if a level scaled. It does not: the loop, the band and the tile row are sized from the width they are handed, while every speed and every radius in the recipe is a world-unit constant — `speed: 300`, `radius: 11`, `kPlayerRadius = 13`.

The shipped game was roughly twice as hard as the game being measured, and it got worse the further in you went.

This is what it took to build that instrument, the eight separate ways it turned out to be wrong, and what is left when you stop pretending a bot is a player.

## TL;DR

- **The bot predicts how long a level takes and barely predicts how hard it is.** Against 219 levels of on-device telemetry, bot clear rate correlates with human clear rate at **r = +0.14**; bot duration against human duration is **+0.56**. The instrument the content pipeline rests on was measuring the wrong quantity, and looked authoritative doing it.
- **Levels were built at the phone's width and measured at 720.** Same level, median bot: Radial 359 clears at **4% on a phone against 49% at 720**; Drag 412 at 3% against 41%. Re-measured honestly the shipped game sat at **172 of 500 levels in band**, not the 421 the tools had been reporting.
- **A verb does not buy levels; it buys the right to the levels after it.** Four cheap shapes all sat above one expensive verb's unlock, so building them first would have added zero playable levels. That verb cost a week and bought 16; the three shapes behind it cost three evenings and bought 73.
- **Gravity is not a difficulty knob on the flap verb; it is a tuning fork.** Swept at 400 trials a point, clear rate has **two lobes sixty points tall** — 5% at k=0.60 and 66% at k=0.70, across six independent bot seeds. The flap arc has a period, the gates arrive on a cadence, and where they commensurate the level flies itself.
- **The measurement was noisier than the band it was compared against.** The same level at 120 trials reads 36% or 54% depending only on the bot's seed. A bisection that stops at its first success parks levels on the band floor: 54 below against 21 above, a skew no symmetric process produces.
- **The headless check enforcing the architecture never called the level builder.** It built its own synthetic level instead, so it proved the rule for one verb of seven and exercised two shapes deleted from the game. On its first honest run it found level 2 clearing itself with no input.

## Ten pygame games and one line of code

The game did not start as a design. It started as a directory of 33 [pygame](https://www.pygame.org/docs/) prototypes written over several years and abandoned, and the observation that five of them were the same game.

Arc Dash, Hex Dash, Rotate Dash, Qircle Rush and Connected all put a marker on a closed path and give you one button. In four of them the button does the same thing, and it is the same line of code: `dtheta *= -1` appears verbatim in `Arc Dash/main.py`, `Connected/main.py`, `Rotate Dash/main.py` and `Hex Dash/main.py`. Everything else that distinguishes those games — a hexagon instead of a circle, a cross instead of a ring, hazards that orbit instead of hazards that cross — is a parameter someone hard-coded rather than a mechanic someone designed.

That is the whole premise. Once the path is data, a new level costs a curve and a spawn table rather than new code.

<figure>
<svg viewBox="0 0 680 236" role="img" aria-label="Five pygame prototype names — Connected, Hex Dash, Rotate Dash, Arc Dash and Qircle Rush — listed in a column on the left, with an arrow pointing right into a single box containing the unified model: a Track defined as a closed curve sampled by distance travelled, a Traveler holding a position and a direction, an Input where a tap flips the direction, and Target and Hazard bodies riding or crossing that track. A note to the right records that the direction flip appears verbatim as the same line of source in four of the five originals." style="width:100%;height:auto">
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11.5" font-weight="bold">
    <text x="10" y="22">five prototypes</text>
    <text x="252" y="22">one model</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.55">
    <rect x="10" y="34" width="152" height="24" rx="4"/>
    <rect x="10" y="64" width="152" height="24" rx="4"/>
    <rect x="10" y="94" width="152" height="24" rx="4"/>
    <rect x="10" y="124" width="152" height="24" rx="4"/>
    <rect x="10" y="154" width="152" height="24" rx="4"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="22" y="50">Connected</text>
    <text x="22" y="80">Hex Dash</text>
    <text x="22" y="110">Rotate Dash</text>
    <text x="22" y="140">Arc Dash</text>
    <text x="22" y="170">Qircle Rush</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.7">
    <path d="M174 106 L232 106 M226 100 L232 106 L226 112"/>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="252" y="34" width="256" height="144" rx="4"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="266" y="56">Track     closed curve, sampled</text>
    <text x="266" y="72">          by distance travelled</text>
    <text x="266" y="94">Traveler  position t, direction d</text>
    <text x="266" y="116">Input     tap: d = -d</text>
    <text x="266" y="138">Target    a point on the track</text>
    <text x="266" y="160">Hazard    rides it, or crosses it</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.45" stroke-dasharray="4 4">
    <line x1="336" y1="116" x2="336" y2="200"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.8">
    <text x="344" y="204">dtheta *= -1 — the same line, in four of the five</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.75">
    <text x="522" y="56">everything</text>
    <text x="522" y="70">else those</text>
    <text x="522" y="84">games differ</text>
    <text x="522" y="98">by is a</text>
    <text x="522" y="112">hard-coded</text>
    <text x="522" y="126">parameter</text>
  </g>
</svg>
<figcaption>The reduction the whole project rests on. Five games collapse to one model plus a table of constants — which is only a good trade if the constants can then be generated rather than typed.</figcaption>
</figure>

The original design document was written for **Godot**, planned five worlds of twenty hand-authored levels, and explicitly told us not to build a curve evaluator: Godot ships [`Curve2D`](https://docs.godotengine.org/en/stable/classes/class_curve2d.html) and [`PathFollow2D`](https://docs.godotengine.org/en/stable/classes/class_pathfollow2d.html), which are exactly this abstraction.

None of that survived. The game shipped in **[Flutter](https://flutter.dev/) with [Flame](https://docs.flame-engine.org/)**, for one boring reason — the ad and billing plugins are first-party, and the previous game had already proved that path end to end — and the cost landed immediately. Flutter has no `Curve2D`; `dart:ui`'s `Path` and `PathMetric` would do the job but live inside the Flutter engine, and the engine layer of this game is not allowed to import Flutter. So the curve evaluator got written after all: a closed polyline with arc-length parameterisation, about a hundred lines.

Arc length is not a refinement. A polyline indexed by "fraction of the point list" moves at wildly different speeds depending on how densely each region happened to be sampled, so the traveller crawls through a tight corner and sprints down a long straight, and every shape needs its own hand-tuned speed constant. The test that pins it uses an **ellipse**, whose points are sampled uniformly in angle and are therefore about 1.6 times denser at the ends of the minor axis; equal steps in `t` must still produce equal chords. The first version of that test made the same demand of a triangle and failed correctly — a step spanning a 120° corner geometrically cuts its chord to half the arc it covers.

## Verbs are code; shapes are data

The most important sentence in the codebase is a cost model, and everything about the project's shape follows from it.

A **verb** is one implementation of the game mode interface: its own motion rules, input mapping, death condition, difficulty knobs, renderer, and its own verification bot. There are eight — Orbit, Ascent, Corridor, Lattice, Lane, Radial, Drag and Rhythm — and each cost about a week, of which the bot is the expensive half. A **shape** is a list of points: twelve of them, roughly twenty lines each, inheriting every hazard, every bot and every knob for free. A **modifier** is a per-frame transform on a sampled point — the loop spins, breathes, drifts — and costs an evening, because it multiplies every shape at once and needs no new mode, renderer or bot.

| | cost | what it buys |
|---|---|---|
| verb | about a week | a new question, and the levels above its unlock |
| shape | an afternoon | variety inside a range already unlocked |
| modifier | an evening | every shape at once, from its unlock upward |

Three of the six planned modifiers turned out not to be transforms at all: one removes track segments and so needs a new death condition, one needs a second loop and a transition rule, and one re-parameterises arc length every frame. That is verb-scale work wearing a modifier's name, and the plan had costed all six together as though they were one thing.

The sharper mistake is one this project's own notes had to retract. The plan said the four remaining shapes came next "because they are cheap." They are cheap. They were also all scheduled to unlock at levels 236, 265, 325 and 432, every one of them **above** the unlock of a verb that did not exist yet — so all four together would have added exactly zero playable levels before that verb shipped.

**A verb does not buy levels; it buys the right to the levels after it.** Corridor took a week and bought 16 playable levels, which reads as a disappointment until you notice what came after: the rose at 236 bought 12, the crescent at 265 bought 31, the sawtooth at 325 bought 30. Seventy-three levels for perhaps three evenings, and none of them reachable without the week.

Two shapes were built and then deleted. A figure-eight and a lissajous measured **3.97 times harder than any bot predicted**, because a self-crossing curve puts a hazard at your screen position while it is visibly not on your path — a difficulty the player experiences and the model cannot. The rule that replaced them is structural rather than empirical: a shape must be a positive radial function `r(θ) > 0`, which cannot self-cross by construction rather than by testing for it afterwards.

## A level is a function of its number

Five hundred levels cannot be hand-authored by one person, so none of them are. `curveFor(n)` computes progression as `t = n / 500` and hands a recipe a set of parameters; the recipe deals the rest from a seeded stream. Nothing generates at runtime in the sense of being unpredictable — the same level number produces the same level on every device, forever, and that property is load-bearing rather than convenient.

It has to be, because the bot and the phone must agree bit for bit. If they diverge, the bots are measuring a game nobody plays and the numbers are worse than useless, because they look authoritative. Three rules follow.

**Never use the standard library's [`Random`](https://api.dart.dev/stable/dart-math/Random-class.html).** Dart does not guarantee its algorithm is stable across SDK releases, and a generator that changed behaviour between versions would silently re-roll all 500 levels. The engine ships [xorshift32](https://www.jstatsoft.org/article/view/v008i14) instead — small, fully specified, and unable to drift.

**[Fixed timestep](https://gafferongames.com/post/fix_your_timestep/), always.** Every one of the source prototypes was frame-rate coupled; Hex Dash ran at 90 fps and Dodgy Walls at 30, and they played completely differently as a result. The stepper accumulates real frame time into whole 1/60 s steps and caps a single frame, so a garbage-collection pause cannot trigger a catch-up spiral.

**Fork the generator for independent draws.** Without it, adding one extra hazard roll shifts every subsequent value and re-rolls the remainder of the level, so a one-line content change silently re-deals a hundred tuned levels.

The determinism test hashes a whole trajectory — position, score, combo and outcome sampled every thirty frames — and asserts two runs produce the same signature. It also asserts that a single tap moved by one frame produces a **different** signature, because otherwise the test would pass trivially and go on passing after the simulation stopped depending on input at all.

<figure>
<svg viewBox="0 0 680 220" role="img" aria-label="A pipeline diagram. A level number feeds a curve function producing difficulty parameters, which feed a recipe together with a seed derived from the same number, producing a level specification. That specification is played by the verb's bot for 120 trials under a human noise model, producing a clear rate. If the clear rate falls inside the level's target band the overrides are written and the level ships; if not, the intensity multiplier is re-tuned, and if tuning fails the seed salt is changed and the level is dealt again, returning to the recipe step." style="width:100%;height:auto">
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="10" y="46" width="86" height="34" rx="4"/>
    <rect x="126" y="46" width="86" height="34" rx="4"/>
    <rect x="242" y="46" width="98" height="34" rx="4"/>
    <rect x="370" y="46" width="110" height="34" rx="4"/>
    <rect x="510" y="46" width="86" height="34" rx="4"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="22" y="60">level N</text>
    <text x="22" y="74">  curve(N)</text>
    <text x="138" y="60">recipe</text>
    <text x="138" y="74">  + seed(N)</text>
    <text x="254" y="60">LevelSpec</text>
    <text x="254" y="74">  deterministic</text>
    <text x="382" y="60">bot x 120</text>
    <text x="382" y="74">  human noise</text>
    <text x="522" y="60">in band?</text>
    <text x="522" y="74">  40-62%</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.7">
    <path d="M100 63 L120 63 M114 58 L120 63 L114 68"/>
    <path d="M216 63 L236 63 M230 58 L236 63 L230 68"/>
    <path d="M344 63 L364 63 M358 58 L364 63 L358 68"/>
    <path d="M484 63 L504 63 M498 58 L504 63 L498 68"/>
    <path d="M600 63 L648 63 M642 58 L648 63 L642 68"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.85">
    <text x="608" y="58">ship</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.6" stroke-dasharray="5 5">
    <path d="M553 84 L553 130 L291 130 L291 86 M286 92 L291 86 L296 92"/>
    <path d="M553 130 L553 172 L169 172 L169 86 M164 92 L169 86 L174 92"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.8">
    <text x="300" y="126">no: re-tune the intensity multiplier k</text>
    <text x="178" y="168">still no: change the salt, deal it again</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.7">
    <text x="10" y="202">Only two things about a level are stored: its k and its salt. Everything else is recomputed from N.</text>
  </g>
</svg>
<figcaption>The tuner has exactly two levers, and only one of them is continuous. That constraint is what keeps the level data to eight small generated tables instead of 500 files — and it is also why a level that cannot be tuned has to be thrown away rather than fixed.</figcaption>
</figure>

## The bots are bad on purpose

A perfect bot clears everything and therefore measures nothing. Each of the eight plays through an explicit human model: reaction latency, jitter on aim, a miss rate, a bounded attention span of three hazards, and perception error that scales with distance. Three named profiles — expert, median, novice — and the tuning target is median, at 0.45 s reaction and a 12% miss rate. Quarter-second reaction was tried and rejected: that is a reflex, not a perceive-decide-act loop.

This is the point where the approach diverges hardest from the one we used on the previous game, and the divergence is not a preference. Our puzzle game verifies its levels with a breadth-first solver, and [two of the three generators we wrote for it produced perfectly playable levels at the wrong difficulty without ever failing](/lab/puzzle-generator-random-walk-doesnt-work). A solver **proves**. It returns the true optimal move count, which is why that number can be used directly as the three-star threshold — get it wrong by one and the player can never earn the third star, and there is no error to grep for.

An arcade level has no optimal solution to enumerate. The state space is continuous and the difficulty is entirely a fact about hands, so the verifier here cannot prove anything. It can only **estimate**, and an estimate has a standard error, a bias, and a set of things it structurally cannot see. Every remaining section of this article is one of those three.

Both games also carry the same architectural rule — the engine directory may never import Flutter or Flame — and in the puzzle game that rule was, in its own documentation's words, enforced socially rather than mechanically. Here it is a script. `headless_check.dart` runs the engine under plain `dart run` with no rendering stack anywhere, and it reports counts rather than a status, because a job that can fail silently and exit zero has already meant "did nothing" for thirty-three consecutive nights elsewhere in this company:

```text
  built           500 levels through buildLevel(), 181255 fixed steps
  verb            cleared / died / stalled  of built
    Orbit          2 /  308 /    0       310
    Ascent         0 /   56 /    0        56
  reproduced      500/500 levels identical after 500 rebuilds
  self-clearing   1 (1 known)
  verbs dealt     8/8 unlocked by level 500
  wall clock      255 ms
```

Two hundred and fifty-five milliseconds to build 500 levels twice over is what makes the real verification tractable: eight verbs by 500 levels by a few hundred noisy trials is minutes rather than hours.

## The check that never called the level builder

For the entire life of that file, it built its own level.

Not `buildLevel`. A synthetic mode assembled inline — a shape picked straight out of the enum, a hand-rolled orbiter, a speed off a bare generator. Three consequences, and all three are worse than they look.

**It proved the wrong thing.** There were seven verbs by the time anyone noticed. Any of the other six could have acquired a Flutter import and this script would have gone on printing a confident green line about the one that had not.

**It could not see the pipeline.** The curve function, the override tables, the salts, the shape normaliser, the warps, the per-verb traits — none of it was reachable, so "500 levels reproducible" was a statement about a level nobody plays.

**It drew content that had been deleted.** The shape enum still contained the two self-crossing shapes, dropped from rotation weeks earlier. A third of what the check exercised was removed content.

This is the same shape as [six of our agent's seventeen tools having zero production evidence](/lab/six-of-our-agents-tools-had-never-run), and it fails the same way: the thing that looks most like coverage is a green line about a code path nobody travels. The reproducibility check inside it had the matching defect. It compared three scalars — the target index, the quota and the track length — which a genuinely divergent build can easily agree on: a hazard dealt to a different phase keeps all three, and so does a warp with a different clock. It now steps both builds 240 fixed steps and compares every body and every field.

On its first honest run it found **level 2 clearing itself with no input**.

Level 2 is the tutorial that teaches the tap. Its own entry in the scripted-level table claims "one target ahead, one behind — so the reverse is unavoidable", and neither half was true: targets are drawn uniformly around the loop rather than placed, and on a closed track with no expiry every target is reachable by simply continuing forward.

There is a test for exactly this. It is called `input_required_test.dart`, its docstring quotes "level 2 cleared itself in 3.6 seconds without a single tap" as the reason it exists, and it could not see this, because it skips the scripted levels **as a category**. Exempting a category hides everything in it; naming the levels hides one level and says why. The check now carries a named ledger of the levels allowed to self-clear, compared in both directions — a level in the ledger that *stops* self-clearing also fails, because then the debt is paid and the entry has become a lie about the game.

## What the bot actually measures

On 10 August we had 219 levels of on-device telemetry — 736 attempts, 415 clears — and could finally join it against a 120-trial bot verification of the same 219 levels.

| | |
|---|---|
| correlation, bot clear rate vs human clear rate | **+0.14** |
| correlation, bot median seconds vs human mean seconds | **+0.56** |

The instrument predicts how long a level takes and barely predicts how hard it is.

Per-level human samples are small — 68 of 216 levels were attempted exactly once — so that first figure is attenuated by noise and should not be read as precisely zero. The pooled comparisons are not attenuated, and they are worse.

| slice | levels | attempts | human clears | bot |
|---|---|---|---|---|
| Ascent, levels 100–219 | 39 | 115 | **80%** | 52% |
| Orbit, levels 100–219 | 81 | 399 | 45% | 51% |
| carrying a pulser | 4 | 63 | **8%** | 45% |
| the levels a person never beat | 7 | 80 | **15%** | 53% |
| levels the verifier calls *too easy* | 19 | 61 | **43%** | >62% by definition |

The pulser is the clearest structural blind spot. It is a hazard anchored beside the loop that swells and contracts on a cycle, threatening a stretch of track over time rather than a point that moves — "when is that open" instead of "where will it be". The bot plans through the swell with exact radii and a perfect clock, so the thing actually killing people, arriving at a stretch that was already shut having never seen it cycle, is not a difficulty it can experience. Fixing the underlying phase bug moved the bot's numbers by one to four points **in the wrong direction**. That is what an unmeasurable mechanic looks like from inside the instrument.

The most instructive line in that table is the last one. Of the 19 levels the verifier files as *too easy*, a person clears 43% — and two of the seven levels nobody could clear at all were on that list. **The pipeline's own response to the levels nobody could beat was to make them harder.**

The finding we got wrong first is worth more than the ones we got right. The initial reading said corners were the strongest difficulty variable in the game: circles clearing at 82% against polygons and gears at 33%, at a matched level number. It is clean, plausible and mechanically satisfying, and it does not survive — two of the four worst "polygon" levels were pulser ambushes, and with pulser and sweep levels removed polygon rises to 47% and sits mid-table. Four candidate mechanisms were then measured, and all four failed.

| hypothesis | result |
|---|---|
| heading-extrapolation error over 0.35 s | ranks **polygon smoother than a circle** — its corners are sampled at the default resolution and come out rounded. Swept as a bot parameter: 4.5 points of spiky-versus-smooth discrimination where 23 were needed, and it made every shape uniformly harder. Reverted |
| valley depth | 38.2% either side of the median. Exactly nothing |
| perimeter and wiggle | the wave shape has the second-highest wiggle and a 65% clear rate |
| orbiter speed | reverses sign under a crosser control |

There is no shape effect. There are seven bad levels — 71, 76, 117, 131, 153, 158 and 173 — carrying eighty attempts and twelve clears between them, 15% against a bot averaging 53%. Set them aside and gear and star tracks clear at 60% against everything else's 62%. The elegant mechanism was an artefact; the ugly list was the finding.

It produced the one place in the codebase where a phone overrules the instrument: a hard-coded set of level numbers a person demonstrably could not beat, alongside a parallel map recording **which seed they actually played** — because the question was never "what is this level dealing now" but "what did the person play". A fact, not a state.

## The bot is a different player on every verb

The premise stated at the top of the bot code is that a profile describes *a player*, so a clear rate is only comparable across verbs if the same noise model produced it. That premise is false. The same profile is a 75th-percentile Ascent player and a 30th-percentile Radial player.

| verb | levels | attempts | human clears | bot clears | z | the bot is |
|---|---|---|---|---|---|---|
| Ascent | 7 | 8 | **75%** | 26% | −3.2 | 2.9× pessimistic |
| Orbit | 36 | 125 | 27% | 40% | +2.0 | 1.5× optimistic |
| Corridor | 3 | 4 | 75% | 49% | −1.5 | — |
| Lattice | 4 | 7 | 57% | 50% | −1.1 | — |
| Lane | 3 | 8 | 25% | 46% | −0.4 | — |
| Radial | 7 | 23 | **30%** | 71% | +4.2 | 2.3× optimistic |

A 6.6× spread in what one band means, decided by nothing but which verb the level happens to be. A level banded 32–54% is cleared three times in four if it is Ascent and three times in ten if it is Radial, and the band table handed both the same numbers.

The correction has to be applied **in log-odds rather than in points**, for reasons of arithmetic rather than taste. The old constant was a flat 0.14 subtracted from the band's edges; Ascent's measured correction is 49 points and Radial's is 41 the other way, so 32–54% minus 49 has a negative floor and 62–90% plus 41 asks for a clear rate above 100%. Both verbs that actually needed correcting were uncorrectable in the space the constant was written in, which is why there had only ever been one of them.

It is then gated and shrunk, because a correction computed from four attempts is not a correction: a verb moves only when its excess clears two standard errors, and is then shrunk by one, so three of six correct by zero. And it is floored at a 12% clear rate, for a reason about the instrument rather than the player — the standard error of the logit is 0.30 at a 10% clear rate and 0.54 at 3%, so below there the tuner is steering on noise. What the cap refuses is reported as a **residual** rather than absorbed: 44 Ascent levels carry one, which is the honest statement that the verb is corrected as far as a target can go and still is not calibrated.

The thing found on the way is the best measurement in the project. Ascent's tuner bisected gravity, having written down that clear rate is monotone in it. It is not.

<figure>
<svg viewBox="0 0 680 262" role="img" aria-label="A line chart of clear rate against the gravity multiplier for the flap verb, measured on level 337 at 400 trials per point. The curve rises to a peak of 53 percent at a multiplier of 0.50, falls to a trough of 3 to 5 percent between 0.60 and 0.64, rises again to a second and higher peak of 66 percent at 0.70, and falls away to 15 percent by 0.82. The target band of 32 to 54 percent is shaded, and the curve crosses it four times. Two lobes roughly sixty percentage points tall are the shape of the result." style="width:100%;height:auto">
  <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.25">
    <line x1="60" y1="64" x2="640" y2="64"/>
    <line x1="60" y1="113" x2="640" y2="113"/>
    <line x1="60" y1="161" x2="640" y2="161"/>
  </g>
  <g fill="currentColor" opacity="0.12">
    <rect x="60" y="79" width="580" height="53"/>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.5">
    <line x1="60" y1="210" x2="640" y2="210"/>
    <line x1="60" y1="40" x2="60" y2="210"/>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="2.5">
    <polyline points="60,208 89,198 118,169 147,81 176,108 205,144 234,169 263,191 292,198 321,203 350,203 379,193 408,164 437,50 466,52 495,59 524,93 553,154 582,171 611,174 640,132"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.75">
    <text x="26" y="67">60%</text>
    <text x="26" y="116">40%</text>
    <text x="26" y="164">20%</text>
    <text x="26" y="213">0%</text>
    <text x="46" y="228">0.44</text>
    <text x="133" y="228">0.50</text>
    <text x="278" y="228">0.60</text>
    <text x="423" y="228">0.70</text>
    <text x="568" y="228">0.80</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.85">
    <text x="298" y="192">5% here</text>
    <text x="398" y="40">66% here</text>
    <text x="66" y="96">target band</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.7">
    <text x="60" y="248">gravity multiplier k, level 337, 400 trials a point. A bisection assumes this curve is monotone.</text>
  </g>
</svg>
<figcaption>Two lobes, sixty points tall. The band is crossed four times, so a bisection lands wherever it started walking — which is why eleven days of tuning had produced no measurable change in difficulty and no explanation for it.</figcaption>
</figure>

This is not noise: 0.60 reads 4–7% across six independent bot seeds while 0.70 reads 63–68% across the same six. Nor is it the bot's motor period — expert, median and novice profiles put their lobes at the *same* gravities and differ only in height.

It is the level. A flap is a fixed impulse against a constant acceleration, so the arc between taps has a period, and the gates arrive on a fixed cadence. Where the two commensurate, the level can be flown by rhythm alone. **Gravity is not a difficulty knob on this verb; it is a tuning fork.**

One fact retired four separately-recorded mysteries. Sweeping the miss rate, the perception error and the jitter had moved the clear rate not at all, and only the knob that changes the bot's flap frequency ever moved it. Shrinking the gap ramp and re-tuning had moved the mean across 39 levels by 1.8 points — the tuner had simply found a different lobe. A half-strength band correction predicted 62% and delivered 75%, recorded at the time as partial pass-through and actually lobe-hopping. And a commit titled *"a tuner that cancels whatever you build"* had named the symptom eleven days before anyone found the cause.

The bisection is now a scan across the whole range preferring **plateaus over peaks**: a gravity where a two-percent change moves the level forty points describes that probe and nothing else. The counterexample is pinned in a test, so the monotone claim cannot be re-derived from first principles by the next person who reasons about it for thirty seconds and concludes it is obvious.

## The instrument was noisier than the thing it measured

The same level, the same intensity, 120 trials each, with only the bot's seed differing:

| level | band | seed 1 | seed n | seed 7 | seed 99 |
|---|---|---|---|---|---|
| 302 | 36–58% | 38% | 36% | **54%** | 42% |
| 307 | 36–58% | 38% | 33% | **50%** | 45% |
| 286 | 36–58% | 38% | 34% | 33% | **22%** |

An eighteen-point spread on a twenty-two-point band. This is not a bug — it is exactly what a [binomial at 120 trials](https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval) predicts, since the standard error at p = 0.4 is 4.5 points. The instrument's resolution was comparable to the thing it measured, so "in band" was decided by the die about as often as by the level.

Two mechanisms were making it worse than the arithmetic required.

Every tuner bisected until the rate was *inside* the band and returned on the spot. Since a bisection approaches from the easy side, the first reading inside is usually one just inside the **floor** — and a level parked on its floor is one draw away from being under it. Strict verification found 54 levels below band against 21 above, a 2.6-to-1 skew that no symmetric process produces. The searches now aim at the middle and correct anything outside the inner half.

And every measurement spent the same effort on easy calls and hard ones. A level clearing at 8% against a 40–62% band is decided by its first sample; one at 37% is not decided by any single sample. Trials now escalate against **independent bot seeds** only while the estimate sits within two standard errors of an edge — cheaper than raising the trial count everywhere, and it puts the resolution where the decision is. The tuner and the verifier share that code, which matters as much as either fix: two tools that estimate the same quantity differently will disagree about every level worth arguing over.

Two hundred and forty-nine of 324 levels in band became 294, the skew fell to 1.5-to-1, and the near-misses fell from 31 within two points of an edge to 9. It also surfaced a fact the old tuner had hidden: **122 of 169 curve corrections soften.** While any level anywhere in band was left alone, how far off-centre the base curve sat was unobservable. It sat high.

The related repair is to a test rather than a tuner. A separate tool ranked "walls" — levels a person is stuck on — by a 3× ratio of human attempts to bot prediction, which at a 40% clear rate is met by one player in thirty needing ten attempts. Tested properly, with the geometric tail and a [correction for how many levels were being looked at](https://en.wikipedia.org/wiki/Bonferroni_correction), that criterion's **eight** candidates come down to **one**: level 422, sixteen attempts for one clear, a 1-in-2300 draw.

Two more levels passed the corrected test and were deliberately spared. Both are Rhythm levels with zero clears and zero points scored, and the player's own sentence says why — they could not tell what the game wanted. **A statistical test cannot distinguish "badly dealt" from "could not be played."** The same judgement kept that verb out of the calibration table entirely, where 0% human against a 74% bot would have encoded a user-interface bug into the difficulty curve forever.

## The level was a function of the glass

Everything above is a story about an instrument being imprecise, or biased, or blind to a mechanic. This one is arithmetic. Measured at 80 trials a level on the median bot, the same levels at 360 against the same levels at 720:

<figure>
<svg viewBox="0 0 680 318" role="img" aria-label="A paired horizontal bar chart comparing clear rates for one level of each of the eight verbs, measured at a 360 pixel design width against a 720 pixel one. Ascent level 104 reads 25 percent against 38. Corridor 224 reads 20 against 53. Lattice 252 reads 16 against 36. Lane 299 reads 11 against 46. Radial 359 reads 4 against 49. Drag 412 reads 3 against 41. Rhythm 460 reads 20 against 34. Orbit 480 reads 3 against 35. Every verb is harder on a phone, and the gap widens sharply for the verbs that unlock later in the game." style="width:100%;height:auto">
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5">
    <rect x="10" y="14" width="18" height="8" opacity="0.85"/>
    <text x="34" y="22" opacity="0.85">at 360 — what a phone played</text>
    <rect x="238" y="14" width="18" height="8" opacity="0.3"/>
    <text x="262" y="22" opacity="0.75">at 720 — what every tool measured</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="10" y="53">Ascent 104</text>
    <text x="10" y="85">Corridor 224</text>
    <text x="10" y="117">Lattice 252</text>
    <text x="10" y="149">Lane 299</text>
    <text x="10" y="181">Radial 359</text>
    <text x="10" y="213">Drag 412</text>
    <text x="10" y="245">Rhythm 460</text>
    <text x="10" y="277">Orbit 480</text>
  </g>
  <g fill="currentColor" opacity="0.85">
    <rect x="130" y="39" width="200" height="9"/>
    <rect x="130" y="71" width="160" height="9"/>
    <rect x="130" y="103" width="128" height="9"/>
    <rect x="130" y="135" width="88" height="9"/>
    <rect x="130" y="167" width="32" height="9"/>
    <rect x="130" y="199" width="24" height="9"/>
    <rect x="130" y="231" width="160" height="9"/>
    <rect x="130" y="263" width="24" height="9"/>
  </g>
  <g fill="currentColor" opacity="0.3">
    <rect x="130" y="50" width="304" height="9"/>
    <rect x="130" y="82" width="424" height="9"/>
    <rect x="130" y="114" width="288" height="9"/>
    <rect x="130" y="146" width="368" height="9"/>
    <rect x="130" y="178" width="392" height="9"/>
    <rect x="130" y="210" width="328" height="9"/>
    <rect x="130" y="242" width="272" height="9"/>
    <rect x="130" y="274" width="280" height="9"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.9">
    <text x="338" y="47">25%</text>
    <text x="298" y="79">20%</text>
    <text x="266" y="111">16%</text>
    <text x="226" y="143">11%</text>
    <text x="170" y="175">4%</text>
    <text x="162" y="207">3%</text>
    <text x="298" y="239">20%</text>
    <text x="162" y="271">3%</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.6">
    <text x="442" y="58">38%</text>
    <text x="562" y="90">53%</text>
    <text x="426" y="122">36%</text>
    <text x="506" y="154">46%</text>
    <text x="530" y="186">49%</text>
    <text x="466" y="218">41%</text>
    <text x="410" y="250">34%</text>
    <text x="418" y="282">35%</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.4">
    <line x1="130" y1="34" x2="130" y2="290"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.7">
    <text x="10" y="308">Later verbs unlock further in, where the curve is steeper — so the same error costs more.</text>
  </g>
</svg>
<figcaption>Not a bias to correct but two different games. Note the ordering: the gap is worst for Radial, Drag and late Orbit, which is exactly where the per-verb calibration table had been recording its largest corrections and attributing them to novelty and fatigue.</figcaption>
</figure>

This is the most likely single cause of the bot-to-human gap the project had been correcting per verb since the first telemetry drop — the gap the calibration table exists to absorb, the one that made a late level a twenty-two-attempt wall, the one that made a Rhythm level look like a bot artefact. It was never only novelty and fatigue.

Then the fix shipped at a design width of 720 and was rejected twice by the phone, which is the more useful half of the story.

> *"why did you changed the size of the loops, it was good previousy. revert. the current one feels to zoomed out, bad"*

> *"the ball seems to move very slowly. and the track looks very skinny."*

Both reports are the same arithmetic read from the other side. A world-unit constant is only as meaningful as the width it was written against, and every one of them here had been written as a pixel count on a 412-wide phone. Building at 720 and scaling down to fit leaves the loop exactly where it was and every one of those constants at 57% of itself.

| | authored | at width 720 | at width 412 |
|---|---|---|---|
| player dot | 13 px | 7.4 px | 13 px |
| target ring | 18 px | 10.3 px | 18 px |
| track stroke | 2 px | 1.1 px | 2 px |
| one lap | 2.1 s | 3.6 s | 2.1 s |

The design width is **412** now, so on a phone the transform is the identity and every constant means what it was written to mean at once. The first attempt had scaled the body radii through a single multiplier, which fixed the picture and could not have fixed the pace: that multiplier would have had to reach every speed in the engine and all thirty-odd stroke-width literals in the renderer, each one a chance to miss one — and a missed one is this bug again. Setting the design width to the glass those literals were authored against does all of it and leaves nothing to remember.

**No measurement in the repository carried over.** Re-measured honestly, the shipped game sat at **172 of 500 levels in band**, with 244 more than ten points out. That is the game the phone had been playing all along, and it is the same game the telemetry had been describing for weeks. Re-tuning brought it to **404**.

Against the 421 the 720-wide build had been reporting, 404 reads as a regression. It is not a comparison: 421 was measured on a game nobody plays, and **172 to 404 is the comparable pair** — the largest single improvement in difficulty accuracy this project has made. Getting there needed the base curve re-shaped rather than merely re-tuned, which a test said out loud: 231 of 256 corrections softening describes a biased curve, not a noisy one.

Three further bugs fell out of the honest measurement on its own. Two of the ten level builders still defaulted to a hardcoded 720, so two verbs were measuring a different game than they shipped and nothing would have said so. The tuner's self-clear guard was checked against the pre-reroll deal, so a level could be re-dealt into one that plays itself and be written out clean. And the level-2 tutorial debt turned out to be this bug wearing a different hat: its exemption turned entirely on the ratio between the player's lap rate and a fleeing orbiter's, 0.21 against 0.14, and at the corrected width the player laps at 0.49 and a player who never taps now dies. The fix was never a mechanic — the tutorial had been quietly demonstrating the width bug since the day the check was written.

## What a bot cannot be told

Every serious bug this game has had came from a thumb, and the ones worth keeping are the ones the bot could not have found in principle rather than by accident.

**Level 6 was unbeatable in ten attempts. The bot cleared it two hundred times out of two hundred.** The cause was that the bot had no viewport and no attention limit: horizontal crossers spawn at 0.75× the screen width from centre while the visible edge is at 0.5×, so they sit about 180 px off-screen at birth, and the bot was dodging things a player physically cannot see. That is the day the human model got a viewport, an attention limit of three hazards and distance-scaled perception error — and the day every difficulty number produced before it became fiction.

**Level 189 was played ten times, never cleared, and never scored once**, averaging 2.1 seconds a life, on a level the bot rates at 35%. The first target had been dealt inside a hazard — eleven of the 200 loop levels opened that way, because the placer drew a uniform sample around the loop and never looked at where the hazards were. The bot cannot represent this failure at all: it reads hazards and targets as separate lists and never asks whether they are in the same place. It was flying to a target it had no model of being unable to reach.

The test that should have caught it was named *"targets are reachable — none sits under a permanent hazard"* and checked only that the target was not under the **player**. A test can assert the wrong thing under exactly the right name for months.

**A reactive bot measures every level of the eighth verb at zero.** The other seven bots all react: something appears, the reaction latency elapses, a decision is made. Rhythm's strike window is 0.20 s and the median profile's reaction is 0.45 s, so a reactive model never lands a single tap — every level reads 0%, and there is nothing to bisect. Nobody plays a rhythm game that way. You watch the tile fall, you know when it will arrive, and you put the tap there. Reaction had to enter as a share of the *anticipation error* rather than as a delay.

The same verb produced the best structural bug in the project, and no bot could have seen it, because the bot does not run the shell. **A won Rhythm level recorded nothing at all** — no clear, no stars, no progression, and no melody note on the one verb built to put the melody in the foreground. The game loop writes the clear and the death near the bottom of its update method, under four early returns. That is invisible for seven verbs, because seven verbs resolve inside the step function, in the same frame. Rhythm resolves from **input**, so by the next frame a guard had already returned. The rule is general: anything the shell learns by diffing state across a frame is wrong for a verb whose state changes on input. The telemetry had been saying so for a day — ten Rhythm levels, 21 attempts, zero clears, and one death, that death being the only kind the step function can produce.

Rendering is verified by golden PNGs, since there is no device on the machine, and they catch real bugs. But **three of them turned out to be photographs of nothing.** A modifier unlock opens frozen behind its coaching card, so the update returns early and the warp's clock never advances — each golden had caught the one frame where the effect it existed to prove does nothing. A golden that cannot fail is documentation, not a test, which is the same failure as [building our agents a documentation system and then measuring whether they read it](/lab/we-built-a-wiki-our-ai-agents-ignored-it): an artefact that looks like verification, is cited as verification, and has never once been in a position to say no.

## Verdict

The honest position is that this is a good **regression** instrument and a weak **calibration** one.

As a regression instrument it is excellent, and the property that makes it so is determinism rather than realism. It is bit-exact, so it can prove a change touched nothing it should not have; it catches a level that has become unclearable; and when a modifier landed in the middle of the shipped range and re-dealt 108 levels, the cost was a number — in-band went 404 to 388, then 419 after a full re-tune — rather than an argument. The game shipped at **419 of 500 levels in band**, with 31 more than ten points out and every one of them named in the verifier's own output. "Measured" is true; "perfectly balanced" would not be, and the store listing does not say it.

As a calibration instrument it is weak, and the correction we shipped is the cheap half. Moving the target per verb makes the band mean roughly the same thing everywhere; it leaves the bot exactly as wrong as it was. Where the bot cannot see a mechanic, the defence has to be an assertion about the mechanic and the next telemetry drop, not a clear rate.

Three things carried over from the previous game, and all three were free: the stack, chosen because the ad and billing plugins are first-party; the architectural rule, upgraded here from a convention into a script; and an audio-pooling fix written here first and then ported *backwards*, because the same bug surfaced in the older game a week later in almost the same words. That is the second time that fix has been made in this tree, which is the point at which "remember it" stops being a strategy and the API is the problem.

What did not carry over is worth stating plainly, because the previous game's own notes predicted it. They recorded, on the day it earned its first three cents, that the gap between a game's revenue and one paid website is about four orders of magnitude, that no plausible improvement to a game closes it, and that a second game is therefore the same bet placed twice. This is the second game. It is better engineered and four to five times the engine work, and none of that touches the argument: the constraint was distribution then and it is distribution now, and 894 tests do not move it.

What the work does buy is narrower and real — a content pipeline where being wrong is detectable. Every number in this article exists because something measured it and something else disagreed. That is the part worth copying.

If you want to see what it produced, [Orbitone is on Google Play](https://play.google.com/store/apps/details?id=com.cybiqon.orbitone). Level 6 is fair now.

---

*Every figure here is first-party, measured on one machine with no phone and no emulator attached, between 1 and 26 August 2026 — 130 commits. Bot clear rates are the median human-noise profile at 40 or 120 strict trials with adaptive escalation, and are reproducible from the level number and the seed. Human clear rates come from on-device telemetry the player exported by hand, are small per level, and are not a controlled study: 68 of 216 levels in the 10 August drop were attempted exactly once. The game is Flutter 3.44.8 / Dart 3.12.2 with Flame 1.38, shipped at 1.0.0+2. Wall-clock timings should be read as ratios. This is one game, one codebase, one author.*

## FAQ

### How do you procedurally generate 500 game levels?

Make each level a pure function of its number rather than a stored file. In Orbitone a level is `recipe(curve(N), seed(N))`: a progression curve turns the level number into difficulty parameters, and a seeded generator deals the hazards, targets and geometry. Nothing is stored except two values the tuner writes per level — an intensity multiplier and a seed salt — so 500 levels cost about 700 lines of generated tables instead of 500 asset files.

### Can a bot playtest a game and measure difficulty?

Partially, and it matters which part. A perfect bot clears everything and measures nothing, so ours plays through a human model — reaction latency, aim jitter, a miss rate, a three-hazard attention limit, perception error growing with distance. Against 219 levels of real telemetry that estimate correlated with human clear rate at only **r = +0.14**, while correlating with human *duration* at +0.56. Treat it as a regression instrument that catches levels which have become unclearable, not as a measure of how hard a level feels.

### Why does a game engine need to be deterministic?

Because otherwise the thing measuring your levels and the thing your players run are different programs. Orbitone's difficulty numbers only mean something if the bot's simulation is bit-identical to the phone's, so the engine uses a fully specified xorshift32 generator rather than Dart's `Random` — whose algorithm is not guaranteed stable across SDK releases — a fixed 1/60 s timestep, and a forked generator stream per part of the recipe.

### Should a mobile game lay out at the device width or a fixed design width?

Use a fixed design width and scale the world onto the glass with one transform, unless every constant in your simulation is a fraction of the screen. Orbitone built levels at the device width while all its tooling measured at 720; the geometry scaled and the world-unit speeds and radii did not, so the shipped game was roughly twice as hard as the measured one — 172 of 500 levels in band rather than the 421 being reported. Pick the width your constants were authored against.

### Why did a difficulty knob stop working when we tuned it?

Check whether it is monotone before bisecting on it. Orbitone's flap verb tuned gravity for eleven days with no measurable effect, because clear rate against gravity has **two lobes sixty points tall** rather than one slope: a flap arc has a period, gates arrive on a cadence, and where they commensurate the level flies itself. Scan the full range and prefer plateaus over peaks — a setting where a 2% change moves the result forty points is describing your search, not your game.

### How many trials do you need to measure a level's difficulty?

More than feels necessary, and the number follows from your band width rather than from taste. At 120 trials the binomial standard error at a 40% clear rate is 4.5 points, so the same level reads 36% or 54% depending only on the seed — an eighteen-point spread against a twenty-two-point band. Escalate trials against independent seeds only while the estimate sits within two standard errors of a band edge, and have the tuner and the verifier share one implementation.

### Is Flutter and Flame a reasonable stack for a 2D mobile game?

For a small offline game with monetization, yes, and the deciding factor is usually plugins rather than rendering. Orbitone chose Flutter because [`google_mobile_ads`](https://pub.dev/packages/google_mobile_ads) and `in_app_purchase` are first-party and a previous game had already shipped them. The cost is real: Flame gives you a game loop and a component tree but no curve primitive, so anything Godot's `Curve2D` would have handled has to be written, and keeping the simulation in plain Dart with no Flutter imports is what makes headless verification possible at all.

## Sources

- [Flame](https://docs.flame-engine.org/) — the Flutter game engine used for the playfield
- [Flutter](https://flutter.dev/) — Google
- [`Random` class](https://api.dart.dev/stable/dart-math/Random-class.html) — Dart API documentation, on generator stability
- [Xorshift RNGs](https://www.jstatsoft.org/article/view/v008i14) — Marsaglia, G. (2003), Journal of Statistical Software
- [Fix Your Timestep!](https://gafferongames.com/post/fix_your_timestep/) — Glenn Fiedler, on fixed-timestep simulation
- [`Curve2D`](https://docs.godotengine.org/en/stable/classes/class_curve2d.html) — Godot Engine documentation, the primitive the original design leaned on
- [`PathFollow2D`](https://docs.godotengine.org/en/stable/classes/class_pathfollow2d.html) — Godot Engine documentation
- [pygame](https://www.pygame.org/docs/) — the library the ten source prototypes were written in
- [Binomial proportion confidence interval](https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval) — Wikipedia
- [Bonferroni correction](https://en.wikipedia.org/wiki/Bonferroni_correction) — Wikipedia
- [google_mobile_ads](https://pub.dev/packages/google_mobile_ads) — Google, Flutter plugin
