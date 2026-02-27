import { MESSAGE_LIST_HEADER } from '@/constants/message';
import { MockMessage } from '@/mock/message';
import NormalButton from '@/shared/button/NormalButton';
import TableSection from '@/shared/modal/TableSection';
import { useMessageModalStore } from '@/store/message/messageModalStore';
import type { Message } from '@/types/message';
import { getMessageStatus } from '@/utils/message/getMessageStatus';
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
      <TableSection
        dataList={messages}
        headers={MESSAGE_LIST_HEADER}
        getRows={(messages) =>
          messages.map((message) => [
            message.type,
            message.send_at,
            message.content,
            getMessageStatus(message.status),
            <NormalButton
              text="상세"
              onClick={() => handleOpenDetail(message)}
            />,
          ])
        }
      />
      {isOpen && selectedMessage && (
        <MessageDetailModal message={selectedMessage} />
      )}
    </div>
  );
}
export default MessageHistoryPage;
