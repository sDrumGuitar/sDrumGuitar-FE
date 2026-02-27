import type { Student } from '@/types/student';
import { useEffect, useState } from 'react';
import NormalButton from '@/shared/button/NormalButton';
import { updateStudent } from '@/shared/api/students';
import { useStudentModalStore } from '@/store/student/studentModalStore';
import { useInvoiceModalStore } from '@/store/invoice/invoiceModalStore';
import StudentFormFields from './shared/StudentFormFields';
import {
  type StudentFormState,
  isValidStudentForm,
} from './shared/studentFormTypes';
import { mapStudentToForm } from './shared/studentFormMapper';

interface StudentDetailViewProps {
  student: Student;
  onDirtyChange: (dirty: boolean) => void;
  onSuccess: () => void;
}

// 학생 상세 보기 및 수정 컴포넌트
function StudentDetailView({
  student,
  onDirtyChange,
  onSuccess,
}: StudentDetailViewProps) {
  // 변수 선언 및 초기화
  const mappedStudent = mapStudentToForm(student); // API에서 받은 학생 데이터를 폼 상태로 매핑
  const [originalForm, setOriginalForm] =
    useState<StudentFormState>(mappedStudent); // 원본 폼 상태 저장 (수정 취소 시 사용)
  const [form, setForm] = useState<StudentFormState>(mappedStudent); // 현재 폼 상태
  const { mode, openUpdate, openDetail } = useStudentModalStore(); // 모달 상태에서 현재 모드와 학생 상세/수정 오픈 함수 가져오기
  const isEditMode = mode === 'UPDATE'; //

  const { open: openInvoiceModal } = useInvoiceModalStore(); // 청구서 모달 오픈 함수 가져오기

  const isDirty =
    isEditMode && JSON.stringify(form) !== JSON.stringify(originalForm); // 폼이 수정되었는지 여부 판단
  const displayForm = isEditMode ? form : mappedStudent; // 수정 모드일 때는 폼 상태를, 상세 보기 모드일 때는 원본 데이터를 표시

  // 폼 상태나 모드가 변경될 때마다 부모 컴포넌트에 수정 여부 알리기
  useEffect(() => {
    onDirtyChange(isEditMode && isDirty);
  }, [isEditMode, isDirty, onDirtyChange]);

  // 폼 상태 업데이트 함수
  const updateForm = <K extends keyof StudentFormState>(
    key: K,
    value: StudentFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 수정 취소 핸들러
  const handleCancelEdit = () => {
    setForm(originalForm);
    openDetail(student);
  };

  // 수정 시작 핸들러
  const handleStartEdit = () => {
    const mapped = mapStudentToForm(student); // API에서 받은 학생 데이터를 폼 상태로 매핑
    setOriginalForm(mapped);
    setForm(mapped);
    openUpdate(student);
  };

  // 저장 핸들러
  const handleSave = async () => {
    // 1. 폼 유효성 검사 - 필수 항목이 모두 입력되었는지 확인
    if (!isValidStudentForm(form)) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 2. API 요청 - 학생 정보 업데이트
    try {
      const updatedStudent = await updateStudent(student.student_id, {
        name: form.name,
        age_group: form.ageGroup as Student['age_group'],
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
      {/* 1. 폼 필드 표시 */}
      <StudentFormFields
        form={displayForm}
        disabled={!isEditMode}
        showFamilyDiscount
        onChange={updateForm}
      />

      {/* 2. 하단 버튼 - 수정 모드일 때는 저장/취소, 상세 보기 모드일 때는 청구서 목록/수정 */}
      <div className="w-full flex justify-between gap-2">
        {/* 2-1. 청구서 목록 버튼 */}
        {!isEditMode ? (
          <NormalButton
            text="청구서 목록"
            onClick={() => openInvoiceModal(student)}
          />
        ) : (
          <div />
        )}

        {/* 2-2. 수정/저장/취소 버튼 */}
        <div className="flex gap-4">
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
    </div>
  );
}

export default StudentDetailView;
