import { DealsListItemGrid } from '@/components/deal/deals-list-item-grid';
import { DealsListItemHeroSlider } from '@/components/deal/deals-list-item-hero-slider';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';

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
  const contentApi = getContentApiClient();
  const fullDeal = await contentApi.getUmbracoDeal(deal.id);

  if (!fullDeal) {
    return null;
  }

  const fullSupplier = await contentApi.getUmbracoSupplierByDeal(fullDeal);

  if (!fullSupplier) {
    return null;
  }

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
