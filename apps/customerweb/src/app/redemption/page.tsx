import { RedemptionPinForm } from '@/components/redemption/redemption-pin-form';

export default function Page() {
  return (
    <div className="w-full lg:w-[70%] xl:w-[50%]">
      <div className="mb-6">
        <h1 className="text-center text-4xl font-bold text-secondary">
          Kassenbon-PIN eingeben
        </h1>
        <p className="text-center text-aldi-blue opacity-50">
          Gib folgend die 16-stellige PIN auf deinem Kassenbon ein.
        </p>
      </div>
      <RedemptionPinForm />
    </div>
  );
}
