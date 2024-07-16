'use client';

import { useEffect, useRef } from 'react';
import { trackCheckoutStep4 } from '@/utils/tracking';

interface ThankYouDetailsProps {
  supplierName: string;
  dealName: string;
}
export function ThankYouDetails({
  supplierName,
  dealName,
}: ThankYouDetailsProps) {
  const hasTrackedPageView = useRef(false);
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackCheckoutStep4(supplierName, dealName);
      hasTrackedPageView.current = true;
    }
  }, []);

  return (
    <div className="grow">
      <h1 className="text-2xl font-bold text-secondary">{supplierName}</h1>
      <h2 className="text-lg text-secondary">{dealName}</h2>
    </div>
  );
}
