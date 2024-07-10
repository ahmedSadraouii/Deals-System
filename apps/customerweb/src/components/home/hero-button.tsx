'use client';

import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowRight } from '@/components/svg/icon-arrow-right';
import { trackCTA, trackPageView } from '@/utils/tracking';

export function HeroButton({ href }: { href: string }) {
  const hasTrackedPageView = useRef(false);
  const ctaText = 'Jetzt Deal sichern';
  const targetUrl = href;
  const handleClick = useCallback(() => {
    trackCTA(ctaText, targetUrl);
  }, [ctaText, targetUrl]);
  const pageInfo = {
    pageName: 'aldi-deals-landingpage',
    pageType: 'aldi-sued-ci-template',
    primaryCategory: 'ALDI SUED CI',
    subCategory: 'aldi-deals',
    subSubCategory: 'landingpage',
  };
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView(pageInfo);
      hasTrackedPageView.current = true;
    }
  }, []);

  return (
    <AldiButton
      as={Link}
      variant="solid"
      color="primary"
      endContent={<IconArrowRight />}
      href={href}
      onClick={handleClick}
      size="lg"
    >
      Jetzt Deal sichern
    </AldiButton>
  );
}
