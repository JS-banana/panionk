'use client';
import { useState } from 'react';
import { SoundToggle } from '@/components/system/SoundToggle';

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-6 md:px-10 h-12"
      style={{ background: 'var(--red)', boxShadow: '0 3px 0 var(--red-dark)' }}
    >
      {/* Logo */}
      <span
        className="text-white tracking-wider"
        style={{ fontFamily: 'var(--font-px)', fontSize: 10 }}
      >
        ★ PANIONK
      </span>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-7">
        {[['#making', 'MAKING'], ['#elsewhere', 'ELSEWHERE']].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="text-white/80 hover:text-[color:var(--gold)] transition-colors duration-150"
            style={{ fontFamily: 'var(--font-px)', fontSize: 8, letterSpacing: '0.06em' }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right side: lives + sound */}
      <div className="flex items-center gap-4">
        <SoundToggle />
        <span
          className="text-[color:var(--gold)]"
          style={{ fontFamily: 'var(--font-px)', fontSize: 8, letterSpacing: '0.04em' }}
        >
          ♥ ♥ ♥ &nbsp; ×3
        </span>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white ml-2 text-lg"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="菜单"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="absolute top-12 left-0 right-0 flex flex-col gap-0"
          style={{ background: 'var(--red)', borderTop: '2px solid var(--red-light)' }}
        >
          {[['#making', 'MAKING'], ['#elsewhere', 'ELSEWHERE']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-white/80 border-b"
              style={{
                fontFamily: 'var(--font-px)',
                fontSize: 10,
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
