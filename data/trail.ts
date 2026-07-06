import { urls } from '@/data/urls';

export type TrailCard = {
  title: string;
  meta: string;
  text: string;
  href: string;
  items: string[];
};

export const trailCards: TrailCard[] = [
  {
    title: '博客',
    meta: 'blog.laifuyou.com',
    text: '后续主要沉淀 AI、Agent、全栈应用和产品实践，也记录长期技术思考。',
    href: urls.blog,
    items: ['AI 应用', 'Agent 实践', '全栈产品'],
  },
  {
    title: '公众号',
    meta: '孙小帅 kk',
    text: '用更易懂的大白话，记录 AI 应用开发、产品思维、生活体验和创造者视角。',
    href: urls.wechat,
    items: ['生活感悟', '技术大白话', '创造者视角'],
  },
  {
    title: '掘金',
    meta: 'juejin.cn',
    text: '在掘金记录技术分析、实践拆解和社区交流。',
    href: urls.juejin,
    items: ['技术分析', '实践复盘', '社区交流'],
  },
  {
    title: '项目实践',
    meta: 'github.com/JS-banana',
    text: '把想法做成可运行的产品和工具，在真实使用里继续迭代。',
    href: urls.github,
    items: ['AI Tools', 'Product Systems', 'Real-world Test'],
  },
];
