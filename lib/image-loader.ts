// Custom Next.js image loader.
//
// Portfolio and static assets are pre-optimized to WebP at build time, and
// remote blog images are served from R2 already sized. So this loader is a
// passthrough — it must NOT be a client component (loaders run on both server
// and client and are referenced from next.config.mjs).
export default function imageLoader({ src }: { src: string }) {
  return src;
}
