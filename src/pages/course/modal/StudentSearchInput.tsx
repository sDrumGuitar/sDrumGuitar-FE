import { useEffect, useState } from 'react';
import { TextInput } from '@/shared/form';
import { searchStudents, type StudentSearchItem } from '@/shared/api/students';

interface StudentSearchInputProps {
  value: string;
  onSelect: (student: StudentSearchItem) => void;
  disabled?: boolean;
}

export default function StudentSearchInput({
  value,
  onSelect,
  disabled = false,
}: StudentSearchInputProps) {
  const [keyword, setKeyword] = useState(value);
  const [results, setResults] = useState<StudentSearchItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disabled || keyword.trim().length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    const fetch = async () => {
      const data = await searchStudents(keyword);
      const filtered = data.filter((student) => student.name.includes(keyword));
      setResults(filtered);
      setOpen(true);
    };

    fetch();
  }, [keyword, disabled]);

  return (
    <div className="relative">
      <TextInput
        type="text"
        value={keyword}
        placeholder="이름으로 검색"
        onChange={(v) => {
          setKeyword(v);
          setOpen(true);
        }}
        disabled={disabled}
      />

      {open && !disabled && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow">
          {results.map((student, index) => (
            <li
              key={`${student.id}-${index}`}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSelect(student);
                setKeyword(student.name);
                setOpen(false);
              }}
            >
              <div className="font-medium">{student.name}</div>
              {student.phone && (
                <div className="text-xs text-gray-500">{student.phone}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
