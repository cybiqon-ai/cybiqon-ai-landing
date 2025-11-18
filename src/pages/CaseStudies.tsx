import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Quote,
  Star,
  Globe,
  MessageSquare,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CaseStudies = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const caseStudies = [
    {
      id: 1,
      client: "Local Retail Business",
      industry: "Retail / E-commerce",
      badge: "Launched",
      badgeColor: "bg-emerald-500",
      tagline: "From Zero Online Presence to Google Visibility in 4 Weeks",
      challenge: "This established retail business had no website and relied entirely on foot traffic and word-of-mouth. They were losing customers to competitors with online presence and wanted to be found on Google.",
      solution: [
        "Developed a professional 5-page website showcasing their products and services",
        "Optimized for local SEO with Google My Business integration",
        "Added WhatsApp integration for instant customer inquiries",
        "Set up Google Analytics to track visitor behavior",
        "Created mobile-responsive design for on-the-go customers"
      ],
      results: [
        { metric: "Website Launch", value: "3.5 weeks", icon: Clock },
        { metric: "Google Rankings", value: "Top 10 for 3 keywords", icon: TrendingUp },
        { metric: "Monthly Inquiries", value: "20+ via website", icon: MessageSquare },
        { metric: "Mobile Traffic", value: "65% of visitors", icon: Globe }
      ],
      testimonial: {
        text: "We're so happy with our new website! Customers are finding us on Google and reaching out through WhatsApp. The team made everything so easy and explained everything clearly. Worth every rupee!",
        author: "Business Owner",
        role: "Retail Business"
      },
      image: "retail", // placeholder identifier
      color: "emerald"
    },
    {
      id: 2,
      client: "Professional Services Firm",
      industry: "Consulting / Services",
      badge: "Launched",
      badgeColor: "bg-blue-500",
      tagline: "Professional Online Presence That Builds Trust with Clients",
      challenge: "A growing consulting firm was using social media to acquire clients but lacked a professional website. Potential clients couldn't learn about their services or credibility, leading to lost opportunities.",
      solution: [
        "Created a clean, professional 6-page website highlighting expertise",
        "Built a services portfolio with detailed case descriptions",
        "Added team bios to build credibility and trust",
        "Integrated contact forms and scheduling links",
        "Implemented SEO best practices for service-related keywords"
      ],
      results: [
        { metric: "Website Launch", value: "4 weeks", icon: Clock },
        { metric: "Client Inquiries", value: "15+ in first month", icon: Users },
        { metric: "Avg. Session Time", value: "3.5 minutes", icon: BarChart3 },
        { metric: "Form Submissions", value: "12/month average", icon: CheckCircle }
      ],
      testimonial: {
        text: "Having a professional website has made a huge difference. Clients take us more seriously and we're able to showcase our expertise properly. The process was smooth and the support has been excellent.",
        author: "Founder",
        role: "Consulting Firm"
      },
      image: "consulting", // placeholder identifier
      color: "blue"
    },
    {
      id: 3,
      client: "Local Service Provider",
      industry: "Home Services",
      badge: "Launched",
      badgeColor: "bg-amber-500",
      tagline: "Turning Website Visitors Into Paying Customers",
      challenge: "This service provider had an outdated website that wasn't mobile-friendly and didn't clearly communicate their services. They were getting traffic but very few conversions.",
      solution: [
        "Rebuilt the website with clear service descriptions and pricing",
        "Optimized for mobile (where 70% of their traffic comes from)",
        "Added prominent call-to-action buttons and WhatsApp chat",
        "Created a simple booking form to capture leads",
        "Improved page speed from 5s to under 2s load time"
      ],
      results: [
        { metric: "Page Load Speed", value: "60% faster", icon: TrendingUp },
        { metric: "Mobile Experience", value: "Fully optimized", icon: Globe },
        { metric: "Lead Conversion", value: "2x improvement", icon: Users },
        { metric: "Bounce Rate", value: "Reduced by 35%", icon: BarChart3 }
      ],
      testimonial: {
        text: "Our new website actually works! We're getting more inquiries and customers tell us the site looks professional and is easy to use on their phones. Great investment for our business.",
        author: "Owner",
        role: "Home Services"
      },
      image: "services", // placeholder identifier
      color: "amber"
    }
  ];

  const commonResults = [
    {
      icon: TrendingUp,
      title: "Increased Online Visibility",
      description: "Our clients see measurable improvements in search rankings and organic traffic within the first 2-3 months."
    },
    {
      icon: Users,
      title: "More Quality Leads",
      description: "Well-designed websites with clear CTAs convert visitors into inquiries—our clients report 2-3x more leads on average."
    },
    {
      icon: CheckCircle,
      title: "Professional Credibility",
      description: "A modern website builds trust. Customers take businesses more seriously when they have a strong online presence."
    },
    {
      icon: Globe,
      title: "Mobile-First Reach",
      description: "60-70% of traffic comes from mobile devices. Our sites are optimized for every screen size."
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
              Real Results from Real Businesses
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              See How We've Helped <span className="gradient-text">MSMEs Grow Online</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Every business is unique, but the goal is the same: get online, attract customers, and grow.
              Here are a few stories from businesses we've partnered with.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <section
          key={study.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-muted/30' : ''}`}
        >
          <div className="content-container">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={`${study.badgeColor} text-white`}>
                    {study.badge}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{study.industry}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  {study.client}
                </h2>
                <p className="text-xl text-muted-foreground italic">
                  "{study.tagline}"
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                {/* Left: Challenge & Solution */}
                <div className="space-y-8">
                  {/* Challenge */}
                  <div>
                    <h3 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-bold">?</span>
                      </div>
                      The Challenge
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      Our Solution
                    </h3>
                    <ul className="space-y-3">
                      {study.solution.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Results */}
                <div>
                  <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </div>
                    The Results
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {study.results.map((result, i) => (
                      <div key={i} className="glass-card p-6 text-center">
                        <result.icon className={`w-8 h-8 text-${study.color}-500 mx-auto mb-3`} />
                        <div className="text-2xl font-bold gradient-text mb-1">
                          {result.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className={`glass-card p-6 bg-gradient-to-br from-${study.color}-50 to-${study.color}-100/50 border-${study.color}-200`}>
                    <Quote className={`w-8 h-8 text-${study.color}-500 mb-4`} />
                    <p className="text-muted-foreground italic mb-4 leading-relaxed">
                      "{study.testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 fill-${study.color}-500 text-${study.color}-500`} />
                        ))}
                      </div>
                    </div>
                    <p className="font-semibold mt-2">{study.testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{study.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Common Results Pattern */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              What Our Clients <span className="gradient-text">Typically See</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              While every business is different, here are the common improvements our clients experience:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {commonResults.map((result, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <result.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{result.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-foreground">Important:</strong> These are real results from actual clients,
                but every business is unique. Your results will depend on your industry, competition, and how
                actively you promote your website. We'll be realistic about what to expect during our call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Stage Honesty */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              We're Building Our <span className="gradient-text">Portfolio Together</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              As a growing company, we're partnering with MSMEs to create success stories together. We're selective
              about who we work with because we want every project to be a win. Your success becomes our reputation.
            </p>
            <p className="text-lg text-foreground font-semibold mb-8">
              Ready to be our next success story?
            </p>
            <Button
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-lg px-8 py-6 glow-effect-warm text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Let's Discuss Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
