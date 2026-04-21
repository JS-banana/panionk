export function ScrollCue() {
  return (
    <div
      className="absolute left-1/2 text-center"
      style={{
        bottom: 24,
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-px)',
        fontSize: 7,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: '0.1em',
        animation: 'float 2s ease-in-out infinite',
      }}
    >
      ▼ &nbsp; SCROLL &nbsp; ▼
    </div>
  );
}
