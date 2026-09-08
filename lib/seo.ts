/**
 * Trim to a meta description that ends on a word.
 *
 * Google renders about 160 characters. Everything past that is not merely wasted — a
 * description cut by the SERP reads as truncated, and one cut mid-word reads as broken.
 * The seven service pages shipped for months at exactly 185 characters because a
 * `.slice(0, 185)` chopped every one of them mid-word: "…checking stock, updat",
 * "…and, where it is". An 8 Sep 2026 audit found it.
 *
 * Prefer the last full sentence that fits. Fall back to the last word boundary with an
 * ellipsis, and never end on a dangling connector — a description ending "rules —" is
 * the same defect in a nicer costume.
 */
export function clampDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const window = clean.slice(0, max);

  // A full stop is a sentence end. An em dash is not — that mistake shipped once.
  const sentence = window.lastIndexOf(". ");
  if (sentence > max * 0.7) return window.slice(0, sentence + 1);

  return (
    window
      .slice(0, window.lastIndexOf(" "))
      .replace(/[,;:—–-]+$/, "")
      .trim() + "…"
  );
}
