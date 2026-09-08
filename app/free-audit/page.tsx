import type { Metadata } from "next";
import { ChartBar, CheckCircle, Lightning, MagnifyingGlass, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import AuditForm from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Free Website Audit for Indian MSMEs | Cybiqon",
  description:
    "Get a free, expert website audit for your business. We review performance, SEO, mobile-friendliness, and security — and send you a detailed report within 48 hours.",
  keywords:
    "free website audit, website review India, MSME website audit, website performance check, SEO audit India",
  alternates: { canonical: "/free-audit" },
};

const benefits = [
  { icon: MagnifyingGlass, title: "SEO health check", description: "How search engines actually see the site — titles, meta tags, headings and anything blocking indexing." },
  { icon: Lightning, title: "Performance score", description: "Page speed and Core Web Vitals, measured on a mid-range phone rather than a laptop." },
  { icon: ChartBar, title: "Conversion review", description: "Calls to action, forms and the path through the site — where enquiries are being lost." },
  { icon: ShieldCheck, title: "Security and mobile", description: "SSL, mobile behaviour and a basic security best-practice review." },
];

export default function FreeAuditPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      { "@type": "ListItem", position: 2, name: "Free Website Audit", item: "https://cybiqon.in/free-audit" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden bg-surface pb-14 pt-32 lg:pb-16 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-softer opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <p className="t-eyebrow text-accent-ink">Free, no obligation</p>
          <h1 className="t-h1 mt-2.5 max-w-[18ch] text-primary">
            A free audit of your current website
          </h1>
          <p className="t-body-lg mt-5 max-w-[58ch] text-muted-foreground">
            Tell us the address and we will read it properly, then send a written report
            within 48 hours. It is a real review, not a sales document with your logo on it.
          </p>
        </div>
      </section>

      <section className="bg-surface-lowest py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <h2 className="t-h2 text-primary">What the report covers</h2>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-surface-low p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-high text-primary">
                      <benefit.icon weight="fill" aria-hidden className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="t-h3 text-primary">{benefit.title}</h3>
                      <p className="t-body-sm mt-1 text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
                <CheckCircle weight="fill" aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-tertiary-deep" />
                <div>
                  <p className="t-label text-primary">No obligation, and no pitch</p>
                  <p className="t-body-sm mt-1 text-muted-foreground">
                    You get an honest, actionable report whether you ever work with us or
                    not. If the site is fine, the report will say the site is fine.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-surface-lowest p-6 shadow-[0_2px_10px_-4px_rgba(0,48,79,0.12)] lg:p-8">
              <AuditForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
