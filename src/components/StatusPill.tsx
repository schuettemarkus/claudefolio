'use client';

import { cn } from '@/lib/cn';

type Props = {
  status: 'live' | 'in-development' | 'archived';
  enlarged?: boolean;
  className?: string;
};

export function StatusPill({ status, enlarged, className }: Props) {
  const label =
    status === 'live'
      ? 'Live'
      : status === 'in-development'
        ? 'In development'
        : 'Archived';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-wider',
        enlarged
          ? 'px-6 py-3 text-sm'
          : 'px-3 py-1.5 text-[10px]',
        status === 'live'
          ? 'border-emerald-500/30 text-emerald-400'
          : status === 'in-development'
            ? 'border-amber-500/30 text-amber-400'
            : 'border-white/10 text-white/40',
        className
      )}
    >
      {status === 'live' && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {label}
    </span>
  );
}
