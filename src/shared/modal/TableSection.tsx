import Table from '@/shared/table/Table';

interface TableSectionProps<T> {
  dataList: T[];
  headers: string[];
  getRows: (dataList: T[]) => React.ReactNode[][];
  onRowClick?: (item: T) => void;
}

function TableSection<T>({
  dataList,
  headers,
  getRows,
  onRowClick,
}: TableSectionProps<T>) {
  if (!dataList || dataList.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>조회 내용이 없습니다.</p>
      </div>
    );
  }
  const rows = getRows(dataList);

  const handleRowClick = (rowIndex: number) => {
    const item = dataList[rowIndex];
    if (!item || !onRowClick) return;
    onRowClick(item);
  };

  return (
    <Table
      headers={headers}
      rows={rows}
      onRowClick={onRowClick ? handleRowClick : undefined}
    />
  );
}

export default TableSection;
