export type ExternalLink = {
  key: 'BLOG' | 'JUEJIN' | 'CODE' | 'SOCIAL';
  name: string;
  hint: string;
  href: string;
};

export const links: ExternalLink[] = [
  {
    key: 'BLOG',
    name: '技术博客',
    hint: 'ssscode.com',
    href: 'https://js-banana.github.io/blog',
  },
  {
    key: 'JUEJIN',
    name: '掘金',
    hint: '前端技术分享',
    href: 'https://juejin.cn/user/1204720476890477',
  },
  {
    key: 'CODE',
    name: 'GitHub',
    hint: 'JS-banana · 55 repos',
    href: 'https://github.com/JS-banana',
  },
  {
    key: 'SOCIAL',
    name: 'Twitter / X',
    hint: '@sunshuaishuai5',
    href: 'https://x.com/sunshuaishuai5',
  },
];
