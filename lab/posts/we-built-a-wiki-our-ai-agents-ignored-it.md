---
title: "We built our AI agents a wiki. They went straight to grep."
# The searchable title. Only <title>, the meta description and BlogPosting.headline use
# it — the h1, the OG card and the RSS item keep the title above.
seo_title: "Open Knowledge Format Review: Do AI Agents Actually Read Your Docs?"
excerpt: "27 days after adopting the Open Knowledge Format across our monorepo, I went looking for evidence it was working and found the opposite. What a preregistered study, 3,000 GitHub projects and one wrong document say about writing docs for machines."
date: 2026-07-31
tags:
  - AI
  - Documentation
  - OKF
  - Engineering
  - Research
# First-party figures the post states and shows its working for — see the measurement
# note at the end of the body. Word count, reading time and source count are NOT here:
# those are derived from the body at render time so they cannot go stale.
readouts:
  - label: concepts
    value: "31"
  - label: days
    value: "27"
---
On 3 July 2026 we adopted the [Open Knowledge Format](https://okf.md/) across our platform monorepo — a Chrome extension, a Next.js web app, a FastAPI backend and an in-product AI agent, all in one repository.

Twenty-seven days later we had 31 concepts across 2,604 lines, nine index files, and a change log carrying 65 dated entries. **47 of our 127 commits touched the bundle** — 37% of all engineering activity left a trace in it.

That last number is the kind of statistic that makes for a comfortable blog post. This is not going to be that post, because when I went looking for evidence the bundle was working, I found something that argued the opposite.

## TL;DR

- **Capable agents do not read your documentation index.** They infer a file path from the question and read it directly. A preregistered ablation on a 709-page wiki found the premise failed in the pilot, and our own agent behaved identically — `grep` and direct reads, index untouched.
- **Token cost still fell — by about a third** (30% protocol-constrained, 34% self-routing), with answer quality holding. The saving came from more targeted access, not from skipping the index.
- The biggest advertised saving, 58% under catalog-preload, is the one arm where **non-inferiority was not established**. Treat that number carefully.
- **Documentation rots silently.** 28.9% of the most popular GitHub projects currently carry at least one outdated code reference; 82.3% have at some point. Nearly half our own bundle — 14 of 31 concepts — had never been revised since the day it was written.
- **What pays for itself is provenance, not structure.** Code says what the system does; only a concept says why the choice was made. We are keeping our bundle and deleting about a third of it.

## What OKF actually is

OKF is a vendor-neutral specification [Google Cloud published in June 2026](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing). It is deliberately unambitious in the best way: a knowledge bundle is a directory of markdown files with YAML frontmatter. One concept per file. Exactly one required field — `type`. No SDK, no runtime, no compression scheme. It renders on GitHub and diffs in git.

The pitch is easy to like. Your codebase is large, an agent's context window is finite, so you write a compact curated index of what matters. The agent reads the index, follows links into the two or three concepts relevant to its task, and arrives at the code already oriented. Progressive disclosure: summaries first, detail on demand.

It is a clean story. It is also, on the best available evidence, mostly wrong.

## The study that upended the premise

In July 2026 Theodore Cochran published [*Progressive Disclosure for LLM-Maintained Wiki Knowledge Bases: a Preregistered Ablation*](https://arxiv.org/abs/2607.04576) — a preregistered study on a real 709-page markdown wiki. Four versions of the corpus differed **only** in how the agent reached the content; page bodies were byte-identical across arms, frozen as immutable git tags. Any measured difference had to come from access structure alone. 960 runs in total: 40 questions × 4 arms × 3 conditions × 2 replicates, answered by Claude Opus 4.8 and graded blind by a cross-family judge.

The pilot killed the hypothesis before the main run:

> A capable tool-using agent never loads the index, inferring a page's path from the question and reading it directly, so the specific saving the retrofit targets does not materialize.

The study pivoted from cost to answer quality. What it found:

- **Quality held.** The retrieval arm matched the index baseline at +0.01 on an 0–8 composite (95% CI −0.27 to +0.26), inside the preregistered margin of 0.5.
- **Cost fell everywhere.** About 30% for a protocol-constrained agent, 34% for a free self-routing agent, and 58% under catalog-preload. Every confidence interval excluded zero.
- **The saving came from targeting, not from skipping the index.** Pages cited per answer fell from 6.10 to 4.22; tool turns from 4.98 to 4.45.

Because the study was preregistered, the null result on the main hypothesis is reported rather than buried. That is exactly why it is worth taking seriously.

### Two caveats worth stating plainly

The paper is more honest about its own weaknesses than most summaries of it are, and both caveats cut against the headline.

**The cheapest arm is the one that failed the quality test.** Non-inferiority held robustly under self-routing, but under forced catalog-preload — the 58% saving, the biggest number in the paper — the point estimate actually favoured the baseline (−0.39) and non-inferiority was *not* established. So "quality held while cost fell up to 58%" is not quite right. The deepest discount came with a quality signal pointing the wrong way.

**Human grading missed its own bar.** Inter-rater agreement came in at Cohen's κ = 0.23 against a preregistered target of 0.60. The author reports this and backs the quality conclusions with sensitivity analyses instead of re-grading. That is the right thing to do, but it means the quality findings rest on a judge model plus sensitivity checks more than on human agreement.

It is also one corpus, one model, one question author. Treat it as a strong signal, not a settled law.

## Our agent did exactly the same thing

Here is the uncomfortable part. This article exists because we ran a month of real feature work — bug fixes across enrichment providers, an auth lockout, a chart rendering fault, an analytics integration — with an AI agent doing much of the implementation.

I asked the agent working in our repo how it had actually navigated. The answer: `grep` and direct file reads. It did not start at the index and walk the links. It inferred where to look from the question, exactly as Cochran describes, and consulted concepts *afterwards* to confirm intent rather than beforehand to orient.

We built a front door. The agent climbed in through the window, and got where it was going just as fast. That is the same instinct, at a harmless scale, that [put an OpenAI evaluation agent inside Hugging Face's production infrastructure](/lab/nobody-escaped-the-sandbox-had-a-door): give a model an objective and it takes the cheapest route to it, not the route you designed.

This should have been less surprising than it was. The tools already voted on this question. Claude Code, Cursor, Cline and Sourcegraph's agent [dropped vector-database indexing in favour of agentic search](https://vadim.blog/claude-code-no-indexing/) — glob, grep, read — because it retrieved code better and left no index to keep in sync. An Amazon Science paper in February 2026 found keyword search via agentic tool use reached over 90% of RAG-level performance with no vector store at all. We wrote a retrieval layer for agents that had already decided they preferred to search.

## What our own numbers say

If the index is not doing the work, what is the bundle costing and returning?

- **31 concepts, 2,604 lines**
- **47 of 127 commits** touched the bundle (37%)
- **14 of 31 concepts never updated since the day they were seeded (45%)**
- **87 code commits** beneath the stalest concept, which was never revised
- **5,586 lines of documentation against 53,456 lines of code (10.4%)**

Read the bottom three together and the picture is unflattering.

Nearly half the bundle has not been touched since it was created. Our architecture concept — the one a newcomer would most reasonably trust — sits on 87 commits of code churn and zero revisions.

Some of that is fine. Our MongoDB integration concept has had no commits beneath it since it was written; a stable area with a stable document is a document doing its job. The problem is that **a reader cannot tell "stable and correct" from "abandoned and wrong" by looking.** Both render identically.

And the maintenance is not free. We wrote one line of documentation for every ten lines of product code. That is the tax. Whether it is worth paying is the actual question, and it deserves a straight answer rather than an enthusiastic one.

## The incident that reframed this for me

Midway through the month the agent was tracing an asynchronous contact-enrichment flow — two vendors, one leading for phone lookups and the other for email, results settling later via webhook.

It read our integration concept for the secondary provider. The concept described a particular route as the webhook callback the vendor invokes.

**That was wrong.** The route it named was the *status-polling* endpoint our own clients call. The actual webhook was a different path entirely.

Had the agent trusted the document, it would have mis-modelled the whole settlement flow while chasing a bug that lived precisely there. It didn't — it read the code, found the truth, and corrected the concept. But that outcome depended on the agent distrusting our documentation, which is a strange property to build a system on.

> A confidently wrong concept is worse than no concept at all. Missing documentation makes a reader go and look. Wrong documentation stops them looking.

## The literature agrees, and is worth quoting correctly

The best data I found on this is a study of [outdated code-element references in repository documentation](https://arxiv.org/abs/2212.01479), which analysed the full history of more than 3,000 GitHub projects. It found that **28.9% of the most popular projects on GitHub currently contain at least one outdated reference, and 82.3% had at least one at some point in their history.** Those references were typically outdated *for years* before a maintainer noticed.

The same paper puts the mechanism better than I can: documentation goes stale **silently**. There are no crashes and no error messages to tell you it has stopped being true. Related work it cites finds up-to-dateness problems account for 39% of documentation content issues, and that more than two-thirds of surveyed developers believe their own system documentation is outdated.

One correction while I am here, because I nearly published it wrong myself. A widely circulated pair of figures — roughly 47% extra maintenance effort and 48% extra cost from documentation debt — gets attributed to that outdated-references paper. It isn't theirs. It is Mendes et al. (2016), cited *inside* it, and it measures **requirements** documentation debt against project effort estimates, not stale code references in a repo. The numbers are real; the label usually stuck on them is not. If you have seen that stat in a slide deck about AI documentation, it was not measuring what the slide said it was.

## So what is actually paying for itself

If the index is bypassed and half the bundle is drifting, why have we kept it?

Because the part that pays is not the part we expected. It is not structure. It is **provenance of decisions**.

Code tells you *what* the system does. A test tells you *what must remain true*. Neither tells you *why the choice was made* — and that is exactly what evaporates when the person who made it moves on.

Three concrete cases from one month:

**A helper that already existed.** An agent hit a bug where a server-side redirect resolved to the container's internal bind address instead of the public hostname, sending the user to an unreachable URL. The concept recorded that this exact class of bug had bitten once before, in a different route, and that a shared helper had been written for it. The agent reused the helper. Without that note, the likely outcome is a near-duplicate utility and the same bug surviving in a third place.

**A routing decision no code expresses.** Our enrichment waterfall sends phone lookups to one vendor first and email to another. That ordering came from a benchmark. You cannot recover "we measured this and one won on phone" from an `if` statement — the code shows the branch, never the evidence.

The clearest example of this we have written since is in another repo entirely: our puzzle game's [level generator carries the candidate counts that killed two earlier algorithms](/lab/puzzle-generator-random-walk-doesnt-work) in the doc comment above the function that replaced them. The surviving code is unremarkable. The 91,322 candidates it took to rule out the obvious approach are recoverable from nowhere else.

**Writing it down forced precision.** This is the one I did not anticipate. The bundle earns more as a *write* target than a *read* source. Composing a change-log entry forces you to state a root cause in one paragraph, and that constraint catches sloppy thinking. Two bugs this month were only properly understood at the moment someone tried to write them down: a MongoDB write that failed because the same field appeared in both `$set` and `$setOnInsert`, and a chart that vanished on hover because a colour was emitted in a CSS syntax the rendering library's own parser could not read. In both cases the act of explaining produced the diagnosis.

That third effect has nothing to do with AI. It is rubber-duck debugging with a commit hash, and it accrues to humans and agents equally.

## What we are changing

**Write why, not what.** The concepts that stayed accurate record decisions and trade-offs. The ones that rotted mirrored code structure — because code structure is exactly what changes. If a concept can be regenerated by reading the source, it should not be a concept.

**Prune, don't sweep.** Fourteen unmaintained concepts is not an asset. But an update sweep produces a burst of low-conviction edits that make everything *look* fresh without anyone verifying anything. For each stale concept the test is: would I regenerate this from the code in five minutes? If yes, delete it. My guess is a third go.

**Make staleness visible in CI.** We already run a bundle validator. It checks conformance — frontmatter present, links resolve — not truth. Conformance passes happily on a document that has been wrong for three weeks. A warning when code under an area changes and the concept's timestamp doesn't would turn an invisible problem into a review comment. Soft warning, not a hard gate: a hard gate just teaches people to bump timestamps without reading.

**Put concepts in front of the PR reviewer.** The highest-value idea we have not yet shipped. The point is not summarising the diff — it is catching contradictions: *this change makes email unlock synchronous, but the concept documents it as webhook-settled.* It also creates the feedback loop that keeps concepts honest, because a wrong concept starts generating false review comments until someone fixes it.

## If you are considering OKF

Three things I would want to know before adopting it, none of which are reasons not to.

**The spec has already moved, and it moved toward this exact problem.** We are still on v0.1; [v0.2 landed with trust signals](https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals) — `generated` and `verified` actor fields producing a trust tier, a `status` lifecycle, and `stale_after` as an absolute re-verification date. That is a direct answer to the "you cannot tell stable from abandoned" problem I hit. Worth noting the upgrade is additive and backward-compatible — a v0.1 bundle drops in unchanged — so this is a real improvement available cheaply, not a migration crisis.

**"Open" is doing some work in the name.** OKF has no standards-body home. Google wrote it, Google controls the roadmap. The licence is open; the governance is not, yet. That is a reasonable risk for a format whose whole value proposition is that it is just markdown in a git repo — the exit cost is close to zero — but it is worth going in with clear eyes.

**Do not auto-generate concepts from code.** It is the obvious idea and it is precisely the failure mode above. Anything derivable from the source will drift from the source and tell you nothing that reading the source wouldn't. The bundle's value is exactly the part a generator cannot produce.

## Verdict

Keep it — narrowed considerably.

The intuitive case, that agents need an index to find their way, does not survive contact with the evidence. Cochran's ablation says capable agents route themselves; our agent did exactly that; the major coding tools removed their own vector indexes for the same reason. If you are adopting OKF because you believe your AI cannot navigate your repository without a map, you will be disappointed.

The case that survives is narrower and more durable. Cost fell by a third under realistic self-routing conditions with quality intact — real savings, from more targeted access. And beyond token economics there is the thing no retrieval system can synthesise: the reasoning behind a decision, which exists nowhere in the artefact it produced.

A knowledge bundle is not a compressed copy of your codebase. Treated as one it will drift, and the drift will eventually cost more than the document ever saved. Treated as the record of decisions your code cannot express, it earns its 10%.

We are keeping ours. We are also going to delete about a third of it.

---

*Repository metrics were measured directly from our monorepo over 2026-07-03 to 2026-07-30. Vendor names, ticket identifiers and customer details are omitted; all figures are unmodified. This is one team, one repo, 27 days — first-party evidence, not a controlled study, and it should be weighted accordingly.*

## FAQ

### Do AI coding agents actually read a documentation index?

Mostly not. Cochran's preregistered ablation found that a capable tool-using agent never loads the index — it infers a page's path from the question and reads it directly — which killed the study's main hypothesis in the pilot. Our own agent, asked how it had navigated a month of real feature work, said the same thing: `grep` and direct file reads, with concepts consulted afterwards to confirm intent rather than beforehand to orient.

### What is the Open Knowledge Format?

OKF is a vendor-neutral documentation specification Google Cloud published in June 2026. A knowledge bundle is just a directory of markdown files with YAML frontmatter, one concept per file, with exactly one required field — `type`. There is no SDK, no runtime and no compression scheme; it renders on GitHub and diffs in git. Version 0.2 added trust signals: `generated`/`verified` actor fields, a `status` lifecycle, and `stale_after` re-verification dates.

### Does OKF actually reduce token cost?

Yes, by roughly a third under realistic conditions — about 30% for a protocol-constrained agent and 34% for a free self-routing one, with every confidence interval excluding zero and answer quality holding. The saving comes from targeting: pages cited per answer fell from 6.10 to 4.22. The headline 58% figure, measured under forced catalog-preload, is the one arm where the quality point estimate favoured the baseline and non-inferiority was not established.

### How fast does documentation go stale?

Faster than anyone notices, because it fails silently. A study of more than 3,000 GitHub projects found 28.9% of the most popular ones currently contain at least one outdated code-element reference, and 82.3% had one at some point — typically outdated for years before a maintainer spotted it. In our own bundle, 14 of 31 concepts had never been revised since the day they were seeded, and the stalest sat on 87 commits of code churn.

### Should you auto-generate knowledge concepts from your code?

No. Anything derivable from the source will drift from the source and tell a reader nothing that reading the source would not. It is the obvious idea and it is exactly the failure mode: a confidently wrong concept is worse than no concept, because missing documentation makes a reader go and look while wrong documentation stops them looking.

### Is OKF worth adopting?

Yes, if you adopt it for the right reason. If you are adopting it because you believe your AI cannot navigate your repository without a map, the evidence says you will be disappointed. What survives is narrower: a third off token cost, and a record of the decisions your code cannot express — the benchmark behind a routing choice, the bug that justified a shared helper. Note also that OKF has no standards-body home; Google wrote it and controls the roadmap.

## Sources

- [Open Knowledge Format](https://okf.md/) — specification homepage
- [How the Open Knowledge Format can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) — Google Cloud Blog, June 2026
- [OKF v0.2 adds trust signals](https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals) — Google Cloud Blog
- [OKF SPEC.md](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) — GoogleCloudPlatform/knowledge-catalog
- Cochran, T.O. (2026), [*Progressive Disclosure for LLM-Maintained Wiki Knowledge Bases: a Preregistered Ablation*](https://arxiv.org/abs/2607.04576), arXiv:2607.04576
- [Detecting Outdated Code Element References in Software Repository Documentation](https://arxiv.org/abs/2212.01479), arXiv:2212.01479
- [Claude Code doesn't index your codebase — here's what it does instead](https://vadim.blog/claude-code-no-indexing/)
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic
- [Google's Open Knowledge Format and the problems it deliberately doesn't solve](https://wiki.totto.org/blog/2026/06/17/googles-open-knowledge-format-and-the-problems-it-deliberately-doesnt-solve/) — Thor Henning Hetland
