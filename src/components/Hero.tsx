import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, Code, Brain, Sparkles, Zap, Cpu, Database } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import { useState, useEffect } from "react";
import professionalBg from "@/assets/professional-tech-bg.jpg";

const Hero = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Fullstack Developer & AI/ML Enthusiast";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Professional Background with Image */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"
        style={{
          backgroundImage: `url(${professionalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}
      ></div>
      
      {/* Morphing Geometric Shapes */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-morph"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-morph-reverse"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rotate-45 animate-float-rotate"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-accent/5 rounded-full animate-scale-pulse"></div>
      
      {/* Floating Tech Elements */}
      <div className="absolute top-32 left-32 text-primary/20 animate-drift">
        <Code className="w-8 h-8" />
      </div>
      <div className="absolute bottom-32 right-32 text-accent/20 animate-drift-reverse">
        <Database className="w-6 h-6" />
      </div>
      <div className="absolute top-1/2 right-16 text-primary/15 animate-orbit">
        <Cpu className="w-5 h-5" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 slide-in-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent animate-sparkle" />
                <p className="text-accent font-medium text-lg animate-glow">Hello, I'm</p>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-none relative">
                <span className="bg-gradient-to-r from-tech-blue via-primary to-tech-purple bg-clip-text text-transparent animate-text-shimmer bg-300% animate-gradient-shift">
                  Nagaraju
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent via-tech-purple to-primary bg-clip-text text-transparent animate-text-shimmer bg-300% animate-gradient-shift-reverse">
                  Poralla
                </span>
              </h1>
              <div className="text-xl text-muted-foreground max-w-lg h-14 relative">
                <p className="typewriter leading-tight">
                  {typewriterText}
                  <span className="animate-blink">|</span>
                </p>
              </div>
            </div>

            {/* Enhanced Tech Highlights */}
            <div className="flex flex-wrap gap-3">
              {["Python", "JavaScript", "AI/ML", "Web Dev"].map((tech, index) => (
                <span 
                  key={tech}
                  className={`group px-6 py-3 bg-gradient-to-r from-secondary/80 to-secondary/40 backdrop-blur-sm rounded-full text-sm font-medium border border-primary/20 slide-in-up stagger-${index + 1} hover:scale-110 hover:border-primary/50 transition-all duration-500 relative overflow-hidden`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10 text-foreground group-hover:text-primary transition-colors duration-300">{tech}</span>
                </span>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 slide-in-up stagger-2">
              <Button 
                onClick={() => {
                  // Open the CV in a new window for printing/downloading as PDF
                  window.open('/Nagaraju_Poralla_CV.html', '_blank');
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-tech-blue hover:from-primary/90 hover:to-tech-blue/90 border-0 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Download CV</span>
              </Button>
              <Button 
                variant="outline" 
                className="group border-2 border-primary/30 hover:border-primary bg-transparent hover:bg-primary/5 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                onClick={() => {
                  const email = 'nagarajuporalla13@gmail.com';
                  const subject = 'Hello from Portfolio';
                  const body = 'Hi Nagaraju,\n\nI came across your portfolio and would like to get in touch.\n\nBest regards,';
                  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.open(mailtoLink, '_self');
                }}
              >
                <Mail className="w-4 h-4 mr-2 animate-wiggle group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">Get In Touch</span>
              </Button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex gap-6 slide-in-up stagger-3">
              <a 
                href="https://github.com/Nagaraju13" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-secondary border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 animate-social-float"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/nagarajuporalla" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-secondary border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 animate-social-float"
                style={{animationDelay: '0.5s'}}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:nagarajuporalla13@gmail.com"
                className="p-3 rounded-lg bg-secondary border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 animate-social-float"
                style={{animationDelay: '1s'}}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enhanced Right Visual */}
          <div className="relative slide-in-right">
            <div className="relative">
              {/* Rotating Ring Around Avatar */}
              <div className="absolute inset-0 w-80 h-80 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-accent/20 animate-spin-reverse"></div>
              </div>
              
              {/* Main Avatar Circle */}
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent p-1">
                  <div className="w-full h-full rounded-full bg-background overflow-hidden">
                    <img 
                      src="/lovable-uploads/8bb0b87d-da64-4f99-b5cd-78969e88ffca.png"
                      alt="Nagaraju Poralla - AI/ML Developer"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Enhanced Floating Tech Icons */}
                <div className="absolute -top-4 -right-4 p-3 rounded-lg bg-card border border-border floating animate-icon-bounce">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 p-3 rounded-lg bg-card border border-border floating animate-icon-spin" style={{animationDelay: '1s'}}>
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <div className="absolute top-1/4 -left-8 p-2 rounded-lg bg-card border border-border floating animate-icon-pulse" style={{animationDelay: '2s'}}>
                  <span className="text-sm font-medium text-primary">AI</span>
                </div>
                <div className="absolute bottom-1/4 -right-8 p-2 rounded-lg bg-card border border-border floating animate-icon-wiggle" style={{animationDelay: '0.5s'}}>
                  <span className="text-sm font-medium text-accent">ML</span>
                </div>
                
                {/* New Floating Elements */}
                <div className="absolute top-8 left-8 p-2 rounded-lg bg-card border border-border floating animate-icon-float" style={{animationDelay: '1.5s'}}>
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div className="absolute bottom-8 right-8 p-2 rounded-lg bg-card border border-border floating animate-icon-rotate" style={{animationDelay: '3s'}}>
                  <Cpu className="w-4 h-4 text-accent" />
                </div>
                <div className="absolute top-16 right-4 p-2 rounded-lg bg-card border border-border floating animate-icon-bounce" style={{animationDelay: '2.5s'}}>
                  <Database className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;