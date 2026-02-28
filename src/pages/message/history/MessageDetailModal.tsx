import MessageTypeBadge from '@/shared/message/MessageTypeBadge';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useMessageModalStore } from '@/store/message/messageModalStore';
import type { Message } from '@/types/message';

interface MessageDetailModalProps {
  message: Message;
}

function MessageDetailModal({ message }: MessageDetailModalProps) {
  const { close } = useMessageModalStore();

  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">문자 상세</h2>
        <button onClick={close}>닫기</button>
      </div>
      {/* 아래의 부분이 메세지 상세 정보 */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <MessageTypeBadge label={message.type} />
          <span className="text-xs text-gray-500">상태</span>
          <span className="text-xs font-semibold text-gray-700">
            {message.status === 'sent' ? '전송 완료' : '예약됨'}
          </span>
        </div>

        <div className="mt-4 grid gap-3 text-sm text-gray-700">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-500">수신자</span>
            <span className="font-medium text-gray-900">
              {message.receiver}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-500">전송 시간</span>
            <span className="font-medium text-gray-900">{message.send_at}</span>
          </div>
          {message.created_at ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-gray-500">발송 시간</span>
              <span className="font-medium text-gray-900">
                {message.created_at}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-800">
          {message.content}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default MessageDetailModal;
