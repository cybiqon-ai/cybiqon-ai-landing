"use client";

import {
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Quote,
  Star,
  Globe,
  Zap,
  Code,
  Database,
  Cpu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CaseStudies = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cybiqon.in/' },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://cybiqon.in/case-studies' },
    ],
  };

  const featuredCaseStudy = {
    client: "LeadzGalaxy.com",
    industry: "B2B SaaS / Lead Generation",
    tagline: "From manual LinkedIn scraping to 10x business growth with automated lead intelligence",
    website: "https://leadzgalaxy.com",
    challenge: "Our client was spending countless hours manually scraping LinkedIn profiles, collecting lead information, and enriching data with work emails and phone numbers. This manual process was time-consuming, error-prone, and impossible to scale.",
    solution: [
      "Built a modern web application using Next.js for lightning-fast performance and SEO",
      "Designed an intuitive UI with Shadcn components and Tailwind CSS",
      "Implemented FastAPI backend for high-performance data processing",
      "Set up MongoDB for flexible, scalable data storage",
      "Integrated Redis and Redis Queue for job management and real-time processing",
      "Implemented Server-Sent Events (SSE) for live progress updates",
      "Built robust API integrations for email and phone number validation",
    ],
    technicalHighlights: [
      { icon: Code, title: "Modern frontend", tech: "Next.js, Shadcn, Tailwind CSS", description: "Fast, responsive UI with excellent developer experience" },
      { icon: Database, title: "Scalable backend", tech: "FastAPI, MongoDB, Redis", description: "High-performance data processing and storage" },
      { icon: Zap, title: "Real-time processing", tech: "Redis Queue, Server-Sent Events", description: "Live updates and asynchronous job processing" },
      { icon: Cpu, title: "Smart automation", tech: "API Integrations, Logging", description: "Automated data enrichment with monitoring" },
    ],
    results: [
      { metric: "Time saved", value: "95%", description: "Hours to minutes per lead batch", icon: Clock },
      { metric: "Business growth", value: "10x", description: "Client scaled operations dramatically", icon: TrendingUp },
      { metric: "Data accuracy", value: "98%+", description: "Validated emails and phone numbers", icon: CheckCircle },
      { metric: "User experience", value: "Excellent", description: "Real-time progress, intuitive interface", icon: Star },
    ],
    testimonial: {
      text: "This platform completely transformed our lead generation process. What used to take our team hours of manual work now happens automatically in minutes. The real-time updates keep us informed, and the data accuracy is outstanding. We've been able to 10x our business because we can now focus on closing deals instead of collecting data.",
      author: "Amit Menon, Founder",
      role: "LeadzGalaxy.com",
    },
    beforeAfter: {
      before: [
        "Manual LinkedIn profile scraping (5-10 min per lead)",
        "Manual email finding and verification",
        "Error-prone data entry and management",
        "Limited to 20-30 leads per day",
        "No real-time visibility into progress",
        "High operational costs and burnout",
      ],
      after: [
        "Automated lead enrichment (seconds per lead)",
        "Automated email/phone validation via APIs",
        "Reliable, structured data storage",
        "Process 500+ leads per day easily",
        "Real-time progress tracking with SSE",
        "Scalable, low-cost operations",
      ],
    },
  };

  const otherProjects = [
    {
      title: "Professional business website",
      industry: "Retail / E-commerce",
      description: "Helped a local retail business establish their first online presence with a mobile-responsive website, SEO optimization, and WhatsApp integration.",
      impact: "20+ monthly inquiries via website, top 10 Google rankings for 3 keywords",
      timeline: "3.5 weeks",
    },
    {
      title: "Service provider portal",
      industry: "Professional Services",
      description: "Created a clean, professional website for a consulting firm with service portfolio, team bios, and integrated scheduling.",
      impact: "15+ client inquiries in first month, 3.5-minute average session time",
      timeline: "4 weeks",
    },
    {
      title: "Home services website",
      industry: "Local Services",
      description: "Rebuilt an outdated website with mobile optimization, clear CTAs, and improved page speed for better conversions.",
      impact: "2x lead conversion, 60% faster load times, 35% lower bounce rate",
      timeline: "3 weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              Real results from real projects
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              See how we&apos;ve helped businesses <span className="text-primary">grow online</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              From automating complex workflows to building professional websites — stories from businesses we&apos;ve partnered with.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <FeaturedSection study={featuredCaseStudy} />

      {/* Other Projects */}
      <OtherProjectsSection projects={otherProjects} />

      {/* Growing Together + CTA */}
      <GrowingSection handleBookCall={handleBookCall} />

      {/* CTA Banner */}
      <section className="py-12 md:py-14 bg-primary">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mb-1.5">
                Ready to be our next success story?
              </h2>
              <p className="text-xs md:text-sm text-white/70 max-w-md">
                Book a free consultation and let&apos;s discuss how we can help your business grow.
              </p>
            </div>
            <Button
              onClick={handleBookCall}
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-xs px-6 py-4 flex-shrink-0"
            >
              Let&apos;s discuss your project <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Featured Case Study ─── */

interface FeaturedStudy {
  client: string;
  industry: string;
  tagline: string;
  website: string;
  challenge: string;
  solution: string[];
  technicalHighlights: { icon: typeof Code; title: string; tech: string; description: string }[];
  results: { metric: string; value: string; description: string; icon: typeof Clock }[];
  testimonial: { text: string; author: string; role: string };
  beforeAfter: { before: string[]; after: string[] };
}

function FeaturedSection({ study }: { study: FeaturedStudy }) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: challengeRef, isVisible: challengeVisible } = useScrollReveal();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollReveal();
  const { ref: baRef, isVisible: baVisible } = useScrollReveal();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollReveal();

  return (
    <>
      {/* Header + Challenge */}
      <section className="pb-10" ref={headerRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className={`warm-card p-5 md:p-6 mb-4 reveal ${headerVisible ? "visible" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[11px] px-2 py-0.5 mb-3">
                  Featured project
                </Badge>
                <h2 className="text-lg md:text-xl font-extrabold tracking-tight mb-1">{study.client}</h2>
                <p className="text-xs text-muted-foreground mb-2">{study.industry}</p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg italic">
                  &ldquo;{study.tagline}&rdquo;
                </p>
              </div>
              <a
                href={study.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline flex-shrink-0"
              >
                <Globe className="w-3.5 h-3.5" />
                Visit {study.client}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Challenge */}
          <div className={`glass-card p-5 reveal ${headerVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }} ref={challengeRef}>
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold text-xs">?</span>
              </div>
              The challenge
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{study.challenge}</p>
          </div>
        </div>
      </section>

      {/* Solution + Tech Highlights */}
      <section className="pb-10" ref={solutionRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className={`mb-4 reveal ${solutionVisible ? "visible" : ""}`}>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
              Our <span className="text-primary">solution</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
            {/* Solution list */}
            <div className={`success-card p-5 reveal ${solutionVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="space-y-2">
                {study.solution.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech highlights */}
            <div className="grid grid-cols-2 gap-3">
              {study.technicalHighlights.map((tech, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl ${
                    i === 0 ? "warm-card" : i === 1 ? "glass-card" : i === 2 ? "border border-border bg-white rounded-2xl" : "success-card"
                  } reveal ${solutionVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${(i + 2) * 0.08}s` }}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2">
                    <tech.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-xs font-bold mb-0.5">{tech.title}</h4>
                  <p className="text-[10px] text-primary font-semibold mb-1">{tech.tech}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-12 md:py-14 bg-muted/30" ref={baRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className={`mb-6 reveal ${baVisible ? "visible" : ""}`}>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
              Before vs. <span className="text-primary">after</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Before */}
            <div className={`p-5 rounded-xl bg-red-50 border border-red-200 reveal ${baVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <h4 className="text-sm font-bold text-red-800 mb-3">Before</h4>
              <div className="space-y-2">
                {study.beforeAfter.before.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-red-800/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className={`p-5 rounded-xl bg-emerald-50 border border-emerald-200 reveal ${baVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <h4 className="text-sm font-bold text-emerald-800 mb-3">After</h4>
              <div className="space-y-2">
                {study.beforeAfter.after.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-emerald-800/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results + Testimonial */}
      <section className="py-12 md:py-14" ref={resultsRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className={`mb-6 reveal ${resultsVisible ? "visible" : ""}`}>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
              The <span className="text-primary">results</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {study.results.map((result, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl ${
                  i === 0 ? "warm-card" : i === 1 ? "success-card" : i === 2 ? "glass-card" : "border border-border bg-white rounded-2xl"
                } reveal ${resultsVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2">
                  <result.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-xl font-extrabold text-primary mb-0.5">{result.value}</div>
                <div className="text-xs font-semibold mb-1">{result.metric}</div>
                <div className="text-[10px] text-muted-foreground">{result.description}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className={`warm-card p-5 reveal ${resultsVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
            <Quote className="w-6 h-6 text-amber-500 mb-3" />
            <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
              &ldquo;{study.testimonial.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div>
                <p className="text-xs font-bold">{study.testimonial.author}</p>
                <p className="text-[11px] text-muted-foreground">{study.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Other Projects ─── */

function OtherProjectsSection({ projects }: { projects: { title: string; industry: string; description: string; impact: string; timeline: string }[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-6 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            More <span className="text-primary">success stories</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-lg">
            We&apos;re building our portfolio one success story at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl ${
                i === 0 ? "warm-card" : i === 1 ? "glass-card" : "border border-border bg-white rounded-2xl"
              } reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <Badge className="bg-emerald-500 text-white text-[10px] px-2 py-0 mb-3">Launched</Badge>
              <h4 className="text-sm font-bold mb-1">{project.title}</h4>
              <p className="text-[11px] text-muted-foreground mb-2">{project.industry}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{project.description}</p>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex items-start gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold">{project.impact}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{project.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Growing Together ─── */

function GrowingSection({ handleBookCall }: { handleBookCall: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-14" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`glass-card p-5 md:p-6 reveal ${isVisible ? "visible" : ""}`}>
          <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-5 items-center">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight mb-2">
                We&apos;re building our <span className="text-primary">portfolio together</span>
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As a growing company, we&apos;re selective about who we work with because we want every project
                to be a win. Your success becomes our reputation, and we&apos;re committed to delivering solutions
                that create real, measurable results.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button
                onClick={handleBookCall}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg text-xs px-5 py-4"
              >
                Discuss your project <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
