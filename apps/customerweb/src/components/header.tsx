import React from 'react';
import Link from 'next/link';
import NextLink from 'next/link';
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
import { HeaderUserSection } from '@/components/header-user-section';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiDealsSvg } from '@/components/svg/aldi-deals-svg';
import { AldiSuedSvg } from '@/components/svg/aldi-sued-svg';
import { IconCart } from '@/components/svg/icon-cart';
import { IconTicket } from '@/components/svg/icon-ticket';
import { cn } from '@/utils/cn';

export function Header() {
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
        toggle: 'block',
      }}
      height="var(--navbar-height-injected, 96px)"
    >
      <NavbarContent className="hidden shrink-0 gap-0 lg:flex" justify="center">
        <NavbarBrand
          as={NextLink}
          href="/"
          className="mr-4 h-full shrink-0 space-x-4 py-4"
        >
          <AldiSuedSvg className="h-full" />
          <AldiDealsSvg className="h-full" />
        </NavbarBrand>
        <NavbarItem>
          <AldiButton as={Link} size="lg" variant="light" href="/">
            Start
          </AldiButton>
        </NavbarItem>
        {/*<NavbarItem>
          <AldiButton as={Link} size="lg" variant="light" href="/faq">
            FAQ
          </AldiButton>
        </NavbarItem>*/}
      </NavbarContent>

      <NavbarContent className="hidden shrink-0 gap-4 lg:flex" justify="end">
        <AldiButton
          as={Link}
          size="lg"
          variant="ghost"
          href="/redeem"
          endContent={<IconTicket className="text-2xl" />}
          color="secondary"
        >
          Deal aktivieren
        </AldiButton>
        <HeaderUserSection />
        <AldiButton
          as={Link}
          size="lg"
          variant="flat"
          isIconOnly={true}
          href="/cart"
          className="h-12 w-12 text-secondary"
        >
          <IconCart className="text-2xl" />
        </AldiButton>
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
          <HeaderUserSection />
          <AldiButton
            as={Link}
            variant="flat"
            isIconOnly={true}
            href="/cart"
            className="h-12 w-12 text-secondary"
          >
            <IconCart className="text-2xl" />
          </AldiButton>
        </div>
        <div className="w-full">
          <AldiButton
            as={Link}
            size="lg"
            variant="ghost"
            href="/redeem"
            endContent={<IconTicket className="text-2xl" />}
            color="secondary"
            fullWidth={true}
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
          <NavbarMenuItem>Item 1</NavbarMenuItem>
          <NavbarMenuItem>Item 2</NavbarMenuItem>
          <NavbarMenuItem>Item 3</NavbarMenuItem>
          <NavbarMenuItem>Item 4</NavbarMenuItem>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
