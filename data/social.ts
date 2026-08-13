import { brandIcons } from '@/data/icons';
import { urls } from '@/data/urls';

export type SocialLink = {
  /** 无障碍名称，同时作为 hover 提示 */
  label: string;
  icon: keyof typeof brandIcons;
  href?: string;
  /** 公众号不是外链，点击后弹出图片 */
  kind?: 'wechat';
};

export const socialLinks: SocialLink[] = [
  { label: '博客', icon: 'rss', href: urls.blog },
  { label: 'GitHub', icon: 'github', href: urls.github },
  { label: '掘金', icon: 'juejin', href: urls.juejin },
  { label: 'X', icon: 'x', href: urls.x },
  { label: '公众号', icon: 'wechat', kind: 'wechat' },
];
