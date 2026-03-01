import { useEffect, useMemo } from 'react';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import SendMessageForm from '@/pages/message/send/SendMessageForm';
import {
  type MessageSendContext,
  type MessageSendKind,
  useMessageSendModalStore,
} from '@/store/message/messageSendModalStore';
import { useMessageSendStore } from '@/store/message/messageSendStore';
import { useSelectedStudentSummary } from '@/pages/message/send/SendMessageForm/hooks/useSelectedStudentSummary';

const MESSAGE_KIND_LABEL: Record<MessageSendKind, string> = {
  general: '일반 문자',
  unpaid: '미납 문자',
  makeup: '보강 문자',
};

const getTargetLabel = (context: MessageSendContext | null) => {
  if (!context) return '';
  if (context.targetType === 'invoice' && context.invoiceId) {
    return `청구서 #${context.invoiceId}`;
  }
  if (context.targetType === 'lesson') {
    if (context.lessonIndex) return `${context.lessonIndex}회차`;
    if (context.lessonId) return `회차 #${context.lessonId}`;
  }
  return '';
};

function MessageSendModal() {
  const { isOpen, context, close } = useMessageSendModalStore();
  const { setSelectedStudents, clearStudents } = useMessageSendStore();
  const { selectedStudentName } = useSelectedStudentSummary();

  useEffect(() => {
    if (!isOpen) return;

    if (context?.student) {
      setSelectedStudents([context.student]);
      return;
    }

    if (context?.resetSelection) {
      clearStudents();
    }
  }, [isOpen, context?.student, context?.resetSelection, setSelectedStudents, clearStudents]);

  const handleClose = () => {
    if (context?.resetSelection) {
      clearStudents();
    }
    close();
  };

  const kindLabel = context ? MESSAGE_KIND_LABEL[context.kind] : '문자 보내기';
  const targetLabel = useMemo(() => getTargetLabel(context), [context]);
  const studentName = context?.student?.name ?? selectedStudentName;

  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={handleClose}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {context?.title ?? '문자 보내기'}
          </h2>
          <p className="text-xs text-gray-500">
            {studentName}
            {kindLabel ? ` · ${kindLabel}` : ''}
            {targetLabel ? ` · ${targetLabel}` : ''}
          </p>
        </div>
        <button
          className="text-sm text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>

      <SendMessageForm />
    </ModalWrapper>
  );
}

export default MessageSendModal;
