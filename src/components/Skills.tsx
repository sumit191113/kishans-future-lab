import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_ITEMS } from '../data';
import { LucideIcon } from './LucideIcon';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Design' | 'AI & Tools'>('All');

  const filteredSkills = SKILL_ITEMS.filter(
    (skill) => activeCategory === 'All' || skill.category === activeCategory
  );

  const categories: ('All' | 'Frontend' | 'Backend' | 'Design' | 'AI & Tools')[] = [
    'All',
    'Frontend',
    'Backend',
    'Design',
    'AI & Tools'
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-radial from-gray-950 via-black to-gray-950">
      {/* Decorative Blur and Grid */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Skill Matrix & Tab Filters */}
          <motion.div 
            className="lg:col-span-7 space-y-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin-slow" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">SKILL HUB telemetry</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Skill Development <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                  & Capabilities Hub
                </span>
              </h2>
              <p className="text-gray-400 max-w-xl">
                Weaving clean declarative components with microservices and deep prompt architectures. Hover and filter to parse individual stack details.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit backdrop-blur-md">
              {categories.map((cat) => (
                <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                     activeCategory === cat
                       ? 'bg-white text-black shadow-lg scale-[1.02]'
                       : 'text-gray-400 hover:text-white hover:bg-white/10'
                   }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill Meters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative min-h-[280px]">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    layout
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-gray-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/20 transition-colors">
                          <LucideIcon name={skill.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-white font-bold text-sm tracking-wide">{skill.name}</span>
                      </div>
                      <span className="font-mono text-xs text-brand-cyan font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-1.5 w-full bg-black/45 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: High Quality Futuristic Illustration Layer (Right Aligned) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-2.5 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-y-1/2 -left-12 w-48 h-48 bg-brand-cyan/20 rounded-full blur-[60px] pointer-events-none -translate-y-1/2" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5">
                <img 
                  id="skills-cinematic-img"
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                  alt="Futuristic glowing cybersecurity hardware"
                  className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual HUD overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70" />
                
                <div className="absolute top-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-3 shadow-xl">
                  <div className="h-8 w-8 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                    <LucideIcon name="Shield" className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="font-mono text-[10px]">
                    <p className="text-white font-bold">SYSTEM INTEGRITY SECURE</p>
                    <p className="text-gray-400 mt-0.5">MATRIX: ACTIVE (8/8 SLOTS)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
