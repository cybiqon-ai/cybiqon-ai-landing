import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src="/logo.png" alt="Cybiqon AI Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold font-heading gradient-text">Cybiqon AI</span>
        </div>
        <Button
          onClick={scrollToContact}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold shadow-md hover:shadow-lg"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
