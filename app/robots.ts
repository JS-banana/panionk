import type { MetadataRoute } from 'next';

/* 静态导出要求元数据路由显式声明为静态 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}
