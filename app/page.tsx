import type { Metadata } from "next";
import { Calendar, Lightbulb, Code2, Headphones } from "lucide-react";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import IndustryShowcase from "@/components/IndustryShowcase";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Affordable Website Development & AI Automation for Indian MSMEs | Cybiqon",
  description:
    "Get a professional website starting at ₹9,999 and AI automation built for Indian MSMEs. Fast delivery, transparent pricing, zero tech headaches. Book your free consultation today.",
  keywords:
    "MSME website design India, affordable website development India, android app development India, AI automation for small business, website for small business India, digital transformation MSMEs, bulk data scraping India, chrome extension development, WhatsApp automation MSME, business website cost India, web development agency India",
  alternates: { canonical: "/" },
};

const howItWorksSteps = [
  { icon: Calendar, title: "Book a Free Call", description: "Tell us about your business and goals in a quick 30-minute chat." },
  { icon: Lightbulb, title: "We Plan & Build", description: "We design and develop your solution — you review at every stage." },
  { icon: Code2, title: "Review & Launch", description: "Test everything on a staging site, then go live when you're happy." },
  { icon: Headphones, title: "Ongoing Support", description: "We stick around to help you grow — updates, fixes, and advice." },
];

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
      <TrustBar />
      <div id="solutions">
        <Services />
      </div>

      {/* How It Works */}
      <section className="py-24 relative bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From first call to launch — simple, transparent, and stress-free
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-8 h-8 text-white" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <IndustryShowcase />
      <Stats />
      <Testimonials />
      <Contact />
    </div>
  );
}
