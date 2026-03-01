import StudentList from './StudentList';
import NormalButton from '@/shared/button/NormalButton';
import { useMessageSendModalStore } from '@/store/message/messageSendModalStore';
import { useMessageSendStore } from '@/store/message/messageSendStore';

function MessageSendPage() {
  const { open } = useMessageSendModalStore();
  const { selectedStudents } = useMessageSendStore();

  const handleOpenModal = () => {
    open({
      title: '문자 보내기',
      kind: 'general',
      targetType: 'none',
      student: null,
      resetSelection: false,
    });
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="w-full lg:w-2/5">
        <StudentList />
      </div>
      <div className="w-full lg:w-3/5">
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6">
          <p className="text-sm text-gray-600">
            선택한 학생에게 문자 전송을 진행할 수 있습니다.
          </p>
          <div className="mt-4 flex justify-end">
            <NormalButton
              text="문자 보내기"
              onClick={handleOpenModal}
              disabled={selectedStudents.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MessageSendPage;
