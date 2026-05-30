import React from 'react';
import {
  Languages,
  Code2,
  Cpu,
  BrainCircuit,
  BookOpen,
  Zap,
  Sparkles,
  Layers,
  Eye,
  Github,
  MonitorPlay,
  ChevronRight,
  Check,
  CheckSquare,
  Square,
  Flame,
  Trophy,
  Calendar,
  ArrowUpRight,
  Lock,
  Unlock,
  Play,
  Users,
  Mail,
  Phone,
  MapPin,
  Rocket,
  Star,
  Compass,
  Heart,
  Target,
  Send,
  User,
  GraduationCap
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Languages,
  Code2,
  Cpu,
  BrainCircuit,
  BookOpen,
  ZapTracker: Zap,
  Zap,
  Sparkles,
  Layers,
  Eye,
  Github,
  MonitorPlay,
  ChevronRight,
  Check,
  CheckSquare,
  Square,
  Flame,
  Trophy,
  Calendar,
  ArrowUpRight,
  Lock,
  Unlock,
  Play,
  Users,
  Mail,
  Phone,
  MapPin,
  Rocket,
  Star,
  Compass,
  Heart,
  Target,
  Send,
  User,
  GraduationCap
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className = '', size = 20 }) => {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} size={size} />;
};
