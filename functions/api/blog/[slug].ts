interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  const slug = params.slug as string;

  try {
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
};
