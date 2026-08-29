"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

type NavLink = { label: string; path: string; description?: string };
type NavItem = NavLink | { label: string; match: string[]; children: NavLink[] };

const hasChildren = (item: NavItem): item is Extract<NavItem, { children: NavLink[] }> =>
  "children" in item;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleBookCall = () => {
    window.open('https://tidycal.com/itspyguru/cybiqon-30-minute-meeting', '_blank');
  };

  // Eight top-level slots is the hard limit — nine do not fit at the lg breakpoint
  // without wrapping. "Our Works", "Products" and the client ledger are three views of
  // the same question ("what have you actually built?"), so they share one slot rather
  // than costing three. /process is still reachable from the footer as "How It Works".
  const navLinks: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    {
      label: "Work",
      match: ["/our-works", "/products"],
      children: [
        { label: "Our Works", path: "/our-works", description: "Sites, extensions and 3D we've shipped" },
        { label: "Products", path: "/products", description: "Apps, games and extensions of our own" },
        { label: "Client Work", path: "/products#client-work", description: "Built for someone else, on their terms" },
      ],
    },
    { label: "Pricing", path: "/pricing" },
    { label: "Free Website", path: "/free-website" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" }
  ];

  const isActive = (path: string) => pathname === path;
  const isGroupActive = (match: string[]) =>
    match.some((m) => pathname === m || pathname.startsWith(`${m}/`));

  // A dropdown left open across a navigation is a dropdown covering the page you asked
  // for, so route changes close it — and Escape does too, because a hover-opened menu is
  // otherwise unclosable from the keyboard.
  useEffect(() => {
    setWorkOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!workOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWorkOpen(false);
    const onClick = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) setWorkOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [workOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Cybiqon AI Logo" className="w-8 h-8 object-contain" loading="eager" />
              <span className="text-xl font-bold font-heading gradient-text">Cybiqon AI</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) =>
                  hasChildren(link) ? (
                    <div
                      key={link.label}
                      ref={workRef}
                      className="relative"
                      onMouseEnter={() => setWorkOpen(true)}
                      onMouseLeave={() => setWorkOpen(false)}
                    >
                      <button
                        type="button"
                        aria-expanded={workOpen}
                        aria-haspopup="true"
                        onClick={() => setWorkOpen((v) => !v)}
                        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                          isGroupActive(link.match) ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          strokeWidth={2}
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${workOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Rendered always and hidden with CSS, not mounted on open. This
                          slot used to be a plain "Our Works" anchor; gating three links
                          behind React state would have taken them out of the served HTML
                          and off the crawl path, which is a real cost for no gain. */}
                      <div
                        className={`absolute left-0 top-full pt-3 transition-opacity duration-150 ${
                          workOpen ? 'opacity-100' : 'pointer-events-none invisible opacity-0'
                        }`}
                      >
                        <div className="w-72 rounded-lg border border-border bg-background p-2 shadow-lg">
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              className="block rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
                            >
                              <span className="block text-sm font-medium text-foreground">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              <Button onClick={handleBookCall} variant="accent">
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
                {navLinks.map((link) =>
                  hasChildren(link) ? (
                    // No disclosure toggle on mobile: there is room, and a two-tap path to
                    // a three-item list is a worse trade than four lines of vertical space.
                    <div key={link.label} className="py-2">
                      <span
                        className={`text-sm font-medium ${
                          isGroupActive(link.match) ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {link.label}
                      </span>
                      <div className="mt-2 flex flex-col space-y-3 border-l border-border pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
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
                  )
                )}
                <Button
                  onClick={() => { handleBookCall(); setMobileMenuOpen(false); }}
                  variant="accent"
                  className="w-full"
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
