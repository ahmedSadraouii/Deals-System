import type { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center px-6 py-8 lg:py-0">
        <div className="flex flex-col items-center py-20">{children}</div>
      </div>
    </section>
  );
}
