import type { Metadata } from "next";
import { FileText, CheckCircle, AlertTriangle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Cybiqon AI Solutions services. Understand our service agreements, payment terms, and client responsibilities.",
  keywords: "Cybiqon terms of service, service agreement, web development contract",
  alternates: { canonical: "/terms" },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cybiqon.in/' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://cybiqon.in/terms' },
  ],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              <FileText className="w-3 h-3" />
              Service agreement
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              Terms of <span className="text-primary">service</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-14 md:pb-18">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl space-y-6">

            {/* Introduction */}
            <div className="warm-card p-5">
              <h2 className="text-sm font-bold mb-2">Agreement to terms</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                Welcome to Cybiqon AI Solutions. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website and services.
                By accessing our website or engaging our services, you agree to be bound by these Terms.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Please read these Terms carefully. If you do not agree with any part, you may not use our services.
              </p>
            </div>

            {/* Our Services */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Our services</h2>
              </div>

              <div className="glass-card p-4">
                <p className="text-xs text-muted-foreground mb-2">Cybiqon AI Solutions provides digital solutions including:</p>
                <ul className="space-y-1.5">
                  {["Website design and development", "AI automation solutions", "Custom digital solutions for MSMEs", "Post-launch support and maintenance"].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Specific deliverables, timelines, and pricing will be outlined in individual project agreements.
                </p>
              </div>
            </div>

            {/* Service Agreement & Process */}
            <div>
              <h2 className="text-base font-extrabold mb-3">Service agreement & process</h2>

              <div className="space-y-3">
                <div className="warm-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">1. Consultation & quote</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All projects begin with a free consultation. After understanding your requirements, we&apos;ll provide a detailed
                    quote including scope, deliverables, timeline, and cost. No work begins until you approve.
                  </p>
                </div>

                <div className="glass-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">2. Payment terms</h3>
                  <ul className="space-y-1.5">
                    {[
                      { label: "Standard packages:", desc: "50% upfront and 50% upon project completion." },
                      { label: "Custom projects:", desc: "Payment milestones outlined in the project agreement." },
                      { label: "Late payments:", desc: "Overdue payments may result in project suspension." },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-foreground">{item.label}</span>{" "}
                          <span className="text-muted-foreground">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="success-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">3. Client responsibilities</h3>
                  <p className="text-xs text-muted-foreground mb-2">To ensure timely completion, you agree to:</p>
                  <ul className="space-y-1.5">
                    {[
                      "Provide necessary content, assets, and information in a timely manner",
                      "Respond to questions and feedback requests promptly",
                      "Review and approve deliverables within agreed timeframes",
                      "Ensure you have rights to any content or materials you provide",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Delays caused by missing information or approvals may extend timelines.
                  </p>
                </div>

                <div className="border border-border bg-white rounded-2xl p-4">
                  <h3 className="text-sm font-bold mb-1.5">4. Revisions & changes</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Most packages include 2 rounds of design revisions. Additional revisions or significant scope changes
                    may incur extra charges. We&apos;ll agree on costs before proceeding.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-base font-extrabold mb-3">Intellectual property & ownership</h2>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="warm-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">Your content</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You retain full ownership of any content, logos, images, or materials you provide. By providing
                    these, you grant us a license to use them solely for delivering your project.
                  </p>
                </div>

                <div className="glass-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">Portfolio & case studies</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We may showcase your project in our portfolio unless you request otherwise in writing.
                    We will not disclose confidential business information without permission.
                  </p>
                </div>
              </div>

              <div className="success-card p-4 mt-3">
                <h3 className="text-sm font-bold mb-1.5">Final deliverables</h3>
                <p className="text-xs text-muted-foreground mb-2">Upon full payment, you own the final deliverable including:</p>
                <ul className="space-y-1.5">
                  {["All custom design elements", "Source code (unless otherwise specified)", "Documentation and credentials"].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Third-party libraries or frameworks used are subject to their own licenses.
                </p>
              </div>
            </div>

            {/* Warranties */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Warranties & disclaimers</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="success-card p-4">
                  <h3 className="text-sm font-bold mb-2">What we guarantee</h3>
                  <ul className="space-y-1.5">
                    {[
                      "Professional skill and care in delivery",
                      "Functional, mobile-responsive output matching agreed specs",
                      "Bug fixes and error resolution during support period",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="text-sm font-bold mb-2 text-amber-800">What we don&apos;t guarantee</h3>
                  <ul className="space-y-1.5">
                    {[
                      "Specific search engine rankings or traffic volumes",
                      "Guaranteed sales, leads, or business results",
                      "Uninterrupted service (though we aim for 99.9% uptime)",
                      "Compatibility with all future third-party platforms",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-amber-800/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-amber-700/70 mt-2">
                    Results depend on your industry, competition, content quality, and marketing efforts.
                  </p>
                </div>
              </div>
            </div>

            {/* Shorter Sections */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="glass-card p-4">
                <h3 className="text-sm font-bold mb-1.5">Limitation of liability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We are not liable for indirect, incidental, or consequential damages. Our total liability is limited
                  to the amount you paid us. We are not responsible for damages caused by factors outside our control.
                </p>
              </div>

              <div className="border border-border bg-white rounded-2xl p-4">
                <h3 className="text-sm font-bold mb-1.5">Termination</h3>
                <ul className="space-y-1.5">
                  {[
                    { label: "By you:", desc: "Terminate anytime, but payments for completed work are non-refundable." },
                    { label: "By us:", desc: "We may terminate if you breach Terms, fail to provide materials, or default on payment." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">{item.label}</span>{" "}
                        <span className="text-muted-foreground">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Upon termination, you receive all completed work. Outstanding payments remain due.
                </p>
              </div>

              <div className="warm-card p-4">
                <h3 className="text-sm font-bold mb-1.5">Governing law & disputes</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of India. Disputes will be resolved through good-faith negotiation first.
                  If that fails, they&apos;ll be subject to the jurisdiction of courts in India.
                </p>
              </div>

              <div className="success-card p-4">
                <h3 className="text-sm font-bold mb-1.5">Changes to these terms</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We may update these Terms from time to time. Changes will be posted with a new &ldquo;Last Updated&rdquo; date.
                  Continued use of our services after changes constitutes acceptance.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="warm-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Questions about these terms?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-1 text-xs">
                    <p><strong>Email:</strong> <a href="mailto:support@cybiqon.in" className="text-primary hover:underline">support@cybiqon.in</a></p>
                    <p><strong>Phone:</strong> +91 92507 11473</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
