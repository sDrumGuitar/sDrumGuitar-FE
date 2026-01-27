import { useEffect, useState } from 'react';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useInvoiceModalStore } from '@/store/invoiceModalStore';
import { api } from '@/shared/api/axios';
import LoadingText from '@/shared/text/LoadingText';
import EmptyText from '@/shared/text/EmptyText';
import InvoiceListModalHeader from './InvoiceListModalHeader';
import InvoiceListModalBody from './InvoiceListModalBody';

type InvoiceStatus = 'paid' | 'unpaid';
type PaymentMethod = 'card' | 'cash' | null;
type ClassType = 'DRUM' | 'GUITAR' | 'PIANO' | 'VOCAL';

export type InvoiceItem = {
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
};

// json-server invoices 컬렉션 row (db.json에 맞춰서)
type InvoiceRow = {
  id: number | string;
  course_id: number | string;
  student_id: number | string;
  issued_at: string;

  paid_at: string | null;
  status: InvoiceStatus;
  method: PaymentMethod;

  lesson_count: number | string;
  family_discount: boolean;
  class_type: ClassType;
  total_amount: number | string;
};

export default function InvoiceListModal() {
  const { isOpen, student, close } = useInvoiceModalStore();
  const [loading, setLoading] = useState(false);
  const [invociesList, setInvociesList] = useState<InvoiceItem[]>([]);

  const load = async () => {
    if (!student) return;

    try {
      setLoading(true);

      const res = await api.get<InvoiceRow[]>('/invoices', {
        params: {
          student_id: student.id,
          _sort: 'issued_at',
          _order: 'desc',
        },
      });

      const mapped: InvoiceItem[] = res.data.map((inv) => ({
        invoice_id: Number(inv.id),
        course_id: Number(inv.course_id),
        issued_at: inv.issued_at,

        paid_at: inv.paid_at,
        status: inv.status,
        method: inv.method,

        lesson_count: Number(inv.lesson_count),
        family_discount: Boolean(inv.family_discount),
        class_type: inv.class_type,
        total_amount: Number(inv.total_amount),
      }));

      setInvociesList(mapped);
    } catch (e) {
      console.error(e);
      alert('청구서 정보를 불러오는데 실패했습니다.');
      close();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handlePatched = (next: {
    invoice_id: number;
    status: InvoiceStatus;
    method: PaymentMethod;
    paid_at: string | null;
  }) => {
    setInvociesList((prev) =>
      prev.map((p) =>
        p.invoice_id === next.invoice_id
          ? {
              ...p,
              status: next.status,
              method: next.method,
              paid_at: next.paid_at,
            }
          : p,
      ),
    );
  };

  if (!isOpen || !student) return null;

  return (
    <ModalWrapper onClose={close}>
      {/* 헤더 */}
      <InvoiceListModalHeader />

      {/* 본문 */}
      {loading ? (
        <LoadingText>불러오는 중...</LoadingText>
      ) : invociesList.length === 0 ? (
        <EmptyText>청구서가 없습니다.</EmptyText>
      ) : (
        <InvoiceListModalBody
          invociesList={invociesList}
          handlePatched={handlePatched}
        />
      )}
    </ModalWrapper>
  );
}
