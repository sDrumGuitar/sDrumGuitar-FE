import type React from 'react';

interface LoadingTextProps {
  children: React.ReactNode;
}
export default function LoadingText({ children }: LoadingTextProps) {
  return <div className="text-sm text-gray-500">{children}</div>;
}
