'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const STATS = [
  { value: 12, label: 'apps shipped', suffix: '' },
  { value: 9, label: 'AI integrations', suffix: '' },
  { value: 2, label: 'live', suffix: '' },
  { value: 0, label: 'Claude Code prompts written', suffix: '∞' },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const counters = section.querySelectorAll<HTMLElement>('.stat-value');

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        counters.forEach((counter, i) => {
          const stat = STATS[i];
          if (stat.suffix === '∞') {
            gsap.fromTo(counter, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1 });
            return;
          }
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2,
            delay: i * 0.1,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.round(obj.val).toString();
            },
          });
          gsap.fromTo(counter.parentElement!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1 });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {STATS.map((stat, i) => (
          <div key={i} className="text-center opacity-0">
            <span
              className="stat-value block font-display font-bold"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                color: 'var(--accent)',
                lineHeight: 1,
              }}
            >
              {stat.suffix === '∞' ? '∞' : '0'}
            </span>
            <span
              className="mt-2 block font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--foreground)', opacity: 0.4 }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
