import type { Metadata } from 'next';
import { Press_Start_2P, Lora } from 'next/font/google';
import './globals.css';
import { SoundProvider } from '@/components/system/SoundProvider';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-px',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PANIONK',
  description: 'Indie Hacker · Builder — 拥抱技术，热爱生活。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laifuyou.com'),
  openGraph: {
    title: 'PANIONK',
    description: 'Indie Hacker · Builder',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${pressStart2P.variable} ${lora.variable}`}>
      <body>
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}
