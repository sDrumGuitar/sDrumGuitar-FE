import { create } from 'zustand';
import type { Student } from '@/types/student';

export type MessageRecipient = {
  student_id?: number;
  name: string;
  age_group?: Student['age_group'] | null;
  phone?: string;
  parent_phone?: string;
  family_discount?: boolean;
  memo?: string | null;
};

interface MessageSendState {
  selectedStudents: MessageRecipient[];
  toggleStudent: (student: MessageRecipient) => void;
  setSelectedStudents: (students: MessageRecipient[]) => void;
  clearStudents: () => void;
  isSelected: (student: MessageRecipient) => boolean;
}

const getStudentKey = (student: MessageRecipient) => {
  if (typeof student.student_id === 'number')
    return `id:${student.student_id}`;
  return [
    `name:${student.name}`,
    `group:${student.age_group ?? ''}`,
    `phone:${student.phone ?? ''}`,
    `parent:${student.parent_phone ?? ''}`,
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
  setSelectedStudents: (students) =>
    set({
      selectedStudents: students,
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
