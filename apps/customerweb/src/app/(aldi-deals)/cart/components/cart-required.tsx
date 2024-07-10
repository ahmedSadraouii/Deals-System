'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';
import { trackPageView } from '@/utils/tracking';

export interface CartRequiredProps {
  children: ReactNode;
}

export function CartRequired({ children }: CartRequiredProps) {
  const hasTrackedPageView = useRef(false);
  const pageInfo = {
    pageName: 'aldi-deals-cart',
    pageType: 'aldi-sued-ci-template',
    primaryCategory: 'ALDI SUED CI',
    subCategory: 'aldi-deals',
    subSubCategory: 'cart',
  };
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView(pageInfo);
      hasTrackedPageView.current = true;
    }
  }, []);
  const { cartContext } = useCart();
  if (!cartContext.cart) {
    return null;
  }
  return children;
}
