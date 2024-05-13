import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { AldiButton } from '@/components/nextui/aldi-button';
import { authOptions } from '@/utils/auth';

export async function EmptyCart() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div>
        <Image
          src="/empty-cart.png"
          alt="empty cart"
          width={120}
          height={120}
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="mb-2 text-4xl font-bold leading-10">
          Dein Warenkorb ist leer!
        </h1>
        {session ? (
          <p>
            Dein Warenkorb ist leer! Durchstöbere jetzt{' '}
            <span className="font-semibold">alle Deals</span> und leg los.
          </p>
        ) : (
          <p>
            Du vermisst deine Deals von einem früheren Besuch? Logge dich ein um
            diese zu sehen!
          </p>
        )}
      </div>
      {session ? (
        <AldiButton size="lg" variant="solid" href="/" color="secondary">
          Deals entdecken
        </AldiButton>
      ) : (
        <div className="flex w-full flex-col gap-4 md:w-max md:flex-row ">
          <AldiButton
            className="w-full"
            size="lg"
            variant="solid"
            href="/auth"
            color="secondary"
          >
            Zum Login
          </AldiButton>
          <AldiButton
            className=" w-full"
            size="lg"
            variant="ghost"
            href="/"
            color="secondary"
          >
            Deals entdecken
          </AldiButton>
        </div>
      )}
    </div>
  );
}
