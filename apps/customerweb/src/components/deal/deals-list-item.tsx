import type { ContentApi } from 'api-content';
import { DealsListItemGrid } from '@/components/deal/deals-list-item-grid';
import { DealsListItemHeroSlider } from '@/components/deal/deals-list-item-hero-slider';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getApiClient } from '@/utils/get-api-client';

export interface DealsListItemProps {
  deal: UmbracoDeal;
  display: 'Grid' | 'Small Slider' | 'Hero Slider';
  className?: string;
}

export async function DealsListItem({
  deal,
  display,
  ...otherProps
}: DealsListItemProps) {
  const contentApi = getApiClient<ContentApi>({ ssr: true, type: 'content' });
  const dealContent = await contentApi.getContentItemById20({
    id: deal.id,
  });
  const fullDeal = dealContent as UmbracoDeal;

  if (!fullDeal.properties?.supplier?.id) {
    console.log('Missing supplier for deal', fullDeal);
    return null;
  }

  const supplierContent = await contentApi.getContentItemById20({
    id: fullDeal.properties?.supplier!.id!,
  });
  const fullSupplier = supplierContent as UmbracoSupplier;

  if (display === 'Grid' || display === 'Small Slider') {
    return (
      <DealsListItemGrid
        deal={fullDeal}
        supplier={fullSupplier}
        {...otherProps}
      />
    );
  } else if (display === 'Hero Slider') {
    return (
      <DealsListItemHeroSlider
        deal={fullDeal}
        supplier={fullSupplier}
        {...otherProps}
      />
    );
  }

  return (
    <div>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify({ display, fullDeal }, null, 2)}
      </pre>
    </div>
  );
}
