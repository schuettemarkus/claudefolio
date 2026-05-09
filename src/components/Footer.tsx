'use client';

export function Footer() {
  return (
    <footer className="relative flex h-[50vh] items-end justify-center overflow-hidden">
      <span
        className="select-none font-display font-bold uppercase tracking-tighter"
        style={{
          fontSize: 'clamp(120px, 28vw, 480px)',
          lineHeight: 0.8,
          color: 'var(--accent)',
          opacity: 0.08,
          transform: 'translateY(15%)',
        }}
      >
        CLAUDEFOLIO
      </span>
      <div
        className="absolute bottom-6 left-0 right-0 flex justify-center"
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: 'var(--foreground)', opacity: 0.2 }}
        >
          &copy; {new Date().getFullYear()} Markus Schuette
        </p>
      </div>
    </footer>
  );
}
