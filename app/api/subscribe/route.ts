import { getRequestContext } from "@cloudflare/next-on-pages";
import { z } from "zod";
import { clientIpHash, escapeHtml, isRateLimited, recordSubmission } from "@/lib/leads";

export const runtime = "edge";

const SITE = "https://cybiqon.in";
const MAX_PER_HOUR = 3;

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  // Which form it came from. Not user-facing; clamped rather than validated hard.
  source: z.string().max(60).optional(),
});

/**
 * Double opt-in signup for the /lab list.
 *
 *   POST  { email, source }            → create/refresh a pending row, send confirm mail
 *   GET   ?confirm=<token>             → activate, redirect to /lab?subscribed=1
 *   GET   ?unsubscribe=<token>         → deactivate, redirect to /lab?unsubscribed=1
 *
 * Confirm and unsubscribe are GETs on this same route rather than pages, deliberately:
 * a page route costs ~420 KiB in the Worker against a 3 MiB ceiling, and a route
 * handler that redirects costs nothing extra. See .okf/content/lab.md on the budget.
 */

/**
 * Every POST answers identically — including for an address that is already confirmed,
 * or that has unsubscribed. Telling the caller which it was turns this endpoint into an
 * oracle for "is this person on the list", which is a real privacy leak and the reason
 * mature signup forms are vague. The reader loses nothing: the honest cases all end
 * with "go and check your email".
 */
const SAME_ANSWER = { ok: true, message: "Almost there — check your email to confirm." };

export async function POST(request: Request): Promise<Response> {
  // Parsed outside the main try so a malformed or empty body is a 400, not a 500.
  // Only the form sends here, so this is not a user-facing case — but reporting a
  // client error as a server error is how a monitoring alert ends up pointing at the
  // wrong thing at the wrong hour.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  try {
    const parsed = subscribeSchema.safeParse(raw);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { email, source } = parsed.data;
    const { env } = getRequestContext();

    // This endpoint sends outbound mail, so unlimited it is a way for a stranger to
    // burn the Resend quota and get cybiqon.in reported for unsolicited confirmations.
    const ipHash = await clientIpHash(request);
    if (ipHash) {
      try {
        if (
          await isRateLimited(env.DB, "subscribe", ipHash, {
            max: MAX_PER_HOUR,
            windowMinutes: 60,
          })
        ) {
          // Deliberately not an error the form styles differently — a person who
          // genuinely double-submitted should just be told to check their inbox.
          return Response.json(SAME_ANSWER);
        }
      } catch {
        // Limiter unavailable. Prefer an extra signup over a dropped one.
      }
    }

    const existing = await env.DB.prepare(
      "SELECT status FROM subscribers WHERE email = ?"
    )
      .bind(email)
      .first<{ status: string }>();

    // Already on the list and confirmed: do nothing, say the same thing. Re-sending a
    // confirmation to a confirmed subscriber is how people end up marking mail as spam.
    if (existing?.status === "confirmed") return Response.json(SAME_ANSWER);

    // New token on every signup attempt, including re-subscribe after an opt-out, so an
    // old confirm link that leaked cannot reactivate an address someone opted out of.
    const token = crypto.randomUUID().replace(/-/g, "");

    await env.DB.prepare(
      `INSERT INTO subscribers (email, token, status, source) VALUES (?, ?, 'pending', ?)
       ON CONFLICT(email) DO UPDATE SET
         token = excluded.token, status = 'pending', source = excluded.source`
    )
      .bind(email, token, source ?? null)
      .run();

    await sendConfirmation(env, email, token);

    if (ipHash) {
      try {
        await recordSubmission(env.DB, "subscribe", ipHash);
      } catch {
        // Throttle bookkeeping is not worth failing an accepted signup over.
      }
    }

    return Response.json(SAME_ANSWER);
  } catch {
    return Response.json(
      { error: "Could not sign you up just now. Try again in a moment." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const confirm = url.searchParams.get("confirm");
  const unsubscribe = url.searchParams.get("unsubscribe");
  const token = (confirm ?? unsubscribe ?? "").trim();

  const back = (query: string) =>
    Response.redirect(`${SITE}/lab?${query}`, 302);

  if (!token || !/^[a-f0-9]{32}$/.test(token)) return back("subscribe=invalid");

  try {
    const { env } = getRequestContext();

    if (confirm) {
      // Only a pending row can be confirmed, so replaying a confirm link after an
      // unsubscribe cannot silently put someone back on the list.
      const res = await env.DB.prepare(
        `UPDATE subscribers SET status = 'confirmed', confirmed_at = datetime('now')
         WHERE token = ? AND status = 'pending'`
      )
        .bind(token)
        .run();

      const changed = res.meta?.changes ?? 0;
      // A token that matched nothing is either expired, already used, or wrong. Already
      // used is the common case and is not a failure worth alarming anyone about.
      return back(changed > 0 ? "subscribed=1" : "subscribe=already");
    }

    await env.DB.prepare(
      "UPDATE subscribers SET status = 'unsubscribed' WHERE token = ?"
    )
      .bind(token)
      .run();

    return back("unsubscribed=1");
  } catch {
    return back("subscribe=error");
  }
}

async function sendConfirmation(
  env: { RESEND_API_KEY?: string },
  email: string,
  token: string
): Promise<void> {
  if (!env.RESEND_API_KEY) return;

  const confirmUrl = `${SITE}/api/subscribe?confirm=${token}`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Cybiqon Lab <noreply@cybiqon.in>",
        to: email,
        subject: "Confirm your Cybiqon Lab subscription",
        // Plain and specific. A confirmation mail that oversells itself is the one
        // people report; this one says what it is and what happens if they ignore it.
        html: `<p>You asked for new posts from <strong>Cybiqon Lab</strong> — engineering notes from Cybiqon.</p>
<p><a href="${escapeHtml(confirmUrl)}">Confirm your subscription</a></p>
<p style="color:#666">A few emails a year, when there is a new post. Nothing else, ever.</p>
<p style="color:#666">If you didn't ask for this, ignore this email — nothing happens without that click.</p>`,
        text: `You asked for new posts from Cybiqon Lab.

Confirm: ${confirmUrl}

A few emails a year, when there is a new post. Nothing else, ever.
If you didn't ask for this, ignore this email — nothing happens without that click.`,
      }),
    });
  } catch {
    // The row stays pending and the reader can sign up again. Failing the request here
    // would tell them nothing useful and lose the address we just captured.
  }
}
