import { useState } from 'react';

import { LoadingCircle01 } from '@/assets/icons';
import { Button } from '@/lib/components';
import { toFormattedAmount } from '@/utils/amount';

import { data } from './constants';

const mockedWinning = 500;
const mockedTicket = 1232;
const mockedProcents = 20;

export function TakeAChance() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-8 text-center">
      <h2 className="text-display-sm font-semibold text-gray-900">{data.title}</h2>
      <div>
        <div className="mb-4 flex justify-between rounded-3 border border-gray-200 p-4 text-md font-semibold text-gray-600 lg:text-xl">
          <p>{data.firstText}</p>
          <p>{toFormattedAmount(mockedWinning)} USDC</p>
        </div>
        <div className="flex flex-col gap-3 rounded-3 border border-gray-200 bg-gray-50 p-4 text-xs font-medium text-gray-600 lg:text-sm lg:font-semibold">
          <div className="flex justify-between">
            <p>{data.secondText}</p>
            <p>{mockedProcents}%</p>
          </div>
          <div className="flex justify-between">
            <p>{data.thirdText}</p>
            <p>{toFormattedAmount(mockedTicket)}</p>
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingCircle01 className="m-auto size-16 animate-spin" />
      ) : (
        <Button
          onClick={() => setLoading(true)}
          className="w-full"
          color="primary"
          size="md"
          content={data.buttonText}
        />
      )}
    </div>
  );
}
