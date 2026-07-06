import type { Metadata } from 'next';
import { Oswald, Space_Mono } from 'next/font/google';
import { siteMeta } from '@/data/site';
import { siteJsonLd } from '@/lib/json-ld';
import { siteUrl } from '@/lib/site-url';
import './globals.css';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteMeta.locale,
    url: '/',
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: siteMeta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.title,
    description: siteMeta.description,
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${spaceMono.variable} ${oswald.variable}`}>
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
