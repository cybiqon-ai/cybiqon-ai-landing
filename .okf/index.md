---
okf_version: "0.1"
---

# cybiqon-ai-landing — Knowledge Bundle

OKF bundle for `cybiqon-ai-landing` — the company's marketing site at
**cybiqon.in**. Next.js 16 App Router on Cloudflare Pages, with a blog backed by
Cloudflare D1.

⚠️ **This is the only public repo in the org, and a push to `main` deploys the
live site.** No staging, no workflow file, no approval step. Never commit a
secret here.

# Site

* [Site](site/) - stack and deployment, the route map, the Ledger design system, and the SEO gaps that matter commercially.

# Content

* [Content](content/) - two blogs sharing one D1 table, and where lead capture goes.

The site publishes **`/blog`** (automated, MSME, daily, written by
`tools/social-media-manager`) and **`/lab`** (hand-written engineering notes, no
schedule). They are one table separated by a `section` column, and slugs are unique
across both — read [Lab](content/lab.md) before writing any query against
`blog_posts`.

# Reading notes

`README.md` was **rewritten on 1 Aug 2026** and is now accurate — it had described
Vite + React from before the Next migration. It covers the two traps that bite hardest:
`npm run build` passing does not mean the site deploys, and the Worker has a 3 MiB
ceiling enforced at upload.

`AUDIT.md` and `blog_implementation_plan.md` were **deleted** the same day. Both were
superseded by these concepts and both still described behaviour that had since changed —
a stale document that looks authoritative is worse than none, and `log.md` records one
occasion where a claim from `AUDIT.md` was repeated without being verified.

`features/` was **deleted** — 4 files, zero importers, two containing invented social
proof. See [content data](content/content-data.md) for what was in it and what is
still live.
