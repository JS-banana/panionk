'use client';
import { useCallback, useEffect, useState } from 'react';
import { PixelScene } from './PixelScene';
import { HudBar } from './HudBar';
import { TitleBlock } from './TitleBlock';
import { StatusPanel } from './StatusPanel';
import { ScrollCue } from './ScrollCue';
import { profile } from '@/data/profile';

export function Hero() {
  const [score, setScore] = useState(profile.hud.initScore);
  const [coins, setCoins] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const addScore = useCallback((n: number) => setScore(s => s + n), []);
  const addCoins = useCallback((n: number) => setCoins(c => c + n), []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      <PixelScene
        onScoreAdd={addScore}
        onCoinAdd={addCoins}
        isMobile={isMobile}
      />

      <div className="absolute inset-0 pointer-events-none">
        <HudBar score={score} coins={coins} />
        {!isMobile && <TitleBlock />}
        {isMobile && (
          <div
            className="absolute"
            style={{ left: 16, top: '30%', right: 16 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-px)',
                fontSize: 'clamp(18px, 5vw, 32px)',
                color: '#fff',
                textShadow: '3px 3px 0 rgba(0,0,0,0.4)',
                marginBottom: 12,
              }}
            >
              <span style={{ color: 'var(--gold)' }}>P</span>ANIONK
            </div>
            <div
              className="pxbox"
              style={{ padding: '12px 16px' }}
            >
              <div style={{ fontFamily: 'var(--font-px)', fontSize: 7, color: 'var(--text)', lineHeight: 2 }}>
                INDIE HACKER · BUILDER
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--dim)', fontStyle: 'italic', marginTop: 6 }}>
                {profile.dialogueZh}
              </div>
            </div>
          </div>
        )}
        <StatusPanel />
        <ScrollCue />
      </div>
    </section>
  );
}
