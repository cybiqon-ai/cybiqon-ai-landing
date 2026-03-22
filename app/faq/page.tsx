"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  HelpCircle,
  CreditCard,
  Clock,
  Settings,
  Shield,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: HelpCircle,
    questions: [
      {
        id: "q1",
        question: "Who is Cybiqon AI Solutions?",
        answer:
          "We're a digital solutions agency focused exclusively on helping MSMEs (Micro, Small, and Medium Enterprises) get online and automate their work. We believe small businesses deserve access to modern, affordable technology—not just large enterprises.",
      },
      {
        id: "q2",
        question: "What types of businesses do you work with?",
        answer:
          "We specialize in MSMEs across all industries—retail, consulting, home services, restaurants, healthcare, education, and more. If you're a small or medium business looking to grow your online presence, we can help.",
      },
      {
        id: "q3",
        question: "Are you based in India?",
        answer:
          "Yes! We're proud to be based in India and focused on helping Indian MSMEs thrive in the digital economy. We understand the unique challenges and opportunities of the Indian market.",
      },
      {
        id: "q4",
        question: "Do I need technical knowledge to work with you?",
        answer:
          "Not at all! We explain everything in plain English, handle all the technical work, and guide you through every step. You focus on running your business—we'll handle the tech.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    icon: CreditCard,
    questions: [
      {
        id: "q5",
        question: "How much does a website cost?",
        answer:
          "Our website packages start at just ₹9,999 as part of our current launch offer. Custom solutions are quoted based on your specific needs. Check our Pricing page for the latest plans and pricing — all prices are transparent with no hidden fees.",
      },
      {
        id: "q6",
        question: "Are there monthly fees?",
        answer:
          "No monthly fees from us! You only pay for domain registration (~₹500-1000/year) and hosting (~₹3000-5000/year). We can help you set these up or recommend trusted providers.",
      },
      {
        id: "q7",
        question: "Do you offer payment plans?",
        answer:
          "Yes! For packages over ₹20,000, we offer 50% upfront and 50% on delivery. We're flexible and can discuss options that work for your budget during the free consultation call.",
      },
      {
        id: "q8",
        question: "What's included in the price?",
        answer:
          "Everything needed for a complete website: design, development, mobile optimization, SEO setup, Google Analytics, contact forms, WhatsApp integration, testing, launch, and 3-12 months of support (depending on package).",
      },
      {
        id: "q9",
        question: "Can I add features later?",
        answer:
          "Absolutely! You can upgrade or add features anytime. We'll quote only the additional work—you don't pay again for what you already have.",
      },
    ],
  },
  {
    id: "process",
    name: "Process",
    icon: Clock,
    questions: [
      {
        id: "q10",
        question: "How long does it take to build a website?",
        answer:
          "A standard Starter Website takes 3-4 weeks from kickoff to launch. Business Pro takes 4-5 weeks. Custom projects vary based on complexity. We'll give you an exact timeline during the consultation.",
      },
      {
        id: "q11",
        question: "What's the process like?",
        answer:
          "We follow a clear 5-step process: (1) Discovery Call, (2) Planning & Design, (3) Development, (4) Testing & Launch, (5) Support & Growth. You'll know exactly what's happening at every stage.",
      },
      {
        id: "q12",
        question: "Can you launch faster if I'm in a hurry?",
        answer:
          "Yes! We can often expedite for urgent launches. Let us know your deadline on the call and we'll see if we can accommodate—sometimes for a small rush fee.",
      },
      {
        id: "q13",
        question: "What do I need to provide?",
        answer:
          "Mainly your business content (text, images, service descriptions) and brand assets (logo, colors if you have them). Don't have everything ready? No problem—we'll guide you through what we need.",
      },
      {
        id: "q14",
        question: "Can I see my website before it launches?",
        answer:
          "Absolutely! You'll get access to a staging site where you can preview and test everything before we go live. We don't launch without your approval.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    icon: Settings,
    questions: [
      {
        id: "q15",
        question: "Will my website work on mobile phones?",
        answer:
          "Yes! All our websites are fully mobile-responsive and tested on phones, tablets, and desktops. Around 60-70% of your visitors will likely be on mobile, so this is a top priority for us.",
      },
      {
        id: "q16",
        question: "Will my website show up on Google?",
        answer:
          "We optimize every website for SEO from day one: proper structure, meta tags, fast loading, mobile-friendliness, and Google Search Console setup. Ranking takes time (2-3 months typically), but we set you up for success.",
      },
      {
        id: "q17",
        question: "Can you integrate WhatsApp, forms, or booking systems?",
        answer:
          "Yes! We can integrate WhatsApp chat, contact forms, booking/scheduling tools, CRM systems, payment gateways, and more. Some integrations are included in standard packages; others are add-ons.",
      },
      {
        id: "q18",
        question: "What technology do you use?",
        answer:
          "We use modern, professional technology like React, Node.js, and cloud hosting—the same tech used by companies like Netflix and Uber. This means your site is fast, secure, scalable, and easy to maintain.",
      },
      {
        id: "q19",
        question: "Can I update my website myself?",
        answer:
          "We typically build static sites for simplicity and performance. For minor updates, we handle it during the support period. If you need frequent updates, we can build a CMS for an additional cost.",
      },
      {
        id: "q20",
        question: "Can you build e-commerce websites?",
        answer:
          "Yes! E-commerce is part of our Custom Solution package. We can integrate payment gateways (Razorpay, etc.), product catalogs, shopping carts, and order management.",
      },
    ],
  },
  {
    id: "support",
    name: "Support",
    icon: MessageSquare,
    questions: [
      {
        id: "q21",
        question: "What's included in post-launch support?",
        answer:
          "Bug fixes, minor content updates (text/images), performance monitoring, and email/WhatsApp support. Depending on your package, you get 3-12 months of this included.",
      },
      {
        id: "q22",
        question: "What happens after support ends?",
        answer:
          "You're never locked in! After support ends, you can: (1) Continue with a maintenance package starting at ₹2000/month, (2) Request one-time updates as needed, or (3) Take full control of your website.",
      },
      {
        id: "q23",
        question: "How do I reach you for support?",
        answer:
          "Email, WhatsApp, or scheduled calls—whatever works best for you. We typically respond within 24 hours during business hours (usually much faster).",
      },
      {
        id: "q24",
        question: "Do you provide training?",
        answer:
          "Yes! We'll walk you through how to use your website, update Google Analytics, and handle basic tasks. We want you to feel confident managing your online presence.",
      },
    ],
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    questions: [
      {
        id: "q25",
        question: "Is my website secure?",
        answer:
          "Yes! We implement HTTPS/SSL encryption, secure hosting, regular updates, and follow best practices for security. Your site and customer data are protected.",
      },
      {
        id: "q26",
        question: "Who owns the website?",
        answer:
          "You do! Once you pay in full, you own the website and all its content. We can provide you with all files, code, and credentials anytime you ask.",
      },
      {
        id: "q27",
        question: "Do I need Privacy Policy and Terms of Service?",
        answer:
          "We recommend it, especially if you collect user data. We can help you create basic policies or recommend legal templates. This is important for compliance and trust.",
      },
      {
        id: "q28",
        question: "What about backups?",
        answer:
          "We include regular automated backups in our hosting recommendations. Your site is safe even if something goes wrong.",
      },
    ],
  },
];

const cardStyles = [
  "glass-card",
  "warm-card",
  "border border-border bg-white rounded-2xl",
];

const FAQ = () => {
  const handleBookCall = () => {
    window.open(
      "https://tidycal.com/itspyguru/cybiqon-30-minute-meeting",
      "_blank"
    );
  };

  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const activeQuestions =
    faqCategories.find((c) => c.id === activeCategory)?.questions ?? [];

  const faqSchema = useMemo(() => {
    const allQuestions = faqCategories.flatMap((category) =>
      category.questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      }))
    );
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allQuestions,
    };
  }, []);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cybiqon.in/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://cybiqon.in/faq" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="pt-24 pb-6 md:pt-28 md:pb-10">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[11px] font-medium text-primary mb-4">
              We&apos;re here to help
            </p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-[1.15] tracking-tight mb-3">
              Frequently asked <span className="text-primary">questions</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              Everything you need to know about working with us. Can&apos;t find
              your answer? Book a free call.
            </p>
          </div>
        </div>
      </section>

      {/* Category tabs + Questions */}
      <section className="py-8 md:py-14" ref={ref}>
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          {/* Category pills */}
          <div
            className={`flex flex-wrap gap-2 mb-8 reveal ${isVisible ? "visible" : ""}`}
          >
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenQuestion(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <category.icon className="w-3.5 h-3.5" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Questions accordion */}
          <div className="space-y-3 max-w-3xl">
            {activeQuestions.map((q, index) => (
              <div
                key={q.id}
                className={`${cardStyles[index % cardStyles.length]} overflow-hidden reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(index + 1) * 0.05}s` }}
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 hover:bg-muted/20 transition-colors text-left"
                >
                  <h3 className="font-semibold text-sm">{q.question}</h3>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openQuestion === q.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openQuestion === q.id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {q.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-8 md:py-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="bg-primary rounded-2xl py-10 px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <h2 className="text-base md:text-lg font-extrabold text-white tracking-tight mb-1">
                  Still have questions?
                </h2>
                <p className="text-xs md:text-sm text-white/70 max-w-md">
                  Book a free 30-minute call — no commitment, no sales pressure,
                  just honest answers.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Button
                  onClick={handleBookCall}
                  className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-xs px-5 py-4"
                >
                  Book a free call{" "}
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white text-xs px-5 py-4"
                >
                  <a
                    href="https://wa.me/919250711473"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
