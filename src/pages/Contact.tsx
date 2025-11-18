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
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const contactMethods = [
    {
      icon: Calendar,
      title: "Book a Free Call",
      description: "30-minute consultation to discuss your project",
      action: "Schedule Now",
      link: "https://tidycal.com/itspyguru/cybiqon-30-minute-meeting",
      highlight: true
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "itspyguru@gmail.com",
      action: "Send Email",
      link: "mailto:itspyguru@gmail.com",
      highlight: false
    },
    {
      icon: Phone,
      title: "Call or WhatsApp",
      description: "+91 88962 70660",
      action: "WhatsApp Us",
      link: "https://wa.me/918896270660",
      highlight: false
    },
    {
      icon: Send,
      title: "Telegram",
      description: "Quick messages and updates",
      action: "Message on Telegram",
      link: "https://t.me/cybiqonai",
      highlight: false
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM IST" },
    { day: "Sunday", hours: "Closed (Emergency support available)" }
  ];

  const quickLinks = [
    { label: "View Our Solutions", link: "/solutions" },
    { label: "Check Pricing", link: "/pricing" },
    { label: "See How It Works", link: "/process" },
    { label: "Read FAQs", link: "/faq" }
  ];

  const socialLinks = [
    {
      name: "Telegram",
      icon: Send,
      url: "https://t.me/cybiqonai",
      color: "text-blue-500"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/cybiqon.ai",
      color: "text-pink-500"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      color: "text-blue-600"
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
              We're Here to Help
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              Let's Talk About <span className="gradient-text">Your Project</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Ready to get your business online? Have questions? Want to discuss a custom solution?
              Reach out—we're friendly, responsive, and always happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Contact Methods */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              Choose Your <span className="gradient-text">Preferred Method</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group ${
                    method.highlight ? 'border-2 border-primary scale-105' : ''
                  }`}
                >
                  {method.highlight && (
                    <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      Recommended
                    </Badge>
                  )}
                  <div className={`w-16 h-16 rounded-2xl ${
                    method.highlight
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                      : 'bg-gradient-to-br from-primary to-secondary'
                  } flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{method.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    {method.action}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Book a Call */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              Why <span className="gradient-text">Book a Call?</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              A quick 30-minute conversation helps us understand your needs and give you honest, personalized advice.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <MessageSquare className="w-10 h-10 text-primary mb-4" />
                <h4 className="font-bold mb-2">Get Clear Answers</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ask anything about our process, pricing, timeline, or what solution is right for you.
                  No jargon, no sales pitch—just honest conversation.
                </p>
              </div>

              <div className="glass-card p-6">
                <Clock className="w-10 h-10 text-primary mb-4" />
                <h4 className="font-bold mb-2">Exact Quote & Timeline</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We'll understand your requirements and give you a detailed quote and timeline on the spot.
                  No waiting, no back-and-forth.
                </p>
              </div>

              <div className="glass-card p-6">
                <MapPin className="w-10 h-10 text-primary mb-4" />
                <h4 className="font-bold mb-2">See If We're a Fit</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Not every project is a good fit—and that's okay! We'll be upfront if we're not the right
                  agency for your needs and point you in the right direction.
                </p>
              </div>

              <div className="glass-card p-6">
                <ArrowRight className="w-10 h-10 text-primary mb-4" />
                <h4 className="font-bold mb-2">Fast-Track Your Project</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you're ready to move forward, we can start planning immediately after the call.
                  The sooner we start, the sooner you're online!
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button
                onClick={handleBookCall}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-lg px-8 py-6 glow-effect-warm text-white font-semibold shadow-lg hover:shadow-xl"
              >
                Book Your Free 30-Minute Call <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours & Response Time */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Office Hours */}
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold font-heading">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-border pb-3">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Based in India (IST timezone). We're flexible for international clients!
                </p>
              </div>

              {/* Response Time */}
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold font-heading">Response Time</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-2">Email & WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within <strong className="text-foreground">24 hours</strong>
                      {" "}(usually much faster during business hours).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Emergency Support</h4>
                    <p className="text-sm text-muted-foreground">
                      For active clients with urgent issues, we offer priority support even outside office hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Scheduled Calls</h4>
                    <p className="text-sm text-muted-foreground">
                      Book a call for a guaranteed time slot. We'll send a calendar invite and reminder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
              Follow Us on <span className="gradient-text">Social Media</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stay updated with tips, project showcases, and MSME resources.
            </p>

            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <social.icon className={`w-8 h-8 ${social.color} group-hover:scale-110 transition-transform`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
              Not Ready to Reach Out Yet?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Learn more about what we do before getting in touch:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="glass-card p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="font-semibold">{link.label}</span>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                </a>
              ))}
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
              The easiest way to move forward is to book a quick call. We'll answer your questions,
              understand your needs, and map out the best path forward—together.
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

export default Contact;
