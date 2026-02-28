import { api } from '@/shared/api/axios';
import type {
  PatchInvoicePayload,
  StudentInvoiceResponse,
} from '@/types/invoice';

// ====================
// GET : 학생 1명 청구서 목록
// ====================
export const getStudentInvoices = async (
  studentId: number,
): Promise<StudentInvoiceResponse> => {
  const invoiceRes = await api.get<StudentInvoiceResponse>(
    `/invoices/${studentId}`,
  );

  return {
    ...invoiceRes.data,
    items: invoiceRes.data.items.map((item) => ({
      ...item,
      status:
        item.status.toLocaleUpperCase() as StudentInvoiceResponse['items'][number]['status'],
      method: item.method
        ? (item.method.toLocaleUpperCase() as StudentInvoiceResponse['items'][number]['method'])
        : null,
    })),
  };
};

// ====================
// PATCH : 청구서 납부정보 수정
// ====================
export const patchInvoice = async (
  invoiceId: number,
  payload: PatchInvoicePayload,
) => {
  // 서버(명세) validation을 프론트에서도 1차로 막아줌
  if (payload.status === 'PAID') {
    if (!payload.method) throw new Error('method is required when paid');
    if (!payload.paid_at) throw new Error('paid_at is required when paid');
  }

  const body =
    payload.status === 'UNPAID'
      ? {
          status: 'UNPAID',
          method: null,
          paid_at: null,
        }
      : {
          status: 'PAID',
          method: payload.method,
          paid_at: payload.paid_at,
        };

  const res = await api.patch(`/invoices/${invoiceId}`, body);

  return res.data;
};
