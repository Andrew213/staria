import { infoCardData } from '@/app/(accountLayout)/account/settings/constants';
import { InfoCardHeader } from '@/app/_shared';

import { InfoCardAmounts } from '.';

export function InfoCardUnlimited() {
  return (
    <div className="shadow-depth/4 flex flex-col gap-4 rounded-5 bg-white p-4 lg:p-8">
      {/* TODO unmock level when it will be on the backend */}
      <InfoCardHeader />

      <p className="text-xl font-semibold text-gray-900">{infoCardData.unlimitedLimits}</p>

      <InfoCardAmounts depositLimit={infoCardData.unlimited} withdrawLimit={infoCardData.unlimited} />
    </div>
  );
}
