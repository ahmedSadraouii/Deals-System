'use client';

import { useEffect } from 'react';
import type { ToastParams } from '@/utils/toast';
import { toast } from '@/utils/toast';

export function ClientToast(toastParams: ToastParams) {
  useEffect(() => {
    toast(toastParams);
  }, [toastParams]);
  return null;
}
