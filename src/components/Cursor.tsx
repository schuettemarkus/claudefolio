'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorLabel =
        target.dataset.cursorLabel ||
        target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') ||
        '';

      if (cursorLabel) {
        setLabel(cursorLabel);
        gsap.to(cursor, {
          width: 'auto',
          height: 'auto',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeaveInteractive = () => {
      setLabel('');
      gsap.to(cursor, {
        scale: 1,
        width: 12,
        height: 12,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Observe interactive elements
    const interactiveSelectors = 'a, button, [data-cursor-label], [role="button"]';
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[10000] -translate-x-1/2 -translate-y-1/2"
      style={{ mixBlendMode: 'difference' }}
    >
      {label ? (
        <div
          ref={labelRef}
          className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black whitespace-nowrap"
        >
          {label}
        </div>
      ) : (
        <div className="h-3 w-3 rounded-full bg-white" />
      )}
    </div>
  );
}
