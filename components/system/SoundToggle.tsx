'use client';
import { useSound } from './SoundProvider';

export function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      title={enabled ? '关闭音效' : '开启音效'}
      className="text-white/60 hover:text-white transition-colors"
      style={{ fontFamily: 'var(--font-px)', fontSize: 8, letterSpacing: '0.04em' }}
    >
      {enabled ? '♪ ON' : '♪ OFF'}
    </button>
  );
}
