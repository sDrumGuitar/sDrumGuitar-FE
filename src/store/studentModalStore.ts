import { create } from 'zustand';
import type { Student } from '@/types/student';

type ModalMode = 'CREATE' | 'DETAIL' | 'UPDATE' | null;

interface StudentModalState {
  isOpen: boolean;
  mode: ModalMode;
  selectedStudent: Student | null;

  openCreate: () => void;
  openDetail: (student: Student) => void;
  openUpdate: (student: Student) => void;
  close: () => void;
}

export const useStudentModalStore = create<StudentModalState>((set) => ({
  isOpen: false,
  mode: null,
  selectedStudent: null,

  openCreate: () =>
    set({
      isOpen: true,
      mode: 'CREATE',
      selectedStudent: null,
    }),

  openDetail: (student) =>
    set({
      isOpen: true,
      mode: 'DETAIL',
      selectedStudent: student,
    }),

  openUpdate: (student) =>
    set({
      isOpen: true,
      mode: 'UPDATE',
      selectedStudent: student,
    }),

  close: () =>
    set({
      isOpen: false,
      mode: null,
      selectedStudent: null,
    }),
}));
