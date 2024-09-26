'use client';

import cn from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import { useMembership } from '@/core/providers/MembershipProvider';
import { referralStorage } from '@/core/ReferralStorage/ReferralStorage';
import { QuestionMarkTooltip } from '@/lib/components';
import type { Color } from '@/lib/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOffers } from '@/redux/offersSlice';
import { selectActiveSubscription } from '@/redux/userSlice';
import { routes } from '@/routes';
import type { Plan } from '@/types';

import { TableHead, TableCell, MobileTable } from './components';
import type { PlanData, RowData } from './constants';

interface Props {
  planData: PlanData[];
  tableRows: RowData[];
  className?: string;
  isReferral?: boolean;
  getButtonProps?: (planId: Plan) => { content: string; color: Color; disabled?: boolean };
  onButtonClick?: (planId: Plan) => void;
}

export function SubscriptionPlanTable({
  planData: rawPlanData,
  tableRows,
  className,
  isReferral,
  getButtonProps,
  onButtonClick,
}: Props) {
  const router = useRouter();
  const session = useSession();
  const { offers } = useAppSelector((state) => state.offers);
  const { setCheckedPlan, setPaymentStep } = useMembership();
  const dispatch = useAppDispatch();
  const [showDiscountSticker, setShowDiscountSticker] = useState(false);
  const activePlan = useAppSelector(selectActiveSubscription);

  useEffect(() => {
    void dispatch(fetchOffers());
  }, [dispatch]);

  const planData = rawPlanData.map((plan) => ({
    ...plan,
    topTitle: plan.topTitle
      ? {
          ...plan.topTitle,
          text: `${offers?.[plan.id as 'genesis' | 'genesis-plus']?.remaining ?? 0} OFFERS LEFT`,
        }
      : undefined,
  }));

  const referralCode = referralStorage.getItem('referralCode');
  const storageExpiryDate = referralStorage.getItem('expiry');
  const now = dayjs();

  useEffect(() => {
    if (!referralCode) {
      setShowDiscountSticker(false);
      return;
    }
    if (referralCode && !now.isAfter(dayjs(storageExpiryDate))) {
      setShowDiscountSticker(true);
    }
  }, [now, referralCode, storageExpiryDate]);

  function handleSubscribeButtonClick(plan: Plan) {
    if (onButtonClick) {
      onButtonClick(plan);
      return;
    }

    const userIsAuthenticated = session.status === 'authenticated';

    if (userIsAuthenticated) {
      setCheckedPlan(plan);
      setPaymentStep(
        (activePlan === 'basic' && (plan === 'genesis' || plan === 'genesis-plus')) ||
          (activePlan === 'genesis' && plan === 'genesis-plus')
          ? 1
          : null,
      );
    }

    router.push(
      userIsAuthenticated
        ? routes.account.membership.getRedirectPath()
        : `${routes.signup.getRedirectPath()}?redirect=membership`,
    );
  }

  return (
    <div className={cn('w-full max-w-screen-xl px-4 pb-10 pt-3 lg:px-8 lg:pb-20 lg:pt-[140px]', className)}>
      <table
        border={0}
        cellSpacing="0"
        cellPadding="0"
        className="hidden w-full table-fixed border-collapse border-spacing-0 xl:table"
      >
        <tbody>
          <tr>
            <td></td>
            <TableHead
              data={planData}
              isReferral={isReferral}
              getButtonProps={getButtonProps}
              showDiscountSticker={!!showDiscountSticker}
              onButtonClick={handleSubscribeButtonClick}
            />
          </tr>
          {tableRows.map((x, rowIndex) => {
            const isLastSection = rowIndex === tableRows.length - 1;
            return (
              <React.Fragment key={`${x.rowTitle}${rowIndex}`}>
                <tr>
                  <td
                    className={cn('border-r border-gray-200 px-6 pb-4 pt-10 text-sm font-semibold text-primary-700', {
                      '!pt-0': rowIndex === 0,
                    })}
                  >
                    {x.rowTitle}
                  </td>
                  <td className="border-r border-gray-200"></td>
                  <td className="border-r border-gray-200"></td>
                  <td className="border-r border-gray-200"></td>
                </tr>
                {x.items
                  .filter((x) => !x.showOnMobile)
                  .map((rawCell, index) => {
                    const cell = rawCell as {
                      title: string;
                      description: string;
                      basic: string | boolean;
                      genesis: string | boolean;
                      genesisPlus: string | boolean;
                    };

                    const isLastRow = isLastSection && index === x.items.filter((x) => !x.showOnMobile).length - 1;
                    return (
                      <tr key={`${cell.title}${index}`} className={cn('text-center')}>
                        <td className="h-full text-sm font-medium text-gray-900">
                          <div
                            className={cn('flex h-full min-h-[66px] flex-col items-center justify-center px-6 py-5', {
                              'rounded-l border-y border-l border-gray-200 bg-gray-50': index % 2 === 0,
                            })}
                          >
                            <div className="flex items-center gap-1">
                              {cell.title}
                              <QuestionMarkTooltip
                                small
                                id={cell.title}
                                position="top"
                                color="secondary"
                                title={cell.description}
                              />
                            </div>
                          </div>
                        </td>

                        <TableCell data={cell.basic} index={index} isLastRow={isLastRow} isFirstCell />
                        <TableCell data={cell.genesis} index={index} isLastRow={isLastRow} />
                        <TableCell data={cell.genesisPlus} index={index} isLastRow={isLastRow} isLastCell />
                      </tr>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <div className="mx-auto max-w-[600px] xl:hidden">
        <MobileTable
          isReferral={isReferral}
          planData={planData}
          tableRows={tableRows}
          getButtonProps={getButtonProps}
          showDiscountSticker={!!showDiscountSticker}
          onButtonClick={handleSubscribeButtonClick}
        />
      </div>
    </div>
  );
}
