import { create } from 'zustand';
import type { Student } from '@/types/student';

interface MessageSendState {
  selectedStudents: Student[];
  toggleStudent: (student: Student) => void;
  clearStudents: () => void;
  isSelected: (student: Student) => boolean;
}

const getStudentKey = (student: Student) => {
  if (typeof student.id === 'number') return `id:${student.id}`;
  return [
    `name:${student.name}`,
    `group:${student.age_group}`,
    `phone:${student.phone}`,
    `parent:${student.parent_phone}`,
  ].join('|');
};

export const useMessageSendStore = create<MessageSendState>((set, get) => ({
  selectedStudents: [],
  toggleStudent: (student) =>
    set((state) => {
      const key = getStudentKey(student);
      const exists = state.selectedStudents.some(
        (item) => getStudentKey(item) === key
      );
      if (exists) {
        return {
          selectedStudents: state.selectedStudents.filter(
            (item) => getStudentKey(item) !== key
          ),
        };
      }
      return {
        selectedStudents: [...state.selectedStudents, student],
      };
    }),
  clearStudents: () =>
    set({
      selectedStudents: [],
    }),
  isSelected: (student) => {
    const key = getStudentKey(student);
    return get().selectedStudents.some((item) => getStudentKey(item) === key);
  },
}));
