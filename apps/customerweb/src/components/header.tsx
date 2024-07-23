'use client';

import React from 'react';
import Link from 'next/link';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import { HeaderCartButton } from './header-cart-button';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import type { Variants } from 'framer-motion';
import { HeaderCartSection } from '@/components/header-cart-section';
import { HeaderUserSection } from '@/components/header-user-section';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiDealsSvg } from '@/components/svg/aldi-deals-svg';
import { AldiSuedSvg } from '@/components/svg/aldi-sued-svg';
import { IconTicket } from '@/components/svg/icon-ticket';
import { cn } from '@/utils/cn';
import {
  trackCTA,
  trackLogoClick,
  trackNavigationClick,
} from '@/utils/tracking';

export function Header() {
  const handleLinkClick = (linkName: string, targetUrl: string) => {
    trackCTA(linkName, targetUrl);
  };
  const handleNavigationClick = (navigationItem: string) => {
    trackNavigationClick(navigationItem);
  };
  const session = useSession();
  const handleLogoClick = () => {
    trackLogoClick('aldi deals');
  };
  return (
    <Navbar
      suppressHydrationWarning={true}
      isBordered={true}
      maxWidth="full"
      classNames={{
        base: 'navbar-height-proxy bg-white !border-solid',
        menu: 'navbar-height-proxy',
        wrapper: cn('px-4 !container mx-auto'),
        toggleIcon: 'bg-secondary/10 rounded-full h-auto aspect-square p-6',
        toggle: 'block w-12',
      }}
      height="var(--navbar-height-injected, 96px)"
    >
      <NavbarContent className="hidden shrink-0 gap-0 lg:flex" justify="center">
        <NavbarBrand
          as={NextLink}
          href="/"
          className="mr-4 h-full shrink-0 space-x-4 py-4"
          onClick={handleLogoClick}
        >
          <AldiSuedSvg className="h-full" />
          <AldiDealsSvg className="h-full" />
        </NavbarBrand>
        <NavbarItem>
          <AldiButton
            as={Link}
            size="lg"
            variant="light"
            className="text-secondary"
            href="/"
            onClick={() => handleNavigationClick('start')}
          >
            Start
          </AldiButton>
        </NavbarItem>
        <NavbarItem>
          <AldiButton
            as={Link}
            size="lg"
            variant="light"
            href="/content/faq"
            className="text-secondary"
            onClick={() => handleNavigationClick('faq')}
          >
            FAQ
          </AldiButton>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden shrink-0 gap-4 lg:flex" justify="end">
        <AldiButton
          as={Link}
          size="lg"
          variant="solid"
          href="/redeem"
          endContent={<IconTicket className="text-2xl" />}
          color="secondary"
          onClick={() => handleLinkClick('dealactivieren', '/redeem')}
        >
          Deal aktivieren
        </AldiButton>
        <HeaderUserSection />
        <HeaderCartSection>
          <HeaderCartButton />
        </HeaderCartSection>
      </NavbarContent>

      <NavbarContent
        className="flex w-full flex-col gap-2 lg:hidden"
        justify="center"
      >
        <div className="flex w-full items-center gap-4">
          <NavbarMenuToggle />
          <NavbarBrand
            as={NextLink}
            href="/"
            className="ml-4 shrink-0 space-x-4"
          >
            <AldiSuedSvg className="h-10 lg:h-auto" />
            <AldiDealsSvg className="h-10 lg:h-auto" />
          </NavbarBrand>
          <HeaderCartSection>
            <HeaderCartButton />
          </HeaderCartSection>
          <HeaderUserSection />
        </div>
        <div className="w-full">
          <AldiButton
            as={Link}
            size="lg"
            variant={session.status === 'unauthenticated' ? 'ghost' : 'solid'}
            href="/redeem"
            endContent={<IconTicket className="text-2xl" />}
            color="secondary"
            fullWidth={true}
            onClick={() => handleLinkClick('deal aktivieren', '/redeem')}
          >
            Deal aktivieren
          </AldiButton>
        </div>
      </NavbarContent>

      <NavbarMenu
        motionProps={{
          variants: {
            enter: {
              width: '100%',
              transition: {
                duration: 0.3,
                easings: 'easeOut',
              },
            },
            exit: {
              width: 0,
              transition: {
                duration: 0.25,
                easings: 'easeIn',
              },
            },
          } as Variants,
        }}
        className="bg-secondary/80 p-0 backdrop-blur-sm"
      >
        <div className="flex h-full w-[280px] flex-col gap-4 bg-white p-4">
          <NavbarMenuItem>
            <Link href="/">Start</Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
