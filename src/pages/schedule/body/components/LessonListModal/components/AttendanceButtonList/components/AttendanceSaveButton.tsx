import NormalButton from '@/shared/button/NormalButton';

interface AttendanceSaveButtonProps {
  disabled: boolean;
  onClick: () => void | Promise<void>;
}

// 출석 상태 저장 버튼 컴포넌트
export default function AttendanceSaveButton({
  disabled,
  onClick,
}: AttendanceSaveButtonProps) {
  return <NormalButton text="저장" onClick={onClick} disabled={disabled} />;
}
