import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
  headers: string[];
  rows: string[][];
  onRowClick?: (rowIndex: number) => void;
}

function Table({ headers, rows, onRowClick }: TableProps) {
  return (
    <table className="w-full table-fixed">
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
