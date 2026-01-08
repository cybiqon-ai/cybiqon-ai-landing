import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can help you grow online
            </p>
          </div>

          <div className="glass-card p-8 md:p-12">
            {/* Primary CTA */}
            <div className="text-center mb-8">
              <Button
                onClick={handleBookCall}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl text-lg px-10 py-7"
              >
                <Calendar className="mr-2 w-6 h-6" />
                Book Your Free 30-Min Call
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Get instant answers, exact quote, and timeline—no commitment required
              </p>
            </div>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 border-t border-border"></div>
              <span className="text-sm text-muted-foreground">or reach out directly</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Quick Contact Options */}
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="mailto:support@cybiqon.in"
                className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-1">Email Us</p>
                  <p className="text-sm text-muted-foreground">
                    support@cybiqon.in
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/919250711473"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-1">WhatsApp / Call</p>
                  <p className="text-sm text-muted-foreground">
                    +91 92507 11473
                  </p>
                </div>
              </a>

              <Link
                to="/contact"
                className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-1">More Options</p>
                  <p className="text-sm text-muted-foreground">
                    Visit Contact Page
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
