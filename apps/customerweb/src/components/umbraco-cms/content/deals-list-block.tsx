import { DealsListBlockGrid } from '@/components/umbraco-cms/content/deals-list-block-grid';
import { DealsListBlockHeroSlider } from '@/components/umbraco-cms/content/deals-list-block-hero-slider';
import { DealsListBlockSmallSlider } from '@/components/umbraco-cms/content/deals-list-block-small-slider';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';

export interface DealsListBlockProps {
  deals: Array<UmbracoDeal>;
  title: string;
  display: 'Grid' | 'Small Slider' | 'Hero Slider';
}
export function DealsListBlock({ title, deals, display }: DealsListBlockProps) {
  if (display === 'Grid') {
    return <DealsListBlockGrid title={title} deals={deals} />;
  } else if (display === 'Hero Slider') {
    return <DealsListBlockHeroSlider title={title} deals={deals} />;
  } else if (display === 'Small Slider') {
    return <DealsListBlockSmallSlider title={title} deals={deals} />;
  }

  return (
    <pre className="whitespace-pre-wrap">
      DealsListBLock unknown display: {display}
      <br />
      Deals: {JSON.stringify(deals, null, 2)}
    </pre>
  );
}