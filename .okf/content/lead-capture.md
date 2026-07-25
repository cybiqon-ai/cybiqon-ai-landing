---
type: Domain
title: Lead capture
description: One form on the whole site, writing to D1 and emailing via Resend — plus a set of off-site CTAs that nothing measures.
tags: [leads, forms, d1, resend, conversion]
timestamp: 2026-07-25T00:00:00Z
---

# Overview

The site has exactly **one form**.

```
/free-audit
   └─ components/AuditForm.tsx        react-hook-form + zod
        name ≥2 · email · phone ^\d{10,}$ · website_url URL
      POST /api/audit                 (edge)
        │  re-validates with the same zod schema
        ├─> INSERT INTO audit_leads (name, email, phone, website_url)   [D1]
        └─> POST https://api.resend.com/emails
              from noreply@cybiqon.in → to support@cybiqon.in
```

`audit_leads` is defined in `migrations/0002_audit_leads.sql` with `status`
defaulting to `'new'`, and lives in the **same D1 database as the blog**.

# Design notes

**Validation runs twice**, client and server, from the same zod schema — correct,
since the client check is only UX.

**The email is best-effort.** A Resend failure is caught and swallowed, so the
lead is still stored. Right call: the D1 row is the durable artifact and losing it
would be far worse than a missed notification. But it does mean **a silent
notification failure looks like "no leads"** — a pattern this company has been
bitten by elsewhere.

# Gaps

- **No captcha and no rate limiting** on a public endpoint that triggers outbound
  email.
- The HTML email body **interpolates user input unescaped**. Low blast radius — it
  lands in the founder's own inbox — but it should be escaped.
- **No conversion tracking.** GA4 is loaded but fires no event on form success. The
  one measurable conversion on the site is unmeasured.

# Everything else is off-site

| CTA | Where |
|---|---|
| WhatsApp `wa.me/919250711473` | Navbar, Footer, WhatsAppWidget, BlogCTA, pricing, faq |
| `mailto:support@cybiqon.in` | Footer, contact |
| TidyCal booking | pricing, faq, contact |

**None of these fire an analytics event either**, so the site cannot answer which
CTA works.

# The bigger miss

**There is no newsletter signup anywhere.** 76 blog posts have been published with
no email capture on any of them — every reader arrives, reads, and leaves with no
way to be reached again. For a content engine running daily, this is the largest
unclaimed conversion surface on the site.

# What's coming

The Launch-5 free-website offer needs `/free-website` plus
`app/api/apply/route.ts`. **Clone `app/api/audit/route.ts`** — same shape: zod
validate, D1 insert, best-effort Resend notification. Add the rate limiting and
escaping that route is missing while you're there.

# See also

- [Routes](/site/routes.md) — the API surface
- [SEO](/site/seo.md) — why conversions aren't measured
