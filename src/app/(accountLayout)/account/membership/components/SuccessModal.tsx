'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CheckCircleIcon } from '@/assets/icons';
import { Button } from '@/lib/components';
import { routes } from '@/routes';

import { data } from '../constants';

const planNames = {
  basic: 'basic',
  genesis: 'Genesis',
  'genesis-plus': 'Genesis +',
} as const;

export function SuccessModal() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const [planParam, setPlanParam] = useState<string | null>('basic');

  useEffect(() => {
    if (plan) {
      setPlanParam(plan);
    }
  }, [plan]);

  return (
    <div className="max-w-[400px] rounded-3 bg-white pb-4 pt-5 shadow-home-hero lg:pb-6">
      <div className="flex flex-col items-center gap-3 border-b border-gray-200 px-5 pb-3 lg:gap-10 lg:pb-6">
        <div className="flex size-14 items-center justify-center rounded-full border-8 border-success-50 bg-success-100">
          <div className="size-6 text-success-600">
            <CheckCircleIcon />
          </div>
        </div>

        <div>
          <h2 className="pb-1 text-center text-display-xs font-semibold text-gray-900 lg:text-display-sm">
            {data.upgradePlan.successPayment.title}
          </h2>
          <p className="text-center font-rubik text-sm text-gray-600">
            {data.upgradePlan.successPayment.description}
            <span className="font-ruberoid text-md font-semibold">
              {' '}
              {planNames[planParam as 'basic']?.toLocaleUpperCase() || 'BASIC'} Plan
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-stretch px-4 pt-6 lg:px-6 lg:pt-8">
        <Button
          href={routes.account.membership.getRedirectPath()}
          size="lg"
          color="primary"
          content={data.upgradePlan.successPayment.buttonText}
        />
      </div>
    </div>
  );
}
