---
title: "Our puzzle generator lied about difficulty. Twice."
# The searchable title. Only <title>, the meta description and BlogPosting.headline use
# it — the h1, the OG card and the RSS item keep the title above.
seo_title: "Procedural Puzzle Level Generation: Why Reverse Random Walks Don't Work"
excerpt: "The algorithm in our own design document produced 14 usable levels from 91,322 candidates. The rewrite produced 14 from 16,249. This is the one that works: a multi-source breadth-first sweep from every winning arrangement at once, and a solver whose optimal count is the three-star threshold."
date: 2026-08-10
tags:
  - Games
  - Algorithms
  - Procedural Generation
  - Flutter
  - Engineering
# Figures from the generation runs themselves, recorded in the generator's own doc
# comments as each rewrite was measured. Word count, reading time and source count are
# NOT here: those are derived from the body at render time so they cannot go stale.
readouts:
  - label: tries
    value: "91 322"
  - label: levels
    value: "150"
  - label: rewrites
    value: "2"
---
Lumina ships 150 hand-verified sliding-block puzzles across five worlds, plus a pool of 174 dailies deep enough to run 5.8 months before it repeats. Every one is re-solved from disk by a separate program before it is allowed into the app, and every one has a star threshold that is provably reachable rather than plausibly reachable.

Getting there took writing the level generator three times.

The algorithm our own design document specified — the standard one, the one in most forum answers to "how do I generate a puzzle" — produced **14 usable levels from 91,322 candidates**. The obvious fix produced 14 from 16,249. Both failures were quiet: neither crashed, neither produced an unsolvable board, and both would have shipped a game that got easy exactly where it was supposed to get hard.

Both bugs lived in a step that looks like it obviously works.

## TL;DR

- **Walking a solved board backwards K random moves does not give you a K-move puzzle.** The state graph is undirected, so a random walk keeps undoing itself and K is only an upper bound. Of 91,322 candidates, **52% finished with the key still sitting on the exit** and another 47% came in below the target difficulty.
- **Breadth-first search outward from *the* solved position is still wrong**, and more subtly: a board has many winning arrangements, not one. Sweeping from a single win gave **15,811 of 16,249 candidates below their band** when actually solved.
- **What works is a multi-source backward sweep from the whole goal set.** Collect every winning arrangement, then search outward from all of them at once; depth in that sweep *is* the exact optimal move count. Under-band rejections fell from **15,811 to 15**, and a 6×6 bucket went from **62 seconds to 4.3 seconds**.
- **The solver has to be BFS, not A\*.** Its optimal count is the three-star threshold, and an inadmissible heuristic returns a plausible one. A level whose "optimal" is one move too high can never be three-starred — invisible in review, and unreportable by the people it affects.
- **The expensive part is throwing candidates away.** One quality filter set two notches too tight rejected **508 of 845** good boards; the near-duplicate filter rejected **1,089 in World 1 alone**. Generating boards is cheap. Deciding which ones are puzzles is the product.

## The game, in one paragraph

Lumina is a sliding-block puzzle in the [Rush Hour](https://en.wikipedia.org/wiki/Rush_Hour_(puzzle)) family. Rectangular blocks sit on a 4×4 to 6×6 grid, and a block's shape determines its axis, so a wide domino slides horizontally and a tall one vertically and you can tell which at a glance. Exactly one block is the Light Key; get it to the lantern on the boundary and the level is won. There is no timer, no move limit and no fail state of any kind.

Two definitions carry more weight than they look like they should.

**A move is a whole drag, not a cell step.** Sliding a block three cells left is one move, not three. Scoring is measured in these units, so the solver and the input layer have to agree or the score silently drifts.

**Three stars means the solver's optimal.** Not "close to optimal" — the number itself:

```dart
/// Three stars for the solver's optimal, two for close, one for finishing.
///
/// The threshold sits at +2 rather than something tighter because par on these
/// boards is an *optimum*, not a target — the difference between 8 and 9 moves
/// is frequently one reordering the player would have to see the whole solution
/// to find. Two stars should mean "you solved it well", not "you nearly did".
int starsFor({required int moves, required int optimal}) {
  if (moves <= optimal) return 3;
  if (moves <= optimal + 2) return 2;
  return 1;
}
```

That line is why everything downstream is so paranoid. The generator's output feeds a scoring rule, star totals feed world unlock gates at 40, 110, 170 and 230 of a possible 450, and the gates *are* the progression. A generator that is wrong about difficulty is a game that is wrong about progress.

## Why the design document's algorithm doesn't work

The specified approach was the intuitive one: build a solved board, walk it backwards K random moves, ship the result as a K-move puzzle. It has an appealing symmetry — you get the solution for free, since you just made it — and it is what almost everyone reaches for first.

It fails because **the state graph is undirected**. Sliding a block left and then right returns you to exactly the board you started from, so a random walk spends most of its time revisiting territory it has already covered. K steps of walking does not put you K steps from home. K is only an upper bound, and the distribution piles up hard against zero.

<figure>
<svg viewBox="0 0 660 218" role="img" aria-label="A diagram showing six random backward moves from a solved board. The walk oscillates back and forth along an axis of true distance from a win, ending only two moves away despite six moves of walking." style="width:100%;height:auto">
  <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.35">
    <line x1="40" y1="170" x2="620" y2="170"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11" opacity="0.6">
    <text x="40" y="190" text-anchor="middle">0</text>
    <text x="136" y="190" text-anchor="middle">1</text>
    <text x="232" y="190" text-anchor="middle">2</text>
    <text x="328" y="190" text-anchor="middle">3</text>
    <text x="424" y="190" text-anchor="middle">4</text>
    <text x="520" y="190" text-anchor="middle">5</text>
    <text x="616" y="190" text-anchor="middle">6</text>
    <text x="330" y="206" text-anchor="middle" opacity="0.8">true distance from a win</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.25" stroke-dasharray="2 4">
    <line x1="40" y1="24" x2="40" y2="164"/>
    <line x1="136" y1="24" x2="136" y2="164"/>
    <line x1="232" y1="24" x2="232" y2="164"/>
    <line x1="328" y1="24" x2="328" y2="164"/>
    <line x1="424" y1="24" x2="424" y2="164"/>
    <line x1="520" y1="24" x2="520" y2="164"/>
    <line x1="616" y1="24" x2="616" y2="164"/>
  </g>
  <polyline points="40,40 136,60 232,80 136,100 232,120 328,140 232,150"
            stroke="currentColor" fill="none" stroke-width="2"/>
  <g fill="currentColor">
    <circle cx="40" cy="40" r="5"/>
    <circle cx="136" cy="60" r="3.5" opacity="0.7"/>
    <circle cx="232" cy="80" r="3.5" opacity="0.7"/>
    <circle cx="136" cy="100" r="3.5" opacity="0.7"/>
    <circle cx="232" cy="120" r="3.5" opacity="0.7"/>
    <circle cx="328" cy="140" r="3.5" opacity="0.7"/>
    <circle cx="232" cy="150" r="6"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="12">
    <text x="52" y="36">solved board</text>
    <text x="246" y="154">after 6 random moves</text>
  </g>
</svg>
<figcaption>Six backward moves. Two moves of actual difficulty. The walk keeps undoing itself, and nothing in the algorithm notices.</figcaption>
</figure>

The measurement, recorded in the generator's own header where the autopsy belongs:

> Measured on the first implementation of exactly that algorithm: of 91,322 candidates, 52% finished with the key still sitting on the exit and another 47% were below the target difficulty. Not one 6x6 level of 8+ moves was produced in 13 seconds of searching.

Fifty-two percent did not merely fail to be hard. They walked all the way back to a win. The generator's most common output was a puzzle that was already solved.

## Attempt two, and the mistake that is easy to miss

The obvious correction: stop walking, start searching. Breadth-first search outward from the solved position, harvest the states sitting at whatever depth you want, and depth becomes a real measurement rather than a hopeful one.

This is better. It is also still wrong, in a way you can stare straight at without seeing.

**A board has many solved positions, not one.** The Key sitting on the exit with the blockers arranged differently is still a win. So a state ten moves from the win you happened to sweep from is routinely three moves from a different one — and the player, who does not know or care which win you had in mind, finds the three-move route.

<figure>
<svg viewBox="0 0 660 240" role="img" aria-label="A diagram of one connected component of board arrangements containing three separate winning states. A candidate state is ten moves from the winning state the sweep started from, but only three moves from a different winning state." style="width:100%;height:auto">
  <ellipse cx="330" cy="120" rx="315" ry="105" stroke="currentColor" fill="none" stroke-width="1" opacity="0.3" stroke-dasharray="5 5"/>
  <path d="M70 90 L115 64 L160 86 L205 60 L250 84 L295 58 L340 82 L385 56 L430 80 L475 54 L520 70"
        stroke="currentColor" stroke-width="2" fill="none" opacity="0.85"/>
  <path d="M520 70 L545 110 L505 150 L520 190" stroke="currentColor" stroke-width="2.5" fill="none"/>
  <g fill="currentColor" opacity="0.5">
    <circle cx="115" cy="64" r="3.5"/>
    <circle cx="160" cy="86" r="3.5"/>
    <circle cx="205" cy="60" r="3.5"/>
    <circle cx="250" cy="84" r="3.5"/>
    <circle cx="295" cy="58" r="3.5"/>
    <circle cx="340" cy="82" r="3.5"/>
    <circle cx="385" cy="56" r="3.5"/>
    <circle cx="430" cy="80" r="3.5"/>
    <circle cx="475" cy="54" r="3.5"/>
    <circle cx="545" cy="110" r="3.5"/>
    <circle cx="505" cy="150" r="3.5"/>
  </g>
  <g fill="currentColor">
    <circle cx="70" cy="90" r="7"/>
    <circle cx="520" cy="190" r="7"/>
    <circle cx="150" cy="190" r="7"/>
  </g>
  <circle cx="520" cy="70" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="12">
    <text x="40" y="114">win A</text>
    <text x="470" y="214">win B</text>
    <text x="116" y="214">win C</text>
    <text x="452" y="42">candidate</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11" opacity="0.75">
    <text x="200" y="32">10 moves from win A</text>
    <text x="556" y="120">3 from win B</text>
  </g>
</svg>
<figcaption>One connected component, three winning arrangements. Sweep depth from any single win is not distance to victory.</figcaption>
</figure>

The numbers, again from the code:

> Harvesting at depth 8–15 that way, 15,811 of 16,249 candidates came back *below* their band when actually solved.

Ninety-seven percent wrong. And note what did *not* happen: no candidate was unsolvable, nothing threw, and every level produced was a perfectly playable puzzle — just an easier one than the label said. Ship that and the difficulty curve flattens somewhere around the middle of World 1, which is precisely the complaint playtesting produced.

## Harvest by true distance

The version that ships measures distance against the whole goal *set*. Four phases.

<figure>
<svg viewBox="0 0 680 250" role="img" aria-label="The four-phase generation pipeline: build a random solved layout, flatten twist blocks to plain crystal, run a bounded forward sweep to collect every winning arrangement, then run a multi-source backward breadth-first search from all of them at once, sample round-robin across depth bands, and finally run each candidate through an accept cascade under the real rules." style="width:100%;height:auto">
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="10" y="30" width="120" height="62" rx="4"/>
    <rect x="152" y="30" width="120" height="62" rx="4"/>
    <rect x="294" y="30" width="120" height="62" rx="4"/>
    <rect x="436" y="30" width="120" height="62" rx="4"/>
    <rect x="152" y="150" width="262" height="62" rx="4"/>
    <rect x="436" y="150" width="234" height="62" rx="4"/>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.7">
    <path d="M130 61 L148 61 M142 56 L148 61 L142 66"/>
    <path d="M272 61 L290 61 M284 56 L290 61 L284 66"/>
    <path d="M414 61 L432 61 M426 56 L432 61 L426 66"/>
    <path d="M496 92 L496 121 L283 121 L283 146 M278 140 L283 146 L288 140"/>
    <path d="M414 181 L432 181 M426 176 L432 181 L426 186"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="22" y="54">A. random</text>
    <text x="22" y="70">solved</text>
    <text x="22" y="86">layout</text>
    <text x="164" y="54">B0. flatten</text>
    <text x="164" y="70">sand/ice/rime</text>
    <text x="164" y="86">to crystal</text>
    <text x="306" y="54">B1. forward</text>
    <text x="306" y="70">sweep to</text>
    <text x="306" y="86">maxOptimal+2</text>
    <text x="448" y="54">collect the</text>
    <text x="448" y="70">GOAL SET</text>
    <text x="448" y="86">(every win)</text>
    <text x="164" y="174">B2. multi-source backward BFS</text>
    <text x="164" y="190">from every goal at once</text>
    <text x="164" y="206">depth = exact optimal count</text>
    <text x="448" y="174">B3. round-robin sample</text>
    <text x="448" y="190">across depth bands, then</text>
    <text x="448" y="206">D. accept cascade (real rules)</text>
  </g>
</svg>
<figcaption>The pipeline. Only the last box uses the game's real move rules; everything before it runs on a deliberately simplified board.</figcaption>
</figure>

**Phase A** builds a layout that is already solved — Key flush against the exit wall, blockers scattered into whatever cells are left. Starting solved is what guarantees at least one win exists in the layout's connected component. You cannot generate an unsolvable board this way; the only open question is how hard it turns out to be.

**Phase B0** rewrites every "twist" block — sand, ice, rime — into a plain crystal block for the duration of the search. This looks like cheating and is load-bearing:

```dart
// Both twist mechanics are flattened to plain crystal for the sweep, for the
// same reason: each breaks the symmetry the backward search depends on. Sand
// is irreversible because it can only move once; ice because it never stops
// where it started from — slide it back and it travels to the opposite wall.
// A backward sweep over either would be walking edges the player cannot
// traverse forward. Flattening keeps the sweep meaningful, and the real solver
// still has the final say on every candidate it produces.
```

**Phase B1** is a bounded forward sweep whose only job is to find the goals: outward to `maxOptimal + 2`, keeping every state where the win condition holds. Bounded rather than exhaustive because mapping the whole component of a dense 6×6 costs minutes, and anything past that horizon can never be harvested anyway.

**Phase B2** is the trick. Breadth-first search *backwards* from every goal simultaneously:

```dart
final byDepth = <int, List<PuzzleState>>{};
final distance = <String, int>{for (final g in goals) g.key: 0};
var wave = goals;
var depth = 0;

while (wave.isNotEmpty && depth < sweepCeiling) {
  if (distance.length > stateCap) break;
  final next = <PuzzleState>[];
  depth++;

  for (final state in wave) {
    for (final move in legalMoves(crystalised, state)) {
      final neighbour = applyMove(crystalised, state, move);
      if (distance.containsKey(neighbour.key)) continue;
      distance[neighbour.key] = depth;
      next.add(neighbour);

      final atDepth = byDepth[depth] ??= [];
      if (depth >= harvestMin && atDepth.length < _perDepthCap) {
        atDepth.add(PuzzleState(neighbour.xs, neighbour.ys, 0));
      }
    }
  }
  wave = next;
}
```

Seeding the queue with every goal at distance zero makes `depth` the distance to the *nearest* win rather than to a particular one — the number the player actually experiences. And because crystal slides are reversible, one backward sweep stands in for a forward solve from every state at once. The previous design paid a full BFS per candidate; this pays two sweeps per layout and gets up to 400 candidates out of them.

Under-band rejections fell from **15,811 to 15**. Candidate efficiency went from 14 levels out of 16,249 to **21 out of 1,087**, and the 6×6 `planning` bucket went from **62 seconds to 4.3 seconds**.

**Phase B3** samples round-robin across the depth bands rather than taking the pool in discovery order, and the reason is a bug worth stating:

> Shallow depths are found first and are far more populous, so a plain first-N-states pool comes out entirely at minOptimal — the first run of this code produced six "8 to 12 move" levels that were all exactly 8.

Nothing about that failure surfaces as an error. Six levels came out, all in band, all correctly labelled. The bucket was simply the same puzzle six times.

## The solver is the difficulty curve

Every harvested candidate is then re-solved under the game's *real* rules, and filed by that number rather than by the search's estimate. The solver is plain breadth-first search, and it is not allowed to be anything cleverer:

```dart
/// BFS rather than a heuristic search because the number it produces is used as
/// the three-star threshold. An A*/IDA* run with an inadmissible heuristic would
/// return a *plausible* move count, and a level whose "optimal" is one move too
/// high is one the player can never three-star — a bug that is invisible in
/// review and only shows up in reviews.
```

This is the decision I would defend hardest. A* with a hand-tuned heuristic would be faster, and generation is the slowest thing in the project. But an off-by-one in the wrong direction produces a level that is broken in a way nobody can describe: the player solves it perfectly, gets two stars, has no way to know the third was never available, and writes a review saying the game is unfair. There is no error to grep for. The upgrade path, if 7×7 boards ever arrive, is IDA* behind the same interface with an *admissible* heuristic — never one chosen for speed alone.

The other decision that pays for itself is refusing to collapse two outcomes:

```dart
enum SolveOutcome {
  solved,

  /// The full reachable state space was enumerated and contained no solution.
  unsolvable,

  /// The state cap was hit first. Nothing is known either way.
  exhausted,
}
```

Merging `exhausted` into `unsolvable` is the obvious simplification and a trap in both directions: it would let the generator discard good boards, and — much worse — let a future caller read "we gave up" as "we proved it".

State representation is what makes any of this affordable. Breadth-first search enumerates millions of arrangements but exactly one level, so the immutable bulk stays out of the state. What is left is two byte arrays and a bitmask, keyed by packing the coordinates into a string:

```dart
/// Canonical key for hashing and visited-set membership.
///
/// Coordinates are small non-negative integers, so packing them as code units
/// into a String gives a cheap, correctly-equatable key without writing a
/// custom hash. The spent-sand mask is appended, never omitted.
late final String key = () {
  final units = Uint16List(xs.length * 2 + 1);
  for (var i = 0; i < xs.length; i++) {
    units[i * 2] = xs[i];
    units[i * 2 + 1] = ys[i];
  }
  units[units.length - 1] = spent;
  return String.fromCharCodes(units);
}();
```

"Never omitted" is doing real work there. Sand blocks slide exactly once and are then frozen forever, so two identical-looking arrangements are genuinely different puzzles if one has already burned its sand. Leave that mask out of the key and the visited set merges two states that are not the same, and the solver confidently reports an optimal count that cannot actually be reached.

## Five block kinds, five ways to break the search

| Kind | World | Rule | What it costs the search |
|---|---|---|---|
| Crystal | 1 | ordinary slide, any distance | nothing |
| Sand | 2 | slides once, then frozen forever | one bit of state per block; irreversible |
| Ice | 3 | frictionless — only the furthest slide exists | no state at all; never returns to where it started |
| Rime | 4 | immovable until the Key passes orthogonally adjacent | shares the sand bitmask, read backwards |
| Mirror | 5 | never moves; reflects the beam 90° | changes the win condition, not the moves |

Ice is the cheapest mechanic in the game and the best. The whole thing is a restriction on move generation — the player picks a direction, not a destination:

```dart
var left = 0;
for (var d = 1; x0 - d >= 0; d++) {
  if (!_columnFree(level, grid, x0 - d, y0, spec.height, i)) break;
  if (!slippery) moves.add(Move(i, -d, 0));
  left = d;
}
if (slippery && left > 0) moves.add(Move(i, -left, 0));
```

Sand and rime are near-opposites sharing one bitmask, and the comment is shorter than the explanation would be:

```dart
// Sand and rime read the same bit in opposite directions: sand is finished
// once it is set, rime has not started until it is.
if (kind == BlockKind.sand && state.isSpent(index)) return false;
if (kind == BlockKind.rime && !state.isSpent(index)) return false;
```

Because all of these are flattened to crystal for the sweep, the harvest band has to be offset to compensate — and this is where I got the sign wrong. Sand and ice only *remove* options, so a real board is at least as hard as the crystal-rules sweep thinks; harvest a little below the band and candidates land inside it. Rime does the opposite. The sweep counts a flattened rime block as an obstacle contributing depth, but a frozen block the Key never reaches is inert scenery the real solution goes around.

```dart
int get harvestShift => sandCount + iceCount - rimeCount;
```

Two measured runs to establish one minus sign. Shifting down for rime as well gave **300 under-band candidates out of 406**; not shifting at all gave 94 of 279 and produced nothing usable. Over-correcting is worse still: at three moves of shift per twist block, a 12–18 bucket harvested from depth 6 and **5,503** candidates came back under-band.

Rime also had to be rationed. A frozen block the Key can never reach never thaws, so it is a permanent wall, and on a crowded 6×6 it lands across the only route often enough to kill the bucket — **65 of 134 candidates unsolvable** at a density of two.

## World 5 changes what winning means, and cost one function

In the last world you stop driving the Key to the lantern and start routing its *light*: the Key emits a beam, mirrors bend it 90°, and you win when the beam lands on a clear lantern.

That sounds like the biggest change in the game. It was one function, because `isSolved()` is a pure function of `(level, state)` and nothing else in the engine asks what winning means. `PuzzleState` gained no fields, `legalMoves()` was untouched, the solver was untouched, and the harvest sweep already collects every solved state it happens to meet — so it collected these too.

<figure>
<svg viewBox="0 0 360 292" role="img" aria-label="A five by five puzzle grid. The Light Key is a horizontal domino on the left. Its beam travels right, reflects downward off a backslash mirror, travels down, reflects rightward off a second backslash mirror, and reaches the lantern on the right-hand wall." style="width:100%;height:auto">
  <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.3">
    <rect x="30" y="30" width="240" height="240"/>
    <line x1="78" y1="30" x2="78" y2="270"/>
    <line x1="126" y1="30" x2="126" y2="270"/>
    <line x1="174" y1="30" x2="174" y2="270"/>
    <line x1="222" y1="30" x2="222" y2="270"/>
    <line x1="30" y1="78" x2="270" y2="78"/>
    <line x1="30" y1="126" x2="270" y2="126"/>
    <line x1="30" y1="174" x2="270" y2="174"/>
    <line x1="30" y1="222" x2="270" y2="222"/>
  </g>
  <rect x="33" y="81" width="90" height="42" rx="3" stroke="currentColor" fill="none" stroke-width="2"/>
  <text x="44" y="108" fill="currentColor" font-family="ui-monospace, monospace" font-size="12">KEY</text>
  <g stroke="currentColor" stroke-width="3" fill="none">
    <line x1="182" y1="86" x2="214" y2="118"/>
    <line x1="182" y1="182" x2="214" y2="214"/>
  </g>
  <polyline points="126,102 198,102 198,198 270,198" stroke="currentColor" fill="none"
            stroke-width="2" stroke-dasharray="6 4"/>
  <path d="M258 192 L270 198 L258 204" stroke="currentColor" fill="none" stroke-width="2"/>
  <circle cx="246" cy="198" r="11" stroke="currentColor" fill="none" stroke-width="2"/>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10" opacity="0.8">
    <text x="176" y="70">mirror</text>
    <text x="176" y="166">mirror</text>
    <text x="282" y="202">lantern</text>
  </g>
</svg>
<figcaption>World 5. Two <code>\</code> mirrors: a rightward beam off <code>\</code> turns down, a downward beam off the next one turns right. The Key never reaches the exit — its light does, and only when the lantern cell is clear.</figcaption>
</figure>

Reflection is two cases and a comment about screen coordinates:

```dart
/// `/` ([MirrorTilt.forward]) sends a rightward beam **up**, which in screen
/// coordinates — y growing downward — is `dy = -dx`.
/// `\` ([MirrorTilt.back]) sends a rightward beam **down**.
(int, int) reflect(int dx, int dy, MirrorTilt tilt) => switch (tilt) {
      MirrorTilt.forward => (-dy, -dx),
      MirrorTilt.back => (dy, dx),
    };
```

The beam trace is capped at `width * height * 4` steps, and that cap is the difference between a level that fails to win and a solver that never returns: two mirrors facing each other form a closed loop, which is a perfectly legal arrangement a player can build by accident. A test constructs exactly that loop and asserts the trace gives up in under 100 ms.

Beam levels did need their own quality thresholds, and finding that out cost a full empty run.

## The filters exist to throw work away

Once a candidate is in the right band it still has to survive four more checks, ordered cheapest-first so the expensive analysis is only paid for on boards that have already earned it: exact-duplicate signature, then near-duplicate family key, then the full shortest-path DAG enumeration that counts how many distinct optimal solutions exist and which blocks never move in any of them.

Two of those thresholds were set on intuition and both were wrong.

**Solution count.** A board with dozens of equally optimal routes has no "aha" — every path works, so nothing was ever worked out. I set the cap at 6, and it rejected **508 of 845** otherwise-good candidates, nearly all for permuting moves no player would perceive as different plans. Most of the solution count on a dense board is *reordering*: two clears that do not interact contribute two orderings of one idea, and independent pairs multiply. The cap is 14 now.

**Dead furniture.** Blocks that never move in any optimal solution are capped at 40% — capped, not eliminated. A board where every block must move is a sequence to execute rather than a puzzle to read, and working out what to ignore is part of the thinking.

Beam levels needed all three loosened, because their layouts are pinned by the reserved light path and fixed mirror corners:

| Filter | Sliding | Beam |
|---|---|---|
| `maxOptimalSolutions` | 14 | 40 |
| `maxDeadFraction` | 0.40 | 0.55 |
| `maxPerFamily` | 2 | 6 |

At the sliding defaults, a beam bucket rejected **514 of 720 candidates as too similar and 162 more for solution count, and produced nothing at all**. The same bucket with the overrides gave 6 out of 6.

The near-duplicate filter exists because of playtesting. Levels 11 and 12 of World 1 shared a grid, an exit, a shape multiset and a 3-move solution, differing by **a single blocker moved one cell**. Two things were wrong: the generator accepted two levels per layout, so consecutive levels came from the same board *and landed next to each other*; and dedup only caught identical arrangements. The fix was one level per layout plus a family key that ignores where blocks sit and captures only what the puzzle is made of. It rejected **1,089 candidates in World 1 alone**, and no two adjacent levels have shared a family since.

## Where it broke

Three failures taught more than the successes.

**World 5 generated 30 out of 30 and verified 0 out of 30.** Every beam level came back off disk as an ordinary "get the Key to the exit" puzzle with all its mirrors facing one way, and every one was unsolvable as written. The immediate cause was a serializer not writing two optional fields. The real cause is the part worth keeping:

> `win` was dropped in four separate places — the harvest sweep, the candidate builder, the accept step, and the CLI's renumbering pass — and the last of those reached disk. Each site looked obviously correct on its own.

I fixed three by hand and missed the fourth, which is of course the one that mattered. The fix was structural rather than another patch: a single `copyWith` that every rebuild goes through, because anything not named is carried. It was caught only because the verifier re-reads levels **from the file** rather than trusting the objects still in memory from the run that produced them.

**9.9 GB resident before a single level came out.** A wide 6×6 harvest was retaining every qualifying state instead of a sample; capping at 60 per depth band fixed it. Worth recording is that the diagnosis was wrong the first time. In the same edit I cut the visited-set ceiling from 400k to 250k, on the theory that the visited set was the problem. It did nothing for memory and starved the deepest buckets, which began abandoning layouts they should have mapped. That ceiling is back at 500k with a comment explaining the mistake, so nobody re-makes it — including me, six weeks later, which is [the failure mode of documentation nobody revisits](/lab/we-built-a-wiki-our-ai-agents-ignored-it).

**A tutorial that taught nothing.** Each world opens with a tiny hand-authored board that plays itself to demonstrate the new mechanic. The ice one was generated, verified, and useless: the solver's cheapest answer was to nudge the ice block up one square. Perfectly valid, and a worthless demonstration, because ice that travels one cell looks exactly like every other block. It needed a crystal above it to box in the short escape. A search takes the cheapest route to its objective rather than the one you designed — the same instinct that, at a far more serious scale, [put an evaluation agent inside somebody else's production infrastructure](/lab/nobody-escaped-the-sandbox-had-a-door).

## Why there is no server

Lumina has no backend. No accounts, no API, no database, no cloud save. Progress is three JSON blobs in `shared_preferences` on the device.

For this game that is the right call, and not only because it is cheaper. A single-player puzzle game with no leaderboard has **nothing to cheat against** — no score to validate, no rank to protect, and therefore no anti-cheat surface, no auth, and no class of exploit that exists at all. Levels are generated offline and committed as assets, so there is no generation latency at level load and no way for a bad deploy to make the game unplayable. The whole app works on a plane.

What it costs is worth naming. No cloud save means a lost phone is lost progress, and a new world is an app update. And the honest one: **there is no analytics either.** The event schema that would tell me whether the difficulty curve is right — level started, completed, moves taken, abandoned — is specified and not built. Every number in this article is about whether the generator did what it was told. Not one is evidence that what it was told was correct.

What replaces server-side validation is offline verification. `verify_levels.dart` re-reads every pack from disk, re-solves all 150 levels from scratch, and compares against the cached optimal count, which is never trusted on load:

```text
World 1 (Willow Hollow): 30/30 solvable · 30/30 optimal counts confirmed
  moves→levels  2:5 3:7 4:6 5:2 6:1 7:3 8:3 9:2 12:1
```

A count, not a status. A job that can fail silently and exits 0 has told you nothing. The histogram is there because a pack can be 30/30 solvable and still have a hole in its curve — World 2 currently jumps from six levels at four moves straight to five at eight, with nothing between, and that line is how I know.

## Verdict

The generator works. A full five-world regeneration takes about 35 minutes, is deterministic per seed — the seed goes in the commit message, so any pack is reproducible from git alone — and produces 150 levels that are provably solvable with provably reachable star thresholds, behind 337 tests.

The lesson worth carrying is that all three versions of this generator produced levels, and two produced *wrong* levels without ever failing. No crash, no exception, no empty output. The failures were visible only because every candidate is measured by an independent solver afterwards, and because the rejection counters are printed by reason rather than summed into a total. Generate-and-test is not the sophisticated approach to procedural generation. It is the only one where being wrong is detectable.

And the commercial footnote, since it would be strange to leave it out: Lumina went live on Google Play on 3 August 2026 and has earned **$0.03**. That is the first money this company has made, and it is not a joke about the game — the engine is fine and the puzzles are good. It is a number about distribution. The constraint was never the generator.

---

*All figures are first-party, taken from generation runs on a single development machine between 26 July and 4 August 2026, and from the rejection counters the generator prints per run. Candidate counts compare implementations of three different algorithms against the same difficulty buckets, not the same algorithm tuned three ways. Timings are wall-clock on one machine and should be read as ratios rather than absolutes. This is one game, one codebase, one author.*

## FAQ

### How do you generate puzzle levels that are always solvable?

Build the level in a state that is already solved and search outward from it, rather than placing blocks at random and testing afterwards. On an undirected move graph every state reachable from a solved arrangement can reach it back, so solvability becomes structural. In Lumina every layout starts with the Light Key already on the lantern.

### Why doesn't reversing a solved puzzle by N random moves give an N-move puzzle?

Because the state graph is undirected, so a random walk keeps undoing itself and N is only an upper bound on the true distance. On Lumina's first generator, 52% of 91,322 candidates finished with the key still sitting on the exit and another 47% landed below the target difficulty. Measure the distance with a search instead of assuming it from the step count.

### Should a puzzle game solver use BFS or A*?

Use breadth-first search whenever the solver's move count is used as a scoring threshold. A* or IDA* with an inadmissible heuristic returns a plausible but possibly too-high number, producing levels whose three-star rating is unreachable — a defect that never throws an error and that players cannot describe. A* is right only when the heuristic is provably admissible.

### How do you set star thresholds in a puzzle game?

Derive them from the solver, not from playtesting or a formula. Lumina awards three stars for matching the BFS-verified optimal, two for optimal plus two, and one for finishing; the plus-two band exists because the difference between eight and nine moves is usually a reordering the player would have to see the whole solution to find. Every cached optimal count is recomputed before release.

### How long does it take to generate a procedural puzzle level pack?

Lumina's 150 campaign levels take about 35 minutes to regenerate on a development laptop, and the 174-puzzle daily pool is a separate command so a tweak to one does not force the other to be re-searched. A single 6×6 difficulty bucket takes roughly 4.3 seconds with the multi-source sweep, against 62 seconds with the single-source version it replaced.

### Can you write a game engine in pure Dart without Flutter?

Yes, and where correctness matters it is worth enforcing as a rule. Lumina's engine directory imports neither Flutter nor [Flame](https://docs.flame-engine.org/), which is what lets the solver and generator run under `dart run` with no rendering stack anywhere near them.

### What is a multi-source breadth-first search?

It is an ordinary [breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) whose queue is seeded with several starting nodes at distance zero instead of one, so the depth it assigns each node is the distance to the *nearest* source. Lumina's sources are every winning arrangement on a layout — the set a single-source search wrongly assumes has one member.

## Sources

- [Rush Hour (puzzle)](https://en.wikipedia.org/wiki/Rush_Hour_(puzzle)) — Wikipedia
- [Procedural Generation of Sokoban Levels](https://ianparberry.com/pubs/GAMEON-NA_METH_03.pdf) — Joshua Taylor and Ian Parberry, University of North Texas
- [Solving Rush Hour, the Puzzle](https://www.michaelfogleman.com/rush/) — Michael Fogleman, July 2018
- [Writing a procedural puzzle generator](https://www.snellman.net/blog/archive/2019-05-14-procedural-puzzle-generator/) — Juho Snellman, May 2019
- [Procedural Level Generation with Difficulty Level Estimation for Puzzle Games](https://www.iccs-meeting.org/archive/iccs2021/papers/127460103.pdf) — ICCS 2021
- [Automatic Level Generation for Puzzle Games](https://abagames.github.io/joys-of-small-game-development-en/procedural/puzzle_level.html) — Joys of Small Game Development
- [Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) — Wikipedia
- [Flame engine documentation](https://docs.flame-engine.org/) — Flame
- [Dart language tour](https://dart.dev/language) — dart.dev
- [Shrink, obfuscate, and optimize your app](https://developer.android.com/build/shrink-code) — Android Developers
