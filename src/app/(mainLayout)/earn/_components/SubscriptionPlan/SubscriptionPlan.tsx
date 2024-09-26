'use client';

import { SubscriptionPlanTable, data as planData, referralTableRow } from '@/app/_shared';

import { data } from './constants';

export function SubscriptionPlan() {
  return (
    <>
      <div className="flex max-w-[600px] flex-col gap-4 px-[30px] pb-8 pt-12 lg:-mb-6 lg:max-w-[800px] lg:gap-6 lg:pb-0 lg:pt-24">
        <h2 className="text-left text-display-md font-semibold tracking-tight text-gray-900 lg:text-center lg:text-display-lg">
          {data.title}
        </h2>
        <p className="text-left font-rubik text-lg text-gray-600 lg:text-center lg:text-xl">{data.description}</p>
      </div>
      <SubscriptionPlanTable planData={planData} tableRows={[referralTableRow]} />
    </>
  );
}
