import type React from 'react';

interface EmptyTextProps {
  children: React.ReactNode;
}
// 비어있을 때 표시할 텍스트 컴포넌트
export default function EmptyText({ children }: EmptyTextProps) {
  return <div className="text-sm text-gray-500">{children}</div>;
}
