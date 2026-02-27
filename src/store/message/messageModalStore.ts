import { create } from 'zustand';

interface MessageModalState {
  isOpen: boolean;

  open: () => void;
  close: () => void;
}

export const useMessageModalStore = create<MessageModalState>((set) => ({
  isOpen: false,

  open: () =>
    set({
      isOpen: true,
    }),

  close: () =>
    set({
      isOpen: false,
    }),
}));
