'use client';

import { useEffect, useState } from 'react';
import { IconClock } from '@/components/svg/icon-clock';
import { formatAvailability } from '@/utils/format-availability';

export interface DealCountdownProps {
  availableTill: string;
}

export function DealCountdown({ availableTill }: DealCountdownProps) {
  const [availabilityText, setAvailabilityText] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setAvailabilityText(formatAvailability(availableTill));
    }, 1000);
    return () => clearInterval(interval);
  }, [availableTill]);
  return (
    <div className="flex flex-row items-center gap-2 rounded-lg border border-secondary/10 p-3 text-primary">
      <IconClock className="mr-2 text-2xl" />
      <span className="whitespace-nowrap" suppressHydrationWarning={true}>
        Noch {availabilityText}
      </span>
    </div>
  );
}
