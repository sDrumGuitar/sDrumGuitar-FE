import NormalButton from '@/shared/button/NormalButton';

interface InvoiceCardHeaderProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  handleCancel: () => void;
  loading: boolean;
  handleSave: () => void;
}

//
export default function InvoiceCardHeader({
  isEdit,
  setIsEdit,
  handleCancel,
  loading,
  handleSave,
}: InvoiceCardHeaderProps) {
  return (
    <div className="flex justify-end gap-2">
      {!isEdit ? (
        <NormalButton text="수정하기" onClick={() => setIsEdit(true)} />
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
