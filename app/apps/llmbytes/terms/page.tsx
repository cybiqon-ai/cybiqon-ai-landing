import type { Metadata } from "next";
import { FileText, CheckCircle, AlertTriangle, Ban, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "llmbytes App Terms of Service",
  description:
    "Terms of Service for the llmbytes AI news app by Cybiqon AI Solutions. Understand the licence to use the app, acceptable use, content disclaimers, and your rights.",
  keywords: "llmbytes terms of service, AI news app terms, Cybiqon app EULA",
  alternates: { canonical: "/apps/llmbytes/terms" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    { "@type": "ListItem", position: 2, name: "llmbytes", item: "https://cybiqon.in/apps/llmbytes" },
    { "@type": "ListItem", position: 3, name: "Terms of Service", item: "https://cybiqon.in/apps/llmbytes/terms" },
  ],
};

export default function LlmbytesTermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              <FileText className="w-3 h-3" />
              llmbytes · AI news app
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              llmbytes <span className="text-primary">terms of service</span>
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: 12 July 2026</p>
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
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the <strong>llmbytes</strong> mobile
                application (package <span className="font-mono">com.cybiqon.llmbytes</span>), an AI &amp; tech news
                reader published by Cybiqon AI Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                By downloading, installing, or using llmbytes, you agree to these Terms.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If you do not agree with any part of these Terms, please do not use the app.
              </p>
            </div>

            {/* Licence to use */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Licence to use the app</h2>
              </div>

              <div className="glass-card p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  We grant you a personal, limited, non-exclusive, non-transferable, revocable licence to install
                  and use llmbytes for your own personal, non-commercial use, subject to these Terms.
                </p>
                <p className="text-[11px] text-muted-foreground">
                  llmbytes is currently free to use and does not require an account or sign-in.
                </p>
              </div>
            </div>

            {/* Acceptable use */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Ban className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Acceptable use</h2>
              </div>

              <div className="success-card p-4">
                <p className="text-xs text-muted-foreground mb-2">You agree that you will not:</p>
                <ul className="space-y-1.5">
                  {[
                    "Copy, modify, reverse-engineer, decompile, or attempt to extract the source code of the app",
                    "Scrape, harvest, or bulk-download content, or resell or redistribute it commercially",
                    "Interfere with, disrupt, or overload the app or its backend services",
                    "Use the app for any unlawful purpose or in violation of any applicable law",
                    "Attempt to gain unauthorised access to our systems or other users' data",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Content & accuracy */}
            <div>
              <h2 className="text-base font-extrabold mb-3">Content &amp; accuracy</h2>

              <div className="space-y-3">
                <div className="warm-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">AI-assisted summaries</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    llmbytes presents news about AI and technology, and some summaries are generated or assisted by
                    artificial intelligence. While we aim for accuracy, AI-generated content may contain errors,
                    omissions, or outdated information. Always verify important details against the original sources
                    linked in each article.
                  </p>
                </div>

                <div className="border border-border bg-white rounded-2xl p-4">
                  <h3 className="text-sm font-bold mb-1.5">Not professional advice</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Content in llmbytes is provided for general information only and does not constitute financial,
                    investment, legal, or professional advice. You are solely responsible for how you act on it.
                  </p>
                </div>

                <div className="glass-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">Third-party sources</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Articles reference and link to third-party news sources. We do not own that underlying content and
                    are not responsible for it. Those sources are governed by their own terms and policies.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual property */}
            <div>
              <h2 className="text-base font-extrabold mb-3">Intellectual property</h2>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="warm-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">Our rights</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The llmbytes app, its name, logo, design, and original editorial presentation are owned by
                    Cybiqon AI Solutions and protected by applicable laws. These Terms do not transfer any ownership
                    to you.
                  </p>
                </div>

                <div className="glass-card p-4">
                  <h3 className="text-sm font-bold mb-1.5">Third-party rights</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Trademarks, headlines, and article content referenced in the app belong to their respective
                    owners and are used for informational and news-reporting purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Warranties / disclaimers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Disclaimers &amp; liability</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="text-sm font-bold mb-2 text-amber-800">Provided &ldquo;as is&rdquo;</h3>
                  <p className="text-xs text-amber-800/70 leading-relaxed">
                    The app is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any
                    kind, express or implied. We do not guarantee that the app will be uninterrupted, error-free, or
                    that content will always be accurate or available.
                  </p>
                </div>

                <div className="glass-card p-4">
                  <h3 className="text-sm font-bold mb-2">Limitation of liability</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by law, Cybiqon AI Solutions will not be liable for any indirect,
                    incidental, or consequential damages arising from your use of, or inability to use, the app.
                  </p>
                </div>
              </div>
            </div>

            {/* Shorter sections */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-border bg-white rounded-2xl p-4">
                <h3 className="text-sm font-bold mb-1.5">Notifications</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If you opt in, the app may send push notifications about breaking AI news. You can turn these off at
                  any time from your device settings.
                </p>
              </div>

              <div className="warm-card p-4">
                <h3 className="text-sm font-bold mb-1.5">Availability &amp; changes</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We may add, change, suspend, or discontinue features of the app at any time. We may also introduce
                  paid features in the future, which would be clearly indicated before any charge.
                </p>
              </div>

              <div className="success-card p-4">
                <h3 className="text-sm font-bold mb-1.5">Termination</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You may stop using the app at any time by uninstalling it. We may suspend or terminate your access if
                  you breach these Terms or misuse the app.
                </p>
              </div>

              <div className="glass-card p-4">
                <h3 className="text-sm font-bold mb-1.5">Governing law</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of India, and any disputes are subject to the jurisdiction of
                  the courts in India.
                </p>
              </div>
            </div>

            <div className="warm-card p-4">
              <h3 className="text-sm font-bold mb-2">Changes to these terms</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We may update these Terms from time to time. Changes will be posted on this page with a new
                &ldquo;Last updated&rdquo; date. Continued use of the app after changes constitutes acceptance.
              </p>
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
                    If you have any questions about these Terms of Service or the llmbytes app, please contact us:
                  </p>
                  <div className="space-y-1 text-xs">
                    <p><strong>Email:</strong> <a href="mailto:support@cybiqon.in" className="text-primary hover:underline">support@cybiqon.in</a></p>
                    <p><strong>Phone:</strong> +91 92507 11473</p>
                    <p><strong>App:</strong> llmbytes (com.cybiqon.llmbytes)</p>
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
