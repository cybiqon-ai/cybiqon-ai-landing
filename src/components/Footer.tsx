import { Sparkles, Mail, Phone, Linkedin, Send, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <img src="/logo.png" alt="Cybiqon AI Logo" className="w-6 h-6 object-contain" />
              <span className="text-xl font-bold font-heading gradient-text">Cybiqon AI</span>
            </div>
            <p className="text-muted-foreground">
              Empowering businesses with modern websites and AI automation solutions.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@cybiqon.ai" className="hover:text-primary transition-colors">
                  itspyguru@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 88962 70660</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors cursor-not-allowed opacity-50"
                title="LinkedIn - Coming Soon"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/cybiqonai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/cybiqon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2025 Cybiqon AI Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
