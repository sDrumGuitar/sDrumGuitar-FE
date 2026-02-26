import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  onRowClick?: (rowIndex: number) => void;
  rowClassName?: (rowIndex: number) => string;
}

function Table({ headers, rows, onRowClick, rowClassName }: TableProps) {
  return (
    <table className="w-full">
      <thead>
        <TableHeader headers={headers} />
      </thead>
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
