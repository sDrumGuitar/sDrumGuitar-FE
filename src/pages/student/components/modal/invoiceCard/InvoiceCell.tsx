interface InvoiceCellProps {
  className: string;
  cellName: string;
  cellStyle?: string;
  value: string;
}
export default function InvoiceCell({
  className,
  cellName,
  cellStyle,
  value,
}: InvoiceCellProps) {
  return (
    <div className="flex items-center gap-8">
      <div className={`${className} text-sm font-semibold text-gray-800`}>
        {cellName}
      </div>
      <div className={`text-sm text-gray-800 ${cellStyle}`}>{value}</div>
    </div>
  );
}
