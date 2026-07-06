export const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Notes', href: '#learning' },
  { label: 'Elsewhere', href: '#elsewhere' },
] as const;

export const identityChips = [
  { label: 'AI Applications', icon: 'brain-circuit' },
  { label: 'Agent Workflows', icon: 'network' },
  { label: 'Product Thinking', icon: 'box' },
  { label: 'Creative Execution', icon: 'sparkles' },
] as const;

export const siteMeta = {
  name: 'PANIONK',
  title: 'PANIONK — AI Builder & Agent Maker',
  city: 'Hangzhou',
  year: '2026',
  tagline: 'AI BUILDER / AGENT MAKER / PRODUCT-MINDED DEVELOPER',
  description:
    '关注 AI 与智能体，把想法做成可以运行的应用。AI Builder · Agent Maker · Product-minded Developer',
  locale: 'zh_CN',
} as const;
