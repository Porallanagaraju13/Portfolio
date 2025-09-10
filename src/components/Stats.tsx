import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Zap, Users, Coffee, Calendar } from "lucide-react";
import professionalBg from "@/assets/professional-tech-bg.jpg";

const Stats = () => {
  const stats = [
    {
      icon: Monitor,
      value: "5+",
      label: "Projects Completed",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Zap,
      value: "3+",
      label: "Technologies Mastered",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Users,
      value: "10+",
      label: "Certifications Earned",
      color: "text-tech-purple",
      bgColor: "bg-tech-purple/10"
    },
    {
      icon: Coffee,
      value: "100+",
      label: "Cups of Coffee",
      color: "text-tech-green",
      bgColor: "bg-tech-green/10"
    }
  ];

  const currentWork = [
    {
      title: "Web Developer Intern",
      company: "TruPricer",
      status: "Current Role",
      type: "Internship"
    },
    {
      title: "AI/ML Projects",
      company: "Personal Development",
      status: "Ongoing",
      type: "Learning"
    }
  ];

  return (
    <section className="py-20 bg-secondary/10 relative overflow-hidden">
      {/* Professional Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"
        style={{
          backgroundImage: `url(${professionalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.05
        }}
      ></div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-secondary/20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Quick Stats */}
        <div className="mb-16">
          <div className="text-center mb-12 slide-in-up">
            <h2 className="text-3xl font-bold text-gradient mb-4">Quick Overview</h2>
            <p className="text-muted-foreground">Numbers that define my journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={stat.label} className={`tech-card text-center group slide-in-up stagger-${index + 1}`}>
                <div className="space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 slide-in-up">
            <h3 className="text-2xl font-bold mb-4">Current Focus</h3>
            <p className="text-muted-foreground">What I'm working on right now</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {currentWork.map((work, index) => (
              <Card key={work.title} className={`tech-card slide-in-up stagger-${index + 1}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg">{work.title}</h4>
                      <p className="text-muted-foreground">{work.company}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className="bg-tech-green/10 text-tech-green border-tech-green/20">
                        {work.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {work.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>2025</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-16 slide-in-up stagger-3">
          <Card className="tech-card max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <h3 className="text-xl font-bold">⚡ Fun Facts About Me</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="text-2xl">🤖</div>
                  <p className="text-muted-foreground">Built my first chatbot using NLTK and fell in love with AI</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">🌊</div>
                  <p className="text-muted-foreground">Improved underwater image quality using deep learning</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">📧</div>
                  <p className="text-muted-foreground">Can detect spam emails with 95%+ accuracy</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;