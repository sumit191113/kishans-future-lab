import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface AIMentorTerminalProps {
  onAddLog: (action: string) => void;
  onBoostStreak: () => void;
  streakCount: number;
}

interface MentorMode {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  badge: string;
  intro: string;
}

export const AIMentorTerminal: React.FC<AIMentorTerminalProps> = ({ onAddLog, onBoostStreak, streakCount }) => {
  const [activeMode, setActiveMode] = useState<string>('optimizer');
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'mentor'; text: string; mode?: string }>>([
    {
      sender: 'mentor',
      text: "System diagnostics online. I am AURA, your Personal Growth AI Mentor. Select a cognitive channel below, choose a preset, or type any developmental query to calibrate Kishan's Growth OS.",
      mode: 'optimizer'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [streamedText, setStreamedText] = useState<string>('');
  const [stats, setStats] = useState({
    cognitiveFocus: 94.2,
    fluencyIndex: 88.5,
    neuralSymmetry: 91.0,
    dailyXp: 1840
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const mentorModes: MentorMode[] = [
    {
      id: 'optimizer',
      name: 'Cognitive Optimizer',
      role: 'Routine Architect & Focus Specialist',
      icon: 'Cpu',
      color: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5 hover:bg-brand-cyan/10',
      badge: 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30',
      intro: "Establishing absolute clarity. My guidelines are simple: optimize routine loops, automate distraction nodes, and measure deliberate momentum daily."
    },
    {
      id: 'fluency',
      name: 'Bilingual Confidence Coach',
      role: 'English Eloquence & Speech Mentor',
      icon: 'Languages',
      color: 'text-brand-purple border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple/10',
      badge: 'bg-brand-purple/15 text-brand-purple border-brand-purple/30',
      intro: "Communication is the pipeline of impact. We target vocal volume, pronunciation precision, sentence composition velocity, and fluid global presentation."
    },
    {
      id: 'prompter',
      name: 'Neural Prompter',
      role: 'Prompt Engineer & LLM Orchestrator',
      icon: 'BrainCircuit',
      color: 'text-brand-rose border-brand-rose/20 bg-brand-rose/5 hover:bg-brand-rose/10',
      badge: 'bg-brand-rose/15 text-brand-rose border-brand-rose/30',
      intro: "LLMs are cognitive mirrors. To build elite machines, master system roles, zero-shot chains, dynamic context windows, and declarative constraint grids."
    }
  ];

  const quickPresets = [
    {
      mode: 'optimizer',
      label: 'Optimize Daily Routine',
      query: 'What is the absolute best 2026 daily routine structure to achieve hyper-growth?',
      reply: `### THE GROWTH OS: DAILY SEED SCHEDULE (2026 EDITION)

To compound cognitive skill sets sustainably without burning out, partition your day into three **Sovereign Focus Nodes**:

1. **The Deep Learning Block (6:00 AM - 8:30 AM)**
   * **Subject**: High-complexity topics (e.g., Fluent English structures, advanced LLM prompting, system compilation).
   * **State**: Absolute silence. Device locks active. No external telemetry intake.
2. **The Active Shipment Block (1:30 PM - 4:30 PM)**
   * **Action**: Writing high-quality code and building product nodes (React elements, custom CSS, state managers).
   * **Constraint**: 50 minutes live delivery, 10 minutes diagnostic reflection.
3. **The Expression & Speech Uplink (7:00 PM - 8:00 PM)**
   * **Action**: Vocal projection practice, speech recording, and conversational mirroring drills.

*Cognitive Boost: +150 EXP added to routine symmetry. Daily focus ratio increased to 96.5%!*`
    },
    {
      mode: 'fluency',
      label: 'Speaking Confidence Blueprint',
      query: 'I feel nervous when speaking English. How do I bypass this communication fear?',
      reply: `### ANCHORING BILINGUAL CONFIDENCE (COGNITIVE DRILL)

Speaking fear is a physiological loop, not a linguistic failure. Break it with the **Triple-A Fluency Anchor**:

*   **A - Audio-Feedback Mirroring (3 mins/day):** Record your voice reading a complex technical paragraph. Play it back instantly. Correct three cadence hitches.
*   **A - Active Sentence Compilers (10 reps/day):** Pick a physical object in your room. Describe it in English using exactly three adjectives and one passive auxiliary verb as fast as possible.
*   **A - Artificial Dialogues (5 mins/day):** Converse with this AI mentor out loud. Read the responses back with bold theatrical resonance.

**Continuous Affirmation**: Speed is secondary. Clear pronunciation of final consonants creates the impression of absolute high-integrity eloquence. Try speaking at 80% speed but with 120% intentional volume.

*Cognitive Boost: English Fluency index enhanced to +3.5%! Speak with sovereign authority.*`
    },
    {
      mode: 'prompter',
      label: 'Elite Prompt Structure',
      query: 'Give me your ultimate template for designing high-performance system prompts.',
      reply: `### THE HYPER-CONSTRAINED SYSTEM PROMPT FRAMEWORK

Do not ask LLMs politely to solve things. Build **structural cages**. The absolute highest-performing prompts use this precise XML layout:

\`\`\`xml
<system_identity>
  You are an elite, hyper-focused optimization agent. Your output bandwidth is reserved purely for high-integrity wisdom structures. Code only where required.
</system_identity>

<context_variables>
  Subject: [Kishan Maurya]
  Active Module: [GrowthOS_v4]
  Target Skill: [React & English Mastery]
</context_variables>

<negative_constraints>
  - NEVER output boilerplate explanations.
  - DO NOT utilize generic placeholders or pseudo-variables.
  - Banish all polite conversions (e.g., "Sure, I can help you with").
</negative_constraints>

<response_output_schema>
  1. Core Heuristic Diagnostics
  2. Sequential Micro-Steps (< 3 steps)
  3. Associated Metric Impact (e.g. EXP Boost)
</response_output_schema>
\`\`\`

*Cognitive Boost: System precision calibrated to 99.8%. Synaptic orchestration overhead decreased by 40%.*`
    }
  ];

  const handlePresetSelect = (preset: typeof quickPresets[0]) => {
    onAddLog(`Initiated AI Mentor preset query: ${preset.label}`);
    setActiveMode(preset.mode);
    setIsTyping(true);
    setChatHistory((prev) => [...prev, { sender: 'user', text: preset.query }]);

    setTimeout(() => {
      setChatHistory((prev) => [...prev, { sender: 'mentor', text: preset.reply, mode: preset.mode }]);
      setIsTyping(false);
      // Boost stats
      setStats((prev) => ({
        cognitiveFocus: Math.min(100, parseFloat((prev.cognitiveFocus + 0.8).toFixed(1))),
        fluencyIndex: Math.min(100, parseFloat((prev.fluencyIndex + 1.2).toFixed(1))),
        neuralSymmetry: Math.min(100, parseFloat((prev.neuralSymmetry + 0.5).toFixed(1))),
        dailyXp: prev.dailyXp + 250
      }));
      onAddLog(`Received structured advisory package from AI Mentor (${preset.mode})`);
    }, 1500);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const query = userInput;
    setUserInput('');
    onAddLog(`Submitted custom growth query: "${query.substring(0, 30)}..."`);
    setChatHistory((prev) => [...prev, { sender: 'user', text: query }]);
    setIsTyping(true);

    setTimeout(() => {
      // Heuristic reply matching based on tags
      let replyText = `### SYSTEM COGNITIVE DIAGNOSTIC: UNKNOWN VECTOR

Thank you for your telemetry packet. My neural architecture has analyzed: "${query}"

**Optimal Recommendation Path:**
1.  **Refine Constraints:** Ensure you have locked out distracting browser tabs during this learning sprint.
2.  **Deliberate Practice:** Dedicate 15 minutes to speaking the solution out loud in continuous English to build speaking muscle memory.
3.  **Ship Instantly:** Write a small React hook or component that visualizes this challenge in your dashboard.

*System Impact: Daily Active XP increased by +120! Focus telemetry aligned.*`;

      const qLower = query.toLowerCase();
      if (qLower.includes('english') || qLower.includes('speak') || qLower.includes('fluent') || qLower.includes('talk')) {
        replyText = `### BILINGUAL COMPLIANCE ALIGNMENT REQUEST

Your inquiry regarding **language eloquence** has been routed to the confidence engine. 

**Actionable Synthesis:**
*   **The Vocal Rigidity Warmup:** Forcefully enunciate five tongue twisters focusing on your "Th" and "R" sounds (e.g., *"Through three cheese trees, three free fleas flew"*). This builds verbal flexibility.
*   **Temporal Mirroring:** Read your last written code block out loud as if explaining it to a global CEO. Keep your body relaxed and use hand gestures.
*   **The 50/50 Code-Speak Protocol:** For every 50 lines of React/TypeScript code you write, force yourself to explain its logic out loud for 2 minutes in clean, continuous English.

*Fluency Index Calibrated: +1.8% boost registered. Daily routine sync success.*`;
      } else if (qLower.includes('prompt') || qLower.includes('ai') || qLower.includes('gemini') || qLower.includes('llm')) {
        replyText = `### BRAIN_CIRCUIT_DECONSTRUCTION: PROMPTING FRAMEWORK

Your AI-orchestration packet is accepted. When training models or building agentic wrappers:

**The Golden Prompt Constraints:**
1.  **Strict Context Windows:** Supply complete schema lists and explicit data layouts. Do not let the model guess input variables.
2.  **Role Play Reinforcement:** Always assign a psychological ceiling (e.g., "Write in the style of an uncompromising senior compiler engineer").
3.  **Output Bounds:** Force JSON, YAML, or high-density Bullet points to minimize token chatter.

*Cognitive Action: Neural symmetry factor boosted by +1.4X. Active intelligence threshold configured.*`;
      } else if (qLower.includes('react') || qLower.includes('code') || qLower.includes('web') || qLower.includes('css') || qLower.includes('coding')) {
        replyText = `### LIVE CODE INTEGRITY REPORT: PRODUCTION BUILDS

To build highly resilient, beautifully fluid browser applications:

**The Modern Interface Paradigm:**
*   **Layout Discipline:** Harness CSS grids with adaptive Tailwind prefixes (\`sm:grid-cols-2 lg:grid-cols-12\`). Ensure spacing has logical rhythm variance.
*   **Motion Frameworks:** Utilize \`motion\` dynamic springs for route changes or terminal inputs to give a physically real glassmorphic weight to components.
*   **State Cleanliness:** Avoid complex nested hook renders. Keep structures modular, and define shared interfaces early in a central \`types.ts\` config.

*Development Index: Visual architecture metric upgraded. Daily active XP +300 points.*`;
      }

      setChatHistory((prev) => [...prev, { sender: 'mentor', text: replyText, mode: activeMode }]);
      setIsTyping(false);
      setStats((prev) => ({
        cognitiveFocus: Math.min(100, parseFloat((prev.cognitiveFocus + 1.1).toFixed(1))),
        fluencyIndex: Math.min(100, parseFloat((prev.fluencyIndex + 1.4).toFixed(1))),
        neuralSymmetry: Math.min(100, parseFloat((prev.neuralSymmetry + 0.9).toFixed(1))),
        dailyXp: prev.dailyXp + 350
      }));
      onAddLog(`AI Mentor successfully compiled custom solution vector.`);
    }, 1800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  return (
    <section id="ai-mentor" className="py-24 relative overflow-hidden bg-radial from-gray-950 via-black to-gray-950 border-y border-white/5">
      {/* Visual cyber mesh overlays */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-brand-cyan/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
              <LucideIcon name="BrainCircuit" className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">COGNITIVE MENTOR SYSTEM</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              AURA AI Mentor <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                Growth Tuning Console
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl font-light">
              This terminal accesses Kishan&apos;s real-time Growth OS mentoring nodes. Select a specialized AI channel, test cognitive presets, or transmit custom development questions.
            </p>
          </div>

          {/* Connected Metrics HUD Card */}
          <div className="grid grid-cols-2 md:flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg min-w-[280px]">
            <div className="text-left md:px-4 border-r border-white/10">
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">FOCUS LEVEL</span>
              <span className="text-sm font-mono font-bold text-brand-cyan">{stats.cognitiveFocus}%</span>
            </div>
            <div className="text-left md:px-4 md:border-r border-white/10">
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">FLUENCY INDEX</span>
              <span className="text-sm font-mono font-bold text-brand-purple">{stats.fluencyIndex}%</span>
            </div>
            <div className="text-left md:px-4 border-r border-white/10">
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">NEURAL SYMM</span>
              <span className="text-sm font-mono font-bold text-brand-rose">{stats.neuralSymmetry}%</span>
            </div>
            <div className="text-left md:px-4">
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">COGNITIVE XP</span>
              <span className="text-sm font-mono font-bold text-brand-gold">{stats.dailyXp} PTS</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Personality & Preset Selectors (width: 4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Personality Selector */}
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-left font-bold">
                1. SELECT COGNITIVE CHANNELS
              </h3>
              
              <div className="space-y-3">
                {mentorModes.map((mode) => {
                  const isActive = activeMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setActiveMode(mode.id);
                        onAddLog(`AI Mentor switched to channel: ${mode.name}`);
                      }}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 h-fit cursor-pointer ${
                        isActive
                          ? 'bg-white/10 border-white/20 shadow-lg'
                          : 'bg-white/5 border-white/15 opacity-60 hover:opacity-90'
                      }`}
                    >
                      <div className={`p-2 rounded-lg border h-fit ${mode.color}`}>
                        <LucideIcon name={mode.icon} className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-extrabold text-sm tracking-wide truncate">{mode.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono truncate">{mode.role}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-4 text-left">
              <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                2. TRANSMIT TEST COGNITIVE PRESETS
              </h3>
              
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3.5 backdrop-blur-md">
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Bypass typewriter speeds. Pressing a node launches direct advisory packages instantly.
                </p>
                
                <div className="space-y-2">
                  {quickPresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => handlePresetSelect(preset)}
                      className="w-full text-left px-3 py-2.5 rounded-lg border border-white/10 bg-[#030712]/45 hover:bg-white/5 text-[11px] text-gray-300 transition-all font-mono flex items-center justify-between group cursor-pointer"
                    >
                      <span className="truncate pr-2 group-hover:text-white">{preset.label}</span>
                      <LucideIcon name="ChevronRight" className="w-3.5 h-3.5 text-brand-cyan group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro Calibration Action */}
            <div className="p-4 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 text-left flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-white font-extrabold text-xs">Daily Streak Tracker</p>
                <p className="text-[9px] text-gray-400 font-mono mt-0.5">CURRENT METRIC: {streakCount} DAYS ACTIVE</p>
              </div>
              <button
                onClick={() => {
                  onBoostStreak();
                  onAddLog("Incremented daily activity streak via AI Mentor terminal.");
                }}
                className="px-3 py-1.5 rounded-lg bg-brand-cyan hover:bg-brand-cyan/80 text-black font-extrabold text-[10px] tracking-wider uppercase transition-all select-none cursor-pointer"
              >
                Boost Streak
              </button>
            </div>

          </div>

          {/* Right Column: Holographic Terminal Interface (width: 8 columns) */}
          <div className="lg:col-span-8 flex flex-col rounded-3xl border border-white/10 bg-[#030712]/70 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[500px]">
            
            {/* Terminal Top bar decoration */}
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  AURA_CONSULTATION_UPLINK.SH
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-brand-cyan">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
                </span>
                <span className="text-[9px] tracking-widest font-bold uppercase">
                  NODE CHANNEL ACTIVE: {activeMode.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Channel Active Intro Bar */}
            <div className="px-6 py-3 border-b border-white/5 bg-white/5 text-left text-xs italic text-gray-500">
              <span className="font-bold text-gray-400 not-italic uppercase font-mono mr-2 text-[10px]">
                [{mentorModes.find(m => m.id === activeMode)?.name}]
              </span>
              &ldquo;{mentorModes.find(m => m.id === activeMode)?.intro}&rdquo;
            </div>

            {/* Chat History Frame */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[380px] text-left">
              {chatHistory.map((item, idx) => {
                const isMentor = item.sender === 'mentor';
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex gap-4 ${isMentor ? 'justify-start' : 'justify-end'}`}
                  >
                    {isMentor && (
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-brand-cyan shrink-0">
                        <LucideIcon name="BrainCircuit" className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] rounded-2xl p-4 border text-sm leading-relaxed shadow-lg ${
                      isMentor
                        ? 'bg-white/5 border-white/10 text-gray-100 font-sans'
                        : 'bg-brand-cyan/10 border-brand-cyan/20 text-white font-mono text-xs'
                    }`}>
                      {isMentor ? (
                        <div className="markdown-body space-y-3 font-light">
                          {item.text.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('### ')) {
                              return <h4 key={pIdx} className="font-display font-black text-white text-base tracking-wide border-b border-white/5 pb-1 mt-3 mb-1">{paragraph.replace('### ', '')}</h4>;
                            }
                            if (paragraph.startsWith('*   ') || paragraph.startsWith('* ')) {
                              return (
                                <ul key={pIdx} className="list-disc list-inside space-y-1.5 text-gray-305 pl-1.5 font-light">
                                  {paragraph.split('\n').map((li, liIdx) => (
                                    <li key={liIdx} className="list-none flex items-start gap-2">
                                      <span className="text-brand-cyan shrink-0 mt-1.5">•</span>
                                      <span className="flex-1">{li.replace(/^\*\s+\-\s+|\*\s+|^-\s+|^\*\s+/, '')}</span>
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            if (paragraph.startsWith('`')) {
                              return (
                                <pre key={pIdx} className="p-3 rounded-lg border border-white/10 bg-[#030712] font-mono text-[10px] text-gray-300 overflow-x-auto select-all leading-normal">
                                  <code>{paragraph.replace(/```xml|```/g, '')}</code>
                                </pre>
                              );
                            }
                            return <p key={pIdx} className="text-gray-300 leading-relaxed">{paragraph}</p>;
                          })}
                        </div>
                      ) : (
                        <p>{item.text}</p>
                      )}
                    </div>

                    {!isMentor && (
                      <div className="h-8 w-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 font-mono text-xs font-bold">
                        U
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 justify-start"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-brand-cyan shrink-0">
                    <LucideIcon name="BrainCircuit" className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div className="max-w-[150px] rounded-2xl p-4 border bg-white/5 border-white/10 text-gray-400 text-xs font-mono tracking-widest flex items-center gap-1">
                    COMPILE_ADVISORY
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce [animation-delay:0.2s]">.</span>
                    <span className="animate-bounce [animation-delay:0.4s]">.</span>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form Bar */}
            <form onSubmit={handleCustomSubmit} className="p-4 border-t border-white/10 bg-white/5 flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask English eloquence drills, prompter schemas, routine tweaks..."
                className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-white text-black hover:bg-brand-cyan hover:text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 select-none active:scale-[0.98] cursor-pointer"
              >
                <LucideIcon name="Send" size={13} />
                Transmit Query
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
