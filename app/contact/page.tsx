"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  ArrowRight,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

const Contact = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cybiqon.in/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cybiqon.in/contact' },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cybiqon AI Solutions',
    description: 'Modern websites and AI-powered automation solutions for MSMEs in India',
    url: 'https://cybiqon.in',
    logo: 'https://cybiqon.in/logo.png',
    image: 'https://cybiqon.in/logo.png',
    telephone: '+91-92507-11473',
    email: 'support@cybiqon.in',
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    openingHours: 'Mo-Fr 10:00-18:00',
    sameAs: [
      'https://www.linkedin.com/company/cybiqon-ai-solutions',
      'https://www.facebook.com/cybiqon.ai.solutions/',
      'https://www.instagram.com/cybiqon.ai',
      'https://t.me/cybiqonai',
    ],
    priceRange: '₹₹',
    areaServed: { '@type': 'Country', name: 'India' },
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              We&apos;re here to help
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight mb-3">
              Let&apos;s talk about your <span className="text-primary">project</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              Ready to get your business online? Have questions? Reach out — we&apos;re friendly, responsive, and always happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <ContactMethodsSection handleBookCall={handleBookCall} />

      {/* Why Book a Call */}
      <WhyBookSection handleBookCall={handleBookCall} />

      {/* Office Hours & Response Time */}
      <DetailsSection />

      {/* Social + Quick Links */}
      <BottomSection />

      {/* CTA */}
      <section className="py-12 md:py-14 bg-primary">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mb-1.5">
                Ready to get started?
              </h2>
              <p className="text-xs md:text-sm text-white/70 max-w-md">
                Book a quick call and we&apos;ll map out the best path forward — together.
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

/* ─── Contact Methods ─── */

function ContactMethodsSection({ handleBookCall }: { handleBookCall: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  const methods = [
    {
      icon: Calendar,
      title: "Book a free call",
      description: "30-minute consultation to discuss your project",
      action: "Schedule now",
      link: "https://tidycal.com/itspyguru/cybiqon-30-minute-meeting",
      highlight: true,
      cardStyle: "warm-card",
    },
    {
      icon: Mail,
      title: "Email us",
      description: "support@cybiqon.in",
      action: "Send email",
      link: "mailto:support@cybiqon.in",
      highlight: false,
      cardStyle: "glass-card",
    },
    {
      icon: Phone,
      title: "Call or WhatsApp",
      description: "+91 92507 11473",
      action: "WhatsApp us",
      link: "https://wa.me/919250711473",
      highlight: false,
      cardStyle: "success-card",
    },
    {
      icon: Send,
      title: "Telegram",
      description: "Quick messages and updates",
      action: "Message on Telegram",
      link: "https://t.me/cybiqonai",
      highlight: false,
      cardStyle: "border border-border bg-white rounded-2xl",
    },
  ];

  return (
    <section className="pb-10" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {methods.map((method, i) => (
            <a
              key={i}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${method.cardStyle} p-4 group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 relative block reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {method.highlight && (
                <Badge className="absolute -top-2 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-2 py-0">
                  Recommended
                </Badge>
              )}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                method.highlight
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                  : 'bg-gradient-to-br from-primary to-secondary'
              }`}>
                <method.icon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-bold mb-0.5">{method.title}</h4>
              <p className="text-[11px] text-muted-foreground mb-3">{method.description}</p>
              <div className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-1.5 transition-all">
                {method.action}
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Book a Call ─── */

function WhyBookSection({ handleBookCall }: { handleBookCall: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  const reasons = [
    { icon: MessageSquare, title: "Get clear answers", desc: "Ask anything about our process, pricing, or timeline. No jargon, no sales pitch." },
    { icon: Clock, title: "Exact quote & timeline", desc: "We'll understand your requirements and give you a detailed quote on the spot." },
    { icon: MapPin, title: "See if we're a fit", desc: "Not every project is a good fit — and that's okay. We'll be upfront and honest." },
    { icon: ArrowRight, title: "Fast-track your project", desc: "Ready to move forward? We can start planning immediately after the call." },
  ];

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className={`mb-6 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            Why <span className="text-primary">book a call</span>?
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-lg">
            A quick 30-minute conversation helps us understand your needs and give you honest, personalized advice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {reasons.map((item, i) => (
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

        <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.5s" }}>
          <Button
            onClick={handleBookCall}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg text-xs px-5 py-4"
          >
            Book your free 30-minute call <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Office Hours & Response Time ─── */

function DetailsSection() {
  const { ref, isVisible } = useScrollReveal();

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM IST" },
    { day: "Sunday", hours: "Closed (emergency support available)" },
  ];

  return (
    <section className="py-12 md:py-14" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Office Hours */}
          <div className={`warm-card p-5 reveal ${isVisible ? "visible" : ""}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold">Office hours</h3>
            </div>
            <div className="space-y-2.5">
              {officeHours.map((schedule, i) => (
                <div key={i} className="flex justify-between items-center border-b border-border/50 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-xs font-medium">{schedule.day}</span>
                  <span className="text-xs text-muted-foreground">{schedule.hours}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">
              Based in India (IST). Flexible for international clients.
            </p>
          </div>

          {/* Response Time */}
          <div className={`glass-card p-5 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-bold">Response time</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold mb-0.5">Email & WhatsApp</h4>
                <p className="text-[11px] text-muted-foreground">
                  Typically within <strong className="text-foreground">24 hours</strong> (usually much faster during business hours).
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold mb-0.5">Emergency support</h4>
                <p className="text-[11px] text-muted-foreground">
                  Active clients with urgent issues get priority support even outside office hours.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold mb-0.5">Scheduled calls</h4>
                <p className="text-[11px] text-muted-foreground">
                  Book a call for a guaranteed time slot. We&apos;ll send a calendar invite and reminder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Social + Quick Links ─── */

function BottomSection() {
  const { ref, isVisible } = useScrollReveal();

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/cybiqon-ai-solutions" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/cybiqon.ai" },
    { name: "Telegram", icon: Send, url: "https://t.me/cybiqonai" },
  ];

  const quickLinks = [
    { label: "View our solutions", link: "/pricing" },
    { label: "Check pricing", link: "/pricing" },
    { label: "See how it works", link: "/process" },
    { label: "Read FAQs", link: "/faq" },
  ];

  return (
    <section className="py-12 md:py-14 bg-muted/30" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[0.4fr_0.6fr] gap-8">
          {/* Social */}
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <h3 className="text-sm font-bold mb-3">Follow us</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Tips, project showcases, and MSME resources.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <h3 className="text-sm font-bold mb-3">Not ready to reach out yet?</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Learn more about what we do before getting in touch.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.link}
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-white hover:border-primary/40 hover:shadow-sm transition-all group text-xs font-medium"
                >
                  {link.label}
                  <ArrowRight className="w-3 h-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
