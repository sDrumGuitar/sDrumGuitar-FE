import { getMessageStatus } from '@/utils/message/getMessageStatus';

interface MessageStatusBadgeProps {
  status: string;
}

const STATUS_STYLES: Record<string, string> = {
  sent: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  scheduled: 'border-amber-200 bg-amber-50 text-amber-700',
};

function MessageStatusBadge({ status }: MessageStatusBadgeProps) {
  const label = getMessageStatus(status) ?? status;
  const style =
    STATUS_STYLES[status] ?? 'border-gray-200 bg-gray-100 text-gray-700';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}

export default MessageStatusBadge;
