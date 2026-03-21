interface CloudflareEnv {
  DB: D1Database;
  BLOG_IMAGES: R2Bucket;
  RESEND_API_KEY: string;
}

declare module "@cloudflare/next-on-pages" {
  export function getRequestContext(): {
    env: CloudflareEnv;
    ctx: ExecutionContext;
    cf: IncomingRequestCfProperties;
  };
}
