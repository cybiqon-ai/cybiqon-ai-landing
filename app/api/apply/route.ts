import { getRequestContext } from "@cloudflare/next-on-pages";
import { z } from "zod";
import { escapeHtml, clientIpHash, isRateLimited, recordSubmission } from "@/lib/leads";

export const runtime = "edge";

/**
 * Launch-5 applications. Cloned in shape from /api/audit, but this one is allowed to
 * lose the database and still keep the lead — see the ordering comment below.
 */

const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  business: z.string().trim().min(2, "Please enter your business name").max(120),
  // Indian mobile numbers are ten digits starting 6–9. Accepts spaces, dashes and a
  // +91 prefix because that is how people actually type their own number.
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+?91)/, ""))
    .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a 10-digit Indian mobile number"),
  email: z.string().trim().email("That email address doesn't look right").max(120).optional().or(z.literal("")),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  about: z.string().trim().min(10, "Tell me a little more — one or two lines is fine").max(1000),
  current_url: z.string().trim().max(300).optional().or(z.literal("")),
  // The offer is conditional on this. A false here is a validation failure, not a
  // stored preference — there is nothing to build if the trade isn't agreed.
  agreed_trade: z.literal(true, {
    errorMap: () => ({ message: "The free site is a trade — please confirm you're in" }),
  }),
});

const MAX_PER_HOUR = 3;

export async function POST(request: Request) {
  let parsedName = "";

  try {
    const body = await request.json();
    const parsed = applySchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { name, business, phone, email, city, about, current_url } = parsed.data;
    parsedName = name;
    const { env } = getRequestContext();

    // ── Rate limit ────────────────────────────────────────────────────────────
    // A missing CF-Connecting-IP means we cannot identify the client, so the request
    // goes through. Rejecting instead would trade a rare abuse case for the certainty
    // of dropping real applications, and there are five slots in total — the blast
    // radius of abuse here is a noisy inbox, not a compromise.
    const ipHash = await clientIpHash(request);
    if (ipHash) {
      try {
        if (await isRateLimited(env.DB, "apply", ipHash, { max: MAX_PER_HOUR, windowMinutes: 60 })) {
          return Response.json(
            { error: "You've already applied. I'll be in touch on WhatsApp within 24 hours." },
            { status: 429 }
          );
        }
      } catch {
        // The limiter itself is down. Let the application through — a lost lead costs
        // more than an extra row, and the insert below is still the real record.
      }
    }

    // ── Store ─────────────────────────────────────────────────────────────────
    // Deliberately NOT fatal. This table is created by a hand-applied migration
    // (0003), so the realistic failure is that it does not exist yet on the day this
    // deploys. The applicant must not pay for that: the email below is a complete
    // record of the lead on its own, and it shouts when the write failed.
    let stored = true;
    try {
      await env.DB.prepare(
        `INSERT INTO launch5_applications
           (name, business, phone, email, city, about, current_url, agreed_trade)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`
      )
        .bind(name, business, phone, email || null, city, about, current_url || null)
        .run();
    } catch {
      stored = false;
    }

    if (ipHash && stored) {
      try {
        await recordSubmission(env.DB, "apply", ipHash);
      } catch {
        // Throttle bookkeeping is not worth failing an accepted application over.
      }
    }

    // ── Notify ────────────────────────────────────────────────────────────────
    // Every interpolated value is escaped. These are strings a stranger typed, landing
    // in an inbox where "new lead" makes links very clickable.
    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 14px;font-weight:bold;vertical-align:top;">${label}</td>` +
      `<td style="padding:6px 14px;">${escapeHtml(value)}</td></tr>`;

    const waHref = `https://wa.me/91${encodeURIComponent(phone)}`;
    const warning = stored
      ? ""
      : `<p style="padding:10px 14px;background:#fee;border-left:4px solid #c00;">
           <strong>DATABASE WRITE FAILED.</strong> This application is NOT in
           launch5_applications — this email is the only copy. Check that migration
           0003 has been applied to the cybiqon-blog D1 database.
         </p>`;

    const emailSent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Cybiqon Leads <noreply@cybiqon.in>",
        to: "support@cybiqon.in",
        subject: `${stored ? "" : "[DB FAILED] "}Launch-5 application: ${business} — ${city}`,
        html: `
          <h2>New Launch-5 application</h2>
          ${warning}
          <table style="border-collapse:collapse;font-family:system-ui,sans-serif;">
            ${row("Name", name)}
            ${row("Business", business)}
            ${row("City", city)}
            ${row("Phone", phone)}
            ${row("Email", email || "—")}
            ${row("Current presence", current_url || "—")}
            ${row("About", about)}
          </table>
          <p style="margin-top:16px;">
            <a href="${waHref}">Reply on WhatsApp</a> — the playbook says within 24 hours, either way.
          </p>
        `,
      }),
    })
      .then((res) => res.ok)
      .catch(() => false);

    // Both sinks failed, so nothing anywhere recorded this person. Say so plainly and
    // give them a channel that does not depend on our infrastructure. Returning
    // { success: true } here would be a lie that costs a lead.
    if (!stored && !emailSent) {
      return Response.json(
        {
          error:
            "Something broke on my side and I couldn't save your application. Please message me on WhatsApp at +91 92507 11473 — I'll pick it up there.",
        },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      {
        error: `Something went wrong${parsedName ? `, ${parsedName}` : ""}. Please try again, or message +91 92507 11473 on WhatsApp.`,
      },
      { status: 500 }
    );
  }
}
