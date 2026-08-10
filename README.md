# cybiqon-ai-landing

The Cybiqon website — [cybiqon.in](https://cybiqon.in). Marketing pages, a product
catalogue, and two blogs.

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind + shadcn/ui · Cloudflare
Pages.** Content lives in Cloudflare D1; images in R2, served from `media.cybiqon.in`.

## Running it

```sh
npm install
bash ../../ops/scripts/install-hooks.sh   # once per clone — installs the pre-push gate
npm run dev            # http://localhost:3000
```

The hook runs `npm run check:llms` before every push and blocks if `llms.txt` would be
wrong — most often because a new page under `app/` is not listed in
`data/llms.config.json`. Git hooks are not tracked, so a fresh clone has no gate until
you run that installer.

`npm run dev` is fine for layout and styling work, but it does **not** exercise the
Cloudflare runtime. Anything touching D1, R2 or an edge route needs a real build:

```sh
npx @cloudflare/next-on-pages
npx wrangler pages dev .vercel/output/static
```

## Two things that will catch you out

**`npm run build` passing does not mean the site deploys.** It runs `next build`, which
knows nothing about Cloudflare. The build that actually ships is
`npx @cloudflare/next-on-pages`, and it fails on things `next build` accepts — most
notably a dynamic route without `runtime = "edge"`, which emits a Node fallback that
Cloudflare rejects.

**There is a hard 3 MiB limit on the Worker bundle**, and it is enforced when the
deploy *uploads*, not when it builds — so a local build can succeed and the deploy
still fail. Each React page compiled for the edge costs roughly 440 KiB gzipped and each
route handler about 100 KiB, which is a budget of about six pages. Before adding one:

```sh
npx @cloudflare/next-on-pages
find .vercel/output/static/_worker.js -name '*.js' -exec gzip -c {} + | wc -c
```

## Content

`/blog` is generated daily by a separate private repo. `/lab` is written by hand;
its posts live in `lab/posts/*.md` and are published to D1 by a script in that same
repo. Both share one D1 table, separated by a `section` column — **every query against
`blog_posts` must filter on it**, because slugs are unique table-wide and an unscoped
read will serve one section's post inside the other's chrome.

## Database

There is no migration runner. `migrations/*.sql` are applied by hand, in order, and each
file records whether it has been applied:

```sh
npx wrangler d1 execute cybiqon-blog --local  --file=migrations/000N_name.sql
npx wrangler d1 execute cybiqon-blog --remote --file=migrations/000N_name.sql
```

## Deploying

Cloudflare Pages builds on push. **`main` is the live site** — there is no staging
environment. Push a branch and check its preview deployment first.

## `.okf/`

`.okf/` is a knowledge bundle: how this repo actually works, including the parts that are
broken and why. Start at [`.okf/index.md`](.okf/index.md). Where it and this README
disagree, the bundle is current. Keep it updated in the same commit as the code.
