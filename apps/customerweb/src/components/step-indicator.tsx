import { Fragment } from 'react';
import { IconCircleCheck } from '@/components/svg/icon-circle-check';
import { cn } from '@/utils/cn';

export interface StepIndicatorProps {
  step: number;
  steps: Array<string>;
}
export function StepIndicator({ step, steps }: StepIndicatorProps) {
  if (step < 0 || step > steps.length + 1) {
    throw new Error(`Invalid step. Must be between 0 and ${steps.length + 1}.`);
  }

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      {steps.map((stepTitle, stepIndex) => (
        <Fragment key={stepIndex}>
          <div className="flex flex-col items-center justify-center gap-2">
            <IconCircleCheck
              className={cn(
                'h-12 w-12',
                stepIndex === step - 1 ? 'text-primary' : 'text-secondary/10',
                stepIndex < step - 1 && 'fill-aldi-key text-white',
              )}
            />
            <span className="font-bold text-secondary">{stepTitle}</span>
          </div>
          {stepIndex < steps.length - 1 && (
            <div
              className={cn(
                'mb-8 h-[3px] grow overflow-hidden rounded-full',
                stepIndex <= step - 2 ? 'bg-primary' : 'bg-secondary/10',
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
