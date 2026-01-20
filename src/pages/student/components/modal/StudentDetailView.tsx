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
import { useState } from 'react';

interface Props {
  student: Student;
}

function StudentDetailView({ student }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="space-y-3">
      <FormField label="이름">
        <TextInput value={student.name} disabled={!isEditMode} />
      </FormField>

      <FormField label="구분">
        <Select
          options={AGE_GROUP_OPTIONS}
          value={student.age_group}
          disabled={!isEditMode}
        />
      </FormField>

      <FormField label="전화번호">
        <NumberInput value={student.phone} disabled={!isEditMode} />
      </FormField>

      <FormField label="학부모 전화번호">
        <NumberInput value={student.parent_phone} disabled={!isEditMode} />
      </FormField>

      <FormField label="가족 할인">
        <RadioGroup
          options={FAMILY_DISCOUNT_OPTIONS}
          value={String(student.family_discount)}
          disabled={!isEditMode}
        />
      </FormField>

      <FormField label="메모">
        <Textarea value={student.memo ?? ''} disabled={!isEditMode} />
      </FormField>

      <div className="w-full flex justify-end gap-2">
        {!isEditMode && (
          <NormalButton text="수정" onClick={() => setIsEditMode(true)} />
        )}

        {isEditMode && (
          <>
            <NormalButton
              text="저장"
              onClick={() => {
                // TODO: UPDATE API 연결
                console.log('저장 클릭');
                setIsEditMode(false);
              }}
            />
            <NormalButton
              text="취소"
              onClick={() => {
                // TODO: 원래 값으로 되돌리기
                setIsEditMode(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDetailView;
