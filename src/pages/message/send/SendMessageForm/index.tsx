import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';
import SendMessageActions from './components/SendMessageActions';
import SendMessageEditor from './components/SendMessageEditor';
import SendMessageHeader from './components/SendMessageHeader';
import { useMessageContent } from './hooks/useMessageContent';
import { useReservationFlow } from './hooks/useReservationFlow';
import { useSendAction } from './hooks/useSendAction';
import { useSelectedStudentSummary } from './hooks/useSelectedStudentSummary';
import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';
import { useEffect, useState } from 'react';

function SendMessageForm() {
  const { content, setContent, isContentValid } = useMessageContent();
  const templates = useMessageTemplateStore((state) => state.templates);
  const fetchTemplates = useMessageTemplateStore(
    (state) => state.fetchTemplates,
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | ''>('');
  const { selectedStudents, selectedStudentName, selectedStudentGroup } =
    useSelectedStudentSummary();
  const isSubmitDisabled = selectedStudents.length === 0 || !isContentValid;
  const {
    isOpenDate,
    isOpenTime,
    reservedAtLabel,
    hasReservedAt,
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
  const handleApplyTemplate = () => {
    if (!selectedTemplateId) return;
    const selectedTemplate = templates.find(
      (template) => template.id === selectedTemplateId,
    );
    if (!selectedTemplate) return;
    setContent(selectedTemplate.content);
  };

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return (
    <div className="w-full">
      <SendMessageHeader
        selectedStudentName={selectedStudentName}
        selectedStudentGroup={selectedStudentGroup}
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={setSelectedTemplateId}
        onApplyTemplate={handleApplyTemplate}
      />

      <SendMessageEditor content={content} onChange={setContent} />

      <SendMessageActions
        onReserve={handleReserveClick}
        onSend={handleSend}
        reservedAtLabel={reservedAtLabel}
        hasReservedAt={hasReservedAt}
        disabled={isSubmitDisabled}
      />
      {isOpenDate && <CalendarModal onSelect={handleDateSelect} />}
      {isOpenTime && <TimeModal onSave={handleTimeSave} />}
    </div>
  );
}

export default SendMessageForm;
