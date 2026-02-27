import FormField from '@/shared/form/FormField';
import Select from '@/shared/form/Select';
import TextInput from '@/shared/form/TextInput';
import { PAYMENT_METHOD_OPTIONS, PAYMENT_STATUS_OPTIONS } from '@/constants/invoice';
import type { InvoiceStatus, PaymentMethod } from '../types';

interface InvoiceEditFormProps {
  status: InvoiceStatus;
  setStatus: (next: InvoiceStatus) => void;
  method: PaymentMethod;
  setMethod: (next: PaymentMethod) => void;
  paidAtDate: string;
  setPaidAtDate: (next: string) => void;
  validationError: string | null;
}

// 청구서 편집 폼 컴포넌트
export default function InvoiceEditForm({
  status,
  setStatus,
  method,
  setMethod,
  paidAtDate,
  setPaidAtDate,
  validationError,
}: InvoiceEditFormProps) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
      {/* 1. 납부 상태, 납부 방법, 납부 날짜 입력 폼 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1-1. 납부 상태 */}
        <FormField label="납부 상태">
          <Select
            options={PAYMENT_STATUS_OPTIONS}
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

        {/* 1-2. 납부 방법 */}
        <FormField label="납부 방법">
          <Select
            options={PAYMENT_METHOD_OPTIONS}
            value={method ?? ''}
            disabled={status === 'unpaid'}
            onChange={(v) => setMethod(v ? (v as PaymentMethod) : null)}
          />
        </FormField>

        {/* 1-3. 납부 날짜 */}
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

      {/* 2. 유효성 검사 오류 메시지 */}
      {validationError && (
        <div className="text-sm text-red-500">{validationError}</div>
      )}
    </div>
  );
}
