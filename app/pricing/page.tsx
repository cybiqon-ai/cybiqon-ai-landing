"use client";

import { useState } from "react";
import {
  Globe,
  Smartphone,
  Chrome,
  Bot,
  Database,
  Star,
  ArrowRight,
  HelpCircle,
  Sparkles,
  MessageSquare,
  CheckCircle,
  Users,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Pricing = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919250711473?text=Hi, I\'m interested in your services. Can we discuss?', '_blank');
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cybiqon.in/' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://cybiqon.in/pricing' },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Web Development & AI Solutions',
    description: 'Professional web development, app development, and AI automation services for businesses in India',
    brand: { '@type': 'Brand', name: 'Cybiqon AI Solutions' },
    offers: [
      { '@type': 'Offer', name: 'Business Website Development', price: '9999', priceCurrency: 'INR', description: 'Professional, mobile-friendly business websites built to convert visitors into leads', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Android App Development', price: '29999', priceCurrency: 'INR', description: 'Custom Android apps tailored to your business needs', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Chrome Extension Development', price: '14999', priceCurrency: 'INR', description: 'Custom Chrome extensions for automation, productivity, and data extraction', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'AI Automation & Workflow Setup', price: '19999', priceCurrency: 'INR', description: 'Automate repetitive business tasks using AI and smart workflows', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Web Scraping & Data Extraction', price: '11999', priceCurrency: 'INR', description: 'Custom web scraping scripts to collect leads, prices, listings, or reports', availability: 'https://schema.org/InStock' },
    ],
  };

  const services = [
    {
      icon: Globe,
      name: "Business Website Development",
      badge: "Launch Offer",
      badgeColor: "bg-emerald-500",
      originalPrice: "₹15,000",
      salePrice: "₹9,999",
      savings: "₹5,001",
      description: "Professional, mobile-friendly business websites built to convert visitors into leads.",
      features: ["Modern, responsive design", "Contact forms & WhatsApp integration", "Basic SEO optimization", "Google Analytics setup"],
      bestFor: "Startups, local businesses, and service providers",
      highlight: true,
      cta: "Build My Website",
      cardStyle: "warm-card",
    },
    {
      icon: Smartphone,
      name: "Android App Development",
      badge: "Limited Period",
      badgeColor: "bg-orange-500",
      originalPrice: "₹45,000",
      salePrice: "₹29,999",
      savings: "₹15,001",
      description: "Custom Android apps tailored to your business needs.",
      features: ["Clean, intuitive UI design", "Scalable backend architecture", "Play Store–ready builds", "Post-launch support"],
      bestFor: "Booking apps, internal tools, dashboards, or customer apps",
      highlight: false,
      cta: "Start My App",
      cardStyle: "glass-card",
    },
    {
      icon: Bot,
      name: "AI Automation & Workflow Setup",
      badge: "Popular",
      badgeColor: "bg-primary",
      originalPrice: "₹35,000",
      salePrice: "₹19,999",
      savings: "₹15,001",
      description: "Automate repetitive business tasks using AI and smart workflows.",
      features: ["WhatsApp automation", "AI chatbots", "Email automation", "Tool integrations"],
      bestFor: "Save time, reduce manual work, and scale faster",
      highlight: false,
      cta: "Automate My Business",
      cardStyle: "success-card",
    },
    {
      icon: Chrome,
      name: "Chrome Extension Development",
      badge: null,
      badgeColor: "",
      originalPrice: "₹25,000",
      salePrice: "₹14,999",
      savings: "₹10,001",
      description: "Custom Chrome extensions for automation, productivity, data extraction, or internal use.",
      features: ["Browser-based automation", "Data extraction tools", "Productivity enhancers", "Custom internal tools"],
      bestFor: "Marketers, founders, and teams needing browser-based tools",
      highlight: false,
      cta: "Build My Extension",
      cardStyle: "border border-border bg-white rounded-2xl",
    },
    {
      icon: Database,
      name: "Web Scraping & Data Extraction",
      badge: null,
      badgeColor: "",
      originalPrice: "₹20,000",
      salePrice: "₹11,999",
      savings: "₹8,001",
      description: "Custom web scraping scripts to collect leads, prices, listings, or reports.",
      features: ["Data delivered in Excel/Google Sheets", "API integrations available", "Fast & reliable extraction", "Scalable solutions"],
      bestFor: "Lead generation, price monitoring, and market research",
      highlight: false,
      cta: "Get My Data",
      cardStyle: "glass-card",
    },
    {
      icon: MessageSquare,
      name: "Need Something Different?",
      badge: null,
      badgeColor: "",
      originalPrice: null,
      salePrice: "Custom Quote",
      savings: null,
      description: "Have a unique project? E-commerce stores, customer portals, complex integrations, or something we haven't listed — let's talk.",
      features: ["E-commerce & online stores", "Customer/admin portals", "API & third-party integrations", "Complex automation workflows"],
      bestFor: "Unique projects that need a tailored solution",
      highlight: false,
      isCustom: true,
      cta: "Let's Discuss",
      cardStyle: "border-2 border-dashed border-primary/30 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 rounded-2xl",
    },
  ];

  const faqs = [
    { question: "Are these one-time payments or recurring?", answer: "All prices are one-time payments. No hidden fees, no monthly charges. You only pay for hosting/domain separately (~₹4000-6000/year for websites)." },
    { question: "How long do projects typically take?", answer: "Websites: 2-3 weeks. Apps: 4-6 weeks. Chrome extensions: 1-2 weeks. AI automation: 1-3 weeks. Web scraping: 3-7 days. Exact timeline depends on complexity." },
    { question: "Do you offer post-launch support?", answer: "Yes! All projects include basic support. For ongoing maintenance, we offer packages starting at ₹2,999/month covering updates, bug fixes, and priority support." },
    { question: "Can I request custom features not listed?", answer: "Absolutely! These are starting prices for standard projects. We'll provide a custom quote based on your specific requirements during our call." },
    { question: "Do you offer payment plans?", answer: "Yes! For projects over ₹20,000, we offer 50% upfront and 50% on delivery. Discuss flexible options with us on the call." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-full text-[11px] font-medium text-orange-600 mb-4">
              <Sparkles className="w-3 h-3" />
              Limited time launch offers
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              Professional websites from <span className="text-primary">₹9,999</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mb-4">
              Apps, automation, extensions & more — all at affordable one-time prices.
              No hidden fees. No monthly charges.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary" />
                Trusted by 10+ businesses
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                2 products launched
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                100% satisfaction guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <PricingGrid services={services} handleBookCall={handleBookCall} handleWhatsApp={handleWhatsApp} />

      {/* Maintenance Upsell */}
      <MaintenanceBanner handleBookCall={handleBookCall} handleWhatsApp={handleWhatsApp} />

      {/* What's Included */}
      <IncludedSection />

      {/* Guarantee + Hosting Note */}
      <GuaranteeSection />

      {/* FAQ */}
      <FAQSection faqs={faqs} handleBookCall={handleBookCall} />

      {/* CTA */}
      <section className="py-12 md:py-14 bg-primary">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mb-1.5">
                Ready to get started?
              </h2>
              <p className="text-xs md:text-sm text-white/70 max-w-md">
                DM us on WhatsApp or book a free call. We&apos;ll give you an exact quote — no surprises.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button
                onClick={handleWhatsApp}
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-xs px-5 py-4"
              >
                WhatsApp us <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
              <Button
                onClick={handleBookCall}
                variant="outline"
                className="border-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white text-xs px-5 py-4"
              >
                Book free call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Pricing Grid ─── */

interface ServiceItem {
  icon: typeof Globe;
  name: string;
  badge: string | null;
  badgeColor: string;
  originalPrice: string | null;
  salePrice: string;
  savings: string | null;
  description: string;
  features: string[];
  bestFor: string;
  highlight: boolean;
  cta: string;
  cardStyle: string;
  isCustom?: boolean;
}

function PricingGrid({
  services,
  handleBookCall,
  handleWhatsApp,
}: {
  services: ServiceItem[];
  handleBookCall: () => void;
  handleWhatsApp: () => void;
}) {
  const { ref, isVisible } = useScrollReveal();

  // Featured card (website dev) is first, rest follow
  const featured = services[0];
  const rest = services.slice(1);

  return (
    <section className="pb-10" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        {/* Featured — full width */}
        <div className={`${featured.cardStyle} p-5 md:p-6 mb-4 relative reveal ${isVisible ? "visible" : ""}`}>
          {featured.badge && (
            <Badge className={`absolute -top-2.5 left-5 ${featured.badgeColor} text-white text-[11px] px-2 py-0.5`}>
              {featured.badge}
            </Badge>
          )}
          <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-5 items-start">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <featured.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold">{featured.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 max-w-md">{featured.description}</p>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {featured.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">Best for:</span> {featured.bestFor}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground line-through">{featured.originalPrice}</span>
                  <span className="text-2xl font-extrabold text-emerald-600">{featured.salePrice}</span>
                  {featured.savings && (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[11px] px-2 py-0.5">
                      Save {featured.savings}
                    </Badge>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">One-time payment</p>
              </div>
              <Button
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-xs px-5 py-4 shadow-lg"
              >
                {featured.cta} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Rest — 3-column bento */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((service, index) => (
            <div
              key={index}
              className={`${service.cardStyle} p-5 flex flex-col relative reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(index + 1) * 0.08}s` }}
            >
              {service.badge && (
                <Badge className={`absolute -top-2.5 left-4 ${service.badgeColor} text-white text-[11px] px-2 py-0.5`}>
                  {service.badge}
                </Badge>
              )}

              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  service.isCustom
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-primary to-secondary'
                }`}>
                  <service.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold">{service.name}</h3>
              </div>

              <div className="mb-3">
                {service.isCustom ? (
                  <>
                    <div className="text-xl font-extrabold text-primary mb-0.5">{service.salePrice}</div>
                    <p className="text-[11px] text-muted-foreground">Based on your requirements</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground line-through">{service.originalPrice}</span>
                      <span className="text-xl font-extrabold text-emerald-600">{service.salePrice}</span>
                    </div>
                    {service.savings && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] px-1.5 py-0 mt-1">
                        Save {service.savings}
                      </Badge>
                    )}
                    <p className="text-[11px] text-muted-foreground mt-1">One-time payment</p>
                  </>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{service.description}</p>

              <div className="space-y-1.5 mb-3 flex-grow">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <div className={`w-1 h-1 rounded-full flex-shrink-0 ${service.isCustom ? 'bg-purple-500' : 'bg-emerald-500'}`} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-muted-foreground bg-muted/50 rounded-lg px-2.5 py-2 mb-3">
                <span className="font-semibold text-foreground">Best for:</span> {service.bestFor}
              </p>

              <Button
                onClick={service.isCustom ? handleBookCall : handleWhatsApp}
                className={`w-full text-xs font-semibold ${
                  service.isCustom
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : 'bg-primary hover:bg-primary/90 text-white'
                }`}
              >
                {service.cta} <ArrowRight className="ml-1.5 w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Maintenance Banner ─── */

function MaintenanceBanner({ handleBookCall, handleWhatsApp }: { handleBookCall: () => void; handleWhatsApp: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="pb-10" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`warm-card p-5 reveal ${isVisible ? "visible" : ""}`}>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <Star className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-grow">
              <h4 className="text-sm font-bold mb-1">Need ongoing support?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                <span className="font-semibold text-foreground">Maintenance & support — ₹2,999/month.</span>{" "}
                Bug fixes, minor updates, priority support, and peace of mind.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleBookCall} variant="outline" className="border-primary hover:bg-primary hover:text-white text-xs px-4 py-2">
                  Book consultation
                </Button>
                <Button onClick={handleWhatsApp} variant="ghost" className="text-primary hover:text-primary/80 text-xs px-4 py-2">
                  WhatsApp us <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── What's Included ─── */

function IncludedSection() {
  const { ref, isVisible } = useScrollReveal();

  const items = [
    { icon: Globe, title: "Quality development", desc: "Clean, well-documented code built with modern technologies. Thoroughly tested before delivery." },
    { icon: Bot, title: "Direct communication", desc: "Work directly with our team via WhatsApp or email. No middlemen, no delays." },
    { icon: Database, title: "Full ownership", desc: "You own everything we build. Source code, designs, documentation — it's all yours." },
    { icon: Star, title: "Post-delivery support", desc: "All projects include basic support. Bug fixes and minor tweaks are covered." },
  ];

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-6 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            What&apos;s <span className="text-primary">included</span> in every project
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-lg">
            No matter which service you choose, here&apos;s what you can expect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl ${
                i === 0 ? "warm-card" : i === 1 ? "glass-card" : i === 2 ? "success-card" : "border border-border bg-white rounded-2xl"
              } reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Guarantee + Hosting Note ─── */

function GuaranteeSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-10 md:py-12" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16 space-y-4">
        <div className={`flex items-start gap-4 p-5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 reveal ${isVisible ? "visible" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-800 mb-1">100% satisfaction guarantee</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              We work with you until you&apos;re completely happy. Free revisions during development,
              and if we can&apos;t deliver what we promised, you get a full refund.
            </p>
          </div>
        </div>

        <div className={`p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Note:</strong> For websites, domain and hosting are separate costs
            (~₹4,000-6,000/year total). We can help you set these up or recommend trusted providers.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */

function FAQSection({ faqs, handleBookCall }: { faqs: { question: string; answer: string }[]; handleBookCall: () => void }) {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <div className={`mb-6 reveal ${isVisible ? "visible" : ""}`}>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
              Pricing <span className="text-primary">questions</span>
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Here are answers to the most common questions we get.
            </p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-border bg-white rounded-xl overflow-hidden reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(index + 1) * 0.08}s` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-4 pb-4 pl-11 text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-6 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.5s" }}>
            <p className="text-xs text-muted-foreground mb-2">Still have questions?</p>
            <Button onClick={handleBookCall} variant="outline" className="border-primary hover:bg-primary hover:text-white text-xs px-4 py-2">
              Ask us directly
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
