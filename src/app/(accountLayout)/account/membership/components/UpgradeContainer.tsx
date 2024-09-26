'use client';

import { Stepper } from '@/lib/components/Stepper/Stepper';

import { data } from '../constants';

interface Props {
  activeStep: number;
  children: React.ReactNode;
}

export function UpgradeContainer({ activeStep, children }: Props) {
  return (
    <div className="flex w-full grow flex-col">
      <div className="flex flex-col gap-1 pb-6 pt-1.5 lg:pb-8 lg:pt-0">
        <h1 className="text-left text-display-xs font-semibold text-gray-900 lg:text-display-sm">
          {data.upgradePlan.title}
        </h1>
        <p className="font-rubik text-sm text-gray-600 lg:text-md">{data.upgradePlan.description}</p>
      </div>

      <div className="flex grow flex-col lg:px-4">
        <Stepper size="sm" activeStep={activeStep} items={data.upgradePlan.stepperItems} />
        {children}
      </div>
    </div>
  );
}
