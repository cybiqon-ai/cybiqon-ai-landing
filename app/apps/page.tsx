import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APPS, STATUS_LABEL } from "@/data/apps";

const siteUrl = "https://cybiqon.in";

export const metadata: Metadata = {
  title: "Apps We've Built and Shipped",
  description:
    "The Android apps Cybiqon has built and published: LLMBytes, an AI news reader; MeFlow, a personal organiser; and VitaLoop, a kidney-health tracker for Indian patients.",
  keywords:
    "Cybiqon apps, Android app developer India, LLMBytes, MeFlow, VitaLoop, MSME app development",
  alternates: { canonical: "/apps" },
  openGraph: {
    title: "Apps We've Built and Shipped | Cybiqon AI Solutions",
    description:
      "Three Android apps, built and shipped by a one-person studio in India — an AI news reader, a personal organiser, and a kidney-health tracker.",
    url: `${siteUrl}/apps`,
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Apps", item: `${siteUrl}/apps` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cybiqon apps",
  itemListElement: APPS.map((app, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MobileApplication",
      name: app.name,
      operatingSystem: "Android",
      applicationCategory: "UtilitiesApplication",
      description: app.summary,
      url: `${siteUrl}/apps/${app.slug}`,
    },
  })),
};

export default function AppsPage() {
  return (
    <div className="min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Asymmetric, left-weighted. No centred hero, no pill badge — the two tells that
          appear on every other page of this site. */}
      <section className="pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-6 md:grid-cols-[1fr_18rem] md:items-end">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ochre">
                Apps
              </p>
              <h1 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl">
                Three things we&apos;ve built and shipped.
              </h1>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:pb-1">
              We build for clients, and we build for ourselves. These are the ones with our
              own name on them — same standard, no client to blame.
            </p>
          </div>
        </div>
      </section>

      {/* The Index. Ruled rows, real index numbers, no cards. */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <ol className="border-t border-rule-strong/25">
            {APPS.map((app, i) => (
              <li key={app.slug}>
                <Link
                  href={`/apps/${app.slug}`}
                  className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-border py-6 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted focus-visible:bg-muted focus-visible:outline-none md:grid-cols-[3.5rem_14rem_1fr_auto] md:py-7"
                >
                  <span className="text-[13px] font-semibold tabular-nums tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-ochre">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {app.name}
                  </span>

                  <span className="col-start-2 row-start-2 text-[15px] leading-relaxed text-muted-foreground md:col-start-3 md:row-start-1">
                    {app.tagline}
                  </span>

                  <span className="col-start-3 row-start-1 flex items-center gap-4 justify-self-end md:col-start-4">
                    <span
                      className={`hidden text-[11px] font-semibold uppercase tracking-[0.14em] sm:inline ${
                        app.status === "live" ? "text-ochre" : "text-muted-foreground"
                      }`}
                    >
                      {STATUS_LABEL[app.status]}
                    </span>
                    <ArrowRight
                      strokeWidth={1.5}
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-foreground"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Want something like these built for your business?{" "}
            <Link
              href="/contact"
              className="text-ochre underline decoration-ochre/30 underline-offset-4 transition-colors hover:decoration-ochre"
            >
              Tell us what you need
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
