'use client';

import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { AldiButton } from './nextui/aldi-button';
import { BagSvg } from './svg/bag-svg';
import { CloseSvg } from './svg/close-svg';
import { HeartSvg } from './svg/heart-svg';
import { IconCart } from './svg/icon-cart';
import { IconHome } from './svg/icon-home-svg';
import { IconUser } from './svg/icon-user';
import { InfoIcon } from './svg/info-svg';
import { Badge, Divider, NavbarMenuItem } from '@nextui-org/react';
import { useCart } from '@/app/(aldi-deals)/contexts/cart/use-cart';
import { cn } from '@/utils/cn';
import { trackNavigationClick } from '@/utils/tracking';

interface NavbarMenuItemsProps {
  closeMenu: () => void;
}

export function NavbarMenuItems({ closeMenu }: NavbarMenuItemsProps) {
  const { cartContext } = useCart();
  const session = useSession();

  const badgeContent = useMemo(() => {
    if (cartContext.cartExpired) return undefined;
    if (!cartContext.cart?.items) return undefined;
    if (cartContext.cart.items.length === 0) return undefined;
    const cartItemQuantity = cartContext.cart.items
      .flatMap((cartItem) => cartItem.quantity)
      .reduce((a, b) => a + b, 0);
    return cartItemQuantity === 0 ? undefined : cartItemQuantity;
  }, [cartContext.cart?.items, cartContext.cartExpired]);

  const onClickSignOut = useCallback(async () => {
    await signOut({
      redirect: true,
    });
  }, []);

  const handleNavigationClick = (navigationItem: string) => {
    closeMenu();
    trackNavigationClick(navigationItem);
  };

  return (
    <div className="flex h-full flex-col gap-6 bg-white">
      <div>
        <div className="p-4">
          <NavbarMenuItem
            className="flex cursor-pointer items-center gap-2"
            onClick={closeMenu}
          >
            <CloseSvg />
            <p className="text-xs text-secondary">Menü schließen</p>
          </NavbarMenuItem>
        </div>
        <Divider />
        {session.status === 'authenticated' ? (
          <>
            <h2 className="p-4 text-2xl font-bold text-secondary">
              Hey {session.data?.user.profile.firstName}!
            </h2>
            <Divider />
          </>
        ) : (
          <div className="px-4 pt-8">
            <AldiButton
              as={Link}
              size="lg"
              variant="solid"
              href="/auth"
              className="w-full"
              endContent={<IconUser className="text-white" />}
              color="secondary"
              onClick={closeMenu}
            >
              Anmelden
            </AldiButton>
          </div>
        )}
      </div>

      <div className="mb-4 w-full border-b border-secondary border-opacity-10">
        <p className="px-4 py-2 text-xs text-secondary opacity-25">
          Navigation
        </p>
        <Divider />
        <div className="flex flex-col gap-4 p-4">
          <NavbarMenuItem
            className="flex items-center gap-2"
            onClick={() => handleNavigationClick('home')}
          >
            <IconHome />
            <Link href="/" className="text-lg text-secondary">
              Startseite
            </Link>
          </NavbarMenuItem>
          <Divider />
          <NavbarMenuItem
            className="flex items-center justify-between"
            onClick={() => handleNavigationClick('cart')}
          >
            <div className="flex items-center gap-2">
              <IconCart className="text-2xl text-secondary" />
              <Link href="/cart" className="text-lg text-secondary">
                Warenkorb
              </Link>
            </div>
            <Badge
              content={badgeContent}
              classNames={{
                badge: badgeContent ? 'w-6 h-6 text-sm' : '',
              }}
              color="primary"
              suppressHydrationWarning={true}
            >
              <div></div>
            </Badge>
          </NavbarMenuItem>
          <Divider />
          <NavbarMenuItem
            className="flex items-center gap-2"
            onClick={() => handleNavigationClick('faq')}
          >
            <InfoIcon />
            <Link href="/faq" className="text-lg text-secondary">
              FAQ
            </Link>
          </NavbarMenuItem>
        </div>
      </div>
      <div className="mb-4 w-full border-b border-secondary/10">
        <p className="px-4 py-2 text-xs text-secondary/25">Mein Profil</p>
        <Divider
          className={cn(session.status === 'unauthenticated' && 'opacity-25')}
        />
        <div className="flex flex-col gap-4 p-4">
          <NavbarMenuItem
            className={cn(
              'flex items-center gap-2',
              session.status === 'unauthenticated' && 'opacity-25',
            )}
            onClick={() => handleNavigationClick('profile')}
          >
            <IconUser className="text-2xl text-secondary" />
            <Link href="/profile" className="text-lg text-secondary">
              Profil
            </Link>
          </NavbarMenuItem>
          <Divider />
          <NavbarMenuItem
            className={cn(
              'flex items-center gap-2',
              session.status === 'unauthenticated' && 'opacity-25',
            )}
            onClick={() => trackNavigationClick('meine deals')}
          >
            <BagSvg />
            <Link href="/profile/deals" className="text-lg text-secondary">
              Meine Deals
            </Link>
          </NavbarMenuItem>
          <Divider />
          <NavbarMenuItem
            className={cn(
              'flex items-center gap-2',
              session.status === 'unauthenticated' && 'opacity-25',
            )}
            onClick={() => trackNavigationClick('merkliste')}
          >
            <HeartSvg className="text-2xl text-secondary" />
            <Link href="/profile/favorites" className="text-lg text-secondary">
              Merkliste
            </Link>
          </NavbarMenuItem>
        </div>
      </div>

      <div>
        {session.status === 'authenticated' && (
          <NavbarMenuItem
            className="flex w-full items-center justify-center gap-2"
            onClick={closeMenu}
          >
            <AldiButton
              as={Link}
              size="lg"
              variant="ghost"
              href="/auth"
              className="w-[90%]"
              onClick={onClickSignOut}
              color="secondary"
            >
              Abmelden
            </AldiButton>
          </NavbarMenuItem>
        )}
      </div>
    </div>
  );
}
