import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogCTA = () => {
  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  return (
    <section className="mt-12 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-primary/15 p-8 md:p-12 text-center">
      <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3">
        Ready to <span className="gradient-text">Automate Your Business</span>?
      </h3>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
        From custom websites to AI-powered automation — we help MSMEs grow faster with technology that works.
      </p>
      <Button
        onClick={handleBookCall}
        size="lg"
        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold shadow-md hover:shadow-lg glow-effect-warm"
      >
        Book a Free Call <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </section>
  );
};

export default BlogCTA;
