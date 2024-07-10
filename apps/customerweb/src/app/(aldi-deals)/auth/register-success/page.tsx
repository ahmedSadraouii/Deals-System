import React from 'react';
import Image from 'next/image';
import { ResendActivationLinkButton } from '@/app/(aldi-deals)/auth/register-success/resend-activation-link-button';
import { emailRegex } from '@/utils/email-regex';

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  return (
    <>
      <Image
        src="/img-celebration.png"
        alt="Vielen Dank"
        width={120}
        height={120}
        priority
      />

      <h1 className="mb-4 mt-10 text-5xl font-bold text-secondary">
        Vielen Dank für deine Registrierung!
      </h1>

      <p className="mb-10 text-center text-xl text-secondary/50">
        Deine Registrierung war erfolgreich. Bitte bestätige deine E-Mail
        Adresse.
        <br />
        Hierzu haben wir dir eine Verifizierungsmail zugeschickt.
      </p>

      {searchParams?.email && emailRegex.test(searchParams.email) && (
        <ResendActivationLinkButton emailAddress={searchParams?.email} />
      )}
    </>
  );
}
