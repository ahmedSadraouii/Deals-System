'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';

export interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SessionProvider>
  );
}
