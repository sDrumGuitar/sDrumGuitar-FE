import { create } from 'zustand';

interface MessageTemplateModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useMessageTemplateModalStore = create<MessageTemplateModalState>(
  (set) => ({
    isOpen: false,
    open: () =>
      set({
        isOpen: true,
      }),
    close: () =>
      set({
        isOpen: false,
      }),
  }),
);
