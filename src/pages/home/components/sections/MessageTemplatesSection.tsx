import DashboardCard from '../DashboardCard';
import SimpleList from '../SimpleList';
import type { MessageTemplate } from '@/types/messageTemplate';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';
import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_STYLES,
} from '@/constants/messageTemplate';

interface MessageTemplatesSectionProps {
  isLoading: boolean;
  totalCount: number;
  templates: MessageTemplate[];
}

function MessageTemplatesSection({
  isLoading,
  totalCount,
  templates,
}: MessageTemplatesSectionProps) {
  return (
    <DashboardCard title="메시지 템플릿" subtitle={`총 ${totalCount}개`}>
      {isLoading ? (
        <p className="text-sm text-gray-400">템플릿을 불러오는 중...</p>
      ) : (
        <SimpleList
          items={templates}
          emptyText="템플릿이 없습니다."
          renderItem={(template) => {
            const tone = MESSAGE_TEMPLATE_TYPE_STYLES[template.type];
            return (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {template.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatToKoreanDate(template.created_at)}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${tone.background} ${tone.text} ${tone.border}`}
                >
                  {MESSAGE_TEMPLATE_TYPE_LABELS[template.type]}
                </span>
              </div>
            );
          }}
        />
      )}
    </DashboardCard>
  );
}

export default MessageTemplatesSection;
