import { DealsListBlockGrid } from '@/components/umbraco-cms/content/deals-list-block-grid';
import { DealsListBlockHeroSlider } from '@/components/umbraco-cms/content/deals-list-block-hero-slider';
import { DealsListBlockSmallSlider } from '@/components/umbraco-cms/content/deals-list-block-small-slider';
import type { UmbracoDeal } from '@/components/umbraco-cms/umbraco-types';

export interface DealsListBlockProps {
  deals: Array<UmbracoDeal>;
  title: string;
  display: 'Grid' | 'Small Slider' | 'Hero Slider';
  isGuest?: boolean;
}
export function DealsListBlock({ title, deals, display, isGuest }: DealsListBlockProps) {
  if (display === 'Grid') {
    return <DealsListBlockGrid title={title} deals={deals} isGuest={isGuest}/>;
  } else if (display === 'Hero Slider') {
    return <DealsListBlockHeroSlider title={title} deals={deals} isGuest={isGuest}/>;
  } else if (display === 'Small Slider') {
    return <DealsListBlockSmallSlider title={title} deals={deals} isGuest={isGuest} />;
  }

  return (
    <pre className="whitespace-pre-wrap">
      DealsListBLock unknown display: {display}
      <br />
      Deals: {JSON.stringify(deals, null, 2)}
    </pre>
  );
}
