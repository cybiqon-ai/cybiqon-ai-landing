import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import RevealObserver from "@/components/RevealObserver";
import TrackedEvents from "@/components/TrackedEvents";
import ThemeScope from "@/components/ThemeScope";
import "./globals.css";


// The marketing typefaces, taken from the Stitch comp this page is built to —
// projects/7623040016974616845, "Cybiqon AI Homepage Redesign".
//
// Plus Jakarta Sans carries the headings, Inter the body. Two families with clearly
// different jobs rather than one family doing both, which is what the comp specifies
// and what the type scale in globals.css is measured against.
//
// The Tailwind key for the display face is `jakarta`, NOT `heading` — Navbar.tsx and
// Footer.tsx both apply a `font-heading` class that has never resolved to anything, and
// defining that name would silently restyle the wordmark on every page.
//
// Font files are static assets, so this costs zero Worker bytes against the 3 MiB cap.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});const siteUrl = "https://cybiqon.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  /* The suffix is "| Cybiqon", not "| Cybiqon AI Solutions". Twenty-three characters
     of brand on every page pushed nine of thirteen titles past the 60 Google renders,
     and the part that got cut was always the brand — so it was costing the keywords
     nothing to shorten and buying every page thirteen characters back. Google prints
     the site name above the title in the SERP regardless.

     The default title and description are the CURRENT positioning. They said
     "Affordable Web Development & AI Automation" and "WhatsApp bots" until 8 Sep 2026,
     which is the copy the whole repositioning moved away from — this is the fallback
     for any page that forgets its own, so it has to be right. */
  title: {
    default: "Custom Software, AI Agents & Websites for Indian Businesses",
    template: "%s | Cybiqon",
  },
  description:
    "Custom AI agents, internal software and hand-coded websites for Indian businesses — written for you, not assembled from a template. Websites from ₹9,999.",
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
    // /logo.png is 500x500 and was declared here as 1200x630, so every platform reading
    // this metadata got a wrong aspect-ratio hint and a square image in a 1.91:1 slot.
    // The site default is now a real card at the size it claims. See .okf/site/seo.md F4.
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Your business online in 2–3 weeks — Cybiqon AI Solutions",
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
  /* The `languages` block that used to sit here never reached the page. Next does NOT
     deep-merge `alternates`: every page that sets `alternates: { canonical }` replaced
     this object whole, so the hreflang tags were emitted on exactly zero routes — the
     same non-merge trap that bit `openGraph` in this file. Rather than wire it through
     thirteen pages, it is gone: this is a single-language site with no alternate
     versions, which is the case Google says not to use hreflang for. */
  alternates: {
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
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
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
        <TrackedEvents />

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
