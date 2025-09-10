import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import professionalBg from "@/assets/professional-tech-bg.jpg";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9908425164",
      href: "tel:+919908425164",
      color: "text-tech-green"
    },
    {
      icon: Mail,
      label: "Email",
      value: "nagarajuporalla13@gmail.com",
      href: "mailto:nagarajuporalla13@gmail.com",
      color: "text-primary"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, Telangana",
      href: "#",
      color: "text-accent"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Nagaraju13",
      color: "text-foreground"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/nagarajuporalla",
      color: "text-blue-400"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:nagarajuporalla13@gmail.com",
      color: "text-primary"
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Professional Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"
        style={{
          backgroundImage: `url(${professionalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08
        }}
      ></div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 slide-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on exciting projects? Let's discuss how we can work together 
            to create amazing solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 slide-in-left">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              {contactInfo.map((info, index) => (
                <Card key={info.label} className={`tech-card group slide-in-left stagger-${index + 1}`}>
                  <a 
                    href={info.href}
                    className="flex items-center gap-4 p-2 -m-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`p-3 rounded-lg bg-secondary group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-semibold group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg bg-secondary border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110 slide-in-left stagger-${index + 4}`}
                  >
                    <social.icon className={`w-6 h-6 ${social.color}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <Card className="tech-card slide-in-left stagger-5">
              <div className="space-y-3">
                <h4 className="font-bold flex items-center gap-2">
                  <div className="w-3 h-3 bg-tech-green rounded-full animate-pulse"></div>
                  Available for Opportunities
                </h4>
                <p className="text-sm text-muted-foreground">
                  Currently open to internship opportunities, freelance projects, 
                  and collaborative work in AI/ML and web development.
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="slide-in-right">
            <Card className="tech-card">
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input 
                        placeholder="John"
                        className="bg-secondary border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input 
                        placeholder="Doe"
                        className="bg-secondary border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email"
                      placeholder="john.doe@example.com"
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input 
                      placeholder="Let's work together"
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className="bg-secondary border-border focus:border-primary resize-none"
                    />
                  </div>
                </div>

                <Button className="btn-glow w-full group">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 slide-in-up stagger-3">
          <Card className="tech-card max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gradient">24h</div>
                <p className="text-sm text-muted-foreground">Average Response Time</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gradient">100%</div>
                <p className="text-sm text-muted-foreground">Project Commitment</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gradient">5+</div>
                <p className="text-sm text-muted-foreground">Successful Projects</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;