import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Nagaraju13",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/nagarajuporalla",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:nagarajuporalla13@gmail.com",
      label: "Email"
    }
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-background font-bold text-lg">NP</span>
              </div>
              <span className="font-bold text-xl text-gradient">Nagaraju Poralla</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI/ML Developer & Web Developer passionate about creating innovative solutions 
              with cutting-edge technologies. Always excited to collaborate on new projects.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Email</p>
                <a 
                  href="mailto:nagarajuporalla13@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  nagarajuporalla13@gmail.com
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Phone</p>
                <a 
                  href="tel:+919908425164"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  +91 9908425164
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Location</p>
                <p>Hyderabad, Telangana, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <span>© {currentYear} Nagaraju Poralla. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and lots of ☕</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="group hover:border-primary/50"
          >
            <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;