import { DealsListItem } from '@/components/deal/deals-list-item';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';

export interface DealsListBlockProps {
  deals: Array<UmbracoDeal>;
  display: 'Hero' | 'Grid';
}
export function DealsListBlock({ deals, display }: DealsListBlockProps) {
  return (
    <>
      {deals.map((deal, index) => (
        <DealsListItem key={index} deal={deal} display={display} />
      ))}
    </>
  );
}
