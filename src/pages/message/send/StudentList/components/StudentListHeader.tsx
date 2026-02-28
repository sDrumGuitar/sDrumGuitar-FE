import NormalButton from '@/shared/button/NormalButton';

interface StudentListHeaderProps {
  totalCount: number;
  selectedCount: number;
  onSelectAll: () => void;
  onClearAll: () => void;
}

function StudentListHeader({
  totalCount,
  selectedCount,
  onSelectAll,
  onClearAll,
}: StudentListHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      <div>
        <p className="text-lg font-bold text-gray-900">학생 목록</p>
        <p className="text-xs text-gray-500">발송 대상을 선택할 수 있어요.</p>
      </div>
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
        <span className="w-fit rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          선택 {selectedCount} / 총 {totalCount}명
        </span>
        <div className="flex w-full gap-2 md:w-auto">
          <NormalButton
            text="전체 선택"
            onClick={onSelectAll}
            disabled={totalCount === 0}
            className="h-9 w-full md:w-auto"
          />
          <NormalButton
            text="전체 취소"
            onClick={onClearAll}
            disabled={selectedCount === 0}
            className="h-9 w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentListHeader;
