import { LearningCard, ProjectEntry, SkillItem, TimelineEvent } from './types';

export const INITIAL_LEARNING_CARDS: LearningCard[] = [
  {
    id: 'learn-english',
    title: 'Learn English',
    tagline: 'Master fluency, expand vocabulary, and speak with confidence.',
    iconName: 'Languages',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop',
    tasks: [
      { id: 'le-t1', text: 'Learn 10 new words', completed: false },
      { id: 'le-t2', text: 'Speak 5 sentences in English', completed: false },
      { id: 'le-t3', text: 'Read one short English article', completed: false },
      { id: 'le-t4', text: 'Watch one English video with subtitles', completed: false },
      { id: 'le-t5', text: 'Write 5 lines about your day', completed: false }
    ],
    currentWeekChallenge: [
      { id: 'le-w1', text: 'Learn 70 words', completed: false },
      { id: 'le-w2', text: 'Write one paragraph', completed: false },
      { id: 'le-w3', text: 'Speak for 2 minutes in English', completed: false }
    ]
  },
  {
    id: 'practice-coding',
    title: 'Practice Coding',
    tagline: 'Solve real algorithmic problems and build coding muscle memory daily.',
    iconName: 'Code2',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop',
    tasks: [
      { id: 'pc-t1', text: '30 minutes coding practice', completed: false },
      { id: 'pc-t2', text: 'Learn one new concept', completed: false },
      { id: 'pc-t3', text: 'Write 20 lines of code', completed: false },
      { id: 'pc-t4', text: 'Fix one problem', completed: false },
      { id: 'pc-t5', text: "Save today's work", completed: false }
    ],
    pathway: ['HTML', 'CSS', 'JavaScript', 'Python', 'App Development', 'AI Development']
  },
  {
    id: 'build-projects',
    title: 'Build Projects',
    tagline: 'Build innovative products and ship real-world functional tools.',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop',
    tasks: [
      { id: 'bp-t1', text: 'Personal Website', completed: false },
      { id: 'bp-t2', text: 'AI Assistant', completed: false },
      { id: 'bp-t3', text: 'Calculator App', completed: false },
      { id: 'bp-t4', text: 'Toonz Tadka Website', completed: false },
      { id: 'bp-t5', text: 'Portfolio Website', completed: false }
    ]
  },
  {
    id: 'learn-ai',
    title: 'Learn AI',
    tagline: 'Dive into Prompt Engineering, Neural Networks, and AI deployment.',
    iconName: 'BrainCircuit',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    tasks: [
      { id: 'la-t1', text: 'Learn one AI concept', completed: false },
      { id: 'la-t2', text: 'Create one prompt', completed: false },
      { id: 'la-t3', text: 'Generate one image', completed: false },
      { id: 'la-t4', text: 'Explore one AI tool', completed: false },
      { id: 'la-t5', text: 'Save your best prompt', completed: false }
    ],
    pathway: ['Prompt Engineering', 'AI Tools', 'Automation', 'AI Apps', 'AI Business']
  },
  {
    id: 'read-something-new',
    title: 'Read Something New',
    tagline: 'Absorb digital literature and expand your horizons every day.',
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop',
    tasks: [
      { id: 'rs-t1', text: 'Read 10 pages', completed: false },
      { id: 'rs-t2', text: 'Learn one new idea', completed: false },
      { id: 'rs-t3', text: 'Save important notes', completed: false },
      { id: 'rs-t4', text: 'Share what you learned', completed: false }
    ]
  },
  {
    id: 'stay-consistent',
    title: 'Stay Consistent',
    tagline: 'The exponential power of routine: learn, build, repeat.',
    iconName: 'ZapTracker',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop',
    tasks: [
      { id: 'sc-t1', text: 'Learn', completed: false },
      { id: 'sc-t2', text: 'Practice', completed: false },
      { id: 'sc-t3', text: 'Build', completed: false },
      { id: 'sc-t4', text: 'Improve', completed: false },
      { id: 'sc-t5', text: 'Repeat', completed: false }
    ],
    streakTracker: {
      days: 5,
      unlockedMilestones: ['Day 1']
    }
  }
];

export const PORTFOLIO_PROJECTS: ProjectEntry[] = [
  {
    id: 'p-toonz',
    title: 'Toonz Tadka Website',
    description: 'A premium, highly animated media portal displaying creative custom animations, high-speed rendering pipelines, and detailed video portfolios.',
    tag: 'Next.js & Framer-Motion',
    completed: true,
    demoUrl: '#',
    category: 'Interactive Media'
  },
  {
    id: 'p-ai-assistant',
    title: 'AI Smart Assistant',
    description: 'A sophisticated dashboard using server-side Gemini API models to assist in semantic search, interactive language mastery, and system summaries.',
    tag: 'TypeScript & Express',
    completed: false,
    demoUrl: '#',
    category: 'Artificial Intelligence'
  },
  {
    id: 'p-personal-web',
    title: 'Personal Web Core',
    description: 'The elegant high-performance interactive homepage mimicking design values from Tesla, Apple, and OpenAI.',
    tag: 'Vite & Tailwind CSS',
    completed: true,
    demoUrl: '#',
    category: 'Frontend Engineering'
  },
  {
    id: 'p-calc',
    title: 'Holographic Calculator',
    description: 'A gorgeous, high-contrast digital calculator with math parsing engine and physical audio feedback clicks.',
    tag: 'React TS',
    completed: false,
    demoUrl: '#',
    category: 'Utility'
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  { name: 'React & TypeScript', level: 95, category: 'Frontend', icon: 'Code2' },
  { name: 'Tailwind CSS', level: 98, category: 'Frontend', icon: 'Sparkles' },
  { name: 'Next.js & Vite', level: 90, category: 'Frontend', icon: 'Cpu' },
  { name: 'Express / Node.js', level: 85, category: 'Backend', icon: 'Layers' },
  { name: 'Prompt Engineering', level: 92, category: 'AI & Tools', icon: 'BrainCircuit' },
  { name: 'Motion (Animations)', level: 88, category: 'Design', icon: 'Milestone' },
  { name: 'Holographic UI/UX', level: 82, category: 'Design', icon: 'Eye' },
  { name: 'Git & Agile Auth', level: 80, category: 'AI & Tools', icon: 'Github' }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2026',
    title: 'Cognitive Hyper-Growth & AI Integration Mastery',
    company: 'PHASE I // INCUBATION',
    description: 'Optimizing daily learning routine systems, implementing high-contrast focus modules, and compounding personal development through automated task trackers.',
    icon: 'Cpu'
  },
  {
    year: '2027',
    title: 'Fluent Global Bilingual Eloquence',
    company: 'PHASE II // AMPLIFICATION',
    description: 'Bypassing communication bottlenecks by achieving top-tier fluid English mastery, publishing digital manuals, and mentoring international product cells.',
    icon: 'Sparkles'
  },
  {
    year: '2028',
    title: 'Launching Autonomous SaaS Micro-Products',
    company: 'PHASE III // INDEPENDENCE',
    description: 'Shipping fully self-sustaining interactive web nodes, combining Math-parser tools with reactive design methodologies, and achieving organic digital scaling.',
    icon: 'Rocket'
  },
  {
    year: '2029',
    title: 'Custom Cognitive Models & Prompt Ecosystems',
    company: 'PHASE IV // AUGMENTATION',
    description: 'Pioneering custom neural prompting agents, embedding personalized memory graphs in client frameworks, and training the next generation of visual architects.',
    icon: 'BrainCircuit'
  },
  {
    year: '2030',
    title: 'Unified Growth OS Sovereign Node',
    company: 'PHASE V // SOVEREIGNTY',
    description: 'Total integration of creative expression, scalable code networks, global decentralized consulting, and absolute self-directed research frameworks.',
    icon: 'Compass'
  }
];
