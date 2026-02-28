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
    <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
      {reservedAtLabel ? (
        <span className="text-xs text-gray-600 md:text-sm">
          {reservedAtLabel}
        </span>
      ) : null}
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
        <NormalButton
          text={reserveButtonText}
          onClick={onReserve}
          disabled={disabled}
          className="h-10 w-full md:w-auto"
        />
        <NormalButton
          text="전송하기"
          onClick={onSend}
          disabled={disabled}
          className="h-10 w-full md:w-auto"
        />
      </div>
    </div>
  );
}

export default SendMessageActions;
