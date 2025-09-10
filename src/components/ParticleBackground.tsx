import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 6,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      {/* Glowing Orbs */}
      <div className="glow-orb w-32 h-32 top-1/4 left-1/4 opacity-30" />
      <div className="glow-orb w-20 h-20 top-3/4 right-1/4 opacity-20" style={{ animationDelay: '2s' }} />
      <div className="glow-orb w-24 h-24 bottom-1/4 left-1/3 opacity-25" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default ParticleBackground;