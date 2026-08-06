import type { MetadataRoute } from "next";

/**
 * ⚠️ This file is not the whole robots.txt the site serves.
 *
 * Cloudflare's AI Crawl Control has managed robots.txt enabled on this zone, and it
 * PREPENDS its own block — a Content-Signal line plus `Disallow: /` for the training
 * crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, Bytespider, Amazonbot,
 * Applebot-Extended, meta-externalagent). Curl the live URL, not this file, when you
 * want to know what a crawler actually sees.
 *
 * That managed block is intentional and stays — but be clear about what it is worth. The
 * AI Crawl Control crawlers table shows every bot it disallows fetching the site anyway:
 * Amazonbot 62, ClaudeBot 42, GPTBot 39, CCBot 4 allowed requests, all against a
 * `Disallow: /`. It is a reservation of rights, not an enforcement mechanism. Blocking
 * happens in the dashboard, not in a file.
 *
 * ⚠️ None of this explains why a pasted link would not load in ChatGPT, and two confident
 * answers have already been wrong. Not SSR — this route ships its full body in the first
 * response. Not the WAF — `ChatGPT-User` shows 132 allowed against 8 unsuccessful, which
 * is not a blocked bot. Not robots.txt — `ChatGPT-User` does not consult it. The cause is
 * open; see .okf/site/seo.md. Do not try to reproduce it with `curl -A ChatGPT-User`,
 * which returns 200 and proves nothing in either direction.
 *
 * The per-bot groups below exist so no parser has to infer our position on the agents we
 * want from a wildcard group sitting underneath eight explicit denials.
 */

/**
 * Bots that read a page in order to answer someone's question and cite the source.
 *
 * Distinct from training crawlers, which read in order to absorb. We want the first and
 * not the second, which is a distinction robots.txt cannot express on its own — hence
 * naming them one by one.
 *
 * The machine-readable version of that same distinction is the `Content-Signal` line,
 * and it is NOT set here: Next's MetadataRoute.Robots emits only User-agent/Allow/
 * Disallow/Sitemap, with no way to add a directive. The live signal comes from
 * Cloudflare's managed block (`search=yes,ai-train=no,use=reference`) and is edited in
 * the dashboard. Adding a second, conflicting `*` group here would make it worse.
 */
const AI_SEARCH_AND_AGENTS = [
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // a link someone pasted into ChatGPT
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: AI_SEARCH_AND_AGENTS,
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://cybiqon.in/sitemap.xml",
  };
}
