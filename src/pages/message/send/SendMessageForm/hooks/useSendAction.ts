import type { MessageRecipient } from '@/store/message/messageSendStore';

interface SendActionInput {
  content: string;
  students: MessageRecipient[];
}

export const useSendAction = ({ content, students }: SendActionInput) => {
  const handleSend = () => {
    const payload = {
      mode: 'send' as const,
      content,
      students,
    };
    return payload;
  };

  return { handleSend };
};
