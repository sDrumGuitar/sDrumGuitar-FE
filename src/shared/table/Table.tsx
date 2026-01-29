import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  onRowClick?: (rowIndex: number) => void;
}

function Table({ headers, rows, onRowClick }: TableProps) {
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
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
