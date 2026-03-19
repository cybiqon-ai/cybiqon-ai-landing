interface CloudflareEnv {
  DB: D1Database;
  BLOG_IMAGES: R2Bucket;
}

declare module "@cloudflare/next-on-pages" {
  export function getRequestContext(): {
    env: CloudflareEnv;
    ctx: ExecutionContext;
    cf: IncomingRequestCfProperties;
  };
}
