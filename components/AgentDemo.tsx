import {
  Certificate,
  Check,
  CheckCircle,
  Database,
  CurrencyInr,
  PaperPlaneTilt,
  Receipt,
  Scan,
  TrendUp,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

/**
 * The hero's right-hand card: one complete job, on an 18-second loop.
 *
 * The sentence beside it claims an agent does business work rather than just chatting.
 * A static card only asserts that. This plays it: enquiry arrives, the agent reads it,
 * checks the business's own records, prepares a quote, the day's numbers move, and a
 * human is asked before anything is sent. Then it holds still for four and a half
 * seconds, resets, and runs again. Beats the run has not reached are dimmed rather than
 * hidden, so the card is always full and you watch it light up. The timeline, and the
 * reason it is twelve keyframe blocks rather than one, are in globals.css under "The hero
 * agent card's loop".
 *
 * A SERVER COMPONENT WITH NO CLIENT JS, deliberately. An earlier pass at this hero put
 * framer-motion on the h1 and server-rendered the LCP element at opacity:0, leaving the
 * headline waiting on hydration — the wrong trade on the networks this page sells into.
 * The loop is CSS, so it runs before the bundle does and works if the bundle never
 * arrives. RevealObserver does the one thing CSS cannot: pause it when scrolled past.
 *
 * THREE RULES FOR ANYONE EDITING THIS.
 *
 * 1. It is an illustration and the caption says so. No figure here is a result.
 *
 * 2. The numbers in the strip are DELTAS FROM THE ORDER TWO ROWS ABOVE — +1 order and
 *    +₹32,500 are the arithmetic of that quote. This page used to carry a mock dashboard
 *    reading "1,247 visitors, +147%"; it was deleted because those were claims about
 *    nothing in particular. Business totals do not come back here. Deltas of a shown
 *    transaction are the only numbers this card is entitled to.
 *
 * 3. Approve is a <span>, not a <button>. Nothing in this card is interactive, and a
 *    real control here would put a dead tab stop on the most-visited page of the site.
 *
 * The inbound row is a channel label, not a chat mockup. A WhatsApp thread was the
 * Stitch comp's device and came out: it framed the company as a bot shop just as the
 * positioning moved to custom software. WhatsApp is where one of six beats starts, and
 * no phone number is printed — a real-looking one is not worth inventing.
 */
const WORK = [
  {
    icon: Scan,
    label: "Understood the request",
    detail: "50 kg · almonds · wholesale rate",
  },
  {
    icon: Database,
    label: "Checked your own records",
    detail: null, // renders CHECKS as chips that tick in turn
  },
  {
    icon: Receipt,
    label: "Quote prepared · ₹32,500",
    detail: "Slab price applied · GST added · PDF attached",
  },
];

const CHECKS = ["Inventory", "Pricing", "Customer"];

/* Literal class names, not `hero-beat-${i}`. These live in globals.css and the
   strings have to survive Tailwind's content scan. */
const BEAT = ["hero-beat-2", "hero-beat-3", "hero-beat-4"];
const TICK = ["hero-tick-1", "hero-tick-2", "hero-tick-3"];
const CHIP = ["hero-chip-1", "hero-chip-2", "hero-chip-3"];

const AgentDemo = () => (
  <div>
    <div className="relative">
      <div
        data-hero-loop
        className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_18px_50px_-16px_rgba(0,48,79,0.28)]"
      >
        <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-[13px] font-bold text-accent-foreground">
            AI
          </span>
          <div className="min-w-0 flex-1">
            <p className="t-label">Order desk agent</p>
            <p className="t-label-sm text-white/70">Built for one business, on its own data</p>
          </div>
          {/* "Live" was here. A card that visibly replays cannot claim it. */}
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="t-label-sm">Example run</span>
          </span>
        </div>

        <div>
          {/* Beat 1 — the trigger. Tinted, because it is an input rather than
              something the agent did. */}
          <div className="hero-beat-1 flex items-start gap-3 border-b border-border/60 bg-surface-container px-4 py-3.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#128C7E]">
              <WhatsappLogo weight="fill" aria-hidden className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="t-label-sm flex items-baseline justify-between gap-2 text-muted-foreground">
                <span>WhatsApp · new enquiry</span>
                <span className="shrink-0">09:14</span>
              </span>
              <span className="t-body-sm mt-0.5 block font-semibold text-foreground">
                “Bhai 50 kg almonds ka rate?”
              </span>
            </span>
          </div>

          {/* Beats 2–4 — the work. */}
          <ol className="divide-y divide-border/60 bg-surface-lowest">
            {WORK.map((step, i) => (
              <li key={step.label} className={`${BEAT[i]} flex items-start gap-3 px-4 py-3.5`}>
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-high text-primary">
                  <step.icon weight="fill" aria-hidden className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="t-body-sm block font-semibold text-foreground">
                    {step.label}
                  </span>
                  {step.detail ? (
                    <span className="t-label-sm mt-0.5 block text-muted-foreground">
                      {step.detail}
                    </span>
                  ) : (
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {/* The pills are always there; only the ticks land one by one.
                          Animating the pills themselves left a hole in the row for the
                          ten seconds before they arrived. */}
                      {CHECKS.map((check, c) => (
                        <span
                          key={check}
                          className="t-label-sm inline-flex items-center gap-1 rounded-md bg-surface-low px-1.5 py-0.5 text-muted-foreground"
                        >
                          <Check
                            weight="bold"
                            aria-hidden
                            className={`${CHIP[c]} h-3 w-3 text-secondary`}
                          />
                          {check}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                <CheckCircle
                  weight="fill"
                  aria-hidden
                  className={`${TICK[i]} mt-1 h-4 w-4 shrink-0 text-secondary`}
                />
              </li>
            ))}
          </ol>

          {/* Beat 5 — what moved. Deltas of the quote above, never business totals;
              see rule 2 in the header. */}
          <dl className="hero-beat-5 grid grid-cols-2 divide-x divide-border/60 border-y border-border/60 bg-surface-low">
            {[
              { icon: TrendUp, value: "+1", label: "order on the books" },
              { icon: CurrencyInr, value: "+₹32,500", label: "quoted, awaiting you" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-3">
                <dd className="t-h3 flex items-center gap-1.5 text-primary">
                  <stat.icon weight="fill" aria-hidden className="h-4 w-4 text-accent-ink" />
                  {stat.value}
                </dd>
                <dt className="t-label-sm mt-0.5 text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>

          {/* Beat 6 — the decision stays yours. Not a button: see rule 3.
              Right-aligned so the floating credential card has clear space to sit over
              on the left, and navy rather than accent so the page's one filled-green
              affordance stays the real CTA beside it. */}
          <div className="hero-beat-6 flex items-center justify-end gap-3 bg-surface-lowest px-4 py-3">
            <span className="t-body-sm font-semibold text-foreground">Send the quotation?</span>
            <span className="t-label-sm inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 font-semibold text-primary-foreground">
              <PaperPlaneTilt weight="fill" aria-hidden className="h-3.5 w-3.5" />
              Approve
            </span>
          </div>
        </div>
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
