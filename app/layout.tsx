import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
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
      <body className="bg-background text-foreground font-sans antialiased">
        <TooltipProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
          <Toaster />
          <Sonner />
        </TooltipProvider>

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
