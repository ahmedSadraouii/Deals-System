import type { ReactNode } from 'react';
import { RedemptionSteps } from '@/components/redeem/redemption-steps';

export interface CartLayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: CartLayoutProps) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <RedemptionSteps />
      </div>
      {children}
    </div>
  );
}
