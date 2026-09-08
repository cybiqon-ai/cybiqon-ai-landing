import { Globe, Key, TrendUp, UsersThree } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/SectionHeading";

/**
 * The comp's four-card "why us", with tinted icon tiles.
 *
 * These are promises the company can keep on its own, which is the only honest kind
 * available while the client count is what it is. None of them is a count of customers.
 */
const REASONS = [
  {
    icon: UsersThree,
    title: "Direct founder access",
    body: "No middle managers and no junior account handlers. Decisions happen on a WhatsApp message or a call with the people building it.",
  },
  {
    icon: Key,
    title: "Zero vendor lock-in",
    body: "Full code and IP. Repository, server keys and DNS records are transferred to you on handover — you can leave whenever you like.",
  },
  {
    icon: TrendUp,
    title: "Built to convert",
    body: "Not decoration. Thumb-friendly WhatsApp buttons, fast loading on a mid-range phone, and analytics set up before you go live.",
  },
  {
    icon: Globe,
    title: "Hindi and English",
    body: "The bot answers in the language a customer writes in, including Hinglish, so nobody is filtered out by the interface.",
  },
];

const WhyChooseUs = () => (
  <section className="bg-surface-low py-16 lg:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <SectionHeading
          align="left"
          eyebrow="Why Cybiqon AI"
          title="Built by engineers, for Indian MSMEs"
        />
        <p className="t-body-lg text-muted-foreground">
          We cut the agency layers. You talk straight to the people who write the code, and
          they respect your timeline and your budget.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            className="rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-high text-primary">
              <reason.icon weight="fill" aria-hidden className="h-5 w-5" />
            </span>
            <h3 className="t-h3 mt-4 text-primary">{reason.title}</h3>
            <p className="t-body-sm mt-2 text-muted-foreground">{reason.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
