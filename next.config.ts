import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 站点全部是预渲染的静态页，导出成 out/ 交给 nginx 托管，前面挂 Cloudflare */
  output: 'export',
  images: {
    /* 静态导出没有运行时的图片优化服务，图片按原样输出 */
    unoptimized: true,
  },
};

export default nextConfig;
