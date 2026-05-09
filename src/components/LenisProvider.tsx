'use client';

import { createContext, useContext } from 'react';
import Lenis from 'lenis';
import { useLenis } from '@/hooks/useLenis';

const LenisContext = createContext<React.RefObject<Lenis | null>>({ current: null });

export function useLenisContext() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
