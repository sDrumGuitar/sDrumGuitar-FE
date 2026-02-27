import { create } from 'zustand';
import type { Student } from '@/types/student';

interface InvoiceModalStore {
  isOpen: boolean;
  student: Student | null;

  open: (student: Student) => void;
  close: () => void;
}

export const useInvoiceModalStore = create<InvoiceModalStore>((set) => ({
  isOpen: false,
  student: null,

  open: (student) => set({ isOpen: true, student }),
  close: () => set({ isOpen: false, student: null }),
}));
