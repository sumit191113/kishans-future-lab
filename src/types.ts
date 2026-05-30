export interface LearningTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface LearningCard {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  image: string;
  tasks: LearningTask[];
  pathway?: string[];
  currentWeekChallenge?: LearningTask[];
  streakTracker?: {
    days: number;
    unlockedMilestones: string[];
  };
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  tag: string;
  completed: boolean;
  demoUrl?: string;
  category: string;
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Design' | 'AI & Tools';
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
}
