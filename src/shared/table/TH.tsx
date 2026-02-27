// 테이블 헤더 셀 컴포넌트
const TH = ({ header }: { header: string }) => {
  return <th className="py-2 text-sm xl:text-base">{header}</th>;
};

export default TH;