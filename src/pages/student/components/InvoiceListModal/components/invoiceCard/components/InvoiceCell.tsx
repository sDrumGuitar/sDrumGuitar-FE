interface InvoiceCellProps {
  className: string;
  cellName: string;
  cellStyle?: string;
  value: string;
}
// 청구서 카드 내의 각 정보 셀을 렌더링하는 컴포넌트
export default function InvoiceCell({
  className,
  cellName,
  cellStyle,
  value,
}: InvoiceCellProps) {
  return (
    <div className="flex items-center gap-8">
      {/* 1. 셀 라벨 */}
      <div className={`${className} text-sm font-semibold text-gray-800`}>
        {cellName}
      </div>

      {/* 2. 셀 값 */}
      <div className={`text-sm text-gray-800 ${cellStyle}`}>{value}</div>
    </div>
  );
}
