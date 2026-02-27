interface TDProps {
  children: React.ReactNode;
}

// 테이블 데이터 셀 컴포넌트
const TD = ({ children }: TDProps) => {
  return <td className="text-center py-2 text-sm xl:text-base">{children}</td>;
};

export default TD;
