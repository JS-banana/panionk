'use client';
import { motion } from 'framer-motion';
import type { ExternalLink } from '@/data/links';
import { useSound } from '@/components/system/SoundProvider';

interface Props {
  link: ExternalLink;
  delay?: number;
}

export function MenuRow({ link, delay = 0 }: Props) {
  const { play } = useSound();

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay }}
      className="pxbox flex items-center px-4 py-5 mb-1 cursor-pointer group"
      style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}
      onClick={() => play('select')}
    >
      {/* scanline overlay */}
      <span
        aria-hidden="true"
        className="menu-scanline"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0,
          background:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px)',
          backgroundSize: '100% 8px',
        }}
      />

      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 mr-3"
        style={{ fontFamily: 'var(--font-px)', fontSize: 10, color: 'var(--red)', width: 20 }}
      >
        ▶
      </span>
      <span
        style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--dim)', minWidth: 72, letterSpacing: '0.06em' }}
      >
        {link.key}
      </span>
      <span
        className="group-hover:text-[color:var(--red)] transition-colors duration-150"
        style={{ fontFamily: 'var(--font-px)', fontSize: 'clamp(11px,1.8vw,16px)', color: 'var(--text)', letterSpacing: '0.06em' }}
      >
        {link.name}
      </span>
      <span className="flex-1" />
      <span
        style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--dim)' }}
      >
        {link.hint}
      </span>
      <span
        className="ml-4 group-hover:text-[color:var(--red)] group-hover:translate-x-1 transition-all duration-150"
        style={{ fontFamily: 'var(--font-px)', fontSize: 10, color: 'var(--dim)' }}
      >
        →
      </span>
    </motion.a>
  );
}
