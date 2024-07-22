'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tab } from '@nextui-org/react';
import type { Key } from '@react-types/shared';
import { LoginTab } from '@/app/(aldi-deals)/auth/login-tab';
import { RegisterTab } from '@/app/(aldi-deals)/auth/register-tab';
import { AldiTabs } from '@/components/nextui/aldi-tabs';
import { createQueryString } from '@/utils/create-query-string';
import { trackPageView } from '@/utils/tracking';

export function AuthTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isRedeemPage = pathname === '/redeem';
  const router = useRouter();
  const hasTrackedPageView = useRef(false);
  const [selectedTab, setSelectedTabInner] = useState<Key>(
    searchParams.get('tab') === 'register' ? 'register' : 'login',
  );

  const setSelectedTab = useCallback(
    (tab: Key) => {
      hasTrackedPageView.current = false;
      setSelectedTabInner(tab);
      router.replace(
        `${pathname}?${createQueryString({ tab: '' + tab }, searchParams)}`,
      );
    },
    [pathname, router, searchParams],
  );

  const onSwitchToLogin = useCallback(() => {
    setSelectedTab('login');
    hasTrackedPageView.current = false;
  }, [setSelectedTab]);

  useEffect(() => {
    const pageInfo = {
      pageName:
        selectedTab === 'register' ? 'aldi-deals-register' : 'aldi-deals-login',
      pageType: 'aldi-sued-ci-template',
      primaryCategory: 'ALDI SUED CI',
      subCategory: 'aldi-deals',
      subSubCategory: selectedTab === 'register' ? 'register' : 'login',
    };
    if (!hasTrackedPageView.current) {
      trackPageView(pageInfo);
      hasTrackedPageView.current = true;
    }
  }, [selectedTab]);

  return (
    <>
      <h1 className="mb-4 text-center text-2xl font-bold text-secondary lg:mb-20 lg:text-5xl">
        {isRedeemPage && 'Melde Dich an, um deinen Deal einzulösen!'}
        {selectedTab === 'login' &&
          !isRedeemPage &&
          'Melde Dich an, um Dir tolle Deals zu sichern!'}
        {selectedTab === 'register' &&
          !isRedeemPage &&
          'Registriere Dich, um Dir tolle Deals zu sichern!'}
      </h1>
      <AldiTabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
        <Tab key="login" title="Ich habe bereits ein Konto" className="w-full">
          <LoginTab />
        </Tab>
        <Tab key="register" title="Ich bin neu hier" className="w-full">
          <RegisterTab onSwitchToLogin={onSwitchToLogin} />
        </Tab>
      </AldiTabs>
    </>
  );
}
