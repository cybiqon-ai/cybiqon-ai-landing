import Link from "next/link";
import LegalDoc from "@/components/products/LegalDoc";
import { SITE_PRIVACY, SITE_TERMS } from "@/data/legal/site";

const siteUrl = "https://cybiqon.in";

/**
 * Shell for /privacy and /terms.
 *
 * It renders through components/products/LegalDoc.tsx — the same renderer the twelve
 * product legal pages use — rather than a second one. That component has no
 * `dangerouslySetInnerHTML` anywhere, which is a property worth reusing on legally-material
 * copy rather than reimplementing beside it.
 *
 * These two pages are NOT on the Ledger theme, unlike the product legal pages. LegalDoc
 * only uses shadcn tokens plus `--ochre`, which resolves at :root, so it renders correctly
 * in both scopes.
 */
export default function SiteLegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const doc = kind === "privacy" ? SITE_PRIVACY : SITE_TERMS;
  const title = kind === "privacy" ? "Privacy policy" : "Terms of service";
  const lede =
    kind === "privacy"
      ? "What we collect, who processes it, and what you can ask us to do about it."
      : "How we work, what you pay, and what you own at the end of it.";
  const other = kind === "privacy" ? "terms" : "privacy";
  const otherLabel = kind === "privacy" ? "Terms of service" : "Privacy policy";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: title, item: `${siteUrl}/${kind}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-surface pb-12 pt-32 lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-[52rem] px-4 sm:px-6 lg:px-8">
          <p className="t-eyebrow text-accent">Legal</p>
          <h1 className="t-h1 mt-2.5 text-primary">{title}</h1>
          <p className="t-body-lg mt-4 max-w-[54ch] text-muted-foreground">{lede}</p>
          <p className="t-body-sm mt-5 text-muted-foreground">
            Last updated {doc.updated} · Cybiqon AI Solutions LLP · LLPIN ACV-9817
          </p>
        </div>
      </section>

      <section className="bg-surface-lowest pb-20 pt-12 lg:pb-28">
        <div className="mx-auto max-w-[52rem] px-4 sm:px-6 lg:px-8">
          <LegalDoc doc={doc} />

          <p className="t-body-sm mt-14 border-t border-border pt-6 text-muted-foreground">
            See also{" "}
            <Link
              href={`/${other}`}
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {otherLabel}
            </Link>
            . Our published apps each carry their own policy, linked from{" "}
            <Link
              href="/products"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              their product page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
