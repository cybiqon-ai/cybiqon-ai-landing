import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const { env } = getRequestContext();
    const post = await env.DB.prepare(
      "SELECT * FROM blog_posts WHERE slug = ? AND published = 1"
    ).bind(slug).first();

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(post, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}
