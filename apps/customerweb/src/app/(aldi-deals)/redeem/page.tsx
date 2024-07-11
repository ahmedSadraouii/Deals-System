import { getServerSession } from 'next-auth';
import { RedemptionPinForm } from '@/components/redeem/redemption-pin-form';
import { authOptions } from '@/utils/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full lg:w-[70%] xl:w-[50%]">
      <div className="mb-6">
        <h1 className="text-center text-4xl font-bold text-secondary">
          Kassenbon-PIN eingeben
        </h1>
        <p className="text-center text-secondary opacity-50">
          Gib folgend die 16-stellige PIN auf deinem Kassenbon ein.
        </p>
      </div>
      <RedemptionPinForm isGuest={!session} />
    </div>
  );
}