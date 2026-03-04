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
import { useToastStore } from '@/store/feedback/toastStore';
import { useEffect, useState } from 'react';

function SendMessageForm() {
  const { content, setContent, isContentValid } = useMessageContent();
  const templates = useMessageTemplateStore((state) => state.templates);
  const fetchTemplates = useMessageTemplateStore(
    (state) => state.fetchTemplates,
  );
  const { addToast } = useToastStore();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
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
    const selectedTemplateIdNumber = Number(selectedTemplateId);
    const selectedTemplate = templates.find(
      (template) =>
        template.id === selectedTemplateIdNumber ||
        String(template.id) === String(selectedTemplateId),
    );
    if (!selectedTemplate) {
      addToast('error', '선택한 템플릿을 불러오지 못했습니다.');
      return;
    }
    if (!selectedTemplate.content) {
      addToast('error', '선택한 템플릿에 내용이 없습니다.');
      return;
    }
    setContent(selectedTemplate.content);
  };

  useEffect(() => {
    fetchTemplates({ force: true });
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
