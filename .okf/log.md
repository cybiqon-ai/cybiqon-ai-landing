# Update Log

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
