import { notFound } from 'next/navigation';

import communityApi from '@/api/CommunityApi';
import { ProjectsHero, ProductCard, StepsSliderWrapper, UpcomingOpportunities } from '@/app/_shared';

export default async function Page({ params: { communityName } }: { params: { communityName: string } }) {
  const community = await communityApi.fetchCommunity(communityName);

  if (!community) {
    notFound();
  }

  const { data: deals } = await communityApi.fetchDeals(communityName);
  const featuredDeal = deals?.find(({ isFeatured }) => isFeatured);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <ProjectsHero communityName={communityName} />
      {featuredDeal && (
        <div className="w-full max-w-screen-sm px-4 lg:max-w-screen-xl lg:px-8">
          <div className="mb-8 mt-[-300px] lg:mt-[-380px]">
            <ProductCard project={featuredDeal} communityName={communityName} />
          </div>
        </div>
      )}
      <div className="w-full max-w-screen-sm lg:max-w-screen-xl">
        <StepsSliderWrapper />
        <UpcomingOpportunities
          className="px-4 py-16 lg:px-8 lg:pb-28 lg:pt-24"
          titleClassName="max-w-[833px]"
          subtitleClassName="max-w-[833px]"
          communityName={communityName}
        />
      </div>
    </div>
  );
}
