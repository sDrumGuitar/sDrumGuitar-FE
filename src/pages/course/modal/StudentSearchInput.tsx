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
          className="min-w-16"
        />
        {!disabled && value && !isUserTyping && (
          <span className="inline-flex items-center gap-1 rounded-full border border-primary bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 6.2L4.7 8.4L9.5 3.6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            선택됨
          </span>
        )}
      </div>

      {open && !disabled && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow">
          {results.map((student, index) => (
            <li
              key={`${student.id}-${index}`}
              className={`px-3 py-2 cursor-pointer transition-colors ${
                !isUserTyping && value === student.name
                  ? 'bg-primary/10 border-l-4 border-primary'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                onSelect(student);
                setDraft('');
                setIsUserTyping(false);
                setOpen(false);
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{student.name}</div>
                {!isUserTyping && value === student.name && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-white px-2 py-0.5 text-[11px] font-semibold text-primary">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 6.2L4.7 8.4L9.5 3.6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    선택됨
                  </span>
                )}
              </div>
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
