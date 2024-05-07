import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';

export function ReservationTime() {
  const time = '12:30';
  return (
    <Card className="min-w-96 bg-green-200">
      <CardBody>
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/icons/green-clock.svg"
            alt="clock icon"
            width={30}
            height={30}
          />

          <p className=" text-[#28940D]">
            Reserviert für <span>{time}</span> min
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
