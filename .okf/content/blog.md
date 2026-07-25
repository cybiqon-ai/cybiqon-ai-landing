---
type: Domain
title: Blog
description: Posts are rows in Cloudflare D1, not files — written and inserted by a different repo, and rendered by a live edge query on every request.
tags: [blog, d1, cloudflare, content, edge]
timestamp: 2026-07-25T00:00:00Z
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

**Index** (`app/blog/page.tsx`, edge):

```sql
SELECT id, slug, title, excerpt, image_url, tags, created_at
FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT 30
```

wrapped in try/catch → empty state on failure. Rows go to
`components/blog/BlogTagFilter.tsx` (client-side tag filter, max 8 tags, 9 posts
per page) → `components/blog/BlogCard.tsx`.

**Detail** (`app/blog/[slug]/page.tsx`, edge): `SELECT * … WHERE slug = ? AND
published = 1`, `notFound()` if missing. `generateMetadata` runs a **second**
query. Content is injected with `dangerouslySetInnerHTML` after an H1→H2 rewrite
(the page supplies its own H1). Reading time is words ÷ 200.

# Two consequences worth knowing

**No static generation.** There is no `generateStaticParams` and no ISR, so
**every post render is a live D1 query at the edge** — and the detail page runs
two. Acceptable at current traffic; the first thing to change if it grows.

**Tags have no URLs.** They are stored on every row and filtered entirely
client-side, so there are no `/blog/tag/[tag]` routes for search to index.
`components/blog/TagPill.tsx` is display-only. Free SEO surface, unclaimed.

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
