import { forwardRef, useCallback, useState } from 'react';
import type { InputProps } from '@nextui-org/input/dist/input';
import { AldiInput } from '@/components/nextui/aldi-input';
import { IconEyeFilled } from '@/components/svg/icon-eye-filled';
import { IconEyeSlashFilled } from '@/components/svg/icon-eye-slash-filled';

export const AldiPasswordInput = forwardRef<HTMLInputElement, InputProps>(
  function AldiPasswordInputForwarded(props, ref) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = useCallback(
      () => setIsVisible(!isVisible),
      [isVisible],
    );
    return (
      <AldiInput
        {...props}
        ref={ref}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <IconEyeSlashFilled className="text-default-400 pointer-events-none text-2xl" />
            ) : (
              <IconEyeFilled className="text-default-400 pointer-events-none text-2xl" />
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
      />
    );
  },
);
