'use client';

import React, { useEffect, useRef } from 'react';
import { trackPageView } from '@/utils/tracking';

interface FavoriteListProps {
  children: React.ReactNode;
}

export function FavoriteList({ children }: FavoriteListProps) {
  const hasTrackedPageView = useRef(false);
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView({
        pageName: 'aldi-deals-profile',
        pageType: 'aldi-sued-ci-template',
        primaryCategory: 'ALDI SUED CI',
        subCategory: 'aldi-deals',
        subSubCategory: 'merkliste',
      });
      hasTrackedPageView.current = true;
    }
  }, []);

  return <div>{children}</div>;
}
