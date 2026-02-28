import { getMessageStatus } from '@/utils/message/getMessageStatus';
import Chip from '@/shared/chip/Chip';

interface MessageStatusBadgeProps {
  status: string;
}

const STATUS_TONES: Record<string, 'emerald' | 'amber'> = {
  sent: 'emerald',
  scheduled: 'amber',
};

function MessageStatusBadge({ status }: MessageStatusBadgeProps) {
  const label = getMessageStatus(status) ?? status;
  const tone = STATUS_TONES[status] ?? 'slate';
  return <Chip label={label} tone={tone} />;
}

export default MessageStatusBadge;
