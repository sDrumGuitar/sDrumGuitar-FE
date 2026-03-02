import { useEffect, useMemo, useState } from 'react';
import { getMessageTemplates } from '@/shared/api/message';
import type { MessageTemplate } from '@/types/messageTemplate';

interface MessageTemplateSummary {
  totalCount: number;
  templates: MessageTemplate[];
  isLoading: boolean;
}

export const useMessageTemplatesSummary = () => {
  const [summary, setSummary] = useState<MessageTemplateSummary>({
    totalCount: 0,
    templates: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchTemplates = async () => {
      const data = await getMessageTemplates({ page: 1, size: 3 });
      if (!isMounted) return;
      setSummary({
        totalCount: data.total_count,
        templates: data.templates,
        isLoading: false,
      });
    };

    fetchTemplates();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(() => summary, [summary]);
};
