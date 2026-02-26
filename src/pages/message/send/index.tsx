import SendMessageForm from './SendMessageForm';
import StudentList from './StudentList';

function MessageSendPage() {
  return (
    <div className="flex gap-6">
      <div className="w-2/5">
        <StudentList />
      </div>
      <div className="w-3/5">
        <SendMessageForm />
      </div>
    </div>
  );
}
export default MessageSendPage;
