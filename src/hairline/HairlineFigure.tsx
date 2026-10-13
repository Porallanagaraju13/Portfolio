/**
 * HairlineFigure: A React wrapper for Hairline isometric line figures
 * Provides accessibility, reduced-motion support, and theme integration
 */
import { useEffect, useRef, useState } from 'react';

interface HairlineFigureProps {
  figureId: string;
  mountFn: any;
  className?: string;
  ariaLabel: string;
  darkMode: boolean;
}

export default function HairlineFigure({
  figureId,
  mountFn,
  className = '',
  ariaLabel,
  darkMode,
}: HairlineFigureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !mountFn) return;

    const container = containerRef.current;
    const stage = container;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 320');
    svg.setAttribute('class', 'hairline-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', ariaLabel);
    
    const read = document.createElement('span');
    read.className = 'sr-only';
    read.setAttribute('role', 'status');
    read.setAttribute('aria-live', 'polite');
    
    container.appendChild(svg);
    container.appendChild(read);

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && (window as any).HL?.setReducedMotion) {
      (window as any).HL.setReducedMotion(true);
    }

    try {
      const instance = mountFn({ stage, svg, read }, 3);
      setMounted(true);

      return () => {
        if (instance?.destroy) {
          instance.destroy();
        }
        container.innerHTML = '';
      };
    } catch (err) {
      console.error('Hairline mount error:', err);
    }
  }, [figureId, mountFn, ariaLabel]);

  return (
    <div
      ref={containerRef}
      className={`hairline-container ${className} ${darkMode ? 'dark' : 'light'}`}
      data-figure={figureId}
      style={{
        width: '100%',
        aspectRatio: '400 / 320',
        position: 'relative',
      }}
    />
  );
}
