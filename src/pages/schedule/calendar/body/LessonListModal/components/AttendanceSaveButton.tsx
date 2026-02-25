import NormalButton from '@/shared/button/NormalButton';

interface AttendanceSaveButtonProps {
  disabled: boolean;
  onClick: () => void | Promise<void>;
}

export default function AttendanceSaveButton({
  disabled,
  onClick,
}: AttendanceSaveButtonProps) {
  return <NormalButton text="저장" onClick={onClick} disabled={disabled} />;
}
