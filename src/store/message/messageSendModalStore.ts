import { create } from 'zustand';
import type { MessageRecipient } from '@/store/message/messageSendStore';

export type MessageSendKind = 'general' | 'unpaid' | 'makeup';
export type MessageSendTarget = 'none' | 'invoice' | 'lesson';

export interface MessageSendContext {
  title: string;
  kind: MessageSendKind;
  targetType: MessageSendTarget;
  student: MessageRecipient | null;
  invoiceId?: number;
  lessonId?: number;
  lessonIndex?: number;
  resetSelection?: boolean;
}

interface MessageSendModalState {
  isOpen: boolean;
  context: MessageSendContext | null;
  open: (context: MessageSendContext) => void;
  close: () => void;
}

export const useMessageSendModalStore = create<MessageSendModalState>((set) => ({
  isOpen: false,
  context: null,
  open: (context) => set({ isOpen: true, context }),
  close: () => set({ isOpen: false, context: null }),
}));
