'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DoneIconSvg } from '@/components/svg/done-svg';

export function RedemptionStepper() {
  const path = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const steps = ['Kassenbon-PIN', 'Aktivieren', 'Dein Deal'];

  useEffect(() => {
    if (
      path === '/redemption/activate' ||
      /\/redemption\/activate\/\w+/.test(path)
    ) {
      setCurrentStep(2);
    } else if (path === '/redemption/thankyou') {
      setCurrentStep(3);
    }
  }, [path, setCurrentStep]);
  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      if (step === 1) {
        router.push('/redemption');
      }
    }
  };
  return (
    <div>
      {/* Step items */}
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`relative flex w-36 flex-col items-center justify-center gap-2
            ${currentStep === i + 1 && 'active'}
            ${(i + 1 < currentStep || i + 1 !== currentStep) && 'inactive'}`}
          >
            {/* Step number or icon*/}
            <div
              className={`relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
              ${
                currentStep === i + 1
                  ? 'border-3 border-orange-500'
                  : i + 1 < currentStep
                  ? 'border-3 border-green-600'
                  : 'border-3 border-gray-300'
              } font-semibold text-gray-500`}
              onClick={() => handleStepClick(i + 1)}
            >
              {i + 1 < currentStep ? <DoneIconSvg /> : i + 1}
            </div>
            {/* Step label */}
            <p className={`whitespace-nowrap font-semibold `}>{step}</p>
            {/* Step connector line */}
            {i !== 0 && (
              <div
                className={`absolute right-[75%] top-1/3 h-[3px] w-[4rem] -translate-y-2/4 bg-slate-200 md:w-[10rem] xl:w-[11rem] 2xl:w-[15rem]`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
