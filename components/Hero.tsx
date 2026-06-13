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
    <section className="relative min-h-[85dvh] lg:min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-20 lg:pt-16 lg:pb-10">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-5 md:space-y-4">
            {/* Eyebrow text */}
            <div className="lg:text-left text-center">
              <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted border border-border rounded-full text-xs font-medium text-muted-foreground">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                Helping Indian MSMEs Grow Online Since 2025
              </p>
            </div>

            {/* Main headline */}
            <h1 className="display text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl lg:text-left text-center">
              <span className="text-foreground">Finally, Tech That Works for </span>
              <span className="gradient-text">Indian MSMEs</span>
              <br className="hidden lg:block" />
              <span className="text-foreground"> — Not Against Them</span>
            </h1>

            <p className="text-base md:text-base text-muted-foreground leading-relaxed max-w-lg lg:text-left text-center">
              We build affordable websites and AI automations so you can focus on running your business — not chasing tech vendors.
            </p>

            <p className="text-sm md:text-sm font-semibold text-primary lg:text-left text-center">
              Fast delivery. Fair pricing. Zero tech headaches.
            </p>

            {/* Trust signals - micro */}
            <div className="flex flex-wrap lg:justify-start justify-center gap-3 md:gap-5 text-sm md:text-sm text-muted-foreground">
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

            {/* CTAs — one reserved accent (orange) for the primary action */}
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-start justify-center items-center pt-1">
              <Button
                onClick={handleBookCall}
                size="lg"
                variant="accent"
                className="text-sm px-6"
              >
                Book Free 30-Min Call <ArrowRight />
              </Button>
              <Button
                onClick={scrollToSolutions}
                size="lg"
                variant="outline"
                className="text-sm px-6"
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
