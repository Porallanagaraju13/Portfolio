import React, { useRef, useState, MouseEvent } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number; // max rotation degrees, default 12
  scale?: number; // scale on hover, default 1.02
}

export default function Tilt3D({ children, className = "", maxRotate = 10, scale = 1.03 }: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation angles based on offset from center
    // rotateX: vertical tilt (mouse up tilts it up, mouse down tilts it down)
    // rotateY: horizontal tilt (mouse left tilts it left, mouse right tilts it right)
    const rotateY = ((x - xc) / xc) * maxRotate;
    const rotateX = -((y - yc) / yc) * maxRotate;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      }}
      className={`will-change-transform ${className}`}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
