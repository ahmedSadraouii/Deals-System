'use client';

import { useCallback } from 'react';
import { AldiButton } from '@/components/nextui/aldi-button';
import { CopySvg } from '@/components/svg/copy-svg';
import { cn } from '@/utils/cn';
import { toast } from '@/utils/toast';

interface CodeFieldProps {
  code: string;
  fullWidth?: boolean;
}

export function CodeField({ code, fullWidth = false }: CodeFieldProps) {
  const onClickCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    toast({
      title: 'Code kopiert',
      description: 'Der Code wurde in die Zwischenablage kopiert',
    });
  }, [code]);
  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-2 rounded-full border-1 border-neutral-200 p-2 pl-6 pr-4 text-secondary',
        fullWidth && 'w-full',
      )}
    >
      <div className="absolute left-4 top-0 -translate-y-1/2 bg-neutral-100 px-2 text-sm text-secondary/50">
        Dein Code
      </div>
      <span className="grow text-xl">{code}</span>
      <span className="shrink-0">
        <AldiButton
          variant="light"
          isIconOnly={true}
          onClick={onClickCopy}
          size="sm"
        >
          <CopySvg className="pointer-events-auto cursor-pointer text-2xl text-secondary" />
        </AldiButton>
      </span>
    </div>
  );
}
