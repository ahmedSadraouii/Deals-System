'use client';

import { useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { AldiInput } from '@/components/nextui/aldi-input';
import { CopyIconSvg } from '@/components/svg/aldi-copy-svg';

interface CopyableInputProps {
  value: string;
}

export default function CopyableInput({ value }: CopyableInputProps) {
  const [copyTooltipVisible, setCopyTooltipVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopyTooltipVisible(true);
    setTimeout(() => setCopyTooltipVisible(false), 2000);
  };

  return (
    <div>
      {copyTooltipVisible ? (
        <div>
          <Tooltip
            color="success"
            content="Copied!"
            isOpen={copyTooltipVisible}
            onOpenChange={setCopyTooltipVisible}
            placement="top-end"
          >
            <AldiInput
              label="Dein Code"
              className="w-full text-aldi-blue md:w-96"
              readOnly
              value={value}
              endContent={<CopyIconSvg onClick={handleCopy} />}
            />
          </Tooltip>
        </div>
      ) : (
        <AldiInput
          label="Dein Code"
          className="w-full text-aldi-blue md:w-96"
          readOnly
          value={value}
          endContent={<CopyIconSvg onClick={handleCopy} />}
        />
      )}
    </div>
  );
}
