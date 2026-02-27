// 테이블 헤더 셀 컴포넌트
const TH = ({ header }: { header: string }) => {
  return <th className="text-lg py-2">{header}</th>;
};

export default TH;