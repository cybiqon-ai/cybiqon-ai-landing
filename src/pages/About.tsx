import { CheckCircle, Heart, Lightbulb, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const About = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const values = [
    {
      icon: Heart,
      title: "Transparency",
      description: "Honest pricing, clear communication, no hidden surprises. We believe trust is built on openness."
    },
    {
      icon: Target,
      title: "Quality",
      description: "Modern, reliable solutions built with care. We don't cut corners—your success is our reputation."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "You're not just a client, you're a partner. We succeed when you succeed, and we're here for the long haul."
    },
    {
      icon: Zap,
      title: "Growth",
      description: "We're growing with you. As a young company, we understand the challenges MSMEs face every day."
    }
  ];

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
        name: 'About',
        item: 'https://cybiqon.in/about'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Cybiqon AI | MSME Digital Transformation Partner in India"
        description="Learn about Cybiqon AI Solutions - a passionate team dedicated to making enterprise-level technology accessible to small and medium businesses across India. Our mission is to empower every MSME with affordable digital solutions."
        canonical="/about"
        keywords="about Cybiqon AI, MSME technology partner India, digital transformation company, small business solutions, affordable technology India"
        structuredData={breadcrumbSchema}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-32 pb-12 md:pb-16 lg:pb-24 px-4">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-6">
              Building the Future of <span className="gradient-text">MSME Digital Transformation</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're a passionate team dedicated to making enterprise-level technology accessible to small and medium businesses across India.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              Our <span className="gradient-text">Story</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Cybiqon AI Solutions started with a simple observation: while large enterprises have access to
                cutting-edge technology and automation, small and medium businesses are often left behind—not
                because they don't need these tools, but because they're told they're too expensive or too complex.
              </p>

              <p>
                We knew there had to be a better way. A way to bring modern websites, AI automation, and
                digital transformation to the businesses that form the backbone of India's economy—MSMEs.
              </p>

              <p className="text-foreground font-semibold">
                That's why we built Cybiqon: to democratize technology for small businesses.
              </p>

              <p>
                We're a growing company with a big mission. We're not a decades-old agency with hundreds of
                employees, and we're proud of that. It means we're nimble, we care deeply about every project,
                and we treat every client like the partner they are—not a ticket number.
              </p>

              <p>
                Every business we help grow online, every hour we save through automation, every owner who
                gains confidence in their digital presence—that's why we do what we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="glass-card p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower every MSME in India with affordable, professional digital solutions that help them
                compete, grow, and thrive in the modern marketplace. We believe small businesses deserve
                big opportunities.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A future where every MSME has the digital tools they need to succeed—where technology is an
                enabler, not a barrier. Where business owners can focus on what they do best, while we handle
                the tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-padding bg-muted/30">
        <div className="content-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These aren't just words on a page—they guide every decision we make and every solution we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              How We're <span className="gradient-text">Different</span>
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">MSME-First Mindset</h4>
                  <p className="text-muted-foreground">
                    We don't just say we work with small businesses—we're built for them. Our pricing,
                    processes, and communication style are designed for busy business owners, not corporate IT departments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Modern Technology, No Jargon</h4>
                  <p className="text-muted-foreground">
                    We use cutting-edge tech (React, AI tools, cloud platforms) but explain everything in
                    plain English. You don't need to know the tech—you just need to see the results.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Partnership Over Vendor</h4>
                  <p className="text-muted-foreground">
                    We're not here to build your site and disappear. We're here to help you grow.
                    That means ongoing support, honest advice, and celebrating your wins with you.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Quality Without Compromise</h4>
                  <p className="text-muted-foreground">
                    Affordable doesn't mean cheap. We build the same quality we'd want for our own
                    businesses—secure, fast, mobile-friendly, and built to last.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growing With You Section */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-transparent">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              We're Growing <span className="gradient-text">With You</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              As a young company, we understand the challenges you face. We've experienced the uncertainty
              of starting something new, the excitement of growth, and the importance of every customer.
              We're building Cybiqon with the same care and attention you're building your business.
            </p>
            <p className="text-lg text-foreground font-semibold mb-8">
              Your success stories become our success stories. Let's write yours together.
            </p>

            <Button
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-lg px-8 py-6 glow-effect-warm text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
