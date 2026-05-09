'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

export function useScrollVelocity(lenisRef: React.RefObject<Lenis | null>) {
  const [velocity, setVelocity] = useState(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      if (lenisRef.current) {
        setVelocity(lenisRef.current.velocity);
      }
      rafId.current = requestAnimationFrame(update);
    };
    rafId.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId.current);
  }, [lenisRef]);

  return velocity;
}
