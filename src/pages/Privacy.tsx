import { Shield, CheckCircle, Lock, Eye, UserX, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-6">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold font-heading mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Cybiqon AI Solutions ("we," "us," or "our"), we respect your privacy and are committed to protecting
                your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using our website or services, you agree to the collection and use of information in accordance
                with this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-heading">Information We Collect</h2>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">Personal Information You Provide</h3>
                  <p className="text-muted-foreground mb-4">
                    When you contact us, book a call, or request our services, we may collect:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Name and business name</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Email address</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Phone number</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Project details and requirements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Any other information you choose to provide</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-3">Automatically Collected Information</h3>
                  <p className="text-muted-foreground mb-4">
                    When you visit our website, we may automatically collect:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">IP address and browser type</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Device information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Pages visited and time spent on our site</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Referring website or source</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    We use Google Analytics to understand how visitors use our site. You can opt out of Google Analytics
                    tracking by installing the{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Google Analytics Opt-out Browser Add-on
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-heading">How We Use Your Information</h2>
              </div>

              <div className="glass-card p-6">
                <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Provide Our Services:</span>
                      <span className="text-muted-foreground"> Respond to your inquiries, schedule consultations, and deliver the services you request.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Improve Our Website:</span>
                      <span className="text-muted-foreground"> Analyze usage patterns to enhance user experience and optimize our content.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Communicate With You:</span>
                      <span className="text-muted-foreground"> Send project updates, support messages, and (with your consent) occasional tips or offers.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Legal Compliance:</span>
                      <span className="text-muted-foreground"> Comply with applicable laws and regulations.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <UserX className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-heading">We Don't Sell Your Data</h2>
              </div>

              <div className="glass-card p-6">
                <p className="text-muted-foreground mb-4 font-semibold">
                  We do NOT sell, rent, or trade your personal information to third parties.
                </p>
                <p className="text-muted-foreground mb-4">
                  We may share your information only in these limited circumstances:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Service Providers:</span>
                      <span className="text-muted-foreground"> We may use trusted third-party services (like hosting, email, or analytics) that process data on our behalf. They are contractually obligated to protect your information.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Legal Requirements:</span>
                      <span className="text-muted-foreground"> If required by law, court order, or government regulation.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Business Transfers:</span>
                      <span className="text-muted-foreground"> In the unlikely event of a merger, acquisition, or sale of assets, your information may be transferred (you'll be notified).</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-heading">Your Rights & Choices</h2>
              </div>

              <div className="glass-card p-6">
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Access Your Data:</span>
                      <span className="text-muted-foreground"> Request a copy of the personal information we hold about you.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Correct Your Data:</span>
                      <span className="text-muted-foreground"> Ask us to update or correct inaccurate information.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Delete Your Data:</span>
                      <span className="text-muted-foreground"> Request deletion of your personal information (subject to legal obligations).</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">Opt Out:</span>
                      <span className="text-muted-foreground"> Unsubscribe from marketing emails anytime (link included in every email).</span>
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-6">
                  To exercise these rights, contact us at <a href="mailto:itspyguru@gmail.com" className="text-primary hover:underline">itspyguru@gmail.com</a>.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="glass-card p-6 bg-blue-50">
              <h3 className="text-xl font-bold mb-3">Data Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your information, including HTTPS encryption,
                secure hosting, and restricted access. However, no method of transmission over the internet is 100% secure.
                While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </div>

            {/* Cookies */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Cookies & Tracking</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic.
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Children's Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal
                information from children. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Changes to This Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy
                on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Contact */}
            <div className="glass-card p-8 bg-gradient-to-br from-blue-50 to-emerald-50">
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Questions About This Policy?</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions or concerns about this Privacy Policy or our data practices,
                    please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> <a href="mailto:itspyguru@gmail.com" className="text-primary hover:underline">itspyguru@gmail.com</a></p>
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

export default Privacy;
