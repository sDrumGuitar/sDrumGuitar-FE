import TH from "./TH";

interface TableHeadersProps {
  headers: string[];
}

// 테이블 헤더 컴포넌트
function TableHeader({ headers }: TableHeadersProps) {
  return (
    <tr>
      {headers.map((header) => (
        <TH key={header} header={header} />
      ))}
    </tr>
  );
}

export default TableHeader;
