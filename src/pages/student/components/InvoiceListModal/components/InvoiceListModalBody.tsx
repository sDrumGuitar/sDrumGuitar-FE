import type {
  InvoiceStatus,
  PaymentMethod,
  StudentInvoiceItem,
} from '@/types/invoice';
import type { InvoiceData } from './invoiceCard/types';
import InvoiceCard from './invoiceCard';

interface InvoiceListModalBodyProps {
  invociesList: StudentInvoiceItem[];
  handlePatched: (next: {
    invoice_id: number;
    status: InvoiceStatus;
    method: PaymentMethod;
    paid_at: string | null;
  }) => void;
  onSendMessage?: (invoice: InvoiceData) => void;
}

// 청구서 목록을 렌더링하는 모달 본문 컴포넌트
export default function InvoiceListModalBody({
  invociesList,
  handlePatched,
  onSendMessage,
}: InvoiceListModalBodyProps) {
  return (
    <div className="max-h-120 overflow-y-auto space-y-4 pr-1">
      {/* 1. 청구서 카드 목록 */}
      {invociesList.map((invoice) => {
        const invoiceObject = {
          invoiceId: invoice.invoice_id,
          enrollmentId: invoice.enrollment_id,
          issuedAt: invoice.issued_at,

          paidAt: invoice.paid_at,
          status: invoice.status,
          method: invoice.method,

          lessonCount: invoice.lesson_count,
          familyDiscount: invoice.family_discount,
          classType: invoice.class_type,
          totalAmount: invoice.total_amount,
        };

        return (
          <InvoiceCard
            key={invoice.invoice_id}
            invoice={invoiceObject}
            onPatched={handlePatched}
            onSendMessage={onSendMessage}
          />
        );
      })}
    </div>
  );
}
