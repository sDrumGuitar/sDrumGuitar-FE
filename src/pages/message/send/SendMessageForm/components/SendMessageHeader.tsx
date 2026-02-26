import NormalButton from '@/shared/button/NormalButton';

interface SendMessageHeaderProps {
  selectedStudentName: string;
  selectedStudentGroup: string;
  onOpenTemplate: () => void;
}

function SendMessageHeader({
  selectedStudentName,
  selectedStudentGroup,
  onOpenTemplate,
}: SendMessageHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-lg font-bold text-gray-900">메시지 작성</p>
        <p className="text-xs text-gray-500">
          {selectedStudentName} · {selectedStudentGroup}
        </p>
      </div>
      <NormalButton text="템플릿 불러오기" onClick={onOpenTemplate} />
    </div>
  );
}

export default SendMessageHeader;
