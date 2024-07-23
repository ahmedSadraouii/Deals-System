import { HeroCarousel } from '@/components/carousel/hero-carousel';
import { HeroCarouselMobile } from '@/components/carousel/hero-carousel-mobile';
import { DealsListItem } from '@/components/deal/deals-list-item';
import type { DealsListBlockProps } from '@/components/umbraco-cms/content/deals-list-block';

export type DealsListBlockHeroSliderProps = Omit<
  DealsListBlockProps,
  'display'
>;

export async function DealsListBlockHeroSlider({
  title,
  deals,
}: DealsListBlockHeroSliderProps) {
  return (
    <div>
      <div className="container mx-auto hidden px-4 pb-40 pt-10 lg:block">
        <HeroCarousel title={title}>
          {deals.map((deal, index) => (
            <DealsListItem key={index} deal={deal} display="Hero Slider" />
          ))}
        </HeroCarousel>
      </div>
      <div className="container mx-auto px-4 pb-40 pt-10 lg:hidden">
        <HeroCarouselMobile title={title}>
          {deals.map((deal, index) => (
            <DealsListItem key={index} deal={deal} display="Hero Slider" />
          ))}
        </HeroCarouselMobile>
      </div>
    </div>
  );
}
