---
type: Domain
title: Lead capture
description: Two forms writing to D1 and emailing via Resend, sharing one rate limiter — plus a set of off-site CTAs that nothing measures.
tags: [leads, forms, d1, resend, conversion, rate-limiting]
timestamp: 2026-07-26T00:00:00Z
---

# Overview

The site has **two forms**, both edge routes, both writing to the same D1 database as
the blog.

```
/free-audit                             /free-website
   └─ components/AuditForm.tsx             └─ components/free-website/ApplyForm.tsx
      POST /api/audit                         POST /api/apply
        ├─> rate limit (3/hr per IP hash)       ├─> rate limit (3/hr per IP hash)
        ├─> INSERT audit_leads                  ├─> INSERT launch5_applications
        └─> Resend → support@cybiqon.in         └─> Resend → support@cybiqon.in
```

| Table | Migration |
|---|---|
| `audit_leads` | `0002_audit_leads.sql` |
| `launch5_applications` | `0003_launch5_applications.sql` |
| `rate_limit_hits` | `0003_launch5_applications.sql` |

**There is no migration runner**, and so no applied-migrations table to check against.
Migrations are applied by hand, and each file records the date it was applied in its
header — that header is the only record, so keep it accurate.

`0003` was applied on **26 Jul 2026**. Both tables verified live, indexes present.

```bash
npx wrangler d1 execute cybiqon-blog --remote --file=migrations/0003_launch5_applications.sql
```

Every statement is `IF NOT EXISTS` so a re-run is safe. That is why rate limiting got its
own table rather than an `ip_hash` column on `audit_leads` — SQLite has no
`ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, and a migration you are afraid to re-run is a
migration nobody re-runs after a restore.

# The two failure models differ, deliberately

**`/api/audit` treats the D1 insert as fatal.** The row is the durable artifact; a Resend
failure is caught and swallowed.

**`/api/apply` does not.** Its table arrives via a hand-applied migration, so the
realistic failure on day one is *the table does not exist yet*. An applicant must not pay
for that. So the insert is best-effort, and if it fails:

- the notification email still goes out, carrying the full application,
- its subject is prefixed **`[DB FAILED]`** and the body opens with a red banner naming
  the migration,
- only if **both** sinks fail does the user see an error — and that error hands them the
  WhatsApp number, which does not depend on our infrastructure.

Returning `{ success: true }` when nothing was recorded anywhere would be the exact
silent-failure pattern this company has been bitten by repeatedly. The rule holds: a
thing that can fail quietly must report a count, not a status.

# Rate limiting

`lib/leads.ts` — shared by both routes. 3 submissions per IP per hour, keyed on a
truncated SHA-256 of `CF-Connecting-IP`.

Two judgement calls worth keeping:

**The hash is data minimisation, not anonymisation.** A SHA-256 of an IPv4 address is
reversible by anyone willing to hash four billion candidates. The point is only that we
do not keep a plaintext visitor-IP log in the leads database forever. Do not describe it
to anyone as anonymised.

**A missing `CF-Connecting-IP`, or a limiter query that throws, lets the request
through.** Failing open is the right trade here: there are five slots in total and the
blast radius of abuse is a noisy inbox, whereas rejecting costs a real lead. `isRateLimited`
throws rather than returning `false` precisely so the call site makes that choice
explicitly instead of inheriting it.

`rate_limit_hits` rows older than a day are deleted in the same batch as each insert, so
the table cannot grow unbounded serving a lookup that never looks back past an hour.

# Fixed 26 Jul 2026

- **Unescaped user input in the notification email** — both routes now run every
  interpolated value through `escapeHtml`. The blast radius was always small (it lands in
  the founder's own inbox) but "new lead" is exactly the subject line that makes a
  stranger's `<a href>` clickable.
- **No rate limiting** on public endpoints that trigger outbound email — see above.

# Still open

- **No captcha.** Rate limiting raises the cost of abuse; it does not stop a determined
  script. Revisit only if abuse actually happens.
- **No conversion tracking.** GA4 is loaded and fires **no event on either form's
  success**. The site's only measurable conversions remain unmeasured — and now there are
  two of them. This is the highest-value remaining gap in this concept.

# Everything else is off-site

| CTA | Where |
|---|---|
| WhatsApp `wa.me/919250711473` | Navbar, Footer, WhatsAppWidget, BlogCTA, pricing, faq, `/free-website` |
| `mailto:support@cybiqon.in` | Footer, contact |
| TidyCal booking | pricing, faq, contact |

**None of these fire an analytics event either**, so the site cannot answer which CTA
works.

# The bigger miss

**There is no newsletter signup anywhere.** 76 blog posts have been published with no
email capture on any of them — every reader arrives, reads, and leaves with no way to be
reached again. For a content engine running daily, this is the largest unclaimed
conversion surface on the site.

# See also

- [Routes](/site/routes.md) — the API surface
- [Content data](/content/content-data.md) — `data/launch5.ts`, where the offer copy lives
- [SEO](/site/seo.md) — why conversions aren't measured
