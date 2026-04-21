import { TopNav } from '@/components/nav/TopNav';
import { Hero } from '@/components/hero/Hero';
import { Divider } from '@/components/shared/Divider';
import { MakingSection } from '@/components/making/MakingSection';
import { ElsewhereSection } from '@/components/elsewhere/ElsewhereSection';
import { Footer } from '@/components/shared/Footer';
import { KonamiEgg } from '@/components/system/KonamiEgg';
import { TimeUpOverlay } from '@/components/hero/TimeUpOverlay';

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <Divider />
        <MakingSection />
        <Divider />
        <ElsewhereSection />
      </main>
      <Footer />
      <KonamiEgg />
      <TimeUpOverlay />
    </>
  );
}
