import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

interface ErrorPageProps {
  title: ReactNode;
  description: ReactNode;
  back?: {
    link: string;
    text: string;
    variant?: ComponentProps<typeof AldiButton>['variant'];
    color?: ComponentProps<typeof AldiButton>['color'];
  };
}

export function ErrorPage({ title, description, back }: ErrorPageProps) {
  return (
    <div className="grow bg-gray-50">
      <div className="mx-auto flex flex-col space-y-4 p-5 lg:items-center lg:justify-center lg:py-32">
        <h1 className="text-5xl">{title}</h1>
        <div>{description}</div>
        {back && (
          <div>
            <AldiButton
              size="lg"
              variant={back.variant || 'ghost'}
              color={back.color || 'default'}
              as={Link}
              href={back.link}
            >
              {back.text}
            </AldiButton>
          </div>
        )}
      </div>
    </div>
  );
}
