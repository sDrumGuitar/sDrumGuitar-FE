import type { InvoiceStatus, PaymentMethod } from '@/types/invoice';

export interface InvoiceData {
  invoiceId: number;
  enrollmentId: number;
  issuedAt: string | number;

  paidAt: string | number | null;
  status: InvoiceStatus;
  method: PaymentMethod;

  lessonCount: number;
  familyDiscount: boolean;
  classType: string;
  totalAmount: number;
}

export interface InvoiceCardProps {
  invoice: InvoiceData;

  onPatched: (next: {
    invoice_id: number;
    status: InvoiceStatus;
    method: PaymentMethod;
    paid_at: string | null;
  }) => void;
}
