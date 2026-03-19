import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import IndustryShowcase from "@/components/IndustryShowcase";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Cybiqon AI Solutions | Modern Websites & AI Automation for MSMEs in India",
  description:
    "Transform your MSME with affordable, professional websites and AI-powered automation. We help small and medium businesses across India grow online with modern technology. Book your free consultation today.",
  keywords:
    "MSME website design India, AI automation for small business, affordable web development, digital transformation MSMEs, bulk data scraping India, chrome extension development, web scraping services, business automation India",
  alternates: { canonical: "/" },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      ],
    }),
  },
};

export default function IndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Hero />
      <TrustBar />
      <div id="solutions">
        <Services />
      </div>
      <WhyChooseUs />
      <IndustryShowcase />
      <Stats />
      <Testimonials />
      <Contact />
    </div>
  );
}
