import Image from 'next/image';

export default function Celebration() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/img-celebration.png"
        alt="image celebration"
        width={85}
        height={85}
      />
      <h1 className="text-center text-4xl font-bold leading-10 text-secondary">
        Vielen Dank für Deinen Einkauf!
      </h1>
      <p className="text-2xl font-semibold leading-10 text-aldi-blue opacity-50">
        So geht’s weiter:
      </p>
    </div>
  );
}
