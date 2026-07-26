-- Launch-5 applications — the offer at /free-website — plus shared rate limiting.
--
-- There is no migration runner in this repo. Apply by hand BEFORE the code that reads
-- it deploys:
--
--   npx wrangler d1 execute cybiqon-blog --remote --file=migrations/0003_launch5_applications.sql
--
-- Safe to re-run. Every statement is IF NOT EXISTS, deliberately: an ALTER TABLE ADD
-- COLUMN would have been the obvious way to add rate limiting to the existing
-- audit_leads, but SQLite has no IF NOT EXISTS for it, so a second run would fail. A
-- migration you are afraid to re-run is a migration nobody re-runs after a restore.

CREATE TABLE IF NOT EXISTS launch5_applications (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT NOT NULL,
  business     TEXT NOT NULL,
  phone        TEXT NOT NULL,          -- WhatsApp number; how we actually reply
  email        TEXT,                   -- optional: many MSMEs have no working email
  city         TEXT NOT NULL,
  about        TEXT NOT NULL,          -- what the business does, in their words
  current_url  TEXT,                   -- existing site / Instagram / JustDial listing

  -- The offer is a trade: a free site for a video testimonial, a Google review, name
  -- and logo rights, and case-study rights. The playbook requires that agreed in
  -- writing BEFORE work starts, so the consent is recorded with the application rather
  -- than inferred from the fact that somebody submitted a form.
  agreed_trade INTEGER NOT NULL DEFAULT 0,

  -- new → contacted → accepted → delivered, or rejected.
  -- A SLOT is 'accepted', never 'new'. Applications are not slots; counting them as
  -- slots would show the offer as full while nothing had actually been agreed.
  status       TEXT NOT NULL DEFAULT 'new',

  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_launch5_status ON launch5_applications (status);

-- Throttling for both public lead endpoints (/api/audit and /api/apply). Separate from
-- the leads tables on purpose: these rows are operational exhaust with a one-day life,
-- and keeping them apart means they can be purged without going anywhere near a lead.
--
-- ip_hash is a truncated SHA-256. That is data minimisation, not anonymisation — see
-- the comment on clientIpHash() in lib/leads.ts for why the difference matters.
CREATE TABLE IF NOT EXISTS rate_limit_hits (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  scope      TEXT NOT NULL,            -- 'audit' | 'apply'
  ip_hash    TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_lookup ON rate_limit_hits (scope, ip_hash, created_at);
