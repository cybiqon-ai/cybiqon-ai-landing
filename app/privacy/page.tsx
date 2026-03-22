import type { Metadata } from "next";
import { Shield, CheckCircle, Lock, Eye, UserX, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Cybiqon AI Solutions collects, uses, and protects your personal information. We are committed to transparency and data protection for all our clients.",
  keywords: "Cybiqon privacy policy, data protection, MSME data security",
  alternates: { canonical: "/privacy" },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cybiqon.in/' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://cybiqon.in/privacy' },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              <Shield className="w-3 h-3" />
              Your data, your rights
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              Privacy <span className="text-primary">policy</span>
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
              <h2 className="text-sm font-bold mb-2">Our commitment to your privacy</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                At Cybiqon AI Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we respect your privacy and are committed to protecting
                your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By using our website or services, you agree to the collection and use of information in accordance
                with this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Eye className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Information we collect</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="glass-card p-4">
                  <h3 className="text-sm font-bold mb-2">Personal information you provide</h3>
                  <p className="text-xs text-muted-foreground mb-2">When you contact us, book a call, or request our services:</p>
                  <ul className="space-y-1.5">
                    {["Name and business name", "Email address", "Phone number", "Project details and requirements", "Any other information you choose to provide"].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-border bg-white rounded-2xl p-4">
                  <h3 className="text-sm font-bold mb-2">Automatically collected information</h3>
                  <p className="text-xs text-muted-foreground mb-2">When you visit our website:</p>
                  <ul className="space-y-1.5">
                    {["IP address and browser type", "Device information", "Pages visited and time spent on our site", "Referring website or source"].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    We use Google Analytics. You can{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      opt out here
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">How we use your information</h2>
              </div>

              <div className="success-card p-4">
                <ul className="space-y-2">
                  {[
                    { label: "Provide our services:", desc: "Respond to inquiries, schedule consultations, and deliver services you request." },
                    { label: "Improve our website:", desc: "Analyze usage patterns to enhance user experience and optimize content." },
                    { label: "Communicate with you:", desc: "Send project updates, support messages, and (with consent) occasional tips or offers." },
                    { label: "Legal compliance:", desc: "Comply with applicable laws and regulations." },
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
            </div>

            {/* We Don't Sell Your Data */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <UserX className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">We don&apos;t sell your data</h2>
              </div>

              <div className="warm-card p-4">
                <p className="text-xs font-semibold text-foreground mb-2">
                  We do NOT sell, rent, or trade your personal information to third parties.
                </p>
                <p className="text-xs text-muted-foreground mb-2">We may share your information only in these limited circumstances:</p>
                <ul className="space-y-2">
                  {[
                    { label: "Service providers:", desc: "Trusted third-party services (hosting, email, analytics) that process data on our behalf. They are contractually obligated to protect your information." },
                    { label: "Legal requirements:", desc: "If required by law, court order, or government regulation." },
                    { label: "Business transfers:", desc: "In the unlikely event of a merger, acquisition, or sale of assets (you'll be notified)." },
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
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Your rights & choices</h2>
              </div>

              <div className="glass-card p-4">
                <ul className="space-y-2">
                  {[
                    { label: "Access your data:", desc: "Request a copy of the personal information we hold about you." },
                    { label: "Correct your data:", desc: "Ask us to update or correct inaccurate information." },
                    { label: "Delete your data:", desc: "Request deletion of your personal information (subject to legal obligations)." },
                    { label: "Opt out:", desc: "Unsubscribe from marketing emails anytime (link included in every email)." },
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
                <p className="text-[11px] text-muted-foreground mt-3">
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:support@cybiqon.in" className="text-primary hover:underline">support@cybiqon.in</a>.
                </p>
              </div>
            </div>

            {/* Shorter Sections */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-border bg-white rounded-2xl p-4">
                <h3 className="text-sm font-bold mb-2">Data security</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures including HTTPS encryption,
                  secure hosting, and restricted access. No method of transmission is 100% secure,
                  but we strive to protect your data.
                </p>
              </div>

              <div className="glass-card p-4">
                <h3 className="text-sm font-bold mb-2">Cookies & tracking</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to improve your browsing experience
                  and analyze site traffic. You can control cookies through your browser settings.
                </p>
              </div>

              <div className="warm-card p-4">
                <h3 className="text-sm font-bold mb-2">Children&apos;s privacy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our services are not intended for individuals under 18. We do not knowingly collect personal
                  information from children. Contact us immediately if you believe we have.
                </p>
              </div>

              <div className="success-card p-4">
                <h3 className="text-sm font-bold mb-2">Changes to this policy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page
                  with an updated date. We encourage you to review periodically.
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
                  <h3 className="text-sm font-bold mb-1">Questions about this policy?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
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
