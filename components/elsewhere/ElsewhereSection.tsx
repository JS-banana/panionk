import { links } from '@/data/links';
import { MenuRow } from './MenuRow';

export function ElsewhereSection() {
  return (
    <section id="elsewhere" className="px-6 md:px-10 py-16" style={{ background: 'var(--bg)' }}>
      <div className="flex items-center gap-4 mb-11">
        <span style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--red)', opacity: 0.6 }}>02</span>
        <span style={{ fontFamily: 'var(--font-px)', fontSize: 'clamp(11px, 1.6vw, 16px)', color: 'var(--text)', letterSpacing: '0.08em' }}>
          ELSEWHERE
        </span>
        <div
          style={{
            flex: 1,
            height: 3,
            background: 'repeating-linear-gradient(90deg, var(--brick) 0, var(--brick) 8px, var(--bg2) 8px, var(--bg2) 16px)',
          }}
        />
      </div>

      <div style={{ maxWidth: 860 }}>
        {links.map((l, i) => (
          <MenuRow key={l.key} link={l} delay={i * 0.07} />
        ))}
      </div>
    </section>
  );
}
