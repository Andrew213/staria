import dealsApi from '@/api/DealsApi';
import {
  AboutSliderWrapper,
  EarlyBirdCard,
  InfoSection,
  ProjectHero,
  ReadMoreSection,
  SaleDetailsCard,
  StickyFooter,
} from '@/app/_shared';
import { routes } from '@/routes';
import { toAmountIn$orString } from '@/utils/amount';
import { capitalizeFirstLetter } from '@/utils/string';

import { TimeLine } from './_components';
import { stepsNames } from './constants';

interface RouteParams {
  params: {
    projectName: string;
    projectRound: string;
  };
}

export async function generateMetadata({ params }: RouteParams) {
  const project = await dealsApi.fetchDeal(params.projectName, params.projectRound);

  if (!project) {
    return {};
  }

  const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${routes.research.getRoutePath()}/${params.projectName}/${params.projectRound}`;

  if (project.type === 'public') {
    return {
      title: `${project.name} - ${project.ticker} Public Sale (IDO) & Tokenomics`,
      description: `Participate in the ${project.ticker} Public Sale (IDO) on Staria ➤ Token Price: ${toAmountIn$orString(project.tokenPrice)} ✓ Platform Raise: ${toAmountIn$orString(project.platformRaise)} ✓ Initial Market Cap: ${toAmountIn$orString(project.marketCap)} ✓ FDV: ${toAmountIn$orString(project.dilutedValuation)} ✓ Listing: ${project.listingDate}`,
    };
  }

  return {
    title: `${project.name} - ${project.ticker} ${capitalizeFirstLetter(project.type)} Round & Tokenomics`,
    description: `Participate in the ${project.ticker} ${capitalizeFirstLetter(project.type)} Round on Staria ➤ Token Price: ${toAmountIn$orString(project.tokenPrice)} ✓ Platform Raise: ${toAmountIn$orString(project.platformRaise)} ✓ Initial Market Cap: ${toAmountIn$orString(project.marketCap)} ✓ FDV: ${toAmountIn$orString(project.dilutedValuation)} ✓ Listing: ${project.listingDate}`,
    openGraph: {
      url,
      images: [
        {
          url: 'https://cdn.staria.network/assets/metadata_social.jpg',
        },
      ],
      title: `${project.name} - ${project.ticker} Public Sale (IDO) & Tokenomics`,
      description: `Participate in the ${project.ticker} Public Sale (IDO) on Staria ➤ Token Price: ${toAmountIn$orString(project.tokenPrice)} ✓ Platform Raise: ${toAmountIn$orString(project.platformRaise)} ✓ Initial Market Cap: ${toAmountIn$orString(project.marketCap)} ✓ FDV: ${toAmountIn$orString(project.dilutedValuation)} ✓ Listing: ${project.listingDate}`,
      locale: 'en_US',
      type: 'website',
    },
  };
}

const stepsIndexes = {
  guaranteed: 1,
  fcfs: 2,
  lottery: 3,
};

export default async function Page({ params }: RouteParams) {
  const project = await dealsApi.fetchDeal(params.projectName, params.projectRound);

  if (!project) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-screen-sm lg:max-w-screen-xl lg:py-12">Something went wrong</div>
      </div>
    );
  }

  const {
    name,
    logoUrl,
    ticker,
    phases,
    socials,
    score,
    badges,
    aboutText,
    mediaText,
    gallery,
    videoUrl,
    mainText,
    members,
    currentPhase,
  } = project;
  const projectCategory = capitalizeFirstLetter(project.categories[0]);
  const seenOn = badges.filter((badge) => badge.type === 'seen');
  const backedBy = badges.filter((badge) => badge.type === 'backed');

  return (
    <div className="flex flex-col items-center overflow-hidden lg:overflow-visible">
      <div className="w-full max-w-screen-sm lg:max-w-screen-xl lg:pt-12">
        <TimeLine phases={phases} currentPhase={currentPhase} activeStep={stepsIndexes[currentPhase]} />
        <div className="flex w-full max-w-screen-sm gap-8 lg:max-w-screen-xl lg:pt-4">
          <div className="w-full px-4 lg:max-w-[855px] lg:px-8">
            <ProjectHero
              name={name}
              logo={logoUrl}
              tokenName={ticker}
              category={projectCategory}
              links={socials}
              rating={score}
              seenOn={seenOn}
              backedBy={backedBy}
            />
            <div className="lg:hidden">
              <StickyFooter title={stepsNames[currentPhase]} content={<SaleDetailsCard project={project} />} />
            </div>
            <InfoSection project={project} />
            <AboutSliderWrapper
              name={name}
              tokenName={ticker}
              description={aboutText}
              mediaText={mediaText}
              gallery={gallery}
              videoUrl={videoUrl}
            />
            <ReadMoreSection ticker={ticker} text={mainText} members={members} name={name} />
          </div>
          <div className="hidden w-full max-w-[360px] lg:block">
            <div className="sticky top-20">
              <div className="pb-12 pl-4 pt-4">
                <SaleDetailsCard project={project} />
              </div>
              <div className="-mr-4 border border-gray-200"></div>
            </div>
          </div>
        </div>
        <EarlyBirdCard />
      </div>
    </div>
  );
}
