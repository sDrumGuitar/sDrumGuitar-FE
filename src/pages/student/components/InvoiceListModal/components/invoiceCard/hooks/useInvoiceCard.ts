import { useMemo, useState } from 'react';
import type { PatchInvoicePayload } from '@/types/invoice';
import { patchInvoice } from '@/shared/api/invoices';
import type { InvoiceData, InvoiceStatus, PaymentMethod } from '../types';
import { formatDateLabel, fromDateOnly, toDateOnly } from '../utils/date';
import { classTypeLabel, methodLabel, statusLabel } from '../utils/labels';

// 청구서 카드에서 사용되는 데이터와 로직을 관리하는 커스텀 훅
interface UseInvoiceCardResult {
  isEdit: boolean;
  setIsEdit: (next: boolean) => void;
  status: InvoiceStatus;
  setStatus: (next: InvoiceStatus) => void;
  method: PaymentMethod;
  setMethod: (next: PaymentMethod) => void;
  paidAtDate: string;
  setPaidAtDate: (next: string) => void;
  loading: boolean;
  validationError: string | null;
  handleCancel: () => void;
  handleSave: () => Promise<void>;
  display: {
    paidAtText: string;
    issuedAtText: string;
    statusText: string;
    methodText: string;
    lessonCount: string;
    classText: string;
    familyDiscount: string;
    totalPrice: string;
  };
}

// 청구서 카드에서 사용되는 데이터와 로직을 관리하는 커스텀 훅
export default function useInvoiceCard(
  invoice: InvoiceData,
  onPatched: (next: {
    invoice_id: number;
    status: InvoiceStatus;
    method: PaymentMethod;
    paid_at: string | null;
  }) => void,
): UseInvoiceCardResult {
  const [isEdit, setIsEdit] = useState(false);

  // 편집 상태 (props 기준으로 초기화)
  const [status, setStatus] = useState<InvoiceStatus>(invoice.status);
  const [method, setMethod] = useState<PaymentMethod>(invoice.method);
  const [paidAtDate, setPaidAtDate] = useState<string>(
    invoice.paidAt ? toDateOnly(invoice.paidAt) : '',
  );

  const [loading, setLoading] = useState(false);

  const validationError = useMemo(() => {
    if (status === 'paid') {
      if (!method) return '완료 상태면 납부 방법이 필요합니다.';
      if (!paidAtDate) return '완료 상태면 납부 날짜가 필요합니다.';
    }
    return null;
  }, [status, method, paidAtDate]);

  const handleCancel = () => {
    setIsEdit(false);
    setStatus(invoice.status);
    setMethod(invoice.method);
    setPaidAtDate(invoice.paidAt ? toDateOnly(invoice.paidAt) : '');
  };

  const handleSave = async () => {
    if (validationError) {
      alert(validationError);
      return;
    }

    let payload: PatchInvoicePayload = {
      status,
      method,
      paid_at: paidAtDate ? fromDateOnly(paidAtDate) : null,
    };

    if (status === 'unpaid') {
      payload = { status: 'unpaid', method: null, paid_at: null };
    }

    try {
      setLoading(true);
      await patchInvoice(invoice.invoiceId, payload);

      onPatched({
        invoice_id: invoice.invoiceId,
        status: payload.status,
        method: payload.method,
        paid_at: payload.paid_at,
      });

      setIsEdit(false);
    } catch (e) {
      console.error(e);
      alert('청구 정보 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // GUI 표기용 값들
  const paidAtText = formatDateLabel(invoice.paidAt);
  const issuedAtText = formatDateLabel(invoice.issuedAt);
  const statusText = statusLabel(invoice.status);
  const methodText = methodLabel(invoice.method);
  const lessonCount = invoice.lessonCount.toString();
  const classText = classTypeLabel(invoice.classType);
  const familyDiscount = invoice.familyDiscount ? 'O' : 'X';
  const totalPrice = Number.isFinite(invoice.totalAmount)
    ? invoice.totalAmount.toLocaleString()
    : '-';

  return {
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
    display: {
      paidAtText,
      issuedAtText,
      statusText,
      methodText,
      lessonCount,
      classText,
      familyDiscount,
      totalPrice,
    },
  };
}
