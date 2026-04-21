import { projects } from '@/data/projects';
import { GameCard } from './GameCard';

export function MakingSection() {
  return (
    <section id="making" className="px-6 md:px-10 py-16" style={{ background: 'var(--bg2)' }}>
      <div
        className="flex items-center gap-4 mb-11"
      >
        <span style={{ fontFamily: 'var(--font-px)', fontSize: 8, color: 'var(--red)', opacity: 0.6 }}>01</span>
        <span style={{ fontFamily: 'var(--font-px)', fontSize: 'clamp(11px, 1.6vw, 16px)', color: 'var(--text)', letterSpacing: '0.08em' }}>
          MAKING
        </span>
        <div
          style={{
            flex: 1,
            height: 3,
            background: 'repeating-linear-gradient(90deg, var(--brick) 0, var(--brick) 8px, var(--bg2) 8px, var(--bg2) 16px)',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          maxWidth: 1100,
        }}
      >
        {projects.map((p, i) => (
          <GameCard key={p.name} project={p} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
