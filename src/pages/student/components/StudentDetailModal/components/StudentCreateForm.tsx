import { useEffect, useState } from 'react';
import NormalButton from '@/shared/button/NormalButton';
import { createStudent } from '@/shared/api/students';
import { useStudentModalStore } from '@/store/studentModalStore';
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

function StudentCreateForm({
  onDirtyChange,
  onSuccess,
}: StudentCreateFormProps) {
  const { close } = useStudentModalStore();
  const [form, setForm] = useState<StudentFormState>(INITIAL_FORM);
  const isDirty = JSON.stringify(form) !== JSON.stringify(INITIAL_FORM);

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const updateForm = <K extends keyof StudentFormState>(
    key: K,
    value: StudentFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isValid = isValidStudentForm(form);
  const canSubmit = isDirty && isValid;

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
      <StudentFormFields form={form} onChange={updateForm} />

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
