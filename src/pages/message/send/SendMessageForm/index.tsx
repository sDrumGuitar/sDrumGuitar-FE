import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';
import SendMessageActions from './components/SendMessageActions';
import SendMessageEditor from './components/SendMessageEditor';
import SendMessageHeader from './components/SendMessageHeader';
import { useMessageContent } from './hooks/useMessageContent';
import { useReservationFlow } from './hooks/useReservationFlow';
import { useSendAction } from './hooks/useSendAction';
import { useSelectedStudentSummary } from './hooks/useSelectedStudentSummary';

function SendMessageForm() {
  const { content, setContent, isContentValid } = useMessageContent();
  const { selectedStudents, selectedStudentName, selectedStudentGroup } =
    useSelectedStudentSummary();
  const isSubmitDisabled = selectedStudents.length === 0 || !isContentValid;
  const {
    isOpenDate,
    isOpenTime,
    handleReserveClick,
    handleDateSelect,
    handleTimeSave,
  } = useReservationFlow({
    content,
    students: selectedStudents,
  });
  const { handleSend } = useSendAction({
    content,
    students: selectedStudents,
  });

  return (
    <div className="w-full">
      <SendMessageHeader
        selectedStudentName={selectedStudentName}
        selectedStudentGroup={selectedStudentGroup}
        onOpenTemplate={() => {}}
      />

      <SendMessageEditor content={content} onChange={setContent} />

      <SendMessageActions
        onReserve={handleReserveClick}
        onSend={handleSend}
        disabled={isSubmitDisabled}
      />
      {isOpenDate && <CalendarModal onSelect={handleDateSelect} />}
      {isOpenTime && <TimeModal onSave={handleTimeSave} />}
    </div>
  );
}

export default SendMessageForm;
