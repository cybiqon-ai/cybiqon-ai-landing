import { getRequestContext } from "@cloudflare/next-on-pages";
import { z } from "zod";

export const runtime = "edge";

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

    await env.DB.prepare(
      "INSERT INTO audit_leads (name, email, phone, website_url) VALUES (?, ?, ?, ?)"
    ).bind(name, email, phone, website_url).run();

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
          html: `
            <h2>New Free Website Audit Request</h2>
            <table style="border-collapse:collapse;">
              <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${name}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;">${email}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${phone}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Website</td><td style="padding:4px 12px;"><a href="${website_url}">${website_url}</a></td></tr>
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
