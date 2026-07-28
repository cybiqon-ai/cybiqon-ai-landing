/**
 * Shared helpers for the two public lead endpoints (/api/audit, /api/apply).
 *
 * Both take input from anyone on the internet, write it to D1, and paste it into an
 * HTML email we then read. That combination is why these live in one place rather than
 * being copied per route — the audit route shipped without escaping and nobody noticed
 * until a second endpoint was written from it.
 */

/**
 * Escape a value for interpolation into an HTML email body.
 *
 * The threat is not site defacement — nothing here renders in a browser tab on
 * cybiqon.in. It is that a lead notification arrives in the founder's inbox carrying an
 * attacker-chosen `<a href>` or `<img src>`, and the founder is exactly the person
 * primed to click a link in a message titled "new lead". Escaping makes the email show
 * what the sender actually typed.
 *
 * Covers the five characters that can break out of either text content or an attribute
 * value. This is an HTML escaper only — not a URL or JavaScript one.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * A stable per-client key for rate limiting.
 *
 * This is data minimisation, NOT anonymisation. A SHA-256 of an IPv4 address is
 * reversible by anyone willing to hash four billion candidates, which is minutes of
 * compute. The narrower point still holds: we get the throttling without keeping a
 * plaintext visitor-IP log in the database indefinitely.
 *
 * Cloudflare sets CF-Connecting-IP itself and strips any client-supplied copy, so unlike
 * X-Forwarded-For it cannot be spoofed by the caller. Returns null when the header is
 * absent — the call site decides what that means, and both currently choose to let the
 * request through rather than reject a real lead over a missing header.
 */
export async function clientIpHash(request: Request): Promise<string | null> {
  const ip = request.headers.get("CF-Connecting-IP");
  if (!ip) return null;

  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Endpoints that share the rate_limit_hits table. */
export type RateLimitScope = "audit" | "apply";

/**
 * True when this client has already submitted `max` times inside the window.
 *
 * Throws rather than returning false if the query fails. That is deliberate: a rate
 * limiter that fails open on a database error is a rate limiter that stops existing the
 * moment it is under load, which is the one moment it is needed. The caller catches and
 * decides.
 */
export async function isRateLimited(
  db: D1Database,
  scope: RateLimitScope,
  ipHash: string,
  { max, windowMinutes }: { max: number; windowMinutes: number }
): Promise<boolean> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM rate_limit_hits
        WHERE scope = ? AND ip_hash = ? AND created_at > datetime('now', ?)`
    )
    .bind(scope, ipHash, `-${windowMinutes} minutes`)
    .first<{ n: number }>();

  return (row?.n ?? 0) >= max;
}

/**
 * Record a submission and drop hits older than a day.
 *
 * Batched so the cleanup costs no extra round-trip. Without it the table grows forever
 * to serve a lookup that never looks back more than an hour.
 */
export async function recordSubmission(
  db: D1Database,
  scope: RateLimitScope,
  ipHash: string
): Promise<void> {
  await db.batch([
    db.prepare("INSERT INTO rate_limit_hits (scope, ip_hash) VALUES (?, ?)").bind(scope, ipHash),
    db.prepare("DELETE FROM rate_limit_hits WHERE created_at < datetime('now', '-1 day')"),
  ]);
}
