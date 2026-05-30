import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';

export const Vision: React.FC = () => {
  const visionPillars = [
    {
      title: 'AI Integration & Modern Systems',
      desc: 'Building robust full-stack applications integrated with reliable, state-of-the-art AI-assist pipelines.',
      icon: 'BrainCircuit',
      color: 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20'
    },
    {
      title: 'Consistent Compounding',
      desc: 'Harnessing consistent daily momentum. Tiny continuous gains compound over time into massive developmental growth.',
      icon: 'Target',
      color: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20'
    },
    {
      title: 'Human-Centric Interfaces',
      desc: 'Designing clean, highly responsive layouts emphasizing intuitive hierarchy, negative space, and typographic beauty.',
      icon: 'Eye',
      color: 'text-brand-rose bg-brand-rose/10 border-brand-rose/20'
    }
  ];

  return (
    <section id="vision" className="py-24 relative overflow-hidden bg-radial from-gray-950 via-black to-gray-950">
      {/* Absolute backlighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-rose/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative Vision content (Left Aligned) */}
          <motion.div 
            className="lg:col-span-7 space-y-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Slogan */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-rose/10 border border-brand-rose/20 text-brand-rose">
                <LucideIcon name="Target" className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Visionary Strategy</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Accelerating Human <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose via-brand-purple to-brand-cyan">
                  Creative Potential
                </span>
              </h2>
              <p className="text-gray-400 max-w-xl text-base leading-relaxed">
                Technology should not just automate routine tasks; it must amplify human curiosity and design expertise. This roadmap aligns robust software engineering with consistent daily goals to foster high-integrity, life-long growth.
              </p>
            </div>

            {/* Pillars list */}
            <div className="space-y-6">
              {visionPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
                >
                  <div className={`p-3 rounded-xl border h-fit ${pillar.color}`}>
                    <LucideIcon name={pillar.icon} className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-white font-extrabold text-base tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Premium High Quality Cinematic Image (Right Aligned) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-2.5 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-y-1/2 -right-12 w-48 h-48 bg-brand-rose/20 rounded-full blur-[60px] pointer-events-none -translate-y-1/2" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5">
                <img 
                  id="vision-cinematic-img"
                  src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2000&auto=format&fit=crop"
                  alt="Futuristic cyber networks glass"
                  className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 group-hover:scale-105 select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual HUD detail overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70" />
                
                {/* Floating indicator */}
                <div className="absolute top-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-gray-950/70 backdrop-blur-md flex items-center justify-between font-mono text-[9px] text-gray-400">
                  <span className="flex items-center gap-1.5 uppercase font-bold text-brand-rose">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-rose" />
                    Growth Momentum
                  </span>
                  <span>FACTOR: +37.7X/YR</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
