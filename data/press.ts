/**
 * Press mentions, as data.
 *
 * There is ONE. That is the whole list, and the shape of this file exists to stop it
 * being padded into looking like more. Read `.okf/content/content-data.md` § "Honesty
 * flags": three components that invented social proof were deleted on 1 Aug 2026, and
 * `data/launch5.ts` keeps `SLOTS_TAKEN = 0` for the same reason. A press page is the
 * easiest surface on this site to start lying on, so the types refuse rather than a
 * comment asking nicely:
 *
 *   - No `logo` field. A logo wall is not expressible, so nobody can build one.
 *   - No aggregate count. A line reading "as featured in 1 publication" has nowhere to
 *     come from.
 *   - `verification` is required. A mention nobody can check cannot be represented.
 *   - The union forbids `url` on print and requires it online, so "print — and here's a
 *     link" cannot be half-typed into existence.
 *   - `quote` is verbatim or it is not here. Paraphrase belongs in `subject`.
 *
 * Campaign copy and the accuracy guardrails live in cybiqon-hq at
 * `ops/press-mentions.md`, which is also where the reasoning behind the wording sits.
 */

type PrintVerification = {
  readonly medium: "print";
  readonly edition: string;
  readonly page: string;
  readonly publishedOn: string;
  /**
   * The cropped detail — masthead, headline and the paragraph quoting us.
   *
   * This is the one a reader actually reads. Its newsprint is ~0.035 of the displayed
   * width, so it is legible from about 300px and correctly sized around 420px. Shown
   * any wider it renders the newspaper's body copy larger than this site's own, which
   * reads as a graphic shouting rather than as a document.
   */
  readonly clippingUrl: string;
  readonly clippingAlt: string;
  readonly clippingWidth: number;
  readonly clippingHeight: number;
  /**
   * The whole page, as provenance rather than as reading matter.
   *
   * Its body copy is ~0.0074 of displayed width — 6px at any width a page layout can
   * give it — so only the section banner, headline and standfirst ever carry. It is
   * here to show the quote sat on a real newspaper page, which is why it wants to be
   * wide and why its caption says what it is instead of pretending it is readable.
   */
  readonly fullPageUrl: string;
  readonly fullPageAlt: string;
  readonly fullPageWidth: number;
  readonly fullPageHeight: number;
};

type OnlineVerification = {
  readonly medium: "online";
  /** Required. An online mention with no URL is a claim, not a citation. */
  readonly url: string;
  readonly publishedOn: string;
};

export type PressMention = {
  readonly id: string;
  /** The masthead exactly as printed. Not a hedge like "ET / Times of India". */
  readonly publication: string;
  readonly publisher: string;
  /** The journalist's subject, not ours. We were a source, not the story. */
  readonly subject: string;
  readonly headline: string;
  readonly quote: string;
  /**
   * The one sentence set at display size.
   *
   * **Invariant: this must be a verbatim substring of `quote`.** It is the only thing
   * keeping a pull quote from becoming a paraphrase that drifts from what was printed.
   * `assertPullQuotes()` below enforces it at module load rather than trusting a comment.
   *
   * Choose the shortest sentence that survives being lifted out — of this quote's four
   * sentences, two open with a pronoun ("That is…", "This is…") and need an antecedent,
   * so they cannot stand alone no matter how quotable they look.
   */
  readonly pullQuote: string;
  readonly attribution: { readonly name: string; readonly role: string };
  readonly context: string;
  readonly journalist: string;
  readonly verification: PrintVerification | OnlineVerification;
};

export const MENTIONS: readonly PressMention[] = [
  {
    id: "et-vernacular-ai-2026-08-15",
    publication: "The Economic Times",
    publisher: "Bennett, Coleman & Co. Ltd",
    subject: "AI adoption among Indian MSMEs and the role of regional-language tools",
    headline: "Vernacular AI gives India's entrepreneurs a voice",
    quote:
      "More than 70 per cent of India's medium and small industries operate primarily in regional languages, yet most business software remains English-first. That is a significant mismatch between how Indian entrepreneurs communicate and the tools they are expected to use. This is a key reason why digital adoption has lagged among Indian industries. It is not a lack of interest; it is a lack of relevance.",
    pullQuote: "It is not a lack of interest; it is a lack of relevance.",
    attribution: {
      name: "Prajjwal Pathak",
      role: "Co-founder, Cybiqon AI Solutions",
    },
    context:
      "The feature looked at why AI adoption among India's small businesses has trailed the enthusiasm around it, and what regional-language tools change. We were asked for the practitioner's view. The reporter approached us; nothing here was pitched or paid for.",
    journalist: "Nayanthara Rajeev",
    verification: {
      medium: "print",
      edition: "Hyderabad",
      page: "Page 4",
      publishedOn: "2026-08-15",
      clippingUrl: "/press/et-vernacular-ai-15-aug-2026.jpg",
      clippingAlt:
        "Clipping from The Economic Times, Hyderabad edition, 15 August 2026, page 4, showing the headline \"Vernacular AI gives India's entrepreneurs a voice\" and the paragraph quoting Prajjwal Pathak of Cybiqon AI.",
      clippingWidth: 900,
      clippingHeight: 1123,
      fullPageUrl: "/press/et-page-4-15-aug-2026.jpg",
      fullPageAlt:
        "The upper portion of page 4 of The Economic Times, Hyderabad edition, 15 August 2026 — an Independence Day Special spread headlined \"Vernacular AI gives India's entrepreneurs a voice\".",
      fullPageWidth: 1416,
      fullPageHeight: 788,
    },
  },
];

/**
 * Enforce the pull-quote invariant at module load, so a drifting display line fails the
 * build rather than shipping.
 *
 * The rest of this file refuses fabrication through its types. A substring relationship
 * is not expressible in the type system, so it is checked here instead — same intent,
 * different mechanism. This runs at build time (the page is static), which is exactly
 * where a mismatch should surface.
 */
function assertPullQuotes(mentions: readonly PressMention[]): void {
  for (const m of mentions) {
    if (!m.quote.includes(m.pullQuote)) {
      throw new Error(
        `data/press.ts: pullQuote for "${m.id}" is not a verbatim substring of quote. ` +
          `A pull quote that paraphrases is a misquote set in large type.`,
      );
    }
  }
}

assertPullQuotes(MENTIONS);

/**
 * The forward-looking half, and the reason a one-item page reads as complete.
 *
 * A "press mentions" page with one clipping is thin. A press kit with one clipping is
 * finished — it answers "who do I contact and what can he talk about", which is what a
 * journalist actually arrives wanting.
 */
export const PRESS_KIT = {
  founder: "Prajjwal Pathak",
  founderRole: "Co-founder & CTO, Cybiqon AI Solutions",
  founderBio:
    "Prajjwal Pathak is a backend and automation engineer, and co-founder of Cybiqon AI Solutions, which builds websites, apps and AI automation for Indian MSMEs. He writes about what the company builds and what breaks at cybiqon.in/lab.",
  speaksTo: [
    "Regional-language and multilingual software for Indian small businesses",
    "What automation actually costs an MSME, in rupees",
    "Why digital adoption stalls at the point of relevance, not price",
    "Building and running a small software company on a near-zero infrastructure budget",
  ],
  email: "support@cybiqon.in",
  authorPage: "/lab/about",
} as const;
