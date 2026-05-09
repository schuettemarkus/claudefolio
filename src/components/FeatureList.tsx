'use client';

type Props = {
  features: string[];
};

export function FeatureList({ features }: Props) {
  return (
    <ol className="space-y-3">
      {features.map((feature, i) => (
        <li key={i} className="feature-item flex items-start gap-3 opacity-0">
          <span
            className="mt-0.5 shrink-0 font-mono text-xs"
            style={{ color: 'var(--accent)', opacity: 0.6 }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex-1">
            <span
              className="text-sm leading-relaxed"
              style={{ color: 'var(--foreground)', opacity: 0.8 }}
            >
              {feature}
            </span>
            <div
              className="feature-line mt-1 h-px origin-left scale-x-0"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.2 }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
