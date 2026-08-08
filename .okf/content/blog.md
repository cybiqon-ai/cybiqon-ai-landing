---
type: Domain
title: Blog
description: The automated MSME blog at /blog — posts are rows in Cloudflare D1, not files, written by a different repo and rendered by a live edge query. Shares its table with /lab, separated by a section column.
tags: [blog, d1, cloudflare, content, edge, msme]
timestamp: 2026-08-06T00:00:00Z
---

# Overview

This concept describes **`/blog`, the automated MSME blog**. The same `blog_posts`
table also holds `/lab`, the hand-written engineering blog — see [Lab](lab.md).
Everything below is scoped to `section = 'msme'`.

There is **no MDX, no CMS and no `content/` directory**. Blog posts are rows in
the Cloudflare D1 database `cybiqon-blog`, and this repo only *reads* them.

**Posts are authored and inserted by `tools/social-media-manager`** — a separate
repo running a daily Claude-agent pipeline. Nothing in this repo creates a post.

81 MSME posts live as of 1 Aug 2026, 15 Mar → 31 Jul, roughly one per day.

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
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  section    TEXT NOT NULL DEFAULT 'msme',  -- 'msme' | 'lab'  (migration 0004)
  readouts   TEXT,            -- /lab only, JSON [{label, value}]  (migration 0004)
  views      INTEGER NOT NULL DEFAULT 0,    -- /lab only            (migration 0005)
  seo_title  TEXT,            -- /lab only, NULL = same as title    (migration 0007)
  updated_at DATETIME         -- /lab only, NULL = never edited     (migration 0007)
);
```

The last three are `/lab`-only in practice but table-wide in the schema. `views` is
`NOT NULL DEFAULT 0` so every MSME row starts at a real zero; `seo_title` and
`updated_at` are nullable because for those two, NULL carries meaning — see
[Lab](lab.md#the-section-column).

⚠️ **`section` must appear in every read of this table.** Slugs are unique
table-wide rather than per section, so an unscoped query does not just return
extra rows — it serves a `/lab` post from `/blog/<slug>` in the marketing chrome.
The nightly publisher does **not** set `section` and relies on the `'msme'`
default, which is why the default exists. Full account in [Lab](lab.md).

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

- [Lab](lab.md) — the hand-written half of the same table, and the section split
- [SEO](/site/seo.md) — what is indexed and what is still missing
- [Stack & deployment](/site/stack.md) — the D1 binding and edge runtime
- The `social-media-manager` bundle — where posts actually come from
