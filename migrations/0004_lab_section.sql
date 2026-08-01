-- Split blog_posts into two sections: the automated MSME blog (/blog) and the
-- hand-written engineering blog (/lab).
--
-- APPLIED to remote D1 (cybiqon-blog) on 1 Aug 2026; all 81 existing rows took the
-- 'msme' default. Recorded here because there is no migration runner and therefore no
-- applied-migrations table to check against.
--
-- Apply by hand BEFORE the code that reads it deploys:
--
--   npx wrangler d1 execute cybiqon-blog --local  --file=migrations/0004_lab_section.sql
--   npx wrangler d1 execute cybiqon-blog --remote --file=migrations/0004_lab_section.sql
--
-- RE-RUN BEHAVIOUR — read this before you assume it matches 0003.
--
-- 0003 is safe to re-run because every statement is IF NOT EXISTS. This one is NOT,
-- and it cannot be: SQLite has no IF NOT EXISTS for ALTER TABLE ADD COLUMN, and the
-- alternative (rebuild the table, copy 76 live rows, drop, rename) trades a harmless
-- error for a destructive operation on the only content the company has.
--
-- So re-running the first ALTER fails with:
--
--   duplicate column name: section
--
-- That error is the success signal for "already applied". It aborts before touching
-- anything, and the CREATE INDEX is IF NOT EXISTS, so a partial run is recoverable by
-- executing the remaining statements on their own. What this migration must never do
-- is fail silently — the whole reason the column exists is to stop /lab posts from
-- being counted as MSME pipeline output.

-- Every existing row is MSME output. The default matters as much as the column: the
-- nightly publisher in tools/social-media-manager does not set `section`, and it must
-- keep landing in /blog without being touched.
ALTER TABLE blog_posts ADD COLUMN section TEXT NOT NULL DEFAULT 'msme';

-- Custom readouts for the /lab measurement rail: a JSON array of {label, value}, e.g.
--   [{"label":"concepts","value":"31"},{"label":"commits","value":"127"}]
--
-- Word count, reading time and source count are DERIVED from `content` at render time
-- (lib/lab.ts) and must never be stored here — a stored count silently goes stale the
-- first time a post is edited, and a blog whose whole premise is publishing real
-- numbers cannot afford a number that used to be true.
--
-- This column holds only the figures that cannot be derived: the ones a post measured
-- about something outside itself.
ALTER TABLE blog_posts ADD COLUMN readouts TEXT;

-- Covers the shape every list query uses: filter by section + published, order by date.
CREATE INDEX IF NOT EXISTS idx_blog_section ON blog_posts(section, published, created_at DESC);
