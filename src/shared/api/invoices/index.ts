import { api } from '@/shared/api/axios';
import type {
  PatchInvoicePayload,
  PatchInvoiceResponse,
  StudentInvoiceResponse,
} from '@/types/invoice';

type PatchInvoiceApiResponse = {
  invoice_id?: number;
  invoiceId?: number;
  enrollment_id?: number;
  enrollmentId?: number;
  student_id?: number;
  studentId?: number;
  status?: string;
  method?: string | null;
  paid_at?: string | null;
  paidAt?: string | null;
  updated_at?: string;
  updatedAt?: string;
};

const normalizeInvoiceStatus = (status?: string) =>
  String(status ?? '')
    .toUpperCase()
    .trim() as PatchInvoiceResponse['status'];

const normalizePaymentMethod = (method?: string | null) => {
  if (!method) return null;
  return String(method).toUpperCase().trim() as PatchInvoiceResponse['method'];
};

const normalizePatchInvoiceResponse = (
  data: PatchInvoiceApiResponse,
): PatchInvoiceResponse => {
  const invoiceId = data.invoice_id ?? data.invoiceId;
  if (invoiceId == null) {
    throw new Error('Invoice ID is missing in the API response.');
  }

  return {
    invoice_id: Number(invoiceId),
    enrollment_id: data.enrollment_id ?? data.enrollmentId,
    student_id: data.student_id ?? data.studentId,
    status: normalizeInvoiceStatus(data.status),
    method: normalizePaymentMethod(data.method),
    paid_at: data.paid_at ?? data.paidAt ?? null,
    updated_at: data.updated_at ?? data.updatedAt ?? '',
  };
};

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
): Promise<PatchInvoiceResponse> => {
  // 서버(명세) validation을 프론트에서도 1차로 막아줌
  if (payload.status === 'PAID') {
    if (!payload.method) throw new Error('method is required when paid');
    if (!payload.paid_at) throw new Error('paid_at is required when paid');
  }

  const body =
    payload.status === 'UNPAID'
      ? {
          status: 'UNPAID',
        }
      : {
          status: 'PAID',
          method: payload.method,
          paid_at: payload.paid_at,
        };

  const res = await api.patch<PatchInvoiceApiResponse>(
    `/invoices/${invoiceId}`,
    body,
  );

  return normalizePatchInvoiceResponse(res.data);
};
