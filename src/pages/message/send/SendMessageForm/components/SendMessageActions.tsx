import NormalButton from '@/shared/button/NormalButton';

interface SendMessageActionsProps {
  onReserve: () => void;
  onSend: () => void;
  disabled?: boolean;
}

function SendMessageActions({
  onReserve,
  onSend,
  disabled = false,
}: SendMessageActionsProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
      <NormalButton
        text="예약하기"
        onClick={onReserve}
        disabled={disabled}
      />
      <NormalButton text="전송하기" onClick={onSend} disabled={disabled} />
    </div>
  );
}

export default SendMessageActions;
