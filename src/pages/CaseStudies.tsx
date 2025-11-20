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
  BarChart3,
  Zap,
  Code,
  Database,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CaseStudies = () => {
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
        name: 'Case Studies',
        item: 'https://cybiqon.in/case-studies'
      }
    ]
  };

  const featuredCaseStudy = {
    client: "LeadzGalaxy.com",
    industry: "B2B SaaS / Lead Generation",
    badge: "Featured Project",
    badgeColor: "bg-gradient-to-r from-purple-500 to-blue-500",
    tagline: "From Manual LinkedIn Scraping to 10x Business Growth with Automated Lead Intelligence",
    website: "https://leadzgalaxy.com",
    challenge: "Our client was spending countless hours manually scraping LinkedIn profiles, collecting lead information, and enriching data with work emails and phone numbers. This manual process was time-consuming, error-prone, and impossible to scale. They needed an automated solution that could deliver accurate lead intelligence at scale while maintaining data quality.",
    solution: [
      "Built a modern web application using Next.js for lightning-fast performance and SEO",
      "Designed an intuitive UI with Shadcn components and Tailwind CSS for seamless user experience",
      "Implemented FastAPI backend for high-performance data processing",
      "Set up MongoDB for flexible, scalable data storage",
      "Integrated Redis and Redis Queue for job management and real-time processing",
      "Implemented Server-Sent Events (SSE) for live progress updates during lead enrichment",
      "Built robust API integrations for email and phone number validation",
      "Added comprehensive logging and monitoring for reliability"
    ],
    technicalHighlights: [
      {
        icon: Code,
        title: "Modern Frontend",
        tech: "Next.js, Shadcn, Tailwind CSS",
        description: "Fast, responsive UI with excellent developer experience"
      },
      {
        icon: Database,
        title: "Scalable Backend",
        tech: "FastAPI, MongoDB, Redis",
        description: "High-performance data processing and storage"
      },
      {
        icon: Zap,
        title: "Real-Time Processing",
        tech: "Redis Queue, Server-Sent Events",
        description: "Live updates and asynchronous job processing"
      },
      {
        icon: Cpu,
        title: "Smart Automation",
        tech: "API Integrations, Logging",
        description: "Automated data enrichment with monitoring"
      }
    ],
    results: [
      { metric: "Time Saved", value: "95%", description: "Reduced from hours to minutes per lead batch", icon: Clock },
      { metric: "Business Growth", value: "10x", description: "Client scaled their operations dramatically", icon: TrendingUp },
      { metric: "Data Accuracy", value: "98%+", description: "Validated emails and phone numbers", icon: CheckCircle },
      { metric: "User Experience", value: "Excellent", description: "Real-time progress, intuitive interface", icon: Star }
    ],
    testimonial: {
      text: "This platform completely transformed our lead generation process. What used to take our team hours of manual work now happens automatically in minutes. The real-time updates keep us informed, and the data accuracy is outstanding. We've been able to 10x our business because we can now focus on closing deals instead of collecting data.",
      author: "Amit Menon, Founder",
      role: "LeadzGalaxy.com"
    },
    beforeAfter: {
      before: [
        "Manual LinkedIn profile scraping (5-10 minutes per lead)",
        "Manual email finding and verification",
        "Error-prone data entry and management",
        "Limited to 20-30 leads per day",
        "No real-time visibility into progress",
        "High operational costs and burnout"
      ],
      after: [
        "Automated lead enrichment (seconds per lead)",
        "Automated email/phone validation via APIs",
        "Reliable, structured data storage",
        "Process 500+ leads per day easily",
        "Real-time progress tracking with SSE",
        "Scalable, low-cost operations"
      ]
    }
  };

  const otherProjects = [
    {
      title: "Professional Business Website",
      industry: "Retail / E-commerce",
      description: "Helped a local retail business establish their first online presence with a mobile-responsive website, SEO optimization, and WhatsApp integration.",
      impact: "20+ monthly inquiries via website, Top 10 Google rankings for 3 keywords",
      timeline: "3.5 weeks"
    },
    {
      title: "Service Provider Portal",
      industry: "Professional Services",
      description: "Created a clean, professional website for a consulting firm with service portfolio, team bios, and integrated scheduling.",
      impact: "15+ client inquiries in first month, 3.5-minute average session time",
      timeline: "4 weeks"
    },
    {
      title: "Home Services Website",
      industry: "Local Services",
      description: "Rebuilt an outdated website with mobile optimization, clear CTAs, and improved page speed for better conversions.",
      impact: "2x lead conversion, 60% faster load times, 35% lower bounce rate",
      timeline: "3 weeks"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Client Success Stories | MSME Digital Transformation Case Studies"
        description="See how we've helped businesses like LeadzGalaxy achieve 10x growth through custom web applications and AI automation. Real results from real projects - explore our portfolio."
        canonical="/case-studies"
        keywords="web development case studies, MSME success stories, business automation results, website portfolio India"
        structuredData={breadcrumbSchema}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 text-primary border-primary/20">
              Real Results from Real Projects
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              See How We've Helped <span className="gradient-text">Businesses Grow Online</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              From automating complex workflows to building professional websites—here are stories
              from businesses we've partnered with to achieve real growth.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Study: LeadzGalaxy */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center">
              <Badge className={`${featuredCaseStudy.badgeColor} text-white mb-4 text-sm px-4 py-1`}>
                {featuredCaseStudy.badge}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                {featuredCaseStudy.client}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground italic mb-4">
                "{featuredCaseStudy.tagline}"
              </p>
              <a
                href={featuredCaseStudy.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                <Globe className="w-5 h-5" />
                Visit {featuredCaseStudy.client}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Challenge */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xl">?</span>
                </div>
                The Challenge
              </h3>
              <div className="glass-card p-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {featuredCaseStudy.challenge}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                Our Solution
              </h3>
              <div className="glass-card p-8">
                <ul className="space-y-4 mb-8">
                  {featuredCaseStudy.solution.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Technical Highlights */}
                <div className="border-t border-border pt-8">
                  <h4 className="font-bold text-xl mb-6">Technical Highlights</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredCaseStudy.technicalHighlights.map((tech, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                          <tech.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">{tech.title}</h5>
                          <p className="text-sm text-primary font-semibold mb-2">{tech.tech}</p>
                          <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Before & After */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold font-heading mb-6 text-center">
                Before vs. After
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Before */}
                <div className="glass-card p-8 bg-red-50 border-red-200">
                  <h4 className="font-bold text-xl mb-6 text-red-800 flex items-center gap-2">
                    <span className="text-2xl">😓</span> Before
                  </h4>
                  <ul className="space-y-3">
                    {featuredCaseStudy.beforeAfter.before.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="glass-card p-8 bg-emerald-50 border-emerald-200">
                  <h4 className="font-bold text-xl mb-6 text-emerald-800 flex items-center gap-2">
                    <span className="text-2xl">🚀</span> After
                  </h4>
                  <ul className="space-y-3">
                    {featuredCaseStudy.beforeAfter.after.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                The Results
              </h3>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {featuredCaseStudy.results.map((result, i) => (
                  <div key={i} className="glass-card p-6 text-center">
                    <result.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {result.value}
                    </div>
                    <div className="text-sm font-semibold mb-2">{result.metric}</div>
                    <div className="text-xs text-muted-foreground">
                      {result.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="glass-card p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-primary/20">
                <Quote className="w-10 h-10 text-primary mb-6" />
                <p className="text-lg text-muted-foreground italic mb-6 leading-relaxed">
                  "{featuredCaseStudy.testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="font-bold mt-4">{featuredCaseStudy.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{featuredCaseStudy.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              More <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              We're building our portfolio one success story at a time.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
                <div key={index} className="glass-card p-6 hover:shadow-xl transition-all duration-300">
                  <Badge className="mb-4 bg-emerald-500 text-white">Launched</Badge>
                  <h4 className="font-bold text-xl mb-2">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{project.industry}</p>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm font-semibold">{project.impact}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Growing Together */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              We're Building Our <span className="gradient-text">Portfolio Together</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              As a growing company, we're selective about who we work with because we want every project
              to be a win. Your success becomes our reputation, and we're committed to delivering solutions
              that create real, measurable results.
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
