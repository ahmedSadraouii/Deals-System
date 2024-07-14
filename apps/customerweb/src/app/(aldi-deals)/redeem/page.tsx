import { getServerSession } from 'next-auth';
import { RedeemPage } from '@/components/redeem/redeemPage';
import { authOptions } from '@/utils/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <RedeemPage isGuest={!session} />;
}
