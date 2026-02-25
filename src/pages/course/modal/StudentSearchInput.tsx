import { useState } from 'react';
import { TextInput } from '@/shared/form';
import NormalButton from '@/shared/button/NormalButton';
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
  const [draft, setDraft] = useState('');
  const [results, setResults] = useState<StudentSearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const displayValue = isUserTyping ? draft : value;

  const handleSearch = async () => {
    if (disabled) return;

    const keyword = (isUserTyping ? draft : value).trim();
    if (!keyword) {
      setResults([]);
      setOpen(false);
      setNotFound(false);
      return;
    }

    const { students, notFound: isNotFound } = await searchStudents(keyword);
    setResults(students);
    setNotFound(isNotFound);
    setOpen(students.length > 0);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <TextInput
          type="text"
          value={displayValue}
          placeholder="이름으로 검색"
          onChange={(v) => {
            setDraft(v);
            setIsUserTyping(true);
            setResults([]);
            setOpen(false);
            setNotFound(false);
          }}
          disabled={disabled}
        />
        <NormalButton
          text="검색"
          onClick={handleSearch}
          disabled={disabled}
          className="min-w-[64px]"
        />
      </div>

      {open && !disabled && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow">
          {results.map((student, index) => (
            <li
              key={`${student.id}-${index}`}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSelect(student);
                setDraft('');
                setIsUserTyping(false);
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
      {!disabled && notFound && (
        <div className="mt-2 text-sm text-gray-500">
          검색된 학생이 없습니다.
        </div>
      )}
    </div>
  );
}
