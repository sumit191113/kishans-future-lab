import React from 'react';
import { motion } from 'motion/react';
import { TIMELINE_EVENTS } from '../data';
import { LucideIcon } from './LucideIcon';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-gray-950">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Cinematic Illustration (Left Aligned on alternate grid) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-2 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 via-transparent to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <img 
                  id="journey-cinematic-img"
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
                  alt="Futuristic cyber galaxy networks illustration"
                  className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80" />
                
                {/* Futuristic overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                      <LucideIcon name="Compass" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Roadmap Trajectory</p>
                      <p className="text-gray-400 font-mono text-[10px]">Milestones Overview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Time Timeline Node Stream (Right Aligned content) */}
          <motion.div 
            className="lg:col-span-7 space-y-12"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Title / Badging */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
                <LucideIcon name="Calendar" className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Professional Milestones</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Strategic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-rose to-brand-gold">
                  Roadmap (2026-2030)
                </span>
              </h2>
            </div>

            {/* Vertical timeline line-node logic with glass bubbles and micro-shadows */}
            <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12 py-2">
              
              {TIMELINE_EVENTS.map((evt, idx) => (
                <motion.div 
                  key={evt.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Glowing timeline joint indicator */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-black border border-white/10 group-hover:border-brand-purple transition-colors duration-300">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gray-700 group-hover:bg-brand-purple transition-all duration-300 scale-100 group-hover:scale-125" />
                  </span>

                  {/* Glassmorphism Timeline Terminal Box */}
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="font-mono text-xs text-brand-purple font-bold tracking-wider uppercase block sm:inline-block sm:mr-3 px-2 py-0.5 rounded bg-brand-purple/15 border border-brand-purple/20">
                          {evt.year}
                        </span>
                        <h4 className="text-white font-extrabold text-base sm:text-lg tracking-wide inline-block mt-1 sm:mt-0">
                          {evt.title}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                        {evt.company}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {evt.description}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
