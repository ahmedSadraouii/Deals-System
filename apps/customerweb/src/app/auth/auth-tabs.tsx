'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tab } from '@nextui-org/react';
import type { Key } from '@react-types/shared';
import { LoginTab } from '@/app/auth/login-tab';
import { RegisterTab } from '@/app/auth/register-tab';
import { AldiTabs } from '@/components/nextui/aldi-tabs';
import { createQueryString } from '@/utils/create-query-string';

export function AuthTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedTab, setSelectedTabInner] = useState<Key>(
    searchParams.get('tab') === 'register' ? 'register' : 'login',
  );

  const setSelectedTab = useCallback(
    (tab: Key) => {
      setSelectedTabInner(tab);
      router.replace(
        `${pathname}?${createQueryString({ tab: '' + tab }, searchParams)}`,
      );
    },
    [pathname, router, searchParams],
  );

  const onSwitchToLogin = useCallback(() => {
    setSelectedTab('login');
  }, [setSelectedTab]);

  return (
    <>
      <h1 className="mb-20 text-center text-5xl font-bold text-secondary">
        {selectedTab === 'login' &&
          'Melde Dich an, um Dir tolle Deals zu sichern!'}
        {selectedTab === 'register' &&
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
