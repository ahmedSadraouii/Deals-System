import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';
import { AldiButton } from '@/components/nextui/aldi-button';

interface ExpiredDealsProps {
  description: string;
}
export function ExpiredDeals({ description }: ExpiredDealsProps) {
  return (
    <div>
      <Card className="bg-orange-200">
        <CardBody>
          <div className="flex flex-col items-center gap-2 px-0 md:flex-row md:justify-between md:px-6">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/icons/clock-icon.svg"
                alt="clock icon"
                width={30}
                height={30}
              />

              <p className="text-orange-600">{description}</p>
            </div>
            <div className="w-full md:w-min">
              <AldiButton
                className="w-full"
                size="lg"
                variant="outline"
                href="/"
                color="orange"
              >
                Deals entdecken
              </AldiButton>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
