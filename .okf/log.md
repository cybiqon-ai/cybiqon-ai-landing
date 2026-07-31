# Update Log

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
