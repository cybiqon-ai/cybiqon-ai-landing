import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Affordable Website Development & AI Automation for Indian MSMEs | Cybiqon",
  description:
    "Get a professional website starting at ₹9,999 and AI automation built for Indian MSMEs. Fast delivery, transparent pricing, zero tech headaches. Book your free consultation today.",
  keywords:
    "MSME website design India, affordable website development India, android app development India, AI automation for small business, website for small business India, digital transformation MSMEs, bulk data scraping India, chrome extension development, WhatsApp automation MSME, business website cost India, web development agency India",
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
        name: "Website Development",
        description: "Mobile-first, SEO-optimized websites for Indian MSMEs starting at ₹9,999.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: "9999", priceCurrency: "INR" },
      },
      {
        "@type": "Service",
        name: "Android App Development",
        description: "Custom Android apps for Indian MSMEs — inventory management, customer ordering, and field staff tracking.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: "29999", priceCurrency: "INR" },
      },
      {
        "@type": "Service",
        name: "AI Automation",
        description: "WhatsApp bots, customer support automation, and workflow AI for small businesses.",
        provider: { "@type": "Organization", name: "Cybiqon AI Solutions" },
        areaServed: { "@type": "Country", name: "India" },
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
      <div id="solutions">
        <Services />
      </div>
    </div>
  );
}
