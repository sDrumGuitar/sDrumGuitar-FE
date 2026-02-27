import { create } from 'zustand';
import type { Course } from '@/types/course';

type ModalMode = 'CREATE' | 'DETAIL' | 'UPDATE' | null;

interface CourseModalState {
  isOpen: boolean;
  mode: ModalMode;
  selectedCourse: Course | null;

  openCreate: () => void;
  openDetail: (course: Course) => void;
  openUpdate: (course: Course) => void;
  setMode: (mode: ModalMode) => void;
  close: () => void;
}

export const useCourseModalStore = create<CourseModalState>((set) => ({
  isOpen: false,
  mode: null,
  selectedCourse: null,

  openCreate: () =>
    set({
      isOpen: true,
      mode: 'CREATE',
      selectedCourse: null,
    }),

  openDetail: (course) =>
    set({
      isOpen: true,
      mode: 'DETAIL',
      selectedCourse: course,
    }),

  openUpdate: (course) =>
    set({
      isOpen: true,
      mode: 'UPDATE',
      selectedCourse: course,
    }),

  setMode: (mode) => set({ mode }),

  close: () =>
    set({
      isOpen: false,
      mode: null,
      selectedCourse: null,
    }),
}));
