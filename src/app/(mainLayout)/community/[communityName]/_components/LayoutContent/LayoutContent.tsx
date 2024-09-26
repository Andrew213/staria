'use client';

import { useLocalStorageState } from 'ahooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import communityApi from '@/api/CommunityApi';
import { useSetDarkTheme } from '@/app/_shared/hooks';
import { useAppSelector } from '@/redux/hooks';
import { selectUserIsTheMemberOfTheCommunity } from '@/redux/userSlice';

import { AccessCommunityDeals, ConfirmationAccessCompanyDeals, UserAccessError } from './components';

interface Props extends React.PropsWithChildren {
  communityName: string;
  logo: string;
}

export function LayoutContent({ children, communityName, logo }: Props) {
  const [communityRulesAreAccepted] = useLocalStorageState<boolean | undefined>('communityRulesAreAccepted', {
    listenStorageChange: true,
  });
  const [walletIsWhitelisted, setWalletIsWhitelisted] = useState<boolean>();
  const session = useSession();
  const { isConnected, address } = useAccount();
  const userIsTheMemberOfTheCommunity = useAppSelector(selectUserIsTheMemberOfTheCommunity(communityName));
  useSetDarkTheme();

  useEffect(() => {
    async function checkIfConnectedWalletIsWhitelisted() {
      setWalletIsWhitelisted(await communityApi.checkIfTheWalletIsWhitelisted(communityName, address!));
    }

    if (!userIsTheMemberOfTheCommunity && address && session.status !== 'loading') {
      void checkIfConnectedWalletIsWhitelisted();
    }
  }, [communityName, userIsTheMemberOfTheCommunity, address]);

  if (session.status === 'authenticated' && !isConnected && !userIsTheMemberOfTheCommunity) {
    return <AccessCommunityDeals logo={logo} />;
  }

  if ((userIsTheMemberOfTheCommunity || walletIsWhitelisted) && !communityRulesAreAccepted) {
    return <ConfirmationAccessCompanyDeals logo={logo} />;
  }

  if (session.status === 'authenticated' && !userIsTheMemberOfTheCommunity && walletIsWhitelisted === false) {
    return <UserAccessError />;
  }

  if ((userIsTheMemberOfTheCommunity || walletIsWhitelisted) && communityRulesAreAccepted) {
    return children;
  }
}
