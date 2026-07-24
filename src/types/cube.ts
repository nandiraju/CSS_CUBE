export type FaceId = 'home' | 'features' | 'about' | 'contact' | 'gallery' | 'settings';

export interface FaceConfig {
  id: FaceId;
  title: string;
  subtitle: string;
  badge: string;
  rotateX: number;
  rotateY: number;
}

export type ThemeVariant = 'clean-white' | 'warm-white' | 'nordic-light' | 'glass-white';

export interface CubeSettings {
  perspective: number; // in px
  transitionSpeed: number; // in seconds
  autoRotate: boolean;
  theme: ThemeVariant;
  backfaceVisibility: boolean;
  shadowsEnabled: boolean;
  depthScale: number;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
  codeSnippet?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}
