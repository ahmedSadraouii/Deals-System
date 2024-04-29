import React from 'react';
import Link from 'next/link';
import { HeaderCategoryButton } from '@/components/header-category-button';
import { HeaderUserSection } from '@/components/header-user-section';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconArrowDown } from '@/components/svg/icon-arrow-down';
import { IconCart } from '@/components/svg/icon-cart';

export function Header() {
  return (
    <header className="border-b-1 p-4">
      <nav className="container mx-auto flex flex-wrap space-x-2 xl:flex-nowrap xl:space-x-16">
        <div className="shrink-0">
          <Link href="/">
            <img width={112} height={64} src="/logo.svg" alt="logo" />
          </Link>
        </div>
        <ul className="hidden grow items-center space-x-2 lg:flex">
          <AldiButton as={Link} size="lg" variant="light" href="/">
            Start
          </AldiButton>
          <HeaderCategoryButton>
            <AldiButton
              variant="light"
              endContent={<IconArrowDown className="text-2xl" />}
              size="lg"
            >
              Kategorien
            </AldiButton>
          </HeaderCategoryButton>
          <AldiButton as={Link} size="lg" variant="light" href="/faq">
            FAQ
          </AldiButton>
          <AldiButton as={Link} size="lg" variant="light" href="/examples">
            Examples
          </AldiButton>
        </ul>
        <div className="flex items-center space-x-2">
          <HeaderUserSection />
          <AldiButton
            as={Link}
            size="lg"
            variant="flat"
            isIconOnly={true}
            href="/cart"
          >
            <IconCart className="text-2xl" />
          </AldiButton>
        </div>
      </nav>
    </header>
  );
}
