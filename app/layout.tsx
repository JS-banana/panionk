import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { siteMeta } from '@/data/site';
import { siteJsonLd } from '@/lib/json-ld';
import { siteUrl } from '@/lib/site-url';
import './globals.css';

/**
 * 自托管的拉丁子集，不走 Google CDN——相当一部分读者在国内。
 * 中文没有对应字形，会自动回落到系统无衬线，字体反差就是这么形成的。
 */
const plexMono = localFont({
  src: [
    { path: '../public/fonts/ibm-plex-mono-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/ibm-plex-mono-latin-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  /* 分享图由 app/opengraph-image.tsx 生成，Next 会自动挂到 og:image 与 twitter:image */
  openGraph: {
    type: 'website',
    locale: siteMeta.locale,
    url: '/',
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={plexMono.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
