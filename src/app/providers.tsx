'use client';

import type { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
