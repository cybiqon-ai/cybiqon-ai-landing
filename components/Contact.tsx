"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone, ArrowRight, FileSearch } from "lucide-react";
import Link from "next/link";

const Contact = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  return (
    <section id="contact" className="py-8 md:py-18 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
              Ready to <span className="text-primary">Grow</span> Your Business?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Let&apos;s discuss how we can help you grow online
            </p>
          </div>

          <div className="glass-card p-6 md:p-8">
            <div className="text-center mb-6">
              <Button
                onClick={handleBookCall}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl text-sm px-8 py-5"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Your Free 30-Min Call
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Get instant answers, exact quote, and timeline — no commitment required
              </p>
              <p className="text-xs font-medium text-primary mt-1.5">
                We respond within 24 hours — guaranteed
              </p>
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-border"></div>
              <span className="text-xs text-muted-foreground">or reach out directly</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-3">
              <a
                href="mailto:support@cybiqon.in"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm mb-0.5">Email Us</p>
                  <p className="text-xs text-muted-foreground">support@cybiqon.in</p>
                </div>
              </a>

              <a
                href="https://wa.me/919250711473"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm mb-0.5">WhatsApp / Call</p>
                  <p className="text-xs text-muted-foreground">+91 92507 11473</p>
                </div>
              </a>

              <Link
                href="/free-audit"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileSearch className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm mb-0.5">Free Website Audit</p>
                  <p className="text-xs text-muted-foreground">Get a detailed review</p>
                </div>
              </Link>

              <Link
                href="/contact"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm mb-0.5">More Options</p>
                  <p className="text-xs text-muted-foreground">Visit Contact Page</p>
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
