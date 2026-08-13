'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export function Reveal({ children, id }: { children: ReactNode; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={shown ? 'reveal in' : 'reveal'}>
      {children}
    </section>
  );
}
