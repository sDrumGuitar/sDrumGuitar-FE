import type { Student } from '@/types/student';

interface SendActionInput {
  content: string;
  students: Student[];
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
