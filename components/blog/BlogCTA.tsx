"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogCTA = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  return (
    <section className="mt-12 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-primary/15 p-8 md:p-12 text-center">
      <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3">
        Want This Set Up for <span className="gradient-text">Your Business</span>?
      </h3>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
        Book a free call and let&apos;s make it happen. No tech jargon, no sales pressure — just honest answers.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleBookCall}
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold shadow-md hover:shadow-lg glow-effect-warm"
        >
          Book a Free Call <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
        >
          <a href="https://wa.me/919250711473" target="_blank" rel="noopener noreferrer">
            WhatsApp Us
          </a>
        </Button>
      </div>
    </section>
  );
};

export default BlogCTA;
