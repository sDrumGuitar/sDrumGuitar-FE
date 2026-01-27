import FormField from '@/shared/form/FormField';
import TextInput from '@/shared/form/TextInput';
import Select from '@/shared/form/Select';
import NumberInput from '@/shared/form/NumberInput';
import RadioGroup from '@/shared/form/RadioGroup';
import Textarea from '@/shared/form/Textarea';
import NormalButton from '@/shared/button/NormalButton';
import {
  AGE_GROUP_OPTIONS,
  FAMILY_DISCOUNT_OPTIONS,
} from '@/constants/student';
import type { Student } from '@/types/student';
import { useEffect, useState } from 'react';
import { updateStudent } from '@/shared/api/students';
import { useStudentModalStore } from '@/store/studentModalStore';
// ✅ 추가
import { useInvoiceModalStore } from '@/store/invoiceModalStore';

interface StudentFormState {
  name: string;
  ageGroup: Student['age_group'];
  phone: string;
  parentPhone: string;
  familyDiscount: boolean;
  memo: string;
}

function mapStudentToForm(student: Student): StudentFormState {
  return {
    name: student.name,
    ageGroup: student.age_group,
    phone: student.phone,
    parentPhone: student.parent_phone,
    familyDiscount: student.family_discount,
    memo: student.memo ?? '',
  };
}

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
  const [originalForm, setOriginalForm] = useState<StudentFormState>(
    mappedStudent,
  );
  const [form, setForm] = useState<StudentFormState>(mappedStudent);
  const { mode, openUpdate, openDetail } = useStudentModalStore();
  const isEditMode = mode === 'UPDATE';

  // ✅ 추가
  const { open: openInvoiceModal } = useInvoiceModalStore();

  const isDirty = isEditMode && JSON.stringify(form) !== JSON.stringify(originalForm);
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

  // 취소 / 저장 수정 버튼 로직
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
    console.log('PATCH 대상 student.id:', student.id);
    try {
      const updatedStudent = await updateStudent(student.id, {
        name: form.name,
        age_group: form.ageGroup,
        phone: form.phone,
        parent_phone: form.parentPhone,
        family_discount: form.familyDiscount,
        memo: form.memo,
      });

      // 성공 시 기준값 갱신
      setOriginalForm(form);
      onDirtyChange(false);
      onSuccess(); // ⭐ 목록 갱신 트리거
      openDetail(updatedStudent);
    } catch (error) {
      console.error('학생 수정 실패', error);
      alert('학생 수정에 실패했습니다.');
    }
  };
  return (
    <div className="space-y-3">
      <FormField label="이름">
        <TextInput
          type="text"
          value={displayForm.name}
          disabled={!isEditMode}
          onChange={(v) => updateForm('name', v)}
        />
      </FormField>

      <FormField label="구분">
        <Select
          options={AGE_GROUP_OPTIONS}
          value={displayForm.ageGroup}
          disabled={!isEditMode}
          onChange={(v) => updateForm('ageGroup', v as Student['age_group'])}
        />
      </FormField>

      <FormField label="전화번호">
        <NumberInput
          value={displayForm.phone}
          disabled={!isEditMode}
          onChange={(v) => updateForm('phone', v)}
        />
      </FormField>

      <FormField label="학부모 전화번호">
        <NumberInput
          value={displayForm.parentPhone}
          disabled={!isEditMode}
          onChange={(v) => updateForm('parentPhone', v)}
        />
      </FormField>

      <FormField label="가족 할인">
        <RadioGroup
          options={FAMILY_DISCOUNT_OPTIONS}
          value={String(displayForm.familyDiscount)}
          disabled={!isEditMode}
          onChange={(v) => updateForm('familyDiscount', v === 'true')}
        />
      </FormField>

      <FormField label="메모">
        <Textarea
          value={displayForm.memo ?? ''}
          disabled={!isEditMode}
          onChange={(v) => updateForm('memo', v)}
        />
      </FormField>

      {/* 좌측 청구서 목록 버튼 추가 */}
      <div className="w-full flex justify-between gap-2">
        {/* 상세보기일 때만 */}
        {!isEditMode ? (
          <NormalButton
            text="청구서 목록"
            onClick={() => openInvoiceModal(student)}
          />
        ) : (
          <div /> 
        )}

          {!isEditMode && (
            <NormalButton text="수정" onClick={handleStartEdit} />
          )}

        {isEditMode && (
          <>
            <NormalButton
              text="저장"
              onClick={handleSave}
              disabled={!isDirty}
            />
            <NormalButton text="취소" onClick={handleCancelEdit} />
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDetailView;
