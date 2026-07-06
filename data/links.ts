import { urls } from '@/data/urls';

export type FooterLinkIcon = 'github' | 'file-text' | 'message-circle' | 'pen-line' | 'globe-2';

export type FooterLink = {
  label: string;
  hint: string;
  href: string;
  icon: FooterLinkIcon;
};

export const footerLinks: FooterLink[] = [
  { label: 'GitHub', hint: 'JS-banana', href: urls.github, icon: 'github' },
  { label: 'Blog', hint: 'blog.laifuyou.com', href: urls.blog, icon: 'file-text' },
  { label: 'WeChat', hint: '孙小帅 kk', href: urls.wechat, icon: 'message-circle' },
  { label: 'Juejin', hint: '技术分析与实践复盘', href: urls.juejin, icon: 'pen-line' },
  { label: 'X', hint: '@pandionkk', href: urls.x, icon: 'globe-2' },
];
