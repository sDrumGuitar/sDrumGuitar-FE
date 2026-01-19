interface TableRowProps {
  columns: string[];
  index: number;
}
function TableRow({ columns, index }: TableRowProps) {
  const isEven = index % 2 === 0;

  return (
    <tr
      className={`text-gray-600 hover:text-primary hover:font-bold ${
        isEven ? 'bg-primary-light' : ''
      }`}
    >
      {columns.map((column) => (
        <TD key={column} column={column} />
      ))}
    </tr>
  );
}

const TD = ({ column }: { column: string }) => {
  return <td className="text-center py-2">{column}</td>;
};

export default TableRow;
