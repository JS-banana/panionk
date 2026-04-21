import { profile } from '@/data/profile';

export function StatusPanel() {
  const s = profile.status;
  const rows = [
    { key: 'CLASS', val: s.class, hi: true },
    { key: 'LANG', val: s.lang },
    { key: 'STACK', val: s.stack },
    { key: 'GUILD', val: s.guild, hi: true },
    { key: 'REPOS', val: String(s.repos) },
  ];

  return (
    <div
      className="pxbox hidden lg:block"
      style={{
        position: 'absolute',
        right: 40,
        top: '22%',
        padding: '14px 18px',
        minWidth: 150,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-px)',
          fontSize: 7,
          color: 'var(--red)',
          marginBottom: 12,
          letterSpacing: '0.1em',
        }}
      >
        STATUS
      </div>
      {rows.map(({ key, val, hi }) => (
        <div
          key={key}
          style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}
        >
          <span style={{ fontFamily: 'var(--font-px)', fontSize: 6, color: 'var(--dim)' }}>{key}</span>
          <span
            style={{
              fontFamily: 'var(--font-px)',
              fontSize: 6,
              color: hi ? 'var(--red)' : 'var(--text)',
              fontWeight: hi ? 'bold' : 'normal',
            }}
          >
            {val}
          </span>
        </div>
      ))}
    </div>
  );
}
