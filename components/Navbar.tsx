"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  // Eight slots is the hard limit — nine wrap at the lg breakpoint. Six are used, so
  // there is room; the ones that are gone were removed on purpose rather than for space.
  //
  // "Products" holds the slot "Our Works" had: that page showed five sample builds that
  // were never client work, and it was removed on 29 Aug 2026 in favour of real products
  // and real engagements. Client work is a section of /products rather than a link of its
  // own, so it costs no slot. /process is still reachable from the footer as "How It
  // Works". "Free Website" and "Case Studies" came out on 6 Sep 2026 — /case-studies
  // carries one study, LeadzGalaxy, and a top-level nav slot promised more than one.
  // Both pages still exist and are still linked from the footer and the sitemap.
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Products", path: "/products" },
    { label: "Pricing", path: "/pricing" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" }
  ];

  // A product page is under /products, and the nav should still show where you are.
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* One fixed header holding the announcement strip and the nav row, as the comp
          has it. The strip cannot live outside this: the nav is `fixed`, so anything
          rendered above it in normal flow ends up underneath it. */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 shadow-sm backdrop-blur-lg">
        <AnnouncementBar />
        <div className="container mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between">
            {/* Two-line lockup, as the comp has it: the name, and under it what the
                company actually sells. A visitor arriving from a search result should not
                have to read the h1 to find out. */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80">
              <img src="/logo.png" alt="Cybiqon AI Logo" className="h-8 w-8 object-contain" loading="eager" />
              <span className="flex flex-col leading-none">
                <span className="font-jakarta text-[1.15rem] font-bold tracking-tight text-primary">
                  Cybiqon AI
                </span>
                <span className="mt-0.5 hidden text-[11px] font-medium text-muted-foreground sm:block">
                  Custom software &amp; AI for Indian business
                </span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(link.path) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    {/* The price badge from the comp, on Pricing. */}
                    {link.path === "/pricing" && (
                      <span className="rounded-full bg-accent-softer px-1.5 py-0.5 text-[11px] font-bold text-accent-ink">
                        ₹9,999+
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              {/* Live WhatsApp number with a ping, as the comp has it. It is the channel
                  this audience actually uses, and it was previously only reachable from
                  the floating widget. */}
              <a
                href="https://wa.me/919250711473"
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-label="navbar"
                aria-label="WhatsApp +91 92507 11473"
                className="hidden items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary xl:inline-flex"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                +91 92507 11473
              </a>
              <Button onClick={handleBookCall} variant="accent" data-track="book_call" data-track-label="navbar">
                Book a free call
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-[73px] left-0 right-0 bg-background border-b border-border shadow-lg max-h-[calc(100vh-73px)] overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                      isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  onClick={() => { handleBookCall(); setMobileMenuOpen(false); }}
                  variant="accent"
                  className="w-full"
                  data-track="book_call"
                  data-track-label="navbar_mobile"
                >
                  Book a free call
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
