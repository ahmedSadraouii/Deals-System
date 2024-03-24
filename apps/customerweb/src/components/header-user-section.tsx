import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { HeaderUserProfileButton } from '@/components/header-user-profile-button';
import { AldiButton } from '@/components/nextui/aldi-button';
import { IconProfile } from '@/components/svg/icon-profile';
import { IconTicket } from '@/components/svg/icon-ticket';
import { IconUser } from '@/components/svg/icon-user';
import { authOptions } from '@/utils/auth';

export async function HeaderUserSection() {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    return (
      <>
        <AldiButton
          as={Link}
          size="lg"
          variant="solid"
          href="/activate-coupon"
          endContent={<IconTicket className="text-2xl" />}
          color="secondary"
        >
          Deal einlösen
        </AldiButton>
        <HeaderUserProfileButton>
          <span>Hey {session.user.profile.firstName}!</span>
          <div className="bg-default/40 flex h-12 w-12 items-center justify-center rounded-full">
            <IconProfile className="text-secondary text-2xl" />
          </div>
        </HeaderUserProfileButton>
      </>
    );
  }
  return (
    <>
      <AldiButton
        as={Link}
        variant="ghost"
        href="/activate-coupon"
        endContent={<IconTicket className="text-2xl" />}
        color="secondary"
      >
        Deal einlösen
      </AldiButton>
      <AldiButton
        as={Link}
        variant="solid"
        href="/auth"
        endContent={<IconUser className="text-2xl" />}
        color="secondary"
      >
        Anmelden
      </AldiButton>
    </>
  );
}
