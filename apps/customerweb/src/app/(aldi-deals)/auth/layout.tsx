import type { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="bg-neutral-50">
      <div className="flex flex-col items-center px-4 py-8 lg:py-0">
        <div className="flex w-full flex-col items-center py-10 lg:py-20">
          {children}
        </div>
      </div>
    </section>
  );
}
