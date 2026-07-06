import { urls } from '@/data/urls';
import { siteMeta } from '@/data/site';

export const projectsSection = {
  kicker: 'PROJECTS',
  title: ['PUBLIC', 'BUILDS'],
  description: 'A growing shelf of tools and systems I actually use.',
  githubLink: { label: 'View all on GitHub', href: urls.github },
} as const;

export const learningSection = {
  kicker: 'WRITING / LEARNING TRAIL',
  routeLegend: ['Capture', 'Think', 'Write', 'Share'],
  stamp: 'KEEP BUILDING',
  title: ['LEARNING', 'TRAIL'],
  description: 'AI, agents, products, and the notes left behind while building.',
  copyZh: '把学习过程留下来，也把问题意识做出来。',
  actions: [
    { label: 'READ NOTES', href: urls.blog, variant: 'ghost' as const },
    { label: 'BLOG', href: urls.blog, variant: 'inline' as const },
  ],
  howItWorks: [
    { step: 'Capture', text: '记录灵感与问题' },
    { step: 'Think', text: '拆解与学习' },
    { step: 'Write', text: '整理成文章与笔记' },
    { step: 'Share', text: '发布与交流' },
  ],
} as const;

export const footerSection = {
  portalTitle: `${siteMeta.name} PORTAL`,
  portalLines: [['THANKS FOR', 'EXPLORING.'], ['SEE YOU ON', 'THE OTHER SIDE.']],
  exitLabel: 'EXIT',
  title: ['FOLLOW', 'THE', 'TRAIL'],
  copy: `Work, writing, code, and small signals from ${siteMeta.name}.`,
  githubBanner: { label: 'OPEN GITHUB', href: urls.github },
  bottomNav: ['▲ TOP', '01 HERO', '02 ABOUT', '03 WORK', '04 ELSEWHERE', '05 EXIT'],
} as const;
