import type { ReactNode } from 'react';
import { RedemptionStepper } from '@/components/redemption/redemption-steps';

export interface CartLayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: CartLayoutProps) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-14 md:px-0">
      <div className="flex w-full flex-col gap-8 lg:w-[70%] xl:w-[50%]">
        <RedemptionStepper />
        {children}
      </div>
    </div>
  );
}
