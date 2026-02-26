import Table from '@/shared/table/Table';

interface TableSectionProps<T> {
  dataList: T[];
  headers: string[];
  getRows: (dataList: T[]) => React.ReactNode[][];
  onRowClick?: (item: T) => void;
  getRowClassName?: (item: T, index: number) => string;
}

function TableSection<T>({
  dataList,
  headers,
  getRows,
  onRowClick,
  getRowClassName,
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
      rowClassName={
        getRowClassName
          ? (rowIndex) => getRowClassName(dataList[rowIndex], rowIndex)
          : undefined
      }
    />
  );
}

export default TableSection;
