'use client';

import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function PhoneFrame({ children, className }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-[2.5rem] border-[3px] border-white/15 shadow-2xl ${className ?? ''}`}
      style={{ backgroundColor: 'rgba(20, 20, 22, 0.95)' }}
    >
      {/* Dynamic Island */}
      <div className="relative flex justify-center pt-3 pb-1">
        <div className="h-[22px] w-[90px] rounded-full bg-black" />
      </div>
      {/* Content */}
      <div className="relative mx-1 mb-1 aspect-[9/19.5] overflow-hidden rounded-b-[2.2rem]">
        {children}
      </div>
    </div>
  );
}
