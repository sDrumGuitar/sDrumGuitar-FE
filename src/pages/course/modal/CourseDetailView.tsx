// import FormField from '@/shared/form/FormField';
// import TextInput from '@/shared/form/TextInput';
// import Select from '@/shared/form/Select';
// import NumberInput from '@/shared/form/NumberInput';
// import RadioGroup from '@/shared/form/RadioGroup';
// import Textarea from '@/shared/form/Textarea';
// import NormalButton from '@/shared/button/NormalButton';
// import {
//   AGE_GROUP_OPTIONS,
//   FAMILY_DISCOUNT_OPTIONS,
// } from '@/constants/course';
// import type { Course } from '@/types/course';
// import { useEffect, useState } from 'react';
// import { updateCourse } from '@/shared/api/courses';
// import { useCourseModalStore } from '@/store/courseModalStore';

// interface CourseFormState {
//   name: string;
//   ageGroup: Course['age_group'];
//   phone: string;
//   parentPhone: string;
//   familyDiscount: boolean;
//   memo: string;
// }

// function mapCourseToForm(course: Course): CourseFormState {
//   return {
//     name: course.name,
//     ageGroup: course.age_group,
//     phone: course.phone,
//     parentPhone: course.parent_phone,
//     familyDiscount: course.family_discount,
//     memo: course.memo ?? '',
//   };
// }

// interface CourseDetailViewProps {
//   course: Course;
//   onDirtyChange: (dirty: boolean) => void;
//   onSuccess: () => void;
// }

// function CourseDetailView({
//   course,
//   onDirtyChange,
//   onSuccess,
// }: CourseDetailViewProps) {
//   const [originalForm, setOriginalForm] = useState<CourseFormState>(
//     mapCourseToForm(course),
//   );

//   const [form, setForm] = useState<CourseFormState>(originalForm);
//   const { mode, openUpdate, openDetail } = useCourseModalStore();
//   const isEditMode = mode === 'UPDATE';

//   const isDirty = JSON.stringify(form) !== JSON.stringify(originalForm);

//   useEffect(() => {
//     if (mode !== 'UPDATE') {
//       const mapped = mapCourseToForm(course);
//       setOriginalForm(mapped);
//       setForm(mapped);
//     }
//   }, [course, mode]);

//   useEffect(() => {
//     onDirtyChange(isEditMode && isDirty);
//   }, [isEditMode, isDirty, onDirtyChange]);

//   const updateForm = <K extends keyof CourseFormState>(
//     key: K,
//     value: CourseFormState[K],
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   // 취소 / 저장 수정 버튼 로직
//   const handleCancelEdit = () => {
//     setForm(originalForm);
//     openDetail(course);
//   };

//   const handleSave = async () => {
//     console.log('PATCH 대상 course.id:', course.id);
//     try {
//       const updatedCourse = await updateCourse(course.id, {
//         name: form.name,
//         age_group: form.ageGroup,
//         phone: form.phone,
//         parent_phone: form.parentPhone,
//         family_discount: form.familyDiscount,
//         memo: form.memo,
//       });

//       // 성공 시 기준값 갱신
//       setOriginalForm(form);
//       onDirtyChange(false);
//       onSuccess(); // ⭐ 목록 갱신 트리거
//       openDetail(updatedCourse);
//     } catch (error) {
//       console.error('학생 수정 실패', error);
//       alert('학생 수정에 실패했습니다.');
//     }
//   };
//   return (
//     <div className="space-y-3">
//       <FormField label="이름">
//         <TextInput
//           value={form.name}
//           disabled={!isEditMode}
//           onChange={(v) => updateForm('name', v)}
//         />
//       </FormField>

//       <FormField label="구분">
//         <Select
//           options={AGE_GROUP_OPTIONS}
//           value={form.ageGroup}
//           disabled={!isEditMode}
//           onChange={(v) => updateForm('ageGroup', v as Course['age_group'])}
//         />
//       </FormField>

//       <FormField label="전화번호">
//         <NumberInput
//           value={form.phone}
//           disabled={!isEditMode}
//           onChange={(v) => updateForm('phone', v)}
//         />
//       </FormField>

//       <FormField label="학부모 전화번호">
//         <NumberInput
//           value={form.parentPhone}
//           disabled={!isEditMode}
//           onChange={(v) => updateForm('parentPhone', v)}
//         />
//       </FormField>

//       <FormField label="가족 할인">
//         <RadioGroup
//           options={FAMILY_DISCOUNT_OPTIONS}
//           value={String(form.familyDiscount)}
//           disabled={!isEditMode}
//           onChange={(v) => updateForm('familyDiscount', v === 'true')}
//         />
//       </FormField>

//       <FormField label="메모">
//         <Textarea
//           value={form.memo ?? ''}
//           disabled={!isEditMode}
//           onChange={(v) => updateForm('memo', v)}
//         />
//       </FormField>

//       <div className="w-full flex justify-end gap-2">
//         {!isEditMode && (
//           <NormalButton text="수정" onClick={() => openUpdate(course)} />
//         )}

//         {isEditMode && (
//           <>
//             <NormalButton
//               text="저장"
//               onClick={handleSave}
//               disabled={!isDirty}
//             />
//             <NormalButton text="취소" onClick={handleCancelEdit} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CourseDetailView;
