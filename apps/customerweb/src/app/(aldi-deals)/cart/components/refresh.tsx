'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface RefreshProps {
  every: number;
}

export function Refresh({ every }: RefreshProps): null {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, every * 1000);
    return () => clearTimeout(interval);
  }, [every, router]);
  return null;
}
