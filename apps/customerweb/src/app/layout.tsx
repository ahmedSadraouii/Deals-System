import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Settings } from 'luxon';
import ClientProviders from '@/app/client-providers';
import ServerProviders from '@/app/server-providers';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { AldiSuedDefsSvg } from '@/components/svg/aldi-sued-defs-svg';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALDI Deals Frontend',
  description: 'Generated by create next app',
};

export interface RootLayoutProps {
  children: ReactNode;
}

// set the default locale on the server side
Settings.defaultLocale = 'de';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" className="aldi">
      <body className="bg-white">
        <ServerProviders>
          <ClientProviders>
            <div className="flex min-h-screen flex-col">
              <AldiSuedDefsSvg />
              <Header />
              <main className="flex grow flex-col">{children}</main>
              <Footer />
            </div>
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
