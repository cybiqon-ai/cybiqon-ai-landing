import { CheckCircle, Checks, DotsThreeVertical, Phone } from "@phosphor-icons/react/dist/ssr";

/**
 * The hero's WhatsApp mockup — the strongest idea in the Stitch comp.
 *
 * It is a **product demonstration**, not a customer. The exchange below is written as an
 * example of what the bot does; no real conversation is being reproduced and no customer is
 * being claimed. The caption under it says so, because a chat bubble on a homepage reads as
 * a real customer unless it tells you otherwise, and three components that invented
 * customer activity were deleted from this repo on 1 Aug 2026.
 */
const MESSAGES = [
  {
    from: "customer" as const,
    text: "Namaste! Do you deliver wholesale kitchenware across Maharashtra?",
    time: "11:42",
  },
  {
    from: "bot" as const,
    text: "Namaste! Yes — all 36 districts. Free shipping over ₹999. Shall I send the current wholesale catalogue right here?",
    time: "11:42",
  },
];

const WhatsAppDemo = () => (
  <div>
    {/* The badge is anchored to the card, not to this wrapper — anchoring it to the
        wrapper put it on top of the caption below. */}
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_18px_50px_-16px_rgba(0,48,79,0.28)]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-bold">
          CA
        </span>
        <div className="min-w-0 flex-1">
          <p className="t-label flex items-center gap-1.5">
            Cybiqon AI sales agent
            <CheckCircle weight="fill" aria-hidden className="h-3.5 w-3.5 text-secondary" />
          </p>
          <p className="t-label-sm text-white/70">Replies in seconds, 24/7</p>
        </div>
        <Phone weight="fill" aria-hidden className="h-4 w-4 text-white/70" />
        <DotsThreeVertical weight="bold" aria-hidden className="h-4 w-4 text-white/70" />
      </div>

      {/* Thread */}
      <div className="space-y-3 bg-surface-low px-4 py-5">
        <p className="mx-auto w-fit rounded-full bg-surface-high px-3 py-1 text-[11px] text-muted-foreground">
          Today · end-to-end encrypted
        </p>

        {MESSAGES.map((m) => (
          <div
            key={m.text}
            className={m.from === "bot" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                m.from === "bot"
                  ? "rounded-br-sm bg-[#d9fdd3] text-foreground"
                  : "rounded-bl-sm bg-white text-foreground"
              }`}
            >
              {m.from === "bot" && (
                <p className="t-label-sm mb-1 flex items-center gap-1 text-tertiary-deep">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" />
                  Automatic reply
                </p>
              )}
              <p className="t-body-sm">{m.text}</p>
              <p className="mt-1 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                {m.time}
                {m.from === "bot" && (
                  <Checks weight="bold" aria-hidden className="h-3 w-3 text-[#53bdeb]" />
                )}
              </p>
            </div>
          </div>
        ))}

        {/* Quick replies the bot offers */}
        <div className="flex flex-wrap justify-end gap-2 pt-1">
          {["Send catalogue", "Request a callback"].map((label) => (
            <span
              key={label}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-primary"
            >
              {label}
            </span>
          ))}
        </div>

        <p className="t-label-sm pt-1 text-right text-muted-foreground">
          Hindi · Hinglish · English
        </p>
      </div>
    </div>

      {/* Floating credential card. The comp put an invented "98 Core Web Vitals" score
          here; this is the DPIIT recognition, a real certificate on file. */}
      <div className="absolute -bottom-6 -left-4 z-10 hidden items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-2.5 shadow-[0_12px_30px_-10px_rgba(0,48,79,0.35)] sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-softer text-accent">
          <CheckCircle weight="fill" aria-hidden className="h-5 w-5" />
        </span>
        <div>
          <p className="t-label-sm text-foreground">Startup India</p>
          <p className="text-[11px] text-muted-foreground">DPIIT recognised</p>
        </div>
      </div>
    </div>

    <p className="mt-12 text-center text-[13px] text-muted-foreground sm:mt-10">
      An example of the bot in action — not a real customer conversation.
    </p>
  </div>
);

export default WhatsAppDemo;
