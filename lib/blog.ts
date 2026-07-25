import { getDB } from "./db";

export const POSTS_PER_PAGE = 9;

// Tag-archive thresholds. 215 distinct tags exist across 76 posts, and most appear
// once — a page per tag would be 190+ near-empty archives, which is the classic thin-
// content pattern Google devalues. So a tag earns a page only if it groups a real
// cluster, and not if it is so common the archive would duplicate /blog:
//   MSME (64/76) and India (60/76) are excluded by MAX_TAG_SHARE for that reason.
export const MIN_POSTS_PER_TAG = 3;
export const MAX_TAG_SHARE = 0.4;

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  tags: string | null;
  created_at: string;
}

export interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

/** "WhatsApp automation" -> "whatsapp-automation" */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitTags(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t && !/["[\]{}()]/.test(t));
}

/** Tags that qualify for their own archive page, most-used first. */
export async function getTagIndex(): Promise<TagInfo[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT tags FROM blog_posts WHERE published = 1 AND tags IS NOT NULL")
      .all();

    const rows = results as unknown as { tags: string | null }[];
    const counts = new Map<string, number>();
    for (const r of rows) {
      // de-dupe within a post so a repeated tag can't inflate its own count
      for (const t of new Set(splitTags(r.tags))) {
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }

    const ceiling = Math.max(MIN_POSTS_PER_TAG, Math.floor(rows.length * MAX_TAG_SHARE));
    return [...counts.entries()]
      .filter(([, n]) => n >= MIN_POSTS_PER_TAG && n <= ceiling)
      .map(([name, count]) => ({ name, slug: slugifyTag(name), count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

export async function findTagBySlug(slug: string): Promise<TagInfo | null> {
  const tags = await getTagIndex();
  return tags.find((t) => t.slug === slug) ?? null;
}

/**
 * One page of posts, newest first. Pass `tag` (the display name) to filter.
 *
 * Tags are stored as a comma-separated string rather than a relation, so matching
 * normalises ", " to "," and wraps both sides in commas — otherwise "AI" would also
 * match "AI automation". SQLite LIKE is case-insensitive for ASCII, which is what we
 * want here.
 */
export async function getPagedPosts(
  page: number,
  tag?: string
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  const empty = { posts: [], total: 0, totalPages: 0 };
  try {
    const db = getDB();
    const offset = (page - 1) * POSTS_PER_PAGE;

    const where = tag
      ? "published = 1 AND (',' || REPLACE(tags, ', ', ',') || ',') LIKE ?"
      : "published = 1";
    const params = tag ? [`%,${tag},%`] : [];

    const countRow = await db
      .prepare(`SELECT COUNT(*) AS n FROM blog_posts WHERE ${where}`)
      .bind(...params)
      .first<{ n: number }>();
    const total = countRow?.n ?? 0;

    const { results } = await db
      .prepare(
        `SELECT id, slug, title, excerpt, image_url, tags, created_at
         FROM blog_posts WHERE ${where}
         ORDER BY created_at DESC LIMIT ? OFFSET ?`
      )
      .bind(...params, POSTS_PER_PAGE, offset)
      .all();

    return {
      posts: results as unknown as BlogPost[],
      total,
      totalPages: Math.ceil(total / POSTS_PER_PAGE),
    };
  } catch {
    return empty;
  }
}

/** Clamp a `?page=` value to a sane integer. */
export function parsePage(raw: string | string[] | undefined): number {
  const n = Number(Array.isArray(raw) ? raw[0] : raw);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}
