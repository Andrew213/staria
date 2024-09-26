import { notFound } from 'next/navigation';

import communityApi from '@/api/CommunityApi';
import {
  ProjectHero,
  StickyFooter,
  SaleDetailsCard,
  InfoSection,
  AboutSliderWrapper,
  ReadMoreSection,
} from '@/app/_shared';
import { capitalizeFirstLetter } from '@/utils/string';

import { STEPS_INDEXES, DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME } from './constants';

export default async function Page({
  params: { communityName, projectName, projectRound },
}: {
  params: { communityName: string; projectName: string; projectRound: string };
}) {
  const community = await communityApi.fetchCommunity(communityName);

  if (!community) {
    notFound();
  }

  const project = await communityApi.fetchDeal(communityName, projectName, projectRound);

  if (!project) {
    notFound();
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
  const phaseData = phases.find((phase) => phase.type === currentPhase);

  return (
    <div className="flex flex-col items-center overflow-hidden lg:overflow-visible">
      <div className="w-full max-w-screen-sm lg:max-w-screen-xl lg:pt-12">
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
              communityName={communityName}
            />
            <div className="lg:hidden">
              <StickyFooter
                active={phaseData?.isActive ? STEPS_INDEXES[currentPhase] : false}
                title={DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME[currentPhase]}
                content={<SaleDetailsCard project={project} />}
              />
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
              <div className="pl-4 pt-4">
                <SaleDetailsCard project={project} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
