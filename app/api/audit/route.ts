import { getRequestContext } from "@cloudflare/next-on-pages";
import { z } from "zod";
import { escapeHtml, clientIpHash, isRateLimited, recordSubmission } from "@/lib/leads";

export const runtime = "edge";

const MAX_PER_HOUR = 3;

const auditSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\d{10,}$/, "Phone must be at least 10 digits"),
  website_url: z.string().url("Please enter a valid URL (include https://)"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = auditSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, website_url } = parsed.data;
    const { env } = getRequestContext();

    // Throttle. This endpoint triggers outbound email on every call, so unlimited it is
    // a free way for a stranger to flood the founder's inbox and burn the Resend quota.
    // A missing CF-Connecting-IP lets the request through — see the note in
    // lib/leads.ts on why we do not reject a real lead over an absent header.
    const ipHash = await clientIpHash(request);
    if (ipHash) {
      try {
        if (await isRateLimited(env.DB, "audit", ipHash, { max: MAX_PER_HOUR, windowMinutes: 60 })) {
          return Response.json(
            { error: "You've already requested an audit. Check your inbox — the report is on its way." },
            { status: 429 }
          );
        }
      } catch {
        // Limiter unavailable. Prefer an extra lead over a dropped one.
      }
    }

    await env.DB.prepare(
      "INSERT INTO audit_leads (name, email, phone, website_url) VALUES (?, ?, ?, ?)"
    ).bind(name, email, phone, website_url).run();

    if (ipHash) {
      try {
        await recordSubmission(env.DB, "audit", ipHash);
      } catch {
        // Throttle bookkeeping is not worth failing an accepted lead over.
      }
    }

    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Cybiqon Leads <noreply@cybiqon.in>",
          to: "support@cybiqon.in",
          subject: `New Audit Lead: ${name} — ${website_url}`,
          // Every value is escaped: these are strings a stranger typed, arriving in an
          // inbox where a message titled "new lead" makes any link very clickable.
          html: `
            <h2>New Free Website Audit Request</h2>
            <table style="border-collapse:collapse;">
              <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${escapeHtml(phone)}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Website</td><td style="padding:4px 12px;"><a href="${escapeHtml(website_url)}">${escapeHtml(website_url)}</a></td></tr>
            </table>
          `,
        }),
      });
    } catch {
      // Email delivery failure should not block the lead capture
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
