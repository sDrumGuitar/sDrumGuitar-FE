import type { InvoiceStatus, PaymentMethod } from '@/types/invoice';
import InvoiceCard from '../invoiceCard/InvoiceCard';
import type { InvoiceItem } from './InvoiceListModal';

interface InvoiceListModalBodyProps {
  invociesList: InvoiceItem[];
  handlePatched: (next: {
    invoice_id: number;
    status: InvoiceStatus;
    method: PaymentMethod;
    paid_at: string | null;
  }) => void;
}
export default function InvoiceListModalBody({
  invociesList,
  handlePatched,
}: InvoiceListModalBodyProps) {
  return (
    <div className="max-h-120 overflow-y-auto space-y-4 pr-1">
      {invociesList.map((invoice) => {
        const invoiceObject = {
          invoiceId: invoice.invoice_id,
          courseId: invoice.course_id,
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
          />
        );
      })}
    </div>
  );
}
