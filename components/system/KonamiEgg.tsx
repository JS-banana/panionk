'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useKonami } from '@/hooks/useKonami';
import { useSound } from './SoundProvider';

export function KonamiEgg() {
  const { play } = useSound();
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body;
  }, []);

  const activate = useCallback(() => {
    play('powerup');
    const body = bodyRef.current;
    if (!body) return;
    body.classList.add('konami-active');
    setTimeout(() => body.classList.remove('konami-active'), 2000);
  }, [play]);

  useKonami(activate);
  return null;
}
