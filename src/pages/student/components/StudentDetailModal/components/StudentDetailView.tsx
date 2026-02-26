import type { Student } from '@/types/student';
import { useEffect, useState } from 'react';
import NormalButton from '@/shared/button/NormalButton';
import { updateStudent } from '@/shared/api/students';
import { useStudentModalStore } from '@/store/studentModalStore';
import { useInvoiceModalStore } from '@/store/invoiceModalStore';
import StudentFormFields from './shared/StudentFormFields';
import type { StudentFormState } from './shared/studentFormTypes';
import { mapStudentToForm } from './shared/studentFormMapper';

interface StudentDetailViewProps {
  student: Student;
  onDirtyChange: (dirty: boolean) => void;
  onSuccess: () => void;
}

function StudentDetailView({
  student,
  onDirtyChange,
  onSuccess,
}: StudentDetailViewProps) {
  const mappedStudent = mapStudentToForm(student);
  const [originalForm, setOriginalForm] =
    useState<StudentFormState>(mappedStudent);
  const [form, setForm] = useState<StudentFormState>(mappedStudent);
  const { mode, openUpdate, openDetail } = useStudentModalStore();
  const isEditMode = mode === 'UPDATE';

  const { open: openInvoiceModal } = useInvoiceModalStore();

  const isDirty =
    isEditMode && JSON.stringify(form) !== JSON.stringify(originalForm);
  const displayForm = isEditMode ? form : mappedStudent;

  useEffect(() => {
    onDirtyChange(isEditMode && isDirty);
  }, [isEditMode, isDirty, onDirtyChange]);

  const updateForm = <K extends keyof StudentFormState>(
    key: K,
    value: StudentFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCancelEdit = () => {
    setForm(originalForm);
    openDetail(student);
  };

  const handleStartEdit = () => {
    const mapped = mapStudentToForm(student);
    setOriginalForm(mapped);
    setForm(mapped);
    openUpdate(student);
  };

  const handleSave = async () => {
    try {
      const updatedStudent = await updateStudent(student.student_id, {
        name: form.name,
        age_group: form.ageGroup,
        phone: form.phone,
        parent_phone: form.parentPhone,
        family_discount: form.familyDiscount,
        memo: form.memo,
      });

      setOriginalForm(form);
      onDirtyChange(false);
      onSuccess();
      openDetail(updatedStudent);
    } catch (error) {
      console.error('학생 수정 실패', error);
      alert('학생 수정에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-3">
      <StudentFormFields
        form={displayForm}
        disabled={!isEditMode}
        showFamilyDiscount
        onChange={updateForm}
      />

      <div className="w-full flex justify-between gap-2">
        {!isEditMode ? (
          <NormalButton
            text="청구서 목록"
            onClick={() => openInvoiceModal(student)}
          />
        ) : (
          <div />
        )}

        <div className="flex gap-4">
          {!isEditMode && (
            <NormalButton text="수정" onClick={handleStartEdit} />
          )}

          {isEditMode && (
            <>
              <NormalButton text="저장" onClick={handleSave} disabled={!isDirty} />
              <NormalButton text="취소" onClick={handleCancelEdit} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDetailView;
