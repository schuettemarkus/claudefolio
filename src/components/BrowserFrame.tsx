'use client';

import { type ReactNode } from 'react';

type Props = {
  url?: string;
  children: ReactNode;
  className?: string;
};

export function BrowserFrame({ url, children, className }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 shadow-2xl ${className ?? ''}`}
      style={{ backgroundColor: 'rgba(20, 20, 22, 0.9)' }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        {/* URL bar */}
        {url && (
          <div className="mx-auto max-w-xs flex-1">
            <div className="rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[10px] text-white/30 truncate">
              {url}
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
