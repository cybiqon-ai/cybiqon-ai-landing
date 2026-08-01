# Update Log

## 2026-08-01

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
