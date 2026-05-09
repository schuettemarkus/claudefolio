'use client';

import { useEffect, useRef, useState } from 'react';

export function EasterEgg() {
  const [active, setActive] = useState(false);
  const bufferRef = useRef('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      bufferRef.current += e.key.toLowerCase();

      // Keep only last 6 chars
      if (bufferRef.current.length > 6) {
        bufferRef.current = bufferRef.current.slice(-6);
      }

      if (bufferRef.current.includes('claude')) {
        bufferRef.current = '';
        setActive(true);

        // Flash accent
        const root = document.documentElement;
        const accent = getComputedStyle(root).getPropertyValue('--accent').trim();
        root.style.setProperty('--accent', '#FFFFFF');
        setTimeout(() => root.style.setProperty('--accent', accent), 150);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(false), 3000);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: 'var(--accent)',
            opacity: Math.random() * 0.6 + 0.2,
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${Math.random() * 1.5 + 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
