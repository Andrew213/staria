'use client';

import cn from 'classnames';
import dayjs, { extend } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { SaleType } from '@/app/(mainLayout)/invest/_components';
import { stepsNames } from '@/app/(mainLayout)/research/[projectName]/[projectRound]/constants';
import { Button } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveSubscription } from '@/redux/userSlice';

import { UpgradePlanModal } from './components';
import { data, comingSoonData } from './constants';
import { useMode } from '../hooks';
import type { Deal, DealInvestmentPhase } from '../types';
import { getDealCurrentPhaseData } from '../utils';

extend(duration);

interface Props {
  project: Deal;
}

export function SaleDetailsCard({ project }: Props) {
  const [upgradePlanModalIsOpen, setUpgradePlanModalIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const userActivePlan = useAppSelector(selectActiveSubscription);
  const { currentPhase, type, phases, totalAllocation } = project;
  const active = !!currentPhase;
  const currentPhaseData = getDealCurrentPhaseData(project);
  const endDate = currentPhaseData?.endDate;
  const startDate = phases.length && phases[0].startDate;
  const isActive = currentPhaseData?.isActive;
  const mode = useMode();

  function handleButtonClick() {
    if (
      (currentPhase === 'guaranteed' && userActivePlan !== 'genesis-plus') ||
      (currentPhase === 'fcfs' && userActivePlan === 'basic')
    ) {
      setUpgradePlanModalIsOpen(true);
    } else {
      router.push(`${pathname}/investment`);
    }
  }

  return (
    <>
      <div className="flex flex-col items-stretch gap-4 rounded-6 border border-gray-300 bg-white px-4 py-5 shadow-home-hero dark:border-gray-blue-500 dark:bg-midnight [&>button:disabled]:text-gray-400">
        <div className="self-start">
          <SaleType rootBg={mode} saleType={type} />
        </div>
        {!active ||
          (!isActive && (
            <>
              <Metric
                title={data.totalSalesAllocations}
                content={
                  totalAllocation ? (
                    <>
                      <span className="font-rubik text-xs text-gray-800">$</span>
                      {totalAllocation.toLocaleString('en-US')}
                    </>
                  ) : (
                    comingSoonData.totalSalesAllocations
                  )
                }
                contentClassName="flex items-center gap-x-0.5"
              />
              <>
                {!isActive ? (
                  <Metric title={data.salesStartsIn} content={comingSoonData.salesStartsIn} />
                ) : (
                  <Metric
                    title={data.salesStartsIn}
                    content={startDate ? <Timer date={startDate} /> : comingSoonData.salesStartsIn}
                  />
                )}
              </>
            </>
          ))}
        {active ||
          (isActive && (
            <div className="flex flex-col gap-2">
              {phases.length && <Stepper active={currentPhase} stepsData={phases} />}
              {endDate && (
                <Metric
                  title={`${stepsNames[currentPhase as keyof typeof stepsNames]} ${data.endsIn}:`}
                  content={<Timer date={endDate} />}
                />
              )}
            </div>
          ))}
        <Button
          color="secondary"
          size="xl"
          content={isActive ? data.buttonText : data.disabledButtonText}
          disabled={session.status !== 'authenticated' || !isActive}
          onClick={handleButtonClick}
        />
      </div>
      {upgradePlanModalIsOpen && (
        <UpgradePlanModal
          projectPhase={currentPhase}
          onClose={() => {
            setUpgradePlanModalIsOpen(false);
          }}
        />
      )}
    </>
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

interface MetricProps {
  title: string;
  content: React.ReactNode;
  contentClassName?: string;
}

function Metric({ title, content, contentClassName }: MetricProps) {
  return (
    <div className="flex flex-col gap-1 rounded-3 border border-gray-200 bg-gray-25 px-4 py-5 dark:border-gray-blue-500 dark:bg-downriver">
      <p className="font-rubik text-sm text-gray-600 dark:text-gray-blue-25">{title}</p>
      <p className={cn(contentClassName, 'text-display-xs font-semibold text-gray-800 dark:text-gray-blue-25')}>
        {content}
      </p>
    </div>
  );
}

interface StepperProps {
  active: string;
  stepsData: DealInvestmentPhase[];
}

function Stepper({ active, stepsData }: StepperProps) {
  return (
    <div className="rounded-3 border border-gray-200 bg-gray-25 px-4 pt-5">
      {stepsData.map((step, index) => (
        <StepperStep
          key={index}
          index={index + 1}
          title={stepsNames[step.type as keyof typeof stepsNames]}
          // TODO uncomment it i v2
          // progress={step.progress}
          // maxTicketSize={step.maxTicketSize}
          allocationAvailable={step.availableAmount}
          // raised={step.raised}
          isActive={active === step.type}
        />
      ))}
    </div>
  );
}

interface StepperStepProps {
  index: number;
  title: string;
  maxTicketSize?: number;
  allocationAvailable?: number;
  progress?: number;
  raised?: number;
  isActive?: boolean;
}

function StepperStep({
  isActive,
  progress,
  index,
  title,
  maxTicketSize,
  allocationAvailable,
  raised,
}: StepperStepProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center gap-1 pb-1">
        <div
          className={cn('flex size-8 items-center justify-center rounded-full border text-sm font-bold', {
            'color-white border-primary-200 bg-primary-500 text-white': isActive,
            'color-gray-600 border-gray-300': !isActive,
          })}
        >
          {index}.
        </div>
        {index !== 3 && (
          <div
            className={cn('w-0.5 grow', {
              'bg-primary-500': isActive,
              'bg-gray-300': !isActive,
            })}
          ></div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 pb-6 pt-1">
        <p
          className={cn('font-semibold', {
            'text-lg text-gray-800': isActive,
            'text-sm text-gray-600': !isActive,
          })}
        >
          {title}
        </p>

        {isActive && maxTicketSize && (
          <p className="font-rubik text-md text-gray-800">
            {data.maxTicketSize}: ${maxTicketSize.toLocaleString('en-US')}
          </p>
        )}

        {allocationAvailable && (
          <p
            className={cn('font-rubik', {
              'text-md text-gray-800': isActive,
              'text-sm text-gray-600': !isActive,
            })}
          >
            {data.allocationAvailable}: ${allocationAvailable.toLocaleString('en-US')}
          </p>
        )}

        {isActive && raised && (
          <div className="flex items-center gap-3">
            <div className="relative h-2 grow rounded-2 bg-gray-200">
              <div
                className={cn('absolute left-0 top-0 h-2 rounded', {
                  'bg-warning-400': index === 1,
                  'bg-primary-500': index === 2,
                  'bg-cerulean': index === 3,
                })}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-rubik text-sm text-gray-800">
              {data.raised}: ${raised.toLocaleString('en-US')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
