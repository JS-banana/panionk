'use client';
import { useEffect, useState } from 'react';
import { useSound } from '@/components/system/SoundProvider';

const QUIPS = [
  '时间是最宝贵的资源，抓紧啊！',
  '人生就像关卡，TIME UP 了也要继续跑。',
  'Powered by Tech, Inspired by Life. 重新开始！',
  '这不是结束，是 CONTINUE？ >YES',
];

export function TimeUpOverlay() {
  const [visible, setVisible] = useState(false);
  const [quip, setQuip] = useState('');
  const { play } = useSound();

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.type === 'timeup') {
        setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
        setVisible(true);
        play('powerup');
        setTimeout(() => setVisible(false), 3500);
      }
    };
    window.addEventListener('timeup' as keyof WindowEventMap, handler as EventListener);
    return () => window.removeEventListener('timeup' as keyof WindowEventMap, handler as EventListener);
  }, [play]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={() => setVisible(false)}
    >
      <div
        className="pxbox text-center"
        style={{ padding: '32px 40px', maxWidth: 400 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-px)',
            fontSize: 'clamp(16px,4vw,32px)',
            color: 'var(--red)',
            marginBottom: 24,
            textShadow: '4px 4px 0 rgba(200,48,24,0.4)',
          }}
        >
          TIME UP!
        </div>
        <div style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--dim)', lineHeight: 2, marginBottom: 16 }}>
          {quip}
        </div>
        <div style={{ fontFamily: 'var(--font-px)', fontSize: 7, color: 'var(--line)', animation: 'blink 1s step-end infinite' }}>
          ▼ CONTINUE?
        </div>
      </div>
    </div>
  );
}
