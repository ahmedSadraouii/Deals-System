import type { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="bg-neutral-50">
      <div className="flex flex-col items-center px-2 py-8 lg:px-6 lg:py-0">
        <div className="flex w-full flex-col items-center py-20">
          {children}
        </div>
      </div>
    </section>
  );
}
