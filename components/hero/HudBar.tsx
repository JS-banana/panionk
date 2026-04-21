'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { profile } from '@/data/profile';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  score: number;
  coins: number;
}

function AnimatedValue({ value, color, alert, gold }: { value: string; color?: string; alert?: boolean; gold?: boolean }) {
  const controls = useAnimation();
  const prevRef = useRef(value);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || value === prevRef.current) return;
    prevRef.current = value;
    controls.start({
      scale: [1, 1.45, 1],
      color: gold
        ? ['var(--gold)', '#fff', 'var(--gold)']
        : alert
        ? ['#ff6060', '#fff', '#ff6060']
        : ['#fff', 'var(--gold)', '#fff'],
      transition: { duration: 0.28, ease: 'easeOut' },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced]);

  return (
    <motion.span
      animate={controls}
      className="tabular-nums"
      style={{
        fontFamily: 'var(--font-px)',
        fontSize: 9,
        letterSpacing: '0.06em',
        color: color ?? (gold ? 'var(--gold)' : alert ? '#ff6060' : '#fff'),
        animation: alert ? 'blink 0.5s step-end infinite' : undefined,
        display: 'inline-block',
      }}
    >
      {value}
    </motion.span>
  );
}

export function HudBar({ score, coins }: Props) {
  const [time, setTime] = useState(profile.hud.initTime);
  const [timeUp, setTimeUp] = useState(false);
  const [lives, setLives] = useState(profile.hud.lives);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((t: number) => {
        if (t <= 1) {
          setTimeUp(true);
          window.dispatchEvent(new CustomEvent('timeup'));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (timeUp) {
      const tid = setTimeout(() => {
        setTime(profile.hud.initTime);
        setTimeUp(false);
      }, 3500);
      return () => clearTimeout(tid);
    }
  }, [timeUp]);

  useEffect(() => {
    const onMushroom = () => setLives(l => l + 1);
    window.addEventListener('mushroom-1up', onMushroom);
    return () => window.removeEventListener('mushroom-1up', onMushroom);
  }, []);

  const items = [
    { label: profile.name, value: String(score).padStart(6, '0') },
    { label: 'COINS', value: `× ${coins} ★`, gold: true },
    { label: 'WORLD', value: profile.hud.world },
    { label: 'LIVES', value: `× ${lives}` },
    { label: 'TIME', value: String(time).padStart(3, '0'), alert: time <= 60 && time > 0 },
  ];

  return (
    <div
      className="absolute left-0 right-0 flex justify-between items-center px-6 md:px-10 py-2"
      style={{
        top: 48,
        background: 'rgba(200,48,24,0.85)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {items.map(({ label, value, gold, alert }) => (
        <div key={label} className="flex flex-col gap-0.5">
          <span
            className="text-[rgba(255,220,150,0.8)]"
            style={{ fontFamily: 'var(--font-px)', fontSize: 6, letterSpacing: '0.08em' }}
          >
            {label}
          </span>
          <AnimatedValue value={value} gold={gold} alert={alert} />
        </div>
      ))}
    </div>
  );
}
