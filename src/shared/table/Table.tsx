import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  onRowClick?: (rowIndex: number) => void;
  rowClassName?: (rowIndex: number) => string;
}

// 테이블 컴포넌트
function Table({ headers, rows, onRowClick, rowClassName }: TableProps) {
  return (
    <table className="w-full">
      {/* 1. 테이블 헤더 */}
      <thead>
        <TableHeader headers={headers} />
      </thead>

      {/* 2. 테이블 바디 */}
      <tbody>
        {rows.map((row, index) => (
          <TableRow
            key={index}
            columns={row}
            index={index}
            onClick={onRowClick}
            className={rowClassName ? rowClassName(index) : undefined}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
