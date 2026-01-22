import Table from '@/shared/table/Table';

interface TableSectionProps<T> {
  dataList: T[];
  headers: string[];
  getRows: (dataList: T[]) => string[][];
  onRowClick?: (item: T) => void;
}

function TableSection<T>({
  dataList,
  headers,
  getRows,
  onRowClick,
}: TableSectionProps<T>) {
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
