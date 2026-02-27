import { create } from 'zustand';

interface TimeModalState {
  isOpen: boolean;
  selectedHour: string | null;
  selectedMin: string | null;

  open: () => void;
  setSelectedHour: (hour: string) => void;
  setSelectedMin: (min: string) => void;
  close: () => void;
}

export const useTimeModalStore = create<TimeModalState>((set) => ({
  isOpen: false,
  selectedHour: null,
  selectedMin: null,

  open: () =>
    set({
      isOpen: true,
      selectedHour: null,
      selectedMin: null,
    }),

  setSelectedHour: (hour) =>
    set({
      selectedHour: hour,
    }),

  setSelectedMin: (min) =>
    set({
      selectedMin: min,
    }),

  close: () =>
    set({
      isOpen: false,
    }),
}));
