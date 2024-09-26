import cn from 'classnames';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import Link from 'next/link';

import communityApi from '@/api/CommunityApi';
import { BackedBadge, MetricBadge, SaleType } from '@/app/(mainLayout)/invest/_components';
import { Badge, Button } from '@/lib/components';
import { routes } from '@/routes';

import { data } from './constants';
import type { DealShortInfo } from '../types';
import {} from '../utils';

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
          </div>
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
