interface TDProps {
  children: React.ReactNode;
}

// 테이블 데이터 셀 컴포넌트
const TD = ({ children }: TDProps) => {
  return <td className="text-center py-2">{children}</td>;
};

export default TD;
