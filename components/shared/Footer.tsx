'use client';
import { useEffect, useRef } from 'react';
import { profile } from '@/data/profile';
import { useSound } from '@/components/system/SoundProvider';

export function Footer() {
  const { play } = useSound();
  const playedRef = useRef(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !playedRef.current) {
        playedRef.current = true;
        play('powerup');
      }
    }, { threshold: 0.8 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [play]);

  return (
    <footer
      ref={ref}
      className="flex justify-between items-center px-6 md:px-10 py-7"
      style={{
        background: 'var(--red)',
        borderTop: '3px solid var(--red-light)',
        boxShadow: '0 -3px 0 var(--red-dark)',
      }}
    >
      <span
        style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: '#fff', letterSpacing: '0.08em' }}
      >
        ★ {profile.name} · {profile.footerCity} · {profile.footerYear}
      </span>
      <span
        className="footer-clear cursor-default select-none transition-colors duration-700"
        style={{ fontFamily: 'var(--font-px)', fontSize: 7, color: 'rgba(255,220,150,0.6)' }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.color = 'var(--gold)';
          play('powerup');
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.color = 'rgba(255,220,150,0.6)';
        }}
      >
        GAME CLEAR &nbsp;♪
      </span>
    </footer>
  );
}
