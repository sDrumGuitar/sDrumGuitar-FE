import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_STYLES,
  type MessageTemplateType,
} from '@/constants/messageTemplate';

interface MessageTypeBadgeProps {
  label: string;
}

const FALLBACK_STYLE = {
  background: 'bg-slate-100',
  text: 'text-slate-700',
  border: 'border-slate-200',
} as const;

const getStyleByLabel = (label: string) => {
  const matchedEntry = Object.entries(MESSAGE_TEMPLATE_TYPE_LABELS).find(
    ([, value]) => value === label,
  );
  if (!matchedEntry) return FALLBACK_STYLE;
  const type = matchedEntry[0] as MessageTemplateType;
  return MESSAGE_TEMPLATE_TYPE_STYLES[type] ?? FALLBACK_STYLE;
};

function MessageTypeBadge({ label }: MessageTypeBadgeProps) {
  const style = getStyleByLabel(label);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${style.border} ${style.background} ${style.text}`}
    >
      {label}
    </span>
  );
}

export default MessageTypeBadge;
