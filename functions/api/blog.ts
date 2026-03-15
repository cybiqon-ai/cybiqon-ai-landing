interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    const { results } = await env.DB.prepare(
      "SELECT id, slug, title, excerpt, image_url, tags, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT 30"
    ).all();

    return Response.json(results, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
};
