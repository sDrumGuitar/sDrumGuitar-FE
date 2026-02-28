export type InvoiceStatus = 'PAID' | 'UNPAID';
export type PaymentMethod = 'CARD' | 'CASH' | null;

export type ClassType = 'DRUM' | 'GUITAR' | 'PIANO' | 'VOCAL';

export interface Invoice {
  invoice_id: number;
  enrollment_id: number;
  issued_at: string;
  paid_at: string | null;

  status: InvoiceStatus;
  method: PaymentMethod;

  class_type: ClassType;
  lesson_count: number;
  family_discount: boolean;
  total_amount: number;
}

export type StudentInvoiceItem = Invoice;

export interface StudentInvoiceResponse {
  student_id: number;
  items: StudentInvoiceItem[];
}

export interface PatchInvoicePayload {
  status: InvoiceStatus;
  method: PaymentMethod;
  paid_at: string | null;
}
