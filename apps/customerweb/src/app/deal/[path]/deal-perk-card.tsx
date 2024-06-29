import { FamilySvg } from '@/components/svg/family-svg';
import { GiftSvg } from '@/components/svg/gift-svg';
import { GreatOfferSvg } from '@/components/svg/great-offer-svg';
import { OutdoorActivitySvg } from '@/components/svg/outdoor-activity-svg';
import { StarSvg } from '@/components/svg/star-svg';

export interface DealPerkCardProps {
  perk:
    | 'greatOffer'
    | 'outdoorActivity'
    | 'perfectAsGift'
    | 'forFamily'
    | 'ourRecommendation';
}
export function DealPerkCard({ perk }: DealPerkCardProps) {
  const perkText = {
    greatOffer: 'Tolles Angebot',
    outdoorActivity: 'Outdoor Aktivität',
    perfectAsGift: 'Perfekt als Geschenk',
    forFamily: 'Für die Familie',
    ourRecommendation: 'Unsere Empfehlung',
  }[perk];
  const perkIcon = {
    greatOffer: <GreatOfferSvg />,
    outdoorActivity: <OutdoorActivitySvg />,
    perfectAsGift: <GiftSvg />,
    forFamily: <FamilySvg />,
    ourRecommendation: <StarSvg />,
  }[perk];

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-secondary/10 px-6 py-4 text-xl font-medium">
      <span className="text-3xl">{perkIcon}</span>
      <span className="text-aldi-blue">{perkText}</span>
    </div>
  );
}
