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

  const pageInfo = {
    pageName:
      selectedTab === 'register' ? 'aldi-deals-register' : 'aldi-deals-login',
    pageType: 'aldi-sued-ci-template',
    primaryCategory: 'ALDI SUED CI',
    subCategory: 'aldi-deals',
    subSubCategory: selectedTab === 'register' ? 'register' : 'login',
  };
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView(pageInfo);
      hasTrackedPageView.current = true;
    }
  }, [pageInfo, selectedTab]);

  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold text-secondary lg:mb-20 lg:text-5xl">
        {selectedTab === 'login' &&
          'Melde Dich an, um Dir tolle Deals zu sichern!'}
        {selectedTab === 'register' &&
          'Registriere Dich, um Dir tolle Deals zu sichern!'}
      </h1>
      <AldiTabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
        <Tab
          key="login"
          title={
            <>
              <span className="hidden lg:block">
                Ich habe bereits ein Konto
              </span>
              <span className="lg:hidden">Anmelden</span>
            </>
          }
          className="w-full"
        >
          <LoginTab />
        </Tab>
        <Tab
          key="register"
          title={
            <>
              <span className="hidden lg:block">Ich bin neu hier</span>
              <span className="lg:hidden">Registrieren</span>
            </>
          }
          className="w-full"
        >
          <RegisterTab onSwitchToLogin={onSwitchToLogin} />
        </Tab>
      </AldiTabs>
    </>
  );
}
