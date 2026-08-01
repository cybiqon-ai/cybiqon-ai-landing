"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Share controls for a post.
 *
 * Styled as readouts rather than as social buttons on purpose: brand-coloured share
 * chips are the one element that would make this page look like every other blog, and
 * the palette deliberately spends its loudness on the measurement rail instead.
 *
 * The link preview these produce comes from the OG card generated at publish time
 * (tools/social-media-manager/lab/og_card.py) — there is nothing to do here to make a
 * preview appear beyond sharing the canonical URL.
 *
 * navigator.share only exists on mobile and in secure contexts, and it is detected in
 * an effect rather than during render: touching `navigator` while rendering would
 * either break SSR or produce a hydration mismatch.
 */
export default function ShareRow({ slug, title }: { slug: string; title: string }) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = `https://cybiqon.in/lab/${slug}`;

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const item =
    "lab-readout text-muted-foreground hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[3px] px-1";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context, or the user declined). Say so rather than
      // silently doing nothing and looking broken.
      window.prompt("Copy this link", url);
    }
    track("lab_share", { method: "copy", slug });
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
      track("lab_share", { method: "native", slug });
    } catch {
      // Includes the user dismissing the sheet, which is not an error.
    }
  }

  return (
    <div className="mt-12 pt-5 border-t border-border flex flex-wrap items-center gap-x-1 gap-y-2">
      <span className="lab-readout text-muted-foreground pr-2">Share</span>

      {canNativeShare && (
        <button type="button" onClick={nativeShare} className={item}>
          Share&hellip;
        </button>
      )}

      <button
        type="button"
        onClick={copy}
        className={item}
        // Announce the result to screen readers, which otherwise get no feedback from
        // a label that changes silently.
        aria-live="polite"
      >
        {copied ? "Copied" : "Copy link"}
      </button>

      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("lab_share", { method: "x", slug })}
        className={item}
      >
        X
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("lab_share", { method: "linkedin", slug })}
        className={item}
      >
        LinkedIn
      </a>

      <a
        href={`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("lab_share", { method: "hn", slug })}
        className={item}
      >
        HN
      </a>
    </div>
  );
}
