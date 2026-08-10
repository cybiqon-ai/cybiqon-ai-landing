# Update Log

## 2026-08-10

* **Content**: fourth `/lab` post — `puzzle-generator-random-walk-doesnt-work`, on the
  level generator in `products/lumina`. First post in the section that is not AI
  commentary, and the first with diagrams.

  **Inline SVG works, with one rule.** `publish_lab.py::render_html` does not sanitise
  HTML, so raw SVG reaches D1 intact — but only when wrapped in a `<figure>`. Verified
  against the real extension set (`extra, codehilite, sane_lists, smarty, toc`): a bare
  top-level `<svg>` is parsed as an inline span, which wraps it in a `<p>` **and runs
  emphasis parsing over its `<text>` contents**, so `*x*` inside a label becomes `<em>`.
  Inside `<figure>` the block passes through untouched. Diagrams use `currentColor` only,
  because `/lab` has a light theme and a hardcoded colour breaks one of the two.

  `.lab-prose figcaption` was already styled and previously unused. `countWords` strips
  `<pre>` but not `<svg>`, so diagram labels count toward word count and reading time —
  keep them terse.

  Reciprocal internal link added to `we-built-a-wiki-our-ai-agents-ignored-it`, which
  therefore needs republishing with `--no-touch` so its `updated_at` does not move.

* **Feature**: `llms.txt` is generated. `scripts/build-llms-txt.mjs` emits it from
  `lab/posts/` frontmatter plus a new tracked `data/llms.config.json`, chained into
  `npm run build`; `public/llms.txt` moves to the gitignored/derived side alongside
  `llms-full.txt`. `parseFrontmatter` was extracted to `scripts/lib/frontmatter.mjs` so
  both generators share one parser. **6 of ~110 URLs → 29 links, all 32 routes covered.**

  **Enforcement, both layers proven to fail before being trusted.** A `pre-push` hook in
  this repo (installed by `ops/scripts/install-hooks.sh`, since hooks are not tracked)
  hard-blocks; the tree's **first-ever Claude Code hook** warns earlier and advisorily.
  Advisory on purpose: it cannot know which of the tree's eleven repos a `git push` is
  aimed at, so blocking there could fail a MeFlow push over a landing-site route. Both
  were verified by adding a stray route and watching them fire — note that a probe named
  `__probe` proves nothing, because Next treats `_`-prefixed directories as private
  non-routes and the checker correctly skips them.

  **The pass found the file was lying.** Its "Notes for agents" paragraph cited a
  `Content-Signal` directive in robots.txt; the live robots.txt has no such line and no
  training-crawler `Disallow`, confirmed as GPTBot, CCBot and a browser UA. It also
  claimed `BlogPosting`/`FAQPage` schema while listing `/blog`, whose posts carry plain
  `Article` with Organization authorship. Both corrected. See
  [SEO](/site/seo.md) for the correction and the 10 Aug AEO audit it prompted.

* **Tooling**: installed [Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill)
  (MIT, 89 scripts, 16 sub-skills) as a user-global Claude skill at
  `~/.claude/skills/seo`, wrapped by `ops/scripts/seo.sh`. Standing rule added to this
  repo's `CLAUDE.md`: run it against the live URL after every content change.

  **Reviewed before installing**, since a skill runs with full tool access on a machine
  holding Cloudflare tokens and an upload keystore. No telemetry, no credential access,
  no `eval`/`exec` of remote content; `subprocess` only shells out to `gh` and
  Lighthouse; outbound hosts are Google/Bing/Yandex/GitHub APIs and schema.org; its
  `safe_http` helper blocks private, loopback and link-local IPs.

  Two operational traps, both handled by the wrapper. Ubuntu 24.04 marks the system
  Python externally managed (PEP 668), so deps live in a uv venv — a plain
  `python3 scripts/foo.py` fails and looks like a broken skill. And `env_loader.py` reads
  `.env` from the **current working directory**, so running these scripts inside
  `tools/social-media-manager` would load the live Cloudflare token into `os.environ`;
  the wrapper pins an inert working directory so that cannot happen by accident.

  ⚠️ **Two of its five first-run findings were factually wrong, so they were fixed rather
  than memorised.** `ops/scripts/seo-skill-patch.py` applies 17 idempotent edits:

  * *Author* never checked `meta name=author`, `article:author` or JSON-LD — only class
    and `rel` attributes. *Publish date* searched `{"name": "article:published_time"}`
    when OpenGraph emits `property=`, so that selector could never match. Both now
    resolve on this repo's pages.
  * *Keyword extraction* returned "one" → *oneplus, onedrive*; missing filler words. Now
    returns "breadth first search".
  * *FAQ guidance* was frozen at the Aug 2023 restriction in **eight** places. Google
    removed FAQ rich results for **all** sites on 7 May 2026, including government and
    health — but `FAQPage` markup is not deprecated and may stay. The old text told us to
    delete working markup that still feeds answer engines. Ours stays.

  ⚠️ **A reinstall reverts the patch and deletes the venv.** `seo.sh` rebuilds the venv
  and warns when unpatched; the patch is re-run by hand. `--check` exits non-zero, and
  reports `missing` when an upstream edit has moved an anchor — which means that
  particular fix is silently *not* in effect.

  Two of the patch's own bugs were found only by testing it, not by reading it: a
  marker-based "already applied" test silently skipped the one edit whose replacement was
  a substring of the original, and an over-eager stop-word list turned "breadth-first
  search" into "breadth search". Both are recorded in the script's header.

  **Sent upstream** as two PRs against `Bhanunamikaze/Agentic-SEO-Skill`, since the
  detector bugs affect every site using standard OpenGraph, not just this one:

  * [#35](https://github.com/Bhanunamikaze/Agentic-SEO-Skill/pull/35) — author and
    publish-date detection, with a regression test whose four failing cases fail against
    the current extractor.
  * [#36](https://github.com/Bhanunamikaze/Agentic-SEO-Skill/pull/36) — the FAQ guidance
    refresh across eight files.

  The stop-word change was deliberately **not** sent: "one" as a stop word is a judgement
  call rather than a bug, and it would have muddied two clean fixes. It stays local.

  ⚠️ **When either PR merges, trim `seo-skill-patch.py`.** Its `--check` will start
  reporting `missing` for the merged anchors — which is the correct signal, not a
  failure. If both merge, only the stop-word edit should remain.

* **Revision** (`puzzle-generator-random-walk-doesnt-work`): on-page SEO pass after an
  outside review. Four changes: `seo_title` drops "Reverse" (71 → 63 chars — "random
  walk" is the searched phrase, "reverse random walk" is not); `excerpt` front-loaded so
  the first 155 characters, which is all Google shows, state the finding instead of
  spending the whole budget on candidate counts; four narrative H2s gained the query
  terms they were missing; and the article now links to `/products/lumina`, which it
  never did despite being entirely about that product.

  **The H2s were the real gap and the review misdiagnosed it.** It flagged the H1 and
  recommended swapping it for the `seo_title`. Declined — that would undo the deliberate
  `title`/`seo_title` split documented in `lab/posts/README.md`, break the pattern all
  four posts follow, and cost the section its voice. Measured instead: **not one of the
  fourteen H2s contained a query term.** Headings are a ranking signal the split does not
  cover, so fixing them addresses the same concern without the cost. Body term coverage
  was already fine (`solvable` ×12, `breadth-first` ×10, `bfs` ×7).

  Also declined: a "What you'll learn" box (`## TL;DR` already does this and is the
  section convention — both would be redundant), and an invented author bio.

  Three of the review's recommendations were **already implemented** and it did not
  check: the meta description, the FAQ as real `h2`/`h3` with derived `FAQPage` JSON-LD,
  and the byline linking to `/lab/about` with `Person` JSON-LD.

* **Audit**: AEO findings recorded in [SEO](/site/seo.md), eight items, every one checked
  against the live site. Two contradict what this bundle previously said — the missing
  managed robots.txt block, and **9 of 15 top pages emitting no `og:image` at all** where
  the bundle claimed they shared `/logo.png`. Findings only; nothing fixed except the
  false `llms.txt` claims, which could not be left shipping.

## 2026-08-06

* **Feature**: agent-readable markdown for `/lab`. `/md/lab/<slug>.md` per post plus
  `/llms-full.txt` for all of them, generated by `scripts/build-agent-markdown.mjs` and
  wired into `npm run build` so they cannot drift from `lab/posts/`.

  Prompted by Cloudflare's AI Diagnostics panel — its "Markdown Negotiation" item. The
  markdown is **19% of the HTML**: 28 KB against 151 KB for the sandbox post, same prose,
  headings and FAQ intact. Discovery via `alternates.types` in `generateMetadata`,
  `llms.txt`, and the sitemap.

  **Cost: 190 Worker bytes** — one `alternates` line. The 160 KB of markdown are static
  assets and do not count against the 3 MiB ceiling. Headroom unchanged at 182 KiB. True
  `Accept:` negotiation would have needed a route handler at ~100 KiB of that budget,
  which is the entire reason this is files.

  **Three things established by probe, and each contradicted the obvious guess.**

  1. `/lab/<slug>.md` — the conventional shape — **404s**. It matches the `/lab/[slug]`
     edge route, which looks up a post whose slug ends in `.md`. Hence the `/md/` prefix.
  2. `public/_headers` **only affects static assets.** A `Link:` header rule on `/lab/*`
     never reached the response while `/md/lab/*` `Content-Type` rules applied. The
     `/lab/*` block was written, tested, found dead, and removed — Cloudflare's "Link
     Headers" diagnostic asks for something this file cannot do for a Function route.
  3. `next-on-pages` **preserves** `public/_headers`, appending its immutable block
     between `START/END AUTOGENERATED` markers.

  Testing note that cost a false negative: `wrangler pages dev` serves from an asset
  manifest compiled at build time, so a file dropped into `.vercel/output/static` after
  boot 404s. Rebuild instead of debugging a phantom routing bug.

  On the rest of that diagnostics panel: **5 of 21 items is the right score for this
  site.** API Catalog and Auth.md describe an API and a login that do not exist; all of
  Level 3 (OAuth, A2A, MCP server card, WebMCP, DNS-AID) turns a web *application* into
  something agents operate, and this is a brochure site with a blog; Commerce needs
  inventory and a checkout. Deliberately not built — see ground rule 1.

* **Correction**: the AI Crawl Control crawlers table disproves the diagnosis recorded
  earlier today. `ChatGPT-User`: **132 allowed, 8 unsuccessful**. Cloudflare was not
  blocking it, so "the WAF half of AI Crawl Control blocked the fetch" was wrong — it was
  inferred from the managed robots.txt being enabled and never evidenced. **Why ChatGPT
  would not read the post is unknown.** Two threads: the 8 unsuccessful `ChatGPT-User`
  requests, and `Claude-SearchBot` at 0 allowed / 15 unsuccessful — the only consistent
  refusal in the table.

  The same table shows something more useful: **the managed robots.txt is being ignored.**
  Amazonbot 62, ClaudeBot 42, GPTBot 39, CCBot 4 allowed requests, every one of them
  against a `Disallow: /`. The file is a reservation of rights under EU DSM Article 4 with
  no enforcement behind it. Blocking the training crawlers at the WAF is the action that
  actually does something; the allow side needed no change, because nothing was blocked.

  Lesson worth keeping: this is the second confident answer to the same question. Read the
  crawlers table before offering a third.

* **Feature**: SEO and answer-engine optimisation for `/lab`. Migration `0007`,
  three markdown posts, five routes, no new route.

  Prompted by `analysis.md`, an outside critique of the sandbox post scoring it 9.5 on
  writing and **6.5 on SEO / 7 on AI Overview / 5 on conversion**, and by a pasted link
  failing to load in ChatGPT.

  ⚠️ **The ChatGPT failure was not a rendering problem** — `/lab/[slug]` is a server
  component that ships the full body in the first response, measured live: 118 KB of HTML,
  ~21.5 K visible characters, 137 ms TTFB, valid `BlogPosting` + `BreadcrumbList`. This
  entry originally went on to blame the Cloudflare WAF; **see the correction at the top of
  this section, which disproves that.** The cause is unknown. Nothing in this feature
  entry depended on the diagnosis being right — it is the work that makes a page citable
  once an engine reaches it, which is worth doing either way.

  `0007` adds `seo_title` and `updated_at`, both nullable with a meaningful NULL. The
  first splits the title that is read from the title that is searched: "Nobody escaped.
  The sandbox had a door." stays the h1, the OG card and the RSS item, while
  `<title>`, the meta description and `BlogPosting.headline` carry a string somebody
  might type. `updated_at` is set by `publish_lab.py` on the `DO UPDATE` branch only, and
  `dateModified` is **omitted when it is NULL** rather than defaulted to `datePublished`
  — a post published once has not been edited, and this is the section whose premise is
  that published numbers are real. `--no-touch` suppresses the bump for a typo fix.

  TL;DR and FAQ blocks were added to all three posts and are **derived, not stored**:
  `lib/lab.ts::extractFAQ` reads the `## FAQ` section back out of the rendered HTML and
  emits `FAQPage` JSON-LD from it, the same reasoning as the measurement rail. 19
  questions across three posts, verified end-to-end by rendering each post through the
  real publisher and running the real extractor over the output.

  **Two defects that verification caught and inspection would not have.** `### Sources`
  under an `##` heading was swallowed into the FAQ section, producing three entries where
  two were correct — Sources is now `## Sources` in every post and the constraint is
  documented in `lab/posts/README.md`. And `htmlToText` originally left HTML entities
  alone: an HTML parser does not decode entities inside a `<script>` element, so every
  `&rsquo;` from the publisher's `smarty` extension would have reached Google as seven
  literal characters in the middle of a question.

  Also: `citation` (every distinct external URL a post links to — 21 on the sandbox
  post, previously invisible to structured data), `about`/`articleSection` from tags,
  `alternativeHeadline`, `blogPost` entries on `/lab`'s `Blog` node, related posts ranked
  by shared tags, tags as links to `?tag=` (`noindex, follow`, canonical `/lab` — a
  crawl path without a thin archive), `content:encoded` full text in `/lab/rss.xml`,
  a LinkedIn action on `LabCTA`, per-bot allow groups in `app/robots.ts`, and
  `public/llms.txt`.

  `llms.txt` is recorded here as **not** a traffic lever: measured studies find ~97% of
  such files receive zero requests. It is a static asset that costs no Worker bytes,
  which is the only reason it is worth having.

  **Worker: 2 959 426 bytes gzipped — 2.82 MiB, 182 KiB of headroom.** The whole pass
  cost ~3 KiB because it added no routes. This also settles a contradiction: `lab.md`
  said `~90 KiB` and this log said `174 KiB`; both are dead, 182 KiB is measured.

* **Migration**: `0007` applied to remote D1, and all three lab posts republished.
  **The site code is not deployed yet** — this is the required order, since the reading
  code selects `seo_title`/`updated_at` and every `/lab` page 404s without them.

  Live state after: 90 rows, all NULL on both new columns except the three lab rows,
  which now carry a `seo_title` and an `updated_at` of 2026-08-06. `created_at` was
  preserved on all three. **Zero MSME rows were touched** — verified by query, not by
  trusting the `WHERE section = 'lab'` clause.

  Until the deploy lands, the live pages render TL;DR and FAQ as ordinary prose sections
  and carry no `FAQPage` — checked, and harmless. The old code ignores the new columns.

* **Correction**: `0005_lab_views.sql` and `0006_subscribers.sql` both said **"NOT YET
  APPLIED"** in their headers and both had in fact shipped — `views` is a live column and
  `subscribers` is a live table with 0 rows. Headers corrected.

  This repo has no migration runner, so that header is the only record a migration ran.
  Two of three were wrong, which means the convention was not being followed rather than
  that it failed once. Worth reading the live schema, not the header, before assuming.

## 2026-08-01

* **Removal**: dead code audit. 21 files and 5 npm packages, no behaviour change.

  9 unused shadcn components (`dialog`, `separator`, `sheet`, `skeleton`, `toast`,
  `toaster`, `toggle`, `tooltip`, `use-toast`) plus `hooks/use-toast.ts` and
  `hooks/use-mobile.tsx`; `features/` (4 files); `components/HeroSocialProof.tsx`;
  `AUDIT.md`; `blog_implementation_plan.md`; `public/placeholder.svg`. Dropped
  `@radix-ui/react-{dialog,separator,toast,toggle,tooltip}`. `README.md` was rewritten
  rather than deleted — this is the public repo, and one with no README reads as
  abandoned.

  **Two near-misses worth recording, because the naive scan was wrong twice.**
  `components/ui/label.tsx` looked dead but is reached through `form.tsx`; a
  scan that ignores intra-directory imports will delete it. And
  `components/AnimatedBackground.tsx` / `HeroDashboardMockup.tsx` looked dead to a grep
  for `@/components/X` because `Hero.tsx` imports them **relatively**. The reliable
  method is transitive reachability from the route files, and even that flagged
  `lib/image-loader.ts`, which is wired through `next.config.mjs` rather than imported.
  `hooks/` was missed entirely on the first pass and only surfaced because the build
  failed — the deleted `toast.tsx` was still imported there.

  **This bought no Worker headroom, and that is the point worth remembering.** Unimported
  files are never bundled; verified by grepping the built worker for `DialogOverlay`,
  `SheetContent`, `Skeleton` and `ToastProvider` (zero hits each). The headroom win
  earlier today came from a different kind of dead: `TooltipProvider` and `<Toaster />`
  were imported *by the root layout*, so they shipped in all twelve edge routes. Dead
  code in `app/layout.tsx` costs twelve times; a dead file costs nothing but confusion.

  Left alone deliberately: `public/app-ads.txt` (AdMob authorisation, served by path and
  therefore invisible to an import scan), `favicon.ico`, and the Postiz stack — that one
  is a decision, not a cleanup, and it is already backlog D12.

* **Creation** ([lab](/content/lab.md), [lead capture](/content/lead-capture.md)): an
  email list for /lab, double opt-in, at `/api/subscribe`. This closes the gap this
  bundle has flagged since it was written — 80+ posts and no email capture anywhere.

  It reuses `lib/leads.ts` entirely: IP hashing, the shared `rate_limit_hits` table under
  a new `subscribe` scope (no schema change — the table already has the column), and the
  same Resend sender that already works for the audit form, so no new deliverability
  setup was needed.

  Two behaviours that are deliberate and easy to "fix" by mistake. **Every POST answers
  identically**, including for an address already confirmed — anything else makes the
  endpoint an oracle for "is this person on the list". And **only a `pending` row can be
  confirmed**, so replaying an old confirmation link after someone unsubscribes cannot
  put them back on the list. Both are tested.

* **Removal** ([routes](/site/routes.md)): `GET /api/blog` and `GET /api/blog/[slug]`.
  They returned posts as JSON; nothing in any repo in the tree called them, and the
  nightly publisher writes straight to the D1 REST API rather than through the site. They
  bought the ~200 KiB of Worker budget `/api/subscribe` needed. Net effect of this
  session: **2.83 MiB, 174 KiB headroom** — more than before the view counter was added.

  Worth being explicit that this is a one-way door of sorts: if some outside integration
  turns out to depend on them, restoring one costs ~100 KiB and something else has to go.

* **Creation** ([lab](/content/lab.md)): a view counter and a share row on /lab posts.

  Views are counted by a browser beacon (`/api/lab/view`, once per session) rather than
  during the page render. Rendering is a GET — incrementing there would have needed no
  new route but would have counted crawlers, RSS fetchers and Next `<Link>` prefetches,
  and a rail that says "views" should mean people. Stored on `blog_posts.views`
  (migration `0005`) so it comes back in the SELECT the page already runs. Omitted from
  the rail at zero, and rendered last: everything above it is a property of the writing,
  this one is a property of its audience.

  The endpoint is scoped `AND section = 'lab'` — without it, a public write path into the
  MSME blog's rows.

  Cost: ~100 KiB of Worker headroom, leaving **~90 KiB**. Not enough for another route of
  any kind. If more is ever needed, `/api/blog` and `/api/blog/[slug]` are ~200 KiB and
  nothing on this site consumes them — but they are a public API, so removing them is a
  decision rather than a cleanup.

* **Broke the deploy, then fixed it** — adding /lab's three edge routes pushed the Pages
  Worker to **3.36 MiB gzipped** against Cloudflare's **3 MiB** free-plan ceiling. The
  limit is enforced **at upload, not at build**: `npx @cloudflare/next-on-pages` reported
  success locally and the deploy failed afterwards with *"Your Worker exceeded the size
  limit of 3 MiB"*. Assets published, the Function did not, so the previous deployment
  kept serving and there was no outage.

  This is the second time this repo has been bitten by "the local build is not the
  deploy" — PR #33 was the first. Now measured: gzip every `.js` under
  `.vercel/output/static/_worker.js/` and total it. Each React edge route is ~440 KiB
  gzipped, so the site affords about six.

  Two fixes, both worth keeping: `/lab/about` is now static (it has no dynamic data, and
  the cookie-based theme was the only thing forcing the segment dynamic), and
  `TooltipProvider` + the radix `<Toaster />` are gone from the root layout — neither was
  used anywhere, and a dead provider there is paid for by every edge route. Now 2.81 MiB
  with ~190 KiB of headroom, which is less than half a route: **measure before adding
  another.**

  The theme moved to a `data-lab-theme` attribute on `<html>` in the process. React does
  not reconcile attributes it never rendered, so it survives hydration where a class did
  not — and it needs no server input, which is what lets /lab/about prerender.

* **Creation** ([lab](/content/lab.md)): `/lab`, a second blog — hand-written engineering
  notes, sharing `blog_posts` with the automated MSME blog via a new `section` column
  (migration `0004`, applied to remote D1; all 81 existing rows took the `'msme'`
  default). Two posts migrated from `itspyguru.github.io`, which now serves stubs
  canonicalised to `cybiqon.in/lab` and drops them from its own sitemap.

  **The section split is the part that can bite.** Slugs are unique table-wide, not per
  section, so an unscoped read serves a lab post from `/blog/<slug>` in marketing chrome.
  `getPagedPosts`, `getTagIndex` and `getPostBySlug` take `section` as a **required**
  argument — a default would have made the leak the quiet option.

  Two scopings outside this repo mattered more than any inside it:

  `ops/scripts/collect_metrics.py::blog_metrics()` — unscoped, publishing one lab post by
  hand would refresh `last_at` and silence the *"No blog post in Nh — publish pipeline
  may be down"* warning for 30 hours. That warning exists because the funnel died for 33
  nights and nobody was told; a false all-clear from the *other* blog is the same bug
  wearing a new coat.

  `tools/social-media-manager` — `content-clusters.md` and `orchestrator.md` now filter
  cluster membership on `section = 'msme'`. Step 8's reciprocal-backlink pass runs
  `UPDATE blog_posts SET content = ?`, and lab posts carry tags (`AI`, `Automation`) that
  match several pillars' keyword signals. Without the filter the nightly agent could
  rewrite hand-written prose to insert an MSME link.

* **Decision** ([design system](/site/design-system.md)): `/lab` gets a full palette,
  which Ledger was denied. Not a reversal — Ledger failed because it recoloured pages
  *still sitting behind the marketing navbar*, so the temperature flipped mid-header.
  `/lab` renders no marketing chrome at all, so there is no seam. `--signal` is the
  brand's own Amber 500 promoted from decoration; `--primary` is the brand indigo lifted
  for a dark ground.

  Archivo finally shipped, in exactly the scoped component `design-system.md` said it
  would have to be.

* **Trap found the hard way** — the standard no-flash trick (inline script adds a *class*
  to `<html>`) **fails silently** here: `app/layout.tsx` renders
  `<html className={geist.variable}>`, so React owns that prop and hydration reconciles
  the class away. Renders dark, the toggle appears not to persist, nothing errors. Caught
  by dumping the post-hydration DOM after a screenshot came back dark twice. Resolved with
  a `data-lab-theme` attribute — see the size entry above for why the cookie approach that
  briefly replaced it had to go.

* **Fix** ([blog](/content/blog.md)): `app/blog/[slug]/page.tsx` called `getDB()` outside
  the try/catch its own `generateMetadata` had, so a D1 outage threw there while every
  other read path degraded. Both now go through `lib/blog.ts::getPostBySlug`.

* **Fix**: share cards for `/lab` are rendered at publish time with Pillow and uploaded
  to R2 (`lab/og/<slug>.png`), narrowing the "no OG image generation" gap in
  [SEO](/site/seo.md) to the 14 marketing pages. Runtime generation via satori was
  rejected: WASM on the edge, in a build that has broken on next-on-pages before.

* **Found**: `CLOUDFLARE_R2_PUBLIC_URL` in the pipeline `.env` is stale — a
  `pub-*.r2.dev` endpoint, while every `image_url` in D1 is on `media.cybiqon.in`.
  `publish_blog.py` silently sidesteps it by hardcoding the host. Using the variable
  produces URLs that look correct in the publish log and resolve to nothing. Not fixed in
  `.env` (that file is not mine to edit blind); `publish_lab.py` hardcodes the same host
  and explains why.

## 2026-07-26

* **Creation** ([routes](/site/routes.md), [design system](/site/design-system.md)): the
  `/products` catalogue — `data/products.ts` + `data/legal/{llmbytes,meflow,vitaloop}.ts`
  feeding `/products`, `/products/apps`, and three products × (page + privacy + terms).
  Replaces the two hand-written llmbytes legal pages that were the entire contents of
  `app/apps/`, and gives VitaLoop a real privacy URL — its Play submission had been
  pointing at `vitaloop.app/privacy`, a domain that resolves to nothing.

  **Two things here are load-bearing and should not be "simplified" later.**

  First, there is **no `[slug]` route**. Next 16 emits a Node ISR fallback for a dynamic
  segment even with `dynamicParams = false`, `next-on-pages` calls that fallback an
  invalid function, and the build fails. `runtime = "edge"` suppresses it but is mutually
  exclusive with `generateStaticParams`. Concrete per-product route files are the escape.
  This cost a failed Cloudflare build on PR #33 — and the reason I missed it is worth
  recording: I ran `npm run build`, which passes, instead of
  `npx @cloudflare/next-on-pages`, which is what actually deploys.

  Second, the **`/apps/*` → `/products/*` 308 redirects** in `next.config.mjs`.
  `/apps/llmbytes/privacy` is the privacy-policy URL registered with Google Play for a
  published app. Moving it without a redirect breaks a live store listing. Verified in the
  built `.vercel/output/config.json`, not just in dev. Play Console should still be
  updated to the new URL — a redirect keeps a link alive, it does not stop the console
  pointing at a path we no longer serve directly.

  Category pages are views; product URLs stay flat. A category must never own an item's
  URL, or recategorising something later breaks it — which matters when one of those URLs
  is registered with Google.

* **Correction** ([design system](/site/design-system.md)): the Ledger theme shipped as a
  full palette — warm paper, ochre, ink — and the founder's response to the live page was
  *"its color doesnt match our site, looks odd."* Measured: foreground hue shifted 170°,
  primary 164°. Two pages read as a different company behind the same navbar. The theme is
  now **structural only** — `--radius: 0px` and two aliases — and every colour is
  inherited. The lesson is the general one: structure carried the distinctiveness the
  brief actually wanted; the palette was where I spent the budget by mistake.

* **Creation** ([lead capture](/content/lead-capture.md), [routes](/site/routes.md)):
  `/free-website` — the Launch-5 offer page — plus `POST /api/apply`,
  `data/launch5.ts`, and `migrations/0003_launch5_applications.sql`.

  **`/api/apply` deliberately does not treat the D1 insert as fatal**, unlike
  `/api/audit`. Its table arrives via a hand-applied migration, so the realistic day-one
  failure is that the table does not exist yet, and an applicant must not pay for that.
  The insert is best-effort; on failure the notification email still goes out, subject
  prefixed `[DB FAILED]`, body opening with a banner naming the migration. Only if **both**
  sinks fail does the user see an error, and that error hands them the WhatsApp number.
  Returning `{ success: true }` when nothing was recorded anywhere is exactly the silent
  failure this company keeps getting bitten by.

  **`SLOTS_TAKEN = 0` and it is a real zero.** Seeding it would rebuild the fabricated
  live counter that was removed from the homepage the same day.

  Two copy claims were caught in review and corrected before commit: *"the code is
  public"* (only this repo is) and *"three published products"* (two are live, one is in
  testing). On a page whose whole argument is that the terms are honest, a rounded-up
  number is the most expensive available mistake.

* **Fix** ([lead capture](/content/lead-capture.md)): both public lead endpoints now
  **escape user input** before interpolating it into the notification email, and share a
  **3-per-hour-per-IP rate limiter** (`lib/leads.ts`, `rate_limit_hits`). Both gaps were
  recorded in this bundle on 25 Jul as known and unfixed.

  Rate limiting got its own table rather than an `ip_hash` column on `audit_leads`,
  because SQLite has no `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` and a migration you
  cannot safely re-run is a migration nobody re-runs after a restore. The IP hash is data
  minimisation, **not** anonymisation — a SHA-256 of an IPv4 is reversible in minutes of
  compute. The limiter fails **open** on a missing header or a query error: five slots
  exist in total, so the cost of abuse is a noisy inbox and the cost of a false reject is
  a lost lead.

* **Fix**: removed **952 files of `next-on-pages` build output** from git tracking and
  added `.vercel` to `.gitignore`. I committed them by accident in `21bc326` — the
  ignore file listed `.next` but not `.vercel`, and a `git add -A` swept the lot into the
  org's only public repo. Scanned before removing: no secret was exposed. The two
  `RESEND_API_KEY` hits in the bundle are property reads on the env binding, not values.


## 2026-07-25

* **Initialization**: created this bundle — [site](/site/) (stack, routes, SEO) and
  [content](/content/) (blog, lead capture, content data).

* **Discovery** ([SEO](/site/seo.md)): **seven pages export no metadata at all** — `/pricing`,
  `/our-works`, `/case-studies`, `/contact`, `/about`, `/process`, `/faq` are all `"use client"`,
  so they carry no unique title, description, canonical or OpenGraph tag and inherit only the
  root defaults. These are the highest commercial-intent pages on the site, and a blog post has
  been published into this site every day for four months. The fix is mechanical: move each body
  to `XClient.tsx` and add a thin server `page.tsx` exporting metadata. Also confirmed missing:
  Search Console verification, an RSS feed (`/rss.xml` 404s), indexable tag routes, and any GA4
  conversion event — the audit form and every WhatsApp click are untracked.

* **Discovery** ([routes](/site/routes.md)): `app/apps/` contains **exactly two hand-written
  legal pages and no index**, so `/apps` and `/apps/llmbytes` both 404 — while both existing
  pages emit BreadcrumbList JSON-LD pointing at `/apps/llmbytes`, a URL that does not exist.
  Structured data asserting a 404 is worse than omitting it. The queued `data/apps.ts` +
  `app/apps/[slug]/…` rebuild also unblocks **VitaLoop's Play submission**, which currently
  points at `vitaloop.app/privacy` — a domain that resolves to nothing.

* **Discovery** ([lead capture](/content/lead-capture.md)): the site has **one form**, and **no
  newsletter signup anywhere** — 76 blog posts with no email capture on any of them. The largest
  unclaimed conversion surface on the site. `POST /api/audit` also has no captcha, no rate
  limiting, and interpolates user input unescaped into the notification email.

* **Discovery** ([content data](/content/content-data.md)): there is **no `data/` directory** —
  every content list is a `const` array inside the component that renders it, so the portfolio
  cannot be reused in a proposal or a case study. `/our-works` shows 5 projects with no client
  names, no testimonials and no results. Rebuilding it is deliberately sequenced **after** the
  Launch-5 clients exist: extracting demo projects into a data file would relocate the problem
  rather than fix it.

* **Fix** ([SEO](/site/seo.md), [routes](/site/routes.md)): all seven `"use client"` money
  pages split into a server `page.tsx` exporting unique title / description / keywords /
  canonical / OpenGraph, plus a co-located `XClient.tsx` holding the unchanged body.
  **They had all been shipping the identical `<title>` as the homepage**, so Google saw seven
  near-duplicate pages covering the site's entire commercial intent. Verified in the build
  output: seven distinct titles, correct canonicals, all prerendering statically.
  Trap worth remembering: the root layout sets `template: "%s | Cybiqon AI Solutions"`, so a
  page title ending in the brand renders it **twice** — page titles omit it, `openGraph.title`
  keeps it.

* **Creation** ([routes](/site/routes.md)): `app/rss.xml/route.ts` — edge runtime, 50 most
  recent posts from D1, XML-escaped, listed in `sitemap.ts` and the layout's
  `alternates.types`. Degrades to an empty-but-valid feed on a D1 outage rather than a 500.

* **Correction** ([SEO](/site/seo.md)): an earlier version of this bundle implied the blog was
  not indexed. **It is** — `site:cybiqon.in` returns blog URLs, and posts carry unique titles,
  descriptions, `index, follow`, canonicals and Article JSON-LD with all 76 in the sitemap.
  That claim came from a stale `AUDIT.md` and was never verified. Discovery was never the
  problem; **ranking** is, and that is a content and authority problem, not a technical one.

* **Fix** ([blog](/content/blog.md), [SEO](/site/seo.md)): made every post reachable by a
  crawler. `/blog` fetched `LIMIT 30` and held the page in `useState`, rendering **9 post
  links out of 76** with no paginated URLs — so 46 posts had **no internal link anywhere on
  the site** and were discoverable only through `sitemap.xml`, which is exactly what Google
  parks under *"Discovered — currently not indexed"*. Replaced the client `BlogTagFilter`
  with a server `BlogList`: `/blog?page=N` with real hrefs and `rel=prev/next`, plus 21
  `/blog/tag/<slug>` archives. Verified live: walking pages 1–9 reaches 76/76 posts, and
  the sitemap now lists 120 URLs.

  Two judgement calls worth keeping. **Tag pages are gated at ≥3 posts and ≤40% share** —
  215 distinct tags exist across 76 posts and most appear once, so a page per tag would be
  190+ thin archives, and `MSME` (64/76) / `India` (60/76) would duplicate `/blog`.
  **Page 2+ canonicals to itself**, not back to `/blog`; self-canonicalising would tell
  Google those URLs are duplicates and undo the crawl paths the change exists to create.

* **2026-07-30 — Lumina's product and legal pages.** `/products/lumina`,
  `/products/lumina/privacy` and `/products/lumina/terms`, all three prerendered as
  static assets. One `data/legal/lumina.ts`, one entry in `data/products.ts`, three
  four-line route shims — the slug-driven legal system shipped on 26 Jul took the
  fourth product with no new page design, which is what it was built for. The
  sitemap picked up all three URLs on its own.

  **The privacy policy is deliberately not a copy of the other three.** llmbytes,
  MeFlow and VitaLoop all declare "no third-party ads" and answer *no* to data
  sharing. Lumina serves Google AdMob, so the advertising ID and coarse
  IP-derived region leave the device and reach a third party — a different Data
  Safety answer, and the most common way a small publisher earns a policy strike is
  shipping an ad SDK against a policy copied from an ad-free app.

  `/products/lumina/privacy` becomes a live Play Console policy URL the moment the
  app is uploaded, which is why it matters that these are `○ (Static)` in the build
  output. A static asset cannot 500; an edge function can. See the comment in
  `components/products/meta.ts` for why the routes are concrete rather than
  `[slug]`.

* **2026-07-30 — `app-ads.txt`.** `public/app-ads.txt` declares Cybiqon as an authorised
  seller for AdMob publisher `pub-6927966479089034`, which Lumina's ads run under.

  This is not paperwork. Buyers check the file against the developer website on an app's
  store listing, and without it a large share of demand will not bid — a **silent revenue
  loss rather than an error**. Nothing breaks; the money simply does not arrive, and
  there is no signal anywhere that it is happening.

  Deliberately plain ASCII: the file is machine-read by a long tail of crawlers, and an
  em-dash in a comment is not worth discovering the hard way.

  **It cannot validate yet.** AdMob verifies by crawling the developer website named on
  the Play listing, and Lumina is not published. Once it is live, set the developer
  website to `cybiqon.in` and link the AdMob app to the store listing — the file only
  starts earning at that point.

  Served from `public/`, like `favicon.ico`; verified that other files in that directory
  reach the deployed static output and answer at the site root in production.
