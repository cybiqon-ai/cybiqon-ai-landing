import type { Metadata } from "next";
import { Shield, CheckCircle, Lock, Eye, Bell, Smartphone, UserX, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "llmbytes App Privacy Policy",
  description:
    "Privacy policy for the llmbytes AI news app by Cybiqon AI Solutions. Learn what data the app collects, how it is used, and your choices. No account or sign-in required.",
  keywords: "llmbytes privacy policy, AI news app privacy, Cybiqon app data safety",
  alternates: { canonical: "/apps/llmbytes/privacy" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    { "@type": "ListItem", position: 2, name: "llmbytes", item: "https://cybiqon.in/apps/llmbytes" },
    { "@type": "ListItem", position: 3, name: "Privacy Policy", item: "https://cybiqon.in/apps/llmbytes/privacy" },
  ],
};

export default function LlmbytesPrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              <Shield className="w-3 h-3" />
              llmbytes · AI news app
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              llmbytes <span className="text-primary">privacy policy</span>
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
              <h2 className="text-sm font-bold mb-2">About this policy</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                This Privacy Policy applies to the <strong>llmbytes</strong> mobile application
                (package <span className="font-mono">com.cybiqon.llmbytes</span>), an AI &amp; tech news reader
                published by Cybiqon AI Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). It explains
                what information the app handles, why, and the choices available to you.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>llmbytes does not require an account or sign-in.</strong> We do not ask for your name,
                email address, or phone number to use the app.
              </p>
            </div>

            {/* Information the app collects */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Eye className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Information the app collects</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="glass-card p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <h3 className="text-sm font-bold">Usage &amp; analytics data</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    We use Google Analytics for Firebase to understand how the app is used. This may include:
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "In-app events (e.g. screens viewed, articles opened)",
                      "Device model, operating system and app version",
                      "Approximate (coarse) region derived from IP address",
                      "A randomly generated app-instance identifier",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    This data is used only in aggregate to improve the app. It is not used to identify you personally.
                  </p>
                </div>

                <div className="border border-border bg-white rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Bell className="w-3.5 h-3.5 text-primary" />
                    <h3 className="text-sm font-bold">Push notification token</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    If you allow notifications, the app registers a device push token via Firebase Cloud
                    Messaging so we can send you breaking AI-news alerts.
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "The token is stored in our secure Firebase database",
                      "It identifies your device, not you personally",
                      "Used solely to deliver news notifications",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    You can turn notifications off at any time in your device settings; no token is stored unless
                    you grant permission.
                  </p>
                </div>
              </div>
            </div>

            {/* Stored on device */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Data stored only on your device</h2>
              </div>

              <div className="success-card p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  The following stays on your device and is <strong>never sent to us or any third party</strong>:
                </p>
                <ul className="space-y-2">
                  {[
                    { label: "Bookmarks (saved bytes):", desc: "The articles you save for later." },
                    { label: "Reading history & streaks:", desc: "Which articles you have read and your reading stats." },
                    { label: "Preferences:", desc: "Your chosen theme and app settings." },
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
                  Uninstalling the app or clearing its storage permanently removes this on-device data.
                </p>
              </div>
            </div>

            {/* What we don't collect */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <UserX className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">What we do not collect</h2>
              </div>

              <div className="warm-card p-4">
                <p className="text-xs font-semibold text-foreground mb-2">
                  We do NOT sell, rent, or trade any data to third parties, and llmbytes does not show third-party ads.
                </p>
                <p className="text-xs text-muted-foreground mb-2">The app does not collect:</p>
                <ul className="space-y-1.5">
                  {[
                    "Your name, email address, or phone number",
                    "Account credentials (there is no sign-in)",
                    "Precise / GPS location",
                    "Contacts, photos, files, or messages",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How we use */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">How we use information</h2>
              </div>

              <div className="glass-card p-4">
                <ul className="space-y-2">
                  {[
                    { label: "Deliver the app:", desc: "Fetch and display AI &amp; tech news articles." },
                    { label: "Send notifications:", desc: "Alert you to breaking AI news, only if you opt in." },
                    { label: "Improve the app:", desc: "Analyse aggregate usage to fix issues and improve features." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">{item.label}</span>{" "}
                        <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Third-party services */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-extrabold">Third-party services</h2>
              </div>

              <div className="glass-card p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  llmbytes relies on Google Firebase to operate. These services process limited data on our behalf:
                </p>
                <ul className="space-y-2">
                  {[
                    { label: "Firebase (Analytics, Cloud Messaging, Firestore, Cloud Storage):", desc: "Delivers content, notifications and usage analytics." },
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
                  Google&apos;s handling of this data is governed by the{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Google Privacy Policy
                  </a>
                  . Articles may link to external news sources; those websites have their own privacy policies.
                </p>
              </div>
            </div>

            {/* Shorter sections */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-border bg-white rounded-2xl p-4">
                <h3 className="text-sm font-bold mb-2">Data retention</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Push tokens are kept while notifications are enabled and removed when you disable them or uninstall
                  the app. Analytics data is retained according to Google Firebase&apos;s default retention settings.
                </p>
              </div>

              <div className="glass-card p-4">
                <h3 className="text-sm font-bold mb-2">Your choices</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Turn notifications on or off in your device settings, and clear all on-device data by clearing the
                  app&apos;s storage or uninstalling it. No personal account exists to delete.
                </p>
              </div>

              <div className="warm-card p-4">
                <h3 className="text-sm font-bold mb-2">Children&apos;s privacy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  llmbytes is a general-audience news app and is not directed to children under 13. We do not knowingly
                  collect personal information from children.
                </p>
              </div>

              <div className="success-card p-4">
                <h3 className="text-sm font-bold mb-2">Data security</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Data in transit is protected with HTTPS/TLS encryption and stored on Google&apos;s secure
                  infrastructure. No method of transmission is 100% secure, but we work to protect your data.
                </p>
              </div>
            </div>

            {/* Changes */}
            <div className="warm-card p-4">
              <h3 className="text-sm font-bold mb-2">Changes to this policy</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
                updated &ldquo;Last updated&rdquo; date. Significant changes may also be communicated in the app.
              </p>
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
                    If you have any questions about this Privacy Policy or the llmbytes app&apos;s data practices,
                    please contact us:
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
