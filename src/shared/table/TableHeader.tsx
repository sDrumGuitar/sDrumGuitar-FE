interface TableHeadersProps {
  headers: string[];
}
function TableHeader({ headers }: TableHeadersProps) {
  return (
    <tr>
      {headers.map((header) => (
        <TH key={header} header={header} />
      ))}
    </tr>
  );
}

const TH = ({ header }: { header: string }) => {
  return <th className="text-lg py-2">{header}</th>;
};

export default TableHeader;
