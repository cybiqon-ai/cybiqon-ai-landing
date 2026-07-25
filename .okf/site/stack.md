---
type: Architecture
title: Stack & deployment
description: Next.js 16 App Router built with next-on-pages and served from Cloudflare Pages, with D1 and R2 bindings — and a push to main that deploys production directly.
tags: [nextjs, cloudflare, pages, deployment, tailwind]
timestamp: 2026-07-25T00:00:00Z
---

# Overview

| | |
|---|---|
| Framework | **Next.js 16.2.1, App Router** (`app/`, no `pages/`, no `src/`) |
| React | 19.2.4 |
| Language | TypeScript 5.8 — **`strict: false`, `strictNullChecks: false`** |
| Styling | Tailwind 3.4 + `tailwindcss-animate` + `@tailwindcss/typography`, shadcn/ui (slate, CSS vars), Radix, lucide-react |
| Fonts | `next/font/google` Geist |
| Package manager | npm, with `.npmrc` → `legacy-peer-deps=true` |
| Host | **Cloudflare Pages** via `@cloudflare/next-on-pages` |

`next-themes` is installed but unused in the layout.

# Deployment

```bash
npm run pages:build   # npx @cloudflare/next-on-pages → .vercel/output/static
```

`wrangler.toml` sets `pages_build_output_dir = ".vercel/output/static"`,
`nodejs_compat`, and two bindings:

| Binding | Resource |
|---|---|
| `DB` | D1 `cybiqon-blog` (`0a9bcd34-…ebab`) |
| `BLOG_IMAGES` | R2, served at `media.cybiqon.in` |

**There is no CI.** No `.github/`, no `vercel.json`, no Dockerfile. Cloudflare
Pages' Git integration builds on push to `main`.

> ⚠️ **A push to `main` deploys the live public site.** There is no staging
> environment, no preview gate, and no workflow file that would make this visible
> in the repo. `cybiqon-ops/scripts/sync.sh` prints this side-effect next to the
> repo name for exactly that reason.

# Runtime model

Pages that touch D1 declare `export const runtime = "edge"` — the blog index, the
blog detail page, `sitemap.ts`, and all three API routes.

`lib/db.ts` is the entire data layer:

```ts
export function getDB(): D1Database { return getRequestContext().env.DB; }
```

That means **every blog page render is a live D1 query at the edge**. There is no
`generateStaticParams` and no ISR. Fine at current traffic; the first thing to
revisit if it grows.

# Images

`next.config.mjs` installs a **custom passthrough loader** (`lib/image-loader.ts`)
— Next's image optimisation is disabled entirely. Whatever is uploaded is what
ships, which is why the blog pipeline optimises images with Pillow before pushing
them to R2.

Portfolio images are hand-converted WebP in `public/portfolio/` (15 files), after
commit `646406e` dropped 24 MB of deploy bloat.

# Secrets

Set out-of-band via `wrangler pages secret put`, never committed:
`RESEND_API_KEY` (used by [lead capture](/content/lead-capture.md)). Local
development uses `.dev.vars`, which is gitignored.

**This is the org's only public repo.** The discipline matters more here than
anywhere else.

# Branch model

Numbered issue branches (`1-sectional-pages` … `30-seo-optimization`), plus
`feat/…` and `redesign/…`, merged via PRs into `main`.

# See also

- [Routes](/site/routes.md) — what is actually served
- [Blog](/content/blog.md) — the D1-backed content system
- [SEO](/site/seo.md) — what the edge rendering does and doesn't give us
