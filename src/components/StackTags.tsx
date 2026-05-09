'use client';

type Props = {
  tags: string[];
};

export function StackTags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
          style={{ color: 'var(--foreground)', opacity: 0.5 }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
