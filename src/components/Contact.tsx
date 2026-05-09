'use client';

import { MagneticButton } from './MagneticButton';

export function Contact() {
  return (
    <section id="contact" className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-32">
      <p
        className="mb-4 font-mono text-xs uppercase tracking-[0.3em]"
        style={{ color: 'var(--foreground)', opacity: 0.3 }}
      >
        Get in touch
      </p>
      <h2
        className="font-display font-bold tracking-tight text-center"
        style={{
          fontSize: 'clamp(32px, 6vw, 80px)',
          color: 'var(--foreground)',
          lineHeight: 1.1,
        }}
      >
        Let&apos;s build something.
      </h2>
      <div className="mt-10">
        <MagneticButton
          href="mailto:hello@markusschuette.com"
          data-cursor-label="Email →"
          className="inline-flex items-center gap-3 rounded-full border px-8 py-4 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-white/5"
          style={{
            borderColor: 'var(--accent)',
            color: 'var(--accent)',
          } as React.CSSProperties}
        >
          hello@markusschuette.com
        </MagneticButton>
      </div>
    </section>
  );
}
