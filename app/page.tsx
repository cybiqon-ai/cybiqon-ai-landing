import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProblemsWeSolve from "@/components/ProblemsWeSolve";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhoFor from "@/components/WhoFor";
import Proof from "@/components/Proof";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Custom Software, AI Agents & Websites for Indian Businesses",
  description:
    "Custom AI agents, internal software and hand-coded websites for Indian businesses — written for you, not assembled from a template. From ₹9,999.",
  keywords:
    "custom AI agents India, AI automation for small business, custom software development India, custom coded website India, MSME website design India, android app development India, admin panel development, bulk data scraping India, chrome extension development, business website cost India, software agency India",
  alternates: { canonical: "/" },
};


export default function IndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Custom Website Development",
        description: "Hand-coded, mobile-first, SEO-ready websites for Indian businesses — written for the client rather than configured from a theme. From ₹9,999.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: "9999", priceCurrency: "INR" },
      },
      {
        "@type": "Service",
        name: "Custom Software and App Development",
        description: "Admin panels, dealer portals, inventory and field tools for Indian businesses, plus Play Store-ready Android builds.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: "29999", priceCurrency: "INR" },
      },
      {
        "@type": "Service",
        name: "Custom AI Agents and Automation",
        description: "AI agents built on a business's own data and rules — reading orders, checking stock, updating records and drafting replies.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: "19999", priceCurrency: "INR" },
      },
      {
        "@type": "Service",
        name: "Bulk Data Scraping",
        description: "Extract competitor prices, supplier catalogs, and leads from Indian business directories.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
      },
      {
        "@type": "Service",
        name: "Chrome Extension Development",
        description: "Custom browser tools for sales teams — GST automation, data extraction, and productivity tools.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: "6999", priceCurrency: "INR" },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero />
      <TrustBar />
      <ProblemsWeSolve />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <WhoFor />
      <Proof />
      <Contact />
    </div>
  );
}
