import { useEffect, useState } from 'react';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useInvoiceModalStore } from '@/store/invoiceModalStore';
import { getStudentInvoices } from '@/shared/api/invoices';
import LoadingText from '@/shared/text/LoadingText';
import EmptyText from '@/shared/text/EmptyText';
import InvoiceListModalHeader from './InvoiceListModalHeader';
import InvoiceListModalBody from './InvoiceListModalBody';
import type {
  InvoiceStatus,
  PaymentMethod,
  StudentInvoiceItem,
} from '@/types/invoice';

export default function InvoiceListModal() {
  const { isOpen, student, close } = useInvoiceModalStore();
  const [loading, setLoading] = useState(false);
  const [invociesList, setInvociesList] = useState<StudentInvoiceItem[]>([]);

  const load = async () => {
    if (!student) return;

    try {
      setLoading(true);
      const res = await getStudentInvoices(student.student_id);
      setInvociesList(res.items);
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
