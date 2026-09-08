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
 * What is here instead is everything that survives a check, and the first three carry the
 * reference a visitor needs to check it themselves:
 *
 *   - DIPP256002 is the DPIIT recognition number, verifiable on the Startup India portal.
 *     Certificate dated 17 Apr 2026, valid to 4 Mar 2036, in ops/Downloads.
 *   - ACV-9817 is the LLPIN, verifiable on the MCA portal. Incorporated 5 Mar 2026.
 *   - 772066074 is the D-U-N-S number, verifiable through D&B.
 *
 * The incorporation certificate also carries the LLP's PAN and TAN. Those are deliberately
 * NOT here and should not be added: they are tax identifiers rather than registry ones, a
 * PAN is used for identity verification in India, and this is the org's only public repo
 * where a push deploys the live site. Nothing a customer needs to check about this company
 * requires either of them.
 *   - The Economic Times mention links to /press, which shows the scanned page.
 *
 * That is why the numbers are printed rather than a badge reading "verified": a badge
 * asserts, a reference lets someone check. Code ownership is a promise rather than a
 * lookup, which is why it sits last.
 */
const CREDENTIALS = [
  {
    icon: Certificate,
    value: "Startup India",
    label: "DPIIT recognised · DIPP256002",
    href: null,
  },
  {
    icon: Buildings,
    value: "Registered LLP",
    label: "ACV-9817 · D-U-N-S 772066074",
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
