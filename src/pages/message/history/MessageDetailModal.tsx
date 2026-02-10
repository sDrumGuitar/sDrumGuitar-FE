import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useMessageModalStore } from '@/store/messageModalStore';

function MessageDetailModal() {
  const { close } = useMessageModalStore();
  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">문자 상세</h2>
        <button onClick={close}>닫기</button>
      </div>
    </ModalWrapper>
  );
}

export default MessageDetailModal;
