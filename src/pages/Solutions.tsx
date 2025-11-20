import {
  CheckCircle,
  Clock,
  Code,
  Rocket,
  Sparkles,
  Globe,
  MessageSquare,
  TrendingUp,
  Zap,
  Shield,
  Users,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Solutions = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
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
        name: 'Solutions',
        item: 'https://cybiqon.in/solutions'
      }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development and AI Automation',
    provider: {
      '@type': 'Organization',
      name: 'Cybiqon AI Solutions'
    },
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Website Development',
            description: 'Mobile-responsive, SEO-optimized websites for MSMEs'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Chatbot Integration',
            description: 'Intelligent chatbots for customer support and lead capture'
          }
        }
      ]
    }
  };

  const product1Features = [
    "Professional, mobile-responsive design",
    "Lightning-fast loading speeds",
    "SEO-optimized for Google rankings",
    "Contact forms & WhatsApp integration",
    "Google Analytics setup",
    "3 months post-launch support"
  ];

  const product2Features = [
    "Intelligent chatbot for customer support",
    "Automated lead capture & qualification",
    "Multi-channel integration (WhatsApp, Telegram)",
    "Custom conversation flows",
    "Analytics & insights dashboard",
    "Easy-to-use admin panel"
  ];

  const techStack = [
    { name: "React", description: "Modern, fast user interfaces" },
    { name: "Node.js", description: "Scalable backend systems" },
    { name: "AI/ML", description: "Intelligent automation" },
    { name: "Cloud", description: "Reliable, secure hosting" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Web Development & AI Automation Solutions for Small Business"
        description="Professional website development and AI-powered automation solutions designed for MSMEs in India. Mobile-responsive designs, SEO optimization, WhatsApp integration, and intelligent chatbots starting at ₹25,000."
        canonical="/solutions"
        keywords="web development India, AI automation solutions, MSME website design, WhatsApp chatbot integration, SEO-optimized websites, small business technology"
        structuredData={[breadcrumbSchema, serviceSchema]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 text-primary border-primary/20">
              Solutions Built for MSMEs
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              <span className="gradient-text">Powerful Solutions</span> That Actually Help Your Business Grow
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              No fluff, no complexity. Just proven solutions that help small businesses get online and automate their work.
            </p>
          </div>
        </div>
      </section>

      {/* Product 1 - Featured (Launched) */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent" id="product-1">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
                ✓ Launched
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                Professional Business Websites
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Description */}
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Get your business online with a professional, modern website that works beautifully on all devices.
                  Perfect for MSMEs ready to establish their digital presence and start attracting customers online.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-heading">What's Included:</h3>
                  <div className="grid gap-3">
                    {product1Features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Ready in 3-4 weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Starting at ₹25,000</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBookCall}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 glow-effect-warm text-white font-semibold"
                  >
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="border-2 border-primary hover:bg-primary hover:text-white">
                    See Examples
                  </Button>
                </div>
              </div>

              {/* Right: Visual/Screenshot Placeholder */}
              <div className="glass-card p-8 bg-gradient-to-br from-blue-50 to-emerald-50">
                <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-primary/20">
                  <div className="text-center space-y-4">
                    <Globe className="w-16 h-16 text-primary mx-auto" />
                    <div>
                      <p className="font-semibold text-lg">Professional Website</p>
                      <p className="text-sm text-muted-foreground">Screenshot placeholder</p>
                    </div>
                  </div>
                </div>

                {/* Mini testimonial */}
                <div className="mt-6 p-4 bg-white rounded-lg border border-primary/10">
                  <p className="text-sm italic text-muted-foreground mb-2">
                    "Our website looks amazing and we're getting inquiries from customers who found us on Google!"
                  </p>
                  <p className="text-xs font-semibold">— MSME Client, Retail Business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product 2 - Coming Soon (In Development) */}
      <section className="section-padding" id="product-2">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                🚀 Coming Soon
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                AI Customer Support Automation
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Visual */}
              <div className="glass-card p-8 bg-gradient-to-br from-amber-50 to-orange-50 order-2 lg:order-1">
                <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-amber-500/20">
                  <div className="text-center space-y-4">
                    <MessageSquare className="w-16 h-16 text-amber-500 mx-auto" />
                    <div>
                      <p className="font-semibold text-lg">AI Chatbot</p>
                      <p className="text-sm text-muted-foreground">In Development</p>
                    </div>
                  </div>
                </div>

                {/* Early access CTA */}
                <div className="mt-6 p-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg text-white">
                  <h4 className="font-bold mb-2">Early Access Launching Q2 2025</h4>
                  <p className="text-sm mb-4 text-white/90">
                    Be among the first to get AI-powered customer support for your business.
                  </p>
                  <Button
                    onClick={handleBookCall}
                    variant="secondary"
                    className="w-full bg-white text-amber-600 hover:bg-gray-100"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6 order-1 lg:order-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Handle customer inquiries 24/7 with an intelligent AI chatbot that understands your business
                  and provides helpful responses instantly. Save hours every week and never miss a potential customer.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-heading">Planned Features:</h3>
                  <div className="grid gap-3">
                    {product2Features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Why we're building this:</strong> We've seen MSMEs
                    lose customers simply because they couldn't respond fast enough. This solves that problem.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Rocket className="w-4 h-4 text-amber-500" />
                    <span className="text-muted-foreground">Expected: Q2 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span className="text-muted-foreground">Limited early access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Need Something <span className="gradient-text">Custom?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every business is unique. If our standard products don't fit your needs perfectly,
              we can build a custom solution tailored specifically for you.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6">
                <Code className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h4 className="font-bold mb-2">Custom Features</h4>
                <p className="text-sm text-muted-foreground">
                  Need specific functionality? We build it.
                </p>
              </div>
              <div className="glass-card p-6">
                <Zap className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h4 className="font-bold mb-2">Integrations</h4>
                <p className="text-sm text-muted-foreground">
                  Connect to your existing tools & systems.
                </p>
              </div>
              <div className="glass-card p-6">
                <Shield className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h4 className="font-bold mb-2">Enterprise-Grade</h4>
                <p className="text-sm text-muted-foreground">
                  Scalable, secure solutions for growth.
                </p>
              </div>
            </div>

            <Button
              onClick={handleBookCall}
              size="lg"
              variant="outline"
              className="border-2 border-primary hover:bg-primary hover:text-white"
            >
              Discuss Custom Solution
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
              Built With <span className="gradient-text">Modern Technology</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              We use the same technologies that power companies like Netflix, Uber, and Airbnb.
              Your business deserves nothing less.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <h4 className="font-bold text-lg mb-2">{tech.name}</h4>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-foreground">Why this matters:</strong> Modern tech means your
                website is fast, secure, mobile-friendly, and built to scale as you grow. Plus, it's easier
                for us to maintain and update.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Find <span className="gradient-text">Your Solution?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free 30-minute call and let's discuss which solution is right for your business.
              No sales pressure—just honest advice.
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

export default Solutions;
