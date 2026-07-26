import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { APPS, STATUS_LABEL, getApp } from "@/data/apps";

const siteUrl = "https://cybiqon.in";

// Both are required. Without `dynamicParams = false`, Next emits a Node-runtime dynamic
// fallback, which @cloudflare/next-on-pages classifies as an invalid function and FAILS
// the build. With it, these are pure static assets — no edge runtime, no D1.
export const dynamicParams = false;
export function generateStaticParams() {
  return APPS.map((app) => ({ slug: app.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app) return { title: "App not found" };

  return {
    title: `${app.name} — ${app.tagline}`,
    description: app.summary,
    alternates: { canonical: `/apps/${app.slug}` },
    openGraph: {
      title: `${app.name} — ${app.tagline} | Cybiqon`,
      description: app.summary,
      url: `${siteUrl}/apps/${app.slug}`,
      type: "website",
    },
  };
}

export default async function AppPage({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    description: app.summary,
    operatingSystem: "Android",
    applicationCategory: "UtilitiesApplication",
    url: `${siteUrl}/apps/${app.slug}`,
    ...(app.playUrl ? { installUrl: app.playUrl } : {}),
    author: { "@type": "Organization", name: "Cybiqon AI Solutions", url: siteUrl },
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Apps", item: `${siteUrl}/apps` },
      { "@type": "ListItem", position: 3, name: app.name, item: `${siteUrl}/apps/${app.slug}` },
    ],
  };

  return (
    <div className="min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <Link
            href="/apps"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft strokeWidth={1.5} className="h-3.5 w-3.5" />
            All apps
          </Link>

          <div className="grid gap-8 md:grid-cols-[1fr_16rem] md:items-start md:gap-12">
            <div>
              <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl">
                {app.name}
              </h1>
              <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                {app.summary}
              </p>
            </div>

            {/* Spec strip — label/value pairs, the document idiom rather than a card. */}
            <dl className="divide-y divide-border border-y border-border text-[13px]">
              {[
                { k: "Status", v: STATUS_LABEL[app.status] },
                { k: "Platform", v: app.platform },
                { k: "Package", v: app.packageId },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="text-right tabular-nums text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {app.playUrl && (
            <a
              href={app.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-90 active:scale-[0.98]"
            >
              Get it on Google Play
              <ArrowUpRight strokeWidth={1.5} className="h-4 w-4" />
            </a>
          )}
        </div>
      </section>

      {/* Why it exists — the part a template leaves out. */}
      <section className="pb-14 md:pb-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-4 border-y border-rule-strong/25 py-8 md:grid-cols-[13rem_1fr] md:gap-10">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ochre">
              Why it exists
            </h2>
            <p className="max-w-2xl text-[17px] leading-relaxed text-foreground">{app.why}</p>
          </div>
        </div>
      </section>

      {/* Numbered because the catalogue idiom carries through — but these are ruled rows,
          not a three-column card grid. */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <h2 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            What it does
          </h2>
          <dl className="divide-y divide-border border-y border-border">
            {app.features.map((f) => (
              <div key={f.title} className="grid gap-1.5 py-5 md:grid-cols-[16rem_1fr] md:gap-10">
                <dt className="text-[15px] font-semibold tracking-tight text-foreground">
                  {f.title}
                </dt>
                <dd className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {f.description}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
            <Link
              href={`/apps/${app.slug}/privacy`}
              className="text-ochre underline decoration-ochre/30 underline-offset-4 transition-colors hover:decoration-ochre"
            >
              Privacy policy
            </Link>
            <Link
              href={`/apps/${app.slug}/terms`}
              className="text-ochre underline decoration-ochre/30 underline-offset-4 transition-colors hover:decoration-ochre"
            >
              Terms of service
            </Link>
            <a
              href="mailto:support@cybiqon.in"
              className="text-ochre underline decoration-ochre/30 underline-offset-4 transition-colors hover:decoration-ochre"
            >
              Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
