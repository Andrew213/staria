'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SlashCircle01 } from '@/assets/icons';
import { useMembership } from '@/core/providers/MembershipProvider';
import { Button } from '@/lib/components';
import { routes } from '@/routes';
import type { Plan } from '@/types';

import { data } from '../constants';

export function FailModal() {
  const { setPaymentStep, setCheckedPlan } = useMembership();

  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const [planParam, setPlanParam] = useState<string>('basic');

  useEffect(() => {
    if (plan) {
      setPlanParam(plan);
    }
  }, [plan]);

  const handleTryAgainClick = () => {
    setPaymentStep(2);
    setCheckedPlan(planParam as Plan);
    router.push(routes.account.membership.getRedirectPath());
  };

  return (
    <div className="max-w-[400px] rounded-3 bg-white pb-4 pt-5 shadow-home-hero lg:pb-6">
      <div className="flex flex-col items-center gap-3 border-b border-gray-200 px-5 pb-3 lg:gap-10 lg:pb-3">
        <div className="flex size-14 items-center justify-center rounded-full border-8 border-error-50 bg-error-100">
          <div className="size-6 text-error-600">
            <SlashCircle01 />
          </div>
        </div>

        <div>
          <h2 className="pb-1 text-center text-display-xs font-semibold text-gray-900 lg:text-display-sm">
            {data.upgradePlan.failPayment.title}
          </h2>
          <p className="text-center font-rubik text-sm text-gray-600">{data.upgradePlan.failPayment.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-3 px-4 pt-6 lg:grid lg:grid-cols-2 lg:px-6 lg:pt-8">
        <Button
          href={routes.account.membership.getRedirectPath()}
          size="lg"
          color="secondary-gray"
          content={data.upgradePlan.failPayment.cancel}
        />
        <Button
          onClick={() => handleTryAgainClick()}
          size="lg"
          color="primary"
          content={data.upgradePlan.failPayment.tryAgain}
        />
      </div>
    </div>
  );
}
