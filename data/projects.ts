export type Project = {
  name: string;
  zh: string;
  en: string;
  labels: string[];
  href: string;
  coinCount: number;
};

export const projects: Project[] = [
  {
    name: 'ANYCHAT',
    zh: '多 AI 聚合桌面客户端',
    en: 'Multi-AI chat aggregator for desktop',
    labels: ['AI Tool', 'Desktop App'],
    href: 'https://github.com/JS-banana/anychat',
    coinCount: 24,
  },
  {
    name: 'AMBERKEEPER',
    zh: '本地优先的 AI 对话知识库',
    en: 'Local-first workspace for AI conversations',
    labels: ['Local-first', 'Knowledge Workflow'],
    href: 'https://github.com/JS-banana/AmberKeeper',
    coinCount: 31,
  },
];
