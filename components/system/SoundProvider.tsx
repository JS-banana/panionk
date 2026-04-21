'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { soundManager, type SoundName } from '@/lib/audio';

interface SoundCtx {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const Ctx = createContext<SoundCtx>({ enabled: false, toggle: () => {}, play: () => {} });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    soundManager.init();
    setEnabled(soundManager.isEnabled());
    const unlock = () => { soundManager.unlock(); };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    soundManager.setEnabled(next);
    setEnabled(next);
  }, [enabled]);

  const play = useCallback((name: SoundName) => soundManager.play(name), []);

  return (
    <MotionConfig reducedMotion="user">
      <Ctx.Provider value={{ enabled, toggle, play }}>{children}</Ctx.Provider>
    </MotionConfig>
  );
}

export function useSound() {
  return useContext(Ctx);
}
