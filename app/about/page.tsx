"use client";

import { CheckCircle, Heart, Lightbulb, Target, Users, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://cybiqon.in/about" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero — split layout */}
      <HeroSection handleBookCall={handleBookCall} />

      {/* Our Story */}
      <StorySection />

      {/* Mission & Vision */}
      <MissionVisionSection />

      {/* Values */}
      <ValuesSection />

      {/* How We're Different */}
      <DifferentSection />

      {/* CTA */}
      <CTASection handleBookCall={handleBookCall} />
    </div>
  );
};

/* ─── Hero ─── */
function HeroSection({ handleBookCall }: { handleBookCall: () => void }) {
  return (
    <section className="pt-24 pb-12 md:pt-28 md:pb-14">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
          {/* Left */}
          <div>
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              <Users className="w-3 h-3" />
              Founded by MSMEs, for MSMEs
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-4">
              We make technology work for <span className="text-primary">small businesses</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mb-5">
              Cybiqon AI Solutions brings modern websites, AI automation, and digital tools to the businesses that form the backbone of India&apos;s economy — at prices they can actually afford.
            </p>
            <Button
              onClick={handleBookCall}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl text-xs px-5 py-4"
            >
              Partner with us <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Right — Founders */}
          <div className="flex items-center justify-center gap-5 lg:justify-end">
            <div className="text-center">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl p-[3px] bg-gradient-to-br from-primary to-secondary mb-2">
                <div className="w-full h-full rounded-[13px] overflow-hidden bg-background">
                  <img src="/founder1.jpg" alt="Muskan Singh - Co-Founder & CEO" className="w-full h-full object-cover" style={{ objectPosition: '50% 25%' }} />
                </div>
              </div>
              <p className="text-sm font-semibold">Muskan Singh</p>
              <p className="text-[11px] text-muted-foreground">Co-Founder & CEO</p>
            </div>
            <div className="text-center mt-8">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl p-[3px] bg-gradient-to-br from-amber-500 to-orange-500 mb-2">
                <div className="w-full h-full rounded-[13px] overflow-hidden bg-background">
                  <img src="/founder2.jpg" alt="Prajjwal Pathak - Co-Founder & CTO" className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }} />
                </div>
              </div>
              <p className="text-sm font-semibold">Prajjwal Pathak</p>
              <p className="text-[11px] text-muted-foreground">Co-Founder & CTO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Story ─── */
function StorySection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[0.35fr_0.65fr] gap-8 items-start">
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
              Our <span className="text-primary">story</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              How we started and why we keep going
            </p>
          </div>
          <div className={`space-y-4 text-sm leading-relaxed text-muted-foreground reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <p>Cybiqon started with a simple observation: while large enterprises have access to cutting-edge technology, small businesses are left behind — not because they don&apos;t need these tools, but because they&apos;re told they&apos;re too expensive or too complex.</p>
            <p>We knew there had to be a better way. A way to bring modern websites, AI automation, and digital tools to the businesses that form the backbone of India&apos;s economy.</p>
            <p className="text-foreground font-semibold text-sm border-l-2 border-primary pl-4">
              We&apos;re not a decades-old agency with hundreds of employees — and we&apos;re proud of that. It means we care deeply about every project and treat every client like a partner, not a ticket number.
            </p>
            <p>Every business we help grow online, every hour we save through automation, every owner who gains confidence in their digital presence — that&apos;s why we do what we do.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mission & Vision ─── */
function MissionVisionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-14" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
          {/* Mission — larger card */}
          <div className={`warm-card p-6 reveal ${isVisible ? "visible" : ""}`}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-bold mb-2">Our mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To empower every MSME in India with affordable, professional digital solutions that help them compete, grow, and thrive. We believe small businesses deserve big opportunities.
            </p>
          </div>

          {/* Vision — smaller, different surface */}
          <div className={`border border-border bg-white rounded-2xl p-6 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-bold mb-2">Our vision</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A future where every MSME has the digital tools they need to succeed — where technology is an enabler, not a barrier, and business owners can focus on what they do best.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Values ─── */
function ValuesSection() {
  const { ref, isVisible } = useScrollReveal();

  const values = [
    { icon: Heart, title: "Transparency", description: "Honest pricing, clear communication, no hidden surprises. Trust is built on openness." },
    { icon: Target, title: "Quality", description: "Modern, reliable solutions built with care. We don't cut corners — your success is our reputation." },
    { icon: Users, title: "Partnership", description: "You're not just a client. We succeed when you succeed, and we're here for the long haul." },
    { icon: Zap, title: "Growth", description: "As a young company, we understand the challenges MSMEs face every single day." },
  ];

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-8 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            What we <span className="text-primary">stand for</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-lg">
            These aren&apos;t just words — they guide every decision we make.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {values.map((value, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-5 rounded-xl ${index === 0 ? "bg-emerald-50 border border-emerald-200/60" : index === 1 ? "glass-card" : index === 2 ? "warm-card" : "border border-border bg-white rounded-2xl"} reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <value.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1">{value.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How We're Different ─── */
function DifferentSection() {
  const { ref, isVisible } = useScrollReveal();

  const points = [
    { title: "MSME-first mindset", desc: "Our pricing, processes, and communication style are designed for busy business owners, not corporate IT departments." },
    { title: "Modern tech, no jargon", desc: "We use cutting-edge tools but explain everything in plain language. You don't need to know the tech — you just need to see the results." },
    { title: "Partnership over vendor", desc: "We're not here to build your site and disappear. We're here to help you grow — ongoing support, honest advice, and celebrating your wins." },
    { title: "Quality without compromise", desc: "Affordable doesn't mean cheap. We build the same quality we'd want for our own businesses — secure, fast, mobile-friendly, and built to last." },
  ];

  return (
    <section className="py-12 md:py-14" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-8 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            How we&apos;re <span className="text-primary">different</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
          {points.map((item, i) => (
            <div
              key={i}
              className={`flex gap-3 items-start reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection({ handleBookCall }: { handleBookCall: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-14 bg-primary" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-6 reveal ${isVisible ? "visible" : ""}`}>
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mb-1.5">
              Your success stories become ours
            </h2>
            <p className="text-xs md:text-sm text-white/70 max-w-md">
              We&apos;re growing with you. Let&apos;s write your growth story together.
            </p>
          </div>
          <Button
            onClick={handleBookCall}
            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-xs px-6 py-4 flex-shrink-0"
          >
            Book a free call <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default About;
