'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9998] h-px w-full">
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          backgroundColor: 'var(--accent)',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}
