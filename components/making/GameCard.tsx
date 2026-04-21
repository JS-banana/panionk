'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';
import { useSound } from '@/components/system/SoundProvider';

interface Props {
  project: Project;
  delay?: number;
}

export function GameCard({ project, delay = 0 }: Props) {
  const { play } = useSound();
  const atkRef = useRef<HTMLDivElement>(null);
  const defRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const [showMushroom, setShowMushroom] = useState(false);

  useEffect(() => {
    if (!project.placeholder) return;
    if (sessionStorage.getItem('1up-seen')) return;
    sessionStorage.setItem('1up-seen', '1');
    setShowMushroom(true);
    const timer = setTimeout(() => setShowMushroom(false), 2000);
    return () => clearTimeout(timer);
  }, [project.placeholder]);

  const handleMushroom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    play('1up');
    window.dispatchEvent(new CustomEvent('mushroom-1up'));
    setShowMushroom(false);
    sessionStorage.setItem('1up-seen', '1');
  };

  useEffect(() => {
    if (project.placeholder) return;
    const card = atkRef.current?.closest('.game-card-wrapper');
    if (!card) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        if (atkRef.current) {
          atkRef.current.style.width = `${project.atk}%`;
          atkRef.current.style.transition = 'width 700ms cubic-bezier(0.22, 1, 0.36, 1)';
        }
        if (defRef.current) {
          defRef.current.style.width = `${project.def}%`;
          defRef.current.style.transition = 'width 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms';
        }
      }
    }, { threshold: 0.3 });
    obs.observe(card);
    return () => obs.disconnect();
  }, [project]);

  if (project.placeholder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ delay }}
        className="glitch"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px dashed var(--line)',
          minHeight: 200,
          gap: 10,
          background: 'var(--bg2)',
        }}
      >
        <p style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--dim)' }}>
          {project.name}
        </p>
        <small style={{ fontFamily: 'var(--font-px)', fontSize: 7, color: 'var(--line)' }}>
          {project.en}
        </small>
        <AnimatePresence>
          {showMushroom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 4 }}
              animate={{ opacity: [0, 1, 0.7, 1], scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={handleMushroom}
              aria-label="1UP mushroom easter egg"
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}
            >
              {/* Pixel mushroom */}
              <div style={{ position: 'relative', width: 24, height: 24 }}>
                {/* cap */}
                <div style={{ position: 'absolute', top: 0, left: 2, width: 20, height: 14, background: 'var(--red)', borderRadius: '50% 50% 0 0' }} />
                {/* spots */}
                <div style={{ position: 'absolute', top: 4, left: 5, width: 4, height: 4, background: '#fff', borderRadius: 1 }} />
                <div style={{ position: 'absolute', top: 3, left: 13, width: 4, height: 4, background: '#fff', borderRadius: 1 }} />
                {/* stem */}
                <div style={{ position: 'absolute', top: 13, left: 5, width: 14, height: 8, background: '#fde8b8', border: '2px solid var(--brick)' }} />
                {/* 1UP label */}
                <div style={{
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: 'var(--font-px)',
                  fontSize: 6,
                  color: 'var(--gold)',
                  whiteSpace: 'nowrap',
                  textShadow: '1px 1px 0 #000',
                }}>
                  1UP
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{
        y: -4,
        boxShadow: '0 0 18px 4px rgba(255,200,0,0.45), 0 0 40px 10px rgba(230,140,0,0.2), 4px 8px 0 rgba(100,30,10,0.2)',
      }}
      className="pxbox game-card-wrapper"
      style={{ display: 'block', padding: '24px 28px', cursor: 'pointer' }}
      onClick={() => play('select')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-px)', fontSize: 7, color: 'var(--pipe)', letterSpacing: '0.1em', marginBottom: 8 }}>
            {project.tag}
          </div>
          <div style={{ fontFamily: 'var(--font-px)', fontSize: 13, color: 'var(--text)', letterSpacing: '0.04em', marginBottom: 12 }}>
            {project.name}
          </div>
        </div>
        {project.stars && (
          <span style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--gold-dim)' }}>
            ★ {project.stars}
          </span>
        )}
      </div>

      <p style={{ color: 'var(--text)', fontSize: 15, marginBottom: 4 }}>{project.zh}</p>
      <p style={{ color: 'var(--dim)', fontSize: 12, fontStyle: 'italic', marginBottom: 18 }}>{project.en}</p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 16 }}>
        {project.stack.map(t => (
          <span
            key={t}
            style={{
              fontFamily: 'var(--font-px)',
              fontSize: 7,
              color: 'var(--dim)',
              border: '2px solid var(--line)',
              padding: '3px 8px',
              background: 'var(--bg2)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {[
        { label: 'ATK', ref: atkRef, color: 'var(--red)' },
        { label: 'DEF', ref: defRef, color: '#3060c0' },
      ].map(({ label, ref, color }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <span style={{ fontFamily: 'var(--font-px)', fontSize: 6, color: 'var(--dim)', minWidth: 28 }}>{label}</span>
          <div style={{ flex: 1, height: 6, background: 'var(--bg2)', border: '2px solid var(--line)' }}>
            <div ref={ref} style={{ width: 0, height: '100%', background: color }} />
          </div>
        </div>
      ))}

      <div
        style={{
          fontFamily: 'var(--font-px)',
          fontSize: 7,
          color: 'var(--dim)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 16,
        }}
      >
        <span>▶ VIEW ON GITHUB</span>
        <span style={{ display: 'inline-block', transition: 'transform 0.15s' }}>→</span>
      </div>
    </motion.a>
  );
}
