import { create } from 'zustand';
import type { MessageSendContext } from '@/store/message/messageSendModalStore';

interface MakeupMessageConfirmState {
  isOpen: boolean;
  context: MessageSendContext | null;
  open: (context: MessageSendContext) => void;
  close: () => void;
}

export const useMakeupMessageConfirmStore =
  create<MakeupMessageConfirmState>((set) => ({
    isOpen: false,
    context: null,
    open: (context) => set({ isOpen: true, context }),
    close: () => set({ isOpen: false, context: null }),
  }));
