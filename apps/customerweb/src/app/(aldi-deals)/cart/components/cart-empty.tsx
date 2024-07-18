'use client';

import { ErrorPage } from '@/components/error-page';
import { PageViewTracking } from '@/components/tracking-page-view';

export function CartEmpty() {
  const pageInfo = {
    pageName: 'aldi-deals-profile',
    pageType: 'aldi-sued-ci-template',
    primaryCategory: 'ALDI SUED CI',
    subCategory: 'aldi-deals',
    subSubCategory: 'cart',
  };
  return (
    <>
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
      <PageViewTracking pageInfo={pageInfo} />
    </>
  );
}
