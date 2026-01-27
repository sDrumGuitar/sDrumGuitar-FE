import { api } from '@/shared/api/axios';
import type { Student } from '@/types/student';
import type {
  Invoice,
  PatchInvoicePayload,
  StudentInvoiceResponse,
} from '@/types/invoice';

// 학생 1명 청구서 목록 (mock에 맞게: invoices + students 조합)
export const getStudentInvoices = async (
  studentId: number,
): Promise<StudentInvoiceResponse> => {
  // 1) 학생 정보 (이름 표시용)
  const studentRes = await api.get<Student>(`/students/${studentId}`);
  const student = studentRes.data;

  // 2) invoices 필터링 + 최신순 정렬
  const invoiceRes = await api.get<Invoice[]>('/invoices', {
    params: {
      student_id: studentId,
      _sort: 'issued_at',
      _order: 'desc',
    },
  });

  return {
    student_id: studentId,
    student_name: student.name,
    items: invoiceRes.data.map((inv) => ({
      invoice_id: inv.id,
      course_id: inv.course_id,
      issued_at: inv.issued_at,

      paid_at: inv.paid_at,
      status: inv.status,
      method: inv.method,

      lesson_count: inv.lesson_count,
      family_discount: inv.family_discount,
      class_type: inv.class_type,
      total_amount: inv.total_amount,
    })),
  };
};

// 청구서 납부정보 수정 (PATCH /invoices/:id)
export const patchInvoice = async (
  invoiceId: number,
  payload: PatchInvoicePayload,
) => {
  // 서버(명세) validation을 프론트에서도 1차로 막아줌
  if (payload.status === 'paid') {
    if (!payload.method) throw new Error('method is required when paid');
    if (!payload.paid_at) throw new Error('paid_at is required when paid');
  }

  if (payload.status === 'unpaid') {
    payload = {
      status: 'unpaid',
      method: null,
      paid_at: null,
    };
  }

  const res = await api.patch(`/invoices/${invoiceId}`, {
    ...payload,
    updated_at: new Date().toISOString(),
  });

  return res.data;
};
