export type Project = {
  name: string;
  tag: string;
  zh: string;
  en: string;
  labels: string[];
  stars?: number;
  href: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    name: 'ANYCHAT',
    tag: 'AI TOOL',
    zh: '多 AI 聚合桌面客户端',
    en: 'Multi-AI chat aggregator for desktop',
    labels: ['AI Tool', 'Desktop App'],
    stars: 7,
    href: 'https://github.com/JS-banana/anychat',
  },
  {
    name: 'AMBERKEEPER',
    tag: 'LOCAL-FIRST',
    zh: '本地优先的 AI 对话知识库',
    en: 'Local-first workspace for AI conversations',
    labels: ['Local-first', 'Knowledge Workflow'],
    href: 'https://github.com/JS-banana/AmberKeeper',
  },
];
