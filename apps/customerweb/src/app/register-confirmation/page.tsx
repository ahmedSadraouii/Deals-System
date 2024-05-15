import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AldiButton } from '@/components/nextui/aldi-button';

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const code = searchParams?.code;

  if (!code) {
    return redirect('/');
  }

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center px-6 py-8 lg:py-0">
        <div className="flex flex-col items-center py-20">
          <h1 className="mb-4 mt-10 text-5xl font-bold text-secondary">
            Vielen Dank für deine Registrierung!
          </h1>

          <p className="mb-10 text-center text-xl text-secondary/50">
            Deine Registrierung wurde erfolgreich bestätigt. Du kannst dich nun
            anmelden!
          </p>

          <AldiButton size="lg" variant="ghost" as={Link} href="/auth">
            Zur Anmeldung
          </AldiButton>
        </div>
      </div>
    </section>
  );
}
