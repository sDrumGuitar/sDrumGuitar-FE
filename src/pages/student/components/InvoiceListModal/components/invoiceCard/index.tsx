import InvoiceCardHeader from './components/invoiceCardHeader';
import InvoiceCardDetails from './components/InvoiceCardDetails';
import InvoiceEditForm from './components/InvoiceEditForm';
import useInvoiceCard from './hooks/useInvoiceCard';
import type { InvoiceCardProps } from './types';

// 청구서 카드 컴포넌트
export default function InvoiceCard({
  invoice,
  onPatched,
  onSendMessage,
}: InvoiceCardProps) {
  const {
    isEdit,
    setIsEdit,
    status,
    setStatus,
    method,
    setMethod,
    paidAtDate,
    setPaidAtDate,
    loading,
    validationError,
    handleCancel,
    handleSave,
    display,
  } = useInvoiceCard(invoice, onPatched);

  return (
    <div className="rounded-lg bg-white border border-gray-300 p-6">
      {/* 1. 헤더 */}
      <InvoiceCardHeader
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleCancel={handleCancel}
        loading={loading}
        handleSave={handleSave}
        onSendMessage={
          onSendMessage ? () => onSendMessage(invoice) : undefined
        }
      />

      {/* 2. 상세 정보 */}
      <InvoiceCardDetails status={invoice.status} display={display} />

      {/* 3. 편집 폼 */}
      {isEdit && (
        <InvoiceEditForm
          status={status}
          setStatus={setStatus}
          method={method}
          setMethod={setMethod}
          paidAtDate={paidAtDate}
          setPaidAtDate={setPaidAtDate}
          validationError={validationError}
        />
      )}
    </div>
  );
}
