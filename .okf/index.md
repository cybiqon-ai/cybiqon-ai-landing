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

`README.md` is **stale** — it still describes Vite + React from before the Next
migration. `AUDIT.md` is an earlier SEO audit; some of its findings have since
been fixed (sitemap, Article schema) and some are still open — the concepts here
are current.

`features/` holds opt-in experimental components, two of which contain **invented
social proof** (`LiveActivityTicker`, `SocialProofBar`). Check before reusing.
