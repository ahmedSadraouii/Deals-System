import type { ContentApi } from 'api-content';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { getApiClient } from '@/utils/get-api-client';

export interface DealsListItemProps {
  deal: UmbracoDeal;
  display: 'Hero' | 'Grid';
}

export async function DealsListItem({ deal, display }: DealsListItemProps) {
  const contentApi = getApiClient<ContentApi>({ ssr: true, type: 'content' });
  const dealContent = await contentApi.getContentItemById20({
    id: deal.id,
  });
  const fullDeal = dealContent as UmbracoDeal;
  return (
    <div>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify({ display, fullDeal }, null, 2)}
      </pre>
    </div>
  );
}
