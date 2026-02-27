import NormalButton from '@/shared/button/NormalButton';

interface SendMessageActionsProps {
  onReserve: () => void;
  onSend: () => void;
  reservedAtLabel?: string;
  hasReservedAt?: boolean;
  disabled?: boolean;
}

function SendMessageActions({
  onReserve,
  onSend,
  reservedAtLabel = '',
  hasReservedAt = false,
  disabled = false,
}: SendMessageActionsProps) {
  const reserveButtonText = hasReservedAt ? '예약하기' : '예약 시간 설정';

  return (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
      {reservedAtLabel ? (
        <span className="text-sm text-gray-600">{reservedAtLabel}</span>
      ) : null}
      <NormalButton
        text={reserveButtonText}
        onClick={onReserve}
        disabled={disabled}
      />
      <NormalButton text="전송하기" onClick={onSend} disabled={disabled} />
    </div>
  );
}

export default SendMessageActions;
