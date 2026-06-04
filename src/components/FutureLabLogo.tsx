import React from 'react';

interface FutureLabLogoProps {
  className?: string;
}

export function FutureLabLogo({ className = "w-10 h-10" }: FutureLabLogoProps) {
  return (
    <div className={`${className} flex items-center justify-center select-none`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]"
      >
        <defs>
          <linearGradient id="gradientLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#bd00ff" />
          </linearGradient>
          <linearGradient id="gradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bd00ff" />
            <stop offset="100%" stopColor="#ff2a5f" />
          </linearGradient>
          <linearGradient id="gradientCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#bd00ff" />
          </linearGradient>
          <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient background glow behind the logo */}
        <circle cx="50" cy="50" r="28" fill="url(#gradientCore)" opacity="0.12" filter="url(#vectorGlow)" />

        {/* Outer Orbit Atomic Ring 1 (Rotating clock-wise) */}
        <ellipse 
          cx="50" 
          cy="50" 
          rx="44" 
          ry="14" 
          stroke="url(#gradientLiquid)" 
          strokeWidth="1.5" 
          strokeDasharray="6 3" 
          transform="rotate(-30 50 50)" 
          className="animate-spin-slow"
        />

        {/* Outer Orbit Atomic Ring 2 (Rotating counter-clock-wise) */}
        <ellipse 
          cx="50" 
          cy="50" 
          rx="44" 
          ry="14" 
          stroke="url(#gradientRing)" 
          strokeWidth="1.5" 
          transform="rotate(40 50 50)" 
          opacity="0.8"
          className="animate-spin-slow-reverse"
        />

        {/* Dynamic Nodes on Orbits */}
        <circle cx="50" cy="6" r="2.5" fill="#00f0ff" className="animate-pulse" />
        <circle cx="82" cy="74" r="2" fill="#ff2a5f" />
        <circle cx="18" cy="74" r="2" fill="#bd00ff" />

        {/* The Lab Beaker + Rocket Vessel Shield */}
        <path 
          d="M 33 67 
             C 31 61, 33 50, 42 44 
             L 42 27 
             C 42 24, 44 21, 48 21 
             L 52 21 
             C 56 21, 58 24, 58 27 
             L 58 44 
             C 67 50, 69 61, 67 67 
             C 65 73, 58 74, 50 74 
             C 42 74, 35 73, 33 67 Z" 
          stroke="url(#gradientCore)" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
          fill="#030612" 
          fillOpacity="0.95" 
        />

        {/* Glowing Fusion liquid / core arrow booster inside flask */}
        <path 
          d="M 50 30 
             L 54 41 
             L 61 46 
             L 50 66 
             L 39 46 
             L 46 41 Z" 
          fill="url(#gradientCore)" 
          opacity="0.9"
          filter="url(#vectorGlow)"
        />

        {/* Bright internal reflect line-art */}
        <path 
          d="M 50 35 
             L 51 43 
             L 56 46 
             L 50 58 
             L 44 46 
             L 49 43 Z" 
          fill="#ffffff" 
          opacity="0.95"
        />

        {/* Mini Bubble stars float up inside */}
        <circle cx="47" cy="51" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="53" cy="56" r="1.2" fill="#00f0ff" opacity="0.6" />
        <circle cx="49" cy="61" r="1" fill="#bd00ff" opacity="0.7" />
      </svg>
    </div>
  );
}
