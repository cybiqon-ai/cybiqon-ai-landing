import Link from "next/link";
import { Buildings, Certificate, Code, Newspaper } from "@phosphor-icons/react/dist/ssr";

/**
 * The credential row, in the comp's slot but not with the comp's contents.
 *
 * The comp reads "Trusted by 100+ Indian businesses across 18 cities" over cards claiming
 * 100+ projects delivered, 3.2x average inbound growth and ISO 9001 process quality. None
 * of that is true: the company has no paying website clients, data/launch5.ts holds
 * SLOTS_TAKEN at a real zero, and there is no ISO certificate anywhere. Falsely claiming a
 * certification is not a style decision.
 *
 * What is here instead is everything that survives a check. The DPIIT recognition and the
 * LLP incorporation are real documents in ops/Downloads, and the D-U-N-S number is
 * verifiable by anyone who wants to look it up — which is the point of showing it rather
 * than a badge that says "verified". The Economic Times mention is data/press.ts with a
 * scan of the page; code ownership is the standing offer terms.
 */
const CREDENTIALS = [
  {
    icon: Certificate,
    value: "Startup India",
    label: "DPIIT recognised",
    href: null,
  },
  {
    icon: Buildings,
    value: "D-U-N-S",
    label: "772066074 · Registered LLP",
    href: null,
  },
  {
    icon: Newspaper,
    value: "In the press",
    label: "The Economic Times, Aug 2026",
    href: "/press",
  },
  {
    icon: Code,
    value: "100%",
    label: "Source code ownership",
    href: null,
  },
];

const PILLS = ["MSME focused", "Founder-led delivery", "GST invoice", "Full IP handover"];

const TrustBar = () => (
  <section className="border-y border-border/60 bg-surface-lowest py-12">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIALS.map((item) => {
          const body = (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-high text-primary">
                <item.icon weight="fill" aria-hidden className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="t-h3 block truncate text-primary">{item.value}</span>
                <span className="t-body-sm block text-muted-foreground">{item.label}</span>
              </span>
            </>
          );
          const cls =
            "flex items-center gap-3 rounded-xl border border-border/70 bg-surface-low px-4 py-4 transition-colors";
          return item.href ? (
            <Link key={item.value} href={item.href} className={`${cls} hover:border-primary/40 hover:bg-surface-container`}>
              {body}
            </Link>
          ) : (
            <div key={item.value} className={cls}>
              {body}
            </div>
          );
        })}
      </div>

      <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
        {PILLS.map((pill) => (
          <li
            key={pill}
            className="t-label-sm rounded-full border border-border/70 bg-surface-low px-3.5 py-1.5 text-muted-foreground"
          >
            {pill}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TrustBar;
