import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FutureLabLogo } from './components/FutureLabLogo';
import { 
  Languages, 
  Code2, 
  Cpu, 
  BrainCircuit, 
  Lightbulb, 
  Keyboard, 
  Check, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Target, 
  Award,
  Zap,
  ArrowRight,
  Flame,
  CheckCircle2,
  RefreshCw,
  Bot,
  Send,
  Loader2,
  Sparkles,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  VolumeX,
  Share2,
  MoreHorizontal
} from 'lucide-react';

// Task interfaces
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface SavedPrompt {
  id: string;
  text: string;
  timestamp: string;
}

interface BusinessIdea {
  id: string;
  problem: string;
  solution: string;
  timestamp: string;
}

// Inspired typing passages for velocity testing, each roughly 60 words
const TYPING_PASSAGES = [
  "Every single day represents a fresh opportunity to invest in your personal skillset. By devoting just one hour to writing elegant clean code, you establish a perfect foundation for a global software career. Do not underestimate the compounding power of daily consistency. Over time, these small deliberate actions build massive future success, creative innovation, and absolute engineering mastery.",
  "Artificial intelligence is rapidly redesigning the global landscape of software engineering and creation. Learning how to engineer robust prompts, training models, and integrating advanced cognitive frameworks is no longer an optional skill. It is an absolute superpower for modern tech startups. Keep pushing your limits every single day to stay ahead in this dynamic field of innovation and machine learning.",
  "Success in any industry is rarely about extreme bursts of inspiration or chaotic motivation. Instead, it is built upon the quiet rhythm of daily, unbreakable habits. When you practice typing with complete precision, study algorithmic complexity, and analyze market problems, you gain incredible knowledge. Stay disciplined even when progress feels invisible because your future is being constructed in this very moment.",
  "Developing business thinking requires a highly observant mind that naturally looks for common pain points in society. Every market friction or unresolved customer complaint is actually a golden opportunity waiting for an elegant software solution. Train your brain to notice what products people buy and why they make those specific choices. This constant intellectual curiosity is what separates true innovators from ordinary workers.",
  "To become a top-tier global developer, you must cultivate deep technical patience and learn to embrace challenging bugs. Every error message you encounter is a valuable riddle that details exactly how computers operate under the hood. Practice touch typing to let your fingers keep pace with your high-speed thoughts. Consistency is the primary weapon that transforms ambitious beginners into elite software engineering professionals."
];

export default function App() {
  // --- Persistent State Hooks ---
  
  // English Tasks
  const [englishTasks, setEnglishTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kishan_english_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 'en-1', text: 'Learn 10 new English words', completed: false },
      { id: 'en-2', text: 'Speak English for 5 minutes', completed: false },
      { id: 'en-3', text: 'Write 5 English sentences', completed: false },
      { id: 'en-4', text: 'Read one short English article', completed: false },
    ];
  });

  // Hotwords vocabulary list in English card
  const [vocabList, setVocabList] = useState<string[]>(() => {
    const saved = localStorage.getItem('kishan_vocab_list');
    return saved ? JSON.parse(saved) : ['Persevere', 'Consistency', 'Elocution', 'Sovereign'];
  });
  const [newVocab, setNewVocab] = useState('');

  // Coding Tasks
  const [codingTasks, setCodingTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kishan_coding_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 'cd-1', text: 'Learn one coding concept', completed: false },
      { id: 'cd-2', text: 'Practice coding for 30 minutes', completed: false },
      { id: 'cd-3', text: 'Write some code', completed: false },
      { id: 'cd-4', text: 'Save what you learned', completed: false },
    ];
  });

  // AI Tasks
  const [aiTasks, setAiTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kishan_ai_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 'ai-1', text: 'Learn one AI concept', completed: false },
      { id: 'ai-2', text: 'Create one AI prompt', completed: false },
      { id: 'ai-3', text: 'Generate one image', completed: false },
      { id: 'ai-4', text: 'Save your best prompt', completed: false },
    ];
  });

  // Saved Prompts list in AI card
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    const saved = localStorage.getItem('kishan_saved_prompts');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPrompt, setCurrentPrompt] = useState('');

  // Business Thinking Tasks
  const [businessTasks, setBusinessTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kishan_business_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 'biz-1', text: 'Observe what people buy', completed: false },
      { id: 'biz-2', text: 'Think about one problem', completed: false },
      { id: 'biz-3', text: 'Think of one solution', completed: false },
      { id: 'biz-4', text: 'Write your idea', completed: false },
    ];
  });

  // Business Ideas list
  const [savedIdeas, setSavedIdeas] = useState<BusinessIdea[]>(() => {
    const saved = localStorage.getItem('kishan_saved_ideas');
    return saved ? JSON.parse(saved) : [];
  });
  const [bizProblem, setBizProblem] = useState('');
  const [bizSolution, setBizSolution] = useState('');

  // Typing Tasks
  const [typingTasks, setTypingTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kishan_typing_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 'typ-1', text: 'Practice typing', completed: false },
      { id: 'typ-2', text: 'Improve speed', completed: false },
      { id: 'typ-3', text: 'Improve accuracy', completed: false },
    ];
  });

  // --- Real-time Typing Test Section state ---
  const [passageToType, setPassageToType] = useState(() => {
    const randomIndex = Math.floor(Math.random() * TYPING_PASSAGES.length);
    return TYPING_PASSAGES[randomIndex];
  });
  const [typedInput, setTypedInput] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [typeStartTime, setTypeStartTime] = useState<number | null>(null);
  const [typeWPM, setTypeWPM] = useState<number>(0);
  const [typeAccuracy, setTypeAccuracy] = useState<number>(100);
  const [isTypeFinished, setIsTypeFinished] = useState(false);

  // --- Future Nexus AI Chat States (Multi-Session Threads) ---
  interface ChatMessage {
    role: 'user' | 'assistant';
    text: string;
  }

  interface ChatThread {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: string;
  }

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('kishan_ai_chat_threads_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved chat threads", e);
      }
    }
    return [
      {
        id: 'thread_default',
        title: 'Inspiration Hub',
        messages: [
          { role: 'assistant', text: "Hello Kishan! I am Future Nexus AI, your advanced virtual growth advisor and personal innovation guide. Ask me anything about English vocabulary, TypeScript paradigms, micro-startup strategies, or prompt engineering. What shall we master today?" }
        ],
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [activeThreadId, setActiveThreadId] = useState<string>(() => {
    const savedActive = localStorage.getItem('kishan_ai_active_thread_id');
    return savedActive || 'thread_default';
  });

  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Custom states for interactive chat actions
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [reactions, setReactions] = useState<{ [key: string]: 'like' | 'dislike' | null }>({});
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  // Find active thread or fallback cleanly
  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0] || {
    id: 'thread_fallback',
    title: 'General Chat',
    messages: []
  };

  const chatMessages = activeThread.messages;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  useEffect(() => {
    localStorage.setItem('kishan_ai_chat_threads_v2', JSON.stringify(chatThreads));
  }, [chatThreads]);

  useEffect(() => {
    setActiveThreadId(prev => {
      const exists = chatThreads.some(t => t.id === prev);
      return exists ? prev : (chatThreads[0]?.id || 'thread_default');
    });
  }, [chatThreads]);

  useEffect(() => {
    localStorage.setItem('kishan_ai_active_thread_id', activeThreadId);
  }, [activeThreadId]);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyMessage = (text: string, idx: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    }
  };

  const handleToggleSpeech = (text: string, idx: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
    } else {
      window.speechSynthesis.cancel();
      // Clean text of markdown before reading
      const cleanText = text.replace(/[\*\#\`\_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.lang.startsWith('en') || v.lang.startsWith('hi'));
      if (selectedVoice) utterance.voice = selectedVoice;
      
      utterance.onend = () => {
        setSpeakingIndex(null);
      };
      utterance.onerror = () => {
        setSpeakingIndex(null);
      };
      
      setSpeakingIndex(idx);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReaction = (idx: number, type: 'like' | 'dislike') => {
    const key = `${activeThreadId}_${idx}`;
    setReactions(prev => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current === type ? null : type
      };
    });
  };

  const handleShareMessage = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Nexus connection link copied to clipboard. Share with others!");
    }
  };

  // Growth Stats calculated on the fly
  const totalTasks = englishTasks.length + codingTasks.length + aiTasks.length + businessTasks.length + typingTasks.length;
  const completedTasksCount = 
    englishTasks.filter(t => t.completed).length +
    codingTasks.filter(t => t.completed).length +
    aiTasks.filter(t => t.completed).length +
    businessTasks.filter(t => t.completed).length +
    typingTasks.filter(t => t.completed).length;

  const progressPercentage = Math.round((completedTasksCount / totalTasks) * 100) || 0;

  // Streak tracker
  const [currentStreak, setCurrentStreak] = useState<number>(() => {
    const saved = localStorage.getItem('kishan_streak_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  // One-time Vercel transition / Clean state sync
  useEffect(() => {
    const isWiped = localStorage.getItem('kishan_prod_reset_v4');
    if (!isWiped) {
      localStorage.removeItem('kishan_streak_count');
      localStorage.removeItem('kishan_ai_chat_threads_v2');
      localStorage.removeItem('kishan_ai_active_thread_id');
      
      setCurrentStreak(0);
      setChatThreads([
        {
          id: 'thread_default',
          title: 'Inspiration Hub',
          messages: [
            { role: 'assistant', text: "Hello Kishan! I am Future Nexus AI, your advanced virtual growth advisor and personal innovation guide. Ask me anything about English vocabulary, TypeScript paradigms, micro-startup strategies, or prompt engineering. What shall we master today?" }
          ],
          createdAt: new Date().toISOString()
        }
      ]);
      setActiveThreadId('thread_default');
      
      localStorage.setItem('kishan_prod_reset_v4', 'true');
    }
  }, []);

  const [streakParticles, setStreakParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; color: string }[]>([]);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const particleIdRef = useRef(0);

  const handleBoostStreak = () => {
    setCurrentStreak(prev => prev + 1);
    
    // Generate lovely festive cyber particles
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#6366f1', '#f43f5e', '#06b6d4'];
    const newParticles = Array.from({ length: 32 }).map(() => {
      particleIdRef.current += 1;
      return {
        id: particleIdRef.current,
        x: (Math.random() - 0.5) * 140, // spread landscape
        y: (Math.random() - 0.5) * 60 - 30, // vertical float starter
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    
    setStreakParticles(newParticles);
    setShowStreakCelebration(true);
    
    // Cleanup animations
    setTimeout(() => {
      setStreakParticles([]);
    }, 2500);

    setTimeout(() => {
      setShowStreakCelebration(false);
    }, 3500);
  };

  // Persistent Effect synchronizers
  useEffect(() => {
    localStorage.setItem('kishan_english_tasks', JSON.stringify(englishTasks));
  }, [englishTasks]);

  useEffect(() => {
    localStorage.setItem('kishan_vocab_list', JSON.stringify(vocabList));
  }, [vocabList]);

  useEffect(() => {
    localStorage.setItem('kishan_coding_tasks', JSON.stringify(codingTasks));
  }, [codingTasks]);

  useEffect(() => {
    localStorage.setItem('kishan_ai_tasks', JSON.stringify(aiTasks));
  }, [aiTasks]);

  useEffect(() => {
    localStorage.setItem('kishan_saved_prompts', JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  useEffect(() => {
    localStorage.setItem('kishan_business_tasks', JSON.stringify(businessTasks));
  }, [businessTasks]);

  useEffect(() => {
    localStorage.setItem('kishan_saved_ideas', JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  useEffect(() => {
    localStorage.setItem('kishan_typing_tasks', JSON.stringify(typingTasks));
  }, [typingTasks]);

  useEffect(() => {
    localStorage.setItem('kishan_streak_count', currentStreak.toString());
  }, [currentStreak]);

  // Task Toggle helper
  const toggleTaskState = (
    listName: 'english' | 'coding' | 'ai' | 'business' | 'typing',
    id: string
  ) => {
    const updateTaskCollection = (tasksList: Task[]) => 
      tasksList.map(task => task.id === id ? { ...task, completed: !task.completed } : task);

    if (listName === 'english') setEnglishTasks(updateTaskCollection);
    else if (listName === 'coding') setCodingTasks(updateTaskCollection);
    else if (listName === 'ai') setAiTasks(updateTaskCollection);
    else if (listName === 'business') setBusinessTasks(updateTaskCollection);
    else if (listName === 'typing') setTypingTasks(updateTaskCollection);
  };

  // Add vocabulary word to English Card list
  const handleAddVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVocab.trim()) return;
    setVocabList((prev) => [...prev, newVocab.trim()]);
    setNewVocab('');
  };

  const handleRemoveVocab = (word: string) => {
    setVocabList((prev) => prev.filter(w => w !== word));
  };

  // Add best prompt to AI list
  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      text: currentPrompt.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedPrompts(prev => [newPrompt, ...prev]);
    setCurrentPrompt('');
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  };

  // Add Business Idea
  const handleSaveIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizProblem.trim() || !bizSolution.trim()) return;
    const newIdea: BusinessIdea = {
      id: Date.now().toString(),
      problem: bizProblem.trim(),
      solution: bizSolution.trim(),
      timestamp: new Date().toLocaleDateString()
    };
    setSavedIdeas(prev => [newIdea, ...prev]);
    setBizProblem('');
    setBizSolution('');
  };

  const handleDeleteIdea = (id: string) => {
    setSavedIdeas(prev => prev.filter(i => i.id !== id));
  };

  // --- Future Nexus AI Handlers ---
  const updateActiveThreadMessages = (
    newMessages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])
  ) => {
    setChatThreads(prevThreads => {
      return prevThreads.map(t => {
        if (t.id === activeThreadId) {
          const resolvedMessages = typeof newMessages === 'function' ? newMessages(t.messages) : newMessages;
          
          // Auto-generate title from first user message if it has a default title
          let newTitle = t.title;
          if (t.title.startsWith('Session #') || t.title === 'Inspiration Hub') {
            const firstUserMsg = resolvedMessages.find(m => m.role === 'user');
            if (firstUserMsg) {
              const cleanedText = firstUserMsg.text.replace(/[#_*\[\]]/g, '').trim();
              newTitle = cleanedText.slice(0, 21) + (cleanedText.length > 21 ? '...' : '');
            }
          }
          
          return {
            ...t,
            title: newTitle,
            messages: resolvedMessages
          };
        }
        return t;
      });
    });
  };

  const handleSendChatMessage = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const msgToSend = customMsg || chatInput;
    if (!msgToSend.trim() || isChatLoading) return;

    const newUserMessage = { role: 'user' as const, text: msgToSend.trim() };
    const currentMessages = activeThread.messages;
    const updatedMessages = [...currentMessages, newUserMessage];
    
    // Optimistic addition of user's query
    updateActiveThreadMessages(updatedMessages);
    
    if (!customMsg) setChatInput('');
    setIsChatLoading(true);
    setChatError('');

    try {
      const chatHistoryForBackend = updatedMessages.slice(0, -1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: msgToSend.trim(),
          chatHistory: chatHistoryForBackend 
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${response.status} Error`);
      }

      const data = await response.json();
      updateActiveThreadMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setChatError(err.message || "Failed to establish a neural connection with Future Nexus AI.");
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    updateActiveThreadMessages([
      { role: 'assistant', text: "Systems re-initialized. Hello Kishan! I am Future Nexus AI, ready for your next query." }
    ]);
    setChatError('');
  };

  const handleNewChat = () => {
    const newId = 'thread_' + Date.now();
    const newThread: ChatThread = {
      id: newId,
      title: `Session #${chatThreads.length + 1}`,
      messages: [
        { role: 'assistant', text: "New cognitive node initialized. Uplink prepared. What shall we master today?" }
      ],
      createdAt: new Date().toISOString()
    };
    setChatThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newId);
    setChatError('');
  };

  const handleDeleteThread = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (chatThreads.length <= 1) {
      const cleanId = 'thread_' + Date.now();
      setChatThreads([
        {
          id: cleanId,
          title: 'Inspiration Hub',
          messages: [
            { role: 'assistant', text: "Hello Kishan! I am Future Nexus AI, and this is your general uplink. Let's do great things." }
          ],
          createdAt: new Date().toISOString()
        }
      ]);
      setActiveThreadId(cleanId);
      return;
    }

    const remaining = chatThreads.filter(t => t.id !== idToDelete);
    setChatThreads(remaining);
    
    if (activeThreadId === idToDelete) {
      setActiveThreadId(remaining[0].id);
    }
  };

  // Typing speed calculator logic
  const handleTypingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedInput(val);

    if (!isTypingActive && val.length > 0) {
      setIsTypingActive(true);
      setTypeStartTime(Date.now());
    }

    // Evaluate correct characters vs total entered
    let correctChars = 0;
    const minLength = Math.min(val.length, passageToType.length);
    for (let i = 0; i < minLength; i++) {
      if (val[i] === passageToType[i]) {
        correctChars++;
      }
    }
    const accuracy = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setTypeAccuracy(accuracy);

    // Calculate live WPM
    if (typeStartTime) {
      const durationInMinutes = (Date.now() - typeStartTime) / 60000;
      if (durationInMinutes > 0) {
        const wordsCount = val.length / 5; // Standard word length definition is 5 characters
        setTypeWPM(Math.round(wordsCount / durationInMinutes));
      }
    }

    if (val === passageToType) {
      setIsTypingActive(false);
      setIsTypeFinished(true);
    }
  };

  const resetTypingTest = () => {
    setTypedInput('');
    setIsTypingActive(false);
    setTypeStartTime(null);
    setTypeWPM(0);
    setTypeAccuracy(100);
    setIsTypeFinished(false);
    
    // Choose a random sentence that is different from the current one
    setPassageToType(prev => {
      const remaining = TYPING_PASSAGES.filter(p => p !== prev);
      const randomIndex = Math.floor(Math.random() * remaining.length);
      return remaining[randomIndex];
    });
  };

  return (
    <div className="min-h-screen bg-[#030612] text-slate-100 font-sans flex flex-col relative overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      
      {/* Sleek Ambient Navy Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-950/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Modern Frosted Header */}
      <header className="sticky top-0 z-50 bg-[#030612]/85 backdrop-blur-md border-b border-blue-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FutureLabLogo className="w-10 h-10" />
            <span className="font-semibold tracking-tight text-white sm:text-lg">
              Kishan&apos;s Future Lab
            </span>
          </div>

          <div className="relative flex items-center gap-4">
            {/* Streak Particles Cannon */}
            {streakParticles.map((p) => (
              <span
                key={p.id}
                className="absolute pointer-events-none rounded-full animate-pulse"
                style={{
                  backgroundColor: p.color,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  opacity: 0.8,
                  top: '50%',
                  left: '50%',
                  transition: 'all 2s cubic-bezier(0.1, 0.8, 0.3, 1)',
                  animationDelay: `${p.delay}s`
                }}
              />
            ))}

            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-900/40 text-blue-400 text-xs font-medium uppercase tracking-wide transition-all duration-300">
              <Flame className={`w-4 h-4 text-amber-500 fill-amber-500/20 ${showStreakCelebration ? 'animate-bounce scale-125 text-orange-400 fill-orange-400/20' : ''}`} />
              <span className={showStreakCelebration ? 'text-amber-400 font-bold' : ''}>{currentStreak} Day Streak</span>
            </div>
            
            <button 
              onClick={handleBoostStreak}
              className="relative px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs tracking-wide transition-all duration-200 cursor-pointer shadow-indigo-900/30 active:scale-95 flex items-center gap-1.5 overflow-hidden"
            >
              {showStreakCelebration && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />}
              <span>Increment Daily Streak</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative">
        
        {/* HERO SECTION */}
        <section className="relative rounded-3xl overflow-hidden border border-blue-950/30 bg-gradient-to-b from-[#050b20] to-[#030713] p-8 md:p-12 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Hero Left Content */}
          <div className="flex-1 space-y-6 text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-900/40 text-blue-400">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Habit & Knowledge OS</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
              Kishan&apos;s <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                Future Lab
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-lg font-light leading-relaxed">
              &ldquo;Small Daily Actions Create Big Future Success.&rdquo; Take absolute ownership of your day. Log activities, challenge your coding parameters, refine vocabulary, record startup ideas, and boost typing speeds.
            </p>

            {/* Quick stats grid in Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/20">
                <span className="text-xs text-slate-405 block uppercase tracking-wider font-mono">Completed Today</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">{completedTasksCount} / {totalTasks}</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/20 sm:col-span-2">
                <div className="flex justify-between text-xs text-slate-405 uppercase tracking-wider font-mono">
                  <span>Consistency Rate</span>
                  <span className="text-blue-400 font-bold">{progressPercentage}%</span>
                </div>
                <div className="h-2 w-full bg-blue-950/80 rounded-full mt-3 overflow-hidden p-[1px] border border-blue-900/10">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-sky-300 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: Beautiful futuristic learning illustration */}
          <div className="flex-1 w-full relative group">
            {/* Ambient halo glow */}
            <div className="absolute inset-0 bg-blue-600/10 rounded-2xl blur-[40px] pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden border border-blue-900/40 bg-[#060c23] shadow-xl p-3">
              {/* Premium futuristic education mock workspace */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-gray-950">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop" 
                  alt="Futuristic Learning Workspace" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity brightness-75 transition-transform duration-500 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050b20] via-transparent to-transparent" />
                
                {/* Tech HUD visualization lines on image bottom */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-blue-900/40 bg-[#030612]/90 backdrop-blur-md">
                  <p className="font-mono text-[10px] text-blue-400 font-bold tracking-widest uppercase">SYS_COGNITIVE_GRID_ACTIVE</p>
                  <p className="text-xs text-white mt-1 font-medium">Daily Learning Habit Loop: Activated</p>
                  
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Bypass Distraction Filters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* SECTION 1: TODAY'S DAILY PLAN */}
        <section id="daily-plan" className="space-y-8 text-left">
          <div className="border-l-4 border-blue-600 pl-4 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Section 1: Today&apos;s Daily Plan
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Tick off finished tasks relative to each growth sector. Completed parameters sync instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* CARD 1: English (30 Minutes) */}
            <div className="rounded-2xl border border-blue-900/30 bg-[#050b1d] p-6 lg:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-800/45 transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-900/50 flex items-center justify-center text-blue-400">
                      <Languages className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">1. English</h3>
                      <p className="text-xs text-blue-400/90 font-mono">Duration: 30 Minutes</p>
                    </div>
                  </div>
                  
                  {/* Card Completion Indicator */}
                  <div className="px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-800/20">
                    {englishTasks.filter(t => t.completed).length}/{englishTasks.length} DONE
                  </div>
                </div>

                <p className="text-slate-400 text-sm font-light">
                  Enhance public pronunciation, fluent sentence structures, global composition speed, and word recognition.
                </p>

                {/* Subtasks List */}
                <div className="space-y-2.5">
                  {englishTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => toggleTaskState('english', task.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        task.completed 
                          ? 'bg-blue-950/20 border-blue-900/40 text-slate-400 opacity-65 line-through' 
                          : 'bg-slate-900/40 border-blue-950/60 hover:bg-slate-900/80 text-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        task.completed 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-700 bg-black/40'
                      }`}>
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{task.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Interactive Feature: English Word Bank (Vocabulary Creator) */}
              <div className="pt-6 border-t border-blue-950/50 mt-4 space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Interactive English Word Bank</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">Record breakthrough daily terms to cement pronunciation and memory.</p>
                </div>

                <form onSubmit={handleAddVocab} className="flex gap-2">
                  <input
                    type="text"
                    value={newVocab}
                    onChange={(e) => setNewVocab(e.target.value)}
                    placeholder="e.g. Eloquence"
                    maxLength={20}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-blue-950 bg-black/40 text-white placeholder-slate-600 focus:outline-none focus:border-blue-600/50"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-400 hover:text-white border border-blue-900/50 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>

                {/* Vocabulary Cloud */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {vocabList.map((word) => (
                    <span 
                      key={word}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#030713] border border-blue-950 text-[10px] text-slate-300 font-mono"
                    >
                      <span>{word}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveVocab(word)}
                        className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove word"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* CARD 2: Coding (45 Minutes) */}
            <div className="rounded-2xl border border-blue-900/30 bg-[#050b1d] p-6 lg:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-800/45 transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-900/50 flex items-center justify-center text-blue-400">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">2. Coding</h3>
                      <p className="text-xs text-blue-400/90 font-mono">Duration: 45 Minutes</p>
                    </div>
                  </div>
                  
                  {/* Card Completion Indicator */}
                  <div className="px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-800/20">
                    {codingTasks.filter(t => t.completed).length}/{codingTasks.length} DONE
                  </div>
                </div>

                <p className="text-slate-400 text-sm font-light">
                  Build strong algorithmic fundamentals, implement user interface structures, and write clean TypeScript code.
                </p>

                {/* Subtasks List */}
                <div className="space-y-2.5">
                  {codingTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => toggleTaskState('coding', task.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        task.completed 
                          ? 'bg-blue-950/20 border-blue-900/40 text-slate-400 opacity-65 line-through' 
                          : 'bg-slate-900/40 border-blue-950/60 hover:bg-slate-900/80 text-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        task.completed 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-700 bg-black/40'
                      }`}>
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{task.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Interactive Feature: Roadmap Visualization */}
              <div className="pt-6 border-t border-blue-950/50 mt-4 space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Your Interactive Carrier Route</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">Track relative milestones as skills mature.</p>
                </div>

                {/* RoadMap Layout */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/45 border border-blue-950/40">
                  <div className="flex items-center justify-between w-full">
                    {/* HTML step */}
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                        codingTasks.filter(t => t.completed).length >= 1
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        1
                      </div>
                      <span className="text-[10px] mt-1.5 font-mono text-slate-300 font-semibold">HTML</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-blue-900" />

                    {/* CSS step */}
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                        codingTasks.filter(t => t.completed).length >= 3
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        2
                      </div>
                      <span className="text-[10px] mt-1.5 font-mono text-slate-300 font-semibold">CSS</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-blue-900" />

                    {/* JS step */}
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                        codingTasks.filter(t => t.completed).length === 4
                          ? 'bg-blue-600 border-blue-500 text-white animate-pulse'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        3
                      </div>
                      <span className="text-[10px] mt-1.5 font-mono text-slate-300 font-semibold">JS</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* CARD 3: AI Skills (20 Minutes) */}
            <div className="rounded-2xl border border-blue-900/30 bg-[#050b1d] p-6 lg:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-800/45 transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-900/50 flex items-center justify-center text-blue-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">3. AI Skills</h3>
                      <p className="text-xs text-blue-400/90 font-mono">Duration: 20 Minutes</p>
                    </div>
                  </div>
                  
                  {/* Card Completion Indicator */}
                  <div className="px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-800/20">
                    {aiTasks.filter(t => t.completed).length}/{aiTasks.length} DONE
                  </div>
                </div>

                <p className="text-slate-400 text-sm font-light">
                  Deep dive into prompt engineering structural frameworks, learn image generation bounds, and orchestrate systems.
                </p>

                {/* Subtasks List */}
                <div className="space-y-2.5">
                  {aiTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => toggleTaskState('ai', task.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        task.completed 
                          ? 'bg-blue-950/20 border-blue-900/40 text-slate-400 opacity-65 line-through' 
                          : 'bg-slate-900/40 border-blue-950/60 hover:bg-slate-900/80 text-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        task.completed 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-700 bg-black/40'
                      }`}>
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{task.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Interactive Feature: Save Your Best Prompt */}
              <div className="pt-6 border-t border-blue-950/50 mt-4 space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Prompt Vault Storage</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">Synthesize and record prompt designs directly to memory logs.</p>
                </div>

                <form onSubmit={handleSavePrompt} className="space-y-2">
                  <textarea
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    placeholder="Enter structural constraints or creative rules designed today..."
                    rows={2}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-blue-950 bg-black/40 text-white placeholder-slate-600 focus:outline-none focus:border-blue-600/50 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!currentPrompt.trim()}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-400 border border-blue-900/40 hover:border-blue-600 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Save Prompt</span>
                    </button>
                  </div>
                </form>

                {/* Display Saved Prompts */}
                {savedPrompts.length > 0 && (
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {savedPrompts.map((p) => (
                      <div 
                        key={p.id} 
                        className="p-3 rounded-lg bg-[#030713] border border-blue-950/80 text-left flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-white break-words leading-relaxed line-clamp-3 italic">
                            &ldquo;{p.text}&rdquo;
                          </p>
                          <span className="text-[9px] text-slate-500 font-mono mt-1.5 block">SAVED AT: {p.timestamp}</span>
                        </div>
                        <button 
                          onClick={() => handleDeletePrompt(p.id)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-900 cursor-pointer"
                          title="Delete Prompt"
                          aria-label="Delete Prompt"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* CARD 4: Business Thinking (10 Minutes) */}
            <div className="rounded-2xl border border-blue-900/30 bg-[#050b1d] p-6 lg:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-800/45 transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-900/50 flex items-center justify-center text-blue-400">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">4. Business Thinking</h3>
                      <p className="text-xs text-blue-400/90 font-mono">Duration: 10 Minutes</p>
                    </div>
                  </div>
                  
                  {/* Card Completion Indicator */}
                  <div className="px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-800/20">
                    {businessTasks.filter(t => t.completed).length}/{businessTasks.length} DONE
                  </div>
                </div>

                <p className="text-slate-400 text-sm font-light">
                  Acknowledge market trends, identify systematic micro-bottlenecks, synthesize solutions, and compile your notes.
                </p>

                {/* Subtasks List */}
                <div className="space-y-2.5">
                  {businessTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => toggleTaskState('business', task.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        task.completed 
                          ? 'bg-blue-950/20 border-blue-900/40 text-slate-400 opacity-65 line-through' 
                          : 'bg-slate-900/40 border-blue-950/60 hover:bg-slate-900/80 text-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        task.completed 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-700 bg-black/40'
                      }`}>
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{task.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Interactive Feature: Write Business Idea */}
              <div className="pt-6 border-t border-blue-950/50 mt-4 space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Micro-Startup Brainstorming Core</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">Identify localized inefficiencies and pair with practical answers.</p>
                </div>

                <form onSubmit={handleSaveIdea} className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={bizProblem}
                      onChange={(e) => setBizProblem(e.target.value)}
                      placeholder="e.g. Friction writing prompts"
                      className="px-3 py-2 text-xs rounded-lg border border-blue-950 bg-black/40 text-white placeholder-slate-600 focus:outline-none focus:border-blue-600/50"
                    />
                    <input
                      type="text"
                      value={bizSolution}
                      onChange={(e) => setBizSolution(e.target.value)}
                      placeholder="e.g. Modular XML generator tool"
                      className="px-3 py-2 text-xs rounded-lg border border-blue-950 bg-black/40 text-white placeholder-slate-600 focus:outline-none focus:border-blue-600/50"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!bizProblem.trim() || !bizSolution.trim()}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-400 border border-blue-900/40 hover:border-blue-600 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
                      <span>Log Startup Idea</span>
                    </button>
                  </div>
                </form>

                {/* Display Saved Ideas */}
                {savedIdeas.length > 0 && (
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {savedIdeas.map((i) => (
                      <div 
                        key={i.id} 
                        className="p-3 rounded-lg bg-[#030713] border border-blue-950/80 text-left flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-white font-bold tracking-tight">Idea: Solve Inefficiency</p>
                          <div className="text-[11px] text-slate-300 mt-1.5 space-y-1">
                            <p><span className="text-red-400 font-mono font-bold">Problem:</span> {i.problem}</p>
                            <p><span className="text-emerald-400 font-mono font-bold">Solution:</span> {i.solution}</p>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono mt-1.5 block">LOGGED: {i.timestamp}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteIdea(i.id)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-900 cursor-pointer"
                          title="Delete Idea"
                          aria-label="Delete Idea"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* CARD 5: Typing Practice (20 Minutes) */}
            <div className="rounded-2xl border border-blue-900/30 bg-[#050b1d] p-6 lg:p-8 flex flex-col justify-between space-y-6 lg:col-span-2 hover:shadow-xl hover:border-blue-800/45 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Left side: Goals and Checklist */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-900/50 flex items-center justify-center text-blue-400">
                        <Keyboard className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">5. Typing Practice</h3>
                        <p className="text-xs text-blue-400/90 font-mono">Duration: 20 Minutes • Goal: 40 WPM+</p>
                      </div>
                    </div>
                    
                    {/* Card Completion Indicator */}
                    <div className="px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-800/20">
                      {typingTasks.filter(t => t.completed).length}/{typingTasks.length} DONE
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm font-light">
                    Harness absolute sensory precision, maintain proper finger position alignment, avoid typos, and break milestones past 40 WPM+.
                  </p>

                  {/* Subtasks List */}
                  <div className="space-y-2.5">
                    {typingTasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => toggleTaskState('typing', task.id)}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          task.completed 
                            ? 'bg-blue-950/20 border-blue-900/40 text-slate-400 opacity-65 line-through' 
                            : 'bg-slate-900/40 border-blue-950/60 hover:bg-slate-900/80 text-white'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                          task.completed 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'border-slate-700 bg-black/40'
                        }`}>
                          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{task.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side: Real interactive Typing Speed tester */}
                <div className="p-5 rounded-2xl bg-[#030713]/80 border border-blue-950 space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-950 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Keyboard Velocity Lab</span>
                    <button 
                      onClick={resetTypingTest} 
                      className="p-1 rounded hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Reset Run"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 bg-black/25 rounded-lg border border-blue-950/50 text-xs sm:text-sm text-slate-300 font-mono text-left leading-relaxed">
                    {passageToType.split('').map((char, index) => {
                      let colorClass = 'text-slate-500';
                      if (index < typedInput.length) {
                        colorClass = typedInput[index] === char ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold underlineUnderline';
                      }
                      return (
                        <span key={index} className={colorClass}>
                          {char}
                        </span>
                      );
                    })}
                  </div>

                  <input
                    type="text"
                    value={typedInput}
                    onChange={handleTypingInput}
                    disabled={isTypeFinished}
                    placeholder="Type the quote above to begin test..."
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-blue-950 bg-black/40 text-white placeholder-slate-600 focus:outline-none focus:border-blue-600/50 font-mono"
                  />

                  {/* Typing results HUD */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-lg border border-blue-950/60 bg-black/20 text-center">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Velocity</span>
                      <span className="text-lg font-bold font-mono text-blue-400">{typeWPM} <span className="text-[10px] text-slate-400">WPM</span></span>
                    </div>
                    <div className="p-3 rounded-lg border border-blue-950/60 bg-black/20 text-center">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Accuracy</span>
                      <span className={`text-lg font-bold font-mono ${typeAccuracy >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>{typeAccuracy}%</span>
                    </div>
                  </div>

                  {isTypeFinished && (
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-center text-xs text-emerald-400 font-medium">
                      ✓ Excellent! Typing Run Completed at {typeWPM} WPM. Keep consistency!
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: MY FUTURE GOALS */}
        <section id="future-goals" className="space-y-8 text-left">
          <div className="border-l-4 border-blue-600 pl-4 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Section 2: My Future Goals
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Long-term strategic roadmap coordinates compiled securely for lifetime learning vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Goal Card 1 */}
            <div className="rounded-2xl border border-blue-955/30 bg-gradient-to-b from-[#04091a] to-[#030612] p-6 hover:border-blue-800/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-900/30 flex items-center justify-center text-blue-400 mb-4">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-white text-sm font-bold leading-snug">Become a Skilled Developer</h3>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed font-light">
                Master core paradigms across HTML, CSS, JavaScript, and advanced library structures.
              </p>
            </div>

            {/* Goal Card 2 */}
            <div className="rounded-2xl border border-blue-955/30 bg-gradient-to-b from-[#04091a] to-[#030612] p-6 hover:border-blue-800/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-900/30 flex items-center justify-center text-blue-400 mb-4">
                <BrainCircuit className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-white text-sm font-bold leading-snug">Learn AI</h3>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed font-light">
                Acquire structural XML prompting, parameters logic, and deployment frameworks.
              </p>
            </div>

            {/* Goal Card 3 */}
            <div className="rounded-2xl border border-blue-955/30 bg-gradient-to-b from-[#04091a] to-[#030612] p-6 hover:border-blue-800/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-900/30 flex items-center justify-center text-blue-400 mb-4">
                <Languages className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-white text-sm font-bold leading-snug">Improve Communication</h3>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed font-light">
                Overcome vocal projection friction and formulate phrases in English with high confidence.
              </p>
            </div>

            {/* Goal Card 4 */}
            <div className="rounded-2xl border border-blue-955/30 bg-gradient-to-b from-[#04091a] to-[#030612] p-6 hover:border-blue-800/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-900/30 flex items-center justify-center text-blue-400 mb-4">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-white text-sm font-bold leading-snug">Build Useful Projects</h3>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed font-light">
                Engineer innovative products and ship real-world, functional client tools.
              </p>
            </div>

            {/* Goal Card 5 */}
            <div className="rounded-2xl border border-blue-955/30 bg-gradient-to-b from-[#04091a] to-[#030612] p-6 hover:border-blue-800/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-900/30 flex items-center justify-center text-blue-400 mb-4">
                <Target className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <h3 className="text-white text-sm font-bold leading-snug">Grow Every Day</h3>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed font-light">
                Sustain high-quality daily habit iterations to foster 1% growth increments.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 3: MOTIVATION */}
        <section id="motivation" className="space-y-8 text-left">
          <div className="border-l-4 border-blue-600 pl-4 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Section 3: Motivation
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Reflections on persistent drive, consistency and building long-term cognitive discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quote 1 */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#060c23]/90 to-[#030612] border border-blue-950/60 p-6 lg:p-8 flex flex-col justify-between">
              <span className="text-4xl font-serif text-blue-900 block select-none leading-none">&ldquo;</span>
              <p className="text-slate-250 italic text-base sm:text-lg leading-relaxed font-light mb-6">
                Small Steps Every Day Lead To Big Success.
              </p>
              <div className="pt-4 border-t border-blue-950/40 flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Kishan&apos;s Affirmation</span>
              </div>
            </div>

            {/* Quote 2 */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#060c23]/90 to-[#030612] border border-blue-950/60 p-6 lg:p-8 flex flex-col justify-between">
              <span className="text-4xl font-serif text-blue-900 block select-none leading-none">&ldquo;</span>
              <p className="text-slate-250 italic text-base sm:text-lg leading-relaxed font-light mb-6">
                Consistency Is More Powerful Than Motivation.
              </p>
              <div className="pt-4 border-t border-blue-950/40 flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Consistency Standard</span>
              </div>
            </div>

            {/* Quote 3 */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#060c23]/90 to-[#030612] border border-blue-950/60 p-6 lg:p-8 flex flex-col justify-between">
              <span className="text-4xl font-serif text-blue-900 block select-none leading-none">&ldquo;</span>
              <p className="text-slate-250 italic text-base sm:text-lg leading-relaxed font-light mb-6">
                Your Future Depends On What You Do Today.
              </p>
              <div className="pt-4 border-t border-blue-950/40 flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Continuous Uplink</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: FUTURE NEXUS AI */}
        <section id="ai-chat" className="space-y-8 text-left mt-16 pt-8 border-t border-blue-950/30">
          <div className="border-l-4 border-blue-600 pl-4 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Bot className="w-8 h-8 text-blue-400 animate-pulse" />
              Section 4: Future Nexus AI
            </h2>
            <p className="text-slate-400 text-sm font-light">
              The core cognitive processor of the lab. Brainstorm software workflows, resolve TypeScript challenges, practice advanced English, or query business telemetry.
            </p>
          </div>

          <div className="w-full rounded-2xl bg-gradient-to-br from-[#060c23]/90 to-[#020510] border border-blue-900/30 shadow-2xl overflow-hidden">
            {/* Chat Control Header */}
            <div className="px-6 py-4 bg-[#030612]/90 border-b border-blue-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="px-3 py-1.5 rounded-lg border border-blue-900/40 bg-blue-950/30 hover:bg-blue-900/40 text-blue-400 hover:text-white transition-all duration-150 cursor-pointer flex items-center gap-2 text-xs font-mono font-bold"
                  title={isSidebarOpen ? "Close Sidebar" : "Open Sessions Sidebar"}
                >
                  {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                  <span>{isSidebarOpen ? "Hide Menu" : "Sessions"}</span>
                </button>
                <div className="flex items-center gap-2">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-sm text-white tracking-wide">FUTURE_NEXUS_V1.1.0</h3>
                    <p className="text-[10px] font-mono text-slate-400">SESSION ID: <span className="text-blue-400 uppercase font-bold">{activeThreadId.slice(-8)}</span></p>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleClearChat}
                className="px-3 py-1.5 rounded-lg border border-red-950/50 bg-red-950/10 hover:bg-red-950/35 hover:border-red-900/50 text-[11px] font-mono text-red-400 transition-all duration-200 cursor-pointer w-full sm:w-auto"
              >
                Flush Session Cache
              </button>
            </div>

            <div className="p-6 flex flex-col lg:flex-row gap-6 relative">
              {/* Backdrop Overlay for Mobile/Tablet */}
              {isSidebarOpen && (
                <div 
                  className="lg:hidden absolute inset-0 bg-[#020510]/85 backdrop-blur-xs z-20 rounded-2xl cursor-pointer"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}

              {/* Left Column: Chat Sessions/Threads Sidebar */}
              {isSidebarOpen && (
                <div className="absolute left-6 top-6 bottom-6 lg:static w-[280px] lg:w-64 shrink-0 flex flex-col gap-4 bg-[#01040a]/95 lg:bg-[#01040a]/75 border border-blue-950/80 lg:border-blue-950/50 rounded-xl p-4 z-30 lg:z-auto shadow-2xl lg:shadow-none transition-all duration-200">
                  {/* Mobile-only Sidebar Header with direct Close Button */}
                  <div className="flex items-center justify-between lg:hidden border-b border-blue-950/40 pb-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Uplink Channels</span>
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(false)}
                      className="px-2 py-1 rounded-md text-red-400 bg-red-950/10 border border-red-950/30 hover:bg-red-950/35 text-xs transition-all duration-150 cursor-pointer"
                    >
                      Close ✕
                    </button>
                  </div>

                  <button
                    onClick={handleNewChat}
                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600/90 to-sky-500/90 hover:from-blue-500 hover:to-sky-400 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 hover:shadow-blue-900/40 transition-all duration-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Uplink Session
                  </button>

                  <div className="flex flex-col gap-1.5 flex-grow max-h-[190px] lg:max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-950 scrollbar-track-transparent">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold mb-1 px-1 hidden lg:block">
                      Uplink Channels ({chatThreads.length})
                    </div>
                    {chatThreads.map((thread) => {
                      const isActive = thread.id === activeThreadId;
                      return (
                        <div
                          key={thread.id}
                          onClick={() => {
                            setActiveThreadId(thread.id);
                            setChatError('');
                            // Auto dismiss sidebar on mobile/tablet after channel selection
                            if (window.innerWidth < 1024) {
                              setIsSidebarOpen(false);
                            }
                          }}
                          className={`group relative flex items-center justify-between p-2.5 rounded-lg border transition-all duration-150 cursor-pointer ${
                            isActive
                              ? 'bg-blue-650/15 border-blue-500/40 text-blue-300'
                              : 'bg-slate-950/30 border-blue-950/20 text-slate-400 hover:text-white hover:bg-slate-900/40 hover:border-blue-900/30'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-8">
                            <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-400 animate-pulse' : 'text-slate-500'}`} />
                            <span className="text-xs truncate font-medium">{thread.title}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteThread(thread.id, e)}
                            className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1 rounded transition-opacity duration-150 absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
                            title="Purge Channel"
                            aria-label="Purge Chat Channel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Center Column: Chat Message Stream */}
              <div className="flex-1 flex flex-col gap-4 min-w-0">
                <div className="h-[460px] overflow-y-auto px-4 py-5 rounded-xl bg-[#010207]/95 border border-blue-950/40 space-y-6 scrollbar-thin scrollbar-thumb-blue-950 scrollbar-track-transparent">
                  {chatMessages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div 
                        key={idx} 
                        className={`flex gap-3 w-full group/msg ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {/* Avatar Column */}
                        {!isUser && (
                          <div className="w-8 h-8 rounded-lg bg-blue-950/50 border border-blue-800/30 flex items-center justify-center shrink-0 self-start mt-1">
                            <Bot className="w-4 h-4 text-blue-400" />
                          </div>
                        )}

                        {/* Content Column */}
                        <div className={`flex flex-col gap-1.5 max-w-[85%] lg:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
                          <div className={`p-3.5 text-sm leading-relaxed ${
                            isUser
                              ? 'bg-[#1b2b4d] border border-blue-500/30 text-white rounded-2xl rounded-tr-sm shadow-md font-sans font-normal break-words max-w-full'
                              : 'bg-transparent border-none text-slate-200 font-sans font-light w-full'
                          }`}>
                            {isUser ? (
                              <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                            ) : (
                              <div className="markdown-body break-words select-text w-full text-left">
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                              </div>
                            )}
                          </div>

                          {/* Action Action Panel for Assistant (AI) reply */}
                          {!isUser && (
                            <div className="flex items-center gap-1.5 ml-1 mt-0.5 opacity-80 group-hover/msg:opacity-100 transition-opacity duration-200">
                              <button 
                                type="button"
                                onClick={() => handleCopyMessage(msg.text, idx)}
                                className="p-1 rounded hover:bg-blue-950/60 hover:text-white transition-colors duration-150 relative text-slate-500 cursor-pointer" 
                                title="Copy reply"
                              >
                                {copiedIndex === idx ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              
                              <button 
                                type="button"
                                onClick={() => handleReaction(idx, 'like')}
                                className={`p-1 rounded hover:bg-blue-950/60 transition-colors duration-150 cursor-pointer ${reactions[`${activeThreadId}_${idx}`] === 'like' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500'}`}
                                title="Good response"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>

                              <button 
                                type="button"
                                onClick={() => handleReaction(idx, 'dislike')}
                                className={`p-1 rounded hover:bg-blue-950/60 transition-colors duration-150 cursor-pointer ${reactions[`${activeThreadId}_${idx}`] === 'dislike' ? 'text-red-400 bg-red-500/10' : 'text-slate-500'}`}
                                title="Bad response"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>

                              <button 
                                type="button"
                                onClick={() => handleToggleSpeech(msg.text, idx)}
                                className={`p-1 rounded hover:bg-blue-950/60 transition-colors duration-150 cursor-pointer ${speakingIndex === idx ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500'}`}
                                title="Read response aloud"
                              >
                                {speakingIndex === idx ? (
                                  <VolumeX className="w-3.5 h-3.5" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5" />
                                )}
                              </button>

                              <button 
                                type="button"
                                onClick={handleShareMessage}
                                className="p-1 rounded hover:bg-blue-950/60 hover:text-white transition-colors duration-150 text-slate-500 cursor-pointer"
                                title="Share reply"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* User Avatar Column (right) */}
                        {isUser && (
                          <div className="w-8 h-8 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 self-start mt-1">
                            <span>KM</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {isChatLoading && (
                    <div className="flex gap-3 max-w-[80%] justify-start">
                      <div className="w-8 h-8 rounded-lg bg-blue-950/50 border border-blue-800/30 flex items-center justify-center text-blue-400 shrink-0 self-start mt-1">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      </div>
                      <div className="px-4 py-3 bg-[#030612]/40 rounded-xl rounded-tl-none border border-blue-950/20 text-xs text-slate-400 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        Synthesizing response...
                      </div>
                    </div>
                  )}
                  {chatError && (
                    <div className="p-3.5 rounded-lg border border-red-950/55 bg-red-950/10 text-xs text-red-400 font-mono">
                      [ERROR]: {chatError}
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input & Controllers */}
                <form onSubmit={handleSendChatMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask Future Nexus anything... (e.g. 'Give me an idiom for dedication')"
                    className="flex-1 bg-slate-950/90 border border-blue-950/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200"
                    disabled={isChatLoading}
                  />
                  <button
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="px-5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium hover:from-blue-500 hover:to-sky-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Sidebar Quick Prompts */}
              <div className="w-full lg:w-72 bg-[#02050f]/85 border border-blue-950/40 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1 pb-2 border-b border-blue-950/45">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold">Suggested Prompts</span>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleSendChatMessage(undefined, "Suggest a professional English vocabulary word with an elegant sentence template.")}
                  className="w-full text-left p-2.5 rounded-lg border border-blue-950/50 hover:border-blue-800/40 bg-slate-950/30 hover:bg-blue-950/20 text-xs text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  💡 English Vocabulary Word
                </button>
                <button
                  type="button"
                  onClick={() => handleSendChatMessage(undefined, "Give me a robust TypeScript optimization idiom that top-tier startups use.")}
                  className="w-full text-left p-2.5 rounded-lg border border-blue-950/50 hover:border-blue-800/40 bg-slate-950/30 hover:bg-blue-950/20 text-xs text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  💻 TypeScript Optimization Idiom
                </button>
                <button
                  type="button"
                  onClick={() => handleSendChatMessage(undefined, "Let's brainstorm a micro-startup software concept. What is a common pain point we can build a simple beautiful web app for?")}
                  className="w-full text-left p-2.5 rounded-lg border border-blue-950/50 hover:border-blue-800/40 bg-slate-950/30 hover:bg-blue-950/20 text-xs text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  🚀 Micro-Startup SaaS Idea
                </button>
                <button
                  type="button"
                  onClick={() => handleSendChatMessage(undefined, "How can I enhance my touch typing velocity while maintaining high accuracy? What is the ideal hand rest position?")}
                  className="w-full text-left p-2.5 rounded-lg border border-blue-950/50 hover:border-blue-800/40 bg-slate-950/30 hover:bg-blue-950/20 text-xs text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  ⌨️ Typing Velocity Tips
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#02040b] border-t border-blue-950/40 py-10 text-center text-xs mt-16 font-mono text-slate-500" aria-label="Footer Area">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <p className="text-[12px] font-semibold text-slate-350 max-w-sm mb-1 leading-relaxed">
            &ldquo;Roz thoda seekho, ek din bahut aage pahunch jaoge.&rdquo;
          </p>
          <p className="text-xs text-white hover:text-blue-400 transition-colors duration-200">
            Created by <span className="font-semibold text-blue-400">Kishan Maurya</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Kishan&apos;s Future Lab &mdash; Learning Every Day, Building My Future
          </p>
          <p className="text-[10px] text-slate-600 mt-1">
            © {new Date().getFullYear()} Kishan&apos;s Future Lab • Absolute Consistency Grid
          </p>
        </div>
      </footer>

      {/* Dynamic Streak Boost Toast Notification */}
      {showStreakCelebration && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm bg-gradient-to-r from-amber-600/90 to-blue-600/90 border border-amber-500/40 p-4 rounded-xl shadow-2xl backdrop-blur-md animate-bounce flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse fill-amber-500/20" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono text-amber-200 uppercase tracking-widest font-bold">STREAK BOOSTER ACTIVE</div>
            <div className="text-sm font-semibold text-white">Streak increased to <span className="text-amber-400 text-base font-extrabold">{currentStreak} Days</span>!</div>
            <div className="text-[10px] text-blue-100 font-light font-mono mt-0.5">Momentum level: Active Loop</div>
          </div>
        </div>
      )}

    </div>
  );
}
