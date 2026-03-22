"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "./AnimatedBackground";
import HeroDashboardMockup from "./HeroDashboardMockup";
import HeroSocialProof from "./HeroSocialProof";

const Hero = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const scrollToSolutions = () => {
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[auto] lg:min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16 lg:pt-16 lg:pb-10">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-4">
            {/* Eyebrow text */}
            <div className="lg:text-left text-center">
              <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-full text-xs font-medium text-primary">
                <TrendingUp className="w-3.5 h-3.5" />
                Helping Indian MSMEs Grow Online Since 2025
              </p>
            </div>

            {/* Main headline */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-[1.15] tracking-tight lg:text-left text-center">
              <span className="text-foreground">Finally, Tech That Works for</span>
              <br />
              <span className="gradient-text">Indian MSMEs</span>
              <span className="text-foreground"> — Not Against Them</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg lg:text-left text-center">
              We build affordable websites and AI automations so you can focus on running your business — not chasing tech vendors.
            </p>

            <p className="text-xs md:text-sm font-semibold text-primary lg:text-left text-center">
              Fast delivery. Fair pricing. Zero tech headaches.
            </p>

            {/* Trust signals - micro */}
            <div className="flex flex-wrap lg:justify-start justify-center gap-3 md:gap-5 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                <span>2 Products Launched</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                <span>100% MSME Focused</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                <span>Based in India</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-start justify-center items-center pt-1">
              <Button
                onClick={handleBookCall}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm px-6 py-5 glow-effect-warm text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Free 30-Min Call <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={scrollToSolutions}
                size="lg"
                variant="outline"
                className="border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm px-6 py-5"
              >
                See Our Services
              </Button>
            </div>

            {/* Free audit + Guarantee */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs md:text-sm text-muted-foreground lg:justify-start justify-center">
              <span>
                or get a{" "}
                <Link href="/free-audit" className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors">
                  Free Website Audit
                </Link>
              </span>
              <span className="hidden sm:block text-border">|</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span className="font-medium">100% Satisfaction Guarantee</span>
              </span>
            </div>
          </div>

          {/* Right column - Dashboard mockup + social proof */}
          <div className="hidden lg:block pt-4">
            <HeroDashboardMockup />
            <div className="w-[calc(100%+4rem)] -mr-16">
              <HeroSocialProof />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
