import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMessageTemplates } from '@/shared/api/message';

export const useMessageTemplatesSummary = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['home', 'message-templates', 1, 3],
    queryFn: () => getMessageTemplates({ page: 1, size: 3 }),
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
