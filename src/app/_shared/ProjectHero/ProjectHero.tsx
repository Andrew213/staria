import cn from 'classnames';
import Image from 'next/image';

import communityApi from '@/api/CommunityApi';
import {
  StarIcon,
  DiscordIcon,
  FacebookIcon,
  GlobeIcon,
  LinkedInIcon,
  TelegramIcon,
  XIcon,
  GithubIcon,
  TikTokIcon,
  MediumIcon,
} from '@/assets/icons';
import { Badge, Button } from '@/lib/components';

import { data } from './constants';
import type { DealBadge } from '../types';

const ratings = [1, 2, 3, 4, 5] as const;

interface Props {
  logo: string;
  name: string;
  tokenName: string;
  category: string | undefined;
  links: { type: string; url: string }[];
  rating: string;
  seenOn: DealBadge[];
  backedBy: DealBadge[];
  communityName?: string;
}

const linksMap = {
  website: <GlobeIcon />,
  x: <XIcon />,
  linkedin: <LinkedInIcon />,
  facebook: <FacebookIcon />,
  discord: <DiscordIcon />,
  telegram: <TelegramIcon />,
  tiktok: <TikTokIcon />,
  medium: <MediumIcon />, // TODO ask icon
  github: <GithubIcon />,
};

export async function ProjectHero({
  seenOn,
  backedBy,
  logo,
  name,
  tokenName,
  category,
  links,
  rating,
  communityName,
}: Props) {
  const community = communityName ? await communityApi.fetchCommunity(communityName) : undefined;
  const isSeenOnVisible = !!seenOn.length;
  const renderRating = () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-600 lg:hidden dark:text-gray-blue-100">
        {data.dueDiligenceScoreMobile}
      </p>
      <p className="hidden text-sm font-medium text-gray-600 lg:block dark:text-gray-blue-100">
        {data.dueDiligenceScore}
      </p>
      <div className="flex gap-5 lg:gap-3">
        <div className="flex items-center gap-3 lg:gap-1">
          <div className="flex gap-0.5">
            {ratings.map((x, index) => (
              <div
                key={index}
                className={cn('size-5 p-px', {
                  'text-[#fac515]': x <= Number(rating),
                  'text-gray-200': x > Number(rating),
                })}
              >
                <StarIcon />
              </div>
            ))}
          </div>
          <p className="text-md font-semibold text-gray-800 dark:text-gray-blue-25">
            {rating}/{ratings.length}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 pb-6 lg:pb-0">
      <div className="flex gap-4 lg:gap-6">
        <div className="relative size-20 lg:size-[88px]">
          <Image className="object-cover" src={logo} alt={name} fill />
        </div>
        <div className="flex flex-col items-start gap-1">
          <h1 className="mb-1 mt-2 text-display-sm font-semibold text-gray-900 lg:my-0 lg:text-display-lg lg:tracking-tight dark:text-white">
            {name} <span className="text-display-sm">({tokenName})</span>
          </h1>
          <Badge size="lg" content={category} color="light-gray" />
        </div>
      </div>
      <div className="flex flex-col gap-8 pl-1 lg:flex-row lg:gap-8 lg:pl-0">
        <div className="flex flex-col gap-2 lg:min-w-[286px]">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-blue-100">{data.links}</p>
          <div className="flex gap-4">
            {links.map(({ url, type }, index) => (
              <a
                className="block size-6 text-gray-800 dark:text-gray-blue-100"
                key={index}
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                {linksMap[type as keyof typeof linksMap]}
              </a>
            ))}
          </div>
        </div>
        {isSeenOnVisible && renderRating()}
      </div>
      <div className={cn('flex gap-8 lg:pl-0', { 'flex-col-reverse lg:flex-row': !isSeenOnVisible })}>
        {isSeenOnVisible && (
          <div className="flex flex-col gap-1 lg:min-w-[286px]">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-blue-100">{data.seenOn}:</p>
            <div className="flex gap-2">
              {seenOn.map(({ iconUrl, url, id }) => (
                <Button
                  className="dark:!border dark:border-gray-blue-500 dark:!bg-downriver"
                  key={id}
                  href={url}
                  blank
                  icon={
                    <div className="flex size-5 shrink-0 items-center justify-center text-gray-700">
                      <div className="size-5 text-gray-800">
                        <Image src={iconUrl} alt={url} width={24} height={24} />
                      </div>
                    </div>
                  }
                  size="md-square"
                  color="secondary-gray"
                />
              ))}
            </div>
          </div>
        )}
        <div>
          {!!backedBy.length && (
            <div className={cn('flex flex-col gap-1', { 'lg:min-w-[286px]': !seenOn.length })}>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-blue-100">{data.backedBy}:</p>
              <div className="flex gap-2">
                {backedBy.map(({ iconUrl, url, id }) => (
                  <Button
                    className="dark:!border dark:border-gray-blue-500 dark:!bg-downriver"
                    key={id}
                    href={url}
                    icon={
                      <div className="flex size-5 shrink-0 items-center justify-center text-gray-700">
                        <div className="size-5 text-gray-800">
                          <Image src={iconUrl} alt={url} width={24} height={24} />
                        </div>
                      </div>
                    }
                    size="md-square"
                    color="secondary-gray"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {!isSeenOnVisible && renderRating()}
      </div>
      {communityName && (
        <div>
          <p className="text-gray-blue-100">Powered by:</p>
          <div className="relative h-10 w-26.5">
            {community && (
              <Image className="object-contain" src={community.logoUrl} alt={`${community.name}'s logo`} fill />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
