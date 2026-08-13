export type Project = {
  name: string;
  /** 一句话，尽量短 */
  desc: string;
  href: string;
  /** 项目自己的应用图标，取自各仓库，见 public/assets/projects/ */
  icon: string;
};

export const projects: Project[] = [
  {
    name: 'anychat',
    desc: '多 AI 聚合桌面客户端',
    href: 'https://github.com/JS-banana/anychat',
    icon: '/assets/projects/anychat.png',
  },
  {
    name: 'AmberKeeper',
    desc: '本地优先的 AI 对话知识库',
    href: 'https://github.com/JS-banana/AmberKeeper',
    icon: '/assets/projects/amberkeeper.png',
  },
  {
    name: 'ocr-app',
    desc: '跑在浏览器里的 OCR 工具',
    href: 'https://github.com/JS-banana/ocr-app',
    icon: '/assets/projects/ocr-app.png',
  },
];
