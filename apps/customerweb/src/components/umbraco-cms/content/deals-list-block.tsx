import { DealsListItem } from '@/components/deal/deals-list-item';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';

export interface DealsListBlockProps {
  deals: Array<UmbracoDeal>;
  display: 'Grid' | 'Small Slider' | 'Hero Slider';
}
export function DealsListBlock({ deals, display }: DealsListBlockProps) {
  if (display === 'Grid') {
    return (
      <div className="bg-default-100">
        <div className="container mx-auto px-4 py-20">
          <h2 className="pb-10 text-5xl font-bold text-secondary">
            Alle Deals im Überblick
          </h2>
          <div className="grid grid-cols-3 gap-10">
            {deals.map((deal, index) => (
              <DealsListItem key={index} deal={deal} display={display} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {deals.map((deal, index) => (
        <DealsListItem key={index} deal={deal} display={display} />
      ))}
    </div>
  );
}
