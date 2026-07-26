import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LegalDoc from "./LegalDoc";
import { getApp } from "@/data/apps";
import { notFound } from "next/navigation";

const siteUrl = "https://cybiqon.in";

/**
 * Shared shell for /apps/[slug]/privacy and /apps/[slug]/terms.
 *
 * These are the URLs Play Console points at, so they need to be reachable, readable and
 * unambiguous about which app and which version they describe — hence the app name and
 * "Last updated" in the header rather than buried at the bottom.
 */
export default function LegalPage({
  slug,
  kind,
}: {
  slug: string;
  kind: "privacy" | "terms";
}) {
  const app = getApp(slug);
  if (!app) notFound();
  const doc = kind === "privacy" ? app.privacy : app.terms;
  const title = kind === "privacy" ? "Privacy Policy" : "Terms of Service";
  const other = kind === "privacy" ? "terms" : "privacy";
  const otherLabel = kind === "privacy" ? "Terms of service" : "Privacy policy";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Apps", item: `${siteUrl}/apps` },
      { "@type": "ListItem", position: 3, name: app.name, item: `${siteUrl}/apps/${app.slug}` },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: `${siteUrl}/apps/${app.slug}/${kind}`,
      },
    ],
  };

  return (
    <div className="min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <Link
            href={`/apps/${app.slug}`}
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft strokeWidth={1.5} className="h-3.5 w-3.5" />
            {app.name}
          </Link>

          <div className="max-w-3xl border-b border-rule-strong/25 pb-6">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
              {title}
            </h1>
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[13px]">
              <div className="flex gap-2">
                <dt className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  App
                </dt>
                <dd className="text-foreground">{app.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Last updated
                </dt>
                <dd className="tabular-nums text-foreground">{doc.updated}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <LegalDoc doc={doc} />

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-[13px]">
              <Link
                href={`/apps/${app.slug}/${other}`}
                className="text-ochre underline decoration-ochre/30 underline-offset-4 transition-colors hover:decoration-ochre"
              >
                {otherLabel}
              </Link>
              <Link
                href={`/apps/${app.slug}`}
                className="text-ochre underline decoration-ochre/30 underline-offset-4 transition-colors hover:decoration-ochre"
              >
                About {app.name}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
