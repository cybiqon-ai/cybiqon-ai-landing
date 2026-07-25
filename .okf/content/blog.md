---
type: Domain
title: Blog
description: Posts are rows in Cloudflare D1, not files — written by a different repo, rendered by a live edge query, and served through server-paginated index and tag-archive routes.
tags: [blog, d1, cloudflare, content, edge]
timestamp: 2026-07-25T17:42:26Z
---

# Overview

There is **no MDX, no CMS and no `content/` directory**. Blog posts are rows in
the Cloudflare D1 database `cybiqon-blog`, and this repo only *reads* them.

**Posts are authored and inserted by `tools/social-media-manager`** — a separate
repo running a daily Claude-agent pipeline. Nothing in this repo creates a post.

76 posts live, 15 Mar → 25 Jul 2026, roughly one per day.

# Table

```sql
CREATE TABLE blog_posts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT UNIQUE NOT NULL,
  title      TEXT NOT NULL,
  excerpt    TEXT,
  content    TEXT NOT NULL,   -- HTML, pre-rendered at publish time
  image_url  TEXT,            -- absolute, on media.cybiqon.in (R2)
  topic      TEXT,
  angle      TEXT,            -- pain_point | education | outcome | news_hook
  tags       TEXT,            -- comma-separated string, not a relation
  published  BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

`content` is **HTML**, not markdown — the publishing script renders it before
insert, so the site does no markdown processing at all.

# Rendering

**Index** (`app/blog/page.tsx`, edge) — server-paginated via `?page=N`, 9 per
page, through `lib/blog.ts::getPagedPosts`. Renders the **server** component
`components/blog/BlogList.tsx` → `BlogCard.tsx`.

⚠️ **This replaced a client-side paginator on 25 Jul 2026, and the reason matters.**
The old version fetched `LIMIT 30` and held the page number in `useState`, so it
rendered **9 post links out of 76** with no paginated URLs at all. Of 76 posts: 9
were linked in HTML, 21 sat behind a paginator with no `href`, and **46 were not on
`/blog` in any form** — reachable only through `sitemap.xml`. Sitemap-only URLs are
precisely what Google parks under *"Discovered — currently not indexed"*.

Now every post is reachable by walking `/blog?page=1..9` (verified live: 76/76),
and `rel="prev"`/`rel="next"` are emitted.

**Detail** (`app/blog/[slug]/page.tsx`, edge): `SELECT * … WHERE slug = ? AND
published = 1`, `notFound()` if missing. `generateMetadata` runs a **second**
query. Content is injected with `dangerouslySetInnerHTML` after an H1→H2 rewrite
(the page supplies its own H1). Reading time is words ÷ 200.

# Two consequences worth knowing

**No static generation.** There is no `generateStaticParams` and no ISR, so
**every post render is a live D1 query at the edge** — and the detail page runs
two. Acceptable at current traffic; the first thing to change if it grows.

**Tag archives exist as of 25 Jul 2026** — `/blog/tag/<slug>`, server-rendered
and paginated. They are gated: a tag needs **≥3 posts and ≤40% share** to earn a
page. 215 distinct tags exist across 76 posts and most appear once, so a page per
tag would be 190+ thin archives; `MSME` (64/76) and `India` (60/76) are excluded
as too generic to be anything but a duplicate of `/blog`. That leaves **21 real
clusters**.

Tag matching wraps both sides in commas — `',' || REPLACE(tags, ', ', ',') || ','
LIKE '%,AI,%'` — so `AI` cannot also match `AI automation`. Verified against live
D1: `AI` returns 9, not 25.

# Trusting the HTML

`dangerouslySetInnerHTML` is safe *here* because the only writer is the company's
own publishing script. It would stop being safe the moment anything else could
insert a row — worth remembering if the blog ever accepts guest posts.

# Images

`image_url` points at R2 via `media.cybiqon.in`. Commit `6657e66` fixed thumbnails
failing to load under **Cloudflare Hotlink Protection** — worth knowing if images
break again.

# See also

- [SEO](/site/seo.md) — missing RSS and tag routes
- [Stack & deployment](/site/stack.md) — the D1 binding and edge runtime
- The `social-media-manager` bundle — where posts actually come from
