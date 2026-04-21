'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const BASE_STYLE = {
  height: 20,
  backgroundImage:
    'repeating-linear-gradient(90deg, var(--brick) 0, var(--brick) 20px, #a02818 20px, #a02818 21px)',
  borderTop: '3px solid var(--red-light)',
  borderBottom: '3px solid var(--red-dark)',
};

export function Divider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgX = useTransform(scrollYProgress, [0, 1], ['0px', '80px']);

  if (reduced) return <div style={BASE_STYLE} />;

  return <motion.div ref={ref} style={{ ...BASE_STYLE, backgroundPositionX: bgX }} />;
}
