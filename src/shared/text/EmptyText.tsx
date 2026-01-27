import type React from 'react';

interface EmptyTextProps {
  children: React.ReactNode;
}
export default function EmptyText({ children }: EmptyTextProps) {
  return <div className="text-sm text-gray-500">{children}</div>;
}
