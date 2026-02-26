import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import FormField from '@/shared/form/FormField';
import Select from '@/shared/form/Select';
import TextInput from '@/shared/form/TextInput';
import type { PatchInvoicePayload } from '@/types/invoice';
import { patchInvoice } from '@/shared/api/invoices';
import InvoiceCardHeader from './components/invoiceCardHeader';
import { METHOD_OPTIONS, STATUS_OPTIONS } from '@/constants/invoice';
import InvoiceCell from './components/InvoiceCell';

type InvoiceStatus = 'paid' | 'unpaid';
type PaymentMethod = 'card' | 'cash' | null;

interface InvoiceCardProps {
  invoice: {
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
  };

  onPatched: (next: {
    invoice_id: number;
    status: InvoiceStatus;
    method: PaymentMethod;
    paid_at: string | null;
  }) => void;
}

// ✅ date용 변환 (YYYY-MM-DD)
function normalizeToDayjs(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === '') return null;

  if (typeof value === 'number') {
    return value < 1_000_000_000_000 ? dayjs.unix(value) : dayjs(value);
  }

  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) {
    const numeric = Number(trimmed);
    return numeric < 1_000_000_000_000 ? dayjs.unix(numeric) : dayjs(numeric);
  }

  return dayjs(trimmed);
}

function toDateOnly(value: number | string) {
  const parsed = normalizeToDayjs(value);
  if (!parsed || !parsed.isValid()) return '';
  return parsed.format('YYYY-MM-DD');
}
function fromDateOnly(v: string) {
  // "2026-01-17" -> "2026-01-17T00:00:00"
  if (!v) return null;
  return `${v}T00:00:00`;
}

function classTypeLabel(v: string) {
  if (v === 'DRUM') return '드럼';
  if (v === 'GUITAR') return '기타';
  if (v === 'PIANO') return '피아노';
  if (v === 'VOCAL') return '보컬';
  return v;
}

function statusLabel(v: InvoiceStatus) {
  return v === 'paid' ? '완료' : '미납';
}

function methodLabel(v: PaymentMethod) {
  if (v === 'card') return '카드';
  if (v === 'cash') return '현금';
  return '-';
}

export default function InvoiceCard({ invoice, onPatched }: InvoiceCardProps) {
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
  const paidAtText = (() => {
    const parsed = normalizeToDayjs(invoice.paidAt);
    return parsed && parsed.isValid() ? parsed.format('YYYY / MM / DD') : '-';
  })();
  const issuedAtText = (() => {
    const parsed = normalizeToDayjs(invoice.issuedAt);
    return parsed && parsed.isValid() ? parsed.format('YYYY / MM / DD') : '-';
  })();
  const statusText = statusLabel(invoice.status);
  const methodText = methodLabel(invoice.method);
  const lessonCount = invoice.lessonCount.toString();
  const classText = classTypeLabel(invoice.classType);
  const familyDiscount = invoice.familyDiscount ? 'O' : 'X';
  const totalPrice = Number.isFinite(invoice.totalAmount)
    ? invoice.totalAmount.toLocaleString()
    : '-';

  return (
    <div className="rounded-lg bg-white border border-gray-300 p-6">
      <InvoiceCardHeader
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleCancel={handleCancel}
        loading={loading}
        handleSave={handleSave}
      />

      <div className="mt-2">
        {/* 여기서부터 교체 */}
        {(() => {
          const leftLabelW = 'w-20'; // 왼쪽 라벨 폭
          const rightLabelW = 'w-28'; // 오른쪽 라벨 폭 고정

          return (
            <div className="grid grid-cols-2 gap-x-2 gap-y-6">
              {/* row 1 */}
              <InvoiceCell
                className={leftLabelW}
                cellName="클래스"
                value={classText}
              />
              <InvoiceCell
                className={`${rightLabelW}`}
                cellName="납부 상태"
                value={statusText}
                cellStyle={
                  invoice.status === 'paid' ? 'text-green-600' : 'text-red-500'
                }
              />

              {/* row 2 */}
              <InvoiceCell
                className={leftLabelW}
                cellName="선택 레슨 회차"
                value={lessonCount}
              />
              <InvoiceCell
                className={rightLabelW}
                cellName="납부 방법"
                value={methodText}
              />

              {/* row 3 */}
              <InvoiceCell
                className={leftLabelW}
                cellName="가족 할인 여부"
                value={familyDiscount}
              />
              <InvoiceCell
                className={rightLabelW}
                cellName="납부 날짜"
                value={paidAtText}
              />

              {/* row 4 */}
              <div />
              <InvoiceCell
                className={rightLabelW}
                cellName="총 금액"
                value={totalPrice}
              />
            </div>
          );
        })()}

        <div className="mt-6 flex justify-end text-sm text-gray-700">
          <span className="font-semibold mr-3">청구서 발행 날짜</span>
          <span>{issuedAtText}</span>
        </div>
      </div>

      {/* 수정 UI는 아래에만 추가로 펼치기 ( 열이 달라서 부자연스러워서 분리) */}
      {isEdit && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField label="납부 상태">
              <Select
                options={STATUS_OPTIONS}
                value={status}
                onChange={(v) => {
                  const next = v as InvoiceStatus;
                  setStatus(next);
                  if (next === 'unpaid') {
                    setMethod(null);
                    setPaidAtDate('');
                  }
                }}
              />
            </FormField>

            <FormField label="납부 방법">
              <Select
                options={METHOD_OPTIONS}
                value={method ?? ''}
                disabled={status === 'unpaid'}
                onChange={(v) => setMethod(v ? (v as PaymentMethod) : null)}
              />
            </FormField>

            <FormField label="납부 날짜">
              {/* YYYY-MM-DD만 */}
              <TextInput
                type="date"
                value={paidAtDate}
                disabled={status === 'unpaid'}
                onChange={(v) => setPaidAtDate(v)}
              />
            </FormField>
          </div>

          {validationError && (
            <div className="text-sm text-red-500">{validationError}</div>
          )}
        </div>
      )}
    </div>
  );
}
