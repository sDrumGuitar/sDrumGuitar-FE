interface ChipProps {
  label: string;
  tone?: keyof typeof CHIP_TONES;
  className?: string;
}

const CHIP_TONES = {
  slate: 'border-slate-200 bg-slate-100 text-slate-700',
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  sky: 'border-sky-200 bg-sky-50 text-sky-700',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  violet: 'border-violet-200 bg-violet-50 text-violet-700',
  rose: 'border-rose-200 bg-rose-50 text-rose-700',
} as const;

function Chip({ label, tone = 'slate', className }: ChipProps) {
  const toneClass = CHIP_TONES[tone] ?? CHIP_TONES.slate;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass} ${className ?? ''}`}
    >
      {label}
    </span>
  );
}

export default Chip;
