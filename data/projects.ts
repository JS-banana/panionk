export type Project = {
  name: string;
  /** 一句话，尽量短 */
  desc: string;
  href: string;
  schemaType: 'WebApplication' | 'SoftwareApplication';
  applicationCategory: string;
  /** 取自项目仓库或线上站点；没有独立图标时显示字符标记 */
  icon: string | null;
  /** 无图标时的圆形文字标记，避免与下方项目名重复 */
  monogram?: string;
};

export const projects: Project[] = [
  {
    name: '好价清单',
    desc: '查软件优惠，对比首期价和续费价',
    href: 'https://deals.laifuyou.com/zh',
    schemaType: 'WebApplication',
    applicationCategory: 'ShoppingApplication',
    icon: '/assets/projects/deal-index.png',
  },
  {
    name: 'AI 活动雷达',
    desc: '精选可报名的 AI 黑客松、资助与免费额度',
    href: 'https://airadar.laifuyou.com/zh',
    schemaType: 'WebApplication',
    applicationCategory: 'UtilitiesApplication',
    icon: '/assets/projects/airadar.png',
  },
  {
    name: '图片工具箱',
    desc: '跑在浏览器里的 OCR 与图片处理工具',
    href: 'https://img.laifuyou.com/',
    schemaType: 'WebApplication',
    applicationCategory: 'UtilitiesApplication',
    icon: '/assets/projects/image-tools.png',
  },
  {
    name: "Let's Do",
    desc: '在 Mac 上随手记待办，按周排进日历',
    href: 'https://github.com/JS-banana/lets-do',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    icon: '/assets/projects/lets-do.png',
  },
  {
    name: 'AmberKeeper',
    desc: '本地优先的 AI 对话知识库',
    href: 'https://github.com/JS-banana/AmberKeeper',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    icon: '/assets/projects/amberkeeper.png',
  },
  {
    name: 'AGY HUD',
    desc: '在 Antigravity CLI 看上下文和剩余额度',
    href: 'https://github.com/JS-banana/agy-hud',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
    icon: null,
    monogram: 'HUD',
  },
];
