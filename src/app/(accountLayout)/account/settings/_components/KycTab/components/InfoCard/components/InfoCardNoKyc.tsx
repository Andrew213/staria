import { infoCardData } from '@/app/(accountLayout)/account/settings/constants';
import { InfoCardHeader } from '@/app/_shared';
import { Button } from '@/lib/components';

import { InfoCardAmounts } from '.';

export function InfoCardNoKyc() {
  return (
    <div className="shadow-depth/4 flex flex-col gap-4 rounded-5 bg-white p-4 lg:p-8">
      <InfoCardHeader />

      <p className="text-xl font-semibold text-gray-900">{infoCardData.noKycIncreaseText}</p>

      <InfoCardAmounts depositLimit={0} withdrawLimit={0} />

      <Button size="lg" color="primary" content={infoCardData.increaseLimits} />
    </div>
  );
}
