import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useMessageModalStore } from '@/store/messageModalStore';
import type { Message } from '@/types/message';

interface MessageDetailModalProps {
  message: Message;
}

function MessageDetailModal({ message }: MessageDetailModalProps) {
  const { close } = useMessageModalStore();
  const typeStyleMap: Record<string, string> = {
    출석: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    결석: 'bg-rose-50 text-rose-700 border border-rose-200',
    지각: 'bg-amber-50 text-amber-700 border border-amber-200',
    보강: 'bg-blue-50 text-blue-700 border border-blue-200',
    휴강: 'bg-slate-100 text-slate-700 border border-slate-200',
  };
  const typeBadgeClass =
    typeStyleMap[message.type] ??
    'bg-gray-100 text-gray-700 border border-gray-200';

  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">문자 상세</h2>
        <button onClick={close}>닫기</button>
      </div>
      {/* 아래의 부분이 메세지 상세 정보 */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${typeBadgeClass}`}
          >
            {message.type}
          </span>
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
