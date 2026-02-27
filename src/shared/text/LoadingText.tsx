import type React from 'react';

interface LoadingTextProps {
  children: React.ReactNode;
}
// 로딩 중일 때 표시할 텍스트 컴포넌트
export default function LoadingText({ children }: LoadingTextProps) {
  return <div className="text-sm text-gray-500">{children}</div>;
}
