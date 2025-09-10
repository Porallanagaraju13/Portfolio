import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Palette, Brain, Globe, Server } from "lucide-react";
import professionalBg from "@/assets/professional-tech-bg.jpg";

const About = () => {
  const skillsData = [
    { name: "Python", icon: Code, color: "from-yellow-400 to-yellow-600", delay: "0s" },
    { name: "JavaScript", icon: Code, color: "from-yellow-300 to-orange-500", delay: "0.1s" },
    { name: "Java", icon: Code, color: "from-red-400 to-red-600", delay: "0.2s" },
    { name: "PHP", icon: Code, color: "from-purple-400 to-purple-600", delay: "0.3s" },
    { name: "C", icon: Code, color: "from-blue-400 to-blue-600", delay: "0.4s" },
    { name: "HTML/CSS", icon: Globe, color: "from-orange-400 to-pink-500", delay: "0.5s" },
    { name: "React", icon: Globe, color: "from-cyan-400 to-blue-500", delay: "0.6s" },
    { name: "MySQL", icon: Database, color: "from-blue-500 to-indigo-600", delay: "0.7s" },
    { name: "WordPress", icon: Server, color: "from-blue-600 to-gray-700", delay: "0.8s" },
    { name: "Git", icon: Server, color: "from-orange-500 to-red-600", delay: "0.9s" },
    { name: "Figma", icon: Palette, color: "from-purple-500 to-pink-500", delay: "1s" },
    { name: "Canva", icon: Palette, color: "from-blue-400 to-purple-500", delay: "1.1s" },
    { name: "Machine Learning", icon: Brain, color: "from-green-400 to-emerald-600", delay: "1.2s" },
    { name: "Deep Learning", icon: Brain, color: "from-emerald-400 to-teal-600", delay: "1.3s" },
    { name: "NLP", icon: Brain, color: "from-teal-400 to-cyan-600", delay: "1.4s" },
    { name: "TensorFlow", icon: Brain, color: "from-orange-400 to-red-500", delay: "1.5s" },
  ];

  const categories = [
    { name: "Languages", items: ["Java", "JavaScript", "C", "PHP", "Python"], icon: Code },
    { name: "Frontend", items: ["HTML", "CSS", "React", "Responsive Design"], icon: Globe },
    { name: "Database", items: ["MySQL", "Database Design"], icon: Database },
    { name: "Design", items: ["Figma", "Canva", "UI/UX"], icon: Palette },
    { name: "AI/ML", items: ["Supervised Learning", "Deep Learning", "NLP", "TensorFlow"], icon: Brain },
    { name: "Tools", items: ["WordPress", "Git", "Domain Management"], icon: Server },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Computer Science Engineering student passionate about AI/ML and web development. 
            Experienced in building intelligent solutions and modern web applications.
          </p>
        </div>

        {/* Floating Skills Cloud */}
        <div className="mb-16 slide-in-up">
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Skills</h3>
          <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-tech-purple/5 backdrop-blur-sm border border-border/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-pulse"></div>
            <div className="relative p-8 flex flex-wrap gap-4 justify-center items-center min-h-[400px]">
              {skillsData.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative"
                  style={{ 
                    animation: `float 6s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className={`
                    relative px-6 py-3 rounded-full 
                    bg-gradient-to-r ${skill.color}
                    text-white font-medium text-sm
                    shadow-lg shadow-black/20
                    transform transition-all duration-300
                    hover:scale-110 hover:shadow-xl hover:shadow-primary/30
                    cursor-pointer
                    before:absolute before:inset-0 before:rounded-full 
                    before:bg-gradient-to-r before:${skill.color} 
                    before:opacity-0 before:blur-md
                    hover:before:opacity-50 before:transition-opacity before:duration-300
                    group-hover:animate-pulse
                  `}>
                    <div className="relative flex items-center gap-2 z-10">
                      <skill.icon className="w-4 h-4" />
                      <span>{skill.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">

          {/* About Text */}
          <div className="space-y-6 slide-in-left">
            <h3 className="text-2xl font-bold mb-6">Background</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Computer Science Engineering student at Siddhartha Institute Of Engineering 
                and Technology, passionate about artificial intelligence and web development.
              </p>
              <p>
                With hands-on experience in machine learning projects and web development internships, 
                I've built everything from AI-powered chatbots to responsive WordPress websites.
              </p>
              <p>
                Currently working as a Web Developer Intern at TruPricer, where I manage domains, 
                handle DNS records, and build SEO-friendly websites using modern technologies.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                🎓 CSE Student
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                💼 Web Developer Intern
              </Badge>
              <Badge variant="secondary" className="bg-tech-purple/10 text-tech-purple border-tech-purple/20">
                🤖 AI/ML Enthusiast
              </Badge>
            </div>
          </div>

          {/* Professional Tech Image */}
          <div className="slide-in-right">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-border/20">
              <img 
                src="/lovable-uploads/c15bea31-3118-4b90-88bd-8f37c5467029.png"
                alt="Professional tech workspace showing AI/ML development and web technologies"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Skills Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={category.name} className={`tech-card slide-in-up stagger-${index + 1}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">{category.name}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <Badge key={item} variant="outline" className="text-xs border-border/50">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;