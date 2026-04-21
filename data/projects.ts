export type Project = {
  name: string;
  tag: string;
  zh: string;
  en: string;
  stack: string[];
  atk: number;
  def: number;
  stars?: number;
  href: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    name: 'ANYCHAT',
    tag: 'DESKTOP APP',
    zh: '多 AI 聚合桌面客户端',
    en: 'Multi-AI chat aggregator for desktop',
    stack: ['TypeScript', 'Tauri', 'React'],
    atk: 82,
    def: 68,
    stars: 7,
    href: 'https://github.com/JS-banana/anychat',
  },
  {
    name: 'AMBERKEEPER',
    tag: 'DESKTOP APP',
    zh: '本地优先的 AI 对话知识库',
    en: 'Local-first workspace for AI conversations',
    stack: ['TypeScript', 'Electron'],
    atk: 64,
    def: 80,
    href: 'https://github.com/JS-banana/AmberKeeper',
  },
  {
    name: '??? COMING SOON',
    tag: 'NEW QUEST',
    zh: '解锁中',
    en: 'NEW QUEST UNLOCKED',
    stack: [],
    atk: 0,
    def: 0,
    href: '#making',
    placeholder: true,
  },
];
