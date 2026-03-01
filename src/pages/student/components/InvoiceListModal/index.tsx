import { useEffect, useState } from 'react';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useInvoiceModalStore } from '@/store/invoice/invoiceModalStore';
import { getStudentInvoices } from '@/shared/api/invoices';
import LoadingText from '@/shared/text/LoadingText';
import EmptyText from '@/shared/text/EmptyText';
import InvoiceListModalHeader from './components/InvoiceListModalHeader';
import InvoiceListModalBody from './components/InvoiceListModalBody';
import type {
  InvoiceStatus,
  PaymentMethod,
  StudentInvoiceItem,
} from '@/types/invoice';
import { useMessageSendModalStore } from '@/store/message/messageSendModalStore';
import type { InvoiceData } from './components/invoiceCard/types';

// 학생 청구서 목록 모달 컴포넌트
export default function InvoiceListModal() {
  const { isOpen, student, close } = useInvoiceModalStore(); // 모달 상태 및 학생 정보 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [invociesList, setInvociesList] = useState<StudentInvoiceItem[]>([]); // 청구서 목록 상태 관리
  const { open: openMessageSendModal } = useMessageSendModalStore();

  // 학생의 청구서 목록을 API에서 불러오는 함수
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

  // 모달이 열릴 때마다 청구서 목록 불러오기
  useEffect(() => {
    if (isOpen) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // 청구서 정보가 변경되었을 때 목록을 업데이트하는 함수
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

  const handleSendMessage = (invoice: InvoiceData) => {
    if (!student) return;
    openMessageSendModal({
      title: '미납 문자 보내기',
      kind: 'unpaid',
      targetType: 'invoice',
      student,
      invoiceId: invoice.invoiceId,
      resetSelection: true,
    });
  };

  // 모달이 열려있지 않거나 학생 정보가 없으면 아무것도 렌더링하지 않음
  if (!isOpen || !student) return null;

  // 모달 렌더링
  return (
    <ModalWrapper onClose={close}>
      {/* 1. 헤더 */}
      <InvoiceListModalHeader />

      {/* 2. 본문 */}
      {loading ? (
        <LoadingText>불러오는 중...</LoadingText>
      ) : invociesList.length === 0 ? (
        <EmptyText>청구서가 없습니다.</EmptyText>
      ) : (
        <InvoiceListModalBody
          invociesList={invociesList}
          handlePatched={handlePatched}
          onSendMessage={handleSendMessage}
        />
      )}
    </ModalWrapper>
  );
}
