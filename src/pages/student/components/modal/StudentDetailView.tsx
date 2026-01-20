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

interface StudentFormState {
  name: string;
  ageGroup: string;
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
}

function StudentDetailView({ student, onDirtyChange }: StudentDetailViewProps) {
  const [originalForm, setOriginalForm] = useState<StudentFormState>(
    mapStudentToForm(student),
  );

  const [form, setForm] = useState<StudentFormState>(originalForm);
  const [isEditMode, setIsEditMode] = useState(false);

  const isDirty = JSON.stringify(form) !== JSON.stringify(originalForm);

  useEffect(() => {
    const mapped = mapStudentToForm(student);
    setOriginalForm(mapped);
    setForm(mapped);
    setIsEditMode(false);
  }, [student]);

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
    setForm(originalForm); // 원래 값 복구
    setIsEditMode(false);
  };

  const handleSave = () => {
    // TODO: UPDATE API 연결
    console.log('수정된 값', form);

    setOriginalForm(form);
    setIsEditMode(false);
    onDirtyChange(false);
  };
  return (
    <div className="space-y-3">
      <FormField label="이름">
        <TextInput
          value={form.name}
          disabled={!isEditMode}
          onChange={(v) => updateForm('name', v)}
        />
      </FormField>

      <FormField label="구분">
        <Select
          options={AGE_GROUP_OPTIONS}
          value={form.ageGroup}
          disabled={!isEditMode}
          onChange={(v) => updateForm('ageGroup', v)}
        />
      </FormField>

      <FormField label="전화번호">
        <NumberInput
          value={form.phone}
          disabled={!isEditMode}
          onChange={(v) => updateForm('phone', v)}
        />
      </FormField>

      <FormField label="학부모 전화번호">
        <NumberInput
          value={form.parentPhone}
          disabled={!isEditMode}
          onChange={(v) => updateForm('parentPhone', v)}
        />
      </FormField>

      <FormField label="가족 할인">
        <RadioGroup
          options={FAMILY_DISCOUNT_OPTIONS}
          value={String(form.familyDiscount)}
          disabled={!isEditMode}
          onChange={(v) => updateForm('familyDiscount', v === 'true')}
        />
      </FormField>

      <FormField label="메모">
        <Textarea
          value={form.memo ?? ''}
          disabled={!isEditMode}
          onChange={(v) => updateForm('memo', v)}
        />
      </FormField>

      <div className="w-full flex justify-end gap-2">
        {!isEditMode && (
          <NormalButton text="수정" onClick={() => setIsEditMode(true)} />
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
