'use client';
import dayjs, { extend } from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { useCountdown } from '@/app/_shared/hooks';
import { XCircle, LinkExternal02 } from '@/assets/icons';
import { FeaturedIcon, Button } from '@/lib/components';
import { convertHoursToMilliseconds } from '@/utils';

import { TEXTS, HOURS_NUMBER_BETWEEN_TRIES } from './constants';
import type { LotteryOutcome } from '../../types';

extend(duration);

interface Props {
  setLotteryOutcome: React.Dispatch<React.SetStateAction<LotteryOutcome>>;
}

export function OupsNo({ setLotteryOutcome }: Props) {
  const millisecondsNumberLeftTillTheNextTry = useCountdown(
    Date.now() + convertHoursToMilliseconds(HOURS_NUMBER_BETWEEN_TRIES),
  );
  const countdownIsOver = millisecondsNumberLeftTillTheNextTry === 0;

  return (
    <>
      <div className="mb-8 lg:text-center">
        <FeaturedIcon className="mb-2" theme="light-circle-outline" color="error" size="lg" Icon={XCircle} />
        <h2 className="mb-3 text-display-sm font-semibold text-gray-900">{TEXTS.title}</h2>
        <p className="font-rubik text-sm text-gray-600">{TEXTS.description}</p>
      </div>
      <p className="mb-4 rounded-3 border border-gray-200 p-3.75 text-center text-xl font-semibold text-gray-600">
        {dayjs.duration(millisecondsNumberLeftTillTheNextTry).format('HH[h] mm[m] ss[s]')}
      </p>
      <div className="mb-8 space-y-2 rounded-3 border border-gray-200 p-3.75">
        <div className="flex justify-between gap-x-1">
          <p className="font-medium text-gray-600 max-lg:text-xs lg:text-sm">{TEXTS.winners}</p>
          <p className="font-medium text-gray-600 max-lg:text-xs lg:text-[14px]/[24px]">1232</p>
        </div>
        <div className="flex justify-between gap-x-1">
          <p className="font-medium text-gray-600 max-lg:text-xs lg:text-sm">{TEXTS.chance}</p>
          <p className="font-medium text-gray-600 max-lg:text-xs lg:text-[14px]/[24px]">10%</p>
        </div>
        <div className="flex justify-between gap-x-1">
          <p className="font-medium text-gray-600 max-lg:text-xs lg:text-sm">{TEXTS.verification}</p>
          <a
            className="flex items-center font-medium text-gray-600 max-lg:gap-x-1 max-lg:text-xs lg:gap-x-2 lg:text-[14px]/[24px]"
            href="/mock"
            target="_blank"
            rel="noreferrer"
          >
            {TEXTS.verificationLink} <LinkExternal02 className="size-4 text-gray-600" />
          </a>
        </div>
      </div>
      <Button
        className="w-full"
        color="primary"
        size="lg"
        content={countdownIsOver ? TEXTS.enabledButton : TEXTS.disabledButton}
        type="button"
        disabled={!countdownIsOver}
        onClick={() => {
          setLotteryOutcome(undefined);
        }}
      />
    </>
  );
}
