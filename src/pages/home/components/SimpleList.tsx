interface SimpleListProps<T> {
  items: T[];
  emptyText: string;
  renderItem: (item: T) => React.ReactNode;
}

function SimpleList<T>({ items, emptyText, renderItem }: SimpleListProps<T>) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="rounded-md border border-gray-100 p-2">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default SimpleList;
