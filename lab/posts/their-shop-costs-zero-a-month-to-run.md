---
title: "Their shop costs ₹0 a month. A finished feature stays off to keep it that way."
# The h1 states the decision. The searchable string is the method — somebody
# deciding whether a real store fits on Cloudflare's free tier is typing the
# services, not our conclusion.
seo_title: "Cloudflare Free Tier Ecommerce: A Real Store on Workers, D1 and R2"
excerpt: "We built a client's dry-fruits store on Cloudflare's free tier — storefront, admin panel, real payments. It costs them ₹0 a month to run. The order-alert emails are finished, tested and deliberately switched off, because Cloudflare's email sending needs the paid plan."
date: 2026-09-08
tags:
  - Cloudflare
  - Ecommerce
  - Workers
  - Client Work
  - Engineering
# Figures the body cannot derive. Word count, reading time and source count are
# computed at render so they cannot go stale.
readouts:
  - label: running cost
    value: "₹0/mo"
  - label: homepage weight
    value: "3.7 MB → 233 KB"
  - label: tests
    value: "313"
  - label: transforms used
    value: "60 / 5,000"
  - label: worker startup
    value: "7 ms"
  - label: D1 tables
    value: "17"
---

[Snackly](https://snacklyfoods.in) sells dry fruits, nuts and seeds. Their storefront and the admin panel behind it run on Cloudflare, take real payments, and cost them nothing per month to operate. Not "nearly nothing" — the invoice does not exist.

That was the constraint, not the achievement. A small Indian retailer will absorb a one-off build cost and will not absorb a recurring one, and a hosting bill is the thing that quietly kills a small store's website about a year in: the card expires, nobody notices, and the site is gone. So the brief was to build a real shop — catalogue, cart, checkout, inventory, orders, coupons, content — inside allowances that never generate a charge.

Cloudflare's free tiers make that possible for a specific and slightly unusual reason. They **fail closed**. Exceed the Workers request limit and further operations return an error. Exceed D1's daily row reads and queries are blocked. Exceed the image transformation allowance and you get a `9422` back, and Cloudflare's own documentation says plainly that *"you will not be charged for exceeding the limits in the Free plan."* None of these degrade into a bill.

That is the whole reason this is safe to hand a client. The failure mode is downtime, not debt — and downtime is a problem you can be called about, while a surprise ₹4,000 charge on somebody's personal card is a problem you find out about when the relationship ends.

The most useful thing in the repository is not the architecture. It is a feature that is built, tested, deployed and deliberately switched off, because turning it on would have started a bill in the client's name against a sentence we had already written down.

## TL;DR

- **Static asset requests are free and unlimited, and that single line is the architecture.** The storefront is a Next.js static export served by Workers Static Assets, so a customer browsing forty pages never reaches our code. Only `/api/*` runs the Worker, which is what keeps the whole store inside 100,000 requests a day.
- **Three separate pieces of code exist in their current shape because of a metered limit.** Image widths are clamped to three buckets because Next's default eight would burn the transformation budget; the admin dashboard reads a nightly aggregate because summing the orders table live is the one query capable of exhausting 5 million daily row reads by itself; the catalogue runs three flat queries instead of one JOIN because D1 is metered in **rows read**, and a JOIN reads far more rows for the same answer.
- **The order-alert emails are finished and switched off.** Cloudflare Email Sending requires the Workers Paid plan. The scope document told the client twice that their monthly platform cost is zero. We had misread the pricing page and said otherwise, in writing, twice — so the binding ships commented out with the reason attached rather than quietly contradicting the promise.
- **The free tier is metered per account, so the store had to be built in the client's account, not ours.** Two clients in one account share one allowance, and a busy Diwali on one store throttles the other. It also turns handover into a role grant rather than a migration.
- **The admin has no login form** — no password table, no session store, no reset email. Cloudflare Access gates it at the edge and the Worker re-verifies the signed assertion, because anyone who learns the origin URL can call it directly.
- **Image transformations took the homepage from 3,746 KB to 233 KB on a phone**, and the store is using 60 of its 5,000 monthly transformations.

## The free tier is a shape, not a discount

Building for a free tier is not the same as building cheaply. Every limit is a different *kind* of limit, and the ones that bite are rarely the ones you plan around.

| Service | What it does here | Free allowance |
|---|---|---|
| [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) | every storefront page, script and stylesheet | **free and unlimited** |
| [Workers](https://developers.cloudflare.com/workers/platform/pricing/) | the API and the admin logic | 100,000 requests/day, 10 ms CPU each |
| [D1](https://developers.cloudflare.com/d1/platform/pricing/) | products, orders, customers, content | 5 M rows read/day · 100 k written/day · 5 GB |
| [R2](https://developers.cloudflare.com/r2/pricing/) | product photography | 10 GB · 1 M Class A · 10 M Class B · **zero egress** |
| [Image Transformations](https://developers.cloudflare.com/images/pricing/) | resizing and format negotiation | 5,000 unique transformations/month |
| [Access](https://www.cloudflare.com/plans/zero-trust-services/) | the admin login | 50 users |
| Cron Triggers | nightly aggregates and backup | 5 per account |

Read that as a shape and two things stand out immediately.

The first is that **the tightest limit is not requests or storage. It is 5,000 image transformations a month**, and it is tight in a way that is easy to miss because the number sounds generous.

The second is a trap. KV allows 1,000 writes a day. That is small enough that carts, sessions or view counters in KV would work perfectly in development and fail on a moderately busy Saturday. This build uses no KV at all.

Neither of those is a performance consideration. They are both arithmetic, done before the code was written, and both changed what got built.

## One line decides the architecture

Requests to static assets are free and unlimited. They do not draw down the 100,000, and they never execute your Worker.

Everything else follows from that. The storefront is a [Next.js static export](https://nextjs.org/docs/app/guides/static-exports) — plain HTML in a directory — served by Cloudflare's Asset Worker. `run_worker_first` in the config lists exactly `/api/*`, so a customer loading the homepage, browsing four categories and reading three policy pages costs zero requests against the daily cap. Only adding to a cart, placing an order or an admin action reaches the Worker at all, where a small [Hono](https://hono.dev/) app does the routing.

<figure>
<svg viewBox="0 0 680 246" role="img" aria-label="A diagram of two request paths from a browser. The upper path shows requests for pages, scripts and images matching a built file being served by Cloudflare's Workers Static Assets, labelled free and unlimited, never running the Worker. The lower path shows requests to slash api being routed to the Hono Worker first, which reads D1 and R2, and these are the only requests that count against the free plan's hundred thousand per day. A note records that a customer browsing forty pages costs nothing." style="width:100%;height:auto">
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="10" y="100" width="88" height="44" rx="4"/>
    <rect x="188" y="34" width="176" height="44" rx="4"/>
    <rect x="188" y="166" width="176" height="44" rx="4"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="26" y="128">browser</text>
    <text x="202" y="52">Workers Static</text>
    <text x="202" y="68">Assets</text>
    <text x="202" y="184">Worker (Hono)</text>
    <text x="202" y="200">run_worker_first</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.7">
    <path d="M102 114 L145 114 L145 56 L182 56 M176 51 L182 56 L176 61"/>
    <path d="M102 130 L145 130 L145 188 L182 188 M176 183 L182 188 L176 193"/>
    <path d="M368 188 L404 188 M398 183 L404 188 L398 193"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.8">
    <text x="150" y="40">/  /products/…  /_next/*</text>
    <text x="150" y="160">/api/*</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.85">
    <rect x="410" y="164" width="62" height="22" rx="3"/>
    <rect x="410" y="192" width="62" height="22" rx="3"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="432" y="179">D1</text>
    <text x="432" y="207">R2</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11" font-weight="bold">
    <text x="384" y="52">free and unlimited</text>
    <text x="490" y="179">100,000 / day</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.75">
    <text x="384" y="68">never runs our code</text>
    <text x="490" y="195">10 ms CPU each</text>
    <text x="10" y="234">A customer browsing forty pages spends nothing. Only the cart, the checkout and the admin do.</text>
  </g>
</svg>
<figcaption>Almost every architectural decision below is an attempt to keep work above that line rather than below it. The free tier did not reward a clever design; it rewarded moving code out of the metered path.</figcaption>
</figure>

Server rendering was rejected on numbers rather than taste. The free plan gives 10 ms of CPU per invocation, and server-side rendering typically lands somewhere between 10 and 20 ms — straddling the limit rather than clearing it. The Worker size cap is 3 MiB compressed on free against 10 MiB on paid, which a Next.js SSR bundle is not comfortably inside either. Both constraints point the same way.

The cost of that choice is real and worth stating: a static page is built at deploy time and the catalogue changes whenever the client edits it. The build resolves this by fetching live values — price, stock, offers — client-side at render, so a static page is never a stale page. It does not resolve it completely, and §8 is what that costs.

## Three places the free tier changed the code

This is the part that generalises. Each of these is ordinary code that would look different on a paid plan.

**Image widths are a billing control.** Next's responsive images request roughly eight widths per image by default. Cloudflare bills a transformation per unique combination of source image and settings, so at 300 catalogue images that is 2,400 unique transformations for one format, and a second format doubles it. Against a 5,000 monthly allowance, that is one busy month from costing money. So the loader clamps every request to exactly three buckets — 400, 800 and 1200 — and uses `format=auto`, which serves AVIF or WebP by content negotiation and counts as **one** transformation rather than one per format. The comment at the top of the file is the whole point:

```ts
/**
 * So widths are clamped to exactly three buckets. 300 images x 3 widths = 900
 * unique transformations, permanently inside the free tier, and each bucket is
 * reused across every product rather than being generated per layout.
 *
 * `format=auto` serves AVIF/WebP by content negotiation and counts as one
 * transformation, not one per format.
 *
 * Changing ALLOWED_WIDTHS is a billing decision, not a styling one.
 */
```

<figure>
<svg viewBox="0 0 680 206" role="img" aria-label="A horizontal bar chart comparing monthly unique image transformations against the free allowance of five thousand. Next.js defaults at eight widths across three hundred images in two formats would use four thousand eight hundred. One format would use two thousand four hundred. Clamping to three width buckets uses nine hundred. A dashed vertical line marks the five thousand per month ceiling, which the default configuration nearly touches and the clamped one clears with room to spare." style="width:100%;height:auto">
  <g stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.5" stroke-dasharray="5 5">
    <line x1="630" y1="30" x2="630" y2="160"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.8">
    <text x="556" y="24">5,000 / month</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="10" y="58">8 widths, 2 formats</text>
    <text x="10" y="98">8 widths, 1 format</text>
    <text x="10" y="138">3 buckets, format=auto</text>
  </g>
  <g fill="currentColor" opacity="0.35">
    <rect x="180" y="44" width="499" height="18"/>
    <rect x="180" y="84" width="250" height="18"/>
  </g>
  <g fill="currentColor" opacity="0.9">
    <rect x="180" y="124" width="94" height="18"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="500" y="58" opacity="0.75">4,800</text>
    <text x="440" y="98" opacity="0.75">2,400</text>
    <text x="284" y="138">900</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.4">
    <line x1="180" y1="34" x2="180" y2="152"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.75">
    <text x="10" y="180">300 catalogue images. The store currently uses 60 of its 5,000, because it has twenty.</text>
    <text x="10" y="196">The default configuration is not wrong — it is priced for somebody else's plan.</text>
  </g>
</svg>
<figcaption>Nothing here is an optimisation. The clamped version renders identically; it just declines to generate variants nobody asked for. Framework defaults assume storage and compute are cheap, which on a metered allowance is exactly the assumption that costs money.</figcaption>
</figure>

**The dashboard reads yesterday's arithmetic.** An admin dashboard that sums the whole orders table on every page load is, in the file's own words, *"the one query in this build capable of burning the free tier's 5 million daily row reads by itself"* — because it grows with the shop and gets slower and more expensive precisely as the business succeeds. A nightly cron rebuilds a trailing 45-day window into a `daily_sales` table, and only *today* is computed live, because today changes while you are watching it.

**The catalogue runs three flat queries, not one JOIN.** This is the least obvious of the three. A single JOIN across products, variants and images returns a row per combination and then has to be de-duplicated in code. It is one round trip and it feels tidier. But D1 is metered in **rows read**, and that JOIN reads far more rows to produce the same answer. Three flat queries assembled in JavaScript read fewer. The same file caps its page size — *"an unbounded limit is a free-tier row-read leak"* — because an endpoint that accepts `?limit=100000` is a way for anyone to spend the day's allowance in an afternoon.

Two smaller ones follow the same logic. Uploads are taken as the raw request body rather than as multipart form data, because parsing multipart means scanning the whole payload for boundary markers and the CPU budget is 10 ms; taking the bytes directly makes an upload almost pure I/O. And there is no PDF library for invoices, because the browser already has a renderer that produces a better file than anything worth shipping into a 10 ms budget.

## The account has to be the client's

Cloudflare's free tier is metered per account. That one fact decides where the store lives.

If Snackly's shop ran inside our Cloudflare account, their traffic would draw down an allowance shared with every other client in it. Two stores in one account share 100,000 requests a day, 5 GB of D1 and 10 GB of R2 — so a busy Diwali on one throttles the other, and a genuinely good month for one client puts *us* onto a paid plan on behalf of somebody else's business.

This is not hypothetical tidiness. When the deployment was being prepared, the account it would otherwise have deployed into was found to already hold another client's resources. The target account was checked before anything was created: no zones, no D1, nothing belonging to anyone else.

The second reason is better. A store built in the client's own account makes handover a **role grant** rather than a migration. There is no exporting a database, no re-pointing DNS, no window where the shop is in two places. If the relationship ends, they change one permission and everything keeps running — which is the difference between a deliverable and a dependency.

## The feature that is finished and switched off

The store emails its owner when an order comes in, and sends a low-stock digest overnight. Both are built. Both are tested. Both were deployed. Neither is on.

The sequence is worth walking through, because it is three separate discoveries and only the last one is a decision.

**First, the binding deployed and a real order proved the design.** A live test order came back:

```text
outcome=ok   https://snacklyfoods.in/api/checkout
  [error] ['team email failed', 'could not find account config of sending domain']
```

`outcome=ok`. The order was written and returned an order number to the customer *while the email was failing*. That is the guarantee the whole notification path is built around — it runs in `waitUntil` and swallows every error, because an email must never cost a sale — and here it is demonstrated in production rather than asserted in a unit test.

**Second, the obvious fix would have taken down the client's business email.** Onboarding a domain for Cloudflare Email Sending writes MX records for bounce routing, plus SPF, DKIM and DMARC. `snacklyfoods.in` is not a spare domain: its MX points at Google Workspace, it already carries an SPF include and a DMARC policy, and the address the alerts go to is a live mailbox on it. A domain may carry only one SPF record — a second is a permanent error, and every message the business sends would start failing authentication. The instruction written down an hour earlier was one command away from breaking a client's mail.

**Third, and this is the one that matters: it was never free.** [Cloudflare Email Sending](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/) requires the Workers Paid plan. The line on the pricing page about sends to verified destinations being free describes what happens once you are already paying; it is not a route onto the plan. From the commit:

> The pricing page's line about sends to verified destinations being free and outside the quota describes what happens once you are already paying; it is not a way onto the plan. **I had read it as one and said so twice.**

That turns a technical step into a commercial one. The scope document tells the client, in writing, twice, that their monthly platform cost is zero. Switching this on starts a bill in their name against that sentence — about ₹450 a month, for a feature nobody had agreed to buy.

So it is off. Not half-built, not forgotten: the binding is commented out in the config with the reason attached, `sendTeamEmail` returns `"unbound"`, the nightly digest logs its count instead of sending, and no order is ever delayed or failed by an email that cannot send. The client-facing document that previously said "Included" against those emails now says they are built, deployed and not switched on, and explains why.

The alternative was available and slightly humiliating: leave it on, let it fail silently, and let the promise stand on a technicality. What made that unattractive is that it would have worked. Nobody would have noticed for months.

## The admin has no login form

There is no password table in this build. No sessions table, no password reset email, no rate limiter on a login endpoint, no bcrypt. Those are all things that can be got wrong, and the way to get them right was to not have them.

Cloudflare Access sits in front of `/admin` and `/api/admin`, with a policy naming individual email addresses and a one-time PIN as the identity method — nothing to share, nothing to leak, nothing to reset. That is the login, and on the free plan it covers 50 users against a shop run by two people.

The important half is what happens behind it:

```ts
/**
 * Access sits in front of /admin and /api/admin at the edge, so an
 * unauthenticated browser never reaches this Worker. That is not enough on its
 * own: anyone who learns the workers.dev URL can call the origin directly and
 * skip Access entirely. Every admin request therefore re-verifies the signed
 * assertion Access attaches.
 *
 * This middleware FAILS CLOSED. If ACCESS_TEAM_DOMAIN or ACCESS_AUD is missing,
 * every admin request is denied — a misconfigured deployment must never be an
 * open one.
 */
```

An edge gate protects the path, not the origin. The Worker [verifies the RS256 signature](https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/) against Cloudflare's JWKS, checks expiry, and matches the audience — without that last check, a valid token for *any other application in the same team* would be accepted here.

That double verification stopped being theoretical the day the custom domain went live. Access had destinations configured for the old preview host and not the new one, so `/admin` on `snacklyfoods.in` returned 200 with no login while every `/api/admin/*` call came back 401. **No data was exposed** — the panel's shell is a static bundle and the Worker refused every request it made — but the shell was publicly readable, and the first report of it was "Razorpay is broken in the admin", which is exactly what a panel that cannot reach its own API looks like from the outside.

The development bypass is inverted, and it is the detail worth stealing:

```ts
// The guard is deliberately the other way round from the obvious one. If any
// real Access configuration is present, the bypass does not merely step aside
// — it refuses the request outright. So a deployment that somehow carries
// DEV_ADMIN_EMAIL is dead rather than open
```

The obvious implementation ignores the dev variable when real config is present, which fails open under exactly the circumstances you would least want. This one returns 503 instead. A misconfigured deployment is broken and visible rather than working and wrong.

## A static export has one sharp edge, and the client found it

The storefront being prerendered is what makes it free. It also means the set of URLs is decided at build time, and the catalogue is not.

Rename a product in the admin panel and the new address 404s while the old one keeps working. The client did exactly this, and reported it as a bug, and was right to. It is worse than the report suggested: the homepage fetches its bestsellers live from the API, so a product added in the panel appears in the listing and then 404s when someone clicks it. *"Add, edit and remove products"* without a developer is the first line of the scope, and it did not hold.

The mitigation is a 404 page that queries the API and renders the product from live data when the slug exists in the database. That covers the customer who clicked the link. It is honest about what it does not cover: the response is still HTTP 404 and the URL is still absent from the sitemap, so search engines will not index that product until the next rebuild.

The proper fix is a rebuild on catalogue change, which is a deploy hook and a small amount of ceremony. The interesting part is that this is the actual price of the free tier, and it is not the one you would predict. Nobody hit a request cap. What they hit was the consequence of moving rendering to build time to *stay under* a CPU limit — and that consequence lands on the one workflow the client uses most.

This is also the same shape as [six of our own agent's seventeen tools having no production evidence](/lab/six-of-our-agents-tools-had-never-run): three times in this build, an admin API route existed and worked and had no screen calling it — changing a price on an existing product, deleting a pack size, managing categories at all. Each was reported as missing. Each was there. A route with no caller is indistinguishable from a route that does not exist, and only one of those is visible in a test suite.

## The canonical I broke, and the guard that replaced the warning

On 2 September I ran a plain `npm run build` to check that an invoice page compiled. That rewrote the static output without `NEXT_PUBLIC_SITE_URL`, and then I deployed it. Every canonical tag, `og:url` and sitemap entry on the live store pointed at the preview host instead of the real domain, and Search Console picked it up.

The deployment runbook had warned about this specific mistake since the image-transformation work. The warning was accurate, it was in the right file, and I had written it.

It did not stop me, so a script does now. `npm run deploy` refuses to ship a build whose canonical, sitemap or image URLs are not production. The script's own header says it better than the runbook did: *a warning in a document does not stop anybody. This does.*

This is the second time this rule has earned its place. The last time we measured whether [documentation written for a reader actually gets read](/lab/we-built-a-wiki-our-ai-agents-ignored-it), the answer was that structure and provenance pay for themselves and instructions do not — the same finding from the other end. If a rule matters, it belongs in something that can fail, not in something that can be skimmed.

Both hosts now carry a canonical pointing at the real domain, which is how the preview URL stops competing for the same pages without a redirect that would cost a Worker request on every static asset.

## What ₹0 actually buys

The numbers, since the point of all this was a bill that does not arrive.

Image transformations took the homepage from **3,746 KB** to **233 KB** on a phone. That is two steps: re-encoding the worst offenders by hand got it to 1,139 KB — the hero was a 2 MB PNG, a photograph stored losslessly — and transformations with `format=auto` did the rest, and will do it for every future upload without anyone remembering to. The hero alone drops from 213 KB to 24 KB at the width a phone actually requests.

<figure>
<svg viewBox="0 0 680 190" role="img" aria-label="A horizontal bar chart of homepage image payload in kilobytes at three stages. As uploaded through the admin panel it was three thousand seven hundred and forty-six kilobytes. After re-encoding the worst images by hand it was one thousand one hundred and thirty-nine. With Cloudflare image transformations and automatic format negotiation a phone receives two hundred and thirty-three kilobytes. The final bar is small enough to be barely visible against the first." style="width:100%;height:auto">
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="10" y="50">as uploaded</text>
    <text x="10" y="90">re-encoded by hand</text>
    <text x="10" y="130">transformations, format=auto</text>
  </g>
  <g fill="currentColor" opacity="0.35">
    <rect x="210" y="36" width="416" height="18"/>
    <rect x="210" y="76" width="126" height="18"/>
  </g>
  <g fill="currentColor" opacity="0.9">
    <rect x="210" y="116" width="26" height="18"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="634" y="50" opacity="0.75">3,746 KB</text>
    <text x="344" y="90" opacity="0.75">1,139 KB</text>
    <text x="246" y="130">233 KB</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.4">
    <line x1="210" y1="26" x2="210" y2="144"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.75">
    <text x="10" y="168">The middle step was one afternoon and does not repeat. The last step is permanent and applies to</text>
    <text x="10" y="184">every image the client uploads from now on, which is the only one of the two that is engineering.</text>
  </g>
</svg>
<figcaption>The pattern behind the first bar is worth naming: anything uploaded through an admin panel is served at whatever size it arrived. The Worker cannot resize — 10 ms of CPU and an explicit no-image-work rule — so the durable fix had to be at the edge rather than in the application.</figcaption>
</figure>

The Worker starts in 7 ms and serves 239 static assets. There are 313 tests, and they [run in workerd against a real D1](https://developers.cloudflare.com/workers/testing/vitest-integration/) rather than a mock, which matters more here than usual: the correctness this design leans on lives in the database. `CHECK (stock >= 0)` turning an oversell into a rolled-back batch is a property of SQLite, and a mocked D1 would cheerfully pass tests for behaviour the real one rejects. The signature test fires eight simultaneous buyers at one unit of stock and asserts that exactly one order results — which is also why there are no Durable Objects and no Queues in this build. A single conditional `UPDATE` inside a D1 batch does that job at this volume, and it is two fewer services to explain at handover.

Four things were excluded, and three of them were excluded because they would create a recurring charge: customer-facing transactional email, SMS and WhatsApp Business messaging, and courier API integration. The fourth — server-generated PDF invoices — was excluded on the 10 ms CPU limit rather than on money. The substitute for the first is an on-screen confirmation, order lookup by number and phone, and a click-to-chat link, which costs nothing and is how most Indian D2C support actually happens.

And the honest part. This is not free hosting that scales; it is free hosting that stops. At roughly 6,000 shopping sessions a day the request cap becomes real, and on that day the store returns errors rather than an invoice. For this client, today, that is the right trade — a shop that breaks loudly at a volume they have never seen is better than a shop that quietly bills a card they forgot about. It would be the wrong trade for a business that already has traffic, and the difference is worth saying out loud rather than selling around.

The pattern I would keep from all of this is the smallest one. The site was carrying the words "FSSAI certified" in its hero, its ticker and every product page — a regulatory claim about a business whose licence number we did not have. It now renders only where the number does. The claim and the evidence arrive together, or neither does.

---

*Every figure here is first-party, measured on the deployed store between 14 August and 8 September 2026 across 62 commits. Payload numbers are from the live homepage on a mobile viewport; the Worker startup time and asset count are from the deploy output. Free-tier limits are quoted from Cloudflare's own pricing documentation as of September 2026 and were re-checked against it while writing — they change, so check before relying on them. Test counts are `vitest` runs in workerd against a real D1. This is one store, one codebase, one author.*

## FAQ

### Can you run a real ecommerce store on Cloudflare's free tier?

Yes, with a specific architecture. The storefront must be static so that page views hit Workers Static Assets, which are free and unlimited, leaving the 100,000 daily Worker requests for cart, checkout and admin actions only. Snackly's store runs on Workers, D1, R2, Image Transformations and Access with ₹0 monthly platform cost, taking real payments. The limits that actually bite are 5,000 image transformations a month and 10 ms of CPU per request — not storage or bandwidth.

### What happens when you exceed a Cloudflare free tier limit?

You get an error, not a bill. Cloudflare's documentation states that exceeding Workers limits means "further operations of that type will fail with an error", that D1 blocks queries rather than charging, and for image transformations that "you will not be charged for exceeding the limits in the Free plan". This is the property that makes a free tier safe to hand to a client: the failure mode is downtime, which someone will call you about, rather than a surprise charge on a personal card.

### Should a client's site live in my Cloudflare account or theirs?

Theirs, and the reason is that the free tier is metered per account rather than per project. Two clients in one account share 100,000 Worker requests a day, 5 GB of D1 and 10 GB of R2, so one client's good month throttles another's site and can push you onto a paid plan on their behalf. Building in the client's account also makes handover a permission change rather than a migration of a live shop.

### Why clamp Next.js image widths on Cloudflare?

Because Cloudflare bills a transformation per unique combination of source image and settings, and Next's responsive defaults request about eight widths per image. At 300 catalogue images that is 2,400 unique transformations for one format against a 5,000 monthly free allowance. Clamping to three width buckets and using `format=auto` — which counts as one transformation rather than one per format — brings it to 900. The images render identically; the difference is entirely in what gets generated.

### Do I need a login system for an admin panel on Cloudflare?

Not if Cloudflare Access will do. Access gates the route at the edge with an identity provider — one-time PIN needs no password at all — and is free for up to 50 users, which removes the password table, session store, reset flow and login rate limiter from your codebase entirely. Verify the signed assertion in your Worker as well as at the edge, because anyone who learns the origin URL can call it directly and skip the gate.

### What is the catch with a Next.js static export on Workers?

The URL set is fixed at build time and your catalogue is not. Rename a product in the admin panel and its new URL returns 404 until the next deploy, while the old one keeps working; a newly added product can appear in a live-fetched listing and 404 when clicked. You can soften this by rendering from the API on the 404 page, but the response is still a 404 and the URL is still missing from the sitemap. If non-technical users add products often, budget for a rebuild-on-change hook.

### Is Cloudflare D1 free tier enough for an online shop?

For a small one, comfortably — but budget in rows read rather than in queries. The free plan allows 5 million rows read and 100,000 written per day, so the thing to avoid is any query whose cost grows with the business: a dashboard summing the whole orders table on every load is the classic example, and it gets more expensive exactly as the shop succeeds. Precompute those on a cron, prefer several flat queries to one wide JOIN, and never leave a page-size parameter unbounded.

## Sources

- [Workers pricing and limits](https://developers.cloudflare.com/workers/platform/pricing/) — Cloudflare, on the 100,000 daily requests and 10 ms CPU
- [Static assets](https://developers.cloudflare.com/workers/static-assets/) — Cloudflare, on asset requests being free and unlimited
- [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) — Cloudflare, on rows read as the billing unit
- [R2 pricing](https://developers.cloudflare.com/r2/pricing/) — Cloudflare, including zero egress
- [Images pricing](https://developers.cloudflare.com/images/pricing/) — Cloudflare, on the 5,000 free transformations and the `9422` error
- [Zero Trust plans](https://www.cloudflare.com/plans/zero-trust-services/) — Cloudflare, on the 50 free Access seats
- [Validating JSON web tokens](https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/) — Cloudflare Access documentation
- [Email Routing and Sending](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/) — Cloudflare, the binding this build ships disabled
- [Static exports](https://nextjs.org/docs/app/guides/static-exports) — Next.js
- [Hono](https://hono.dev/) — the router running on the Worker
- [Vitest pool for Workers](https://developers.cloudflare.com/workers/testing/vitest-integration/) — Cloudflare, running tests in workerd against a real D1
