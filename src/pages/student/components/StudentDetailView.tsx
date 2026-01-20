import type { Student } from '@/types/student';

interface Props {
  student: Student;
}

function StudentDetailView({ student }: Props) {
  return (
    <div className="space-y-2">
      <p>이름: {student.name}</p>
      <p>구분: {student.age_group}</p>
      <p>전화번호: {student.phone}</p>
      <p>부모님 전화번호: {student.parent_phone}</p>
      <p>가족 할인: {student.family_discount ? 'O' : 'X'}</p>
      {student.memo && <p>메모: {student.memo}</p>}
    </div>
  );
}

export default StudentDetailView;
