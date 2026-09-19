---
title: "Our Chrome extension sat untouched for four months. Review took one day."
# The h1 states what happened. The searchable string carries the phrase people type —
# "google maps lead generation chrome extension" — rather than the story. It lost the name
# MapWit on 19 Sep: nobody searches for it yet, and the category is what ranks. "Scraper"
# is deliberately absent; the store listing never uses it.
seo_title: "How We Built a Google Maps Lead Generation Chrome Extension"
# Front-loaded: the first sentence names the search topic and what MapWit does, the second
# carries the finding.
excerpt: "MapWit is a free Chrome extension for Google Maps lead generation: it scores the local businesses in a search and exports them to Excel, with no server and no account. It sat untouched for four months, went from zero tests to 171 in one day, and passed Chrome Web Store review on the first round."
date: 2026-09-19
tags:
  - Chrome Extensions
  - Engineering
  - Security
  - Testing
  - LLM
# Figures the body cannot derive, all first-party. Tests are a vitest run on the shipped
# commit; package size is the zip uploaded to the store; the guard figure is the throwaway
# harness from 25 Aug. Word count, reading time and source count are computed at render.
readouts:
  - label: tests
    value: "0 → 171"
  - label: review
    value: "1 round"
  - label: idle
    value: "4 months"
  - label: package
    value: "1.2 MB"
  - label: sourcemaps
    value: "−2.1 MB"
  - label: guard misses
    value: "1/30"
---
[MapWit](/products/mapwit) was written over five days in April. It could read a Google Maps search, score every business in it, and export the lot to Excel, and it did — the first exports are dated 21 April. Then nobody touched it for four months.

When we came back to it, the build still worked. It had no tests. It shipped its own source code to anyone who opened DevTools. On the Indian Google domain, where most of its users would land, it installed and did nothing at all — and the change that fixed that introduced a bug that got the most important fact about every business wrong.

It went live on the Chrome Web Store on 14 September, **one day after submission and on the first review round**. Most of the work between those two states was not adding things. It was finding out what the extension actually did, and removing the parts a reviewer would reasonably object to — including a feature that worked.

This is the full account: how a lead gets from a Maps result to a row in a spreadsheet, what we measured, where it broke the first time it met live Google Maps, and what we cut.

## TL;DR

- **The most useful signal was the one we were getting wrong.** A business with no website is the best lead MapWit can find, and on `google.co.in` every business looked like it had one — the extension was reading the listing's own Maps link as the business's site. Those leads lost 5 points out of 10. Seven test cases now fail if it comes back.
- **One of thirty hostile URLs got past our private-address guard.** The browser's URL parser rewrites `::ffff:127.0.0.1` into hex before our code sees it, so a dotted-quad check never matches. A throwaway harness found it in minutes; reading the code had not.
- **We went from 0 tests to 171 in one day, and the tests found real bugs.** Bulk review analysis lost every business but the first in a batch. A missing setting clamped to 1 instead of the default of 8. Neither would have shown up in a demo.
- **Review passed first time because the review had already happened.** We cut outreach drafting to satisfy the single-purpose rule, made website access optional, stopped shipping 2.1 MB of sourcemaps, bundled the fonts, and wrote a packaging script that refuses to zip a build that breaks any of six rules.
- **The first live run of the rebuilt extension found three bugs that 166 tests had not.** A year glued to a star rating became a phone number: `Est. 2005` next to `4.5(177)` read as `20054.5(177`.

## MapWit, in one paragraph

MapWit is a Chrome side panel for people who sell to local businesses — web studios, agencies, freelancers. You search Google Maps the way you already would ("dentists in Pune"), and the businesses appear in the panel as you scroll. A **Deep scan** opens each listing to collect its website, phone, address and recent reviews. **Enrich** visits each business's own website for email addresses, social profiles and a site-quality check. Every lead gets a score from 1 to 10, you can filter to the ones with no website at all, and **Analyse reviews** writes a one-sentence summary of what customers complain about. Then you export to Excel, written in the browser with [SheetJS](https://docs.sheetjs.com/). There is no server, no account and no subscription; leads live in your browser's storage, and the one AI feature runs on your own [OpenRouter](https://openrouter.ai/docs/quickstart) key.

The premise is in the product page's first line: a bought lead list is rows somebody has already sold twice. The businesses worth calling are the ones already visible on Maps with no website or a bad one, and the fastest way to find them is to qualify a search you were going to run anyway.

<figure>
<svg viewBox="0 0 680 236" role="img" aria-label="Flow diagram of how a lead moves through MapWit, left to right: Capture reads businesses from the Google Maps results as you scroll; Deep scan opens each listing for website, phone, address and reviews; Enrich, optional, visits the business's own website; Analyse reviews, optional, summarises reviews with AI; Score assigns one to ten; Export writes an Excel or JSON file. Everything happens in the browser except two opt-in requests shown below a dashed line: Enrich fetches business websites after you allow website access once, and Analyse sends review text to OpenRouter with your own key." style="width:100%;height:auto">
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.75">
    <text x="7" y="22">IN YOUR BROWSER</text>
    <text x="7" y="148">LEAVES THE BROWSER, OPT-IN ONLY</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="7" y="36" width="96" height="50" rx="4"/>
    <rect x="121" y="36" width="96" height="50" rx="4"/>
    <rect x="235" y="36" width="96" height="50" rx="4"/>
    <rect x="349" y="36" width="96" height="50" rx="4"/>
    <rect x="463" y="36" width="96" height="50" rx="4"/>
    <rect x="577" y="36" width="96" height="50" rx="4"/>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-dasharray="4 3">
    <rect x="233" y="166" width="100" height="50" rx="4"/>
    <rect x="347" y="166" width="100" height="50" rx="4"/>
  </g>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="103" y1="61" x2="115" y2="61"/>
    <line x1="217" y1="61" x2="229" y2="61"/>
    <line x1="331" y1="61" x2="343" y2="61"/>
    <line x1="445" y1="61" x2="457" y2="61"/>
    <line x1="559" y1="61" x2="571" y2="61"/>
  </g>
  <g fill="currentColor">
    <polygon points="121,61 114,57 114,65"/>
    <polygon points="235,61 228,57 228,65"/>
    <polygon points="349,61 342,57 342,65"/>
    <polygon points="463,61 456,57 456,65"/>
    <polygon points="577,61 570,57 570,65"/>
    <polygon points="283,166 279,159 287,159"/>
    <polygon points="397,166 393,159 401,159"/>
  </g>
  <g stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.8">
    <line x1="283" y1="86" x2="283" y2="159"/>
    <line x1="397" y1="86" x2="397" y2="159"/>
  </g>
  <g stroke="currentColor" stroke-width="1" stroke-dasharray="2 4" opacity="0.5">
    <line x1="7" y1="128" x2="673" y2="128"/>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="11">
    <text x="15" y="57">Capture</text>
    <text x="129" y="57">Deep scan</text>
    <text x="243" y="57">Enrich</text>
    <text x="357" y="57">Analyse</text>
    <text x="471" y="57">Score</text>
    <text x="585" y="57">Export</text>
    <text x="241" y="187">websites</text>
    <text x="355" y="187">OpenRouter</text>
  </g>
  <g fill="currentColor" font-family="ui-monospace, monospace" font-size="10.5" opacity="0.7">
    <text x="15" y="75">you scroll</text>
    <text x="129" y="75">each listing</text>
    <text x="243" y="75">optional</text>
    <text x="357" y="75">optional</text>
    <text x="471" y="75">1–10</text>
    <text x="585" y="75">XLSX · JSON</text>
    <text x="241" y="205">allow once</text>
    <text x="355" y="205">your own key</text>
  </g>
</svg>
<figcaption>Everything above the line happens in the browser. Two things cross it, and both are opt-in: Enrich fetches a business's own website only after you allow website access, and review text goes to OpenRouter only when you click Analyse with your own key. The README used to say nothing leaves the machine. That was never true, and it now says what does.</figcaption>
</figure>

## How to generate leads from Google Maps with MapWit

The practical version first, in the order the extension's own tour walks through it.

1. **Install it and open the side panel.** Add MapWit from the Chrome Web Store (Chrome 114 or later) and click its toolbar icon. The panel opens beside the page and stays open while you use the map.
2. **Search Google Maps the way you would anyway.** A category and a place works best: `dentists in Pune`, `interior designers in Indiranagar`. Scroll the results and each business appears in the panel as it renders. **Load more** scrolls the list to the end of the search for you; Google Maps shows about 120 results per search.
3. **Deep scan.** It opens each listing and collects the website, phone, address and recent reviews. It is the slow step on purpose, because it paces itself, so start it and let it run.
4. **Enrich** (optional). It visits each business's own website for email addresses, social profiles and a site-quality check. Chrome asks once for website access the first time you use it.
5. **Analyse reviews** (optional). With your own OpenRouter key, it writes one sentence on what customers praise and complain about, which is often the opening line of a call.
6. **Find the best leads.** Sort by lead score, switch on **No website only**, or search by name or category. The score is built from these signals:

| Signal | Points | What it usually means for a pitch |
|---|---|---|
| No website | +4 | A website build, and the strongest single reason to call |
| Own website scores 3 or less out of 10 | +2 | A redesign: no HTTPS, no mobile layout, slow, or visibly stale |
| Phone number | +2 | You can call today |
| Email address | +2 | You can write first |
| 50+ reviews and no website | +1 | An established business with an obvious gap, not a new one |
| Rating between 3.5 and 4.2 | +1 | Real customers, and room to improve |
| Missing 4 or more of 7 social platforms | +1 | A thin presence generally |

7. **Export.** Choose Excel, sorted by score, with 19 columns including the AI review insight, or JSON for a CRM import.

That is the whole workflow, and it takes one search to see whether the list is worth calling. What you do with the list afterwards is your responsibility. Google's Maps terms and India's data protection law both apply to it; [the section near the end](#what-is-still-true) says how.

The rest of this post is how each of those steps works, and what it took to ship it.

## How MapWit captures leads from Google Maps

There is no Maps API underneath this. MapWit reads the page you are already looking at.

A content script runs on four Maps origins — `www.google.com/maps`, `maps.google.com`, and their `.co.in` equivalents — and watches the results feed as it renders. Each card is a link with a stable place identifier in its URL, which becomes the lead's primary key, plus a few lines of text that hold the name, rating, review count, category and, sometimes, a phone number and an outbound link. **Load more** scrolls the feed for you to the end of the search. Google Maps shows about 120 results per search; on the live test it reached 106 and stopped where the list stopped.

**Deep scan** is the slower half. For each captured lead it opens the listing's detail panel and reads the fields Maps exposes there with stable data attributes — website, address, phone — plus up to 15 recent reviews, each cut to 400 characters. Only a panel that has actually finished loading, with a heading that matches the listing that was clicked, counts as scanned. An earlier version marked a lead done as soon as it had clicked it, which meant a slow load produced a lead with nothing in it and no way to tell.

The side panel is a real [Chrome side panel](https://developer.chrome.com/docs/extensions/reference/api/sidePanel), not a popup, which is why the manifest sets `minimum_chrome_version` to 114: below that the API does not exist, and the toolbar button installs and silently does nothing. A popup would have been simpler and would have closed every time you clicked the map.

The fragile part is worth saying plainly. The result cards use obfuscated class names that Google can change on any deploy, and several of the patterns that pull a rating or an "Open now" out of card text match **English** interface strings. On a Maps interface set to another language MapWit captures less. The detail panel is sturdier, because the website, address and phone rows carry `data-item-id` attributes that have been stable for years — which is also why Deep scan is the reliable path and card capture is the fast one.

## How MapWit scores a Google Maps lead

A score only earns its place if it sorts the list the way the person calling would. The whole point table is in step 6 above; it is small enough to show in full, and it has no hidden terms. The total is clamped to 1–10, and 8 or above is labelled hot, 5 or above warm. It is a pure function shared by the service worker and the side panel so the two can never disagree about a number.

The site-quality score out of 10 is equally blunt, and deliberately so. It checks five things on the business's home page: served over HTTPS (2), a mobile viewport tag (2), a response under three seconds (2, or 1 under six), a copyright year from this year or last (2), and a `mailto:` or `tel:` link somewhere on the page (2). None of that is a design judgement, and all of it is something a salesperson can say out loud on a call: *your site doesn't load on a phone.*

Two classification rules matter more than the weights. A listing whose only outbound link is a booking platform — Booksy, Fresha, Setmore and twelve others on the list — has no website of its own. That is a pitch, not a site to crawl. And a link back into Google itself is not a website at all, which is the rule the extension broke on `google.co.in` (below).

## Enrichment, and the one address the guard missed

Enrich visits the business's own site to find what Maps does not show: email addresses, social profiles, and the quality signals above. It tries up to six paths — `/`, `/contact`, `/contact-us`, `/contactus`, `/about`, `/about-us` — with an eight-second timeout and a 512 KB cap per page, and stops early once it has two likely email addresses, keeping the best three with `contact@` ranked above `support@` above `info@`.

That is the only feature that needs to fetch arbitrary websites, so it is the only one behind the broad website permission — and that permission is [optional](https://developer.chrome.com/docs/extensions/reference/api/permissions). The extension installs without it. The first time you click Enrich, Chrome asks. Settings can revoke it, and revoking it mid-run stops enrichment with the leads left pending rather than failed.

Fetching arbitrary URLs has a sharper problem than permissions. The URL comes from a Maps listing, which is data we do not control. A listing whose website field says `http://192.168.1.1/` would be fetched **from the user's own machine, inside their own network** — their router, their NAS, their office intranet. That is server-side request forgery with a browser as the server, and it is exactly the kind of thing a reviewer probes on an extension that can reach any host.

So before any fetch, a guard refuses non-HTTP schemes, ports other than 80 and 443, embedded credentials, single-label names like `router` or `nas`, private suffixes like `.local` and `.internal`, and every private, loopback, link-local and shared address range, including `169.254.169.254`, where cloud providers serve instance credentials. The list follows the [OWASP SSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) and the [RFC 1918](https://www.rfc-editor.org/rfc/rfc1918) and [RFC 6598](https://www.rfc-editor.org/rfc/rfc6598) ranges.

Rather than trust the list, we wrote a throwaway harness with thirty hostile inputs and ran the guard against it. **Twenty-nine were refused. One got through.**

```text
http://[::ffff:127.0.0.1]/     allowed   ← loopback, written as an IPv4-mapped IPv6 address
```

The guard checked IPv6 hosts for a dotted IPv4 address inside the mapped prefix. It never saw one, because the browser's URL parser had already rewritten the host before our code read it. The [WHATWG URL Standard](https://url.spec.whatwg.org/#concept-ipv6-serializer) serialises every IPv6 address as hexadecimal pieces, so `[::ffff:127.0.0.1]` arrives as `[::ffff:7f00:1]` — the same address, spelled so that a dotted-quad regex cannot match it. (IPv4-mapped addresses are defined in [RFC 4291](https://www.rfc-editor.org/rfc/rfc4291#section-2.5.5.2).) The fix decodes both spellings:

```ts
// IPv4-mapped addresses. The WHATWG parser rewrites `::ffff:127.0.0.1` to its
// hex form `::ffff:7f00:1`, so both spellings have to be decoded — checking
// only the dotted form lets ::ffff:127.0.0.1 straight through.
const hex = h.match(/^::(?:ffff:)?([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
if (hex) {
  const hi = parseInt(hex[1], 16);
  const lo = parseInt(hex[2], 16);
  return isPrivateIpv4(`${hi >> 8}.${hi & 0xff}.${lo >> 8}.${lo & 0xff}`);
}
```

The same parser is also why three other inputs needed no special code at all. `http://2130706433/`, `http://0x7f000001/` and `http://0177.0.0.1/` — loopback in decimal, hex and octal — are all normalised to `127.0.0.1` before the guard looks. The parser that caused the bug fixed three others for free. It is the same lesson as the time [six of our agent's seventeen tools turned out never to have run](/lab/six-of-our-agents-tools-had-never-run): the code you have read is not the code that runs, and the only way to find the difference is to execute it against something hostile.

There is one residual risk, and it is written down rather than hidden. The fetch follows redirects, so a public site can answer with a redirect to a private address. In a Manifest V3 service worker, `redirect: 'manual'` returns an opaque response, so the hops cannot be inspected one at a time; instead the **final** URL is re-checked. That means the request to the internal host is still sent. What the guard prevents is its content reaching the extension — the step that turns a forged request into a leak.

## Deduplication, and the write that lost leads

The same business turns up more than once: in two searches, or in a search and then a Deep scan of the same listing. Leads are merged on the Maps place ID first and a normalised phone number second, and a merge only ever **fills empty fields**. A value we already captured is never overwritten by a later, possibly worse, read of the same page. The score is recomputed after every merge, because a Deep scan can make a lead newly eligible for "50+ reviews and no website".

Merging on phone number has a known cost: two branches of a chain that share one number collapse into a single lead. For the people using this — who call a business, not a branch — that is usually what they want, and it is recorded as a known limit rather than a bug.

The dedup logic was fine. The bug was around it. Every writer to the lead store went through a single write queue, except the enrichment worker, which wrote directly. A lead captured by the content script while enrichment was patching another one could be overwritten by enrichment's stale copy of the list. Nothing crashed; a lead just disappeared. The fix moved the queue into the store module so there is no other way to write — the kind of bug that only exists because two parts of the code were each correct on their own.

Storage had a quieter version of the same problem. `chrome.storage.local` defaults to [10 MB](https://developer.chrome.com/docs/extensions/reference/api/storage), which is roughly 1,500 to 3,000 deep-scanned leads with their review text, and quota errors were being swallowed. The extension now holds `unlimitedStorage`, and a full store is an error you can see.

## The AI runs on your key, not ours

The one AI feature reads a business's recent reviews and writes one sentence about them: what customers praise, and what they complain about, which is usually the opening line of a sales call. It shipped in April calling Google's Gemini API directly, with the model name hard-coded:

```ts
export const GEMINI_MODEL = 'gemini-3.1-flash-lite-preview';
```

A pre-submission audit flagged it. Nobody had checked that slug still existed; the file had already churned once from a different preview model, and its own error strings said "not available on this API key". The question "does this model still exist?" had no durable answer — any answer would rot the next time Google renamed a preview.

**So we removed the question rather than answering it.** The direct Gemini integration was deleted. MapWit now talks to OpenRouter, which puts hundreds of models behind one endpoint whose format is [very similar to OpenAI's Chat API](https://openrouter.ai/docs/api-reference/overview), and the model is a setting. On the day we switched, the catalogue listed 418. The default is a [`~latest` alias](https://openrouter.ai/docs/guides/routing/routers/latest-resolution) that always resolves to the newest Gemini Flash, and a stale model is now an error on the Settings page with a named cause instead of every AI feature failing silently.

Bring-your-own-key is also what makes "no server" true. If the requests went through us, we would hold review text for businesses we had never heard of and an API bill tied to a free product. With the user's key, the text goes from their browser to OpenRouter and back, and Settings has a section headed *What leaves your browser*.

Letting users pick any model found the next bug. One model spent its entire output budget of 1,024 tokens on internal reasoning and returned no answer at all. [OpenRouter's reasoning controls](https://openrouter.ai/docs/guides/best-practices/reasoning-tokens) fixed most of it — reasoning tokens count against the output budget on most providers, so a model left to think freely can spend all of it: the call now asks for low reasoning effort with 2,048 tokens, and if a model still returns only reasoning, it retries once with four times the room before giving up with a message that suggests a non-reasoning model.

Bulk analysis is where the design had to be deliberate. Analysing one business at a time would mean a hundred requests for a hundred leads, and OpenRouter [rate-limits free models](https://openrouter.ai/docs/api_reference/limits) to 20 requests a minute. So requests are **batched** — up to eight businesses, or 24,000 characters of review text, whichever fills first — and **paced**, one in flight, at least 3.1 seconds apart. A hundred leads is about thirteen requests; twenty is three. If a rate-limit response arrives anyway, the run pauses for as long as OpenRouter says to and retries the same batch, rather than stopping.

Two things about that took tests to find. The first is Manifest V3's [service worker lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle): Chrome stops an idle extension worker after thirty seconds, and a rate-limit pause can be two minutes of silence. The run makes a cheap extension API call every twenty seconds, which resets the timer. The second was a plain parsing bug. Some models return a batch answer as a bare JSON array instead of an object, and the shared helper that stripped code fences from model output extracted only the first object it found — **so every business but the first in a batch silently lost its insight.** It passed every manual check, because a manual check is one business.

## Being polite to Google Maps

Deep scan opens listings one after another, and Google Maps notices when a session does that quickly. It does not return an error. It slows down: the detail panel keeps spinning, and a naive scanner either records an empty lead or, as ours used to, resets the page and loses its place.

We researched how Maps behaves under load before changing anything, and the conclusion was not to go faster. MapWit now paces itself, rests, and backs off further every time Maps stops answering. It pauses while its tab is hidden, since Chrome throttles background tabs and Maps stalls with them. It keeps its progress in session storage, so a reload picks up with the listings it had not reached. And if Google shows a captcha, it **stops and waits for you** — it does not try to solve it, and it never will.

That is a product decision as much as an engineering one. MapWit reads the search you ran, in your own signed-in session, at a pace a person clicking through the same results could plausibly keep. It is not a crawler, and the day it needs to behave like one is the day it should not exist.

One piece is still unfinished. Maps' loading spinner in the results feed carries no `role="progressbar"` and no `aria-busy`, so Load more cannot yet tell "still loading" from "finished". It stops correctly at the end of a list today, but it cannot wait politely in the middle of one. That is the first item for 1.0.1.

## What we deleted to pass review

Chrome Web Store review is a person reading your listing, your permissions and your code. The documented rules are public, and nearly every rejection story we could find was a known rule broken knowingly. So we reviewed MapWit against them before submitting it, and removed what failed.

**A working feature.** MapWit used to draft cold outreach — an email and a WhatsApp message tailored to each lead. It worked, and it was arguably the most impressive thing in the extension. It was also a second purpose. The store's [quality guidelines](https://developer.chrome.com/docs/webstore/program-policies/quality-guidelines) require an extension to have a single purpose that is narrow and easy to understand, and "scores leads, and also writes sales emails" is two. We first removed the UI, then found the service worker still answered the outreach messages — so a reviewer reading the bundle would still find cold-email generation in a lead-scoring extension. The handlers went too: 237 lines, their prompts, three settings and three spreadsheet columns. The source is kept under a git tag for a later version, where it may be its own product.

**The broad permission, as a requirement.** Website access became optional, as above. The `tabs` permission was removed entirely — querying tabs by URL works with host permissions alone, and the only behaviour that changed is one the code already wanted.

**2.1 MB of source code.** The build shipped sourcemaps, which embed the full original source, comments included. Two of them were web-accessible to `google.com` pages. They are off.

**Anything that loads from somewhere else.** Manifest V3 [forbids remotely hosted code](https://developer.chrome.com/docs/webstore/program-policies/mv3-requirements), and a stylesheet from Google Fonts is not code, but it is a request we did not need to explain. The fonts are bundled, which is why fonts are 62% of the 1.6 MB build: 66 files, about 1 MB. We would rather ship weight than a network dependency on the one page that has to work offline.

**A hand-written User-Agent**, left over from April, that dressed enrichment requests up as `Chrome/latest`. The browser sends its own; the invented one only added a question a reviewer would ask. And a button labelled "Scrape more", which is now "Load more" — words in a listing are read as intent.

Then we made the rules executable. `npm run package` type-checks, runs the tests, builds, and refuses to produce a zip if the build contains any sourcemap, requires a broad host permission, contains any outreach string, uses `eval(` or `new Function(`, references Google Fonts, or has a manifest version that disagrees with `package.json`. Every one of those six has been true of this repository at some point. **Its first run failed**: two `preconnect` tags to Google Fonts were still in the HTML after the stylesheet import had gone.

The listing copy got the same treatment. The store description says *qualify* and *capture*, never "scrape" or "harvest", carries a line saying MapWit is not affiliated with Google, and answers the privacy questions field by field. The privacy policy and terms went live on this site before submission, not after.

Submitted on 13 September; published on the 14th. No rejection, no resubmission. Google's [review documentation](https://developer.chrome.com/docs/webstore/review-process) says most reviews finish within a few days and that broad host permissions, or a lot of hard-to-review code, can make one take longer. We had neither left.

## Where it broke

Every test in the repository runs against pure modules or a mocked Maps page. On 12 September, with 166 tests passing, we ran the rebuilt extension against live Google Maps. It found three bugs.

**Signed-out sessions get a limited view.** Maps serves a reduced interface to a signed-out browser — "You're seeing a limited view of Google Maps" — and the new throttling code read that banner as a block and refused to scan. Deep scan did nothing at all. It is now a notice in the panel, and the scan runs.

**Promo cards moved the end of the list.** Maps now places promotional cards after its "You've reached the end of the list." text, so the end-of-list check, which read the last item, never fired. It reads the last five now.

**A year became a phone number.** A salon card read `Est. 2005` followed immediately by its rating, `4.5(177)`. In the card's flattened text those run together, and the phone pattern matched `20054.5(177`. Ratings are stripped before phone matching now, and a candidate with a decimal point between digits is rejected. The regression test uses the real card text.

After those three: Deep scan saved 5 of 5 listings on a live search, and Load more ran to 106 results and stopped where the list ended.

The worst bug, though, was older and quieter, and no live run on `google.com` would have found it. When we added the Indian Maps domains in August, nobody updated the classifier that decides whether a link is the business's own website or a link back into Google. It only knew `google.com`. On `google.co.in`, the card's own `/maps/place/` link was taken as the business website, so **"No website" never appeared** — on exactly the domain an Indian user types — and every one of those leads lost the 4 points for no website and the 1 for "50+ reviews and no website". The product's best signal was silently off for the market it was built in. Any Google country domain now classifies as Google, and seven test cases fail if the old pattern returns.

The two surfaces no automation could reach — Enrich's permission prompt, and Analyse reviews with a real OpenRouter key — were run by hand in real Chrome. Both work.

## What 171 tests bought

The test suite did not exist on the morning of 12 September. By the evening it had 171 cases across 16 files, and it had found:

- the batch parser that dropped every business but the first;
- a missing "reviews per business" setting clamping to **1** instead of the default of 8, because `Number(null)` is `0`;
- concurrent writes to the token ledger dropping entries, and an AI cache hit that never wrote its result back to the lead;
- email parsing that discarded real `hello@`, `hi@` and `admin@` inboxes, and a "prefer contact emails" sort that ran after the list had already been cut to three.

None of those would have shown up in a demo. All of them would have shown up in the first week of someone actually using it. The pattern is the same one we hit when [our agent passed every red-team probe](/lab/our-agent-passed-every-red-team-probe): a green result from the check you already had tells you very little, and the useful tests are the ones written to try to break a specific claim.

What the suite does not do is also worth stating. It covers pure modules and a mocked Maps page, and the Chrome APIs are faked. There is no CI; the tests run on a laptop and inside the packaging script. The mocked Maps page is our description of Google's markup, which is exactly the thing that changes without notice, and the only real check of that is a person running a search.

## What is still true

MapWit is free. The AI feature costs whatever your OpenRouter model costs, and nothing to us. There is no paywall and no telemetry, so the honest answer to "how many people use it" is that we see the store's own counters and nothing else, and they are not yet worth quoting.

It also carries a risk we would rather name than have someone discover. Google's [end-user Maps terms](https://www.google.com/help/terms_maps/) say you may not copy Maps content, "mass download or create bulk feeds of the content", or use it to build "a business listings database, mailing list, or telemarketing list" for a service that substitutes for Google Maps. A lead list sits uncomfortably close to that sentence, and the store that lists MapWit belongs to Google. We have built it to be as conservative as we know how — it reads only the search you ran, in your own session, at a human pace, stops at a captcha, and says plainly that it is not affiliated with Google — but that is a posture, not a licence. A product that depends on another company's page, and sits this close to its terms, can be removed by that company. We decided to ship knowing that, rather than not ship.

The same reasoning applies to what you do with the export. Business phone numbers and emails are often a person's details — a sole proprietor's mobile is their mobile — and in India the [Digital Personal Data Protection Act](https://www.meity.gov.in/data-protection-framework) applies to how you store and use them. MapWit keeps the data on your machine; what happens after you click Export is on you, and the terms on this site say so.

And the extension is 9,748 lines of TypeScript, a 1.2 MB zip, and five months old, with work on six days of it: three in April, one in August, two in September. That ratio is the most instructive number in this post. The April version did almost everything the published one does. What it lacked was evidence: that it worked on the domain its users would use, that it could not be pointed at a user's own network, that its batch parser did not lose data, that nothing in the bundle contradicted the listing. None of that is a feature, and all of it is why review took a day.

## Verdict

A Chrome extension is easy to build and slow to trust. The five April days produced a tool that worked on the machine it was written on. The September days produced one we could describe accurately to a stranger — in a store listing, a privacy policy, a permission prompt and a reviewer's queue — and every one of those descriptions forced a change in the code before it could be true.

If there is one practice to take from this, it is the packaging gate. Every rule a reviewer might apply, and every mistake you have already made once, should be a line in a script that refuses to produce the zip. We wrote it on the last day. It should have been the first.

MapWit is [on the Chrome Web Store](https://chromewebstore.google.com/detail/pdpjbbgabmnoncnlkalmffgahpdihllc). It is free, and it will tell you which dentists in Pune do not have a website.

---

*Every figure here is first-party, taken from the MapWit repository and its build between 21 April and 14 September 2026 across 16 commits, 11 of them on 12 September. Test counts are `vitest` runs on the published commit (171 passing, 16 files). Sizes are the store zip (1,259,577 bytes) and the built `dist/` directory (1,648,035 bytes). Live-Maps results are from one search session on 12 September and are a smoke test, not a benchmark. Chrome and OpenRouter behaviour is quoted from their documentation as of September 2026. This is one extension, one codebase, one author.*

## FAQ

### What does MapWit do?

MapWit is a free Chrome extension that captures the businesses in a Google Maps search into a side panel, scores each one from 1 to 10 as a sales lead, and exports them to Excel or JSON. It can open each listing for its website, phone, address and reviews, visit the business's own website for email addresses and a site-quality check, and summarise its reviews with AI using your own OpenRouter key. It is built for web studios, agencies and freelancers who sell to local businesses.

### How do you generate leads from Google Maps?

Search Google Maps for a business category in a place, such as "dentists in Pune", then qualify the results rather than calling all of them. The strongest signals are a business with no website, a poor website, or a phone number and email you can reach. MapWit does this inside Chrome: it captures the search results into a side panel, scores each business from 1 to 10, filters to the ones with no website, and exports the list to Excel.

### Is MapWit free?

Yes. MapWit has no subscription, no account and no paywall. The optional review-analysis feature uses your own OpenRouter API key, so you pay OpenRouter directly for whatever model you choose — and nothing if you never use that feature.

### Does MapWit send my data to a server?

No, MapWit has no server. Leads are stored in your browser's own extension storage. Two things leave your browser, and both are opt-in: Enrich fetches a business's own public website after you grant the optional website permission, and Analyse reviews sends review text to OpenRouter using your key. Settings lists both under "What leaves your browser".

### How does MapWit score a lead?

MapWit adds points for signals a salesperson cares about: 4 for no website, 2 each for a phone number and an email address, 2 if the business's own site scores 3 or less out of 10 for quality, 1 for a rating between 3.5 and 4.2, 1 for 50 or more reviews with no website, and 1 for missing four or more of seven social platforms. The total is clamped to 1–10; 8 and above is hot.

### Why does MapWit need permission to access all websites?

Only the Enrich feature needs it, because it visits each business's own website to look for email addresses and check site quality — and those websites could be anywhere. MapWit installs without that permission and asks for it the first time you click Enrich. It refuses to fetch private, local or internal network addresses even when it has the permission.

### Is it legal to extract business leads from Google Maps?

It depends on how you do it and what you do with the data, and this is not legal advice. Google's end-user Maps terms prohibit copying Maps content and mass downloading or creating bulk feeds of it, and business contact details can be personal data under India's DPDP Act. MapWit reads only the search you run in your own session, at a human pace, and stops at a captcha rather than solving it — but responsibility for how an exported list is used stays with the person using it.

### Does MapWit work on google.co.in?

Yes. MapWit runs on `www.google.com/maps`, `maps.google.com`, `www.google.co.in/maps` and `maps.google.co.in`. The Indian domains were added because most users in India land there, and an early version misread every business on `google.co.in` as having a website — fixed before launch and covered by tests.

### Which browsers does MapWit support?

MapWit needs Chrome 114 or later, because it runs in Chrome's side panel, which does not exist in earlier versions. It is published on the Chrome Web Store. An Edge Add-ons submission has not been made yet.

## Sources

- [Program policies: quality guidelines](https://developer.chrome.com/docs/webstore/program-policies/quality-guidelines) — Chrome for Developers, on the single-purpose requirement
- [Chrome Web Store review process](https://developer.chrome.com/docs/webstore/review-process) — Chrome for Developers
- [sidePanel API](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) — Chrome for Developers, available from Chrome 114
- [permissions API](https://developer.chrome.com/docs/extensions/reference/api/permissions) — Chrome for Developers, on optional host permissions requested from a user gesture
- [The extension service worker lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle) — Chrome for Developers, on the 30-second idle timeout
- [Additional requirements for Manifest V3](https://developer.chrome.com/docs/webstore/program-policies/mv3-requirements) — Chrome Web Store program policies, on remotely hosted code
- [storage API](https://developer.chrome.com/docs/extensions/reference/api/storage) — Chrome for Developers, on the 10 MB local quota and `unlimitedStorage`
- [URL Standard: IPv6 serializer](https://url.spec.whatwg.org/#concept-ipv6-serializer) — WHATWG
- [Server-Side Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) — OWASP
- [RFC 4291: IP Version 6 Addressing Architecture](https://www.rfc-editor.org/rfc/rfc4291) — IETF, §2.5.5.2 on IPv4-mapped addresses
- [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918) — IETF
- [RFC 6598: IANA-Reserved IPv4 Prefix for Shared Address Space](https://www.rfc-editor.org/rfc/rfc6598) — IETF
- [OpenRouter quickstart](https://openrouter.ai/docs/quickstart) — OpenRouter
- [OpenRouter API reference](https://openrouter.ai/docs/api-reference/overview) — OpenRouter, on schemas very similar to OpenAI's Chat API
- [Latest model resolution](https://openrouter.ai/docs/guides/routing/routers/latest-resolution) — OpenRouter, on `~latest` aliases
- [Reasoning tokens](https://openrouter.ai/docs/guides/best-practices/reasoning-tokens) — OpenRouter, on `reasoning.effort`
- [API rate limits](https://openrouter.ai/docs/api_reference/limits) — OpenRouter, on 20 requests a minute for free models
- [Google Maps End User Additional Terms of Service](https://www.google.com/help/terms_maps/) — Google, last modified January 2026
- [Data protection framework](https://www.meity.gov.in/data-protection-framework) — Ministry of Electronics and IT, Government of India
- [SheetJS Community Edition](https://docs.sheetjs.com/) — SheetJS, the library that writes the Excel export
