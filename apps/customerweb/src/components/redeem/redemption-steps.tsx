'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/step-indicator';

export function RedemptionSteps() {
  const path = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const steps = ['Kassenbon-PIN', 'Aktivieren', 'Dein Deal'];

  useEffect(() => {
    if (/\/activate\/\w+/.test(path)) {
      setCurrentStep(2);
    } else if (/\/thankyou\/\w+/.test(path)) {
      setCurrentStep(3);
    }
  }, [path, setCurrentStep]);
  return <StepIndicator step={currentStep} steps={steps} />;
}
