import { create } from 'zustand';

interface DateModalState {
  isOpen: boolean;
  selectedDate: string | null;

  open: () => void;
  setSelectedDate: (date: string) => void;
  close: () => void;
}

export const useDateModalStore = create<DateModalState>((set) => ({
  isOpen: false,
  selectedDate: null,

  open: () =>
    set({
      isOpen: true,
    }),

  setSelectedDate: (date) =>
    set({
      selectedDate: date,
    }),

  close: () =>
    set({
      isOpen: false,
      selectedDate: null,
    }),
}));
