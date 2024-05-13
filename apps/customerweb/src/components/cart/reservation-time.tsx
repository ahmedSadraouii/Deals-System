import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';

interface ReservationTimeProps {
  time: string;
}
export function ReservationTime({ time }: ReservationTimeProps) {
  return (
    <Card className="min-w-[80%] bg-green-200">
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
