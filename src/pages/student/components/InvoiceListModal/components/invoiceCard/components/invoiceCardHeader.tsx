import NormalButton from '@/shared/button/NormalButton';

interface InvoiceCardHeaderProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  onSendMessage?: () => void;
}

//
export default function InvoiceCardHeader({
  isEdit,
  setIsEdit,
  onSendMessage,
}: InvoiceCardHeaderProps) {
  return (
    <div className="flex justify-end gap-2">
      {!isEdit ? (
        <>
          {onSendMessage ? (
            <NormalButton text="문자 보내기" onClick={onSendMessage} />
          ) : null}
          <NormalButton text="수정하기" onClick={() => setIsEdit(true)} />
        </>
      ) : null}
    </div>
  );
}
