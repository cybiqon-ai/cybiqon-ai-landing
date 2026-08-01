import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

/**
 * POST { slug } — increment a /lab post's view count.
 *
 * Counted from the browser rather than during the page render, on purpose. A render is
 * a GET; incrementing there would count every crawler, every RSS fetcher and every
 * Next.js <Link> prefetch, and the number on the rail is supposed to mean "people read
 * this". Only a real browser that ran the beacon gets counted.
 *
 * `AND section = 'lab'` is not decoration. Slugs are unique table-wide, so without it
 * this endpoint would be a public write path into the automated MSME blog's rows.
 * An unknown or MSME slug matches nothing and returns ok — there is nothing useful to
 * tell a caller probing for valid slugs.
 */
export async function POST(request: Request): Promise<Response> {
  const ok = () => new Response(null, { status: 204 });

  try {
    const body = (await request.json()) as { slug?: unknown };
    const slug = typeof body.slug === "string" ? body.slug : "";

    // Cheap shape check before touching D1. Real slugs are kebab-case ASCII.
    if (!slug || slug.length > 120 || !/^[a-z0-9-]+$/.test(slug)) return ok();

    const { env } = getRequestContext();
    await env.DB.prepare(
      "UPDATE blog_posts SET views = views + 1 WHERE slug = ? AND section = 'lab' AND published = 1"
    )
      .bind(slug)
      .run();

    return ok();
  } catch {
    // A view counter must never be able to surface an error to a reader, and the
    // beacon ignores the response anyway. Losing a count is the correct failure.
    return ok();
  }
}
