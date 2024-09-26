import { notFound } from 'next/navigation';

import CommunityApi from '@/api/CommunityApi';

import { Community } from '../../_components/Community/Community';

interface RouteParams {
  params: { communityName: string };
}

export interface FileData {
  preview?: string;
  name: string;
  size: number;
  field: 'logoUrl' | 'iconUrl';
}

const getImageNameAndSizeFromUrl = async (url: string, field: 'logoUrl' | 'iconUrl'): Promise<FileData> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const name = url.split('/').at(-1)!;
  return { name: name, size: blob.size, preview: `${url}?${new Date().getTime()}`, field };
};

export default async function Page({ params }: RouteParams) {
  const community = await CommunityApi.fetchCommunity(params.communityName);
  if (!community) {
    notFound();
  }
  let logo;
  if (community.logoUrl) {
    logo = await getImageNameAndSizeFromUrl(community.logoUrl, 'logoUrl');
  }

  let icon;
  if (community.iconUrl) {
    icon = await getImageNameAndSizeFromUrl(community.iconUrl, 'iconUrl');
  }

  return <Community logo={logo} icon={icon} community={community} />;
}
