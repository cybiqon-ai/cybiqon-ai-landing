import {
  ArrowsClockwise,
  CheckCircle,
  Certificate,
  Database,
  EnvelopeSimple,
  Table,
} from "@phosphor-icons/react/dist/ssr";

/**
 * The hero's right-hand card: a custom AI agent working through a task.
 *
 * It replaces a WhatsApp chat mockup, which was the Stitch comp's own device. Two reasons
 * it went: it framed the company as a WhatsApp-bot shop just as the positioning moved to
 * custom software and AI engineering, and a chat bubble on a homepage reads as a real
 * customer unless it argues otherwise.
 *
 * This is a **product demonstration** — an illustration of what an agent built for a
 * business does with an incoming order. It is not a recording of a live run and the
 * caption says so. No figures here are presented as results.
 */
const STEPS = [
  {
    icon: EnvelopeSimple,
    label: "Read the order email",
    detail: "12 kg cashews · Nagpur · GST invoice",
    state: "done" as const,
  },
  {
    icon: Database,
    label: "Checked stock and pricing",
    detail: "In stock · slab price applied",
    state: "done" as const,
  },
  {
    icon: Table,
    label: "Wrote the row to your sheet",
    detail: "Orders › October",
    state: "done" as const,
  },
  {
    icon: ArrowsClockwise,
    label: "Drafting the reply and invoice",
    detail: "Waiting for your approval",
    state: "active" as const,
  },
];

const AgentDemo = () => (
  <div>
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_18px_50px_-16px_rgba(0,48,79,0.28)]">
        <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-[13px] font-bold">
            AI
          </span>
          <div className="min-w-0 flex-1">
            <p className="t-label">Order desk agent</p>
            <p className="t-label-sm text-white/70">Custom-built · running since 06:00</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
            </span>
            <span className="t-label-sm">Live</span>
          </span>
        </div>

        {/* The steps arrive in order — see .agent-step in globals.css for why it is
            kept this small. Index-based delays rather than a JS timeline: no client
            component, no hydration, and it still works if the bundle never loads. */}
        <ol className="divide-y divide-border/60 bg-surface-lowest">
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              className="agent-step flex items-start gap-3 px-4 py-3.5"
              style={{ animationDelay: `${360 + i * 260}ms` }}
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  step.state === "done"
                    ? "bg-surface-high text-primary"
                    : "bg-accent-softer text-accent-ink"
                }`}
              >
                <step.icon
                  weight="fill"
                  aria-hidden
                  className={`h-4 w-4 ${step.state === "active" ? "animate-spin-slow" : ""}`}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="t-body-sm block font-semibold text-foreground">
                  {step.label}
                </span>
                <span className="t-label-sm block text-muted-foreground">{step.detail}</span>
              </span>
              {step.state === "done" ? (
                <CheckCircle
                  weight="fill"
                  aria-hidden
                  className="agent-check mt-1 h-4 w-4 shrink-0 text-secondary"
                  style={{ animationDelay: `${700 + i * 260}ms` }}
                />
              ) : (
                <span className="t-label-sm mt-1 shrink-0 text-accent-ink">now</span>
              )}
            </li>
          ))}
        </ol>

        {/* Right-aligned so the floating credential card below has clear space to sit
            over on the left. */}
        <p className="t-label-sm border-t border-border/60 bg-surface-low px-4 py-3 text-right text-muted-foreground">
          Runs on your own data.
        </p>
      </div>

      {/* Credential card. Both are real: the DPIIT certificate and the D-U-N-S
          registration are documents on file, not marketing copy. */}
      <div className="absolute -bottom-6 -left-4 z-10 hidden items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-2.5 shadow-[0_12px_30px_-10px_rgba(0,48,79,0.35)] sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-softer text-accent-ink">
          <Certificate weight="fill" aria-hidden className="h-5 w-5" />
        </span>
        <div>
          <p className="t-label-sm text-foreground">Startup India · DPIIT</p>
          <p className="text-[11px] text-muted-foreground">D-U-N-S 772066074</p>
        </div>
      </div>
    </div>

    <p className="mt-12 text-center text-[13px] text-muted-foreground">
      An illustration of an agent we build — not a recording of a live run.
    </p>
  </div>
);

export default AgentDemo;
