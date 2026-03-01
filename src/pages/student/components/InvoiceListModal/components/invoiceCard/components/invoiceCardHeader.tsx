import NormalButton from '@/shared/button/NormalButton';

interface InvoiceCardHeaderProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  handleCancel: () => void;
  loading: boolean;
  handleSave: () => void;
  onSendMessage?: () => void;
}

//
export default function InvoiceCardHeader({
  isEdit,
  setIsEdit,
  handleCancel,
  loading,
  handleSave,
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
      ) : (
        <>
          <NormalButton text="취소" onClick={handleCancel} />
          <NormalButton
            text={loading ? '저장중...' : '저장'}
            onClick={handleSave}
            disabled={loading}
          />
        </>
      )}
    </div>
  );
}
