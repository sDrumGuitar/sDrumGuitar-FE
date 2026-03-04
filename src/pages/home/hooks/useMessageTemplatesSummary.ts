import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMessageTemplates, type GetMessageTemplatesResponse } from '@/shared/api/message';
import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';

export const useMessageTemplatesSummary = () => {
  const templatesCache = useMessageTemplateStore((state) => state.templates);
  const totalCountCache = useMessageTemplateStore((state) => state.totalCount);
  const hasEnoughCache = templatesCache.length >= 3 && totalCountCache > 0;
  const initialData: GetMessageTemplatesResponse | undefined = hasEnoughCache
    ? {
        total_count: totalCountCache,
        page: 1,
        size: 3,
        templates: templatesCache.slice(0, 3),
      }
    : undefined;

  const { data, isLoading, refetch } = useQuery<GetMessageTemplatesResponse>({
    queryKey: ['home', 'message-templates', 1, 3],
    queryFn: () => getMessageTemplates({ page: 1, size: 3 }),
    enabled: !hasEnoughCache,
    initialData,
  });

  return useMemo(
    () => ({
      totalCount: data?.total_count ?? 0,
      templates: data?.templates ?? [],
      isLoading,
      refetch,
    }),
    [data, isLoading, refetch],
  );
};
