export type Project = {
  name: string;
  /** 一句话，尽量短 */
  desc: string;
  href: string;
  applicationCategory: string;
  /** 取自项目仓库；没有独立图标时显示项目名 */
  icon: string | null;
};

export const projects: Project[] = [
  {
    name: 'AGY HUD',
    desc: '在 Antigravity CLI 看上下文和剩余额度',
    href: 'https://github.com/JS-banana/agy-hud',
    applicationCategory: 'DeveloperApplication',
    icon: null,
  },
  {
    name: '好价清单',
    desc: '查软件优惠，对比首期价和续费价',
    href: 'https://deals.laifuyou.com/zh',
    applicationCategory: 'ShoppingApplication',
    icon: '/assets/projects/deal-index.png',
  },
  {
    name: 'Let’s Do',
    desc: '在 Mac 上随手记待办，按周排进日历',
    href: 'https://github.com/JS-banana/lets-do',
    applicationCategory: 'BusinessApplication',
    icon: '/assets/projects/lets-do.png',
  },
  {
    name: 'anychat',
    desc: '多 AI 聚合桌面客户端',
    href: 'https://github.com/JS-banana/anychat',
    applicationCategory: 'CommunicationApplication',
    icon: '/assets/projects/anychat.png',
  },
  {
    name: 'AmberKeeper',
    desc: '本地优先的 AI 对话知识库',
    href: 'https://github.com/JS-banana/AmberKeeper',
    applicationCategory: 'BusinessApplication',
    icon: '/assets/projects/amberkeeper.png',
  },
  {
    name: 'ocr-app',
    desc: '跑在浏览器里的 OCR 工具',
    href: 'https://github.com/JS-banana/ocr-app',
    applicationCategory: 'UtilitiesApplication',
    icon: '/assets/projects/ocr-app.png',
  },
];
