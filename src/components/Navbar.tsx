import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
    { label: "Process", path: "/process" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Cybiqon AI Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold font-heading gradient-text">Cybiqon AI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Button
                onClick={handleBookCall}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold shadow-md hover:shadow-lg"
              >
                Book Free Call
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Separate overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-[73px] left-0 right-0 bg-white border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                      isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  onClick={() => {
                    handleBookCall();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold"
                >
                  Book Free Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
