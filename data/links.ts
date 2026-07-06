export type ExternalLink = {
  key: 'BLOG' | 'JUEJIN' | 'CODE' | 'WECHAT' | 'SOCIAL';
  name: string;
  hint: string;
  href: string;
};

export const links: ExternalLink[] = [
  {
    key: 'BLOG',
    name: '博客',
    hint: 'blog.laifuyou.com',
    href: 'https://blog.laifuyou.com',
  },
  {
    key: 'JUEJIN',
    name: '掘金',
    hint: '技术分析与实践复盘',
    href: 'https://juejin.cn/user/1204720476890477',
  },
  {
    key: 'CODE',
    name: 'GitHub',
    hint: 'JS-banana · 55 repos',
    href: 'https://github.com/JS-banana',
  },
  {
    key: 'WECHAT',
    name: '公众号',
    hint: '孙小帅 kk',
    href: '/wechat.png',
  },
  {
    key: 'SOCIAL',
    name: 'Twitter / X',
    hint: '@pandionkk',
    href: 'https://x.com/pandionkk',
  },
];
