// 테이블 헤더 셀 컴포넌트
const TH = ({ header }: { header: string }) => {
  return (
    <th className="bg-slate-50 text-gray-500 font-medium py-2 text-xs xl:text-sm">
      {header}
    </th>
  );
};

export default TH;
