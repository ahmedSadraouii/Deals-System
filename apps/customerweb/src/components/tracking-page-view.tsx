'use client';

import { useEffect, useRef } from 'react';
import { trackPageView } from '@/utils/tracking';

interface PageInfo {
  pageName: string;
  pageType: string;
  primaryCategory: string;
  subCategory: string;
  subSubCategory: string;
}
interface PageViewTrackingProps {
  pageInfo: PageInfo;
}
export function PageViewTracking({ pageInfo }: PageViewTrackingProps) {
  const hasTrackedPageView = useRef(false);

  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView(pageInfo);
      hasTrackedPageView.current = true;
    }
  }, [pageInfo]);

  return null;
}
