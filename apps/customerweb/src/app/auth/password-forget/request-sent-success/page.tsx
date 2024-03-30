import React from 'react';
import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

export default function Page() {
  return (
    <>
      <h1 className="mb-4 mt-10 text-5xl font-bold text-secondary">
        Jetzt bist du am Zug.
      </h1>

      <p className="mb-10 text-center text-xl text-secondary/50">
        Wir haben dir eine Mail zugesendet um dein Passwort zurückzusetzen.
        Bitte schau in deinem Postfach nach.
      </p>

      <AldiButton size="lg" variant="ghost" as={Link} href="/auth">
        Zurück zur Anmeldung
      </AldiButton>
    </>
  );
}
