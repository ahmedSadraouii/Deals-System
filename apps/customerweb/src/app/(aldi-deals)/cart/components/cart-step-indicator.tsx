import { StepIndicator } from '@/components/step-indicator';

export interface CartStepIndicatorProps {
  step: number;
}
export function CartStepIndicator({ step }: CartStepIndicatorProps) {
  const steps = ['Warenkorb', 'Checkout', 'Bezahlung', 'Deal erhalten'];

  return <StepIndicator step={step} steps={steps} />;
}
