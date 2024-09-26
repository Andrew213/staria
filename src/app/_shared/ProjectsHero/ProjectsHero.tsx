import Image from 'next/image';

import communityApi from '@/api/CommunityApi';

import { TEXTS } from './data';

interface Props {
  communityName?: string;
}

export async function ProjectsHero({ communityName }: Props) {
  const community = communityName ? await communityApi.fetchCommunity(communityName) : undefined;

  return (
    <div className="self-stretch bg-[linear-gradient(0deg,rgba(20,20,64,0.60)_0%,rgba(20,20,64,0.60)_100%),url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/launchpad-bg.jpeg)] bg-cover bg-center bg-no-repeat px-8 pb-97.5 pt-14 lg:pb-111">
      {communityName && (
        <div className="relative mx-auto mb-8 h-12 w-34 lg:h-18 lg:w-51">
          {community && (
            <Image
              className="object-contain"
              src={`${community.logoUrl}?${new Date().getTime()}`}
              alt={`${community.name}'s logo`}
              fill
            />
          )}
        </div>
      )}
      <h1 className="mb-4 text-display-lg font-semibold tracking-tight text-white lg:mx-auto lg:mb-6 lg:max-w-screen-lg lg:text-center lg:text-display-xl">
        {community ? `Access the Best ${community.name} Deals` : TEXTS.title}
      </h1>
      <p className="font-rubik text-lg text-gray-100 lg:mx-auto lg:max-w-screen-md lg:text-center lg:text-xl dark:text-gray-blue-100">
        {TEXTS.description}
      </p>
    </div>
  );
}
