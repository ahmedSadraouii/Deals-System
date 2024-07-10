import React from 'react';
import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

export default function Page() {
  return (
    <>
      <h1 className="mb-4 mt-10 text-5xl font-bold text-secondary">
        Passwort erfolgreich geändert!
      </h1>

      <p className="mb-10 text-center text-xl text-secondary/50">
        Dein Passwort wurde erfolgreich geändert. Du kannst jetzt zum Login
        zurückkehren und dich <br /> mit deinen neuen Daten anmelden.
      </p>

      <AldiButton size="lg" variant="ghost" as={Link} href="/auth">
        Zurück zur Anmeldung
      </AldiButton>
    </>
  );
}
