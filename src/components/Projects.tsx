import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Bot, Image, Mail, FileText, Globe } from "lucide-react";
import professionalBg from "@/assets/professional-tech-bg.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Smart E-Commerce Price Negotiation Chatbot",
      description: "AI-powered chatbot using Python, NLTK, and scikit-learn for intent recognition and response with real-time user interaction through Tkinter GUI.",
      longDescription: "Developed an intelligent chatbot that can negotiate prices in e-commerce scenarios using advanced NLP techniques. The system uses tokenization, lemmatization, and machine learning for accurate intent recognition.",
      tech: ["Python", "NLTK", "Scikit-learn", "Tkinter", "NLP", "Machine Learning"],
      icon: Bot,
      color: "text-tech-blue",
      bgColor: "bg-tech-blue/10",
      features: [
        "Real-time user interaction with Tkinter GUI",
        "Intent recognition using scikit-learn",
        "NLP techniques: tokenization and lemmatization",
        "JSON-based training data for flexible customization"
      ]
    },
    {
      title: "Underwater Image Enhancement With MSRAN",
      description: "Advanced image enhancement model using Multi-Scale Residual Attention Network to restore degraded underwater images with superior visual quality.",
      longDescription: "Implemented a sophisticated deep learning model that significantly improves underwater image quality through multi-scale feature extraction and attention mechanisms.",
      tech: ["Python", "TensorFlow", "CNN", "MSRAN", "UIEB", "Computer Vision"],
      icon: Image,
      color: "text-tech-cyan",
      bgColor: "bg-tech-cyan/10",
      features: [
        "Multi-scale feature extraction and attention mechanisms",
        "Improved image clarity and color correction",
        "Superior PSNR/SSIM metrics vs traditional methods",
        "Detail recovery for degraded underwater images"
      ]
    },
    {
      title: "AI Spam Classifier",
      description: "Email spam detection system using Natural Language Processing and machine learning with Streamlit interface for real-time classification.",
      longDescription: "Built a comprehensive spam detection system that processes emails using advanced NLP techniques and provides accurate classification results through an intuitive web interface.",
      tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit", "Jupyter"],
      icon: Mail,
      color: "text-tech-purple",
      bgColor: "bg-tech-purple/10",
      features: [
        "Text preprocessing and feature extraction (TF-IDF)",
        "Classification using Naive Bayes algorithm",
        "Interactive Streamlit web interface",
        "Comprehensive data analysis with Pandas/NumPy"
      ]
    },
    {
      title: "Movie Recommendation System",
      description: "Intelligent movie recommendation engine using collaborative filtering and similarity metrics to provide personalized movie suggestions.",
      longDescription: "Developed a sophisticated recommendation system that analyzes user preferences and movie characteristics to deliver personalized recommendations.",
      tech: ["Python", "CSV", "Matplotlib", "Scikit-learn", "Collaborative Filtering"],
      icon: FileText,
      color: "text-tech-green",
      bgColor: "bg-tech-green/10",
      features: [
        "User-item matrix for personalized suggestions",
        "Similarity metrics and collaborative filtering",
        "Data visualization with Matplotlib",
        "Machine learning-based recommendation algorithms"
      ]
    },
    {
      title: "Informative Website",
      description: "Functional informational website built with WordPress, featuring course management and content organization with professional hosting setup.",
      longDescription: "Created a comprehensive informational website with advanced WordPress customization, proper domain management, and optimized hosting configuration.",
      tech: ["WordPress", "HTML", "CSS", "Domain Management", "Hosting"],
      icon: Globe,
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "WordPress design and deployment",
        "Domain setup and DNS records management",
        "Hosting through InfinityFree and FreeNom",
        "Course Management and Content Organization"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing my expertise in AI/ML, web development, and innovative problem-solving
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={project.title} className={`tech-card group slide-in-up stagger-${index + 1}`}>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${project.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <project.icon className={`w-6 h-6 ${project.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${project.color.replace('text-', 'bg-')}`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="text-xs border-border/50 hover:border-primary/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group/btn transform hover:scale-105"
                  >
                    <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    View Code
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 group/btn transform hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-12 slide-in-up stagger-3">
          <Button className="btn-glow">
            <Github className="w-4 h-4 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;