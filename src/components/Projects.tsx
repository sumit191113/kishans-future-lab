import React from 'react';
import { motion } from 'motion/react';
import { ProjectEntry } from '../types';
import { LucideIcon } from './LucideIcon';

interface ProjectsProps {
  projects: ProjectEntry[];
  onToggleProject: (projectId: string) => void;
  onAddLog: (action: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onToggleProject, onAddLog }) => {
  // Statistics summary
  const completedCount = projects.filter(p => p.completed).length;
  const projectProgressRatio = Math.round((completedCount / projects.length) * 100);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-gray-950">
      {/* Decorative glows */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Cover illustration (Left Aligned) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-2.5 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-y-1/2 -left-12 w-48 h-48 bg-brand-cyan/20 rounded-full blur-[60px] pointer-events-none -translate-y-1/2" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5">
                <img 
                  id="projects-cinematic-img"
                  src="/src/assets/images/futuristic_startup_1780038173350.png"
                  alt="Futuristic startup blueprint lab"
                  className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 group-hover:scale-105 select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* HUD details overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-75" />
                
                {/* completion hud details */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/15 bg-[#030712]/60 backdrop-blur-xl shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gray-400">BUILD COMPLETED RATING</span>
                      <span className="text-brand-cyan font-bold">{projectProgressRatio}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-950">
                      <div className="h-full bg-brand-cyan rounded-full transition-all duration-500" style={{ width: `${projectProgressRatio}%` }} />
                    </div>
                    <div className="flex justify-between font-mono text-[9px] text-gray-400 pt-1 border-t border-white/10">
                      <span>SYNC STATUS: OK</span>
                      <span>{completedCount}/{projects.length} APPLICATIONS DEPLOYED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative header and projects toggles grid (Right Aligned content) */}
          <motion.div 
            className="lg:col-span-7 space-y-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Badging info */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                <LucideIcon name="Cpu" className="w-4 h-4 animate-slow-spin" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">SHIPMENTS STATUS</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Premium Projects & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-gold">
                  Product Shipments
                </span>
              </h2>
              <p className="text-gray-400">
                These conceptual architectures are bi-directionally locked to Card 3 (Build Projects) in your Learning Terminal. Toggle the build status to instantly update learning statistics!
              </p>
            </div>

            {/* Interactive Grid Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj, index) => (
                <div
                  key={proj.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[190px] shadow-xl backdrop-blur-md ${
                    proj.completed
                      ? 'bg-brand-cyan/5 border-brand-cyan/30 hover:bg-brand-cyan/10 hover:border-brand-cyan/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Top Header Card row */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[9px] text-gray-500 tracking-wider">
                        {proj.category.toUpperCase()}
                      </span>
                      
                      {/* Checkboxes indicator */}
                      <button
                        onClick={() => {
                          onToggleProject(proj.id);
                          onAddLog(`System changed deployment state for: ${proj.title}`);
                        }}
                        className={`p-1 rounded transition-colors ${
                          proj.completed
                            ? 'text-brand-cyan bg-brand-cyan/10'
                            : 'text-gray-600 bg-gray-950 border border-gray-800 hover:text-white hover:border-gray-600'
                        }`}
                        title="Toggle Build Status"
                      >
                        <LucideIcon name={proj.completed ? 'CheckSquare' : 'Square'} size={15} />
                      </button>
                    </div>

                    <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-brand-cyan transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-[12px] text-gray-400 leading-relaxed font-light line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  {/* Footer Tagline metadata */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-900/60 mt-4 font-mono text-[10px]">
                    <span className="text-gray-400 font-bold">{proj.tag}</span>
                    <span className={`font-semibold ${proj.completed ? 'text-brand-cyan' : 'text-gray-500'}`}>
                      {proj.completed ? 'SHIPPED ✓' : 'IN PROGRESS •'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
