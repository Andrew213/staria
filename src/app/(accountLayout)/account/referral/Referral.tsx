'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { SubscriptionPlanTable, data as pricesData } from '@/app/_shared';
import { useMembership } from '@/core/providers/MembershipProvider';
import { CDN_URL } from '@/env';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveSubscription } from '@/redux/userSlice';
import { routes } from '@/routes';
import type { Plan } from '@/types';

import { HeroSection, Metrics } from './_components';
import { data, subscriptionTableRows, plansData } from './constants';

export default function Referral() {
  const { setPaymentStep, setCheckedPlan } = useMembership();
  const router = useRouter();

  const activeSubscription = useAppSelector(selectActiveSubscription);

  const activePlan = useMemo(
    () =>
      plansData.filter((plan) => plan.id === activeSubscription)[0] || plansData.find((plan) => plan.id === 'basic'),
    [activeSubscription],
  );

  const getButtonText = useCallback(
    (id: Plan) => {
      if (
        activePlan.id === id ||
        (activePlan.id === 'genesis' && id !== 'genesis-plus') ||
        (activePlan.id === 'genesis-plus' && id !== 'genesis-plus')
      ) {
        return `You are ${activePlan.title.toUpperCase()}`;
      }

      return 'Upgrade';
    },
    [activePlan],
  );

  const getButtonProps = useCallback(
    (id: Plan) => {
      const content = getButtonText(id);

      const color: 'secondary-gray' | 'primary' =
        id === 'basic' || activePlan.id === id || (activePlan.id === 'genesis-plus' && id === 'genesis')
          ? 'secondary-gray'
          : 'primary';

      const disabled = id === 'basic' || activePlan.id === id || (activePlan.id === 'genesis-plus' && id === 'genesis');

      return {
        content,
        color,
        disabled,
      };
    },
    [activePlan, getButtonText],
  );

  const onButtonClick = useCallback(
    (id: Plan) => {
      if (id === 'basic' || activePlan.id === id || (activePlan.id === 'genesis-plus' && id === 'genesis')) {
        return;
      }

      setPaymentStep(1);
      setCheckedPlan(id);
      router.push(routes.account.membership.getRedirectPath());
    },
    [activePlan, setPaymentStep, setCheckedPlan, router],
  );

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="rounded-3 border border-b-gray-200 bg-white px-4 py-6 shadow-card-2 lg:p-6">
        <HeroSection
          media={data.url}
          poster={`${CDN_URL}/cdn-cgi/image/format=auto/assets/images/referral-poster.jpeg`}
        />
      </div>
      <div className="rounded-3 border border-b-gray-200 bg-white px-4 py-6 shadow-card-2 lg:p-6">
        <Metrics />
      </div>
      <div className="flex flex-col gap-8 rounded-3 border border-b-gray-200 bg-white px-4 py-6 shadow-card-2 lg:gap-[100px] lg:p-6">
        <div className="mb-4 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-2">
          <p className="text-display-xs font-semibold text-gray-900">{data.title}</p>
          <span className="rounded-1.5 border border-gray-300 px-1.5 py-1 text-xs font-medium text-gray-700 shadow-button-xs">
            Your are : {activePlan.title}
          </span>
        </div>
        <SubscriptionPlanTable
          getButtonProps={getButtonProps}
          className="!p-0"
          isReferral
          planData={pricesData}
          tableRows={subscriptionTableRows}
          onButtonClick={onButtonClick}
        />
      </div>
    </div>
  );
}
