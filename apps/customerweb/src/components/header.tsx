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
import { HeaderCategoryButton } from '@/components/header-category-button';
import { HeaderUserSection } from '@/components/header-user-section';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowDown } from '@/components/svg/icon-arrow-down';
import { IconCart } from '@/components/svg/icon-cart';

export function Header() {
  return (
    <>
      <Navbar
        isBordered={true}
        maxWidth="full"
        classNames={{
          wrapper: '!container mx-auto',
          toggleIcon: 'bg-secondary/10 rounded-full h-auto aspect-square p-6',
        }}
        height="96px"
      >
        <NavbarContent className="space-x-4 lg:hidden" justify="start">
          <NavbarMenuToggle />
          <NavbarBrand as={NextLink} href="/" className="shrink-0">
            <img width={112} height={64} src="/logo.svg" alt="logo" />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden shrink-0 gap-0 lg:flex"
          justify="center"
        >
          <NavbarBrand as={NextLink} href="/" className="mr-4 shrink-0">
            <img width={112} height={64} src="/logo.svg" alt="logo" />
          </NavbarBrand>
          <NavbarItem>
            <AldiButton as={Link} size="lg" variant="light" href="/">
              Start
            </AldiButton>
          </NavbarItem>
          <NavbarItem>
            <HeaderCategoryButton>
              <AldiButton
                variant="light"
                endContent={<IconArrowDown className="text-2xl" />}
                size="lg"
              >
                Kategorien
              </AldiButton>
            </HeaderCategoryButton>
          </NavbarItem>
          <NavbarItem>
            <AldiButton as={Link} size="lg" variant="light" href="/faq">
              FAQ
            </AldiButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="flex gap-4" justify="end">
          <NavbarItem className="flex flex-row items-center gap-4">
            <HeaderUserSection />
          </NavbarItem>
          <NavbarItem>
            <AldiButton
              as={Link}
              size="lg"
              variant="flat"
              isIconOnly={true}
              href="/cart"
            >
              <IconCart className="text-2xl" />
            </AldiButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>Cheese!</NavbarMenuItem>
          <NavbarMenuItem>Cheese!</NavbarMenuItem>
          <NavbarMenuItem>Cheese!</NavbarMenuItem>
          <NavbarMenuItem>Cheese!</NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}
