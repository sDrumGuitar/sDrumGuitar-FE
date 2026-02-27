import InvoiceCell from './InvoiceCell';
import type { InvoiceStatus } from '../types';

interface InvoiceCardDetailsProps {
  status: InvoiceStatus;
  display: {
    classText: string;
    statusText: string;
    lessonCount: string;
    methodText: string;
    familyDiscount: string;
    paidAtText: string;
    totalPrice: string;
    issuedAtText: string;
  };
}
// 청구서 카드의 상세 정보를 렌더링하는 컴포넌트
export default function InvoiceCardDetails({
  status,
  display,
}: InvoiceCardDetailsProps) {
  const {
    classText,
    statusText,
    lessonCount,
    methodText,
    familyDiscount,
    paidAtText,
    totalPrice,
    issuedAtText,
  } = display;

  const leftLabelW = 'w-20'; // 왼쪽 라벨 폭
  const rightLabelW = 'w-28'; // 오른쪽 라벨 폭 고정

  return (
    <div className="mt-2">
      {/* 1. 폼 필드 */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-6">
        {/* row 1 */}
        <InvoiceCell
          className={leftLabelW}
          cellName="클래스"
          value={classText}
        />
        <InvoiceCell
          className={rightLabelW}
          cellName="납부 상태"
          value={statusText}
          cellStyle={status === 'paid' ? 'text-green-600' : 'text-red-500'}
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

      {/* 2. 발행 날짜 */}
      <div className="mt-6 flex justify-end text-sm text-gray-700">
        <span className="font-semibold mr-3">청구서 발행 날짜</span>
        <span>{issuedAtText}</span>
      </div>
    </div>
  );
}
