import cn from 'classnames';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import Link from 'next/link';

import communityApi from '@/api/CommunityApi';
import { BackedBadge, MetricBadge, SaleType } from '@/app/(mainLayout)/invest/_components';
import { Badge, Button } from '@/lib/components';
import { routes } from '@/routes';
import { isNumber } from '@/types/common';
import { calculatePercentageOneNumberIsOfAnother } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/string';

import { data } from './constants';
import type { DealShortInfo } from '../types';
import { getDealCurrentPhaseData } from '../utils';

dayjs.extend(duration);

interface Props {
  project: DealShortInfo;
  communityName?: string;
  variant?: 'horizontal' | 'vertical';
  badge?: string;
}

export async function ProductCard({ project, communityName, variant = 'horizontal', badge }: Props) {
  const community = communityName ? await communityApi.fetchCommunity(communityName) : undefined;
  const { slug, logoUrl, name, excerpt, type, totalAllocation, currentPhase, bannerUrl, badges } = project;
  const currentPhaseData = getDealCurrentPhaseData(project);
  const endDate = currentPhaseData?.endDate;
  const startDate = currentPhaseData?.startDate;
  const isActive = currentPhaseData?.isActive;
  const isUpcoming = startDate && Date.now() < new Date(startDate).getTime();

  return (
    <Link
      className="block lg:h-full"
      href={
        communityName
          ? routes.community.communityName.research.projectName.projectRound.getRedirectPath({
              communityName,
              projectName: slug,
              projectRound: type,
            })
          : routes.research.projectName.projectRound.getRedirectPath({ projectName: slug, projectRound: type })
      }
    >
      <div
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-6 border-gray-200 bg-downriver shadow-home-hero transition duration-300 hover:scale-105 lg:h-full lg:rounded-8 lg:border dark:border-gray-blue-500',
          { 'lg:grid lg:grid-cols-2 lg:p-4': variant === 'horizontal' },
        )}
      >
        {badge && (
          <div className="absolute right-4 top-6 lg:right-6">
            <Badge content={badge} size="md" color="gray" />
          </div>
        )}
        <div
          className={cn('mt-[-50px] flex flex-col items-start gap-4 p-4 pb-8 lg:gap-6 lg:p-6 lg:pr-4', {
            'lg:mt-0': variant === 'horizontal',
            'lg:mt-[-75px] lg:px-10 lg:pb-10': variant === 'vertical',
          })}
        >
          <div
            className={cn('flex flex-col items-start gap-4', {
              'lg:gap-6': variant === 'vertical',
            })}
          >
            <div
              className={cn('flex flex-col gap-4', {
                'lg:flex-row lg:items-center': variant === 'horizontal',
              })}
            >
              <Image src={logoUrl} alt={name} width={80} height={80} />
              <p className="text-display-md font-semibold tracking-tight text-white">{name}</p>
            </div>
            <div
              className={
                communityName ? 'flex max-lg:flex-col-reverse max-lg:items-start max-lg:gap-y-2 lg:gap-x-4' : undefined
              }
            >
              <SaleType saleType={type} rootBg="dark" />
              {communityName && (
                <div className="flex gap-x-0.75 rounded-1.5 border border-gray-blue-300 bg-blue-zodiac px-1.75 py-0.75 text-md font-semibold text-white">
                  Powered by:
                  <div className="relative h-6 w-[63.6px]">
                    {community && (
                      <Image className="object-contain" src={community.logoUrl} alt={`${community.name}'s logo`} fill />
                    )}
                  </div>
                </div>
              )}
            </div>
            <p className="font-rubik text-md text-gray-200 dark:text-gray-blue-200">{excerpt}</p>
          </div>
          <div className="flex flex-col gap-2 self-stretch lg:gap-4 xl:flex-row xl:flex-wrap">
            <MetricBadge
              title={data.totalAllocation}
              content={
                totalAllocation === 0
                  ? data.startsInText
                  : Number(project.totalAllocation).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                    })
              }
            />
            {isActive ? (
              <>
                {!startDate && !endDate && <MetricBadge title={data.startsIn} content={data.startsInText} />}
                {isUpcoming && <MetricBadge title={data.startsIn} content={<Timer date={startDate} />} />}
                {!isUpcoming && endDate && <MetricBadge title={data.endsIn} content={<Timer date={endDate} />} />}
              </>
            ) : (
              <MetricBadge title={data.startsIn} content={data.startsInText} />
            )}
            {isActive && (
              <div className="w-full">
                <MetricBadge
                  title={data.openNow}
                  content={`${capitalizeFirstLetter(currentPhase)} Allocation`}
                  bottomContent={
                    <div className="mt-2 flex flex-col gap-1 font-rubik text-sm text-white">
                      <ul className="space-y-1">
                        <li>Max. Ticket size: ${currentPhaseData?.maxAmount}</li>
                        <li>Allocation Available: ${currentPhaseData?.availableAmount}</li>
                        {endDate && (
                          <li>
                            Pool ends in: <Timer date={endDate} />
                          </li>
                        )}
                      </ul>
                      {isNumber(currentPhaseData?.maxAmount) && (
                        <div className="grid grid-cols-[74.6861%_1fr] items-center justify-between gap-x-1">
                          <div className="relative h-2 rounded bg-gray-blue-200">
                            <div
                              className={cn(
                                'h-2 max-w-full rounded',
                                currentPhaseData.availableAmount < currentPhaseData.maxAmount / 2
                                  ? 'bg-success-500'
                                  : currentPhaseData.availableAmount >= currentPhaseData.maxAmount
                                    ? 'bg-error-500'
                                    : 'bg-warning-500',
                              )}
                              style={{
                                width: `${calculatePercentageOneNumberIsOfAnother(
                                  currentPhaseData.availableAmount,
                                  currentPhaseData.maxAmount,
                                )}%`,
                              }}
                            />
                          </div>
                          <p>Raised: ${currentPhaseData.availableAmount}</p>
                        </div>
                      )}
                    </div>
                  }
                />
              </div>
            )}
          </div>
          {isActive ? (
            <Button size="xl" color="secondary" content={data.buttonText} />
          ) : (
            <Button size="xl" color="secondary" content={'Coming Soon'} />
          )}
        </div>
        <div
          className={cn(
            '-order-1 flex min-h-[189px] flex-col items-end justify-end bg-cover bg-center bg-no-repeat p-4',
            {
              'lg:order-1 lg:rounded-4 lg:p-2': variant === 'horizontal',
              'lg:min-h-[259px]': variant === 'vertical',
            },
          )}
          style={{
            backgroundImage: `url("${bannerUrl}")`,
          }}
        >
          {badges.length ? (
            <div
              className={cn('translate-y-[68%]', {
                'lg:translate-y-0': variant === 'horizontal',
              })}
            >
              <BackedBadge
                title={data.backedBy}
                items={badges
                  .slice(0, 2)
                  .filter((badge) => badge.type === 'backed')
                  .map((badge) => ({
                    iconUrl: badge.iconUrl,
                    name: badge.name,
                    url: badge.url,
                  }))}
                variant={variant === 'horizontal' ? 'medium' : 'small'}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

interface TimerProps {
  date: string;
}

function Timer({ date }: TimerProps) {
  const now = dayjs();
  const targetDate = dayjs(date);
  const duration = dayjs.duration(targetDate.diff(now));
  return <>{duration.format('D[d] H[h] m[m] s[s]')}</>;
}
