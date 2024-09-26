import { notFound } from 'next/navigation';

import communityApi from '@/api/CommunityApi';

import { LayoutContent } from './_components';

interface Props {
  children: React.ReactNode;
  params: {
    communityName: string;
  };
}

export default async function Layout({ children, params: { communityName } }: Props) {
  const community = await communityApi.fetchCommunity(communityName);

  if (!community) {
    notFound();
  }

  return (
    <LayoutContent logo={community.iconUrl} communityName={communityName}>
      {children}
    </LayoutContent>
  );
}
