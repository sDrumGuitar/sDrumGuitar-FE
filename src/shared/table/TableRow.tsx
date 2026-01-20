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
      {columns.map((data, idx) => (
        <TD key={idx}>{data}</TD>
      ))}
    </tr>
  );
}

interface TDProps {
  children: React.ReactNode;
}

const TD = ({ children }: TDProps) => {
  return <td className="text-center py-2">{children}</td>;
};

export default TableRow;
