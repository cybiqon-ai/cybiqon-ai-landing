"use client";

import { track } from "@/lib/analytics";

/**
 * The /lab call to action.
 *
 * Written for a different reader than components/blog/BlogCTA.tsx, which opens with
 * "no tech jargon, no sales pressure" — the right words for an MSME owner deciding
 * whether a website is worth ₹9,999, and the wrong ones for someone who just read
 * 2,700 words about D1 query scoping. Promising this reader an absence of jargon reads
 * as talking down to them.
 *
 * So it says what the company actually does and asks a specific question, once.
 */
export default function LabCTA() {
  return (
    <aside className="mt-16 border-t border-border pt-8">
      <p className="lab-readout text-muted-foreground mb-3">Who builds this</p>
      <h2 className="lab-display text-[24px] md:text-[28px] text-foreground max-w-[20ch]">
        Cybiqon builds these systems for other people too.
      </h2>
      <p className="font-prose text-[17px] leading-[28px] text-muted-foreground mt-3 max-w-[58ch]">
        Internal tools, automation, and the unglamorous plumbing that keeps them running
        after launch. If something in your stack needs building — or has quietly stopped
        working and nobody has noticed yet — that is the kind of problem worth a
        conversation.
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href="https://tidycal.com/itspyguru/cybiqon-30-minute-meeting"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("lab_cta_click", { method: "call" })}
          className="lab-readout inline-flex items-center bg-signal text-background px-4 py-2.5 rounded-[3px] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Book 30 minutes
        </a>
        <a
          href="mailto:support@cybiqon.in?subject=From%20Cybiqon%20Lab"
          onClick={() => track("lab_cta_click", { method: "email" })}
          className="lab-readout inline-flex items-center border border-border text-foreground px-4 py-2.5 rounded-[3px] hover:border-signal hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Email instead
        </a>
      </div>
    </aside>
  );
}
