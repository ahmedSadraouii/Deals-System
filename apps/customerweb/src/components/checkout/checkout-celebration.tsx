import Image from 'next/image';

export default function Celebration() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
      <Image
        src="/img-celebration.png"
        alt="image celebration"
        width={80}
        height={80}
      />
      <h1 className="text-center text-3xl font-bold text-secondary md:text-4xl">
        Vielen Dank für Deinen Einkauf!
      </h1>
      <p className="text-2xl font-semibold text-secondary opacity-50">
        So geht’s weiter:
      </p>
    </div>
  );
}
