import {
  CheckCircle,
  X,
  Star,
  Clock,
  MessageSquare,
  Zap,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const packages = [
    {
      name: "Starter Website",
      badge: "Most Popular",
      badgeColor: "bg-emerald-500",
      price: "₹25,000",
      priceNote: "One-time payment",
      description: "Perfect for small businesses ready to get online with a professional presence.",
      features: [
        { text: "Up to 5 pages (Home, About, Services, Gallery, Contact)", included: true },
        { text: "Mobile-responsive design", included: true },
        { text: "SEO-optimized for Google", included: true },
        { text: "Contact form + WhatsApp integration", included: true },
        { text: "Google Analytics setup", included: true },
        { text: "3 months post-launch support", included: true },
        { text: "Ready in 3-4 weeks", included: true },
        { text: "Custom integrations (CRM, booking)", included: false },
        { text: "E-commerce functionality", included: false },
        { text: "AI chatbot integration", included: false }
      ],
      cta: "Get Started",
      highlight: true,
      timeline: "3-4 weeks",
      support: "3 months"
    },
    {
      name: "Business Pro",
      badge: "Best Value",
      badgeColor: "bg-primary",
      price: "₹45,000",
      priceNote: "One-time payment",
      description: "For growing businesses that need more pages, features, and customization.",
      features: [
        { text: "Up to 10 pages", included: true },
        { text: "Mobile-responsive design", included: true },
        { text: "Advanced SEO optimization", included: true },
        { text: "Contact form + WhatsApp integration", included: true },
        { text: "Google Analytics + Search Console", included: true },
        { text: "6 months post-launch support", included: true },
        { text: "Custom integrations (CRM, booking, etc.)", included: true },
        { text: "Blog/News section", included: true },
        { text: "Ready in 4-5 weeks", included: true },
        { text: "E-commerce functionality", included: false }
      ],
      cta: "Get Started",
      highlight: false,
      timeline: "4-5 weeks",
      support: "6 months"
    },
    {
      name: "Custom Solution",
      badge: null,
      badgeColor: "",
      price: "Custom Quote",
      priceNote: "Based on requirements",
      description: "Tailored solutions for unique needs—e-commerce, portals, automation, or complex integrations.",
      features: [
        { text: "Unlimited pages", included: true },
        { text: "Fully custom design & functionality", included: true },
        { text: "E-commerce with payment gateway", included: true },
        { text: "Custom integrations (APIs, CRM, ERP)", included: true },
        { text: "AI chatbot integration (coming Q2 2025)", included: true },
        { text: "Advanced automation workflows", included: true },
        { text: "Dedicated project manager", included: true },
        { text: "12 months priority support", included: true },
        { text: "Scalable architecture", included: true },
        { text: "Timeline: Based on scope", included: true }
      ],
      cta: "Discuss Your Needs",
      highlight: false,
      timeline: "Varies",
      support: "12 months"
    }
  ];

  const faqs = [
    {
      question: "What's included in post-launch support?",
      answer: "Bug fixes, minor content updates (text/images), performance monitoring, and email/WhatsApp support. Major feature additions are quoted separately."
    },
    {
      question: "Do you charge monthly fees?",
      answer: "No monthly fees from us! You only pay for domain (₹500-1000/year) and hosting (₹3000-5000/year). We can help you set these up or recommend providers."
    },
    {
      question: "Can I upgrade my package later?",
      answer: "Absolutely! You can add features anytime. We'll quote only the additional work—you don't pay for what you already have."
    },
    {
      question: "What if I need changes after support ends?",
      answer: "We offer affordable maintenance packages starting at ₹2000/month, or one-time updates as needed. You're never locked in."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! For packages over ₹30,000, we offer 50% upfront and 50% on delivery. Discuss with us on the call."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 text-primary border-primary/20">
              Transparent Pricing, No Hidden Costs
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              <span className="gradient-text">Simple, Honest Pricing</span> For Every Business
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Choose the package that fits your needs. All prices are one-time investments—no surprise fees,
              no monthly charges from us.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative glass-card p-8 flex flex-col ${
                  pkg.highlight
                    ? 'border-2 border-emerald-500 shadow-2xl scale-105'
                    : 'border border-primary/10'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <Badge className={`absolute -top-3 left-1/2 -translate-x-1/2 ${pkg.badgeColor} text-white`}>
                    {pkg.badge}
                  </Badge>
                )}

                {/* Package name */}
                <h3 className="text-2xl font-bold font-heading mb-2">{pkg.name}</h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-4xl font-extrabold gradient-text mb-1">
                    {pkg.price}
                  </div>
                  <div className="text-sm text-muted-foreground">{pkg.priceNote}</div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={
                          feature.included ? 'text-foreground' : 'text-muted-foreground/50'
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 pb-6 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{pkg.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span>{pkg.support} support</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleBookCall}
                  size="lg"
                  className={
                    pkg.highlight
                      ? 'w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold glow-effect-warm'
                      : 'w-full bg-primary hover:bg-primary/90 text-white font-semibold'
                  }
                >
                  {pkg.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-card p-8 bg-blue-50 border-primary/20">
              <div className="flex items-start gap-4">
                <Star className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Not sure which package to choose?</h4>
                  <p className="text-muted-foreground mb-4">
                    Book a free 30-minute call and we'll help you figure out exactly what you need—no sales pressure,
                    just honest advice based on your business goals.
                  </p>
                  <Button
                    onClick={handleBookCall}
                    variant="outline"
                    className="border-2 border-primary hover:bg-primary hover:text-white"
                  >
                    Book Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You're Actually Paying For */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              What You're <span className="gradient-text">Actually Paying For</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              We believe in transparency. Here's exactly what goes into your investment:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Design & Development
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Custom design tailored to your brand, clean code, mobile-responsive layouts, and rigorous testing
                  across devices and browsers.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  SEO Foundation
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Optimized site structure, meta tags, fast loading speeds, mobile-friendliness, and Google Analytics
                  setup so you can be found online.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Content Setup
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We'll work with your existing content or guide you on what to provide. Includes formatting, image
                  optimization, and layout design.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Post-Launch Support
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3-12 months of support depending on your package: bug fixes, minor updates, and guidance as you
                  grow your online presence.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> Domain and hosting are separate costs
                (~₹4000-6000/year total). We can help you set these up or recommend trusted providers.
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
              Book a free 30-minute call to discuss your project. We'll give you an exact quote—no surprises,
              no pressure, just honest advice.
            </p>
            <Button
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-lg px-8 py-6 glow-effect-warm text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Book Your Free Call <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
