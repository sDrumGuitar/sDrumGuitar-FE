import { MESSAGE_LIST_HEADER } from '@/constants/message';
import { MockMessage } from '@/mock/message';
import NormalButton from '@/shared/button/NormalButton';
import MessageStatusBadge from '@/shared/message/MessageStatusBadge';
import MessageTypeBadge from '@/shared/message/MessageTypeBadge';
import TableSection from '@/shared/modal/TableSection';
import { useMessageModalStore } from '@/store/message/messageModalStore';
import type { Message } from '@/types/message';
import { useState } from 'react';
import MessageDetailModal from './MessageDetailModal';

function MessageHistoryPage() {
  const [messages] = useState<Message[]>(MockMessage);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { isOpen, open } = useMessageModalStore();

  const handleOpenDetail = (message: Message) => {
    setSelectedMessage(message);
    open();
  };

  return (
    <div>
      <div className="sm:hidden">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {messages.map((message, index) => {
            const [date, time] = message.send_at.split(' ');

            return (
              <div
                key={message.id}
                className={`px-4 py-4 ${
                  index === 0 ? '' : 'border-t border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="shrink-0">
                      <MessageTypeBadge label={message.type} />
                    </div>
                    <div className="text-xs text-gray-500">
                      <p className="font-medium text-gray-700">{date}</p>
                      <p className="tabular-nums">{time ?? ''}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <MessageStatusBadge status={message.status} />
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-700 leading-6 wrap-break-word">
                  {message.content}
                </p>

                <div className="mt-4 flex justify-end">
                  <NormalButton
                    text="상세 정보"
                    onClick={() => handleOpenDetail(message)}
                    className="h-8 px-3 text-xs whitespace-nowrap"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden sm:block text-">
        <TableSection
          dataList={messages}
          headers={MESSAGE_LIST_HEADER}
          getRows={(messages) =>
            messages.map((message) => [
              <MessageTypeBadge label={message.type} />,
              message.send_at,
              message.content,
              <MessageStatusBadge status={message.status} />,
              <NormalButton
                text="상세"
                onClick={() => handleOpenDetail(message)}
              />,
            ])
          }
        />
      </div>
      {isOpen && selectedMessage && (
        <MessageDetailModal message={selectedMessage} />
      )}
    </div>
  );
}
export default MessageHistoryPage;
