import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

/* 静态导出要求元数据路由显式声明为静态 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
