import type { Metadata } from "next";
import { CheckCircle2, Zap, Search, BarChart3, Shield } from "lucide-react";
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
  { icon: Search, title: "SEO health check", description: "How search engines see your site — titles, meta tags, headings, and indexing issues." },
  { icon: Zap, title: "Performance score", description: "Page speed, Core Web Vitals, and load time analysis on mobile and desktop." },
  { icon: BarChart3, title: "Conversion review", description: "Your CTAs, forms, and user flow — where you're losing leads." },
  { icon: Shield, title: "Security & mobile check", description: "SSL, mobile responsiveness, and basic security best-practices review." },
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

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              <Search className="w-3 h-3" />
              100% free, no obligations
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              Get a free <span className="text-primary">website audit</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              Find out what&apos;s holding your website back — we&apos;ll review it and send you a detailed report within 48 hours. No strings attached.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-14 md:pb-18">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">
            {/* Left — Benefits */}
            <div>
              <h2 className="text-base font-extrabold mb-4">What you&apos;ll get</h2>

              <div className="space-y-3 mb-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={benefit.title}
                    className={`flex items-start gap-3 p-4 rounded-xl ${
                      i === 0 ? "warm-card" : i === 1 ? "glass-card" : i === 2 ? "success-card" : "border border-border bg-white rounded-2xl"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-0.5">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="warm-card p-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold mb-0.5">100% free, no obligations</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      This isn&apos;t a sales pitch disguised as an audit. You&apos;ll get an honest, actionable report — whether you work with us or not.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <AuditForm />
          </div>
        </div>
      </section>
    </div>
  );
}
