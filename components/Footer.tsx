import Link from "next/link";
import { Mail, Phone, Linkedin, Facebook, MessageCircle, Send, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-1 mb-4 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Cybiqon AI Logo" className="w-6 h-6 object-contain" loading="lazy" />
              <span className="text-xl font-bold font-heading gradient-text">Cybiqon AI</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering MSMEs with modern websites and AI automation solutions.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/our-works" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Our Works</Link>
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/case-studies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link>
              <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <div className="space-y-2">
              <Link href="/pricing#websites" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Website Development</Link>
              <Link href="/pricing#apps" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Android Apps</Link>
              <Link href="/pricing#automation" className="block text-sm text-muted-foreground hover:text-primary transition-colors">AI Automation</Link>
              <Link href="/pricing#scraping" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Bulk Scraping</Link>
              <Link href="/pricing#extensions" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Chrome Extensions</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <div className="space-y-2">
              <Link href="/process" className="block text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <a href="https://tidycal.com/itspyguru/cybiqon-30-minute-meeting" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Book a Call</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:support@cybiqon.in" className="hover:text-primary transition-colors">support@cybiqon.in</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 92507 11473</span>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/cybiqon-ai-solutions" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              <a href="https://www.facebook.com/cybiqon.ai.solutions/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="https://wa.me/919250711473" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors" aria-label="WhatsApp"><MessageCircle className="w-4 h-4" /></a>
              <a href="https://t.me/cybiqonai" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors" aria-label="Telegram"><Send className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/cybiqon.ai" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 Cybiqon AI Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
