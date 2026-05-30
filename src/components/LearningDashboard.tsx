import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LearningCard, LearningTask } from '../types';
import { LucideIcon } from './LucideIcon';

interface LearningDashboardProps {
  cards: LearningCard[];
  onToggleTask: (cardId: string, taskId: string) => void;
  onToggleWeekTask?: (cardId: string, taskId: string) => void;
  streakCount: number;
  onBoostStreak: () => void;
  onAddLog: (action: string) => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  cards,
  onToggleTask,
  onToggleWeekTask,
  streakCount,
  onBoostStreak,
  onAddLog
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const selectedCard = cards.find(c => c.id === selectedCardId);

  // Helper to calculate card completion percentage
  const getCardProgress = (card: LearningCard) => {
    if (!card.tasks || card.tasks.length === 0) return 0;
    const completed = card.tasks.filter(t => t.completed).length;
    return Math.round((completed / card.tasks.length) * 100);
  };

  const getWeeklyProgress = (card: LearningCard) => {
    if (!card.currentWeekChallenge || card.currentWeekChallenge.length === 0) return 0;
    const completed = card.currentWeekChallenge.filter(t => t.completed).length;
    return Math.round((completed / card.currentWeekChallenge.length) * 100);
  };

  const streakMilestones = [
    { target: 1, label: 'Day 1 Launch', desc: 'Step inside the digital workspace.' },
    { target: 7, label: 'Day 7 Hyper-Focus', desc: 'One week of unbroken daily momentum.' },
    { target: 30, label: 'Day 30 Architect', desc: 'Synthesize standard routine into skill.' },
    { target: 100, label: 'Day 100 Unstoppable', desc: 'Achieve legendary continuous iterations.' },
    { target: 365, label: 'Day 365 Cosmic Master', desc: 'Exponential expansion of potential.' }
  ];

  return (
    <section id="terminal" className="py-24 relative overflow-hidden bg-radial from-gray-950 via-black to-gray-950">
      {/* Visual background grids */}
      <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Sections Header with illustration left/right rules */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 pb-8 border-b border-gray-900">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
              <LucideIcon name="Rocket" className="w-4 h-4 animate-bounce" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">COGNITIVE HUB</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Ultimate Learning <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-rose">
                Terminal & Routine
              </span>
            </h2>
            <p className="text-gray-400">
              Interactive glassmorphic controllers tracing six personal learning dimensions. Tick missions to dynamically recalculate statistics, increment pathways, and unlock locked milestones.
            </p>
          </div>

          {/* Mini-dashboard telemetry state widget with frosted glass design */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-6 min-w-full sm:min-w-[320px] justify-between shadow-xl">
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase">ACTIVE STREAK COUNTER</p>
              <div className="flex items-center gap-2 mt-1">
                <LucideIcon name="Flame" className="w-6 h-6 text-brand-gold animate-pulse" />
                <p className="font-display font-extrabold text-2xl text-white">{streakCount} <span className="text-sm font-medium text-gray-400">Days</span></p>
              </div>
            </div>
            
            <button
              onClick={() => {
                onBoostStreak();
                onAddLog("Booster ignition requested: Streak incremented by 1.");
              }}
              className="flex items-center gap-1.5 px-4 h-11 rounded-xl bg-orange-500/10 hover:bg-orange-500/25 border border-white/10 font-semibold text-xs text-orange-400 transition-all active:scale-95 shadow-xl hover:shadow-orange-500/10 cursor-pointer"
            >
              <LucideIcon name="Zap" className="w-4 h-4 text-orange-400" />
              Boost Streak
            </button>
          </div>
        </div>

        {/* 6 Premium Glassmorphism Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const progress = getCardProgress(card);
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Floating Top Glow Spot */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Cover High-Quality Futuristic cinematic illustration */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass Card Shadowing overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/10 to-transparent" />
                  
                  {/* Interactive Floating Floating Indicator Icon */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg text-white group-hover:text-brand-cyan group-hover:border-brand-cyan/30 transition-all duration-300">
                    <LucideIcon name={card.iconName} className="w-5 h-5" />
                  </div>

                  {/* Realtime percentage pill */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#030712]/60 border border-white/10 backdrop-blur-sm text-[10px] font-mono font-bold text-gray-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${progress === 100 ? 'bg-green-400' : 'bg-brand-cyan'} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${progress === 100 ? 'bg-green-400' : 'bg-brand-cyan'}`}></span>
                    </span>
                    {progress}% COMPLETION
                  </div>
                </div>

                {/* Card Content Information */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-cyan transition-colors tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-light line-clamp-2">
                      {card.tagline}
                    </p>
                  </div>

                  {/* Modular Checklist Sneak-peek (First 2 Tasks previewed) */}
                  <div className="p-4 rounded-2xl bg-black/25 border border-white/5 backdrop-blur-sm font-mono text-[11px] space-y-3">
                    <p className="text-gray-500 uppercase tracking-widest text-[9px] mb-2 font-bold">MISS VALUATION OVERVIEW</p>
                    {card.tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center gap-2 text-gray-400">
                        <div className={`p-0.5 rounded transition-all ${task.completed ? 'text-brand-cyan bg-brand-cyan/10' : 'text-gray-600'}`}>
                          <LucideIcon name={task.completed ? 'Check' : 'Square'} size={12} />
                        </div>
                        <span className={`truncate ${task.completed ? 'line-through text-gray-500 opacity-80' : ''}`}>{task.text}</span>
                      </div>
                    ))}
                    {card.tasks.length > 3 && (
                      <p className="text-gray-500 text-[9px] italic pl-5">+{card.tasks.length - 3} more activities available</p>
                    )}
                  </div>

                  {/* Horizontal visual progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[10px] text-gray-500">
                      <span>DAILY BAR</span>
                      <span className="text-white font-bold">{card.tasks.filter(t => t.completed).length}/{card.tasks.length} DONE</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/45 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-rose rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Expansion CTA Trigger Button */}
                  <button
                    onClick={() => {
                      setSelectedCardId(card.id);
                      onAddLog(`Opened learning panel for: ${card.title}`);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black group-hover:border-white text-gray-300 font-semibold tracking-wide text-xs transition-all duration-300"
                  >
                    Open Mission Terminal
                    <LucideIcon name="ArrowUpRight" className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Expanded Learning Panel overlay (Drawer Modal) */}
        <AnimatePresence>
          {selectedCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-end">
              
              {/* Backing Backdrop Blur click-dismissal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#030712]/90 backdrop-blur-md"
                onClick={() => setSelectedCardId(null)}
              />

              {/* Main side panel representing extreme tech presentation */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="relative w-full max-w-2xl h-screen bg-[#030712]/85 border-l border-white/10 z-50 overflow-y-auto shadow-2xl flex flex-col justify-between backdrop-blur-3xl"
              >
                
                {/* Panel Top Heading / Cover Illustration Banner */}
                <div>
                  <div className="relative h-64 border-b border-white/10 overflow-hidden">
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-black/60" />
                    
                    {/* Floating Exit Button */}
                    <button
                      onClick={() => setSelectedCardId(null)}
                      className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white hover:text-brand-rose hover:bg-brand-rose/10 transition-colors"
                    >
                      <LucideIcon name="Zap" className="w-5 h-5 rotate-45" /> {/* Close decoration represented as rotate */}
                    </button>

                    <div className="absolute bottom-6 left-8 right-8">
                      <div className="flex items-center gap-2 text-brand-cyan font-mono text-[10px] uppercase font-bold tracking-widest bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-1 rounded w-fit mb-3">
                        <LucideIcon name={selectedCard.iconName} className="w-3.5 h-3.5" />
                        {selectedCard.title} Space Sync
                      </div>
                      <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                        {selectedCard.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body interactive workspace */}
                  <div className="p-8 space-y-8">
                    
                    {/* Slogan Description */}
                    <div className="space-y-2">
                      <p className="text-gray-300 font-medium text-base">
                        {selectedCard.tagline}
                      </p>
                      <p className="text-xs text-gray-500 font-mono">
                        UID // MATRIX_SPACE_{selectedCard.id.toUpperCase().replace(/-/g, '_')}
                      </p>
                    </div>

                    {/* Progress dials */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md align-middle shadow-lg">
                      <div>
                        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Today's Mission Rate</p>
                        <p className="font-display font-bold text-3xl text-white mt-1">
                          {getCardProgress(selectedCard)}%
                        </p>
                        <div className="h-1 w-full bg-gray-900 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-brand-cyan rounded-full" style={{ width: `${getCardProgress(selectedCard)}%` }} />
                        </div>
                      </div>

                      {/* Alternate week / level progression representation */}
                      {selectedCard.id === 'learn-english' ? (
                        <div>
                          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Weekly Challenge Rate</p>
                          <p className="font-display font-bold text-3xl text-brand-purple mt-1">
                            {getWeeklyProgress(selectedCard)}%
                          </p>
                          <div className="h-1 w-full bg-gray-900 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-brand-purple rounded-full" style={{ width: `${getWeeklyProgress(selectedCard)}%` }} />
                          </div>
                        </div>
                      ) : selectedCard.pathway ? (
                        <div>
                          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Pathway Nodes unlocked</p>
                          <p className="font-display font-bold text-3xl text-brand-purple mt-1">
                            {Math.round((selectedCard.tasks.filter(t => t.completed).length / selectedCard.tasks.length) * selectedCard.pathway.length)}/{selectedCard.pathway.length}
                          </p>
                          <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">GRID SYNC DETECTED</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Focus Consistency Ratio</p>
                          <p className="font-display font-bold text-3xl text-brand-gold mt-1">
                            {(streakCount * 1.5).toFixed(0)}x
                          </p>
                          <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">MULTIPLIER APPLIED</p>
                        </div>
                      )}
                    </div>

                    {/* Today's Checklist Space */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-display font-bold text-lg text-white">
                          {selectedCard.id === 'stay-consistent' ? 'Success Formula Routine' : "Today's Active Mission"}
                        </p>
                        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">TICK TO SYNC REPORT</span>
                      </div>

                      <div className="space-y-3">
                        {selectedCard.tasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => {
                              onToggleTask(selectedCard.id, task.id);
                              onAddLog(`Toggled activity state for item: ${task.text}`);
                            }}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                              task.completed
                                ? 'bg-brand-cyan/5 border-brand-cyan/20 hover:border-brand-cyan/35'
                                : 'bg-gray-900/10 border-gray-900 hover:border-gray-800'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div className={`p-1 rounded-lg border-2 transition-all duration-300 ${
                                task.completed
                                  ? 'bg-brand-cyan border-brand-cyan text-black'
                                  : 'border-gray-800 text-transparent hover:border-gray-600'
                              }`}>
                                <LucideIcon name="Check" className="w-3.5 h-3.5 font-bold" />
                              </div>
                              <span className={`text-sm ${task.completed ? 'line-through text-gray-500 font-light' : 'text-gray-200'}`}>
                                {task.text}
                              </span>
                            </div>

                            {task.completed && (
                              <span className="font-mono text-[10px] bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded text-brand-cyan uppercase font-bold tracking-wider animate-pulse">
                                COMPLETE
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CARD 1: Weekly Challenge Option */}
                    {selectedCard.id === 'learn-english' && selectedCard.currentWeekChallenge && (
                      <div className="pt-4 border-t border-gray-900 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="font-display font-bold text-lg text-white">Weekly Challenge Checklist</p>
                          <span className="text-brand-purple font-mono text-[10px] uppercase tracking-wider font-bold">BONUS BADGES UNLOCKED</span>
                        </div>

                        <div className="space-y-3">
                          {selectedCard.currentWeekChallenge.map((task) => (
                            <div
                              key={task.id}
                              onClick={() => {
                                if (onToggleWeekTask) {
                                  onToggleWeekTask(selectedCard.id, task.id);
                                  onAddLog(`Toggled weekly challenge: ${task.text}`);
                                }
                              }}
                              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                                task.completed
                                  ? 'bg-brand-purple/5 border-brand-purple/20 hover:border-brand-purple/35'
                                  : 'bg-gray-900/10 border-gray-900 hover:border-gray-800'
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <div className={`p-1 rounded-lg border-2 transition-all duration-300 ${
                                  task.completed
                                    ? 'bg-brand-purple border-brand-purple text-white'
                                    : 'border-gray-800 text-transparent hover:border-gray-600'
                                }`}>
                                  <LucideIcon name="Check" className="w-3.5 h-3.5 font-bold" />
                                </div>
                                <span className={`text-sm ${task.completed ? 'line-through text-gray-500 font-light' : 'text-gray-200'}`}>
                                  {task.text}
                                </span>
                              </div>

                              {task.completed && (
                                <span className="font-mono text-[10px] bg-brand-purple/15 border border-brand-purple/20 px-2 py-0.5 rounded text-brand-purple uppercase font-bold tracking-wider">
                                  BONUS TASK
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CARDS 2 & 4: Visual Roadmap pathways */}
                    {selectedCard.pathway && (
                      <div className="pt-6 border-t border-gray-900 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="font-display font-bold text-lg text-white">Visual Pathway progression</p>
                          <span className="font-mono text-xs text-brand-cyan tracking-wider font-extrabold">PATHMAP_REPORT</span>
                        </div>

                        {/* Visual progression node connect blocks */}
                        <div className="relative p-6 rounded-2xl bg-gray-900/30 border border-gray-900/60">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative">
                            {selectedCard.pathway.map((node, nodeIdx) => {
                              // Define completed steps logic based on task completion percentage
                              const tasksCompletedCount = selectedCard.tasks.filter(t => t.completed).length;
                              const currentActiveIndex = Math.floor((tasksCompletedCount / selectedCard.tasks.length) * selectedCard.pathway!.length);
                              const isCompleted = nodeIdx < currentActiveIndex;
                              const isActive = nodeIdx === currentActiveIndex;

                              return (
                                <div
                                  key={node}
                                  className={`p-4 rounded-xl border text-center relative overflow-hidden transition-all duration-300 ${
                                    isCompleted
                                      ? 'bg-gradient-to-b from-brand-cyan/5 to-brand-purple/5 border-brand-cyan/35'
                                      : isActive
                                      ? 'bg-gray-900 border-white/40 ring-1 ring-white/20 scale-[1.02]'
                                      : 'bg-black/40 border-gray-950 opacity-40'
                                  }`}
                                >
                                  {/* Step numbers decoration */}
                                  <span className="absolute top-1.5 left-2 font-mono text-[9px] text-gray-600 block">
                                    NODE #0{nodeIdx + 1}
                                  </span>

                                  {/* Lock status icons */}
                                  <div className="absolute top-1.5 right-2 text-gray-600">
                                    <LucideIcon name={isCompleted ? 'Check' : isActive ? 'Play' : 'Lock'} size={10} className={isCompleted ? 'text-brand-cyan' : isActive ? 'text-brand-purple animate-pulse' : 'text-gray-650'} />
                                  </div>

                                  <div className="mt-2 flex flex-col items-center">
                                    <LucideIcon name={selectedCard.id === 'practice-coding' ? 'Code2' : 'BrainCircuit'} className={`w-5 h-5 mb-2 ${isCompleted ? 'text-brand-cyan' : isActive ? 'text-brand-purple animate-bounce' : 'text-gray-500'}`} />
                                    <p className={`text-xs font-bold tracking-wide ${isCompleted || isActive ? 'text-white' : 'text-gray-500'}`}>
                                      {node}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CARD 6: Daily Streak Consistency Milestone checkpoints */}
                    {selectedCard.id === 'stay-consistent' && (
                      <div className="pt-4 border-t border-gray-900 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="font-display font-medium text-lg text-white">Habit Milestones & Target Goals</p>
                          <span className="font-mono text-xs text-brand-gold font-bold">STATUS REPORT</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {streakMilestones.map((ms) => {
                            const isAchieved = streakCount >= ms.target;
                            
                            return (
                              <div
                                key={ms.target}
                                className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                                  isAchieved
                                    ? 'bg-brand-gold/5 border-brand-gold/30 hover:bg-brand-gold/10'
                                    : 'bg-gray-900/10 border-gray-900 opacity-60'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg border ${
                                    isAchieved 
                                      ? 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold' 
                                      : 'bg-gray-950 border-gray-800 text-gray-600'
                                  }`}>
                                    <LucideIcon name={isAchieved ? 'CheckCircle2' : 'Lock'} className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className={`text-xs font-bold ${isAchieved ? 'text-brand-gold' : 'text-gray-400'}`}>
                                      {ms.label}
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{ms.desc}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Bottom Dismiss */}
                <div className="p-8 border-t border-gray-900 bg-black/40 flex justify-end">
                  <button
                    onClick={() => setSelectedCardId(null)}
                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    Sync & Close Space
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
