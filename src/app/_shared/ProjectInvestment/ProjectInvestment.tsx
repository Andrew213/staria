'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { /* useEffect, */ useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { CDN_URL } from '@/env';
import { ProgressSteps } from '@/lib/components';
import { toAmountInUSD } from '@/utils/amount';

import { ConnectWallet, KycCheck, SelectAmountToInvest } from './components';
import { TEXTS, DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME, PROJECT_INVESTMENT_PHASE_NAME_TO_STEPS } from './data';
import type { ActiveStepIndex, LotteryOutcome } from './types';
import { useCountdown } from '../hooks';
import type { Deal } from '../types';

interface Props {
  project: Deal;
}

export default function ProjectInvestment({ project }: Props) {
  const [activeStepIndex, setActiveStepIndex] = useState<ActiveStepIndex>();
  const [investmentIsSuccessful] = useState<boolean>();
  const [lotteryOutcome] = useState<LotteryOutcome>();
  const millisecondsNumberLeftTillClosed = useCountdown(new Date(currentPhase!.endDate).getTime());
  const [amountToInvest, setAmountToInvest] = useState<bigint>();

  return (
    <>
      <h1 className="sr-only">Investment in {project.name}</h1>
      <div className="mx-auto grid max-w-screen-xl px-4 pb-20 pt-8 max-lg:gap-y-9 lg:grid-cols-[62.4177%_1fr] lg:items-start lg:gap-x-16 lg:px-8 lg:pb-30 lg:pt-14">
        <div
          className={twJoin(
            'lg:px-31.5 lg:py-16',
            lotteryOutcome === 'won'
              ? 'bg-cover max-lg:px-4 max-lg:py-11.75'
              : 'lg:light:rounded-10 lg:light:bg-gray-100',
          )}
          style={{
            backgroundImage:
              lotteryOutcome === 'won'
                ? `url(${CDN_URL})/cdn-cgi/image/format=auto/assets/images/blurry-lights.jpg`
                : undefined,
          }}
        >
          <section className="rounded-5 p-8 shadow-depth-4 max-lg:border max-lg:px-3.75 max-lg:light:border-gray-200 lg:light:bg-white dark:border dark:border-gray-blue-500 dark:bg-downriver">
            {/* <SelectAmountToInvest project={project} /> */}
            {activeStepIndex === 0 && <ConnectWallet />}
            {((project.currentPhase === 'lottery' && activeStepIndex === 2) ||
              (project.currentPhase !== 'lottery' && activeStepIndex === 1)) && (
              <SelectAmountToInvest
                project={project}
                mode="input"
                setInvestmentActiveStepIndex={setActiveStepIndex}
                setAmountToInvest={setAmountToInvest}
                amountToInvest={amountToInvest}
              />
            )}

            {((project.currentPhase === 'lottery' && activeStepIndex === 3) ||
              (project.currentPhase !== 'lottery' && activeStepIndex === 2)) && (
              <KycCheck setInvestmentActiveStepIndex={setActiveStepIndex} total={10000} />
            )}

            {((project.currentPhase === 'lottery' && activeStepIndex === 4) ||
              (project.currentPhase !== 'lottery' && activeStepIndex === 3)) &&
              !investmentIsSuccessful && (
                <SelectAmountToInvest
                  project={project}
                  amountToInvest={amountToInvest}
                  mode="confirmation"
                  setInvestmentActiveStepIndex={setActiveStepIndex}
                  setAmountToInvest={setAmountToInvest}
                />
              )}
            {/* 
            
            
            {project.currentPhase === 'lottery' && step === 2 && !lotteryOutcome && <TakeAChance />}
            {(investmentIsSuccessful || lotteryOutcome === 'won') && (
              <Congratulations
                project={project}
                cause={investmentIsSuccessful ? 'successfulInvestment' : 'lotteryWin'}
                setInvestmentStep={setStep}
              />
            )}
            {lotteryOutcome === 'lost' && <OupsNo setLotteryOutcome={setLotteryOutcome} />} */}
          </section>
        </div>
        <section className={twJoin('max-lg:row-start-1 lg:pt-4', investmentIsSuccessful && 'max-lg:hidden')}>
          <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-blue-50">
            {TEXTS.stepperSectionTitle}
          </h2>
          <div className="mb-8 grid grid-cols-[13.3704%_1fr] items-start gap-x-4 rounded-3 border border-gray-200 bg-gray-25 px-4 py-5 dark:border-gray-blue-500 dark:bg-downriver">
            <div className="relative size-12">
              <Image className="object-contain" src={project.logoUrl} alt={`${project.name} logo`} fill sizes="48px" />
            </div>
            <div>
              <p className="mb-1.75 text-display-xs font-semibold text-gray-800 dark:text-gray-blue-25">
                {project.name}
              </p>
              <p className="mb-1.75 text-sm font-semibold text-gray-800 dark:text-gray-blue-25">
                {DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME[project.currentPhase]}
              </p>
              <p className="mb-0.75 font-rubik text-sm text-gray-600 dark:text-gray-blue-100">
                Max Ticket: {toAmountInUSD(currentPhase?.availableAmount ?? 0)}
              </p>
              <p className="font-rubik text-sm text-gray-600 dark:text-gray-blue-100">
                Ends in: {dayjs.duration(millisecondsNumberLeftTillClosed).format('DD[d] HH[h] mm[m] ss[s]')}
              </p>
            </div>
          </div>
          <ProgressSteps
            className="border-t border-t-gray-200 pt-8 dark:border-t-gray-blue-500"
            steps={PROJECT_INVESTMENT_PHASE_NAME_TO_STEPS[project.currentPhase]}
            currentStepIndex={activeStepIndex ?? 1}
            stepTitleClassName="pt-2.25 text-lg"
            completeStepClassName="dark:opacity-100"
            completeStepIconWrapperClassName="dark:border-primary-700"
            completeStepIconClassName="text-primary-500 dark:text-primary-700"
            completeStepConnectorClassName="dark:bg-primary-700"
            completeStepTitleClassName="dark:text-gray-blue-50"
            currentStepIconClassName="light:text-primary-500"
            incompleteStepIconWrapperClassName="dark:border-gray-blue-500 dark:bg-midnight"
            incompleteStepIconClassName="dark:text-gray-blue-300"
            incompleteStepConnectorClassName="dark:bg-gray-blue-500"
            incompleteStepTitleClassName="dark:text-gray-blue-300"
          />
        </section>
      </div>
    </>
  );
  // }
}
