'use client';

import React, { useState } from 'react';
import { DoneIconSvg } from '@/components/svg/done-svg';

function Stepper() {
  const steps = ['Warenkorb', 'Checkout', 'Bezahlung', 'Deal erhalten'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  return (
    <div>
      {/* Step items */}
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`relative flex w-36 flex-col items-center justify-center gap-2 ${currentStep === i + 1 && 'active'} ${((i + 1 < currentStep && !complete) || (complete && i + 1 !== currentStep)) && 'inactive'}`}
          >
            {/* Step number or icon */}
            <div
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep === i + 1 ? 'border-3 border-orange-500' : complete || i + 1 < currentStep ? 'border-3 border-green-600' : 'border-3 border-gray-300'} font-semibold text-gray-500`}
            >
              {i + 1 < currentStep || complete ? <DoneIconSvg /> : i + 1}
            </div>
            {/* Step label */}
            <p className={`font-semibold ${complete && 'text-white'}`}>
              {step}
            </p>
            {/* Step connector line */}
            {i !== 0 && (
              <div
                className={`absolute right-[75%] top-1/3 h-[3px] w-[3rem] -translate-y-2/4 md:w-[8rem] xl:w-[11rem] 2xl:w-[15rem] ${complete ? 'bg-green-600' : 'bg-slate-200'}`}
              ></div>
            )}
          </div>
        ))}
      </div>
      {/* Button to advance steps */}
      {!complete && (
        <button
          className="hidden"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? 'Finish' : 'Next'}
        </button>
      )}
    </div>
  );
}

export default Stepper;
