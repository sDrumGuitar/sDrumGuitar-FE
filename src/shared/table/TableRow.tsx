interface TableRowProps {
  columns: React.ReactNode[];
  index: number;
  onClick?: (rowIndex: number) => void;
  className?: string;
}

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

interface TDProps {
  children: React.ReactNode;
}

const TD = ({ children }: TDProps) => {
  return <td className="text-center py-2">{children}</td>;
};

export default TableRow;
