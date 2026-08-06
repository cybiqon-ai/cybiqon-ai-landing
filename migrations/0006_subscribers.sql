-- Email list for /lab. Double opt-in.
--
-- APPLIED to remote and local. The header said "NOT YET APPLIED" until 6 Aug 2026, when
-- the live `sqlite_master` listing showed `subscribers` present (0 rows). Same lapse as
-- 0005 — it shipped and this line was not updated.
--
--   npx wrangler d1 execute cybiqon-blog --local  --file=migrations/0006_subscribers.sql
--   npx wrangler d1 execute cybiqon-blog --remote --file=migrations/0006_subscribers.sql
--
-- Safe to re-run: every statement is IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS subscribers (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,

  -- Stored lowercased and trimmed by the endpoint. UNIQUE so a second signup updates
  -- the existing row rather than creating a duplicate the send script would mail twice.
  email        TEXT NOT NULL UNIQUE,

  -- One random token per subscriber, used for BOTH the confirm link and the
  -- unsubscribe link. Rotated on re-subscribe so an old confirmation email that has
  -- been forwarded or leaked cannot re-activate an address someone opted out of.
  token        TEXT NOT NULL,

  -- pending → confirmed → unsubscribed. Only 'confirmed' is ever mailed.
  status       TEXT NOT NULL DEFAULT 'pending',

  -- Which page the signup came from, so it is possible to tell later whether the form
  -- on a post converts better than the one on the index. Nothing reads it yet.
  source       TEXT,

  created_at   TEXT DEFAULT (datetime('now')),
  confirmed_at TEXT
);

-- The send script's only query: everyone confirmed.
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers (status);

-- Confirm and unsubscribe both arrive as a bare token in a URL.
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers (token);
