import { Carousel } from '@/components/carousel/carousel';
import { DealsListItem } from '@/components/deal/deals-list-item';
import type { DealsListBlockProps } from '@/components/umbraco-cms/content/deals-list-block';

export type DealsListBlockHeroSliderProps = Omit<
  DealsListBlockProps,
  'display'
>;

export async function DealsListBlockSmallSlider({
  title,
  deals,
}: DealsListBlockHeroSliderProps) {
  return (
    <div className="bg-default-100">
      <div className="container mx-auto px-4 py-20 md:px-0">
        <h2 className="pb-10 text-5xl font-bold text-secondary">
          {title || 'Deals List Block Small Slider Title'}
        </h2>
        <Carousel itemsPerPage={3}>
          {deals.map((deal, index) => (
            <DealsListItem key={index} deal={deal} display="Small Slider" />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
