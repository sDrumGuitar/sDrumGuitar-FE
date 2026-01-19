import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
  headers: string[];
  rows: string[][];
}
function Table({ headers, rows }: TableProps) {
  return (
    <table className="w-full table-fixed">
      <TableHeader headers={headers} />
      {rows.map((row, index) => (
        <TableRow columns={row} key={index} index={index} />
      ))}
    </table>
  );
}

export default Table;
