"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogCTA = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  return (
    <section className="mt-8 py-10 md:py-12 bg-primary rounded-2xl">
      <div className="px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 className="text-base md:text-lg font-extrabold text-white tracking-tight mb-1">
              Want this set up for your business?
            </h3>
            <p className="text-xs md:text-sm text-white/70 max-w-md">
              Book a free call — no tech jargon, no sales pressure. Just honest answers.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              onClick={handleBookCall}
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-xs px-5 py-4"
            >
              Book a free call <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white/40 text-white hover:bg-white/10 text-xs px-5 py-4"
            >
              <a href="https://wa.me/919250711473" target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
