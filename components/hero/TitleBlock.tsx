'use client';
import { useCallback, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { useSound } from '@/components/system/SoundProvider';

export function TitleBlock() {
  const { play } = useSound();
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = useCallback(() => {
    play('coin');
    const next = clickCount + 1;
    setClickCount(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (next >= 5) {
      setClickCount(0);
      document.body.classList.add('konami-active');
      setTimeout(() => document.body.classList.remove('konami-active'), 120000);
    } else {
      timerRef.current = setTimeout(() => setClickCount(0), 1500);
    }
  }, [clickCount, play]);

  return (
    <div
      className="absolute"
      style={{ left: 40, top: '22%' }}
    >
      <div
        className="cursor-pointer select-none"
        style={{
          pointerEvents: 'auto',
          fontFamily: 'var(--font-px)',
          fontSize: 'clamp(22px, 4vw, 58px)',
          color: '#fff',
          letterSpacing: '0.05em',
          lineHeight: 1.25,
          textShadow: '4px 4px 0 rgba(0,0,0,0.4), 0 0 32px rgba(255,220,80,0.3)',
          marginBottom: 18,
        }}
        onClick={handleLogoClick}
        title="五连击解锁彩蛋"
      >
        <span style={{ color: 'var(--gold)' }}>P</span>ANIONK
      </div>

      <div
        className="pxbox relative"
        style={{ padding: '16px 20px', maxWidth: 420 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-px)',
            fontSize: 7,
            color: 'var(--red)',
            display: 'inline-block',
            padding: '3px 8px',
            background: 'var(--cream)',
            border: '2px solid var(--brick)',
            position: 'absolute',
            top: 0,
            left: 14,
            transform: 'translateY(-50%)',
          }}
        >
          PROFILE
        </span>
        <div
          style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--text)', lineHeight: 1.9, marginTop: 14 }}
        >
          INDIE HACKER &nbsp;·&nbsp; BUILDER
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--dim)', lineHeight: 1.6, marginTop: 8, fontStyle: 'italic' }}>
            {profile.dialogueZh}
            <br />
            <em>{profile.dialogueEn}</em>
          </div>
        </div>
        <span
          style={{
            position: 'absolute',
            bottom: 10,
            right: 14,
            fontFamily: 'var(--font-px)',
            fontSize: 7,
            color: 'var(--red)',
            animation: 'blink 1s step-end infinite',
          }}
        >
          ▼
        </span>
      </div>
    </div>
  );
}
