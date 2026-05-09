'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const TEXT = "I ship AI-powered tools fast. Here's twelve of them.";

export function Intro() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.intro-word');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: false,
        once: true,
      },
    });

    tl.fromTo(
      words,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.025,
        ease: 'power2.out',
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex min-h-screen items-center justify-center px-6"
    >
      <p
        className="max-w-4xl font-display leading-relaxed md:leading-relaxed"
        style={{
          fontSize: 'clamp(28px, 5vw, 64px)',
          color: 'var(--foreground)',
        }}
      >
        {TEXT.split(' ').map((word, i) => (
          <span key={i} className="intro-word inline-block opacity-0" style={{ marginRight: '0.3em' }}>
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
