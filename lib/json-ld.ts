import { projects } from '@/data/projects';
import { siteMeta } from '@/data/site';
import { urls } from '@/data/urls';
import { siteUrl } from '@/lib/site-url';

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteMeta.name,
        description: siteMeta.description,
        inLanguage: 'zh-CN',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: siteMeta.name,
        alternateName: siteMeta.nameZh,
        url: siteUrl,
        jobTitle: 'AI Builder',
        description: siteMeta.description,
        sameAs: [urls.github, urls.blog, urls.juejin, urls.x],
        knowsAbout: ['Artificial Intelligence', 'AI Agents', 'Product Development'],
      },
      ...projects.map(project => ({
        '@type': project.schemaType,
        name: project.name,
        description: project.desc,
        url: project.href,
        ...(project.applicationCategory ? { applicationCategory: project.applicationCategory } : {}),
        author: { '@id': `${siteUrl}/#person` },
      })),
    ],
  };
}
