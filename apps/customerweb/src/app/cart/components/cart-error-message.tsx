import React from 'react';
import NextLink from 'next/link';
import { Link } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconClock } from '@/components/svg/icon-clock';

export interface CartErrorMessageProps {
  error?: 'invalid-location' | 'cart-expired';
}

export function CartErrorMessage({ error }: CartErrorMessageProps) {
  if (error === 'cart-expired') {
    return (
      <div className="flex flex-row items-center rounded-[20px] bg-primary/10 p-6 text-primary">
        <IconClock className="mr-2 shrink-0 text-3xl" />
        <span className="grow">
          Dein Warenkorb wurde zurückgesetzt, da die Reservierungszeit von 20
          Minuten abgelaufen ist!
        </span>
        <AldiButton
          size="lg"
          variant="ghost"
          color="primary"
          as={Link}
          href="/"
        >
          Deals entdecken
        </AldiButton>
      </div>
    );
  } else if (error === 'invalid-location') {
    return (
      <div className="rounded-[20px] bg-primary/10 p-6 text-primary">
        Aufgrund deines Standorts kannst du diesen Deal leider nicht erwerben.
        Weitere Deals kannst du in deiner ALDI SÜD Filiale entdecken! Hier gehts
        zum Filialfinder:{' '}
        <Link
          as={NextLink}
          href="https://www.aldi-sued.de/filialen-und-oeffnungszeiten.html"
          underline="always"
          className="font-medium"
          target="_blank"
        >
          https://www.aldi-sued.de/filialen-und-oeffnungszeiten.html
        </Link>
      </div>
    );
  }
}
