import cn from 'classnames';

import type { Deal } from '@/app/_shared/types';
import { CheckCircleIcon, LinkExternal02 } from '@/assets/icons';
import { FeaturedIcon, Button } from '@/lib/components';
import { routes } from '@/routes';
import { toFormattedAmount } from '@/utils/amount';

import { data } from './constants';
import type { ActiveStepIndex as InvestmentActiveStepIndex } from '../../types';

interface Props {
  project: Deal;
  cause: 'successfulInvestment' | 'lotteryWin';
  wonTicketAmount?: number;
  setInvestmentActiveStepIndex: React.Dispatch<React.SetStateAction<InvestmentActiveStepIndex>>;
}

export function Congratulations({ project, cause, wonTicketAmount = 500, setInvestmentActiveStepIndex }: Props) {
  return (
    <>
      <div
        className={cn('max-lg:mb-6 lg:mb-8 lg:px-4 lg:text-center', {
          'lg:border-b lg:border-b-gray-200 lg:pb-5 lg:dark:border-b-gray-blue-500': cause === 'successfulInvestment',
        })}
      >
        <FeaturedIcon className="mb-2" theme="light-circle-outline" color="success" size="lg" Icon={CheckCircleIcon} />
        <h2 className="mb-3 font-semibold text-gray-900 max-lg:text-display-xs lg:text-display-sm dark:text-white">
          {data.title}
        </h2>
        <p className="font-rubik text-sm text-gray-600 dark:text-gray-blue-100">
          {cause === 'successfulInvestment'
            ? `You have successfully participate in ${project.name} ${project.currentPhase} sales`
            : `You are part of our lucky Winners. You won a ${toFormattedAmount(wonTicketAmount)} USDC Allocation`}
        </p>
      </div>
      {cause === 'successfulInvestment' ? (
        <div className="flex w-full flex-col items-center gap-6 rounded-3 border border-gray-200 bg-gray-50 p-4 dark:border-gray-blue-500 dark:bg-downriver">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-blue-100">{data.socialText}</p>
          <div className="flex items-center gap-6">
            {data.socials.map(({ icon: Icon, link }) => (
              <a key={link} href={link} target="_blank" rel="noreferrer">
                <Icon className="size-6 text-gray-800 dark:text-gray-25" />
              </a>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between gap-x-2 rounded-3 border border-gray-200 p-3.75">
            <p className="font-semibold text-gray-600 max-lg:text-sm lg:text-xl">{data.winningTicket}</p>
            <p className="font-semibold text-gray-600 max-lg:text-sm lg:text-xl">
              {toFormattedAmount(wonTicketAmount)} USDC
            </p>
          </div>
          <div className="flex justify-between gap-x-2 rounded-3 border border-gray-200 py-3.75 pl-3.75 max-lg:bg-gray-50 max-lg:pr-1.25 lg:pr-3.75">
            <p className="font-medium text-gray-600 max-lg:text-xs lg:text-sm">{data.verification}</p>
            <a
              className="flex items-center font-medium text-gray-600 max-lg:gap-x-1 max-lg:text-xs lg:gap-x-2 lg:text-[14px]/[24px]"
              href="https://etherscan.io"
              target="_blank"
              rel="noreferrer"
            >
              {data.verificationLink} <LinkExternal02 className="size-4 shrink-0" />
            </a>
          </div>
        </>
      )}
      <Button
        className="w-full max-lg:mt-6 lg:mt-8"
        color="primary"
        size="md"
        content={cause === 'successfulInvestment' ? data.successfulInvestmentButton : data.lotteryWinButton}
        href={
          cause === 'successfulInvestment'
            ? routes.research.projectName.projectRound.getRedirectPath({
                projectName: project.slug,
                projectRound: project.type,
              })
            : undefined
        }
        onClick={
          cause === 'successfulInvestment'
            ? undefined
            : () => {
                setInvestmentActiveStepIndex(3);
              }
        }
      />
    </>
  );
}
