'use client';

import { useEffect, useRef } from 'react';
import { trackPageView } from '@/utils/tracking';

export function AcquiredDealsHeader() {
  const hasTrackedPageView = useRef(false);

  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView({
        pageName: 'aldi-deals-profile',
        pageType: 'aldi-sued-ci-template',
        primaryCategory: 'ALDI SUED CI',
        subCategory: 'aldi-deals',
        subSubCategory: 'deals',
      });
      hasTrackedPageView.current = true;
    }
  }, []);
  return (
    <h1 className="mb-6 text-3xl font-bold text-secondary">
      Deine erworbenen Deals
    </h1>
  );
}
