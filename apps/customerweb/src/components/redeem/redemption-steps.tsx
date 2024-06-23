'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/step-indicator';

export function RedemptionSteps() {
  const path = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const steps = ['Kassenbon-PIN', 'Aktivieren', 'Dein Deal'];

  useEffect(() => {
    if (path === '/redeem/activate' || /\/redeem\/activate\/\w+/.test(path)) {
      setCurrentStep(2);
    } else if (path === '/redeem/thankyou') {
      setCurrentStep(3);
    }
  }, [path, setCurrentStep]);
  const _handleStepClick = useCallback(
    (step: number) => {
      if (step < currentStep) {
        if (step === 1) {
          router.push('/redeem');
        }
      }
    },
    [currentStep, router],
  );
  return <StepIndicator step={currentStep} steps={steps} />;
}
