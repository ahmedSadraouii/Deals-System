import CardActivation from '@/components/redemption/redemption-activate-card';

export default function Page() {
  return (
    <div className="w-full lg:w-[70%] xl:w-[50%]">
      <div className="mb-6">
        <h1 className="text-center text-4xl font-bold text-secondary">
          Deal aktivieren
        </h1>
      </div>
      <CardActivation />
    </div>
  );
}
