import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface MotivationProps {
  logs: string[];
  streakCount: number;
  onBoostStreak: () => void;
}

export const Motivation: React.FC<MotivationProps> = ({ logs, streakCount, onBoostStreak }) => {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const inspirationalQuotes = [
    {
      txt: "The only way to do great work is to love what you do. Stay curious, stay foolish.",
      author: "Steve Jobs • Apple"
    },
    {
      txt: "When something is important enough, you do it even if the odds are not in your favor.",
      author: "Elon Musk • Tesla & SpaceX"
    },
    {
      txt: "Continuous learning is the minimum requirement for success in any field.",
      author: "Brian Tracy • Cognitive Coach"
    },
    {
      txt: "If you don't build your dream, someone else will hire you to help them build theirs.",
      author: "Dhirubhai Ambani • Builder"
    },
    {
      txt: "The best way to predict the future is to invent it. Complete your daily routine nodes.",
      author: "Alan Kay • Digital Visionary"
    }
  ];

  const handleNextQuote = () => {
    setActiveQuoteIdx((prev) => (prev + 1) % inspirationalQuotes.length);
  };

  return (
    <section id="motivation" className="py-24 relative overflow-hidden bg-gray-950">
      {/* Absolute ambient lights */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Success Illustration (Left Aligned) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-2.5 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-brand-rose/20 opacity-0 group-hover:opacity-60 transition-opacity duration-1000 -z-15" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-black">
                <img 
                  id="motivation-cinematic-img"
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop"
                  alt="Futuristic glowing startup business workspace"
                  className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 group-hover:scale-105 select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual HUD grid details */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-75" />
                
                {/* Real-time streak milestone panel */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/10 bg-[#030712]/60 backdrop-blur-xl text-left shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-violet-600/15 border border-violet-600/30 flex items-center justify-center text-violet-400">
                      <LucideIcon name="Flame" className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-white font-extrabold text-xs">Streak Compound Boosted</p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">CURRENT COEFICIENT: {(streakCount * 1.5).toFixed(1)}X MULTIPLIER</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Console terminal simulator logs & Quote spark (Right Aligned content) */}
          <motion.div 
            className="lg:col-span-7 space-y-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Header info */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                <LucideIcon name="Compass" className="w-4 h-4 animate-spin-slow" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">MOMENTUM CONSOLE</span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Daily Cognitive Spark <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-rose">
                  & Diagnostic Feed
                </span>
              </h2>
            </div>

            {/* Mindset interactive quote trigger block */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden group shadow-xl">
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-brand-cyan/5 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="space-y-6 text-left relative z-10">
                <LucideIcon name="Sparkles" className="w-8 h-8 text-brand-cyan opacity-80" />
                
                <blockquote className="text-white font-medium text-base sm:text-lg leading-relaxed relative">
                  "{inspirationalQuotes[activeQuoteIdx].txt}"
                </blockquote>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                    {inspirationalQuotes[activeQuoteIdx].author}
                  </div>

                  <button
                    onClick={handleNextQuote}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan/10 hover:bg-brand-cyan/25 border border-brand-cyan/35 text-brand-cyan font-bold text-xs tracking-wide transition-all active:scale-95 cursor-pointer w-fit"
                  >
                    <LucideIcon name="Sparkles" size={14} className="animate-spin-slow" />
                    Load Next Mindset Spark
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Live System Diagnostic Log Stream */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-mono text-[11px] overflow-hidden shadow-xl">
              {/* Header bar of logger */}
              <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan" />
                  <span className="text-gray-400 font-bold tracking-wider text-[10px]">DIAGNOSTIC_REPORT.LOG</span>
                </div>
                <span className="text-[9px] text-gray-600 font-bold uppercase">LIVE FEED SYNCHRONIZED</span>
              </div>

              {/* Feed stream text wrapper */}
              <div className="p-5 h-48 overflow-y-auto space-y-2 text-left flex flex-col justify-end">
                {logs.length === 0 ? (
                  <p className="text-gray-600 italic">No activity registered. Complete challenges in Learning Terminal to propagate log feeds...</p>
                ) : (
                  logs.slice(-6).map((log, lIdx) => (
                    <motion.div
                      key={lIdx + log}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2 text-gray-300"
                    >
                      <span className="text-brand-purple">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-gray-400 font-light">{log}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
