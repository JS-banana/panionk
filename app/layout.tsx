import type { Metadata } from 'next';
import { Oswald, Press_Start_2P, Space_Mono } from 'next/font/google';
import './globals.css';
import { SoundProvider } from '@/components/system/SoundProvider';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-px',
  display: 'swap',
});

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
  title: 'PANIONK',
  description: 'AI Builder · Agent Maker · Product-minded Developer',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laifuyou.com'),
  openGraph: {
    title: 'PANIONK',
    description: 'AI Builder · Agent Maker',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${pressStart2P.variable} ${spaceMono.variable} ${oswald.variable}`}>
      <body>
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}
