'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';
import { I18nProvider } from '@react-aria/i18n';
import { Settings } from 'luxon';
import { CartContextProvider } from '@/app/contexts/cart/cart-context';

export interface ProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ProvidersProps) {
  // set the default locale on the client side
  Settings.defaultLocale = 'de';

  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <I18nProvider locale="de-DE">
          <CartContextProvider>{children}</CartContextProvider>
        </I18nProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
