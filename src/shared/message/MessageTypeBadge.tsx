import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_TONES,
  type MessageTemplateType,
} from '@/constants/messageTemplate';
import Chip from '@/shared/chip/Chip';

interface MessageTypeBadgeProps {
  label: string;
}

const getToneByLabel = (label: string) => {
  const matchedEntry = Object.entries(MESSAGE_TEMPLATE_TYPE_LABELS).find(
    ([, value]) => value === label,
  );
  if (!matchedEntry) return 'slate';
  const type = matchedEntry[0] as MessageTemplateType;
  return MESSAGE_TEMPLATE_TYPE_TONES[type] ?? 'slate';
};

function MessageTypeBadge({ label }: MessageTypeBadgeProps) {
  return <Chip label={label} tone={getToneByLabel(label)} />;
}

export default MessageTypeBadge;
