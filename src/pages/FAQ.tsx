import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
  CreditCard,
  Clock,
  Settings,
  Shield,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const [openCategory, setOpenCategory] = useState<string | null>("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const faqCategories = [
    {
      id: "general",
      name: "General Questions",
      icon: HelpCircle,
      color: "text-primary",
      questions: [
        {
          id: "q1",
          question: "Who is Cybiqon AI Solutions?",
          answer: "We're a digital solutions agency focused exclusively on helping MSMEs (Micro, Small, and Medium Enterprises) get online and automate their work. We believe small businesses deserve access to modern, affordable technology—not just large enterprises."
        },
        {
          id: "q2",
          question: "What types of businesses do you work with?",
          answer: "We specialize in MSMEs across all industries—retail, consulting, home services, restaurants, healthcare, education, and more. If you're a small or medium business looking to grow your online presence, we can help."
        },
        {
          id: "q3",
          question: "Are you based in India?",
          answer: "Yes! We're proud to be based in India and focused on helping Indian MSMEs thrive in the digital economy. We understand the unique challenges and opportunities of the Indian market."
        },
        {
          id: "q4",
          question: "Do I need technical knowledge to work with you?",
          answer: "Not at all! We explain everything in plain English, handle all the technical work, and guide you through every step. You focus on running your business—we'll handle the tech."
        }
      ]
    },
    {
      id: "pricing",
      name: "Pricing & Payments",
      icon: CreditCard,
      color: "text-emerald-500",
      questions: [
        {
          id: "q5",
          question: "How much does a website cost?",
          answer: "Our Starter Website package starts at ₹25,000 (one-time payment). Business Pro is ₹45,000. Custom solutions are quoted based on your specific needs. All prices are transparent—no hidden fees from us."
        },
        {
          id: "q6",
          question: "Are there monthly fees?",
          answer: "No monthly fees from us! You only pay for domain registration (~₹500-1000/year) and hosting (~₹3000-5000/year). We can help you set these up or recommend trusted providers."
        },
        {
          id: "q7",
          question: "Do you offer payment plans?",
          answer: "Yes! For packages over ₹30,000, we offer 50% upfront and 50% on delivery. We're flexible and can discuss options that work for your budget during the free consultation call."
        },
        {
          id: "q8",
          question: "What's included in the price?",
          answer: "Everything needed for a complete website: design, development, mobile optimization, SEO setup, Google Analytics, contact forms, WhatsApp integration, testing, launch, and 3-12 months of support (depending on package). Check our Pricing page for full details."
        },
        {
          id: "q9",
          question: "Can I add features later?",
          answer: "Absolutely! You can upgrade or add features anytime. We'll quote only the additional work—you don't pay again for what you already have."
        }
      ]
    },
    {
      id: "process",
      name: "Process & Timeline",
      icon: Clock,
      color: "text-amber-500",
      questions: [
        {
          id: "q10",
          question: "How long does it take to build a website?",
          answer: "A standard Starter Website takes 3-4 weeks from kickoff to launch. Business Pro takes 4-5 weeks. Custom projects vary based on complexity. We'll give you an exact timeline during the consultation."
        },
        {
          id: "q11",
          question: "What's the process like?",
          answer: "We follow a clear 5-step process: (1) Discovery Call, (2) Planning & Design, (3) Development, (4) Testing & Launch, (5) Support & Growth. You'll know exactly what's happening at every stage. See our Process page for full details."
        },
        {
          id: "q12",
          question: "Can you launch faster if I'm in a hurry?",
          answer: "Yes! We can often expedite for urgent launches. Let us know your deadline on the call and we'll see if we can accommodate—sometimes for a small rush fee."
        },
        {
          id: "q13",
          question: "What do I need to provide?",
          answer: "Mainly your business content (text, images, service descriptions) and brand assets (logo, colors if you have them). Don't have everything ready? No problem—we'll guide you through what we need and help you create it."
        },
        {
          id: "q14",
          question: "Can I see my website before it launches?",
          answer: "Absolutely! You'll get access to a staging site where you can preview and test everything before we go live. We don't launch without your approval."
        }
      ]
    },
    {
      id: "technical",
      name: "Technical & Features",
      icon: Settings,
      color: "text-blue-500",
      questions: [
        {
          id: "q15",
          question: "Will my website work on mobile phones?",
          answer: "Yes! All our websites are fully mobile-responsive and tested on phones, tablets, and desktops. Around 60-70% of your visitors will likely be on mobile, so this is a top priority for us."
        },
        {
          id: "q16",
          question: "Will my website show up on Google?",
          answer: "We optimize every website for SEO (search engine optimization) from day one: proper structure, meta tags, fast loading, mobile-friendliness, and Google Search Console setup. Ranking takes time (2-3 months typically), but we set you up for success."
        },
        {
          id: "q17",
          question: "Can you integrate WhatsApp, forms, or booking systems?",
          answer: "Yes! We can integrate WhatsApp chat, contact forms, booking/scheduling tools (Calendly, etc.), CRM systems, payment gateways, and more. Some integrations are included in standard packages; others are add-ons."
        },
        {
          id: "q18",
          question: "What technology do you use?",
          answer: "We use modern, professional technology like React, Node.js, and cloud hosting—the same tech used by companies like Netflix and Uber. This means your site is fast, secure, scalable, and easy to maintain."
        },
        {
          id: "q19",
          question: "Can I update my website myself?",
          answer: "We typically build static sites for simplicity and performance. For minor updates (text, images), we handle it for you during the support period. If you need frequent updates, we can build a CMS (content management system) for an additional cost."
        },
        {
          id: "q20",
          question: "Can you build e-commerce websites?",
          answer: "Yes! E-commerce is part of our Custom Solution package. We can integrate payment gateways (Razorpay, etc.), product catalogs, shopping carts, and order management. Let's discuss your needs on a call."
        }
      ]
    },
    {
      id: "support",
      name: "Support & Maintenance",
      icon: MessageSquare,
      color: "text-purple-500",
      questions: [
        {
          id: "q21",
          question: "What's included in post-launch support?",
          answer: "Bug fixes, minor content updates (text/images), performance monitoring, and email/WhatsApp support. Depending on your package, you get 3-12 months of this included. Major feature additions are quoted separately."
        },
        {
          id: "q22",
          question: "What happens after support ends?",
          answer: "You're never locked in! After support ends, you can: (1) Continue with an affordable maintenance package (starting at ₹2000/month), (2) Request one-time updates as needed, or (3) Take full control of your website (we'll provide all files)."
        },
        {
          id: "q23",
          question: "How do I reach you for support?",
          answer: "Email, WhatsApp, or scheduled calls—whatever works best for you. We typically respond within 24 hours during business hours (usually much faster)."
        },
        {
          id: "q24",
          question: "Do you provide training?",
          answer: "Yes! We'll walk you through how to use your website, update Google Analytics, and handle basic tasks. We want you to feel confident managing your online presence."
        }
      ]
    },
    {
      id: "security",
      name: "Security & Legal",
      icon: Shield,
      color: "text-red-500",
      questions: [
        {
          id: "q25",
          question: "Is my website secure?",
          answer: "Yes! We implement HTTPS/SSL encryption, secure hosting, regular updates, and follow best practices for security. Your site and customer data are protected."
        },
        {
          id: "q26",
          question: "Who owns the website?",
          answer: "You do! Once you pay in full, you own the website and all its content. We can provide you with all files, code, and credentials anytime you ask."
        },
        {
          id: "q27",
          question: "Do I need Privacy Policy and Terms of Service?",
          answer: "We recommend it, especially if you collect user data (emails, forms, etc.). We can help you create basic policies or recommend legal templates. This is important for compliance and trust."
        },
        {
          id: "q28",
          question: "What about backups?",
          answer: "We include regular automated backups in our hosting recommendations. Your site is safe even if something goes wrong."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 text-primary border-primary/20">
              We're Here to Help
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              <span className="gradient-text">Frequently Asked</span> Questions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Everything you need to know about working with Cybiqon AI Solutions.
              Can't find your answer? Book a free call and ask us directly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories & Questions */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setOpenCategory(category.id);
                    setOpenQuestion(null);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    openCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                      : 'glass-card hover:shadow-md'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Questions */}
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className={openCategory === category.id ? 'block' : 'hidden'}
              >
                <div className="space-y-4">
                  {category.questions.map((q) => (
                    <div key={q.id} className="glass-card overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-muted/30 transition-colors text-left"
                      >
                        <div className="flex items-start gap-4 flex-grow">
                          <category.icon className={`w-6 h-6 ${category.color} flex-shrink-0 mt-0.5`} />
                          <h3 className="font-bold text-lg">{q.question}</h3>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                            openQuestion === q.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openQuestion === q.id ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="px-6 pb-5 pt-2 pl-16">
                          <p className="text-muted-foreground leading-relaxed">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center glass-card p-12">
            <MessageSquare className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Still Have <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're happy to answer any questions you have—big or small. Book a free 30-minute call
              and let's chat. No commitment, no sales pressure, just honest answers.
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

export default FAQ;
