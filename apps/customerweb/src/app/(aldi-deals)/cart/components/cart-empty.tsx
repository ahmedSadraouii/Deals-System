import { useEffect, useRef } from 'react';
import { ErrorPage } from '@/components/error-page';
import { trackPageView } from '@/utils/tracking';

export function CartEmpty() {
  const hasTrackedPageView = useRef(false);

  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView({
        pageName: 'aldi-deals-profile',
        pageType: 'aldi-sued-ci-template',
        primaryCategory: 'ALDI SUED CI',
        subCategory: 'aldi-deals',
        subSubCategory: 'cart',
      });
      hasTrackedPageView.current = true;
    }
  }, []);
  return (
    <ErrorPage
      title="Dein Warenkorb ist leer!"
      description="Dein Warenkorb ist leer! Durchstöbere jetzt alle Deals und leg los."
      back={{
        link: '/',
        text: 'Deals entdecken',
        variant: 'solid',
        color: 'secondary',
      }}
    />
  );
}
