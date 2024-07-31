import { DealsListItem } from '@/components/deal/deals-list-item';
import type { DealsListBlockProps } from '@/components/umbraco-cms/content/deals-list-block';

export type DealsListBlockGridProps = Omit<DealsListBlockProps, 'display'>;

export function DealsListBlockGrid({ title, deals }: DealsListBlockGridProps) {
  return (
    <div className="bg-default-100">
      <div className="container mx-auto px-4 py-20 md:px-0">
        <h2 className="pb-10 text-5xl font-bold text-secondary">{title}</h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {deals.map((deal, index) => (
            <DealsListItem key={index} deal={deal} display="Grid" />
          ))}
        </div>
      </div>
    </div>
  );
}
