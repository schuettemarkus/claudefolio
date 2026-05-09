'use client';

import { useEffect, useState } from 'react';

export function useImageExists(src: string): boolean {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setExists(true);
    img.onerror = () => setExists(false);
    img.src = src;
  }, [src]);

  return exists;
}
