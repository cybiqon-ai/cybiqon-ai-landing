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
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Process = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Discovery Call",
      duration: "30-45 minutes",
      description: "We start with a free consultation to understand your business, goals, and requirements. No sales pressure—just honest conversation about what you need.",
      whatHappens: [
        "Discuss your business and target audience",
        "Understand your goals for the website",
        "Review examples and design preferences",
        "Answer your questions about process, pricing, and timeline",
        "Determine the right package for you"
      ],
      outcome: "Clear understanding of your needs and a custom quote.",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Planning & Design",
      duration: "3-5 days",
      description: "Once you're ready to proceed, we create a detailed plan and design mockups. You'll see what your website will look like before we write a single line of code.",
      whatHappens: [
        "Create site structure and content outline",
        "Design homepage and key page layouts",
        "Choose colors, fonts, and visual style",
        "Share mockups with you for feedback",
        "Revise based on your input (2 rounds included)"
      ],
      outcome: "Approved design mockups and project plan.",
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      number: "03",
      icon: Code,
      title: "Development",
      duration: "2-3 weeks",
      description: "This is where the magic happens. We build your website using modern, professional technology—fast, secure, and mobile-friendly.",
      whatHappens: [
        "Develop all pages based on approved design",
        "Integrate contact forms, WhatsApp, and features",
        "Optimize for mobile devices and speed",
        "Set up SEO foundation (meta tags, structure)",
        "Add your content (text, images, etc.)"
      ],
      outcome: "Fully functional website on a staging server.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      number: "04",
      icon: Rocket,
      title: "Testing & Launch",
      duration: "2-3 days",
      description: "Before going live, we rigorously test everything to ensure your site works perfectly on all devices and browsers.",
      whatHappens: [
        "Test on desktop, tablet, and mobile",
        "Check all forms, links, and features",
        "Run speed and performance tests",
        "Set up Google Analytics and Search Console",
        "Get your final approval",
        "Launch your website live!"
      ],
      outcome: "Your website is live and ready to attract customers.",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      number: "05",
      icon: Headphones,
      title: "Support & Growth",
      duration: "3-12 months (depending on package)",
      description: "We don't disappear after launch. You get ongoing support to fix bugs, make updates, and help you grow your online presence.",
      whatHappens: [
        "Monitor site performance and uptime",
        "Fix any bugs or issues that arise",
        "Help with minor content updates",
        "Answer questions via email/WhatsApp",
        "Provide guidance on growing your traffic",
        "Option to add features or upgrade anytime"
      ],
      outcome: "Peace of mind knowing we're here to help you succeed.",
      color: "text-primary",
      bgColor: "bg-blue-50"
    }
  ];

  const timeline = [
    { milestone: "Discovery Call", days: "Day 1" },
    { milestone: "Design Approval", days: "Day 5-7" },
    { milestone: "Development Complete", days: "Day 21-28" },
    { milestone: "Website Launch", days: "Day 24-31" }
  ];

  const whatYouNeedToProvide = [
    {
      icon: FileText,
      title: "Your Content",
      description: "Business information, service descriptions, team bios, etc. We'll guide you on exactly what we need."
    },
    {
      icon: Palette,
      title: "Brand Assets",
      description: "Logo, colors (if you have them), images, and any design preferences. Don't have these? We'll help!"
    },
    {
      icon: Calendar,
      title: "Timely Feedback",
      description: "Quick responses to our questions and design approvals keep the project moving smoothly."
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
              Simple, Transparent Process
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              How We Turn Your <span className="gradient-text">Business Goals Into Reality</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              From first call to launch and beyond, here's exactly what to expect when you work with us.
              No surprises, no jargon—just a clear path to getting your business online.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-5xl mx-auto space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Left: Icon & Number */}
                  <div className="flex-shrink-0">
                    <div className={`relative w-16 h-16 rounded-2xl ${step.bgColor} border-2 border-primary/20 flex items-center justify-center mb-4`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <Badge className="bg-muted text-muted-foreground font-mono">
                      Step {step.number}
                    </Badge>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold font-heading">{step.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{step.duration}</span>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="glass-card p-6 mb-4">
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <CheckCircle className={`w-5 h-5 ${step.color}`} />
                        What Happens:
                      </h4>
                      <ul className="space-y-2">
                        {step.whatHappens.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 ${step.bgColor} rounded-lg border-l-4 border-${step.color.replace('text-', '')}`}>
                      <p className="text-sm">
                        <strong className="text-foreground">Outcome:</strong> {step.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Timeline */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              Typical <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              For a standard Starter Website package. Custom projects may vary.
            </p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-8 h-1 bg-gradient-to-r from-primary via-secondary to-accent hidden md:block" />

              <div className="grid md:grid-cols-4 gap-8 relative">
                {timeline.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                    <h4 className="font-bold mb-2">{item.milestone}</h4>
                    <p className="text-sm text-muted-foreground">{item.days}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Quick turnarounds available:</strong> Need it faster? Let us know
                on the call—we can often expedite for urgent launches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Need to Provide */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              What We <span className="gradient-text">Need From You</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Don't worry—we'll guide you every step of the way. Here's what helps the project run smoothly:
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {whatYouNeedToProvide.map((item, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 glass-card p-8 bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="flex items-start gap-4">
                <Send className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Don't have everything ready? No problem!</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Many of our clients start without finalized content or branding. We'll help you figure it out
                    as we go. The important thing is to get started—we'll guide you through the rest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communication & Updates */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              How We <span className="gradient-text">Stay Connected</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Regular Updates
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We'll keep you in the loop with progress updates, preview links, and milestone completions.
                  No need to wonder what's happening—we'll tell you.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-primary" />
                  Easy Communication
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reach us via email, WhatsApp, or scheduled calls. We typically respond within 24 hours
                  (usually much faster during business hours).
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-primary" />
                  Preview Links
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You'll get access to a staging site where you can see your website as we build it.
                  Review, test, and provide feedback before we go live.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Your Approval Matters
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't move to the next phase without your approval. Your feedback shapes the final
                  product—it's your website, after all.
                </p>
              </div>
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
              The first step is easy: book a free 30-minute call. We'll discuss your needs, answer your
              questions, and map out exactly how we can help your business grow online.
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

export default Process;
