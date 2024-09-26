import cn from 'classnames';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { twJoin } from 'tailwind-merge';
import { formatEther } from 'viem';

import { usNumberDefaultFormat } from '@/app/_shared/constants';
import { useUsdcBalanceOfQuery, useCountdown } from '@/app/_shared/hooks';
import type { Deal } from '@/app/_shared/types';
import { LinkExternal02, LoadingCircle02 } from '@/assets/icons';
import { Button, FieldError, Link } from '@/lib/components';
import type { FieldNames } from '@/types/common';
import { isString } from '@/types/common';
// import { composeValidators, isAmountGreaterThanMax, isAmountLowerThanMin, isInsufficientBalance } from '@/utils';
import { isDefined } from '@/utils';
import { toAmountInTokens } from '@/utils/amount';

import { AmountInput, AllocationModal } from './components';
import { data } from './constants';
import type { ActiveStepIndex as InvestmentActiveStepIndex } from '../../types';

interface FormData {
  amount: string;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const mockedPlatformFee = 10;
const mockedCloseDate = new Date();
mockedCloseDate.setDate(mockedCloseDate.getDate() + 2);
const mockedSaftLink = 'https://www.google.com';

interface Props {
  mode: 'input' | 'confirmation';
  project: Deal;
  setInvestmentActiveStepIndex: React.Dispatch<React.SetStateAction<InvestmentActiveStepIndex>>;
  amountToInvest: bigint | undefined;
  setAmountToInvest: React.Dispatch<React.SetStateAction<bigint | undefined>>;
}

export function SelectAmountToInvest({
  mode,
  project,
  setInvestmentActiveStepIndex,
  amountToInvest,
  setAmountToInvest,
}: Props) {
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);
  const {
    isLoading: usdcBalanceIsBeingLoaded,

    data: usdcBalance,
    error: usdcBalanceFetchError,
  } = useUsdcBalanceOfQuery();
  const millisecondsNumberLeftTillClosed = useCountdown(new Date(currentPhaseData!.endDate).getTime());

  const handleSubmit = (values: FormData) => {
    if (mode === 'input') {
      setInvestmentActiveStepIndex(project.currentPhase === 'lottery' ? 3 : 2);
      setAmountToInvest(BigInt(values.amount));
    }

    if (mode === 'confirmation') {
      setIsAllocationOpen(true);
    }
  };

  return (
    <>
      <Form<FormData>
        initialValues={{
          amount: amountToInvest ? String(amountToInvest) : '',
        }}
        render={({ handleSubmit, /* submitting, */ submitError }) => (
          <form
            className="flex flex-col gap-y-6 lg:gap-y-8"
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
          >
            <FormSpy<FormData> subscription={{ hasValidationErrors: true, values: true }}>
              {({ values /* , hasValidationErrors */ }) => {
                const amount = values.amount ?? BigInt(0);
                const fee = calcFee(amount.toString(), mockedPlatformFee);
                const total = calcTotal(amount.toString(), fee);
                // const max = mockedBalance - calcFee(mockedBalance.toString(), mockedPlatformFee);

                return (
                  <>
                    <div
                      className={cn(
                        'font-semibold text-gray-900 max-lg:text-display-xs lg:self-center lg:text-display-sm dark:text-white',
                        {
                          'max-lg:hidden': mode === 'input',
                        },
                      )}
                    >
                      {mode === 'confirmation' ? data.lastStepTitle : data.notLastStepTitle}
                    </div>
                    <div>
                      <div className="mb-1.5 flex flex-wrap justify-between gap-x-2 gap-y-1 text-sm font-medium text-gray-700 dark:text-gray-blue-50">
                        <p>
                          {data.inputLabel} {!values.amount && ' in USDC'}
                        </p>
                        <p
                          className={twJoin(
                            usdcBalanceFetchError && 'text-error-300',
                            usdcBalanceIsBeingLoaded && 'flex items-center gap-x-1',
                          )}
                        >
                          {usdcBalanceFetchError ? (
                            usdcBalanceFetchError.shortMessage
                          ) : (
                            <>
                              Balance:{' '}
                              {usdcBalanceIsBeingLoaded && (
                                <LoadingCircle02 className="size-5 animate-spin text-gray-200 dark:text-gray-blue-500" />
                              )}
                              {isDefined(usdcBalance) && usNumberDefaultFormat.format(Number(formatEther(usdcBalance)))}{' '}
                              USDC
                            </>
                          )}
                        </p>
                      </div>
                      {currentPhaseData && (
                        <Field
                          name={fieldNames.amount}
                          // TODO Just for testing, uncomment it
                          /* validate={composeValidators(
                          isInsufficientBalance(max),
                          isAmountLowerThanMin(BigInt(currentPhaseData.minAmount), 'USDC'),
                          isAmountGreaterThanMax(BigInt(currentPhaseData.maxAmount || 0), 'USDC'),
                        )} */
                        >
                          {({ input, meta }) => (
                            <AmountInput
                              platformFee={mockedPlatformFee}
                              input={input}
                              meta={meta}
                              disabled={mode === 'confirmation'}
                            />
                          )}
                        </Field>
                      )}
                    </div>
                    {mode === 'input' && (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 rounded-3 border border-gray-200 p-4 text-xs font-medium text-gray-600 light:bg-gray-50 lg:text-sm dark:border-gray-blue-300 dark:text-gray-blue-100">
                          <div className="flex justify-between">
                            <p>{data.minimumAllocations}</p>
                            <p>{toAmountInTokens(5000, 'USDC')}</p>
                          </div>
                          <div className="flex justify-between">
                            <p>{data.maximumAllocations}</p>
                            <p>{toAmountInTokens(5000, 'USDC')}</p>
                          </div>
                          <div className="flex justify-between">
                            <p>{data.platformFee}</p>
                            <p>{mockedPlatformFee} %</p>
                          </div>
                          <div className="flex justify-between">
                            <p>{data.closedIn}</p>
                            {5000 && (
                              <p>
                                {dayjs.duration(millisecondsNumberLeftTillClosed).format('DD[d] HH[h] mm[m] ss[s]')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {values.amount && (
                      <div className="flex flex-col gap-2 rounded-3 border border-gray-200 p-4 text-xs font-medium text-gray-600 light:bg-gray-50 lg:text-sm dark:border-gray-blue-300 dark:text-gray-blue-100">
                        <div className="flex justify-between">
                          <p>{data.platformFee}</p>
                          <div className="flex gap-1">
                            <p className="max-w-30 overflow-hidden overflow-ellipsis whitespace-nowrap lg:max-w-[200px]">
                              {toAmountInTokens(fee)}
                            </p>
                            USDC
                          </div>
                        </div>
                        {mode === 'confirmation' && (
                          <div className="flex justify-between">
                            <p>{data.checkSAFT}</p>
                            <p className="flex items-center gap-2">
                              {project.name} {data.saft}
                              <Link
                                className="inline-block"
                                content={<LinkExternal02 className="size-4" />}
                                target="_blank"
                                href={mockedSaftLink}
                                color="gray"
                                size="lg"
                              />
                            </p>
                          </div>
                        )}
                        <div className="flex justify-between text-lg font-semibold text-gray-800 lg:text-xl dark:text-gray-blue-25">
                          <p>{data.total}</p>
                          <div className="flex gap-1">
                            <p className="max-w-30 overflow-hidden overflow-ellipsis whitespace-nowrap lg:max-w-[200px]">
                              {toAmountInTokens(total)}
                            </p>
                            USDC
                          </div>
                        </div>
                      </div>
                    )}
                    <Button
                      size="lg"
                      color="primary"
                      content={data.continueButton}
                      type="submit"
                      // TODO Just for testing, uncomment it
                      // disabled={submitting || !values.amount || hasValidationErrors}
                    />
                    {isString(submitError) && <FieldError error={submitError} />}
                  </>
                );
              }}
            </FormSpy>
          </form>
        )}
        onSubmit={handleSubmit}
      />
      {isAllocationOpen && amountToInvest && <AllocationModal amountToInvest={amountToInvest} />}
    </>
  );
}

const calcFee = (value: string | undefined, fee: number) => {
  return (BigInt(value ?? 0) * BigInt(fee)) / BigInt(100);
};

const calcTotal = (value: string | undefined, fee: bigint) => {
  return BigInt(value ?? 0) + fee;
};
