'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tab } from '@nextui-org/react';
import type { Key } from '@react-types/shared';
import { LoginTab } from '@/app/auth/login-tab';
import { RegisterTab } from '@/app/auth/register-tab';
import { AldiTabs } from '@/components/nextui/aldi-tabs';

export function AuthTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedTab, setSelectedTabInner] = useState<Key>(
    searchParams.get('tab') === 'register' ? 'register' : 'login',
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setSelectedTab = useCallback(
    (tab: Key) => {
      setSelectedTabInner(tab);
      router.replace(`${pathname}?${createQueryString('tab', '' + tab)}`);
    },
    [createQueryString, pathname, router],
  );

  const onSwitchToLogin = useCallback(() => {
    setSelectedTab('login');
  }, [setSelectedTab]);

  return (
    <div className="flex flex-col items-center py-20">
      <h1 className="text-secondary mb-20 text-5xl font-bold">
        {selectedTab === 'login' &&
          'Melde Dich an, um Dir tolle Deals zu sichern!'}
        {selectedTab === 'register' &&
          'Registriere Dich, um Dir tolle Deals zu sichern!'}
      </h1>
      <AldiTabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
        <Tab key="login" title="Ich habe bereits ein Konto">
          <LoginTab />
        </Tab>
        <Tab key="register" title="Ich bin neu hier">
          <RegisterTab onSwitchToLogin={onSwitchToLogin} />
        </Tab>
      </AldiTabs>
    </div>
  );
}
