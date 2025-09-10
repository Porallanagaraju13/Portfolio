import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, ExternalLink } from "lucide-react";
import professionalBg from "@/assets/professional-tech-bg.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Certifications = () => {
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const BrandImage = ({ localSrc, remoteSrc, alt }: { localSrc: string; remoteSrc: string; alt: string }) => {
    const [src, setSrc] = useState(localSrc);
    return (
      <img
        src={src}
        alt={alt}
        className="h-6 w-auto"
        loading="lazy"
        onError={(e) => {
          if (src !== remoteSrc) {
            setSrc(remoteSrc);
          }
        }}
      />
    );
  };
  // Lightweight inline brand logos for providers
  const GoogleCloudLogo = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.59 0 6.83 1.38 9.3 3.63l6.64-6.64C35.94 2.57 30.33 0 24 0 14.64 0 6.53 4.9 2.26 12.04l7.73 5.98C12.09 12.61 17.57 9.5 24 9.5z"/>
      <path fill="#FBBC05" d="M46.08 24.55c0-1.58-.15-3.09-.44-4.55H24v9.1h12.36c-.54 2.93-2.16 5.42-4.6 7.1l7.05 5.46c4.12-3.8 7.27-9.56 7.27-17.11z"/>
      <path fill="#34A853" d="M9.99 28.02A14.49 14.49 0 0 1 9.5 24c0-1.39.2-2.73.56-4l-7.8-6A24 24 0 0 0 0 24c0 3.77.9 7.32 2.5 10.46l7.49-6.44z"/>
      <path fill="#4285F4" d="M24 48c6.33 0 11.66-2.09 15.55-5.65l-7.05-5.46C30.19 38.83 27.29 40 24 40c-6.43 0-11.91-3.11-14.01-9.46l-7.49 6.44C6.77 43.1 14.88 48 24 48z"/>
    </svg>
  );
  const AWSLogo = () => (
    <BrandImage
      localSrc="/logos/aws.svg"
      remoteSrc="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
      alt="AWS logo"
    />
  );
  const IBMLogo = () => (
    <BrandImage
      localSrc="/logos/ibm.svg"
      remoteSrc="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
      alt="IBM logo"
    />
  );
  const NPTELLogo = () => (
    <BrandImage
      localSrc="/logos/nptel.png"
      remoteSrc="https://upload.wikimedia.org/wikipedia/en/2/2e/NPTEL_logo.png"
      alt="NPTEL logo"
    />
  );
  const UdemyLogo = () => (
    <BrandImage
      localSrc="/logos/udemy.svg"
      remoteSrc="https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg"
      alt="Udemy logo"
    />
  );
  const MicrosoftLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  );

  const renderProviderLogo = (provider: string, fallback: React.ReactNode) => {
    const p = provider.toLowerCase();
    if (p.includes("google")) return <GoogleCloudLogo />;
    if (p.includes("aws")) return <AWSLogo />;
    if (p.includes("ibm")) return <IBMLogo />;
    if (p.includes("udemy")) return <UdemyLogo />;
    if (p.includes("microsoft")) return <MicrosoftLogo />;
    return <>{fallback}</>;
  };
  const certifications = [
    {
      title: "Programming in Python: Core Concepts",
      provider: "LearnTube By CareerNinja",
      year: "2024",
      type: "Programming",
      logo: (<BrandImage localSrc="/logos/python.svg" remoteSrc="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python logo" />),
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      link: "/python.jpg"
    },
    {
      title: "Java Advanced (English) — Certificate of Achievement",
      provider: "LearnTube by CareerNinja — with Narayana Educational Institutions",
      year: "2024-05-16",
      type: "Programming",
      logo: (<BrandImage localSrc="/logos/java.svg" remoteSrc="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="Java logo" />),
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      link: "/java.jpg"
    },
    {
      title: "Foundations of Artificial Intelligence (Internship)",
      provider: "Microsoft — Edunet Foundation — AICTE",
      year: "Apr 10 – May 10, 2025",
      type: "AI/ML",
      logo: "🧠",
      color: "text-tech-purple",
      bgColor: "bg-tech-purple/10",
      link: "/certificate.pdf"
    },
    {
      title: "Machine Learning Using Python (Internship)",
      provider: "YHills Edutech Pvt Ltd",
      year: "2024",
      type: "AI/ML",
      logo: "🤖",
      color: "text-tech-blue",
      bgColor: "bg-tech-blue/10",
      link: "/Yhills.pdf"
    },
    {
      title: "Technical Intern (JavaScript, AI tools, Astro Frameworks)",
      provider: "Prasanta Communications, Hyderabad",
      year: "2024-2025",
      type: "Web Development",
      logo: "💻",
      color: "text-tech-cyan",
      bgColor: "bg-tech-cyan/10"
    },
    {
      title: "Web Developer (DNS Records, Deploying Server)",
      provider: "Trupricer (Pure In Fresh Foods Pvt Ltd)",
      year: "2025",
      type: "Web Development",
      logo: "🌐",
      color: "text-tech-green",
      bgColor: "bg-tech-green/10",
      link: "/Trupricer.pdf"
    },
    {
      title: "AI for Social Media Marketing: From Creation to Monetization",
      provider: "Udemy",
      year: "April 24, 2025",
      type: "Online Course",
      logo: "🎓",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      link: "/Udemy%20certificate.pdf"
    },
    {
      title: "Introduction to Internet of Things (12-week course)",
      provider: "NPTEL — IIT Kharagpur",
      year: "July–October 2024",
      type: "Certification",
      logo: "📜",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      link: "/nptel.pdf"
    },
    {
      title: "Artificial Intelligence and Data Analytics (Internship)",
      provider: "AICTE — Shell India — Edunet Foundation — Skills4Future Program",
      year: "2025",
      type: "AI/ML",
      logo: "📊",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      link: "/Data%20Analyst.pdf"
    }
    ,
    {
      title: "UNDERWATER IMAGE ENHANCEMENT WITH MULTI-SCALE RESIDUAL ATTENTION NETWORK",
      provider: "International Conference on Multidisciplinary Research and Innovations (ICMDRI 2025) — SIET",
      year: "May 31, 2025",
      type: "Conference Paper",
      logo: "📄",
      color: "text-tech-purple",
      bgColor: "bg-tech-purple/10",
      link: "/ICMDRI.pdf"
    }
  ];

  const achievements = [
    {
      title: "Prompt Design in Vertex AI Skill Badge",
      provider: "Google Cloud Skills Boost",
      logo: "☁️",
      color: "text-blue-400",
      link: "https://www.cloudskillsboost.google/public_profiles/83c832c1-c093-43e8-9529-9f4fdfbe2406/badges/11707630"
    },
    {
      title: "Introduction to Generative AI Skill Badge",
      provider: "AWS Educate",
      logo: "⚡",
      color: "text-orange-400",
      link: "https://www.credly.com/badges/a4a192bc-b63b-4f47-ae1c-3d4dc2846947/public_url"
    },
    {
      title: "Build Real World AI Applications with Gemini and Imagen",
      provider: "Google Cloud Skills Boost",
      logo: "🚀",
      color: "text-blue-400",
      link: "https://www.cloudskillsboost.google/public_profiles/83c832c1-c093-43e8-9529-9f4fdfbe2406/badges/14807033"
    },
    {
      title: "Journey to Cloud: Envisioning Your Solution",
      provider: "IBM Skill Build",
      logo: "💙",
      color: "text-blue-600",
      link: "/ibm-skillsbuild-ai1.pdf",
      date: "September 19, 2024",
      description: "This course covers the essential concepts for planning and envisioning cloud solutions, a core skill for modern infrastructure and application development."
    },
    {
      title: "Explore Generative AI with the Vertex AI Gemini API",
      provider: "Google Cloud Skills Boost",
      logo: "✨",
      color: "text-blue-400",
      link: "http://cloudskillsboost.google/public_profiles/83c832c1-c093-43e8-9529-9f4fdfbe2406/badges/14886086"
    }
    ,
    // Added from academic transcript (new, non-duplicates)
    {
      title: "Getting Started with Artificial Intelligence",
      provider: "IBM SkillsBuild",
      logo: "💙",
      color: "text-blue-600",
      link: "/ibm-skillsbuild-ai.pdf",
      date: "September 19, 2024",
      description: "This course provides foundational knowledge of Artificial Intelligence, its applications, and its role in the modern digital landscape."
    },
    {
      title: "AWS Educate Machine Learning Foundations",
      provider: "AWS Educate",
      logo: "⚡",
      color: "text-orange-400",
      link: "https://www.credly.com/badges/3154bb4b-93de-427b-bd80-1c0bf58fed71/public_url"
    },
    {
      title: "Develop GenAI Apps with Gemini and Streamlit Skill Badge",
      provider: "Google Cloud Skills Boost",
      logo: "☁️",
      color: "text-blue-400",
      link: "https://www.cloudskillsboost.google/public_profiles/83c832c1-c093-43e8-9529-9f4fdfbe2406/badges/14983733"
    },
    {
      title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG Skill Badge",
      provider: "Google Cloud Skills Boost",
      logo: "🚀",
      color: "text-blue-400",
      link: "https://www.cloudskillsboost.google/public_profiles/83c832c1-c093-43e8-9529-9f4fdfbe2406/badges/14986565"
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-secondary/20 relative overflow-hidden">
      {/* Professional Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"
        style={{
          backgroundImage: `url(${professionalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.06
        }}
      ></div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-secondary/40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 slide-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">Certifications & Achievements</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and skill badges from leading technology companies
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={cert.title} className={`tech-card group slide-in-up stagger-${index + 1}`}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl p-3 rounded-lg ${cert.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      {renderProviderLogo(cert.provider, cert.logo)}
                    </div>
                    <div className="flex-1">
                      <Badge className={`${cert.bgColor} ${cert.color} border-current/20 mb-2`}>
                        {cert.type}
                      </Badge>
                      <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                    </div>
                  </div>

                  {/* Provider & Year */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {cert.provider}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{cert.year}</span>
                    </div>
                  </div>

                  {/* View Certificate Button */}
                  <div className="pt-2 border-t border-border/50">
                    <button
                      onClick={() => {
                        const anyCert: any = cert as any;
                        const url = typeof anyCert.link === 'string' ? anyCert.link : '';
                        if (url) {
                          setPreview({ url, title: cert.title });
                        }
                      }}
                      className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Certificate
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Skill Badges & Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.title}
                className={`tech-card group slide-in-up stagger-${index + 1} ${
                  (achievement as any).link ? 'cursor-pointer' : ''
                }`}
                onClick={() => {
                  const anyAch: any = achievement as any;
                  const url = anyAch.link as string | undefined;
                  if (!url || typeof url !== 'string') return;
                  setPreview({ url, title: achievement.title });
                }}
                role={(achievement as any).link ? 'link' : undefined}
                aria-label={(achievement as any).link ? `Open ${achievement.title}` : undefined}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {renderProviderLogo(achievement.provider, achievement.logo)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h4>
                    <p className={`text-xs ${achievement.color} font-medium`} title={(achievement as any).description || undefined}>
                      {achievement.provider}
                      {(achievement as any).date ? (
                        <span className="text-muted-foreground"> · {(achievement as any).date}</span>
                      ) : null}
                    </p>
                  </div>
                  <Award className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 slide-in-up stagger-3">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">{certifications.length}</div>
              <p className="text-muted-foreground">Professional Certifications</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">{achievements.length}</div>
              <p className="text-muted-foreground">Skill Badges</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">4</div>
              <p className="text-muted-foreground">Technology Areas</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{preview?.title || 'Certificate'}</DialogTitle>
          </DialogHeader>
          {preview?.url && (
            <div className="w-full h-[70vh]">
              {/^(https?:\/\/)/i.test(preview.url) ? (
                <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-center">
                  <p className="text-sm text-muted-foreground">This source can’t be embedded. Open it in a new tab.</p>
                  <button
                    onClick={() => window.open(preview.url, '_blank')}
                    className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
                  >
                    Open Link
                  </button>
                </div>
              ) : /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(preview.url) ? (
                <img src={preview.url} alt={preview.title} className="w-full h-full object-contain" />
              ) : (
                <iframe src={preview.url} className="w-full h-full rounded-md" />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certifications;