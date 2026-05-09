'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function useScrambleText(text: string, options?: { delay?: number; stagger?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const delay = options?.delay ?? 300;
    const stagger = options?.stagger ?? 30;
    const chars = text.split('');
    const resolved = new Array(chars.length).fill(false);
    const current = new Array(chars.length).fill('');

    // Initialize with random chars (preserve spaces)
    for (let i = 0; i < chars.length; i++) {
      current[i] = chars[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    setDisplayed(current.join(''));

    const startTime = Date.now() + delay;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        // Still in delay, scramble randomly
        for (let i = 0; i < chars.length; i++) {
          if (chars[i] !== ' ') {
            current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplayed(current.join(''));
        return;
      }

      let allDone = true;
      for (let i = 0; i < chars.length; i++) {
        if (resolved[i]) continue;
        if (chars[i] === ' ') {
          resolved[i] = true;
          continue;
        }

        if (elapsed > i * stagger) {
          resolved[i] = true;
          current[i] = chars[i];
        } else {
          current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          allDone = false;
        }
      }

      setDisplayed(current.join(''));

      if (allDone) {
        clearInterval(interval);
        setDone(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, options?.delay, options?.stagger]);

  return { displayed, done };
}
