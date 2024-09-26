import { ProgressSteps } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';

import { InfoCard } from './components';
import { kycData, stepperData } from '../../constants';

export function KycTab() {
  const user = useAppSelector((store) => store.user);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 lg:border-b lg:border-gray-200 lg:pb-5">
        <h2 className="text-lg font-semibold text-gray-900">{kycData.title}</h2>
        <p className="font-rubik text-sm text-gray-600">{kycData.description}</p>
      </div>
      <div className="flex flex-col gap-6 lg:max-w-[934px] lg:flex-row lg:gap-14">
        <div className="lg:grow">
          <InfoCard />
        </div>
        <div className="-order-1 pt-8 lg:order-1 lg:w-[371px] lg:pt-0">
          <ProgressSteps
            steps={stepperData}
            currentStepIndex={user.verification.currentLevel}
            connectorClassName="bg-gray-400"
            completeStepIconClassName="text-primary-500"
            currentStepIconClassName="text-primary-500"
          />
        </div>
      </div>
    </div>
  );
}
