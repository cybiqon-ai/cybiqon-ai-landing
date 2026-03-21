CREATE TABLE IF NOT EXISTS audit_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website_url TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'new'
);
