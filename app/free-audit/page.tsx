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
  {
    icon: Search,
    title: "SEO Health Check",
    description:
      "We check how search engines see your site — titles, meta tags, headings, and indexing issues.",
  },
  {
    icon: Zap,
    title: "Performance Score",
    description:
      "Page speed, Core Web Vitals, and load time analysis on mobile and desktop.",
  },
  {
    icon: BarChart3,
    title: "Conversion Review",
    description:
      "We look at your CTAs, forms, and user flow to spot where you're losing leads.",
  },
  {
    icon: Shield,
    title: "Security & Mobile Check",
    description:
      "SSL, mobile responsiveness, and basic security best-practices review.",
  },
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
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Get a <span className="gradient-text">Free Website Audit</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Find out what&apos;s holding your website back — we&apos;ll review
              it and send you a detailed report within 48 hours. No strings
              attached.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Benefits */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">
                What You&apos;ll Get
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6 mt-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">100% Free, No Obligations</p>
                    <p className="text-sm text-muted-foreground">
                      This isn&apos;t a sales pitch disguised as an audit. You&apos;ll
                      get an honest, actionable report — whether you work with us
                      or not.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <AuditForm />
          </div>
        </div>
      </section>
    </div>
  );
}
