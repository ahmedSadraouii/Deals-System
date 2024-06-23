'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import { CartContextActionKind } from '@/app/contexts/cart/cart-context';
import { useCart } from '@/app/contexts/cart/use-cart';
import { IconClock } from '@/components/svg/icon-clock';
import { toast } from '@/utils/toast';

export function ReservationTimer() {
  const { cartContext } = useCart();
  const router = useRouter();

  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (!cartContext.cart || !cartContext.cart.availableTill) {
      return;
    }

    const expireTime = DateTime.fromJSDate(cartContext.cart.availableTill);
    const initialRemainingTime = expireTime.diffNow().as('seconds');
    if (initialRemainingTime <= 0) {
      router.refresh();
      return;
    }

    setRemainingSeconds(initialRemainingTime);

    const interval = setInterval(() => {
      const currentTime = DateTime.now();
      const remainingTime = expireTime.diff(currentTime).as('seconds');
      if (remainingTime <= 0) {
        cartContext.dispatch({
          type: CartContextActionKind.ExpireCart,
        });
        clearInterval(interval);
        router.refresh();
        toast({
          title: 'Ihr Warenkorb ist abgelaufen',
          description:
            'Ihr Warenkorb ist abgelaufen, bitte legen Sie die gewünschten Artikel erneut in den Warenkorb.',
        });
      }
      setRemainingSeconds(Math.max(remainingTime, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [cartContext, cartContext.cart, router]);

  const remainingTimeString = useMemo(() => {
    // if it's only seconds, return seconds, otherwise mm:ss
    if (remainingSeconds < 60) {
      return `${remainingSeconds} Sekunden`;
    }

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = (remainingSeconds % 60).toFixed(0).padStart(2, '0');
    return `${minutes}:${seconds} min`;
  }, [remainingSeconds]);

  return (
    <div className="flex items-center justify-center rounded-[20px] bg-success/10 p-4 text-lg text-success">
      <IconClock className="mr-2 text-3xl" />
      <span>
        Reserviert für {remainingSeconds > 0 ? remainingTimeString : '...'}
      </span>
    </div>
  );
}
