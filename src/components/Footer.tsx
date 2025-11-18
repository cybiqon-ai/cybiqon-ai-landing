import { Sparkles, Mail, Phone, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold gradient-text">Cybiqon AI</span>
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
                <span>hello@cybiqon.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-muted-foreground">
          <p>&copy; 2024 Cybiqon AI Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
