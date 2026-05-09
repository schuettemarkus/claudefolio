'use client';

import dynamic from 'next/dynamic';
import { useScrambleText } from '@/hooks/useScrambleText';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HeroCanvas = dynamic(
  () => import('./HeroCanvas').then((m) => ({ default: m.HeroCanvas })),
  { ssr: false }
);

function StaticHeroBg() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(ellipse at 50% 50%, rgba(31,119,217,0.12) 0%, transparent 70%)',
      }}
    />
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const { displayed: headline } = useScrambleText(
    'Markus Schuette',
    reduced ? { delay: 0, stagger: 0 } : { delay: 200, stagger: 30 }
  );

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {reduced ? <StaticHeroBg /> : <HeroCanvas />}

      <div className="relative z-10 max-w-6xl px-6 text-center">
        <h1
          className="font-display font-bold tracking-tight"
          style={{
            fontSize: 'clamp(56px, 11vw, 200px)',
            lineHeight: 1,
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h1>
        <p
          className="mt-4 font-display italic tracking-wide"
          style={{
            fontSize: 'clamp(18px, 3vw, 36px)',
            color: 'var(--foreground)',
            opacity: 0.7,
          }}
        >
          builds with Claude.
        </p>
        <p
          className="mt-2 font-mono text-xs uppercase tracking-[0.3em] opacity-40"
          style={{ color: 'var(--foreground)' }}
        >
          Independent. Twelve apps deep.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30"
            style={{ color: 'var(--foreground)' }}
          >
            Scroll
          </span>
          <div
            className="h-10 w-px"
            style={{
              backgroundColor: 'var(--accent)',
              opacity: 0.4,
              animation: reduced ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
