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
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cybiqon.in/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pricing',
        item: 'https://cybiqon.in/pricing'
      }
    ]
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Web Development & AI Solutions',
    description: 'Professional web development, app development, and AI automation services for businesses in India',
    brand: {
      '@type': 'Brand',
      name: 'Cybiqon AI Solutions'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Business Website Development',
        price: '9999',
        priceCurrency: 'INR',
        description: 'Professional, mobile-friendly business websites built to convert visitors into leads',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: 'Android App Development',
        price: '29999',
        priceCurrency: 'INR',
        description: 'Custom Android apps tailored to your business needs',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: 'Chrome Extension Development',
        price: '14999',
        priceCurrency: 'INR',
        description: 'Custom Chrome extensions for automation, productivity, and data extraction',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: 'AI Automation & Workflow Setup',
        price: '19999',
        priceCurrency: 'INR',
        description: 'Automate repetitive business tasks using AI and smart workflows',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        name: 'Web Scraping & Data Extraction',
        price: '11999',
        priceCurrency: 'INR',
        description: 'Custom web scraping scripts to collect leads, prices, listings, or reports',
        availability: 'https://schema.org/InStock'
      }
    ]
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
      features: [
        "Modern, responsive design",
        "Contact forms & WhatsApp integration",
        "Basic SEO optimization",
        "Google Analytics setup"
      ],
      bestFor: "Startups, local businesses, and service providers",
      highlight: true,
      cta: "Build My Website"
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
      features: [
        "Clean, intuitive UI design",
        "Scalable backend architecture",
        "Play Store–ready builds",
        "Post-launch support"
      ],
      bestFor: "Booking apps, internal tools, dashboards, or customer apps",
      highlight: false,
      cta: "Start My App"
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
      features: [
        "Browser-based automation",
        "Data extraction tools",
        "Productivity enhancers",
        "Custom internal tools"
      ],
      bestFor: "Marketers, founders, and teams needing browser-based tools",
      highlight: false,
      cta: "Build My Extension"
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
      features: [
        "WhatsApp automation",
        "AI chatbots",
        "Email automation",
        "Tool integrations"
      ],
      bestFor: "Save time, reduce manual work, and scale faster",
      highlight: false,
      cta: "Automate My Business"
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
      features: [
        "Data delivered in Excel/Google Sheets",
        "API integrations available",
        "Fast & reliable extraction",
        "Scalable solutions"
      ],
      bestFor: "Lead generation, price monitoring, and market research",
      highlight: false,
      cta: "Get My Data"
    },
    {
      icon: MessageSquare,
      name: "Need Something Different?",
      badge: null,
      badgeColor: "",
      originalPrice: null,
      salePrice: "Custom Quote",
      savings: null,
      description: "Have a unique project? E-commerce stores, customer portals, complex integrations, or something we haven't listed—let's talk.",
      features: [
        "E-commerce & online stores",
        "Customer/admin portals",
        "API & third-party integrations",
        "Complex automation workflows"
      ],
      bestFor: "Unique projects that need a tailored solution",
      highlight: false,
      isCustom: true,
      cta: "Let's Discuss"
    }
  ];

  const faqs = [
    {
      question: "Are these one-time payments or recurring?",
      answer: "All prices are one-time payments. No hidden fees, no monthly charges. You only pay for hosting/domain separately (~₹4000-6000/year for websites)."
    },
    {
      question: "How long do projects typically take?",
      answer: "Websites: 2-3 weeks. Apps: 4-6 weeks. Chrome extensions: 1-2 weeks. AI automation: 1-3 weeks. Web scraping: 3-7 days. Exact timeline depends on complexity."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Yes! All projects include basic support. For ongoing maintenance, we offer packages starting at ₹2,999/month covering updates, bug fixes, and priority support."
    },
    {
      question: "Can I request custom features not listed?",
      answer: "Absolutely! These are starting prices for standard projects. We'll provide a custom quote based on your specific requirements during our call."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! For projects over ₹20,000, we offer 50% upfront and 50% on delivery. Discuss flexible options with us on the call."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Affordable Websites, Apps & AI Automation | Starting ₹9,999"
        description="Professional website development from ₹9,999, Android apps from ₹29,999, Chrome extensions from ₹14,999, AI automation from ₹19,999. Transparent pricing, no hidden costs. Perfect for growing businesses in India."
        canonical="/pricing"
        keywords="website development cost India, Android app development price, Chrome extension development, AI automation pricing, web scraping services India, affordable business solutions"
        structuredData={[breadcrumbSchema, productSchema]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-8 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 text-orange-600 border-orange-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Limited Time Launch Offers — Ends Soon
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              Professional Websites from{" "}
              <span className="gradient-text">₹9,999</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              Apps, automation, extensions & more — all at affordable one-time prices.
              <br className="hidden md:block" />
              No hidden fees. No monthly charges. 100% satisfaction guaranteed.
            </p>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Trusted by 10+ businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>2 Products launched</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative glass-card p-6 flex flex-col ${
                  service.highlight
                    ? 'border-2 border-emerald-500 shadow-2xl lg:scale-105'
                    : service.isCustom
                    ? 'border-2 border-dashed border-primary/30 bg-gradient-to-br from-blue-50/50 to-emerald-50/50'
                    : 'border border-primary/10'
                }`}
              >
                {/* Badge */}
                {service.badge && (
                  <Badge className={`absolute -top-3 left-1/2 -translate-x-1/2 ${service.badgeColor} text-white`}>
                    {service.badge}
                  </Badge>
                )}

                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    service.isCustom
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-primary to-secondary'
                  }`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-heading">{service.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {service.isCustom ? (
                    <>
                      <div className="text-3xl font-extrabold gradient-text mb-1">
                        {service.salePrice}
                      </div>
                      <div className="text-sm text-muted-foreground">Based on your requirements</div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-lg text-muted-foreground line-through">{service.originalPrice}</span>
                        <span className="text-3xl font-extrabold text-emerald-600">{service.salePrice}</span>
                        {service.savings && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            Save {service.savings}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">One-time payment</div>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4 flex-grow">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        service.isCustom ? 'bg-purple-500' : 'bg-emerald-500'
                      }`} />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Best For */}
                <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 mb-4">
                  <span className="font-semibold">Best for:</span> {service.bestFor}
                </div>

                {/* CTA */}
                <Button
                  onClick={service.isCustom ? handleBookCall : handleWhatsApp}
                  size="default"
                  className={
                    service.highlight
                      ? 'w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold'
                      : service.isCustom
                      ? 'w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold'
                      : 'w-full bg-primary hover:bg-primary/90 text-white font-semibold'
                  }
                >
                  {service.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Maintenance Upsell */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-blue-50 to-emerald-50 border-primary/20">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <Star className="w-8 h-8 text-accent flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="font-bold text-lg mb-2">Need Ongoing Support?</h4>
                  <p className="text-muted-foreground mb-4">
                    <span className="font-semibold text-foreground">Maintenance & Support — ₹2,999/month</span>
                    <br />
                    Includes bug fixes, minor updates, priority support, and peace of mind. Perfect for businesses that want hassle-free maintenance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleBookCall}
                      variant="outline"
                      className="border-2 border-primary hover:bg-primary hover:text-white"
                    >
                      Book Free Consultation
                    </Button>
                    <Button
                      onClick={handleWhatsApp}
                      variant="ghost"
                      className="text-primary hover:text-primary/80"
                    >
                      Or WhatsApp Us <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              What's <span className="gradient-text">Included</span> in Every Project
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              No matter which service you choose, here's what you can expect:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Quality Development
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Clean, well-documented code built with modern technologies. Thoroughly tested before delivery
                  to ensure everything works perfectly.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Direct Communication
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Work directly with our team via WhatsApp or email. No middlemen, no delays—just fast,
                  clear communication throughout the project.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Full Ownership
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You own everything we build. Source code, designs, documentation—it's all yours.
                  No lock-in, no hidden clauses.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Post-Delivery Support
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All projects include basic support after delivery. Bug fixes and minor tweaks are
                  covered—we don't disappear after payment.
                </p>
              </div>
            </div>

            {/* Guarantee Banner */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-emerald-800 mb-1">100% Satisfaction Guarantee</h4>
                  <p className="text-sm text-emerald-700">
                    We work with you until you're completely happy. Free revisions during development,
                    and if we can't deliver what we promised, you get a full refund. No risk, no worries.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> For websites, domain and hosting are separate costs
                (~₹4,000-6,000/year total). We can help you set these up or recommend trusted providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
              Pricing <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Here are answers to the most common questions we get:
            </p>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button
                onClick={handleBookCall}
                variant="outline"
                className="border-2 border-primary hover:bg-primary hover:text-white"
              >
                Ask Us Directly
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              DM us on WhatsApp or book a free call to discuss your project.
              We'll give you an exact quote—no surprises, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 text-lg px-8 py-6 text-white font-semibold shadow-lg hover:shadow-xl"
              >
                WhatsApp Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={handleBookCall}
                size="lg"
                variant="outline"
                className="border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 text-lg px-8 py-6"
              >
                Book Free Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
