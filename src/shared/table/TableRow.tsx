import TD from "./TD";

interface TableRowProps {
  columns: React.ReactNode[];
  index: number;
  onClick?: (rowIndex: number) => void;
  className?: string;
}

// 테이블 로우 컴포넌트
function TableRow({ columns, index, onClick, className }: TableRowProps) {
  const isEven = index % 2 === 0;
  const isClickable = Boolean(onClick);
  const isSelected = className?.includes('row-selected');

  return (
    <tr
      onClick={() => onClick?.(index)}
      className={`text-gray-600 ${
        isClickable ? 'cursor-pointer hover:text-primary' : ''
      } ${!isSelected && isEven ? 'bg-gray-50' : ''} ${className ?? ''}`}
    >
      {columns.map((data, idx) => (
        <TD key={idx}>{data}</TD>
      ))}
    </tr>
  );
}



export default TableRow;
