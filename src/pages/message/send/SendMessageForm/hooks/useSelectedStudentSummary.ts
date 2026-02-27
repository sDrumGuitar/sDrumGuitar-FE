import { useMessageSendStore } from '@/store/messageSendStore';
import { getAgeGroupLabel } from '@/utils/student/getAgeGroupLabel';

export const useSelectedStudentSummary = () => {
  const { selectedStudents } = useMessageSendStore();
  const selectedStudentName =
    selectedStudents.length === 0
      ? '선택된 학생 없음'
      : selectedStudents.length === 1
        ? selectedStudents[0].name
        : `${selectedStudents[0].name} 외 ${selectedStudents.length - 1}명`;
  const selectedStudentGroup =
    selectedStudents.length === 0
      ? '구분 없음'
      : selectedStudents.length === 1
        ? getAgeGroupLabel(selectedStudents[0].age_group)
        : '구분 혼합';

  return {
    selectedStudents,
    selectedStudentName,
    selectedStudentGroup,
  };
};
