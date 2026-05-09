'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const direction = self.direction;
        const scroll = self.scroll();

        if (scroll < 100) {
          setHidden(false);
          return;
        }

        if (direction === 1 && scroll > lastScroll) {
          setHidden(true);
        } else if (direction === -1) {
          setHidden(false);
        }

        lastScroll = scroll;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-6 py-4 transition-transform duration-500 md:px-12"
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <a
        href="#"
        className="font-display text-lg tracking-tight"
        style={{ color: 'var(--foreground)' }}
      >
        ms.
      </a>
      <div className="flex items-center gap-8">
        <a
          href="#work"
          className="font-mono text-xs uppercase tracking-widest opacity-60 transition-opacity hover:opacity-100"
          style={{ color: 'var(--foreground)' }}
        >
          Work
        </a>
        <a
          href="#about"
          className="font-mono text-xs uppercase tracking-widest opacity-60 transition-opacity hover:opacity-100"
          style={{ color: 'var(--foreground)' }}
        >
          About
        </a>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-widest opacity-60 transition-opacity hover:opacity-100"
          style={{ color: 'var(--foreground)' }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
