import Link from 'next/link';
import { AldiButton } from '@/components/nextui/aldi-button';

interface ErrorPageProps {
  title: string;
  description: string;
  back?: {
    link: string;
    text: string;
  };
}

export function ErrorPage({ title, description, back }: ErrorPageProps) {
  return (
    <div className="grow bg-gray-50">
      <div className="mx-auto flex flex-col space-y-4 p-5 lg:items-center lg:justify-center lg:py-32">
        <h1 className="text-5xl">{title}</h1>
        <p>{description}</p>
        {back && (
          <div>
            <AldiButton size="lg" variant="ghost" as={Link} href={back.link}>
              {back.text}
            </AldiButton>
          </div>
        )}
      </div>
    </div>
  );
}
