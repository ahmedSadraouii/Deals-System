'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

const products = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: 'ChartPieIcon',
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: 'CursorArrowRaysIcon',
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: 'FingerPrintIcon',
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: 'SquaresPlusIcon',
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: 'ArrowPathIcon',
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="border-b-1">
      <nav
        className="container mx-auto flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <img className="h-16 w-auto" src="/logo.svg" alt="logo" />
          </Link>
          <a
            href="#"
            className="ml-16 rounded-full bg-gray-100 px-7 py-3 text-sm leading-6 text-gray-900"
          >
            <Image
              src="/icons/search-icon.svg"
              width={10}
              height={10}
              alt="basket icon"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden items-center lg:flex lg:gap-x-12">
          <a href="#" className="text-sm leading-6 text-gray-900">
            Start
          </a>

          <Dropdown>
            <DropdownTrigger>
              <Button
                type="button"
                className="flex cursor-pointer items-center bg-transparent p-0 text-sm focus:outline-none"
              >
                Kategorien
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {products.map((data, index) => (
                <DropdownItem key={index} isDisabled={false}>
                  {data.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <a href="#" className="text-sm leading-6 text-gray-900">
            Aktuelles
          </a>
          <a href="#" className="text-sm leading-6 text-gray-900">
            Hilfe
          </a>
        </div>
        <div className="hidden items-center justify-center lg:flex lg:flex-1 lg:justify-end">
          <a
            href="#"
            className="mr-4 rounded-full border-2 px-7 py-3 text-sm leading-6 text-gray-900"
          >
            Code einlösen
          </a>
          <a
            href="#"
            className="flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm leading-6 text-white"
          >
            Anmelden
            <span className="float-end ml-2">
              <img src="/icons/user-icon.svg" alt="user icon" className="h-5" />
            </span>
          </a>
          <a
            href="#"
            className="ml-3 rounded-full bg-gray-100 px-7 py-3 text-sm leading-6 text-gray-900"
          >
            <img
              src="/icons/basket-icon.svg"
              alt="backet icon"
              className="h-5"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
