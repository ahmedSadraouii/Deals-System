import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Settings } from 'luxon';
import ClientProviders from '@/app/(aldi-deals)/client-providers';
import ServerProviders from '@/app/(aldi-deals)/server-providers';
import { ToasterOutlet } from '@/app/(aldi-deals)/toaster-outlet';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { AldiSuedDefsSvg } from '@/components/svg/aldi-sued-defs-svg';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALDI Deals',
  description: '',
};

export interface RootLayoutProps {
  children: ReactNode;
}

// set the default locale on the server side
Settings.defaultLocale = 'de';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" className="aldi">
      {process.env.NEXT_PUBLIC_ADOBE_SCRIPT && (
        <script src={process.env.NEXT_PUBLIC_ADOBE_SCRIPT} async></script>
      )}
      <body className="bg-white">
        <ClientProviders>
          <ServerProviders>
            <ToasterOutlet />
            <div className="flex min-h-screen flex-col">
              <AldiSuedDefsSvg />
              <Header />
              <main className="flex grow flex-col overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </div>
          </ServerProviders>
        </ClientProviders>
      </body>
    </html>
  );
}
