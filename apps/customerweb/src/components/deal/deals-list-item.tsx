import { DealsListItemGrid } from '@/components/deal/deals-list-item-grid';
import { DealsListItemHeroSlider } from '@/components/deal/deals-list-item-hero-slider';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';
import { getContentApiClient } from '@/utils/content-api-client';
import { verifyDealIsCorrect } from '@/utils/verify-deal-is-correct';
import { verifySupplierIsCorrect } from '@/utils/verify-supplier-is-correct';

export interface DealsListItemProps {
  deal: UmbracoDeal;
  display: 'Grid' | 'Small Slider' | 'Hero Slider';
  className?: string;
  isGuest?: boolean
}

export async function DealsListItem({
  deal,
  display,
  ...otherProps
}: DealsListItemProps) {
  const contentApi = getContentApiClient();

  const dealContent = await contentApi.getContentItemById20({
    id: deal.id,
  });
  const fullDeal = dealContent as UmbracoDeal;

  if (!verifyDealIsCorrect(fullDeal)) {
    console.log('Deal is incorrect', fullDeal);
    return null;
  }

  const supplierContent = await contentApi.getContentItemById20({
    id: fullDeal.properties?.supplier!.id!,
  });

  const fullSupplier = supplierContent as UmbracoSupplier;

  if (!verifySupplierIsCorrect(fullSupplier)) {
    console.log('Supplier is incorrect', fullSupplier);
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
