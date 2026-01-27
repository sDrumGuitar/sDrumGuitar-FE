export type InvoiceStatus = 'paid' | 'unpaid';
export type PaymentMethod = 'card' | 'cash' | null;

export type ClassType = 'DRUM' | 'GUITAR' | 'PIANO' | 'VOCAL';

export interface Invoice {
  id: number; // invoice_id
  course_id: number;
  student_id: number;

  issued_at: string;
  paid_at: string | null;

  status: InvoiceStatus;
  method: PaymentMethod;

  class_type: ClassType;
  lesson_count: number;
  family_discount: boolean;
  total_amount: number;

  created_at: string;
  updated_at: string;
}

export interface StudentInvoiceResponse {
  student_id: number;
  student_name: string;
  items: Array<{
    invoice_id: number;
    course_id: number;
    issued_at: string;

    paid_at: string | null;
    status: InvoiceStatus;
    method: PaymentMethod;

    lesson_count: number;
    family_discount: boolean;
    class_type: ClassType;
    total_amount: number;
  }>;
}

export interface PatchInvoicePayload {
  status: InvoiceStatus;
  method: PaymentMethod;
  paid_at: string | null;
}
