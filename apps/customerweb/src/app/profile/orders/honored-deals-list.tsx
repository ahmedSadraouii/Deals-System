import type { HonoredDealModel } from 'api-deals';
import { HonoredDealItem } from '@/app/profile/orders/honored-deal-item';
import type {
  UmbracoDeal,
  UmbracoSupplier,
} from '@/components/umbraco-cms/umbraco-types';

export interface OrderListProps {
  items: Array<{
    deal: UmbracoDeal;
    supplier: UmbracoSupplier;
    honoredDeal: HonoredDealModel;
  }>;
}

export function HonoredDealsList({ items }: OrderListProps) {
  return (
    <div className="border-t border-gray-200">
      {items.map((item, index) => (
        <HonoredDealItem
          key={index}
          deal={item.deal}
          supplier={item.supplier}
          honoredDeal={item.honoredDeal}
        />
      ))}
    </div>
  );
}
