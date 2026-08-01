import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import RevealObserver from "@/components/RevealObserver";
import ThemeScope from "@/components/ThemeScope";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const siteUrl = "https://cybiqon.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Affordable Web Development & AI Automation for Indian MSMEs | Cybiqon AI Solutions",
    template: "%s | Cybiqon AI Solutions",
  },
  description:
    "Affordable websites and AI automation built for Indian MSMEs. Professional web development starting at ₹9,999, WhatsApp bots, data scraping, and Chrome extensions. Fast delivery, transparent pricing.",
  authors: [{ name: "Cybiqon AI Solutions" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Cybiqon AI Solutions",
    locale: "en_IN",
    url: siteUrl,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Cybiqon AI Solutions - Web Development & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CybiqonAI",
    creator: "@CybiqonAI",
  },
  icons: {
    icon: "/logo.png",
  },
  other: {
    "theme-color": "#3B82F6",
    "msapplication-TileColor": "#3B82F6",
  },
  alternates: {
    languages: {
      "en-IN": siteUrl,
      en: siteUrl,
      "x-default": siteUrl,
    },
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cybiqon AI Solutions",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Affordable websites and AI-powered automation solutions for Indian MSMEs",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-92507-11473",
    contactType: "customer service",
    email: "support@cybiqon.in",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/cybiqon-ai-solutions",
    "https://www.facebook.com/cybiqon.ai.solutions/",
    "https://www.instagram.com/cybiqon.ai",
    "https://t.me/cybiqonai",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Cybiqon AI Solutions",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  description:
    "Affordable website development, Android app development, AI automation, data scraping, and Chrome extension services for Indian MSMEs.",
  telephone: "+91-92507-11473",
  email: "support@cybiqon.in",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  openingHours: "Mo-Sa 09:00-18:00",
  sameAs: [
    "https://www.linkedin.com/company/cybiqon-ai-solutions",
    "https://www.facebook.com/cybiqon.ai.solutions/",
    "https://www.instagram.com/cybiqon.ai",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <meta httpEquiv="content-language" content="en-IN" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      {/* TooltipProvider and the radix <Toaster /> were mounted here and are now gone.
          Neither was used: grep finds no <Tooltip> outside components/ui, and no
          useToast() call anywhere. They cost bundle size on every route — and every
          React route compiled for the edge lands in the same 3 MiB Worker, so dead
          providers here are paid for six times over. Sonner stays: components/
          AuditForm.tsx genuinely calls toast.success/error. */}
      <body className="bg-background text-foreground font-sans antialiased">
        {/* ThemeScope re-themes the chrome along with the page on Ledger routes, and
            drops it entirely on /lab, which brings its own header and footer.
            Navbar/Footer are props rather than children precisely so it can decline to
            render them; they stay server components either way.
            Sonner sits outside it because it portals to document.body regardless. */}
        <ThemeScope
          navbar={<Navbar />}
          footer={
            <>
              <Footer />
              <WhatsAppWidget />
            </>
          }
        >
          <main>{children}</main>
        </ThemeScope>
        <RevealObserver />
        <Sonner />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JBTXQ3BF5C"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JBTXQ3BF5C');
          `}
        </Script>
      </body>
    </html>
  );
}
