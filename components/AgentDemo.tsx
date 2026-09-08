import {
  CaretRight,
  Certificate,
  CheckCircle,
  PaperPlaneTilt,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

/**
 * The hero's right-hand card: one complete job, five screens, on a 20-second loop.
 *
 * The sentence beside it claims an agent does business work rather than just chatting.
 * A static card only asserts that. This plays it — enquiry in, message read, records
 * checked, quote out, human asked — as five screens swapping inside a fixed panel, under
 * a stage rail that fills as the run advances. The rail is the only part that shows the
 * whole flow at once, which is what earns it its row. The timeline, the base-state rule
 * and the reason it is sixteen keyframe blocks rather than one all live in globals.css
 * under "The hero agent card's loop".
 *
 * A SERVER COMPONENT WITH NO CLIENT JS, deliberately. An earlier pass at this hero put
 * framer-motion on the h1 and server-rendered the LCP element at opacity:0, leaving the
 * headline waiting on hydration — the wrong trade on the networks this page sells into.
 * The loop is CSS, so it runs before the bundle does and works if the bundle never
 * arrives. RevealObserver does the one thing CSS cannot: pause it when scrolled past.
 *
 * THE BASE STATE IS SCREEN 5. Screens are exclusive, so unlike the version before this
 * one the markup's resting appearance is the FINISHED run, not everything at once —
 * .hero-screen is opacity 0, .hero-screen-5 is opacity 1, and the rail is fully lit. A
 * reduced-motion visitor gets that single complete frame instead of five stacked panels,
 * which is why screen 5 carries the ₹32,500 figure as well as the approval.
 *
 * FOUR RULES FOR ANYONE EDITING THIS.
 *
 * 1. It is an illustration and the caption says so. No figure here is a result.
 *
 * 2. The numbers on screen 5 are DELTAS OF THE ORDER ON SCREEN 4 — +1 order and +₹32,500
 *    are the arithmetic of that quote. This page used to carry a mock dashboard reading
 *    "1,247 visitors, +147%"; it was deleted because those were claims about nothing in
 *    particular. Business totals do not come back here. The stock and pricing figures on
 *    screen 3 are the fictional customer's records, not claims about this company.
 *
 * 3. Approve is a <span>, not a <button>. Nothing in this card is interactive, and a
 *    real control here would put a dead tab stop on the most-visited page of the site.
 *
 * 4. No orb, robot, brain, circuit board, 3D abstraction or stock AI image. The card is
 *    strongest when it reads as real software built for a real Indian business.
 *
 * Screen 1 is a channel label, not a chat mockup. A WhatsApp thread was the Stitch comp's
 * device and came out: it framed the company as a bot shop just as the positioning moved
 * to custom software. WhatsApp is where the run starts, and no phone number is printed —
 * a real-looking one is not worth inventing.
 */

/* Literal class names, never `hero-screen-${i}`. These live in globals.css and the
   strings have to survive Tailwind's content scan of this file. */
const STAGES = [
  { label: "Enquiry", dot: "", link: "hero-link-1" },
  { label: "Reads", dot: "hero-dot-2", link: "hero-link-2" },
  { label: "Checks", dot: "hero-dot-3", link: "hero-link-3" },
  { label: "Quote", dot: "hero-dot-4", link: "hero-link-4" },
  { label: "Approve", dot: "hero-dot-5", link: "" },
];

const RECORDS = [
  { label: "Inventory", value: "2,400 kg in stock", tick: "hero-tick-1" },
  { label: "Pricing", value: "Slab B · 50 kg and over", tick: "hero-tick-2" },
  { label: "Customer", value: "Repeat · 30-day terms", tick: "hero-tick-3" },
];

const FIELDS = [
  { label: "Quantity", value: "50 kg" },
  { label: "Product", value: "Almonds" },
  { label: "Asking for", value: "Rate" },
];

const DELTAS = [
  { value: "+1", label: "order on the books" },
  { value: "+₹32,500", label: "quoted, awaiting you" },
];

const SCREEN = [
  "hero-screen-1",
  "hero-screen-2",
  "hero-screen-3",
  "hero-screen-4",
  "hero-screen-5",
];

/** Every screen fills the fixed panel, so only one occupies space at a time. */
const Screen = ({ n, children }: { n: 1 | 2 | 3 | 4 | 5; children: React.ReactNode }) => (
  <div
    className={`hero-screen ${SCREEN[n - 1]} absolute inset-0 flex flex-col justify-center gap-3 bg-surface-lowest px-4`}
  >
    {children}
  </div>
);

const AgentDemo = () => (
  <div>
    <div className="relative">
      <div
        data-hero-loop
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_18px_50px_-16px_rgba(0,48,79,0.28)]"
      >
        {/* Header. The subtitle that used to sit here said what the hero copy beside
            the card already says, and cost two lines of height. */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-[12px] font-bold text-accent-foreground">
            AI
          </span>
          <p className="t-label min-w-0 flex-1">Order desk agent</p>
          {/* "Live" was here. A card that visibly replays cannot claim it. */}
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="t-label-sm">Example run</span>
          </span>
        </div>

        {/* ── The rail ────────────────────────────────────────────────────────
            Each stage is a dot; each gap is a track with an accent bar that
            sweeps into the next dot. The caret at the end of a track reuses the
            following dot's animation, so it lights when the dot it points at
            does — no keyframes of its own. */}
        <ol className="flex items-start gap-1 border-b border-border/60 bg-surface-low px-3 py-2.5">
          {STAGES.map((stage, i) => (
            <li
              key={stage.label}
              className={`flex min-w-0 items-start ${i < STAGES.length - 1 ? "flex-1" : ""}`}
            >
              {/* No `t-label-sm` on the label: it is a utility in the same layer as
                  text-[10px] and wins on source order, which pushed all five labels
                  to 12px and truncated three of them at 390. */}
              <div className="flex w-[52px] shrink-0 flex-col items-center gap-1 sm:w-14">
                <span className="relative flex h-3 w-3 items-center justify-center rounded-full border border-border bg-white">
                  <span
                    className={`${stage.dot} h-1.5 w-1.5 rounded-full bg-accent-ink`}
                  />
                </span>
                <span className="w-full truncate text-center text-[10px] font-medium leading-tight tracking-tight text-muted-foreground sm:text-[11px]">
                  {stage.label}
                </span>
              </div>

              {stage.link ? (
                <span aria-hidden className="mt-[5px] flex min-w-0 flex-1 items-center">
                  <span className="relative h-px min-w-0 flex-1 bg-border">
                    <span
                      className={`${stage.link} absolute inset-0 block bg-accent-ink`}
                    />
                  </span>
                  <CaretRight
                    weight="bold"
                    className={`${STAGES[i + 1].dot} -ml-px h-2.5 w-2.5 shrink-0 text-accent-ink`}
                  />
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        {/* ── The panel ───────────────────────────────────────────────────────
            Fixed height, one screen at a time, nothing reflows. */}
        <div className="relative h-[196px] bg-surface-lowest">
          {/* 1 — the trigger */}
          <Screen n={1}>
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container text-[#128C7E]">
                <WhatsappLogo weight="fill" aria-hidden className="h-4 w-4" />
              </span>
              <span className="t-label-sm flex min-w-0 flex-1 items-baseline justify-between gap-2 text-muted-foreground">
                <span className="truncate">WhatsApp · new enquiry</span>
                <span className="shrink-0">09:14</span>
              </span>
            </span>
            <p className="t-h3 text-foreground">“Bhai 50 kg almonds ka rate?”</p>
            <p className="t-label-sm text-muted-foreground">
              Arrives on your number, not a shared inbox.
            </p>
          </Screen>

          {/* 2 — what it read off the message */}
          <Screen n={2}>
            <p className="t-label-sm text-muted-foreground">Read off the message</p>
            <dl className="grid grid-cols-3 gap-2">
              {FIELDS.map((field) => (
                <div
                  key={field.label}
                  className="rounded-lg border border-border/60 bg-surface-low px-2.5 py-2"
                >
                  <dt className="t-label-sm text-[10px] text-muted-foreground">
                    {field.label}
                  </dt>
                  <dd className="t-body-sm mt-0.5 truncate font-semibold text-foreground">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Screen>

          {/* 3 — the business's own data, checked one row at a time */}
          <Screen n={3}>
            <p className="t-label-sm text-muted-foreground">
              Checked against your own records
            </p>
            <ul className="flex flex-col gap-1.5">
              {RECORDS.map((record) => (
                <li
                  key={record.label}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-low px-2.5 py-1.5"
                >
                  <span className="t-label-sm w-16 shrink-0 text-muted-foreground">
                    {record.label}
                  </span>
                  <span className="t-body-sm min-w-0 flex-1 truncate text-foreground">
                    {record.value}
                  </span>
                  <CheckCircle
                    weight="fill"
                    aria-hidden
                    className={`${record.tick} h-4 w-4 shrink-0 text-secondary`}
                  />
                </li>
              ))}
            </ul>
          </Screen>

          {/* 4 — the payoff figure */}
          <Screen n={4}>
            <p className="t-label-sm text-muted-foreground">Quotation ready</p>
            <p className="t-display text-[40px] leading-none text-primary">₹32,500</p>
            <p className="t-body-sm text-muted-foreground">
              50 kg × ₹650 · GST added · PDF attached
            </p>
          </Screen>

          {/* 5 — the decision stays yours, and the base state of the whole card.
              Deltas on top, approval row beneath and right-aligned so the floating
              credential card has clear space to sit over on the left. */}
          <Screen n={5}>
            <dl className="grid grid-cols-2 gap-2">
              {DELTAS.map((delta) => (
                <div
                  key={delta.label}
                  className="rounded-lg border border-border/60 bg-surface-low px-2.5 py-2"
                >
                  <dd className="t-h3 text-primary">{delta.value}</dd>
                  <dt className="t-label-sm mt-0.5 truncate text-muted-foreground">
                    {delta.label}
                  </dt>
                </div>
              ))}
            </dl>
            <div className="flex items-center justify-end gap-3">
              <span className="t-body-sm font-semibold text-foreground">
                Send the quotation?
              </span>
              {/* Not a button: see rule 3. Navy rather than accent so the page's one
                  filled-green affordance stays the real CTA beside it. */}
              <span className="t-label-sm inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 font-semibold text-primary-foreground">
                <PaperPlaneTilt weight="fill" aria-hidden className="h-3.5 w-3.5" />
                Approve
              </span>
            </div>
          </Screen>
        </div>

        {/* ── The closing frame ───────────────────────────────────────────────
            Covers the whole card once the run has finished and turns it into an
            offer. It is the one thing the card cannot say by demonstrating.

            Real text in the DOM the whole time, just clipped, so a screen reader
            reads it in order after the five screens. Clipped to nothing by
            default, which is why reduced motion lands on the finished run rather
            than on this — see the base-state note in globals.css. */}
        <div className="hero-outro absolute inset-0 flex flex-col justify-center gap-2 bg-primary px-5 text-primary-foreground">
          <p className="hero-outro-line t-body-sm text-white/70">
            That was one agent, built for one business.
          </p>
          {/* The cover slides off to the right; its accent left edge is the caret. */}
          <p className="t-h2 relative inline-block self-start text-primary-foreground">
            We&rsquo;ll build yours.
            <span
              aria-hidden
              className="hero-write absolute -inset-y-0.5 -left-0.5 right-0 border-l-2 border-accent bg-primary"
            />
          </p>
        </div>
      </div>

      {/* Credential card. Both are real: the DPIIT certificate and the D-U-N-S
          registration are documents on file, not marketing copy. */}
      <div className="absolute -bottom-5 -left-4 z-10 hidden items-center gap-2.5 rounded-xl border border-border bg-white px-3 py-2 shadow-[0_12px_30px_-10px_rgba(0,48,79,0.35)] sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-softer text-accent-ink">
          <Certificate weight="fill" aria-hidden className="h-4 w-4" />
        </span>
        <div>
          <p className="t-label-sm text-foreground">Startup India · DPIIT</p>
          <p className="text-[11px] text-muted-foreground">D-U-N-S 772066074</p>
        </div>
      </div>
    </div>

    <p className="mt-11 text-center text-[13px] text-muted-foreground">
      An illustration of an agent we build — not a recording of a live run.
    </p>
  </div>
);

export default AgentDemo;
