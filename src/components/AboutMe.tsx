import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface AboutMeProps {
  streakCount: number;
}

export const AboutMe: React.FC<AboutMeProps> = ({ streakCount }) => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gray-950">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Dynamic Alternating Layout (Image Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Next-Level Image (Left Aligned) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-2 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <img 
                  id="about-cinematic-img"
                  src="https://images.unsplash.com/photo-1534972195531-d756b9bda9f2?q=80&w=2000&auto=format&fit=crop"
                  alt="Futuristic Dev Cybernetic Silhouette"
                  className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm">Kishan Maurya</p>
                      <p className="text-gray-400 font-mono text-[10px]">Creative Developer</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
                      <LucideIcon name="CheckCircle2" className="w-3.5 h-3.5 text-brand-cyan" />
                      <span className="font-mono text-[9px] text-brand-cyan font-bold uppercase tracking-wider">Verified Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Content (Right Aligned) */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
              <LucideIcon name="User" className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">CORE IDENTITY</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A Creator Driven by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-rose">
                Code, Language & AI.
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              I am a forward-looking digital architect designing premium application ecosystems. By day, I solve complex software problems, craft modular frontend logic, and ship full-stack web applications. By night, I run active cognitive routines—learning language, reading philosophy, and training AI pipelines.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="p-2.5 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple w-fit">
                  <LucideIcon name="GraduationCap" className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold mt-4 mb-2">Continuous Learning</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Combining advanced engineering architectures with bilingual skill-building for fluid dynamic expression.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="p-2.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan w-fit">
                  <LucideIcon name="Flame" className="w-5 h-5 animate-bounce" />
                </div>
                <h3 className="text-white font-bold mt-4 mb-2">Momentum Engine</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Fueling a continuous streak of daily iterations. Momentum converts basic habits into major life accomplishments.
                </p>
              </div>
            </div>

            {/* Streak Milestone HUD Info */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-4 shadow-xl">
              <div className="h-12 w-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                <LucideIcon name="Trophy" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Routine Streak Sync Active</p>
                <p className="text-xs text-gray-500 mt-0.5">Your streak status is verified as <span className="text-brand-gold font-bold">{streakCount} days active</span>. Proceed with daily checklists below to progress.</p>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};
