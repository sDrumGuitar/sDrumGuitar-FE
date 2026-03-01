import SendMessageForm from './SendMessageForm';
import StudentList from './StudentList';

function MessageSendPage() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="w-full lg:w-2/5">
        <StudentList />
      </div>
      <div className="w-full lg:w-3/5">
        <SendMessageForm />
      </div>
    </div>
  );
}
export default MessageSendPage;
