export type ProjectGroup = 'website' | 'software';

export type Project = {
  name: string;
  /** 一句话，尽量短 */
  desc: string;
  href: string;
  group: ProjectGroup;
  schemaType: 'Blog' | 'WebApplication' | 'SoftwareApplication';
  applicationCategory?: string;
  /** 取自项目仓库或线上站点；没有独立图标时显示字符标记 */
  icon: string | null;
  /** 无图标时的圆形文字标记，避免与下方项目名重复 */
  monogram?: string;
};

export const projects: Project[] = [
  {
    name: '个人博客',
    desc: '记录技术思考、AI 实践与日常随笔',
    href: 'https://blog.laifuyou.com',
    group: 'website',
    schemaType: 'Blog',
    icon: '/assets/projects/blog.png',
  },
  {
    name: '好价清单',
    desc: '查软件优惠，对比首期价和续费价',
    href: 'https://deals.laifuyou.com/zh',
    group: 'website',
    schemaType: 'WebApplication',
    applicationCategory: 'ShoppingApplication',
    icon: '/assets/projects/deal-index.png',
  },
  {
    name: '图片工具箱',
    desc: '跑在浏览器里的 OCR 与图片处理工具',
    href: 'https://img.laifuyou.com/',
    group: 'website',
    schemaType: 'WebApplication',
    applicationCategory: 'UtilitiesApplication',
    icon: '/assets/projects/image-tools.png',
  },
  {
    name: '想法墙',
    desc: '看看大家想要什么，又有谁已经把它做出来了',
    href: 'https://ideas.laifuyou.com/',
    group: 'website',
    schemaType: 'WebApplication',
    applicationCategory: 'SocialNetworkingApplication',
    icon: '/assets/projects/any-ideas.png',
  },
  {
    name: "Let's Do",
    desc: '在 Mac 上随手记待办，按周排进日历',
    href: 'https://github.com/JS-banana/lets-do',
    group: 'software',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    icon: '/assets/projects/lets-do.png',
  },
  {
    name: 'anychat',
    desc: '多 AI 聚合桌面客户端',
    href: 'https://github.com/JS-banana/anychat',
    group: 'software',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'CommunicationApplication',
    icon: '/assets/projects/anychat.png',
  },
  {
    name: 'AmberKeeper',
    desc: '本地优先的 AI 对话知识库',
    href: 'https://github.com/JS-banana/AmberKeeper',
    group: 'software',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    icon: '/assets/projects/amberkeeper.png',
  },
  {
    name: 'AGY HUD',
    desc: '在 Antigravity CLI 看上下文和剩余额度',
    href: 'https://github.com/JS-banana/agy-hud',
    group: 'software',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
    icon: '/assets/projects/agy-hud.png',
  },
];
