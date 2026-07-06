import { urls } from '@/data/urls';

export const heroHudPills = [
  { label: 'AI Maker', icon: 'bot' },
  { label: 'Agent Practice', icon: 'network' },
  { label: 'HZ - 26', icon: 'crosshair' },
  { label: 'Build Log', icon: 'file-text' },
] as const;

export const heroContent = {
  copyZh: '关注 AI 与智能体，把想法做成可以运行的应用。',
  copyEn: 'Building AI tools, agent workflows, and useful small products.',
  primaryCta: { label: 'Explore work', href: '#projects' },
  secondaryCta: { label: 'GitHub', href: urls.github },
  scrollCue: 'SCROLL TO COLLECT',
  dragLabel: 'DRAG TO BUILD',
  archiveMapLabel: 'ARCHIVE MAP',
} as const;
