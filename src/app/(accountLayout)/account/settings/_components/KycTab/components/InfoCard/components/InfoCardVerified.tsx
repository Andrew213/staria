'use client';
import { Synaps } from '@synaps-io/verify-sdk';

import { userApi } from '@/api/UserApi';
import { infoCardData } from '@/app/(accountLayout)/account/settings/constants';
import { InfoCardHeader } from '@/app/_shared';
import { XCircle } from '@/assets/icons';
import { Button } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';

import { InfoCardAmounts, InvestedProgress } from '.';

export function InfoCardVerified() {
  const user = useAppSelector((store) => store.user);
  const limit = user.verification.currentLevel === 1 ? 10000 : 100000;

  const isLimitReached = user.sumInvested === limit;

  const handleOnClick = async () => {
    const response = await userApi.getVerify();

    if (response?.sessionId) {
      Synaps.init({
        sessionId: response.sessionId,
        mode: 'modal',
      });

      Synaps.show();
    }
  };

  return (
    <div className="shadow-depth/4 flex flex-col gap-4 rounded-5 bg-white p-4 lg:p-8">
      <InfoCardHeader />

      {isLimitReached ? (
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
          <div className="flex size-9 items-center justify-center rounded-full border-[5.3px] border-error-50 bg-error-100">
            <XCircle className="size-4 text-error-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{infoCardData.accountLimitsReached}</p>
        </div>
      ) : (
        <p className="text-xl font-semibold text-gray-900">{infoCardData.accountLimits}</p>
      )}

      <InvestedProgress invested={user.sumInvested} total={limit} />

      <InfoCardAmounts depositLimit={limit} withdrawLimit={limit} showDocumentNeeded={isLimitReached} />

      <Button
        type="button"
        size="lg"
        color="primary"
        content={infoCardData.increaseLimits}
        onClick={() => void handleOnClick()}
      />
    </div>
  );
}
