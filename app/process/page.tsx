"use client";

import {
  MessageSquare,
  Lightbulb,
  Code,
  Rocket,
  Headphones,
  CheckCircle,
  Clock,
  ArrowRight,
  Calendar,
  FileText,
  Palette,
  TestTube,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Process = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cybiqon.in/' },
      { '@type': 'ListItem', position: 2, name: 'Process', item: 'https://cybiqon.in/process' },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get Your Website Built with Cybiqon',
    description: 'Our simple 5-step process from discovery to launch',
    step: [
      { '@type': 'HowToStep', name: 'Discovery Call', text: 'Free 30-45 minute consultation to understand your business and goals' },
      { '@type': 'HowToStep', name: 'Planning & Design', text: 'Create site structure, design mockups, and get your approval' },
      { '@type': 'HowToStep', name: 'Development', text: 'Build your website with regular progress updates' },
      { '@type': 'HowToStep', name: 'Testing & Launch', text: 'Thorough testing and go live with ongoing support' },
    ],
  };

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Discovery call",
      duration: "30-45 minutes",
      description: "We start with a free consultation to understand your business, goals, and requirements. No sales pressure — just honest conversation about what you need.",
      whatHappens: [
        "Discuss your business and target audience",
        "Understand your goals for the website",
        "Review examples and design preferences",
        "Answer your questions about process, pricing, and timeline",
        "Determine the right package for you",
      ],
      outcome: "Clear understanding of your needs and a custom quote.",
      cardStyle: "warm-card",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Planning & design",
      duration: "3-5 days",
      description: "Once you're ready to proceed, we create a detailed plan and design mockups. You'll see what your website will look like before we write a single line of code.",
      whatHappens: [
        "Create site structure and content outline",
        "Design homepage and key page layouts",
        "Choose colors, fonts, and visual style",
        "Share mockups with you for feedback",
        "Revise based on your input (2 rounds included)",
      ],
      outcome: "Approved design mockups and project plan.",
      cardStyle: "glass-card",
    },
    {
      number: "03",
      icon: Code,
      title: "Development",
      duration: "2-3 weeks",
      description: "This is where the magic happens. We build your website using modern, professional technology — fast, secure, and mobile-friendly.",
      whatHappens: [
        "Develop all pages based on approved design",
        "Integrate contact forms, WhatsApp, and features",
        "Optimize for mobile devices and speed",
        "Set up SEO foundation (meta tags, structure)",
        "Add your content (text, images, etc.)",
      ],
      outcome: "Fully functional website on a staging server.",
      cardStyle: "success-card",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Testing & launch",
      duration: "2-3 days",
      description: "Before going live, we rigorously test everything to ensure your site works perfectly on all devices and browsers.",
      whatHappens: [
        "Test on desktop, tablet, and mobile",
        "Check all forms, links, and features",
        "Run speed and performance tests",
        "Set up Google Analytics and Search Console",
        "Get your final approval",
        "Launch your website live",
      ],
      outcome: "Your website is live and ready to attract customers.",
      cardStyle: "border border-border bg-white rounded-2xl",
    },
    {
      number: "05",
      icon: Headphones,
      title: "Support & growth",
      duration: "3-12 months",
      description: "We don't disappear after launch. You get ongoing support to fix bugs, make updates, and help you grow your online presence.",
      whatHappens: [
        "Monitor site performance and uptime",
        "Fix any bugs or issues that arise",
        "Help with minor content updates",
        "Answer questions via email/WhatsApp",
        "Provide guidance on growing your traffic",
        "Option to add features or upgrade anytime",
      ],
      outcome: "Peace of mind knowing we're here to help you succeed.",
      cardStyle: "glass-card",
    },
  ];

  const timeline = [
    { milestone: "Discovery call", days: "Day 1" },
    { milestone: "Design approval", days: "Day 5-7" },
    { milestone: "Development complete", days: "Day 21-28" },
    { milestone: "Website launch", days: "Day 30-34" },
  ];

  const whatYouNeedToProvide = [
    { icon: FileText, title: "Your content", description: "Business information, service descriptions, team bios, etc. We'll guide you on exactly what we need." },
    { icon: Palette, title: "Brand assets", description: "Logo, colors (if you have them), images, and any design preferences. Don't have these? We'll help." },
    { icon: Calendar, title: "Timely feedback", description: "Quick responses to our questions and design approvals keep the project moving smoothly." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              Simple, transparent process
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              How we turn your goals into <span className="text-primary">reality</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              From first call to launch and beyond — here&apos;s exactly what to expect. No surprises, no jargon.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <StepsSection steps={steps} />

      {/* Typical Timeline */}
      <TimelineSection timeline={timeline} />

      {/* What You Need to Provide */}
      <ProvideSection items={whatYouNeedToProvide} />

      {/* Communication & Updates */}
      <CommunicationSection />

      {/* CTA */}
      <section className="py-12 md:py-14 bg-primary">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mb-1.5">
                Ready to get started?
              </h2>
              <p className="text-xs md:text-sm text-white/70 max-w-md">
                Book a free 30-minute call. We&apos;ll discuss your needs and map out how we can help.
              </p>
            </div>
            <Button
              onClick={handleBookCall}
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-xs px-6 py-4 flex-shrink-0"
            >
              Book your free call <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Steps ─── */

interface StepItem {
  number: string;
  icon: typeof MessageSquare;
  title: string;
  duration: string;
  description: string;
  whatHappens: string[];
  outcome: string;
  cardStyle: string;
}

function StepsSection({ steps }: { steps: StepItem[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="pb-12 md:pb-14" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="relative">
          {/* Vertical line — hidden on mobile */}
          <div className="absolute left-[15px] top-6 bottom-6 w-px bg-border hidden md:block" />

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex gap-5 reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Left timeline — circles on line, hidden on mobile */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-5">
                  <div className="relative z-10 w-[31px] h-[31px] rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm ring-4 ring-background">
                    <step.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className={`${step.cardStyle} p-5 flex-grow`}>
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-5">
                {/* Left — step info */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center md:hidden">
                      <step.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">Step {step.number}</span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                  <div className="text-[11px] bg-muted/50 rounded-lg px-3 py-2">
                    <span className="font-semibold text-foreground">Outcome:</span>{" "}
                    <span className="text-muted-foreground">{step.outcome}</span>
                  </div>
                </div>

                {/* Right — what happens */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">What happens</p>
                  <div className="space-y-1.5">
                    {step.whatHappens.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ─── */

function TimelineSection({ timeline }: { timeline: { milestone: string; days: string }[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-6 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            Typical <span className="text-primary">timeline</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-lg">
            For a standard starter website package. Custom projects may vary.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                index === 0 ? "warm-card" : index === 1 ? "glass-card" : index === 2 ? "success-card" : "border border-border bg-white rounded-2xl"
              } reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xs">{index + 1}</span>
              </div>
              <h4 className="text-sm font-bold mb-1">{item.milestone}</h4>
              <p className="text-xs text-muted-foreground">{item.days}</p>
            </div>
          ))}
        </div>

        <div className={`mt-4 p-3 bg-blue-50 rounded-lg border border-primary/15 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.5s" }}>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Quick turnarounds available:</strong> Need it faster? Let us know on the call — we can often expedite for urgent launches.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── What You Need to Provide ─── */

function ProvideSection({ items }: { items: { icon: typeof FileText; title: string; description: string }[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-14" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-6 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            What we <span className="text-primary">need from you</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-lg">
            Don&apos;t worry — we&apos;ll guide you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl ${
                i === 0 ? "warm-card" : i === 1 ? "glass-card" : "border border-border bg-white rounded-2xl"
              } reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`warm-card p-4 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <div className="flex items-start gap-3">
            <Send className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold mb-1">Don&apos;t have everything ready? No problem.</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Many of our clients start without finalized content or branding. We&apos;ll help you figure it out as we go.
                The important thing is to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Communication ─── */

function CommunicationSection() {
  const { ref, isVisible } = useScrollReveal();

  const items = [
    { icon: MessageSquare, title: "Regular updates", desc: "Progress updates, preview links, and milestone completions. No need to wonder what's happening." },
    { icon: Headphones, title: "Easy communication", desc: "Reach us via email, WhatsApp, or scheduled calls. We typically respond within 24 hours." },
    { icon: TestTube, title: "Preview links", desc: "Access to a staging site where you can see your website as we build it. Review and provide feedback." },
    { icon: CheckCircle, title: "Your approval matters", desc: "We don't move to the next phase without your approval. It's your website, after all." },
  ];

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-6 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            How we <span className="text-primary">stay connected</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl ${
                i === 0 ? "glass-card" : i === 1 ? "warm-card" : i === 2 ? "border border-border bg-white rounded-2xl" : "success-card"
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

export default Process;
