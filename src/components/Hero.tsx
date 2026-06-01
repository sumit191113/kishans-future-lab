import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface HeroProps {
  onExploreClick: () => void;
  streakCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, streakCount }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-radial from-gray-900/50 via-gray-950/95 to-black">
      {/* Cinematic Glowing Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
      
      {/* Decorative Orbs resembling Tesla/Apple presentation */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none animate-glow-1" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none animate-glow-2" />
      
      <div className="container mx-auto px-6 sm:px-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div 
            className="lg:col-span-7 space-y-8 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Super Header Tagline */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan"></span>
              </span>
              <span className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                SYSTEMS OK • <span className="text-brand-cyan font-bold">{streakCount} DAY STREAK</span>
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Engineering The <br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-rose bg-clip-text text-transparent">
                Next-Gen Self
              </span>
            </h2>

            {/* Lucid Subtitle */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl font-normal leading-relaxed">
              Explore an immersive full-stack portfolio paired with a cinematic learning terminal. Learn language, master prompt mechanics, ship products, and track routine transformation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="group relative px-8 py-4 rounded-xl bg-white text-black font-semibold tracking-wide overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Enter Learning Terminal
                  <LucideIcon name="ChevronRight" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <a 
                id="hero-contact-anchor"
                href="#contact"
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/10 font-semibold tracking-wide backdrop-blur-md transition-all duration-300 shadow-xl"
              >
                Get In Touch
              </a>
            </div>

            {/* Telemetry Minimalist Line Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 font-mono text-xs text-gray-500">
              <div>
                <p className="text-brand-cyan font-bold text-lg">98%</p>
                <p className="tracking-wider uppercase">ROUTINE RATE</p>
              </div>
              <div>
                <p className="text-brand-purple font-bold text-lg">120K+</p>
                <p className="tracking-wider uppercase">LINES AUTHORED</p>
              </div>
              <div>
                <p className="text-brand-rose font-bold text-lg">04</p>
                <p className="tracking-wider uppercase">CORE PATHWAYS</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Glowing Illustration Layer (Right Aligned image) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Ambient Backlighting */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120%] bg-brand-cyan/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            
            {/* Futuristic Metallic Bezel Card wrapper representing modern glass physics */}
            <div className="relative p-2.5 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 opacity-0 group-hover:opacity-40 transition-opacity duration-1000 -z-10" />
              
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                <img 
                  id="hero-cinematic-img"
                  src="/src/assets/images/cyber_workspace_1780038093478.png"
                  alt="Futuristic Holographic Workspace"
                  className="w-full h-full object-cover select-none scale-[1.01] transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* HUD Grid Overlay resembling modern Tesla indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-65" />
                
                {/* Floating Studio Box */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between font-mono text-[10px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-cyan"></span>
                    </span>
                    <span>Digital Creator Profile</span>
                  </div>
                  <span className="text-brand-purple text-right">Workspace Env</span>
                </div>
              </div>
            </div>

            {/* Glowing Orbital rings decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-brand-cyan/30 rounded-full scale-75 animate-pulse blur-[1px] pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-brand-purple/20 rounded-full scale-100 animate-pulse pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
