import { useEffect, useState } from 'react';
import NormalButton from '@/shared/button/NormalButton';
import { createStudent } from '@/shared/api/students';
import { useStudentModalStore } from '@/store/student/studentModalStore';
import StudentFormFields from './shared/StudentFormFields';
import {
  INITIAL_FORM,
  isValidStudentForm,
  type StudentFormState,
} from './shared/studentFormTypes';

interface StudentCreateFormProps {
  onDirtyChange: (dirty: boolean) => void;
  onSuccess: () => void;
}

// 학생 생성 폼 컴포넌트
function StudentCreateForm({
  onDirtyChange,
  onSuccess,
}: StudentCreateFormProps) {
  const { close } = useStudentModalStore(); // 모달 닫기 함수
  const [form, setForm] = useState<StudentFormState>(INITIAL_FORM); // 폼 상태 관리
  const isDirty = JSON.stringify(form) !== JSON.stringify(INITIAL_FORM); // 폼이 초기 상태에서 변경되었는지 여부

  // 폼 상태가 변경될 때마다 부모 컴포넌트에 변경 여부 알리기
  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  // 폼 필드 업데이트 함수
  const updateForm = <K extends keyof StudentFormState>(
    key: K,
    value: StudentFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isValid = isValidStudentForm(form); // 폼 유효성 검사
  const canSubmit = isDirty && isValid; // 제출 가능 여부

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    if (!canSubmit) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      await createStudent({
        name: form.name,
        age_group: form.ageGroup,
        phone: form.phone,
        parent_phone: form.parentPhone,
        memo: form.memo,
      });

      setForm(INITIAL_FORM);
      onDirtyChange(false);
      onSuccess();
      close();
    } catch (error) {
      console.error('학생 등록 실패', error);
      alert('학생 등록에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-3">
      {/* 1. 입력 폼 */}
      <StudentFormFields form={form} onChange={updateForm} />

      {/* 2. 저장 버튼 */}
      <div className="w-full flex justify-end">
        <NormalButton
          onClick={handleSubmit}
          text="저장"
          disabled={!canSubmit}
        />
      </div>
    </div>
  );
}

export default StudentCreateForm;
