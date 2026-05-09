'use client';

type Props = {
  name: string;
  accent: string;
  accentSoft: string;
  variant: 'desktop' | 'mobile';
};

export function DevicePlaceholder({ name, accent, accentSoft, variant }: Props) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${accent}, ${accentSoft})`,
      }}
    >
      <div className="text-center px-4">
        <p
          className="font-display font-bold"
          style={{
            fontSize: variant === 'desktop' ? 'clamp(20px, 3vw, 48px)' : 'clamp(14px, 2vw, 24px)',
            color: 'rgba(0,0,0,0.5)',
            lineHeight: 1.2,
          }}
        >
          {name}
        </p>
        <p
          className="mt-2 font-mono text-[10px] uppercase tracking-widest"
          style={{ color: 'rgba(0,0,0,0.3)' }}
        >
          In development
        </p>
      </div>
    </div>
  );
}
