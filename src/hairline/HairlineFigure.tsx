/**
 * HairlineFigure: A React wrapper for Hairline isometric line figures
 * Self-contained - no external kernel dependency needed
 */
import { useEffect, useRef } from 'react';

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

    try {
      const instance = mountFn({ stage, svg, read }, 3);

      return () => {
        if (instance?.destroy) {
          instance.destroy();
        }
        container.innerHTML = '';
      };
    } catch (err) {
      console.error('Figure mount error:', err);
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
