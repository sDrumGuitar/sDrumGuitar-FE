import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
  headers: string[];
  rows: string[][];
}
function Table({ headers, rows }: TableProps) {
  return (
    <table className="w-full table-fixed">
      <thead>
        <TableHeader headers={headers} />
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow columns={row} key={index} index={index} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
