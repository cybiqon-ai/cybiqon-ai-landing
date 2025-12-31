import { FileText, CheckCircle, AlertTriangle, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Terms = () => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cybiqon.in/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Terms of Service',
        item: 'https://cybiqon.in/terms'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms of Service | Cybiqon AI Solutions"
        description="Read the terms and conditions for using Cybiqon AI Solutions services. Understand our service agreements, payment terms, and client responsibilities."
        canonical="/terms"
        keywords="Cybiqon terms of service, service agreement, web development contract"
        structuredData={breadcrumbSchema}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-6">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Welcome to Cybiqon AI Solutions. These Terms of Service ("Terms") govern your use of our website and services.
                By accessing our website or engaging our services, you agree to be bound by these Terms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Please read these Terms carefully before using our services. If you do not agree with any part of these Terms,
                you may not access our website or use our services.
              </p>
            </div>

            {/* Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-heading">Our Services</h2>
              </div>

              <div className="glass-card p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cybiqon AI Solutions provides digital solutions including:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Website design and development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">AI automation solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Custom digital solutions for MSMEs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Post-launch support and maintenance</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Specific services, deliverables, timelines, and pricing will be outlined in individual project agreements or proposals.
                </p>
              </div>
            </div>

            {/* Service Agreement */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-6">Service Agreement & Process</h2>

              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">1. Consultation & Quote</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All projects begin with a free consultation. After understanding your requirements, we'll provide a detailed
                    quote including scope, deliverables, timeline, and cost. No work begins until you approve the quote.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">2. Payment Terms</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Standard Packages:</span>
                        <span className="text-muted-foreground"> Payment is typically split 50% upfront and 50% upon project completion.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Custom Projects:</span>
                        <span className="text-muted-foreground"> Payment milestones will be outlined in the project agreement.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Late Payments:</span>
                        <span className="text-muted-foreground"> Overdue payments may result in project suspension until payment is received.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">3. Client Responsibilities</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To ensure timely project completion, you agree to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Provide necessary content, assets, and information in a timely manner</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Respond to questions and feedback requests promptly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Review and approve deliverables within agreed timeframes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Ensure you have rights to any content or materials you provide</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Delays caused by missing information or approvals may extend project timelines.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">4. Revisions & Changes</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Most packages include 2 rounds of design revisions. Additional revisions or significant scope changes
                    may incur extra charges. We'll discuss and agree on any additional costs before proceeding.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-6">Intellectual Property & Ownership</h2>

              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">Your Content</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You retain full ownership of any content, logos, images, or materials you provide to us. By providing
                    these materials, you grant us a license to use them solely for the purpose of delivering your project.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">Final Deliverables</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Upon full payment, you own the final website, application, or deliverable we create for you. This includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">All custom design elements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Source code (unless otherwise specified)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Documentation and credentials</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    We may use third-party libraries, frameworks, or tools that are subject to their own licenses.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">Portfolio & Case Studies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may showcase your project in our portfolio or case studies unless you request otherwise in writing.
                    We will not disclose confidential business information without your permission.
                  </p>
                </div>
              </div>
            </div>

            {/* Warranties & Disclaimers */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-heading">Warranties & Disclaimers</h2>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">What We Guarantee</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">We will deliver services with professional skill and care</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Your website will be functional, mobile-responsive, and meet agreed specifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">We will fix bugs and errors during the support period</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-6 bg-amber-50">
                  <h3 className="text-xl font-bold mb-3">What We Don't Guarantee</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    While we strive for excellence, we cannot guarantee:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Specific search engine rankings or traffic volumes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Guaranteed sales, leads, or business results</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Uninterrupted service (though we aim for 99.9% uptime)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Compatibility with all future third-party services or platforms</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Your results depend on many factors including your industry, competition, content quality, and marketing efforts.
                  </p>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Limitation of Liability</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="space-y-3">
                <li className="text-muted-foreground">
                  • We are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of our services.
                </li>
                <li className="text-muted-foreground">
                  • Our total liability for any claim related to our services is limited to the amount you paid us for those services.
                </li>
                <li className="text-muted-foreground">
                  • We are not responsible for damages caused by factors outside our control (e.g., hosting failures, third-party services, force majeure).
                </li>
              </ul>
            </div>

            {/* Termination */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Termination</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Either party may terminate the service agreement under certain conditions:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">By You:</span>
                    <span className="text-muted-foreground"> You may terminate at any time, but payments for completed work are non-refundable.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">By Us:</span>
                    <span className="text-muted-foreground"> We may terminate if you breach these Terms, fail to provide necessary materials, or make payment defaults.</span>
                  </div>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Upon termination, you will receive all completed work up to that point. Any outstanding payments remain due.
              </p>
            </div>

            {/* Governing Law */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Governing Law & Disputes</h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of India. Any disputes will be resolved through good-faith negotiation first.
                If negotiation fails, disputes will be subject to the jurisdiction of courts in India.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Changes to These Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms
                on this page with a new "Last Updated" date. Continued use of our services after changes constitutes acceptance
                of the new Terms.
              </p>
            </div>

            {/* Contact */}
            <div className="glass-card p-8 bg-gradient-to-br from-blue-50 to-emerald-50">
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Questions About These Terms?</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> <a href="mailto:support@cybiqon.in" className="text-primary hover:underline">support@cybiqon.in</a></p>
                    <p><strong>Phone:</strong> +91 88962 70660</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
