import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, TrendingUp } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import BusinessGrowthVisual from "./BusinessGrowthVisual";
import IndustrySphere3D from "./IndustrySphere3D";

const Hero = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const scrollToSolutions = () => {
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20">
      <AnimatedBackground />

      {/* 3D Sphere positioned in right whitespace - moved up more */}
      <div className="absolute bottom-40 right-10 hidden xl:block pointer-events-none">
        <div className="relative w-[400px] h-[400px]">
          <IndustrySphere3D enabled={true} />
        </div>
      </div>

      <div className="content-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow text */}
          <div className="text-center mb-6 animate-fade-in">
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-full text-sm font-medium text-primary">
              <TrendingUp className="w-4 h-4" />
              Helping Indian MSMEs Grow Online Since 2025
            </p>
          </div>

          {/* Main headline */}
          <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight font-heading mb-8">
              <span className="text-foreground">Your Business Deserves a</span>
              <br />
              <span className="gradient-text">Strong Online Presence</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We build websites, apps, AI automations, and custom tools for growing businesses.
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mt-4">
              Affordable websites, web scraping, Chrome extensions, and smart automation — without tech headaches.
            </p>

            {/* Trust signals - micro */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base text-muted-foreground pt-4 pb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>2 Products Launched</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>100% MSME Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span>Based in India</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={handleBookCall}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-lg px-8 py-6 glow-effect-warm text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Free 30-Min Call <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={scrollToSolutions}
                size="lg"
                variant="outline"
                className="border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 text-lg px-8 py-6"
              >
                See Our Solutions
              </Button>
            </div>

            {/* Social proof hint */}
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 pt-2">
              <Users className="w-4 h-4 text-secondary" />
              Trusted by businesses like yours
            </p>
          </div>

          {/* Business Growth Visual - moved down */}
          <div className="mt-16 md:mt-20 lg:mt-24 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <BusinessGrowthVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
