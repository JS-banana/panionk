import type { ProjectGroup } from '@/data/projects';

export type ProjectSectionConfig = {
  id: string;
  group: ProjectGroup;
  title: string;
  moreLabel?: string;
  moreHref?: string;
};

export const projectSections: ProjectSectionConfig[] = [
  {
    id: 'websites',
    group: 'website',
    title: '网站',
  },
  {
    id: 'tools',
    group: 'software',
    title: '软件工具',
    moreLabel: '全部仓库 →',
    moreHref: 'https://github.com/JS-banana?tab=repositories',
  },
];
