import { useInvoiceModalStore } from '@/store/invoiceModalStore';
import { useMemo } from 'react';

export default function InvoiceListModalHeader() {
  const { close, student } = useInvoiceModalStore();

  const title = useMemo(() => {
    const name = student?.name ?? '';
    return name ? `${name}의 청구서 목록` : '청구서 목록';
  }, [student]);

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <button onClick={close}>닫기</button>
    </div>
  );
}
