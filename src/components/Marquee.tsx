'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useLenisContext } from './LenisProvider';

const ITEMS = ['selected work', '·', '2024–2026', '·'];
const REPEAT = 12;

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisContext();
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const baseSpeed = 0.5;

    const tick = () => {
      const velocity = lenisRef.current?.velocity ?? 0;
      const speed = baseSpeed + Math.abs(velocity) * 0.15;
      const direction = velocity < -0.1 ? 1 : -1;

      xRef.current += speed * direction;

      // Reset loop
      const trackWidth = track.scrollWidth / 2;
      if (Math.abs(xRef.current) > trackWidth) {
        xRef.current = 0;
      }

      gsap.set(track, { x: xRef.current });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [lenisRef]);

  return (
    <div className="overflow-hidden border-y border-white/5 py-5" id="work">
      <div ref={trackRef} className="flex w-max gap-8 whitespace-nowrap">
        {Array.from({ length: REPEAT }).map((_, r) =>
          ITEMS.map((item, i) => (
            <span
              key={`${r}-${i}`}
              className="font-mono text-sm uppercase tracking-[0.3em]"
              style={{ color: 'var(--foreground)', opacity: 0.25 }}
            >
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
