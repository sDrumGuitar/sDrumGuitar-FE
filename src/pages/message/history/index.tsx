import { MESSAGE_LIST_HEADER } from '@/constants/message';
import { MockMessage } from '@/mock/message';
import NormalButton from '@/shared/button/NormalButton';
import TableSection from '@/shared/modal/TableSection';
import { useMessageModalStore } from '@/store/messageModalStore';
import type { Message } from '@/types/message';
import { getMessageStatus } from '@/utils/getMessageStatus';
import { useState } from 'react';
import MessageDetailModal from './MessageDetailModal';

function MessageHistoryPage() {
  const [messages, setMessages] = useState<Message[]>(MockMessage);
  const { isOpen, open } = useMessageModalStore();
  return (
    <div>
      <TableSection
        dataList={messages}
        headers={MESSAGE_LIST_HEADER}
        getRows={(messages) => {
          if (!messages || messages.length === 0) return [];
          return messages.map((message) => [
            message.type,
            message.send_at,
            message.content,
            getMessageStatus(message.status),
            <NormalButton text="상세" onClick={open} />,
          ]);
        }}
      />
      {isOpen && <MessageDetailModal />}
    </div>
  );
}
export default MessageHistoryPage;
