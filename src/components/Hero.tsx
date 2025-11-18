import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import BusinessGrowthVisual from "./BusinessGrowthVisual";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="gradient-text">Transform Your Business</span>
            <br />
            <span className="text-foreground">with Modern Websites & AI Automation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Empowering small and medium businesses to grow online with affordable, 
            professional websites and intelligent automation solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6 glow-effect"
            >
              Transform My Business <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary/50 hover:border-primary text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>

          <BusinessGrowthVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;
